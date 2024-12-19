import { vars } from '@styles/themes/contract.css'
import { style } from '@vanilla-extract/css'

export const artImageWrapperStyle = style({
	display: 'block',
	selectors: {
		'&.hidden': {
			display: 'none',
		},
	},
})

export const artImageStyle = style({
	boxShadow: vars.shadow.lg,
	marginLeft: vars.space.auto,
	marginRight: vars.space.auto,
})
