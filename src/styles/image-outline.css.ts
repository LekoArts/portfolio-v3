import { themesSelectors } from '@styles/atoms.css'
import { style } from '@vanilla-extract/css'

/**
 * Faint edge painted inside an image so pale skies or night shots don't blend into the page background
 */
export const imageOutlineStyle = style({
	outline: '1px solid rgb(0 0 0 / 0.1)',
	outlineOffset: '-1px',
	selectors: {
		[themesSelectors.dark]: {
			outlineColor: 'rgb(255 255 255 / 0.1)',
		},
	},
})
