import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { style } from '@vanilla-extract/css'

export const cardStyle = style({
	boxShadow: vars.shadow.lg,
	selectors: {
		[pseudoSelectors.focusWithin]: {
			boxShadow: vars.shadow.outline,
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
