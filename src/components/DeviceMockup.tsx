"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/lib/data";

/**
 * Browser window + floating phone, layered in CSS 3D.
 * Tilts toward the pointer on devices that have one.
 */
export default function DeviceMockup({ project, priority = false }: { project: Project; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--ry", `${x * 14}deg`);
      el.style.setProperty("--rx", `${-y * 10}deg`);
      el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  const glare = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      style={{
        background:
          "radial-gradient(600px circle at var(--gx,50%) var(--gy,0%), rgba(255,255,255,0.12), transparent 40%)",
      }}
    />
  );

  if (project.frame === "device" && project.shot) {
    return (
      <div className="mockup-scene" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div ref={ref} className="mockup-rig relative">
          {/* landscape tablet */}
          <div className="relative rounded-[1.4rem] border border-white/15 bg-[#0b0b0d] p-[2.2%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:rounded-[2rem]">
            <span aria-hidden className="absolute left-[1.1%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/15" />
            <div className="relative aspect-video overflow-hidden rounded-[0.8rem] sm:rounded-[1.2rem]">
              <Image
                src={project.shot.desktop}
                alt={`${project.name} gameplay`}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 640px, 92vw"
                className="object-cover"
              />
              {glare}
            </div>
          </div>

          {/* landscape phone with a second screen */}
          {project.shot.second && (
            <div className="mockup-phone absolute -bottom-8 -right-3 w-[42%] max-w-[270px] sm:-bottom-12 sm:-right-8">
              <div className="rounded-[12%/26%] border border-white/15 bg-[#0b0b0d] p-[3.2%] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95)]">
                <div className="relative aspect-video overflow-hidden rounded-[9%/20%]">
                  <Image
                    src={project.shot.second}
                    alt={`${project.name} on a phone`}
                    fill
                    sizes="270px"
                    className="object-cover"
                  />
                  <span className="absolute left-[2.5%] top-1/2 h-[30%] w-[3.2%] -translate-y-1/2 rounded-full bg-black" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mockup-scene" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="mockup-rig relative">
        {/* browser window */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:rounded-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 bg-[#16181d] px-3 py-2.5 sm:px-4">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex min-w-0 max-w-[70%] flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-black/40 px-3 py-1 font-mono text-[10px] text-bone-faint sm:text-[11px]">
              <svg aria-hidden width="9" height="10" viewBox="0 0 9 10" className="shrink-0 opacity-70">
                <path fill="currentColor" d="M1.5 4V3a3 3 0 0 1 6 0v1H8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h.5Zm1.2 0h3.6V3a1.8 1.8 0 0 0-3.6 0v1Z" />
              </svg>
              <span className="truncate">{project.domain}</span>
            </div>
            <span className="w-[42px]" />
          </div>
          <div className={`relative w-full ${project.terminal ? "aspect-[5/4] sm:aspect-[16/10]" : "aspect-[16/10]"}`}>
            {project.terminal ? (
              <Terminal lines={project.terminal} accent={project.accent} />
            ) : project.shot ? (
              <Image
                src={project.shot.desktop}
                alt={`${project.name} homepage`}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 640px, 92vw"
                className={`object-cover ${project.focus ?? "object-top"}`}
              />
            ) : (
              <CoverArt project={project} />
            )}
            {glare}
          </div>
        </div>

        {/* phone */}
        {project.shot?.mobile && (
          <div className="mockup-phone absolute -bottom-6 -right-2 w-[24%] min-w-[78px] max-w-[150px] sm:-bottom-10 sm:-right-6">
            <div className="rounded-[18%/8.5%] border border-white/15 bg-[#0b0b0d] p-[5%] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[14%/6.5%]">
                <Image
                  src={project.shot.mobile}
                  alt={`${project.name} on mobile`}
                  fill
                  sizes="150px"
                  className="object-cover object-top"
                />
                <span className="absolute left-1/2 top-[2.2%] h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** A CLI run, typed out line by line once the mockup scrolls into view. */
function Terminal({ lines, accent }: { lines: string[]; accent: string }) {
  return (
    <div
      className="terminal absolute inset-0 overflow-hidden bg-[#0a0b0e] px-4 py-3 font-mono text-[7.5px] leading-[1.5] text-bone-dim sm:px-6 sm:py-4 sm:text-[11px] lg:text-[10px] xl:text-[11.5px]"
      style={{ background: `radial-gradient(90% 70% at 100% 0%, ${accent}1f, transparent 60%), #0a0b0e` }}
    >
      {lines.map((l, i) => {
        const cls = l.startsWith("$")
          ? "text-bone"
          : l.startsWith("✓")
            ? "text-green-400"
            : l.startsWith("[")
              ? "text-bone-faint"
              : l.startsWith("Report")
                ? "text-bone"
                : "";
        return (
          <div key={i} className={`terminal-line whitespace-pre ${cls}`} style={{ ["--i" as string]: i }}>
            {l.startsWith("$") ? (
              <>
                <span style={{ color: accent }}>❯</span>
                {l.slice(1)}
              </>
            ) : (
              l || " "
            )}
          </div>
        );
      })}
      <span className="terminal-caret inline-block h-[1.1em] w-[0.55em] translate-y-[2px]" style={{ background: accent }} />
    </div>
  );
}

function CoverArt({ project }: { project: Project }) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10"
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, ${project.accent}33, transparent 60%), radial-gradient(90% 80% at 100% 100%, ${project.accent}22, transparent 60%), #0c0e11`,
      }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-faint">{project.category}</span>
      <div>
        <div className="font-display text-5xl font-bold tracking-tight sm:text-7xl" style={{ color: project.accent }}>
          {project.name}
        </div>
        <div className="mt-3 font-mono text-xs text-bone-dim">{project.domain}</div>
      </div>
    </div>
  );
}
