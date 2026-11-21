import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { transition } from '@styles/tokens/motion'
import { style } from '@vanilla-extract/css'

export const linkStyle = style({
	transition: `color ${transition.duration.fast} ease`,
	cursor: 'pointer',
	textDecoration: 'none',
	outline: '2px solid transparent',
	outlineOffset: '2px',
	color: 'inherit',
	selectors: {
		[pseudoSelectors.hover]: {
			textDecoration: 'underline',
		},
		[pseudoSelectors.focusVisible]: {
			boxShadow: vars.shadow.outline,
		},
	},
})
