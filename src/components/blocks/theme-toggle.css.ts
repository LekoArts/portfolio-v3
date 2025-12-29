import { vars } from '@styles/themes/contract.css'
import { transition } from '@styles/tokens/motion'
import { globalStyle, style } from '@vanilla-extract/css'

export const toggleIconStyle = style({
})

globalStyle(`#lekoarts-theme-select .${toggleIconStyle}`, {
	color: vars.color.textMuted,
	transitionProperty: transition.property.all,
	transitionDuration: transition.duration.slow,
	transitionTimingFunction: transition.easing['ease-in-out'],
	borderRadius: vars.borderRadius.full,
	padding: 0,
	fontSize: vars.fontSize.md,
})

globalStyle(`#lekoarts-theme-select .${toggleIconStyle}:hover`, {
	color: vars.color.heading,
})
