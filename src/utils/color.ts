/* eslint-disable perfectionist/sort-imports */
// Adapted from https://github.com/chakra-ui/chakra-ui/blob/ff0dfb2b735a047c7a811f65b20fb81fa3db6f4a/packages/theme-tools/src/color.ts

import 'culori/css'

import { memoizedGet as get } from '@utils/get'
import { converter, formatCss, parse } from 'culori/fn'

const toOklch = converter('oklch')

type Dict<T = unknown> = Record<string, T>

/**
 * Get the color raw value from colorPalette
 * @param colorPalette - the colorPalette object
 * @param color - the color path ('green.200')
 * @param fallback - the fallback color
 * @example get(colorPalette, 'green.200', 'green')
 * @return Either the color of the colorPalette or the fallback color
 */
export function getColor(colorPalette: Dict, color: string, fallback?: string) {
	const possiblyUndefinedColor = get(colorPalette, color, color)
	// parse returns 'undefined' for invalid colors
	const isValid = Boolean(parse(possiblyUndefinedColor))

	if (isValid) {
		return possiblyUndefinedColor
	}
	else {
		return fallback
	}
}

/**
 * Make a color transparent using a colorPalette and dot notation
 * @param color - the color in OKLCH, hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 * @example transparentizeDict('green.200', 0.5)(colorPalette)
 * @return The color in CSS OKLCH string
 */
export function transparentizeDict(color: string, opacity: number) {
	return (colorPalette: Dict) => {
		const raw = getColor(colorPalette, color)
		return transparentize(raw, opacity)
	}
}

/**
 * Make a color transparent
 * @param color - the color in OKLCH, hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 * @example transparentizeDict('#fff', 0.5)
 * @return The color in CSS OKLCH string
 */
export function transparentize(color: string, opacity: number) {
	const convertedColor = toOklch(color)

	if (convertedColor === undefined) {
		throw new Error(`Could not convert color "${color}" to OKLCH`)
	}

	return formatCss({ ...convertedColor, alpha: opacity })
}
