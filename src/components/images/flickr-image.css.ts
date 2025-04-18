import { vars } from '@styles/themes/contract.css'
import { style } from '@vanilla-extract/css'

export const flickrImageStyle = style({
	display: 'block',
	boxShadow: vars.shadow.lg,
	marginLeft: vars.space.auto,
	marginRight: vars.space.auto,
})
