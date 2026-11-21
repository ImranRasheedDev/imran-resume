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
 *
 * Positions come from offsetTop/offsetHeight, which ignore transforms, so the effects
 * never feed back into their own measurements. Values ease toward their targets, which
 * keeps motion soft without hijacking the native scroll.
 */
type Kind = "emerge" | "depth" | "tilt";
type Item = { el: HTMLElement; kind: Kind; top: number; height: number; enter: number; exit: number; tEnter: number; tExit: number };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

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
    }));

    let heroTop = 0;
    let heroLen = 1;
    let heroTarget = 0;
    let raf = 0;
    let last = 0;

    const layout = () => {
      if (hero) {
        heroTop = docTop(hero);
        heroLen = Math.max(1, hero.offsetHeight - window.innerHeight);
      }
      if (copy) heroScroll.copyBottom = (copy.offsetTop + copy.offsetHeight) / window.innerHeight;
      for (const it of items) {
        it.top = docTop(it.el);
        it.height = it.el.offsetHeight;
      }
    };

    const targets = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      heroTarget = clamp01((y - heroTop) / heroLen);
      for (const it of items) {
        const top = it.top - y; // where the element's top sits in the viewport
        const bottom = top + it.height;
        if (it.kind === "emerge") it.tEnter = clamp01((vh - top) / vh);
        else if (it.kind === "tilt") it.tEnter = clamp01((vh - top) / (vh * 0.75));
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
    };

    const snap = () => {
      heroScroll.p = heroTarget;
      for (const it of items) {
        it.enter = it.tEnter;
        it.exit = it.tExit;
      }
      write();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000) || 1 / 60;
      last = now;
      const k = 1 - Math.exp(-dt * 8); // ~120 ms settling: soft, never laggy
      let moving = false;
      const step = (cur: number, to: number) => {
        const d = to - cur;
        if (Math.abs(d) < 0.0004) return to;
        moving = true;
        return cur + d * k;
      };
      heroScroll.p = step(heroScroll.p, heroTarget);
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
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", apply);
    document.fonts?.ready.then(onResize).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  return null;
}
