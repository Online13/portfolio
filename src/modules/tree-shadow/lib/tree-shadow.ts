import type { WindMode } from "./sakura-branch";

// Page space: x to the right, y up, in viewport heights (the visible page is [0, aspect] x [0, 1]).
export type TreeShadowConfig = {
	seed: number; // blossom layout
	aspect: number; // width / height of the area the branch is drawn in
	origin: [number, number]; // page position of that area's top-left corner
	size: number; // height of that area, in viewport heights
	maxWidth: number; // cap on its width, as a fraction of the viewport width
	strength: number; // 0..1, how dark the densest shadow gets
	softness: number; // blur radius (viewport heights) near the branch, grows toward the outer blossoms
	wind: number; // how far the branch sways for a given wind strength
	windMode: WindMode; // weather on page load
};

// A cherry branch outside, beyond the top-left corner: only its shadow reaches the page.
export const treeShadowConfig: TreeShadowConfig = {
	seed: 7,
	aspect: 1,
	origin: [-0.02, 1.02],
	size: 0.8,
	maxWidth: 0.5,
	strength: 0.5,
	softness: 0.008,
	wind: 1,
	windMode: "calm",
};

// Colors for each time of day: the room in the tree's shade, and in full light.
export type LightTone = { room: [number, number, number]; sun: [number, number, number] };

export const lightTones = {
	morning: { room: [0.72, 0.7, 0.7], sun: [1.0, 0.95, 0.86] },
	noon: { room: [0.76, 0.75, 0.73], sun: [1.0, 0.995, 0.97] },
	afternoon: { room: [0.72, 0.68, 0.65], sun: [1.0, 0.965, 0.9] },
	night: { room: [0.64, 0.68, 0.78], sun: [0.9, 0.93, 0.98] },
} satisfies Record<string, LightTone>;

export type TimeOfDay = keyof typeof lightTones;

// Local hour (0-23) -> time of day.
export function timeOfDay(hour: number): TimeOfDay {
	if (hour >= 6 && hour < 11) return "morning";
	if (hour >= 11 && hour < 15) return "noon";
	if (hour >= 15 && hour < 19) return "afternoon";
	return "night";
}

// GLSL, sampling the branch silhouette rendered into uTree: `vec3 treeShadowColor(vec2 p, vec2 fragCoord)` gives the room color at page point p.
export const treeShadowChunk = /* glsl */ `
	uniform sampler2D uTree;
	uniform vec2 uOrigin;
	uniform vec2 uSize;
	uniform float uStrength;
	uniform float uSoftness;
	uniform vec3 uRoom;
	uniform vec3 uSun;

	float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
	}

	float treeAt(vec2 uv) {
		// Nothing outside the drawn tree (the trunk side is off-screen anyway).
		vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
		return texture2D(uTree, vec2(uv.x, 1.0 - uv.y)).r * inside.x * inside.y;
	}

	float treeShadow(vec2 p) {
		// Branch area coords, v pointing down from the top-left corner.
		vec2 uv = vec2(p.x - uOrigin.x, uOrigin.y - p.y) / uSize;
		float reach = length(uv);

		// Penumbra: the farther branches cast softer shadows.
		float radius = uSoftness * (0.5 + 1.5 * reach);
		float shade = 0.0;
		for (int i = 0; i < 12; i++) {
			float a = float(i) * 2.39996;
			float r = sqrt((float(i) + 0.5) / 12.0) * radius;
			shade += treeAt(uv + vec2(cos(a), sin(a)) * r / uSize);
		}
		return shade / 12.0;
	}

	vec3 treeShadowColor(vec2 p, vec2 fragCoord) {
		vec3 color = mix(uSun, uRoom, treeShadow(p) * uStrength);
		// Grain avoids banding on the soft gradients.
		return color + (hash(fragCoord) - 0.5) / 255.0;
	}
`;
