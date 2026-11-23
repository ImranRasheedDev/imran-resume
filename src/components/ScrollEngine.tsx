"use client";

import { useEffect } from "react";
import { heroScroll } from "@/lib/scroll-store";

/**
 * One rAF loop that turns scroll position into smoothed CSS variables.
 *
 *   [data-hero]            --hp     0 → 1 across the hero's scroll length (also feeds the 3D camera)
 *   [data-scroll=emerge]   --enter  0 → 1 while the element rises from the bottom to the top of the viewport
 *   [data-scroll=depth]    --enter  0 → 1 on the way in, --exit 0 → 1 as it leaves through the top
 *   [data-scroll=tilt]     --enter  0 → 1 over the first three quarters of the viewport
 *   [data-hscroll]         pinned horizontal rail: vertical scroll moves the track sideways,
 *                          each [data-hslide] gets --o/--oa (offset from centre in slide widths)
 *
 * Positions come from offsetTop/offsetHeight, which ignore transforms, so the effects
 * never feed back into their own measurements. Values ease toward their targets, which
 * keeps motion soft without hijacking the native scroll.
 */
type Kind = "emerge" | "depth" | "tilt";
type Item = {
  el: HTMLElement;
  kind: Kind;
  top: number;
  height: number;
  enter: number;
  exit: number;
  tEnter: number;
  tExit: number;
  /** distance from the top of the pinned rail stage, for items that ride inside it (-1 = not in the rail) */
  railOff: number;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Keep in sync with the `hx` variant in globals.css. */
const HX_QUERY =
  "(min-width: 1024px) and (min-height: 600px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)";

function docTop(el: HTMLElement) {
  let y = 0;
  let n: HTMLElement | null = el;
  while (n) {
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return y;
}

export default function ScrollEngine() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const copy = document.querySelector<HTMLElement>("[data-hero-copy]");
    const items: Item[] = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]")).map((el) => ({
      el,
      kind: el.dataset.scroll as Kind,
      top: 0,
      height: 0,
      enter: 1,
      exit: 0,
      tEnter: 1,
      tExit: 0,
      railOff: -1,
    }));

    // horizontal project rail
    const hxQ = window.matchMedia(HX_QUERY);
    const hs = document.querySelector<HTMLElement>("[data-hscroll]");
    const hsStage = hs?.querySelector<HTMLElement>("[data-hscroll-stage]") ?? null;
    const hsTrack = hs?.querySelector<HTMLElement>("[data-hscroll-track]") ?? null;
    const hsCount = hs?.querySelector<HTMLElement>("[data-hscroll-count]") ?? null;
    const slides = hs ? Array.from(hs.querySelectorAll<HTMLElement>("[data-hslide]")) : [];
    let hsOn = false;
    let hsTop = 0;
    let hsDist = 0;
    let hsW = 1;
    let hsP = 0;
    let hsTarget = 0;
    let hsLeft: number[] = [];
    let hsIndex = -1;

    let heroTop = 0;
    let heroLen = 1;
    let heroTarget = 0;
    let raf = 0;
    let last = 0;

    const layoutRail = () => {
      if (!hs || !hsTrack) return;
      hsOn = hxQ.matches;
      if (hsOn) {
        hsW = document.documentElement.clientWidth; // excludes the scrollbar, unlike 100vw
        hs.style.setProperty("--slide-w", `${hsW}px`);
        hsDist = Math.max(0, hsTrack.scrollWidth - hsW);
        hs.style.height = `${hsDist + window.innerHeight}px`;
        hsLeft = slides.map((el) => el.offsetLeft);
      } else {
        hs.style.removeProperty("height");
        hs.style.removeProperty("--slide-w");
        hsTrack.style.removeProperty("transform");
        hsStage?.style.removeProperty("--hprog");
        for (const el of slides) {
          el.style.removeProperty("--o");
          el.style.removeProperty("--oa");
        }
        hsP = hsTarget = 0;
      }
      hsTop = docTop(hs);
    };

    const layout = () => {
      layoutRail(); // first: it changes the page height everything below is measured against
      if (hero) {
        heroTop = docTop(hero);
        heroLen = Math.max(1, hero.offsetHeight - window.innerHeight);
      }
      if (copy) heroScroll.copyBottom = (copy.offsetTop + copy.offsetHeight) / window.innerHeight;
      // The rail stage is position: sticky, and offsetTop includes the sticky shift at the moment
      // it is read. Items inside it are measured relative to the stage instead, which stays
      // correct whether the stage is pinned or not when layout runs.
      const stageTop = hsOn && hsStage ? docTop(hsStage) : 0;
      for (const it of items) {
        it.top = docTop(it.el);
        it.height = it.el.offsetHeight;
        it.railOff = hsOn && hsStage && hsStage.contains(it.el) ? it.top - stageTop : -1;
      }
    };

    const targets = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      heroTarget = clamp01((y - heroTop) / heroLen);
      if (hsOn) hsTarget = clamp01((y - hsTop) / Math.max(1, hsDist));
      // where the rail stage's top sits in the viewport: scrolling in, pinned at 0, scrolling out
      const stageTop = y < hsTop ? hsTop - y : y > hsTop + hsDist ? hsTop + hsDist - y : 0;
      for (const it of items) {
        const top = it.railOff >= 0 ? stageTop + it.railOff : it.top - y; // element top in the viewport
        const bottom = top + it.height;
        if (it.kind === "emerge") it.tEnter = clamp01((vh - top) / vh);
        // inside the pinned rail the lid has to be fully open by the time the stage locks
        else if (it.kind === "tilt") it.tEnter = clamp01((vh - top) / (vh * (it.railOff >= 0 ? 0.6 : 0.75)));
        else {
          it.tEnter = clamp01((vh - top) / (vh * 0.7));
          it.tExit = clamp01(1 - bottom / (vh * 0.55));
        }
      }
    };

    const write = () => {
      if (hero) {
        hero.style.setProperty("--hp", heroScroll.p.toFixed(4));
        hero.dataset.past = heroScroll.p > 0.18 ? "true" : "false";
      }
      for (const it of items) {
        it.el.style.setProperty("--enter", it.enter.toFixed(4));
        it.el.style.setProperty("--exit", it.exit.toFixed(4));
      }
      if (hsOn && hsTrack) {
        const x = hsP * hsDist;
        hsTrack.style.transform = `translate3d(${(-x).toFixed(2)}px, 0, 0)`;
        hsStage?.style.setProperty("--hprog", hsP.toFixed(4));
        let nearest = 0;
        let best = Infinity;
        slides.forEach((el, i) => {
          const o = Math.max(-1.5, Math.min(1.5, (hsLeft[i] - x) / hsW));
          el.style.setProperty("--o", o.toFixed(4));
          el.style.setProperty("--oa", Math.abs(o).toFixed(4));
          if (Math.abs(o) < best) {
            best = Math.abs(o);
            nearest = i;
          }
        });
        if (hsCount && nearest !== hsIndex) {
          hsIndex = nearest;
          hsCount.textContent = String(nearest + 1).padStart(2, "0");
        }
      }
    };

    const snap = () => {
      heroScroll.p = heroTarget;
      hsP = hsTarget;
      for (const it of items) {
        it.enter = it.tEnter;
        it.exit = it.tExit;
      }
      write();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - (last || now)) / 1000) || 1 / 60; // slow devices still settle on time
      last = now;
      const k = 1 - Math.exp(-dt * 8); // ~120 ms settling: soft, never laggy
      let moving = false;
      const step = (cur: number, to: number, eps = 0.0004) => {
        const d = to - cur;
        if (Math.abs(d) < eps) return to;
        moving = true;
        return cur + d * k;
      };
      heroScroll.p = step(heroScroll.p, heroTarget);
      hsP = step(hsP, hsTarget, 0.00002); // the rail spans thousands of px: settle finer
      for (const it of items) {
        it.enter = step(it.enter, it.tEnter);
        it.exit = step(it.exit, it.tExit);
      }
      write();
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    };

    const kick = () => {
      targets();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const apply = () => {
      heroScroll.reduced = reduce.matches;
      layout();
      targets();
      if (reduce.matches) {
        heroScroll.p = 0;
        for (const it of items) {
          it.tEnter = 1;
          it.tExit = 0;
        }
        heroTarget = 0;
      }
      snap();
    };

    apply();
    const onScroll = () => (reduce.matches ? undefined : kick());
    const onResize = () => {
      layout();
      if (reduce.matches) apply();
      else kick();
    };
    // Tabbing to a link on an off-screen slide makes the browser scroll the clipped stage
    // sideways on its own. Undo that and scroll the page to the slide instead.
    const onFocus = (e: FocusEvent) => {
      if (!hsOn || !hsStage) return;
      const i = slides.findIndex((el) => el.contains(e.target as Node));
      // after the browser's own scroll-into-view, which runs once focus has moved
      requestAnimationFrame(() => {
        hsStage.scrollLeft = 0;
        if (i >= 0) window.scrollTo({ top: hsTop + hsLeft[i], behavior: "smooth" });
      });
    };
    const onStageScroll = () => {
      if (hsStage && hsStage.scrollLeft !== 0) hsStage.scrollLeft = 0;
    };
    hsStage?.addEventListener("focusin", onFocus);
    hsStage?.addEventListener("scroll", onStageScroll, { passive: true });

    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", apply);
    hxQ.addEventListener("change", onResize);
    document.fonts?.ready.then(onResize).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", apply);
      hxQ.removeEventListener("change", onResize);
      hsStage?.removeEventListener("focusin", onFocus);
      hsStage?.removeEventListener("scroll", onStageScroll);
    };
  }, []);

  return null;
}
