import {
	CircleGeometry,
	InstancedMesh,
	Matrix4,
	MeshBasicMaterial,
	PlaneGeometry,
	Scene,
	Shape,
	ShapeGeometry,
	Vector3,
} from "three";

// Branch space: x to the right, y down, in heights of the shadow area ([0, aspect] x [0, 1]).
// Modeled after a photo of a cherry branch: a short stout base in the corner, one long slender limb
// along the top, medium and short ones around it. Blossoms are dense near the corner, sparse at the tips.
type Point = [number, number];
type Limb = {
	from?: [limb: number, point: number]; // grows from a point of an earlier limb, else anchored at its first point
	points: Point[];
	width: [number, number]; // at the base and at the tip
};
type Cluster = {
	on: [limb: number, point: number];
	center: Point;
	radius: Point;
	spurs: number;
};

const limbs: Limb[] = [
	// 0: stout base, coming from beyond the corner
	{ points: [[-0.08, -0.04], [0.02, 0.05], [0.09, 0.11], [0.16, 0.16]], width: [0.032, 0.017] },
	// 1: long slender limb along the top
	{
		from: [0, 2],
		points: [[0.2, 0.1], [0.32, 0.085], [0.45, 0.09], [0.58, 0.075], [0.7, 0.09], [0.82, 0.08], [0.9, 0.1]],
		width: [0.013, 0.003],
	},
	// 2: medium limb going down and right
	{ from: [0, 3], points: [[0.23, 0.23], [0.3, 0.3], [0.36, 0.35], [0.42, 0.42]], width: [0.014, 0.005] },
	// 3: short limb hanging from the base
	{ from: [0, 2], points: [[0.08, 0.2], [0.07, 0.28], [0.09, 0.35]], width: [0.01, 0.004] },
	// 4: twig off the medium limb
	{ from: [2, 1], points: [[0.36, 0.24], [0.4, 0.22]], width: [0.005, 0.003] },
	// 5: twig drooping from the long limb
	{ from: [1, 2], points: [[0.34, 0.16], [0.37, 0.21]], width: [0.005, 0.003] },
	// 6: twig rising from the long limb
	{ from: [1, 4], points: [[0.62, 0.03]], width: [0.004, 0.003] },
	// 7: medium limb down the left edge
	{ from: [0, 1], points: [[0.0, 0.18], [-0.01, 0.3], [0.02, 0.42], [0.03, 0.5]], width: [0.012, 0.004] },
	// 8: twig near the tip of the long limb
	{ from: [1, 6], points: [[0.86, 0.14]], width: [0.003, 0.002] },
];

const clusters: Cluster[] = [
	{ on: [0, 3], center: [0.15, 0.12], radius: [0.1, 0.09], spurs: 14 },
	{ on: [1, 1], center: [0.32, 0.06], radius: [0.06, 0.05], spurs: 7 },
	{ on: [5, 1], center: [0.37, 0.22], radius: [0.05, 0.05], spurs: 6 },
	{ on: [1, 4], center: [0.6, 0.1], radius: [0.05, 0.04], spurs: 4 },
	{ on: [6, 0], center: [0.63, 0.04], radius: [0.035, 0.03], spurs: 3 },
	{ on: [8, 0], center: [0.87, 0.14], radius: [0.035, 0.035], spurs: 2 },
	{ on: [1, 6], center: [0.91, 0.1], radius: [0.03, 0.03], spurs: 2 },
	{ on: [2, 1], center: [0.3, 0.3], radius: [0.07, 0.06], spurs: 8 },
	{ on: [4, 1], center: [0.41, 0.21], radius: [0.03, 0.03], spurs: 3 },
	{ on: [2, 3], center: [0.44, 0.44], radius: [0.05, 0.05], spurs: 4 },
	{ on: [3, 2], center: [0.1, 0.35], radius: [0.06, 0.06], spurs: 7 },
	{ on: [7, 1], center: [0.02, 0.26], radius: [0.05, 0.05], spurs: 4 },
	{ on: [7, 3], center: [0.04, 0.5], radius: [0.04, 0.04], spurs: 3 },
];

const twigWidth = 0.0035;
const stemWidth = 0.0014;

