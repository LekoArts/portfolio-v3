import { EC_CSS_VARS } from '@constants/ec.mjs'
import { vars } from '@styles/themes/contract.css'
import { transition } from '@styles/tokens/motion'
import { globalStyle, style } from '@vanilla-extract/css'
import { customTheme } from './sandpack.css'

export const spTabButton = style({
	borderBottom: '1px solid transparent',
	selectors: {
		'&[data-active=\'true\']': {
			borderBottom: '1.5px solid var(--sp-colors-accent)',
		},
	},
})

export const spWrapper = style({
	colorScheme: 'unset !important',
	boxShadow: `var(--${EC_CSS_VARS.frameBoxShadowCssValue}) !important`,
	borderRadius: `${vars.borderRadius.lg} !important`,
})

export const spCodeEditor = style({
	maxHeight: '50vh',
})

export const spPreviewContainer = style({
	borderRadius: vars.borderRadius.md,
})

export const spPreviewIframe = style({})

export const spTabs = style({
	borderTop: '1px solid rgba(214, 222, 235, 0.15)',
})

export const rootWrapper = style({
	overflow: 'hidden',
	borderRadius: vars.borderRadius.lg,
})

globalStyle(`${rootWrapper} ${spTabButton}[data-active='true']`, {
	fontWeight: vars.fontWeight.medium,
})

export const headerButtonWrapper = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.space[4],
})

export const middleWrapperButtonWrapper = style({
	display: 'flex',
	alignItems: 'center',
})

export const buttonBase = style({})

globalStyle(`${rootWrapper} ${buttonBase}`, {
	color: 'var(--sp-colors-clickable)',
})

globalStyle(`${rootWrapper} ${buttonBase}:hover`, {
	color: 'var(--sp-colors-hover)',
})

export const refreshButton = style([
	buttonBase,
	{
		transition: `color ${transition.duration.fast} ease, transform 250ms linear`,
		transform: 'rotate(0deg)',
	},
])

export const backwardButton = style([
	buttonBase,
	{
		transition: `color ${transition.duration.fast} ease`,
	},
])

export const exportButton = style([
	buttonBase,
	{
		transition: `color ${transition.duration.fast} ease`,
	},
])

export const previewWrapper = style({
	borderTop: '1px solid rgba(214, 222, 235, 0.15)',
	overflow: 'hidden',
	backgroundColor: customTheme.colors.surface1,
	padding: vars.space[4],
	height: vars.space.full,
})
