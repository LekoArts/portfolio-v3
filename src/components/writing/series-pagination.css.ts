import { themesSelectors } from '@styles/atoms.css'
import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { transition } from '@styles/tokens/motion'
import { zIndices } from '@styles/tokens/z-indices'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

const cardShadow = createVar()
const cardShadowHover = createVar()
const transformVar = createVar()

export const wrapperStyle = style({
	'display': 'grid',
	'gridTemplateColumns': '1fr',
	'gridTemplateAreas': `"left"
  "right"`,
	'gap': vars.space[4],
	'@media': {
		[minMediaQuery('md')]: {
			gridTemplateColumns: '1fr 1fr',
			gridTemplateAreas: '"left right"',
		},
	},
})

export const itemStyle = style({
	'vars': {
		[cardShadow]: vars.shadow.card.default,
		[cardShadowHover]: vars.shadow.card.defaultHover,
	},
	'borderRadius': vars.borderRadius.lg,
	'zIndex': zIndices.docked,
	'position': 'relative',
	'boxShadow': cardShadow,
	'background': colorPalette.white,
	'padding': `${vars.space[2]} ${vars.space[3]}`,
	'fontSize': vars.fontSize.lg,
	'display': 'flex',
	'flexDirection': 'column',
	'gap': vars.space[2],
	'@media': {
		[minMediaQuery('md')]: {
			gap: vars.space[3],
			padding: `${vars.space[4]} ${vars.space[4]}`,
		},
	},
	'selectors': {
		[themesSelectors.dark]: {
			background: `linear-gradient(180deg, oklch(0.248 0.042 265.755) 0%, ${colorPalette.blueGray[900]} 10%, ${colorPalette.blueGray[900]} 100%)`,
			vars: {
				[cardShadow]: vars.shadow.card.titleOnlyDark,
				[cardShadowHover]: vars.shadow.card.defaultHoverDark,
			},
		},
		[pseudoSelectors.after]: {
			content: '""',
			position: 'absolute',
			zIndex: zIndices.hide,
			width: vars.space.full,
			height: vars.space.full,
			boxShadow: cardShadowHover,
			opacity: 0,
			transitionProperty: 'opacity',
			transitionDuration: transition.duration.slow,
			transitionTimingFunction: transition.easing['ease-in-out'],
			borderRadius: vars.borderRadius.lg,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
		[`&:hover:after, ${pseudoSelectors.focusWithin}:after`]: {
			opacity: 1,
		},
	},
})

export const annotationStyle = style({
	'vars': {
		[transformVar]: 'translate3d(6px, 0px, 0px)',
	},
	'letterSpacing': vars.letterSpacing.wider,
	'textTransform': 'uppercase',
	'fontWeight': vars.fontWeight.medium,
	'fontSize': vars.fontSize.xs,
	'color': colorPalette.gray[500],
	'selectors': {
		[themesSelectors.dark]: {
			color: colorPalette.blueGray[400],
		},
	},
	'@media': {
		[minMediaQuery('sm')]: {
			fontSize: vars.fontSize.sm,
		},
		'(prefers-reduced-motion: reduce)': {
			vars: {
				[transformVar]: 'translate3d(0px, 0px, 0px) !important',
			},
		},
	},
})

globalStyle(`${itemStyle} svg`, {
	height: '1.5em',
	width: '1.5em',
})

globalStyle(`${annotationStyle} > span`, {
	transform: 'translate3d(0px, 0px, 0px)',
	transition: `transform ${transition.duration.slow} cubic-bezier(.73,.26,.42,1.24)`,
})

globalStyle(`${itemStyle}:hover span[data-name="previous"]`, {
	transform: 'translate3d(-6px, 0px, 0px)',
})

globalStyle(`${itemStyle}:hover span[data-name="next"]`, {
	transform: 'translate3d(6px, 0px, 0px)',
})