function random(seed: number) {
	// mulberry32
	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// Five notched petals, 1 unit wide.
function blossomShape() {
	const shape = new Shape();
	const steps = 80;
	for (let i = 0; i <= steps; i++) {
		const a = (i / steps) * Math.PI * 2;
		const lobe = Math.abs(Math.cos(2.5 * a));
		const r = 0.5 * (0.3 + 0.7 * lobe ** 0.6 - 0.12 * lobe ** 60);
		const x = Math.cos(a) * r;
		const y = Math.sin(a) * r;
		if (i === 0) shape.moveTo(x, y);
		else shape.lineTo(x, y);
	}
	return new ShapeGeometry(shape);
}

// Joints bend a little each; the bends add up toward the tips.
type Joint = { parent: number; rest: Point; flex: number; phase: number };
type Spur = { joint: number; rest: Point; phase: number };
type Flower = { spur: number; rest: Point; size: number; spin: number; tilt: number; phase: number };
type Segment = [a: Point, b: Point, width: number];

// How strong the wind is between gusts, and how much the gusts add on top.
export const windModes = {
	calm: { base: 0.9, gusts: 1.1 },
	breeze: { base: 1.3, gusts: 1.2 },
	gusty: { base: 1.1, gusts: 2.4 },
	storm: { base: 2.2, gusts: 2.2 },
} satisfies Record<string, { base: number; gusts: number }>;

export type WindMode = keyof typeof windModes;

// A cherry branch drawn white on black, moved by the wind with `update(time)`; `setWind` changes the weather.
export function createSakuraBranch(seed: number, wind: number, initialMode: WindMode) {
	const rand = random(seed);
	const between = (a: number, b: number) => a + (b - a) * rand();

	const joints: Joint[] = [];
	const restPosition: Point[] = [];
	const branchSegments: [a: number, b: number, width: number][] = [];

	// A joint at `point`, hanging from `parent` (-1 = anchored), joined to it by a segment of `width`.
	function addJoint(parent: number, point: Point, width: number) {
		const base = restPosition[parent];
		const rest: Point = parent < 0 ? point : [point[0] - base[0], point[1] - base[1]];
		// Thinner parts, farther from the anchor, give more.
		const flex = parent < 0 ? 0 : joints[parent].flex + Math.hypot(rest[0], rest[1]);
		const id = joints.push({ parent, rest, flex, phase: rand() * Math.PI * 2 }) - 1;
		restPosition.push(point);
		if (parent >= 0) branchSegments.push([parent, id, width]);
		return id;
	}

	const limbJoints: number[][] = [];
	for (const limb of limbs) {
		let parent = limb.from ? limbJoints[limb.from[0]][limb.from[1]] : -1;
		limbJoints.push(
			limb.points.map((point, i) => {
				const t = limb.points.length > 1 ? i / (limb.points.length - 1) : 1;
				parent = addJoint(parent, point, limb.width[0] + (limb.width[1] - limb.width[0]) * t);
				return parent;
			}),
		);
	}

	const spurs: Spur[] = [];
	const flowers: Flower[] = [];
	for (const cluster of clusters) {
		const joint = limbJoints[cluster.on[0]][cluster.on[1]];
		const [jx, jy] = restPosition[joint];
		// Short bent twigs spread through the bunch; spurs of blossoms sit along them.
		const twigs = Math.max(2, Math.round(cluster.spurs / 2.5));
		for (let t = 0; t < twigs; t++) {
			const a = rand() * Math.PI * 2;
			const r = Math.sqrt(rand()) * 0.85;
			const tip: Point = [cluster.center[0] + Math.cos(a) * r * cluster.radius[0], cluster.center[1] + Math.sin(a) * r * cluster.radius[1]];
			const bend = between(-0.2, 0.2);
			const mid: Point = [(jx + tip[0]) / 2 - (tip[1] - jy) * bend, (jy + tip[1]) / 2 + (tip[0] - jx) * bend];
			const midJoint = addJoint(joint, mid, twigWidth * 1.4);
			const tipJoint = addJoint(midJoint, tip, twigWidth);

			for (let s = 0; s < cluster.spurs / twigs; s++) {
				const on = s % 3 === 1 ? midJoint : tipJoint;
				const offset: Point = [between(-0.025, 0.025), between(-0.025, 0.025)];
				const spur = spurs.push({ joint: on, rest: offset, phase: rand() * Math.PI * 2 }) - 1;
				const [sx, sy] = restPosition[on];
				// Each spur holds a small umbel, hanging outward from the bunch.
				const outward = Math.atan2(sy + offset[1] - cluster.center[1], sx + offset[0] - cluster.center[0]);
				const count = 4 + Math.floor(rand() * 3);
				for (let f = 0; f < count; f++) {
					const dir = outward + between(-1.5, 1.5) + 0.3;
					const length = between(0.015, 0.04);
					flowers.push({
						spur,
						rest: [Math.cos(dir) * length, Math.sin(dir) * length],
						size: between(0.04, 0.062),
						spin: rand() * Math.PI * 2,
						tilt: between(0.45, 1),
						phase: rand() * Math.PI * 2,
					});
				}
			}
		}
	}

	const material = new MeshBasicMaterial({ color: 0xffffff });
	const segmentCount = branchSegments.length + spurs.length + flowers.length;
	const segments = new InstancedMesh(new PlaneGeometry(1, 1), material, segmentCount);
	const knots = new InstancedMesh(new CircleGeometry(0.5, 12), material, segmentCount);
	const blossoms = new InstancedMesh(blossomShape(), material, flowers.length);
	const scene = new Scene();
	for (const mesh of [segments, knots, blossoms]) {
		mesh.frustumCulled = false;
		scene.add(mesh);
	}

	const matrix = new Matrix4();
	const scale = new Vector3();
	const position: Point[] = joints.map(() => [0, 0]);
	const angle = joints.map(() => 0);
	const spurPosition: Point[] = spurs.map(() => [0, 0]);
	const spurAngle = spurs.map(() => 0);

	const rotate = ([x, y]: Point, a: number): Point => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

	// Branch space has y down; the scene has y up.
	function place(mesh: InstancedMesh, i: number, [x, y]: Point, a: number, sx: number, sy: number) {
		matrix.makeRotationZ(-a).scale(scale.set(sx, sy, 1)).setPosition(x, -y, 0);
		mesh.setMatrixAt(i, matrix);
	}

	function drawSegment(i: number, [a, b, width]: Segment) {
		const dx = b[0] - a[0];
		const dy = b[1] - a[1];
		place(segments, i, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], Math.atan2(dy, dx), Math.hypot(dx, dy), width);
		place(knots, i, b, 0, width, width);
	}

	// The motion runs on its own clock, faster in strong wind, so speed changes never make it jump.
	let lastTime: number | undefined;
	let clock = 0;
	let mode = windModes[initialMode];
	let gust = mode.base;

	function update(time: number) {
		// Capped so a long pause (hidden tab) doesn't skip ahead.
		const dt = Math.min(0.1, Math.max(0, time - (lastTime ?? time)));
		lastTime = time;
		// Calm spells and strong gusts alternate every few seconds, never quite repeating.
		const weather = 0.5 * Math.sin(time * 0.37) + 0.3 * Math.sin(time * 0.61 + 2) + 0.2 * Math.sin(time * 1.3 + 4);
		// Eased, so switching modes picks up or dies down over a second or two.
		const target = mode.base + mode.gusts * Math.max(0, weather) ** 1.5;
		gust += (target - gust) * (1 - Math.exp(-dt * 1.5));
		clock += dt * (0.6 + 0.8 * gust);

		// Each gust travels across the branch from the left.
		const breeze = (x: number, phase: number, speed: number) =>
			gust * (0.35 + 0.45 * Math.sin(clock * speed - x * 4 + phase) + 0.2 * Math.sin(clock * speed * 2.3 - x * 7 + phase * 1.7));

		joints.forEach((joint, i) => {
			if (joint.parent < 0) {
				position[i] = joint.rest;
				return;
			}
			const base = position[joint.parent];
			angle[i] = angle[joint.parent] + wind * 0.022 * joint.flex * breeze(base[0], joint.phase * 0.2, 0.9);
			const [dx, dy] = rotate(joint.rest, angle[i]);
			position[i] = [base[0] + dx, base[1] + dy];
		});

		let s = 0;
		for (const [a, b, width] of branchSegments) drawSegment(s++, [position[a], position[b], width]);

		spurs.forEach((spur, i) => {
			const base = position[spur.joint];
			spurAngle[i] = angle[spur.joint] + wind * 0.06 * breeze(base[0], spur.phase, 1.4);
			const [dx, dy] = rotate(spur.rest, spurAngle[i]);
			spurPosition[i] = [base[0] + dx, base[1] + dy];
			drawSegment(s++, [base, spurPosition[i], twigWidth]);
		});

		flowers.forEach((flower, i) => {
			const base = spurPosition[flower.spur];
			// Blossoms swing on their stems and turn, showing more or less of their face.
			const flutter = wind * 0.35 * breeze(base[0], flower.phase, 2.6);
			const [dx, dy] = rotate(flower.rest, spurAngle[flower.spur] + flutter);
			const at: Point = [base[0] + dx, base[1] + dy];
			drawSegment(s++, [base, at, stemWidth]);
			const tilt = flower.tilt * (1 - 0.25 * wind * Math.max(0, Math.sin(clock * 1.7 + flower.phase)));
			place(blossoms, i, at, flower.spin + flutter, flower.size, flower.size * tilt);
		});

		for (const mesh of [segments, knots, blossoms]) mesh.instanceMatrix.needsUpdate = true;
	}

	return {
		scene,
		update,
		setWind: (next: WindMode) => {
			mode = windModes[next];
		},
	};
}
