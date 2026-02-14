import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { colorPalette } from '@styles/tokens/colors'
import { transition } from '@styles/tokens/motion'
import { globalStyle, style } from '@vanilla-extract/css'
import { customTheme } from './sandpack.css'

export const spTabButton = style({
	borderBottom: '1px solid transparent',
	selectors: {
		'&[data-active=\'true\']': {
			borderBottom: '1px solid var(--sp-colors-accent)',
		},
	},
})

export const spWrapper = style({
	colorScheme: 'unset !important',
})

export const spCodeEditor = style({
	maxHeight: '50vh',
})

export const spPreviewContainer = style({
	borderRadius: vars.borderRadius.md,
})

export const spPreviewIframe = style({})

export const rootWrapper = style({
	overflow: 'hidden',
	borderRadius: vars.borderRadius.lg,
})

globalStyle(`${rootWrapper} ${spTabButton}[data-active='true']`, {
	color: colorPalette.white,
})

export const header = style({
	color: 'rgb(214, 222, 235)',
	background: 'linear-gradient(to bottom, rgb(14 61 100) 0%, rgb(6 41 69) 100%)',
	borderBottom: '1px solid rgba(214, 222, 235, 0.15)',
	boxShadow: 'inset 0 1px 0px 0px rgba(255, 255, 255, 0.05), inset 0 -1px 0px 0px rgba(0, 0, 0, 0.05)',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	fontSize: vars.fontSize.sm,
	padding: `${vars.space[2]} ${vars.space[4]}`,
})

export const headerButtonWrapper = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.space[4],
})

export const middleWrapper = style({
	borderTop: '1px solid rgba(214, 222, 235, 0.15)',
	background: 'linear-gradient(to top, rgb(1,22,39) 0%, rgb(2,32,56) 100%)',
	boxShadow: 'inset 0 1px 0px 0px rgba(255, 255, 255, 0.05), inset 0 -1px 0px 0px rgba(0, 0, 0, 0.05)',
	color: 'var(--sp-colors-clickable)',
	padding: `${vars.space[2]} ${vars.space[4]}`,
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
})

export const middleWrapperButtonWrapper = style({
	display: 'flex',
	alignItems: 'center',
})

export const foregroundText = style({
	color: colorPalette.white,
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
		transition: `color ${transition.duration.slow} ${transition.easing['ease-in-out']}, transform 0.7s linear`,
		transform: 'rotate(0deg)',
	},
])

export const backwardButton = style([
	buttonBase,
	{
		transitionProperty: transition.property.all,
		transitionDuration: transition.duration.slow,
		transitionTimingFunction: transition.easing['ease-in-out'],
		transform: 'translate3d(0px, 0px, 0px)',
		selectors: {
			[pseudoSelectors.hover]: {
				transform: 'translate3d(-1px, 0px, 0px)',
			},
		},
	},
])

export const exportButton = style([
	buttonBase,
	{
		transitionProperty: transition.property.all,
		transitionDuration: transition.duration.slow,
		transitionTimingFunction: transition.easing['ease-in-out'],
		transform: 'scale(1)',
		selectors: {
			[pseudoSelectors.hover]: {
				transform: 'scale(1.05)',
			},
		},
	},
])

export const previewWrapper = style({
	borderTop: '1px solid rgba(214, 222, 235, 0.15)',
	overflow: 'hidden',
	backgroundColor: customTheme.colors.surface1,
	padding: vars.space[4],
	height: vars.space.full,
})
