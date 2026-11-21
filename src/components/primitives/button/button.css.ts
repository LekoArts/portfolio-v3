import type { StyleRule } from '@vanilla-extract/css'
import { themesSelectors } from '@styles/atoms.css'
import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { transition } from '@styles/tokens/motion'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

const buttonBaseStyle = style({
	display: 'inline-flex',
	appearance: 'none',
	alignItems: 'center',
	justifyContent: 'center',
	userSelect: 'none',
	position: 'relative',
	whiteSpace: 'nowrap',
	verticalAlign: 'middle',
	outline: 'none',
	lineHeight: vars.lineHeight.shorter,
	borderRadius: vars.borderRadius.md,
	fontWeight: `${vars.fontWeight.normal} !important`,
	// box-shadow is left out on purpose so the focus ring appears instantly
	transition: `background-color ${transition.duration.fast} ease, border-color ${transition.duration.fast} ease, color ${transition.duration.fast} ease, transform ${transition.duration.fast} ${transition.easing['ease-out']}`,
	selectors: {
		[pseudoSelectors.focusVisible]: {
			boxShadow: vars.shadow.outline,
		},
		[pseudoSelectors.disabled]: {
			opacity: 0.4,
			cursor: 'not-allowed',
			boxShadow: vars.shadow.none,
		},
	},
})

export type ButtonKind = 'button' | 'link'

export type VariantNames = 'primary' | 'link' | 'outline' | 'ghost'

const buttons: Record<VariantNames, StyleRule> = {
	primary: {
		background: vars.color.primary,
		color: vars.color.textPrimaryButton,
		textDecoration: 'none !important',
		selectors: {
			[pseudoSelectors.hover]: {
				background: vars.color.primaryHover,
			},
			[pseudoSelectors.active]: {
				background: vars.color.primaryHover,
			},
		},
	},
	link: {
		padding: '0 !important',
		height: vars.space.auto,
		lineHeight: vars.lineHeight.base,
		verticalAlign: 'baseline',
		color: colorPalette.gray[500],
		textDecoration: 'none !important',
		selectors: {
			[pseudoSelectors.hover]: {
				textDecoration: 'underline !important',
			},
			[pseudoSelectors.active]: {
				color: colorPalette.gray[700],
			},
			[themesSelectors.dark]: {
				color: colorPalette.gray[200],
			},
		},
	},
	outline: {
		color: vars.color.heading,
		background: 'transparent',
		borderStyle: 'solid',
		borderColor: vars.color.primary,
		borderWidth: '1px',
		selectors: {
			[pseudoSelectors.hover]: {
				color: 'white',
				background: vars.color.primary,
			},
		},
	},
	ghost: {
		color: 'inherit',
		background: 'transparent',
		selectors: {
			[pseudoSelectors.hover]: {
				background: vars.color.ghostBg,
			},
			[pseudoSelectors.active]: {
				background: vars.color.ghostBg,
			},
		},
	},
}

// Inline text buttons (`link` variant) shouldn't shrink
const pressStyle = style({
	'@media': {
		[transition.media.motion]: {
			selectors: {
				'&:active:not([disabled], [aria-disabled=true])': {
					transform: transition.press,
				},
			},
		},
	},
})

export const buttonVariants = styleVariants(buttons, (btn, name) => name === 'link'
	? [buttonBaseStyle, btn]
	: [buttonBaseStyle, pressStyle, btn])

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'brand'

const sizes: Record<Sizes, StyleRule> = {
	xs: {
		height: vars.space[6],
		minWidth: vars.space[6],
		fontSize: vars.fontSize.xs,
		paddingLeft: vars.space[2],
		paddingRight: vars.space[2],
	},
	sm: {
		height: vars.space[8],
		minWidth: vars.space[8],
		fontSize: vars.fontSize.sm,
		paddingLeft: vars.space[3],
		paddingRight: vars.space[3],
	},
	md: {
		height: vars.space[10],
		minWidth: vars.space[10],
		fontSize: vars.fontSize.md,
		paddingLeft: vars.space[4],
		paddingRight: vars.space[4],
	},
	lg: {
		height: vars.space[12],
		minWidth: vars.space[12],
		fontSize: vars.fontSize.lg,
		paddingLeft: vars.space[6],
		paddingRight: vars.space[6],
	},
	brand: {
		height: vars.space[8],
		minWidth: vars.space[10],
		fontSize: vars.fontSize.md,
		paddingLeft: vars.space[4],
		paddingRight: vars.space[4],
	},
}

export const sizesVariants = styleVariants(sizes, size => [size])

export const arrowAnimationStyle = style({})

globalStyle(`${arrowAnimationStyle} > span`, {
	transition: `transform ${transition.duration.normal} ${transition.easing['ease-out']}`,
})

globalStyle(`${arrowAnimationStyle} svg`, {
	height: '1.5em',
	width: '1.5em',
})

globalStyle(`${arrowAnimationStyle}:hover > span`, {
	'@media': {
		[transition.media['hover-motion']]: {
			transform: 'translate3d(6px, 0px, 0px)',
		},
	},
})

export const subtleButtonStyle = style({
	'letterSpacing': vars.letterSpacing.wider,
	'textTransform': 'uppercase',
	'fontWeight': vars.fontWeight.medium,
	'fontSize': vars.fontSize.xs,
	'@media': {
		[minMediaQuery('sm')]: {
			fontSize: vars.fontSize.sm,
		},
	},
})

export const iconButtonStyle = style({
	display: 'inline-flex',
	alignSelf: 'center',
	flexShrink: 0,
	marginLeft: vars.space[2],
})
