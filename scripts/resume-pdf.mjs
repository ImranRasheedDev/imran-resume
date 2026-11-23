// Prints resume/resume.html to public/Imran-Rasheed-Resume.pdf with headless Chrome.
// Usage: npm run resume:pdf   (set CHROME=/path/to/chrome if it is not on PATH)
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const src = pathToFileURL(join(root, "resume", "resume.html")).href;
const out = join(root, "public", "Imran-Rasheed-Resume.pdf");
const chrome = process.env.CHROME || "google-chrome";
const profile = mkdtempSync(join(tmpdir(), "resume-pdf-"));

try {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${profile}`,
      "--no-pdf-header-footer",
      "--virtual-time-budget=15000", // give the web fonts time to load
      `--print-to-pdf=${out}`,
      src,
    ],
    { stdio: "inherit" }
  );
  console.log(`Wrote ${out}`);
} finally {
  rmSync(profile, { recursive: true, force: true });
}
