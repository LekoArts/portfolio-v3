import { vars } from '@styles/themes/contract.css'
import { globalStyle, keyframes, style } from '@vanilla-extract/css'

const show = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
})

export const lightboxStyle = style({
	maxWidth: '100vw',
	maxHeight: '100vh',
	zIndex: 10000,
	padding: 0,
	border: 'none',
	background: 'none',
	height: vars.space.full,
	width: vars.space.full,
	outline: 'none',
	selectors: {
		'&[open]': {
			animation: `${show} 0.25s ease-in-out alternate`,
		},
		'&::backdrop': {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			backdropFilter: 'blur(16px)',
		},
	},
})

export const lightboxImageStyle = style({
	width: vars.space.full,
	height: vars.space.full,
	objectFit: 'contain',
})

globalStyle(`:root:has(${lightboxStyle}[open])`, {
	overflow: 'clip',
})

globalStyle(`::backdrop:has(${lightboxStyle}[open])`, {
	backdropFilter: 'blur(12px)',
})
