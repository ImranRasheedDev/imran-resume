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

            <div className="hero-copy relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pt-24 short:pt-20 sm:px-8 sm:pt-28 lg:landscape:justify-center lg:landscape:pt-16 squat:justify-center squat:pt-14 squat:sm:pt-14">
              <div data-hero-copy className="squat:max-w-[56%] lg:landscape:max-w-[47%]">
            <div className="fade-up inline-flex items-center gap-2.5 short:hidden squat:hidden rounded-full border border-line bg-ink-2/70 py-1.5 pl-2.5 pr-4 text-xs text-bone-dim backdrop-blur" style={d(100)}>
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-400" />
              Open to new opportunities · {PROFILE.location}
            </div>

            <h1 className="mt-6 short:mt-0 squat:mt-0 sm:mt-7 squat:sm:mt-0 font-display font-bold leading-[0.9] tracking-[-0.04em]">
              <span className="rise block overflow-hidden pb-1 text-[15vw] short:text-[12.5vw] sm:text-[12vw] squat:text-[6.6vw] squat:sm:text-[6.6vw] lg:text-[clamp(4.5rem,8.2vw,7rem)] xl:text-[min(8rem,9vw)]">
                <span style={d(150)}>Imran</span>
              </span>
              <span className="rise block overflow-hidden pb-2 text-[15vw] short:text-[12.5vw] sm:text-[12vw] squat:text-[6.6vw] squat:sm:text-[6.6vw] lg:text-[clamp(4.5rem,8.2vw,7rem)] xl:text-[min(8rem,9vw)]">
                <span style={d(260)}>
                  Rasheed<span className="text-ember">.</span>
                </span>
              </span>
            </h1>

            <p className="fade-up mt-6 flex flex-wrap items-baseline gap-x-3 text-2xl short:mt-3 short:text-xl sm:text-3xl squat:mt-2 squat:text-lg squat:sm:mt-2 squat:sm:text-lg" style={d(450)}>
              <span className="font-serif italic text-ember-soft">Full Stack Developer</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint squat:hidden">5+ yrs · Next.js · React · Node.js</span>
            </p>

            <p className="fade-up mt-5 max-w-lg text-[15px] leading-relaxed short:mt-3 short:text-sm sm:mt-6 squat:mt-2 squat:text-[13px] squat:leading-snug squat:sm:mt-2 squat:sm:text-[13px] sm:text-lg text-bone-dim" style={d(560)}>
              I build fast, accessible web products end to end, from{" "}
              <span className="text-bone">pixel-perfect interfaces</span> to the{" "}
              <span className="text-bone">APIs behind them</span>. Marketplaces, e-commerce, booking
              platforms, AI automation and games, shipped and running.
            </p>

            <div className="fade-up mt-7 flex flex-wrap items-center gap-3 short:mt-5 short:gap-2 sm:mt-9 squat:mt-4 squat:gap-2 squat:sm:mt-4" style={d(680)}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-sm short:px-4 short:py-3 short:text-[13px] squat:px-4 squat:py-2.5 squat:text-[13px] font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(255,106,61,0.7)] transition-transform hover:-translate-y-0.5"
              >
                View my work
                <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-6 py-3.5 text-sm short:px-4 short:py-3 short:text-[13px] squat:px-4 squat:py-2.5 squat:text-[13px] font-medium backdrop-blur transition-colors hover:border-bone/40"
              >
                Download résumé <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="fade-up mt-10 hidden items-center gap-5 text-sm text-bone-faint sm:flex squat:sm:hidden" style={d(800)}>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="-my-3 py-3 transition-colors hover:text-bone">
                LinkedIn ↗
              </a>
              <span className="h-4 w-px bg-line" />
              <a href={`mailto:${PROFILE.email}`} className="-my-3 py-3 transition-colors hover:text-bone">
                Email
              </a>
              <span className="h-4 w-px bg-line" />
              <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="-my-3 py-3 transition-colors hover:text-bone">
                WhatsApp ↗
              </a>
            </div>
              </div>
            </div>

            <div aria-hidden className="hero-fade pointer-events-none absolute bottom-7 left-8 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-faint lg:landscape:tall:flex motion-reduce:hidden">
              <span className="scroll-cue relative h-10 w-px overflow-hidden bg-line" />
              Scroll to dive in
            </div>
          </div>
        </section>

        {/* ───────────── WORK ─────────────
            Overlaps the end of the hero and grows out of the laptop screen as it rises. */}
        <div data-scroll="emerge" className="emerge relative z-10 -mt-[70svh] bg-ink motion-reduce:mt-0">
        <section id="work" className="py-24 sm:py-32 hx:pb-0">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
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
          </div>

          {/* On wide screens this block pins to the viewport and the projects travel sideways
              as you scroll; <ScrollEngine/> sizes it so the page resumes once the last one is in.
              Phones, tablets and reduced motion keep the plain vertical list. */}
          <div data-hscroll className="relative mt-16 sm:mt-20 hx:mt-0">
            <div data-hscroll-stage className="hx:sticky hx:top-0 hx:h-[100svh] hx:overflow-hidden">
              <div
                data-hscroll-track
                className="mx-auto flex max-w-7xl flex-col gap-24 px-5 sm:gap-32 sm:px-8 hx:mx-0 hx:h-full hx:max-w-none hx:flex-row hx:gap-0 hx:px-0 hx:will-change-transform"
              >
            {PROJECTS.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={p.slug}
                  data-hslide
                  className="hslide group/card grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 hx:h-full hx:w-[var(--slide-w,100vw)] hx:shrink-0 hx:content-center hx:px-[max(2rem,calc((var(--slide-w,100vw)-80rem)/2+2rem))] hx:pb-10 hx:pt-20"
                >
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.name} live site`}
                      className={`reveal no-move block min-w-0 pr-4 sm:pr-8 lg:col-span-7 ${flip ? "lg:order-2 hx:order-none" : ""}`}
                    >
                      <div className="hslide-media">
                        <div data-scroll="tilt" className="tilt">
                          <DeviceMockup project={p} priority={i === 0} />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className={`reveal no-move min-w-0 pr-4 sm:pr-8 lg:col-span-7 ${flip ? "lg:order-2 hx:order-none" : ""}`}>
                      <div className="hslide-media">
                        <div data-scroll="tilt" className="tilt">
                          <DeviceMockup project={p} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`reveal min-w-0 lg:col-span-5 ${flip ? "lg:order-1 hx:order-none" : ""}`} style={d(120)}>
                    <div className="hslide-copy">
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                      <span className="text-bone-faint">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-6 bg-line" />
                      <span style={{ color: p.accent }}>{p.category}</span>
                    </div>
                    <h3 className="mt-4 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl hxlow:mt-3 hxlow:text-4xl">{p.name}</h3>
                    <p className="mt-5 leading-relaxed text-bone-dim hxlow:mt-3 hxlow:text-[15px] hxlow:leading-normal">{p.summary}</p>

                    <ul className="mt-6 space-y-2.5 hxlow:mt-4 hxlow:space-y-1.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-relaxed text-bone-dim hxlow:text-[13px] hxlow:leading-snug">
                          <span className="mt-[0.55rem] h-1 w-3 shrink-0 rounded-full hxlow:mt-[0.45rem]" style={{ background: p.accent }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-8 grid grid-cols-2 gap-4 break-words [&>div]:min-w-0 border-t border-line pt-6 text-sm hxlow:mt-5 hxlow:pt-4 hxlow:text-[13px]">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">Role</dt>
                        <dd className="mt-1.5 text-bone">{p.role}</dd>
                        {p.platform && (
                          <>
                            <dt className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint hxlow:mt-3">Platform</dt>
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
                        className="group/link mt-8 inline-flex max-w-full items-center gap-3 rounded-full border border-line py-2.5 pl-5 pr-2.5 text-sm font-medium transition-colors hover:border-bone/40 hxlow:mt-5"
                      >
                        <span className="min-w-0 truncate">Visit {p.domain}</span>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bone text-ink transition-transform duration-300 group-hover/link:rotate-45">
                          ↗
                        </span>
                      </a>
                    ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
              </div>

              {/* progress rail, only while pinned */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 hidden hx:block">
                <div className="mx-auto flex max-w-7xl items-center gap-5 px-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
                  <span data-hscroll-count className="w-5 text-bone">01</span>
                  <span className="relative h-px flex-1 overflow-hidden bg-line">
                    <span className="hscroll-bar absolute inset-0 bg-ember" />
                  </span>
                  <span>{String(PROJECTS.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
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
                I&apos;m a Full Stack Developer with <span className="text-bone">5+ years</span> of experience. I started
                as a <span className="text-bone">Frontend Developer</span> at Quadtech Technologies, turning Figma and
                Adobe XD designs into responsive React interfaces.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-bone-dim">
                Since 2022 I&apos;ve worked full stack at <span className="text-bone">Hashone Digital</span>, building
                the whole product with <span className="text-bone">Next.js, React and Node.js</span>: the UI, the APIs,
                the database, payments and real-time features.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-bone-dim">
                I also ship complete projects through <span className="text-bone">AI engineering with Claude</span>,
                from spec and plan to build, tests and debugging. Three games and an AI job-application pipeline were
                built this way.
              </p>

              <div className="mt-12 grid grid-cols-3 gap-3 border-t border-line pt-10 sm:gap-8">
                {STATS.map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-[clamp(1.75rem,9vw,2.25rem)] font-bold tracking-tight text-bone sm:text-6xl lg:text-5xl xl:text-6xl">{s.k}</div>
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

          <div className="flex flex-col gap-6">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="reveal grid gap-10 rounded-3xl border border-line bg-ink-2 p-7 sm:p-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                {job.current ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-green-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Current
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-bone/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                    <span className="h-1.5 w-1.5 rounded-full bg-bone-faint" /> Previous
                  </div>
                )}
                <div className="mt-5 font-display text-3xl font-bold">{job.company}</div>
                <div className="mt-2 font-serif text-xl italic text-ember-soft">{job.role}</div>
                <div className="mt-3 font-mono text-xs text-bone-faint">
                  {job.period}
                  {job.place ? ` · ${job.place}` : ""}
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
          </div>
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
                  className="group mt-10 inline-flex max-w-full items-center gap-3 rounded-[1.75rem] bg-bone px-6 py-4 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 sm:rounded-full sm:px-8 sm:text-base"
                >
                  {/* wraps after the @ on very narrow phones instead of hiding part of the address */}
                  <span className="min-w-0 sm:truncate">
                    {PROFILE.email.split("@")[0]}@<wbr />
                    {PROFILE.email.split("@")[1]}
                  </span>
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
          <a href="#top" className="-my-3 inline-block py-3 transition-colors hover:text-bone">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
