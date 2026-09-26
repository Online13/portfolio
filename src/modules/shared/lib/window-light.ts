import { Euler, Vector3 } from "three";

// Page space: x to the right, y up, in viewport heights (the visible page is [0, aspect] x [0, 1]).
// World space: x = page x, y = height above the page, z = -page y.
export type WindowLightConfig = {
	window: {
		x: number; // page position under the window center
		y: number;
		height: number; // above the page
		width: number;
		length: number;
		tilt: number; // degrees, 0 = skylight (horizontal), 90 = wall (vertical)
		yaw: number; // degrees, rotation around the vertical axis
	};
	sun: {
		azimuth: number; // degrees, 0 = sun toward the page top, positive = to the right
		elevation: number; // degrees above the page
	};
	cells: [number, number]; // panes across width, along length
	bar: number; // half thickness of the mullions
	softness: number; // penumbra growth per unit of distance to the window
	drift: number; // 0..1, strength of the slow light variation
};

// The window sits outside, above the top-left corner of the page.
export const windowLightConfig: WindowLightConfig = {
	window: { x: -0.65, y: 1.75, height: 0.9, width: 0.75, length: 0.9, tilt: 70, yaw: 45 },
	sun: { azimuth: -45, elevation: 35 },
	cells: [2, 3],
	bar: 0.018,
	softness: 0.035,
	drift: 0.25,
};

// Colors of the room for each time of day: unlit corners, light bounced by the patch, the patch itself.
export type LightTone = { room: [number, number, number]; bounce: [number, number, number]; sun: [number, number, number] };

export const lightTones = {
	morning: { room: [0.65, 0.64, 0.64], bounce: [0.2, 0.18, 0.16], sun: [1.0, 0.93, 0.82] },
	noon: { room: [0.7, 0.69, 0.67], bounce: [0.22, 0.21, 0.19], sun: [1.0, 0.99, 0.96] },
	afternoon: { room: [0.66, 0.63, 0.6], bounce: [0.22, 0.2, 0.17], sun: [1.0, 0.965, 0.9] },
	night: { room: [0.36, 0.38, 0.44], bounce: [0.1, 0.11, 0.14], sun: [0.8, 0.85, 0.95] },
} satisfies Record<string, LightTone>;

export type TimeOfDay = keyof typeof lightTones;

function sunDirection({ azimuth, elevation }: WindowLightConfig["sun"]) {
	const az = (azimuth * Math.PI) / 180;
	const el = (elevation * Math.PI) / 180;
	// Unit vector from the page toward the sun.
	return new Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el));
}

function windowEuler({ tilt, yaw }: WindowLightConfig["window"]) {
	return new Euler(((tilt - 90) * Math.PI) / 180, (yaw * Math.PI) / 180, 0, "YXZ");
}

// Window-local point (x across width, y along length, centered) -> world.
function windowPoint(config: WindowLightConfig, u: number, v: number) {
	const w = config.window;
	return new Vector3(u * w.width, v * w.length, 0)
		.applyEuler(windowEuler(w))
		.add(new Vector3(w.x, w.height, -w.y));
}

// Follows the light from a world point down to the page. Returns page coords and ray length.
function projectToPage(point: Vector3, sun: Vector3) {
	const t = point.y / sun.y;
	const ground = point.clone().addScaledVector(sun, -t);
	return { page: [ground.x, -ground.z] as [number, number], distance: t };
}

