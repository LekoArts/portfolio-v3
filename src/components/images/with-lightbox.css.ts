import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { style } from '@vanilla-extract/css'

export const withLightboxButtonStyle = style({
	borderRadius: vars.borderRadius.lg,
	[pseudoSelectors.focus]: {
		boxShadow: vars.shadow.outline,
		outline: 'none',
	},
})
