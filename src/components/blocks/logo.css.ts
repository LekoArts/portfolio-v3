import { pseudoSelectors } from '@styles/selectors'
import { style } from '@vanilla-extract/css'

export const logoStyle = style({
	transform: 'scale(1)',
	selectors: {
		[pseudoSelectors.hover]: {
			transform: 'scale(1.1)',
		},
	},
})
