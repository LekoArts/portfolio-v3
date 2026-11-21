import { transition } from '@styles/tokens/motion'
import { globalStyle, style } from '@vanilla-extract/css'

export const logoStyle = style({
	transition: `transform ${transition.duration.normal} ${transition.easing['ease-out']}`,
})

globalStyle(`${logoStyle}:hover`, {
	'@media': {
		[transition.media['hover-motion']]: {
			transform: 'scale(1.05)',
		},
	},
})
