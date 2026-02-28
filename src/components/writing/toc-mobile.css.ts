import { themesSelectors } from '@styles/atoms.css'
import { vars } from '@styles/themes/contract.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const detailsStyle = style({
	boxShadow: '0 0 0 1px rgb(33 33 38/0.045), 0 1px 7px -4px rgba(19,19,22,0.45), 0 4px 11px rgba(32,42,54,0.04)',
	selectors: {
		[themesSelectors.dark]: {
			boxShadow: '0 0 0 1px rgb(87 87 113/0.35), 0 1px 7px -4px rgba(21, 93, 252, 0.35), 0 4px 11px rgba(57,67,79,0.1)',
		},
	},
})

export const summaryStyle = style({
	cursor: 'pointer',
})

globalStyle(`${detailsStyle} ul li:last-of-type`, {
	marginBottom: vars.space[0],
})
