import type { ContainerVariants } from '@components/primitives/container.css'
import type { StyleRule } from '@vanilla-extract/css'
import { themesSelectors } from '@styles/atoms.css'
import { vars } from '@styles/themes/contract.css'
import { colorPalette } from '@styles/tokens/colors'
import { zIndices } from '@styles/tokens/z-indices'
import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css'

export type FullWidthContainerVariants = Exclude<ContainerVariants, 'proseRoot'>

const tlg = (bottomColor: string, topColor: string) => `linear-gradient(to top, ${bottomColor} 0%, ${topColor} 100%)`

const fwcBaseStyle = style({
	width: vars.space.full,
	margin: vars.space[0],
})

const fullWidthContainers: Record<FullWidthContainerVariants, StyleRule> = {
	default: {
		background: vars.color.bg,
	},
	hero: {
		background: vars.color.bg,
		selectors: {
			[themesSelectors.dark]: {
				background: tlg(colorPalette.blueGray[950], vars.color.bg),
			},
		},
	},
	light: {
		background: colorPalette.blueGray[50],
		selectors: {
			[themesSelectors.dark]: {
				background: tlg(vars.color.bg, colorPalette.blueGray[800]),
			},
		},
	},
	dark: {
		background: colorPalette.blueGray[700],
		selectors: {
			[themesSelectors.dark]: {
				background: tlg(colorPalette.blueGray[900], colorPalette.blueGray[950]),
			},
		},
	},
	navigation: {
		background: vars.color.navigationBg,
		position: 'fixed',
		display: 'flex',
		zIndex: zIndices.sticky,
	},
	fullBleed: {
		background: 'transparent',
		color: 'white',
		display: 'flex',
		zIndex: zIndices.sticky,
	},
}

export const fullWidthContainerVariants = styleVariants(fullWidthContainers, fwc => [fwcBaseStyle, fwc])

export const backdropStyle = style({
	position: 'absolute',
	inset: 0,
	backdropFilter: 'blur(16px)',
	background: `linear-gradient(to bottom, ${vars.color.navigationBg} 0%, transparent 50%)`,
	height: '200%',
	maskImage: 'linear-gradient(to bottom, black 0% 50%, transparent 50% 100%)',
	pointerEvents: 'none',
})

const edgeThickness = createVar()

export const backdropEdgeStyleId = 'backdrop-edge-style'

globalStyle(`#${backdropEdgeStyleId}[data-scrolled="true"]`, {
	vars: {
		[edgeThickness]: '2px',
	},
})

export const backdropEdgeStyle = style({
	vars: {
		[edgeThickness]: '0px',
	},
	position: 'absolute',
	inset: 0,
	height: vars.space.full,
	transform: 'translateY(100%)',
	backdropFilter: 'blur(8px) brightness(1.4)',
	pointerEvents: 'none',
	maskImage: `linear-gradient(to bottom, black 0, black ${edgeThickness}, transparent ${edgeThickness}), linear-gradient(90deg, transparent 0, black 25%, black 75%, transparent 100%)`,
	maskComposite: 'intersect',
})
