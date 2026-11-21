/**
 * The logo is a single face outline. Its eyes are notches in that outline, so blinking means moving
 * the seven points that form each eye: the upper lid (inner corner, two curve handles, outer corner)
 * and the lower lid (two curve handles, inner bottom corner). Poses are authored for the left eye
 * in path order; the right eye is its mirror image.
 */
type Point = [x: number, y: number]
export type Eye = Point[]
type Easing = (t: number) => number

const UPPER_LID_POINTS = 4

const OPEN: Eye = [
	[56.25, 44.1798],
	[51.2868, 43.1623],
	[38.1618, 42.3483],
	[25.3676, 47.2323],
	[29.0441, 50.9631],
	[40.2573, 58.4248],
	[55.6985, 58.4248],
]
const WIDE: Eye = [
	[56.3, 42.9],
	[51.3, 41.5],
	[38.1, 40.7],
	[25.2, 47.1],
	[29.0441, 50.9631],
	[40.3, 58.9],
	[55.65, 58.9],
]
/** Breakdown pose: the upper lid is halfway down but still arched, the way a real lid moves over the eyeball */
const HALF: Eye = [
	[56.15, 49.8],
	[51, 49.2],
	[38, 46.4],
	[25.6, 47.4],
	[31.5, 51.6],
	[43.5, 57.4],
	[55.75, 57],
]
/** The upper lid does most of the travel; the lids meet low in the eye and the closed line bows downward */
const CLOSED: Eye = [
	[56, 54.2],
	[50.5, 55.6],
	[37.5, 52.6],
	[25.9, 47.6],
	[37.5, 53.2],
	[50.5, 56.2],
	[55.9, 55],
]

function lerpEye(from: Eye, to: Eye, t: number): Eye {
	return from.map(([x, y], i) => [x + (to[i][0] - x) * t, y + (to[i][1] - y) * t])
}

/** Lids open a hair wider than rest: used for anticipation before closing and the settle after opening */
const LIFT = lerpEye(OPEN, WIDE, 0.35)

function cubicBezier(x1: number, y1: number, x2: number, y2: number): Easing {
	const cx = 3 * x1
	const bx = 3 * (x2 - x1) - cx
	const ax = 1 - cx - bx
	const cy = 3 * y1
	const by = 3 * (y2 - y1) - cy
	const ay = 1 - cy - by
	return (x) => {
		let t = x
		for (let i = 0; i < 8; i++) {
			const error = ((ax * t + bx) * t + cx) * t - x
			const slope = (3 * ax * t + 2 * bx) * t + cx
			if (Math.abs(error) < 1e-6 || !slope)
				break
			t -= error / slope
		}
		t = Math.min(1, Math.max(0, t))
		return ((ay * t + by) * t + cy) * t
	}
}

const linear: Easing = t => t
const easeIn: Easing = t => t ** 3
const easeOut = cubicBezier(0.23, 1, 0.32, 1)
const easeInOut = cubicBezier(0.77, 0, 0.175, 1)

/** `null` holds the current pose */
type Step = [pose: Eye | null, duration: number, easing: Easing]

const BLINK: Step[] = [
	[LIFT, 80, easeInOut],
	[HALF, 90, easeIn],
	[CLOSED, 80, easeOut],
	[null, 60, linear],
	[HALF, 120, linear],
	[LIFT, 170, easeOut],
	[OPEN, 180, easeInOut],
]

/** Overlapping action: the lower lid trails the upper lid, and the right eye trails the left (ms) */
const DELAY = {
	leftUpper: 0,
	leftLower: 35,
	rightUpper: 20,
	rightLower: 55,
}

export const BLINK_DURATION = BLINK.reduce((sum, [, ms]) => sum + ms, 0) + DELAY.rightLower

function poseAt(time: number): Eye {
	let current = OPEN
	let t = Math.max(0, time)
	for (const [pose, ms, easing] of BLINK) {
		if (t < ms) {
			return pose
				? lerpEye(current, pose, easing(t / ms))
				: current
		}
		t -= ms
		if (pose)
			current = pose
	}
	return current
}

function eyeAt(time: number, upperDelay: number, lowerDelay: number): Eye {
	return [
		...poseAt(time - upperDelay).slice(0, UPPER_LID_POINTS),
		...poseAt(time - lowerDelay).slice(UPPER_LID_POINTS),
	]
}

/**
 * Both eyes (in left-eye path order) at `time` ms into the blink
 */
export function eyesAt(time: number): { left: Eye, right: Eye } {
	return {
		left: eyeAt(time, DELAY.leftUpper, DELAY.leftLower),
		right: eyeAt(time, DELAY.rightUpper, DELAY.rightLower),
	}
}

const p = ([x, y]: Point): string => `${+x.toFixed(4)} ${+y.toFixed(4)}`

/**
 * SVG path of the logo (150×150 viewBox) with the given eye poses
 */
export function logoPath(left: Eye = OPEN, right: Eye = left): string {
	const l = left
	const r = right.map(([x, y]) => [150 - x, y] as Point).reverse()
	return `M17.647 0.427197C35.7353 7.34621 63.4191 9.41513 75 9.58472C86.5809 9.41513 114.265 7.34621 132.353 0.427197C142.096 8.05846 157.941 28.5103 143.382 49.2673C128.824 70.0243 129.963 91.8328 132.353 100.142C124.856 103.412 111.253 113.023 103.104 128.56C87.1625 126.498 79.2041 122.336 77.2059 120.492V103.704C77.2059 95.5636 81.6177 94.0374 87.1324 94.0374C91.5441 94.0374 92.2794 92.0024 92.0956 90.9849C88.5662 75.1119 92.0956 62.6644 ${p(r[0])}C${p(r[1])} ${p(r[2])} ${p(r[3])}C${p(r[4])} ${p(r[5])} ${p(r[6])}C85.3677 57.2038 87.3162 77.4182 89.3382 85.8974C83.603 85.8974 77.3897 88.2715 75 89.4586C72.6103 88.2715 66.397 85.8974 60.6618 85.8974C62.6838 77.4182 64.6323 57.2038 ${p(l[0])}C${p(l[1])} ${p(l[2])} ${p(l[3])}C${p(l[4])} ${p(l[5])} ${p(l[6])}C57.9044 62.6644 61.4338 75.1119 57.9044 90.9849C57.7206 92.0024 58.4559 94.0374 62.8676 94.0374C68.3823 94.0374 72.7941 95.5636 72.7941 103.704V120.492C70.7959 122.336 62.8375 126.498 46.8965 128.56C38.7469 113.023 25.1443 103.412 17.6471 100.142C20.0368 91.8328 21.1765 70.0243 6.61764 49.2673C-7.94118 28.5103 7.9044 8.05846 17.647 0.427197ZM50.2092 136.096C54.9807 134.31 64.5209 131.685 75 131.685C85.4791 131.685 95.0193 134.31 99.7908 136.096C98.5747 139.489 97.6351 143.108 97.0588 146.947C94.1177 148.304 85.5882 150 75 150C64.4118 150 55.8823 148.304 52.9412 146.947C52.3649 143.108 51.4253 139.489 50.2092 136.096Z`
}
