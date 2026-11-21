import DeviceMockup from "@/components/DeviceMockup";
import HeroStage from "@/components/HeroStage";
import Nav from "@/components/Nav";
import RevealObserver from "@/components/RevealObserver";
import ScrollEngine from "@/components/ScrollEngine";
import { EXPERIENCE, PROFILE, PROJECTS, SKILLS, STACK_MARQUEE, STATS } from "@/lib/data";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

function SectionLabel({ n, children, center = false }: { n: string; children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center ${center ? "justify-center" : ""} gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-faint`}>
      <span className="text-ember">{n}</span>
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

export default function Home() {
  const screens = PROJECTS.filter((p) => p.shot?.mobile).map((p) => ({
    name: p.name,
    desktop: p.shot!.desktop,
    mobile: p.shot!.mobile!,
  }));

  return (
    <div className="grain relative min-h-screen">
      <RevealObserver />
      <ScrollEngine />
      <Nav />

      <main>
        {/* ───────────── HERO ─────────────
            The section is taller than the screen; its sticky stage stays put while the
            3D camera dives into the laptop screen, then the Work panel rises out of it. */}
        <section id="top" data-hero className="relative h-[260svh] motion-reduce:h-auto">
          <div className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative">
            <div aria-hidden className="grid-bg hero-fade pointer-events-none absolute inset-0" />
            <div
              aria-hidden
              className="hero-fade pointer-events-none absolute -top-48 right-[-10%] h-[36rem] w-[36rem] rounded-full blur-[130px]"
              style={{ background: "radial-gradient(circle, rgba(255,106,61,0.16), transparent 70%)" }}
            />

            <div className="fade-up absolute inset-0" style={d(300)}>
              <HeroStage screens={screens} />
            </div>

            <div className="hero-copy relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pt-24 sm:px-8 sm:pt-28 lg:landscape:justify-center lg:landscape:pt-16">
              <div data-hero-copy className="lg:landscape:max-w-[47%]">
            <div className="fade-up inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2/70 py-1.5 pl-2.5 pr-4 text-xs text-bone-dim backdrop-blur" style={d(100)}>
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-400" />
              Open to new opportunities · {PROFILE.location}
            </div>

            <h1 className="mt-6 sm:mt-7 font-display font-bold leading-[0.9] tracking-[-0.04em]">
              <span className="rise block overflow-hidden pb-1 text-[15vw] sm:text-[12vw] lg:text-[7rem] xl:text-[8rem]">
                <span style={d(150)}>Imran</span>
              </span>
              <span className="rise block overflow-hidden pb-2 text-[15vw] sm:text-[12vw] lg:text-[7rem] xl:text-[8rem]">
                <span style={d(260)}>
                  Rasheed<span className="text-ember">.</span>
                </span>
              </span>
            </h1>

            <p className="fade-up mt-6 flex flex-wrap items-baseline gap-x-3 text-2xl sm:text-3xl" style={d(450)}>
              <span className="font-serif italic text-ember-soft">Full Stack Developer</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">3+ yrs · Next.js · React · Node.js</span>
            </p>

            <p className="fade-up mt-5 max-w-lg text-[15px] leading-relaxed sm:mt-6 sm:text-lg text-bone-dim" style={d(560)}>
              I build fast, accessible web products end to end, from{" "}
              <span className="text-bone">pixel-perfect interfaces</span> to the{" "}
              <span className="text-bone">APIs behind them</span>. Marketplaces, e-commerce, booking
              platforms, AI automation and games, shipped and running.
            </p>

            <div className="fade-up mt-7 flex flex-wrap sm:mt-9 items-center gap-3" style={d(680)}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(255,106,61,0.7)] transition-transform hover:-translate-y-0.5"
              >
                View my work
                <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:border-bone/40"
              >
                Download résumé <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="fade-up mt-10 hidden items-center gap-5 text-sm text-bone-faint sm:flex" style={d(800)}>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-bone">
                LinkedIn ↗
              </a>
              <span className="h-4 w-px bg-line" />
              <a href={`mailto:${PROFILE.email}`} className="transition-colors hover:text-bone">
                Email
              </a>
              <span className="h-4 w-px bg-line" />
              <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-bone">
                WhatsApp ↗
              </a>
            </div>
              </div>
            </div>

            <div aria-hidden className="hero-fade pointer-events-none absolute bottom-7 left-8 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-faint lg:landscape:flex motion-reduce:hidden">
              <span className="scroll-cue relative h-10 w-px overflow-hidden bg-line" />
              Scroll to dive in
            </div>
          </div>
        </section>

        {/* ───────────── WORK ─────────────
            Overlaps the end of the hero and grows out of the laptop screen as it rises. */}
        <div data-scroll="emerge" className="emerge relative z-10 -mt-[70svh] bg-ink motion-reduce:mt-0">
        <section id="work" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="reveal flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
            <div>
              <SectionLabel n="01">Selected work</SectionLabel>
              <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
                Products I&apos;ve built, <span className="font-serif font-normal italic text-ember-soft">shipped and running.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-bone-dim">
              Open any live project to see the real product running.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-24 sm:mt-20 sm:gap-32">
            {PROJECTS.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={p.slug} className="group/card grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.name} live site`}
                      className={`reveal no-move block pr-4 sm:pr-8 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                    >
                      <div data-scroll="tilt" className="tilt">
                        <DeviceMockup project={p} priority={i === 0} />
                      </div>
                    </a>
                  ) : (
                    <div className={`reveal no-move pr-4 sm:pr-8 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                      <div data-scroll="tilt" className="tilt">
                        <DeviceMockup project={p} />
                      </div>
                    </div>
                  )}

                  <div className={`reveal lg:col-span-5 ${flip ? "lg:order-1" : ""}`} style={d(120)}>
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                      <span className="text-bone-faint">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-6 bg-line" />
                      <span style={{ color: p.accent }}>{p.category}</span>
                    </div>
                    <h3 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{p.name}</h3>
                    <p className="mt-5 leading-relaxed text-bone-dim">{p.summary}</p>

                    <ul className="mt-6 space-y-2.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-relaxed text-bone-dim">
                          <span className="mt-[0.55rem] h-1 w-3 shrink-0 rounded-full" style={{ background: p.accent }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">Role</dt>
                        <dd className="mt-1.5 text-bone">{p.role}</dd>
                        {p.platform && (
                          <>
                            <dt className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">Platform</dt>
                            <dd className="mt-1.5 text-bone">{p.platform}</dd>
                          </>
                        )}
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">Stack</dt>
                        <dd className="mt-1.5 text-bone">{p.stack.join(" · ")}</dd>
                      </div>
                    </dl>

                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link mt-8 inline-flex items-center gap-3 rounded-full border border-line py-2.5 pl-5 pr-2.5 text-sm font-medium transition-colors hover:border-bone/40"
                      >
                        Visit {p.domain}
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-bone text-ink transition-transform duration-300 group-hover/link:rotate-45">
                          ↗
                        </span>
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        </div>

        {/* ───────────── MARQUEE ───────────── */}
        <div className="marquee relative overflow-hidden border-y border-line bg-ink-2 py-5" aria-label="Technologies">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
            {[...STACK_MARQUEE, ...STACK_MARQUEE].map((t, i) => (
              <span key={i} className="flex items-center gap-12 font-display text-2xl font-semibold text-bone-dim sm:text-3xl" aria-hidden={i >= STACK_MARQUEE.length}>
                {t}
                <span className="font-serif text-ember">✳</span>
              </span>
            ))}
          </div>
        </div>

        {/* ───────────── ABOUT ───────────── */}
        <section id="about" data-scroll="depth" className="depth border-t border-line bg-ink-2">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
            <div className="reveal lg:col-span-5">
              <SectionLabel n="02">About</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                I care about the details people actually <span className="font-serif font-normal italic text-ember-soft">feel.</span>
              </h2>
            </div>
            <div className="reveal lg:col-span-6 lg:col-start-7" style={d(120)}>
              <p className="text-lg leading-relaxed text-bone-dim">
                I&apos;m a Full Stack Developer with <span className="text-bone">3+ years</span> of experience building
                responsive web applications. I work mostly in the <span className="text-bone">React and Next.js</span>{" "}
                ecosystem and handle the whole build, from turning Figma and Adobe XD designs into production-ready UI to
                wiring up the server logic and APIs behind it.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-bone-dim">
                I pay attention to performance, accessibility and the small interactions that make a product feel
                considered. I work closely with designers and project managers so what ships meets the business goal.
              </p>

              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-10 sm:gap-8">
                {STATS.map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-4xl font-bold tracking-tight text-bone sm:text-6xl">{s.k}</div>
                    <div className="mt-2 text-xs leading-snug text-bone-faint sm:text-sm">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── STACK ───────────── */}
        <section id="stack" data-scroll="depth" className="depth mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="reveal mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel n="03">Toolkit</SectionLabel>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">
                Full stack, <span className="font-serif font-normal italic text-ember-soft">end to end.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-bone-dim">
              A focused, modern toolkit chosen for speed, maintainability and design accuracy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s, i) => (
              <div
                key={s.group}
                className="reveal group relative overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-ember/40 sm:last:col-span-2"
                style={d(i * 90)}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "rgba(255,106,61,0.25)" }}
                />
                <div className="font-mono text-[11px] text-ember">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-6 font-display text-2xl font-bold">{s.group}</h3>
                <p className="mt-1 text-sm text-bone-faint">{s.note}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li key={item} className="rounded-full border border-line bg-ink-3 px-3 py-1.5 text-xs text-bone-dim">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── EXPERIENCE ───────────── */}
        <section id="experience" data-scroll="depth" className="depth mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="reveal mb-12">
            <SectionLabel n="04">Experience</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl">Where I&apos;ve worked</h2>
          </div>

          {EXPERIENCE.map((job) => (
            <div key={job.company} className="reveal grid gap-10 rounded-3xl border border-line bg-ink-2 p-7 sm:p-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-green-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Current
                </div>
                <div className="mt-5 font-display text-3xl font-bold">{job.company}</div>
                <div className="mt-2 font-serif text-xl italic text-ember-soft">{job.role}</div>
                <div className="mt-3 font-mono text-xs text-bone-faint">
                  {job.period} · {job.place}
                </div>
              </div>
              <ol className="relative space-y-5 border-l border-line pl-6 lg:col-span-8">
                {job.points.map((pt) => (
                  <li key={pt} className="relative leading-relaxed text-bone-dim">
                    <span className="absolute -left-[1.72rem] top-2 h-2 w-2 rounded-full border border-ember bg-ink" />
                    {pt}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        {/* ───────────── CONTACT ───────────── */}
        <section id="contact" data-scroll="depth" className="depth mx-auto max-w-7xl px-5 pb-16 sm:px-8">
          <div className="reveal ring-glow rounded-[2rem]">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink-2 px-6 py-16 text-center sm:px-12 sm:py-24">
              <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <SectionLabel n="05" center>
                  Contact
                </SectionLabel>
                <h2 className="mx-auto mt-8 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
                  Let&apos;s build something <span className="font-serif font-normal italic text-ember">people love using.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-md text-bone-dim">
                  Hiring for a full stack role, or have a product to ship? I&apos;ll reply within a day.
                </p>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="group mt-10 inline-flex max-w-full items-center gap-3 rounded-full bg-bone px-6 py-4 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:px-8 sm:text-base"
                >
                  <span className="truncate">{PROFILE.email}</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>

                <div className="mt-10 grid gap-3 sm:mx-auto sm:max-w-2xl sm:grid-cols-3">
                  {[
                    { label: "WhatsApp", value: PROFILE.phone, href: PROFILE.whatsapp },
                    { label: "LinkedIn", value: "in/imran-rasheed", href: PROFILE.linkedin },
                    { label: "Résumé", value: "Download PDF", href: PROFILE.resume },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-line bg-ink/60 px-5 py-4 text-left transition-colors hover:border-bone/30"
                    >
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">{c.label}</span>
                        <span className="mt-1 block text-sm text-bone">{c.value}</span>
                      </span>
                      <span aria-hidden className="text-bone-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-bone-faint sm:flex-row">
          <span>© {new Date().getFullYear()} Imran Rasheed · Full Stack Developer</span>
          <span>Built with Next.js, Three.js &amp; Tailwind CSS</span>
          <a href="#top" className="transition-colors hover:text-bone">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
