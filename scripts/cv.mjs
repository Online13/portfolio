// Prints each language's home page to its PDF with headless Chrome: its print styles keep only the resume.
// Run after `astro build`: `bun run cv` does both.
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const port = 4329;
const chrome = process.env.CHROME ?? "google-chrome";
// Page to print, and the PDF it becomes (linked from ResumeDialog).
const pages = [
	{ path: "/", pdf: "public/cv.pdf" },
	{ path: "/fr/", pdf: "public/cv-fr.pdf" },
];
const preview = spawn("npx", ["astro", "preview", "--port", String(port)], {
	stdio: "ignore",
	detached: true,
});

try {
	const url = `http://localhost:${port}/`;
	for (let i = 0; ; i++) {
		try {
			if ((await fetch(url)).ok) break;
		} catch {}
		if (i === 50) throw new Error(`Preview did not answer on ${url}`);
		await new Promise((resolve) => setTimeout(resolve, 200));
	}
	for (const { path, pdf } of pages) {
		execFileSync(chrome, [
			"--headless",
			// A throwaway profile, so printing never touches the user's own Chrome.
			`--user-data-dir=${mkdtempSync(join(tmpdir(), "cv-chrome-"))}`,
			"--no-pdf-header-footer",
			// Lets the web font load before printing.
			"--virtual-time-budget=5000",
			`--print-to-pdf=${pdf}`,
			new URL(path, url).href,
		], { stdio: ["ignore", "inherit", "ignore"] });
	}
} finally {
	process.kill(-preview.pid);
}
