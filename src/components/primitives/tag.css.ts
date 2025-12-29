import type { TagsColorSchemes } from '@constants/types'
import type { StyleRule } from '@vanilla-extract/css'
import { themesSelectors } from '@styles/atoms.css'
import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { transition } from '@styles/tokens/motion'
import { getColor, transparentizeDict } from '@utils/color'
import { createVar, style, styleVariants } from '@vanilla-extract/css'

const borderColorVar = createVar()

const tagBaseStyle = style({
	'fontWeight': vars.fontWeight.medium,
	'lineHeight': vars.lineHeight.shorter,
	'outline': '0',
	'borderRadius': vars.borderRadius.md,
	'display': 'inline-flex',
	'verticalAlign': 'top',
	'alignItems': 'center',
	'maxWidth': vars.space.full,
	'minHeight': vars.space[6],
	'minWidth': vars.space[6],
	'fontSize': vars.fontSize.xs,
	'paddingLeft': vars.space[2],
	'paddingRight': vars.space[2],
	'border': '1px solid transparent',
	'transition': `${transition.property.all} ${transition.duration.slow} ${transition.easing['ease-in-out']}`,
	'@media': {
		[minMediaQuery('md')]: {
			fontSize: vars.fontSize.sm,
		},
	},
	'selectors': {
		[pseudoSelectors.hover]: {
			borderColor: borderColorVar,
		},
	},
})

export const tagLabelBaseStyle = style({
	lineHeight: vars.lineHeight.shorter,
	overflow: 'visible',
})

function getColors(c: TagsColorSchemes): StyleRule {
	return {
		vars: {
			[borderColorVar]: getColor(colorPalette, `${c}.400`),
		},
		color: getColor(colorPalette, `${c}.800`),
		background: getColor(colorPalette, `${c}.100`),
		selectors: {
			[themesSelectors.dark]: {
				vars: {
					[borderColorVar]: transparentizeDict(`${c}.200`, 0.3)(colorPalette),
				},
				color: getColor(colorPalette, `${c}.200`),
				background: transparentizeDict(`${c}.200`, 0.16)(colorPalette),
			},
		},
	}
}

const tags: Record<TagsColorSchemes, StyleRule> = {
	green: getColors('green'),
	blue: getColors('blue'),
	purple: getColors('purple'),
	yellow: getColors('yellow'),
	teal: getColors('teal'),
	gray: getColors('gray'),
	red: getColors('red'),
	orange: getColors('orange'),
}

export const tagVariants = styleVariants(tags, tag => [tagBaseStyle, tag])

export const tagIconStyle = style({
	width: '1.2em',
	height: '1.2em',
	display: 'inline-block',
	lineHeight: '1.2em',
	flexShrink: 0,
	verticalAlign: 'top',
	marginRight: vars.space[2],
})
