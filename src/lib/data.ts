export const PROFILE = {
  name: "Imran Rasheed",
  title: "Full Stack Developer",
  location: "Karachi, Pakistan",
  email: "itsimranwebdev@gmail.com",
  whatsapp: "https://wa.me/923351275273",
  phone: "0335-1275273",
  linkedin: "https://linkedin.com/in/imran-rasheed-4a332b1b7",
  resume: "/Imran-Rasheed-Resume.pdf",
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Live link. Omit for private projects. */
  url?: string;
  /** Shown in the browser bar, and as link text. */
  domain: string;
  role: string;
  year?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /**
   * Screenshots in /public/projects. `mobile` = portrait phone shown beside a browser window.
   * `second` = a second landscape screen, shown on a floating phone in the "device" frame.
   */
  shot?: { desktop: string; mobile?: string; second?: string };
  /** "browser" (default) for websites, "device" for mobile games shown on a landscape tablet. */
  frame?: "browser" | "device";
  /** Tailwind object-position for the main screenshot (default "object-top"). */
  focus?: string;
  /** e.g. "Android · iOS". Shown next to the role. */
  platform?: string;
  /** Terminal transcript shown instead of a screenshot (for CLI tools). */
  terminal?: string[];
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "youhook",
    name: "YouHook",
    category: "Rental Marketplace",
    url: "https://staging.youhook.com/",
    domain: "staging.youhook.com",
    role: "Full Stack Developer",
    summary:
      "A two-sided peer-to-peer marketplace for renting anything. It has a Next.js web app, an admin dashboard and a TypeScript Express API. Owners list items to earn, and renters search by location, book and pay online.",
    highlights: [
      "Stripe payments and Plaid bank payouts for owners",
      "Real-time chat with Socket.io, plus SMS and push notifications",
      "Redis + BullMQ background jobs and AWS S3 media uploads",
      "Google Maps location search and Google sign-in",
    ],
    stack: ["Next.js", "Express", "TypeScript", "MongoDB", "Redis", "Socket.io", "Stripe", "AWS S3"],
    shot: { desktop: "/projects/youhook.webp", mobile: "/projects/youhook-m.webp" },
    accent: "#7cc4ff",
  },
  {
    slug: "shopfaymont",
    name: "Shopfaymont",
    category: "E-commerce Platform",
    url: "https://www.shopfaymont.com/",
    domain: "shopfaymont.com",
    role: "Full Stack Developer",
    summary:
      "A full e-commerce platform for a watch retailer, made up of a storefront, a back-office console and an API. It started as three separate apps (a NestJS API, an admin console and a storefront), which I merged into one Next.js app.",
    highlights: [
      "Admin console covering orders, inventory, promotions, roles, CMS, blog and SEO",
      "Cash-on-delivery and bank-transfer checkout with PDF invoices and email notifications",
      "Scheduled cron jobs sync supplier stock and refresh content every night",
      "JWT auth, role-based access and an audit log",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Zod", "Vitest"],
    shot: { desktop: "/projects/shopfaymont.webp", mobile: "/projects/shopfaymont-m.webp" },
    accent: "#e8c98a",
  },
  {
    slug: "roadster",
    name: "Roadster: Reveal",
    category: "3D Browser Game",
    url: "https://roadster-reveal.vercel.app/",
    domain: "roadster-reveal.vercel.app",
    role: "Full Stack Developer",
    platform: "Web · desktop and mobile",
    summary:
      "A GTA-style 3D browser game, made as a fan tribute to the 2nd-gen Roadster reveal at the SpaceX test site. You configure the car in a showroom, drive and fly it in a stunt arena, then explore a 3 × 3 km open world with missions, AI traffic and police.",
    highlights: [
      "Built through prompt-driven development with Claude Opus 5",
      "Visuals: every car, building and the Starbase launch tower is modelled procedurally in Blender from Python scripts and loaded as GLB",
      "Physically based sky with a 24-minute day–night cycle, rain with wet reflective roads, and photo-scanned CC0 PBR textures from Poly Haven",
      "Custom vehicle physics (drift, inverted-ramp suction, thruster flight) and a rigged MakeHuman character you can walk around with",
    ],
    stack: ["Three.js", "WebGL2", "JavaScript", "Blender + Python", "glTF / GLB", "Post-processing", "Vercel"],
    shot: { desktop: "/projects/roadster.webp" },
    focus: "object-left",
    accent: "#ff7a59",
  },
  {
    slug: "job-apply-batch",
    name: "Job Apply Batch",
    category: "AI Automation · CLI",
    domain: "job-apply-batch",
    role: "Full Stack Developer",
    summary:
      "An AI-powered job application pipeline in TypeScript and Node.js. One command reads my CV and portfolio, collects open jobs from 14 sources, removes duplicates, scores each job against my profile, writes a personalised email for every good match, sends it through Gmail with my CV attached, and writes a PDF report.",
    highlights: [
      "Built through prompt-driven development with Claude Opus 5, from architecture to tests",
      "Pulls jobs from Greenhouse, Lever, Ashby, LinkedIn, Indeed, Rozee and more, then merges duplicates with union-find and text similarity",
      "Claude AI matches jobs and writes emails, then code checks every email so it never invents skills or years of experience",
      "Safe by default: dry runs, per-run sending caps, duplicate-application protection, SQLite history and 300+ Vitest tests",
    ],
    stack: ["TypeScript", "Node.js", "Claude API", "Gmail API", "SQLite", "Zod", "Vitest"],
    terminal: [
      "$ npm run apply",
      "",
      "[1/8] Loading profile...",
      "[2/8] Collecting jobs...",
      "[3/8] Normalizing jobs...",
      "[4/8] Removing duplicates...",
      "[5/8] Matching jobs...",
      "[6/8] Generating applications...",
      "[7/8] Sending applications...",
      "[8/8] Generating report...",
      "",
      "✓ Batch completed.",
      "",
      "Jobs collected:        184",
      "Duplicates removed:     47",
      "Relevant jobs:          62",
      "Applications sent:      21",
      "Failed:                  0",
      "",
      "Report: reports/2026-10-01-batch-001.pdf",
    ],
    accent: "#b4a0ff",
  },
  {
    slug: "seekho-khelo",
    name: "Seekho Khelo",
    category: "Kids Learning Game · Mobile",
    domain: "Seekho Khelo",
    role: "Full Stack Developer",
    platform: "Android · offline",
    summary:
      "An offline learning game for children aged 3–10, in English and Urdu. Kids explore a 3D island with four zones and eight activities: colouring, free drawing, letter tracing, picture–word matching, counting, a shape sorter, jigsaw puzzles and spot the difference.",
    highlights: [
      "Built through prompt-driven development with Claude Opus 5",
      "Visuals: a low-poly 3D island in Unity 6 (URP) built from CC0 Kenney 3D packs, with 3D models rendered live into the 2D UI",
      "Three age bands, spoken instructions and an animated hand that shows every move; Urdu text shaping for right-to-left letters",
      "Player profiles, stars and a sticker book, and a parent area behind a maths gate with daily time limits",
    ],
    stack: ["Unity 6", "C#", "URP", "Kenney 3D assets", "Text-to-speech", "Android"],
    shot: { desktop: "/projects/seekho.webp", second: "/projects/seekho-2.webp" },
    frame: "device",
    accent: "#7ad3a0",
  },
  {
    slug: "jolly-pops",
    name: "The Jolly Pops Arcade",
    category: "Kids Arcade · Mobile",
    domain: "The Jolly Pops Arcade",
    role: "Full Stack Developer",
    platform: "iOS · Android",
    summary:
      "A mobile arcade app for The Jolly Pops, a children's entertainment brand. The first game, Chompy, has you drag Chompy the alligator to catch falling treats and dodge the hot sauce. Peekaboo and Bacon \"Not Your Cheese\" follow in the same app.",
    highlights: [
      "Built through prompt-driven development with Claude Opus 5, from the client's game proposal and design sheets",
      "Most of the characters, art, animation and music were supplied by the client and wired into the game",
      "Eight levels with combos up to x5, Hot Sauce Storms, 1–3 stars per level and saved best scores",
      "Remote content from a CDN, so new jokes ship without an app update, plus a parental gate",
      "Bot players balance the difficulty for young kids, kids and adults",
    ],
    stack: ["Unity 6", "C#", "iOS", "Android", "Python art pipeline", "Unit tests"],
    shot: { desktop: "/projects/chompy.webp", second: "/projects/chompy-2.webp" },
    frame: "device",
    accent: "#ffcf3f",
  },
  {
    slug: "playlounge",
    name: "Play Lounge",
    category: "Venue Discovery & Booking",
    url: "https://www.playlounge.city/",
    domain: "playlounge.city",
    role: "Full Stack Developer",
    summary:
      "A platform for discovering and booking premium venues for nights out, celebrations and corporate events, with a personal event concierge.",
    highlights: [
      "Search by venue, location, category and venue type",
      "Event Concierge and The Lounge Guide content hub",
      "Member sign-up and login",
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
    shot: { desktop: "/projects/playlounge.webp", mobile: "/projects/playlounge-m.webp" },
    accent: "#c9b6ff",
  },
  {
    slug: "hoyhoy",
    name: "Hoy Hoy Ibiza",
    category: "Real Estate & Concierge",
    url: "https://hoyhoyibiza.com/",
    domain: "hoyhoyibiza.com",
    role: "Full Stack Developer",
    summary:
      "The online home of an Ibiza real-estate and concierge brand, covering property management, property sales and concierge services.",
    highlights: [
      "Service pages for property management, real estate and concierge",
      "Blog plus a 'List Your Business' directory",
      "WhatsApp and live-chat lead capture",
    ],
    stack: ["React", "Tailwind CSS", "Responsive"],
    shot: { desktop: "/projects/hoyhoy.webp", mobile: "/projects/hoyhoy-m.webp" },
    accent: "#d9b45a",
  },
];

export const STACK_MARQUEE = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "NestJS",
  "Prisma",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Socket.io",
  "Tailwind CSS",
  "Stripe",
];

