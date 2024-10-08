export function round(num: number) {
	return num
		.toFixed(7)
		// TODO: Fix this regex
		// eslint-disable-next-line regexp/no-super-linear-backtracking
		.replace(/(\.\d+?)0+$/, '$1')
		.replace(/\.0$/, '')
}

/**
 * Converts pixel to a 16px based rem value
 * @param px
 * @returns Rounded 16px base rem value
 * @example rem(16) => 1rem
 */
export const rem = (px: number) => `${round(px / 16)}rem`

/**
 * Converts px & base to em
 * @param px
 * @param base
 * @returns Rounded px/base em value
 * @example em(12, 12) => 1em
 */
export const em = (px: number, base: number) => `${round(px / base)}em`
