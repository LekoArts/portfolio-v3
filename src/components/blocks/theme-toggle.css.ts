import { vars } from '@styles/themes/contract.css'
import { transition } from '@styles/tokens/motion'
import { globalStyle, style } from '@vanilla-extract/css'

export const toggleIconStyle = style({
})

globalStyle(`#lekoarts-theme-select .${toggleIconStyle}`, {
	color: vars.color.textMuted,
	transition: `color ${transition.duration.fast} ease, background-color ${transition.duration.fast} ease, transform ${transition.duration.fast} ${transition.easing['ease-out']}`,
	borderRadius: vars.borderRadius.full,
	padding: 0,
	fontSize: vars.fontSize.md,
})

globalStyle(`#lekoarts-theme-select .${toggleIconStyle}:hover`, {
	color: vars.color.heading,
})
