import { vars } from '@styles/themes/contract.css'
import { colorPalette } from '@styles/tokens/colors'
import { globalStyle, style } from '@vanilla-extract/css'

export const toggleIconStyle = style({
})

globalStyle(`#lekoarts-theme-select .${toggleIconStyle}`, {
	color: vars.color.textMuted,
	transition: 'all 0.3s ease-in-out',
	borderRadius: vars.borderRadius.full,
	padding: 0,
	fontSize: vars.fontSize.md,
})

globalStyle(`#lekoarts-theme-select .${toggleIconStyle}:hover`, {
	color: vars.color.heading,
})

globalStyle(`div[data-variant-name="fullBleed"] #lekoarts-theme-select .${toggleIconStyle}`, {
	color: colorPalette.gray[100],
})

globalStyle(`div[data-variant-name="fullBleed"] #lekoarts-theme-select .${toggleIconStyle}:hover`, {
	color: 'white',
})
