import type { CardVariants } from '@constants/types'
import type { StyleRule } from '@vanilla-extract/css'
import { themesSelectors } from '@styles/atoms.css'
import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { transition } from '@styles/tokens/motion'
import { zIndices } from '@styles/tokens/z-indices'
import { createVar, style, styleVariants } from '@vanilla-extract/css'

const cardShadow = createVar()

export const linkStyle = style({
	selectors: {
		[pseudoSelectors.hover]: {
			textDecoration: 'none',
		},
		[pseudoSelectors.focus]: {
			boxShadow: vars.shadow.none,
		},
	},
})

export const linkTargetStyle = style({
	position: 'absolute',
	inset: 0,
})

const cardBaseStyle = style({
	vars: {
		[cardShadow]: vars.shadow.card.default,
	},
	borderRadius: vars.borderRadius.lg,
	zIndex: zIndices.docked,
	position: 'relative',
	boxShadow: cardShadow,
	selectors: {
		[pseudoSelectors.after]: {
			vars: {
				[cardShadow]: vars.shadow.card.defaultHover,
			},
			content: '""',
			position: 'absolute',
			zIndex: zIndices.hide,
			width: vars.space.full,
			height: vars.space.full,
			boxShadow: cardShadow,
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
		[themesSelectors.dark]: {
			vars: {
				[cardShadow]: vars.shadow.card.defaultHoverDark,
			},
		},
	},
})

const cards: Record<CardVariants, StyleRule> = {
	'default': {
		'background': colorPalette.white,
		'padding': vars.space[4],
		'selectors': {
			[themesSelectors.dark]: {
				background: colorPalette.blueGray[800],
			},
		},
		'@media': {
			[minMediaQuery('lg')]: {
				padding: vars.space[6],
			},
		},
	},
	'title-only': {
		background: colorPalette.white,
		padding: vars.space[4],
		fontSize: vars.fontSize.lg,
		display: 'flex',
		alignItems: 'flex-end',
		selectors: {
			[themesSelectors.dark]: {
				background: `linear-gradient(180deg, oklch(0.248 0.042 265.755) 0%, ${colorPalette.blueGray[900]} 10%, ${colorPalette.blueGray[900]} 100%)`,
				vars: {
					[cardShadow]: vars.shadow.card.titleOnlyDark,
				},
			},
		},
	},
	'ghost': {
		'padding': vars.space[2],
		'vars': {
			[cardShadow]: vars.shadow.card.ghost,
		},
		'selectors': {
			[pseudoSelectors.after]: {
				vars: {
					[cardShadow]: vars.shadow.card.defaultHover,
				},
			},
			[themesSelectors.dark]: {
				vars: {
					[cardShadow]: vars.shadow.card.ghostDark,
				},
			},
		},
		'@media': {
			[minMediaQuery('md')]: {
				padding: vars.space[3],
			},
			[minMediaQuery('lg')]: {
				padding: vars.space[3],
			},
		},
	},
}

export const cardVariants = styleVariants(cards, card => [cardBaseStyle, card])

const baseTitleStyle = style({
	textWrap: 'balance',
	transition: 'color 0.3s ease-in-out',
	color: vars.color.heading,
	selectors: {
		[`${linkStyle}:hover &`]: {
			color: vars.color.primary,
		},
		[`${linkStyle}:focus &`]: {
			color: vars.color.primary,
		},
	},
})

const titles: Record<CardVariants, StyleRule> = {
	'default': {
		'fontSize': vars.fontSize.lg,
		'fontWeight': vars.fontWeight.bold,
		'@media': {
			[minMediaQuery('md')]: {
				fontSize: vars.fontSize.lgx,
			},
		},
	},
	'title-only': {
		'fontSize': vars.fontSize.md,
		'paddingTop': vars.space[0],
		'@media': {
			[minMediaQuery('md')]: {
				paddingTop: vars.space[4],
			},
			[minMediaQuery('lg')]: {
				fontSize: vars.fontSize.lg,
			},
		},
	},
	'ghost': {
		'fontSize': vars.fontSize.md,
		'display': 'flex',
		'gap': vars.space[3],
		'paddingTop': vars.space[0],
		'alignItems': 'flex-start',
		'@media': {
			[minMediaQuery('lg')]: {
				fontSize: vars.fontSize.lgx,
			},
		},
	},
}

export const titleVariants = styleVariants(titles, title => [baseTitleStyle, title])

export const defaultIconStyle = style({
	'width': vars.space[6],
	'height': vars.space[6],
	'position': 'absolute',
	'top': vars.space[0],
	'right': vars.space[0],
	'marginRight': vars.space[2],
	'marginTop': vars.space[2],
	'display': 'none',
	'@media': {
		[minMediaQuery('md')]: {
			display: 'block',
		},
	},
	'selectors': {
		[themesSelectors.dark]: {
			vars: {
				'--icon-bg': 'transparent',
			},
		},
	},
})

export const ghostIconStyle = style({
	'width': vars.space[6],
	'height': vars.space[6],
	'color': vars.color.textMuted,
	'marginTop': vars.space[0],
	'selectors': {
		[themesSelectors.dark]: {
			vars: {
				'--icon-bg': 'transparent',
			},
		},
	},
	'@media': {
		[minMediaQuery('md')]: {
			marginTop: vars.space[1],
		},
	},
})
