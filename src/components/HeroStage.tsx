"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useState, type ReactNode } from "react";
import type { Screen } from "./DeviceScene";

const DeviceScene = dynamic(() => import("./DeviceScene"), {
  ssr: false,
  loading: () => <StageLoader />,
});

function StageLoader() {
  return (
    <div className="absolute bottom-[22%] right-1/2 translate-x-1/2 lg:bottom-1/2 lg:right-[24%]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-ember" />
    </div>
  );
}

/** If WebGL is unavailable, fall back to a flat screenshot instead of a blank hole. */
class WebGLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Full-bleed 3D stage behind the hero copy. The scene itself places the devices. */
export default function HeroStage({ screens }: { screens: Screen[] }) {
  const [index, setIndex] = useState(0);
  const current = screens[index] ?? screens[0];

  const fallback = (
    <div className="absolute inset-x-5 bottom-[6%] lg:inset-x-auto lg:bottom-auto lg:right-[4%] lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line shadow-2xl">
        <Image src={screens[0].desktop} alt="" fill sizes="(min-width: 1024px) 46vw, 90vw" className="object-cover" />
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0">
      {/* stage glow, sitting behind where the devices rest */}
      <div
        aria-hidden
        className="hero-fade pointer-events-none absolute bottom-[-10%] left-1/2 h-[55%] w-[110%] -translate-x-1/2 rounded-full opacity-70 blur-3xl lg:bottom-auto lg:left-auto lg:right-[-6%] lg:top-[18%] lg:h-[70%] lg:w-[60%] lg:translate-x-0"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,106,61,0.26), rgba(91,124,255,0.12) 55%, transparent)",
        }}
      />
      <WebGLBoundary fallback={fallback}>
        <DeviceScene screens={screens} onIndexChange={setIndex} />
      </WebGLBoundary>

      {/* now-showing caption */}
      <div className="hero-fade pointer-events-none absolute bottom-5 left-1/2 flex short:hidden squat:hidden -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-line bg-ink-2/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim backdrop-blur lg:bottom-[9%] lg:left-auto lg:right-[18%] lg:translate-x-0">
        <span className="h-1.5 w-1.5 rounded-full bg-ember" />
        Now showing
        <span key={current.name} className="caption-in text-bone">
          {current.name}
        </span>
        <span className="text-bone-faint">
          {String(index + 1).padStart(2, "0")}/{String(screens.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
