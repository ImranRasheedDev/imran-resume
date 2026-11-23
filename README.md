# Imran Rasheed — Portfolio

A distinctive, production-grade personal portfolio for **Imran Rasheed**, a Full Stack Developer
with 5+ years of experience building fast, accessible, responsive web applications.

Built with **Next.js**, **Three.js** (React Three Fiber) and **Tailwind CSS**: a dark, studio-style showcase with a
real-time 3D laptop + phone in the hero that cycles through live project screenshots, 3D-tilt device mockups
for every project, and scroll-triggered reveals.

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

## ✨ Features

- **3D hero** — WebGL laptop and phone rendered with Three.js, showing real screenshots of shipped projects
- **Distinctive design** — dark studio theme with an ember accent, Bricolage Grotesque, Instrument Serif, Geist
- **Fully responsive** — hand-tuned layouts from mobile to desktop
- **Motion** — staggered scroll reveals, animated tech marquee, micro-interactions (respects `prefers-reduced-motion`)
- **Accessible & SEO-friendly** — semantic markup, metadata, Open Graph tags
- **Downloadable résumé** — served straight from the site

## 🗂️ Sections

Hero (3D) · Tech marquee · Selected Work · About (with stats) · Toolkit · Experience · Contact

## 🚀 Selected Projects

| Project | Type | Live |
| --- | --- | --- |
| YouHook | Peer-to-peer rental marketplace (Next.js + Express API) | https://staging.youhook.com/ |
| Shopfaymont | E-commerce platform (storefront, admin, API) | https://www.shopfaymont.com/ |
| Roadster: Reveal | 3D browser game (Three.js + Blender, built with Claude Opus 5) | https://roadster-reveal.vercel.app/ |
| Job Apply Batch | AI job-application pipeline (Node.js CLI, built with Claude Opus 5) | Private repo |
| Seekho Khelo | Kids learning game, Unity 6 / Android (built with Claude Opus 5) | Android APK |
| The Jolly Pops Arcade | Kids arcade app, Unity 6 / iOS + Android (client art, built with Claude Opus 5) | Mobile app |
| Play Lounge | Venue discovery & booking | https://www.playlounge.city/ |
| Hoy Hoy Ibiza | Real estate & concierge | https://hoyhoyibiza.com/ |

## 🛠️ Tech Stack

**Framework:** Next.js 16 (App Router) · React 19
**Language:** TypeScript
**3D:** Three.js · React Three Fiber
**Styling:** Tailwind CSS 4
**Fonts:** Bricolage Grotesque, Instrument Serif, Geist, Geist Mono (`next/font`)

## 🧑‍💻 Run Locally

```bash
# clone
git clone https://github.com/ImranRasheedDev/imran-resume.git
cd imran-resume

# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# production build
npm run build && npm run start
```

### Résumé PDF

The downloadable résumé (`public/Imran-Rasheed-Resume.pdf`) is printed from
`resume/resume.html` with headless Chrome. After editing the HTML, rebuild it:

```bash
npm run resume:pdf   # set CHROME=/path/to/chrome if it is not on your PATH
```

## ☁️ Deploy

Optimized for [Vercel](https://vercel.com). Import the repo, keep the defaults, and deploy —
no extra configuration required.

## 📫 Contact

- **Email:** itsimranwebdev@gmail.com
- **WhatsApp:** 0335-1275273
- **LinkedIn:** [in/imran-rasheed](https://linkedin.com/in/imran-rasheed-4a332b1b7)
- **Location:** Karachi, Pakistan

---

<sub>Designed &amp; built by Imran Rasheed.</sub>
