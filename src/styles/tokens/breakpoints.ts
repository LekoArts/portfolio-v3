export const breakpointNames = ['mobile', 'sm', 'md', 'lg', 'xl', '2xl'] as const

/**
 * For accessbility reasons the media queries are defined in "rem" unit.
 * The default (unchanged) font-size is 16px, so 1rem = 16px.
 */
export const breakpoints = {
	'mobile': 0, // 0px
	'sm': 40, // 640px
	'md': 48, // 768px
	'lg': 64, // 1024px
	'xl': 80, // 1280px
	'2xl': 96, // 1536px
} as const

// Get number values from breakpoints and exclude "mobile"
export const breakpointValues = Object.values(breakpoints).slice(1) as Array<Exclude<BreakpointValues, 0>>

export type Breakpoint = keyof typeof breakpoints
export type BreakpointValues = (typeof breakpoints)[Breakpoint]

export function minMediaQuery(breakpoint: Exclude<Breakpoint, 'mobile'>) {
	return `screen and (min-width: ${breakpoints[breakpoint]}rem)`
}
