import type { WindMode } from "./sakura-branch";

// A spell of weather set off by something happening on the page. It lasts `seconds` after the last
// time it was set off (so scrolling keeps it going), then the weather settles back to calm. `rate` is
// how sharply the branch follows it (see setWind).
export type Flow = { mode: WindMode; rate: number; seconds: number };

export const flows = {
	scroll: { mode: "gusty", rate: 3, seconds: 0.3 },
	hover: { mode: "breeze", rate: 1.5, seconds: 3 },
	link: { mode: "storm", rate: 8, seconds: 4 },
	randomBreeze: { mode: "breeze", rate: 1.5, seconds: 12 },
	randomGusty: { mode: "gusty", rate: 1.5, seconds: 8 },
} satisfies Record<string, Flow>;

// How long the weather stays calm before a random spell, in seconds.
const calmSpell: [number, number] = [20, 60];

// A flow in progress is never cut short by a weaker or equal one: only a stronger one takes over.
const strength: Record<WindMode, number> = { calm: 0, breeze: 1, gusty: 2, storm: 3 };

const random = ([min, max]: [number, number]) => min + Math.random() * (max - min);

// The weather as a state machine: calm until a flow is set off, by the page (`trigger`) or at random
// after a calm spell, then calm again once the flow is over.
export function createWeather(onChange: (mode: WindMode, rate: number) => void) {
	let current: Flow | null = null;
	let end: ReturnType<typeof setTimeout> | undefined;
	let wander: ReturnType<typeof setTimeout> | undefined;

	function calm() {
		current = null;
		onChange("calm", 1.5);
		wander = setTimeout(() => trigger(Math.random() < 0.5 ? flows.randomBreeze : flows.randomGusty), random(calmSpell) * 1000);
	}

	function trigger(flow: Flow) {
		if (current && flow !== current && strength[flow.mode] <= strength[current.mode]) return;
		if (flow !== current) onChange(flow.mode, flow.rate);
		current = flow;
		clearTimeout(wander);
		clearTimeout(end);
		end = setTimeout(calm, flow.seconds * 1000);
	}

	calm();
	return { trigger };
}
