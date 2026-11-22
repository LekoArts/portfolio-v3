import { vars } from '@styles/themes/contract.css'
import { colorPalette } from '@styles/tokens/colors'
import { style } from '@vanilla-extract/css'

// Cancels the md ghost buttons' inline padding so their content lines up with the copyright row
export const footerLinksStyle = style({
	marginInline: `calc(${vars.space[4]} * -1)`,
})

export const iconStyle = style({
	color: colorPalette.blueGray[300],
})
