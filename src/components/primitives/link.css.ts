import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { transition } from '@styles/tokens/motion'
import { style } from '@vanilla-extract/css'

export const linkStyle = style({
	transitionProperty: transition.property.all,
	transitionDuration: transition.duration.slow,
	transitionTimingFunction: transition.easing['ease-in-out'],
	cursor: 'pointer',
	textDecoration: 'none',
	outline: '2px solid transparent',
	outlineOffset: '2px',
	color: 'inherit',
	selectors: {
		[pseudoSelectors.hover]: {
			textDecoration: 'underline',
		},
		[pseudoSelectors.focus]: {
			boxShadow: vars.shadow.outline,
		},
	},
})