// Lit patch = window projected on the page: a parallelogram origin + q.x * axisU + q.y * axisV.
export function windowLightUniforms(config: WindowLightConfig) {
	const sun = sunDirection(config.sun);
	const o = projectToPage(windowPoint(config, -0.5, -0.5), sun);
	const u = projectToPage(windowPoint(config, 0.5, -0.5), sun);
	const v = projectToPage(windowPoint(config, -0.5, 0.5), sun);

	const axisU = [u.page[0] - o.page[0], u.page[1] - o.page[1]];
	const axisV = [v.page[0] - o.page[0], v.page[1] - o.page[1]];
	const det = axisU[0] * axisV[1] - axisU[1] * axisV[0] || 1e-6;

	return {
		uOrigin: { value: o.page },
		uCenter: { value: [o.page[0] + (axisU[0] + axisV[0]) / 2, o.page[1] + (axisU[1] + axisV[1]) / 2] },
		// Rows of inverse([axisU axisV]): page offset -> window coords.
		uToWindow: { value: [axisV[1] / det, -axisV[0] / det, -axisU[1] / det, axisU[0] / det] },
		uAxisLen: { value: [Math.hypot(axisU[0], axisU[1]), Math.hypot(axisV[0], axisV[1])] },
		uDist: { value: [o.distance, u.distance - o.distance, v.distance - o.distance] },
		uCells: { value: config.cells },
		uBar: { value: [config.bar / config.window.width, config.bar / config.window.length] },
		uSoftness: { value: config.softness },
		uDrift: { value: config.drift },
		uTime: { value: 0 },
	};
}

// GLSL: `float windowLight(vec2 p)` gives the light intensity at page point p.
export const windowLightChunk = /* glsl */ `
	uniform vec2 uOrigin;
	uniform vec2 uCenter;
	uniform vec3 uRoom;
	uniform vec3 uBounce;
	uniform vec3 uSun;
	uniform vec4 uToWindow;
	uniform vec2 uAxisLen;
	uniform vec3 uDist;
	uniform vec2 uCells;
	uniform vec2 uBar;
	uniform float uSoftness;
	uniform float uDrift;
	uniform float uTime;

	float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
	}

	float noise(vec2 p) {
		vec2 i = floor(p);
		vec2 f = fract(p);
		vec2 u = f * f * (3.0 - 2.0 * f);
		return mix(
			mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
			mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
			u.y
		);
	}

	float fbm(vec2 p) {
		float v = 0.0;
		float a = 0.5;
		for (int i = 0; i < 4; i++) {
			v += a * noise(p);
			p *= 2.0;
			a *= 0.5;
		}
		return v;
	}

	// 1 inside [0, 1], soft edges of width blur.
	float band(float x, float blur) {
		return smoothstep(-blur, blur, x) * (1.0 - smoothstep(1.0 - blur, 1.0 + blur, x));
	}

	// 1 inside a pane, 0 on a mullion (edges included).
	float mullions(float x, float cells, float bar, float blur) {
		float d = abs(fract(x * cells + 0.5) - 0.5) / cells;
		return smoothstep(bar - blur, bar + blur, d);
	}

	float windowLight(vec2 p) {
		vec2 d = p - uOrigin;
		vec2 q = vec2(dot(uToWindow.xy, d), dot(uToWindow.zw, d));

		// Penumbra widens with the distance the light travels after the window.
		float dist = max(uDist.x + dot(q, uDist.yz), 0.0);
		vec2 blur = (0.003 + dist * uSoftness) / uAxisLen;

		float lit = band(q.x, blur.x) * band(q.y, blur.y);
		lit *= mullions(q.x, uCells.x, uBar.x, blur.x);
		lit *= mullions(q.y, uCells.y, uBar.y, blur.y);

		// Light scattered just around the patch.
		vec2 glowBlur = 0.12 / uAxisLen;
		float glow = band(q.x, glowBlur.x) * band(q.y, glowBlur.y);

		// Slow drifting variation, like thin clouds or foliage outside.
		float drift = fbm(q * uAxisLen * 2.5 + vec2(uTime * 0.03, uTime * 0.015));
		return clamp(lit * mix(1.0 - uDrift, 1.0, drift) + glow * 0.15, 0.0, 1.0);
	}

	// The room has no light of its own: only the sun patch and what bounces off it.
	vec3 windowLightColor(vec2 p, vec2 fragCoord) {
		float fill = exp(-distance(p, uCenter) * 1.3);
		vec3 color = uRoom + uBounce * fill;
		color = mix(color, uSun, windowLight(p));
		// Grain avoids banding on the soft gradients.
		return color + (hash(fragCoord) - 0.5) / 255.0;
	}
`;