export const SKILLS = [
  {
    group: "Frontend",
    note: "Interfaces that feel fast",
    items: ["Next.js", "React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/UI", "TanStack Query", "Zustand"],
  },
  {
    group: "Backend",
    note: "APIs and server logic in JavaScript",
    items: ["Node.js", "Express.js", "NestJS", "Next.js Route Handlers", "Server Actions", "REST APIs", "Socket.io", "Zod"],
  },
  {
    group: "Data & Services",
    note: "Storage, queues and integrations",
    items: ["PostgreSQL", "MongoDB", "SQLite", "Prisma", "Mongoose", "Redis", "BullMQ", "Stripe", "AWS S3", "Claude API"],
  },
  {
    group: "AI Engineering",
    note: "Shipping complete products with Claude",
    items: [
      "Claude Code",
      "Claude Opus 5",
      "Prompt engineering",
      "Spec → plan → build",
      "AI-assisted debugging",
      "AI-written test suites",
      "Claude API integration",
    ],
  },
  {
    group: "Workflow",
    note: "From Figma to production",
    items: ["Figma / Adobe XD → Code", "Git & GitHub", "Vitest", "Storybook", "Vercel", "Core Web Vitals & SEO"],
  },
];

export const STATS = [
  { k: "3+", v: "Years shipping production web apps" },
  { k: "7+", v: "Products shipped across 5 industries" },
  { k: "100%", v: "Responsive, desktop to mobile" },
];

export const EXPERIENCE = [
  {
    company: "Hashone Digital",
    role: "Full Stack Developer",
    period: "Feb 2023 — Present",
    place: "Karachi",
    points: [
      "Build and maintain full-stack web applications with Next.js and React, from responsive UI to API integration, delivered on client deadlines.",
      "Built backend APIs and data layers with Node.js, Express, NestJS, Prisma and MongoDB, including payments, real-time chat and background jobs.",
      "Turn Figma and Adobe XD designs into pixel-perfect, fully responsive components.",
      "Developed reusable, accessible UI libraries with Shadcn/UI, Tailwind CSS and Bootstrap, which made designs more consistent and sped up delivery.",
      "Improve load times, Core Web Vitals and SEO-friendly markup across production sites.",
      "Shipped products across marketplace, e-commerce, hospitality and real-estate industries, working closely with designers and project managers.",
    ],
  },
];
