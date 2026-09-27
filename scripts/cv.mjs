// Prints the home page to public/cv.pdf with headless Chrome: its print styles keep only the resume.
// Run after `astro build`: `bun run cv` does both.
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const port = 4329;
const chrome = process.env.CHROME ?? "google-chrome";
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
	execFileSync(chrome, [
		"--headless",
		// A throwaway profile, so printing never touches the user's own Chrome.
		`--user-data-dir=${mkdtempSync(join(tmpdir(), "cv-chrome-"))}`,
		"--no-pdf-header-footer",
		// Lets the web font load before printing.
		"--virtual-time-budget=5000",
		"--print-to-pdf=public/cv.pdf",
		url,
	], { stdio: ["ignore", "inherit", "ignore"] });
} finally {
	process.kill(-preview.pid);
}
