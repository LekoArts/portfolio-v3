import { EC_CSS_VARS } from '@constants/ec.mjs'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { globalStyle, style } from '@vanilla-extract/css'

export const spLayout = style({
	'borderTopLeftRadius': '0px !important',
	'borderTopRightRadius': '0px !important',
	'border': 'none !important',
	'vars': {
		'--sp-layout-height': '400px',
	},
	'@media': {
		[minMediaQuery('md')]: {
			vars: {
				'--sp-layout-height': '500px',
			},
		},
	},
})

export const spWrapper = style({
	colorScheme: 'unset !important',
	boxShadow: `var(--${EC_CSS_VARS.frameBoxShadowCssValue}) !important`,
	borderRadius: `${vars.borderRadius.lg} !important`,
})

export const rootWrapper = style({
	overflow: 'hidden',
	borderRadius: vars.borderRadius.lg,
})

globalStyle(`${rootWrapper} pre code`, {
	color: 'var(--sp-syntax-color-plain)',
	fontFamily: 'var(--sp-font-mono)',
	fontSize: 'var(--sp-font-size)',
	background: 'unset',
	fontWeight: 'unset',
	borderRadius: 'unset',
})
