"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Imran Rasheed, back to top">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-bone font-display text-sm font-bold text-ink transition-transform duration-500 group-hover:rotate-[-8deg]">
            IR
          </span>
          <span className="hidden font-display text-base font-semibold tracking-tight sm:block">
            Imran Rasheed
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-ink-2/50 p-1 backdrop-blur md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-bone-dim transition-colors hover:bg-ink-3 hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Résumé <span aria-hidden>↗</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pb-8 pt-2">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-line py-4 font-display text-3xl font-semibold"
            >
              {l.label}
              <span className="font-mono text-xs text-bone-faint">0{i + 1}</span>
            </a>
          ))}
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 font-medium text-ink"
          >
            Download résumé <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
