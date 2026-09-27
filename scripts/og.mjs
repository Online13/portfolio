// Renders public/og.png (1200x630) with Takumi: the name card over the site's tree shadow.
// og/tree-shadow.png is a capture of the TreeShadow canvas (night light), cropped to its top-left corner.
// Run: `bun run og`.
import { readFile, writeFile } from "node:fs/promises";
import { render } from "takumi-js";
import { googleFonts } from "takumi-js/helpers";

const shadow = await readFile(new URL("og/tree-shadow.png", import.meta.url));
// Lucide's map-pin.
const pin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;
// Lucide's arrow-right (Cabin has no arrow glyph).
const arrow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
const dataUrl = (type, bytes) => `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;

const html = `
<div style="position: relative; display: flex; width: 100%; height: 100%; font-family: Cabin; background-color: #e6ecf8; background-image: url('${dataUrl("image/png", shadow)}'); background-size: 100% 100%;">
	<div style="position: absolute; left: 552px; top: 225px; display: flex; flex-direction: column;">
		<div style="font-size: 72px; font-weight: 700; color: #0f172a; letter-spacing: -1.5px; line-height: 1;">Nekena Rayane</div>
		<div style="margin-top: 20px; font-size: 26px; font-weight: 600; color: #475569;">Software engineer / React Native enthusiast</div>
		<div style="margin-top: 14px; font-size: 21px; color: #64748b;">Building thoughtful web and mobile experiences.</div>
		<div style="margin-top: 42px; display: flex; align-items: center;">
			<img src="${dataUrl("image/svg+xml", pin)}" width="22" height="22" />
			<div style="margin-left: 12px; font-size: 16px; color: #475569;">Antananarivo, Madagascar</div>
		</div>
		<!-- Call to action. -->
		<div style="margin-top: 32px; display: flex; align-items: center;">
			<div style="display: flex; align-items: center; padding: 12px 22px; border-radius: 9999px; background-color: #0f172a; color: #ffffff; font-size: 18px; font-weight: 600;">
				Let's work together
				<img src="${dataUrl("image/svg+xml", arrow)}" width="18" height="18" style="margin-left: 10px;" />
			</div>
			<div style="margin-left: 18px; font-size: 18px; font-weight: 600; color: #475569;">nekena-rayane.com</div>
		</div>
	</div>
</div>`;

const png = await render(html, {
	width: 1200,
	height: 630,
	fonts: await googleFonts([{ name: "Cabin", weight: "400..700" }]),
});
await writeFile("public/og.png", png);
