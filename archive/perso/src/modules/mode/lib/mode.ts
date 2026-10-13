// The site is several portfolios in one page (see docs/DIRECTION.md). The shown one is <html data-mode>, set from
// ?mode= by MainLayout's head script; an element with data-mode-only="perso" is displayed in that mode alone.
export const MODES = ["pro", "explore", "creatif", "perso"] as const;
export type Mode = (typeof MODES)[number];

export const DEFAULT_MODE: Mode = "pro";
export const MODE_PARAM = "mode";

// Sent on window after the mode changes.
export const MODE_CHANGE = "mode:change";

// Anything unknown falls back to the default mode.
export const toMode = (value: string | null | undefined): Mode =>
	MODES.includes(value as Mode) ? (value as Mode) : DEFAULT_MODE;

export const currentMode = () => toMode(document.documentElement.dataset.mode);

export function setMode(mode: Mode) {
	if (mode === currentMode()) return;
	const url = new URL(location.href);
	url.searchParams.set(MODE_PARAM, mode);
	history.replaceState(history.state, "", url);

	const show = () => {
		document.documentElement.dataset.mode = mode;
		// Each mode is its own page: it opens at the top.
		window.scrollTo({ top: 0, behavior: "instant" });
		window.dispatchEvent(new CustomEvent(MODE_CHANGE));
	};
	// Cross-fades the two modes where the browser can.
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (document.startViewTransition && !reducedMotion) document.startViewTransition(show);
	else show();
}
