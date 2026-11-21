import { vars } from '@styles/themes/contract.css'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const groupStyle = style({
	boxSizing: 'content-box',
})

export const videoStyle = style({
	maxWidth: '100%',
})

export const playPauseButtonStyle = style({
	position: 'absolute',
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	cursor: 'pointer',
	outline: 'none',
	selectors: {
		'&:focus-visible': {
			boxShadow: `inset ${vars.shadow.outline}`,
		},
	},
})

export const playPauseIconStyle = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '64px',
	height: '64px',
	background: 'rgba(0, 0, 0, 0.6)',
	borderRadius: '50%',
	color: 'white',
	opacity: 0,
	transition: 'opacity 200ms ease',
})

// The control stays visible while paused or keyboard-focused, and only appears on hover for precise pointers
globalStyle(`${playPauseButtonStyle}[data-paused="true"] ${playPauseIconStyle}, ${playPauseButtonStyle}:focus-visible ${playPauseIconStyle}`, {
	opacity: 1,
})

globalStyle(`${playPauseButtonStyle}:hover ${playPauseIconStyle}`, {
	'@media': {
		'(hover: hover) and (pointer: fine)': {
			opacity: 1,
		},
	},
})

export const marginBottomVariants = styleVariants({
	default: {
		marginBottom: 'auto',
	},
	withDescription: {
		marginBottom: '0 !important',
	},
})
