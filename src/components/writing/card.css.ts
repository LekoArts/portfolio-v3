import { themesSelectors } from '@styles/atoms.css'
import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { createVar, style } from '@vanilla-extract/css'

const cardEdgeVar = createVar()
const cardInnerShadowVar = createVar()
const cardOuterShadowVar = createVar()

export const cardStyle = style({
	vars: {
		[cardEdgeVar]: '0 0 0 1px rgb(33 33 38/0.075)',
		[cardInnerShadowVar]: '0 1px 5px -4px rgba(19,19,22,0.7)',
		[cardOuterShadowVar]: '0 4px 8px rgba(32,42,54,0.05)',
	},
	position: 'relative',
	boxShadow: `${cardEdgeVar}, ${cardInnerShadowVar}, ${cardOuterShadowVar}`,
	selectors: {
		[pseudoSelectors.after]: {
			vars: {
				[cardEdgeVar]: '0 0 0 1px rgb(33 33 38/0.075)',
				[cardInnerShadowVar]: '0 1px 7px -4px rgba(19,19,22,0.8)',
				[cardOuterShadowVar]: '0 4px 11px rgba(32,42,54,0.05)',
			},
			content: '""',
			position: 'absolute',
			zIndex: -1,
			width: vars.space.full,
			height: vars.space.full,
			boxShadow: `${cardEdgeVar}, ${cardInnerShadowVar}, ${cardOuterShadowVar}`,
			opacity: 0,
			transitionProperty: 'opacity',
			transitionDuration: '.3s',
			transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
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
				[cardEdgeVar]: '0 0 0 1px rgb(87 87 113/0.5)',
				[cardInnerShadowVar]: '0 1px 7px -4px rgba(21, 93, 252, 0.5)',
				[cardOuterShadowVar]: '0 4px 11px rgba(57,67,79,0.1)',
			},
		},
	},
})

export const linkStyle = style({
	selectors: {
		[pseudoSelectors.hover]: {
			textDecoration: 'none',
		},
		[pseudoSelectors.focus]: {
			boxShadow: 'none',
		},
	},
})

export const linkTargetStyle = style({
	position: 'absolute',
	inset: 0,
})

export const headingStyle = style({
	textWrap: 'balance',
	transition: 'color 0.3s ease-in-out',
	selectors: {
		[`${linkStyle}:hover &`]: {
			color: vars.color.primary,
		},
		[`${linkStyle}:focus &`]: {
			color: vars.color.primary,
		},
	},
})
