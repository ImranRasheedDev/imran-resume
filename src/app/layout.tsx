import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const description =
  "Imran Rasheed is a Full Stack Developer with 3+ years of experience building fast, accessible, production web apps with Next.js, React, Node.js and Tailwind CSS.";

export const metadata: Metadata = {
  title: "Imran Rasheed · Full Stack Developer",
  description,
  keywords: [
    "Imran Rasheed",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "Tailwind CSS",
    "Karachi",
    "Portfolio",
  ],
  authors: [{ name: "Imran Rasheed" }],
  openGraph: {
    title: "Imran Rasheed · Full Stack Developer",
    description,
    type: "website",
    images: [{ url: "/projects/youhook.webp", width: 1280, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imran Rasheed · Full Stack Developer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
