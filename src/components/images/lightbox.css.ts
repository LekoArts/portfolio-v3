import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { transition } from '@styles/tokens/motion'
import { globalStyle, style } from '@vanilla-extract/css'

// Exit is quicker and simpler than enter. `display`/`overlay` keep the dialog in the top layer until the fade finishes
const exitTransition = `opacity ${transition.duration.fast} ease, display ${transition.duration.fast} allow-discrete, overlay ${transition.duration.fast} allow-discrete`
const enterTransition = `opacity ${transition.duration.normal} ${transition.easing['ease-out']}, display ${transition.duration.normal} allow-discrete, overlay ${transition.duration.normal} allow-discrete`

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
	opacity: 0,
	transition: exitTransition,
	selectors: {
		'&[open]': {
			'opacity': 1,
			'transition': enterTransition,
			'@starting-style': {
				opacity: 0,
			},
		},
		'&::backdrop': {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			backdropFilter: 'blur(16px)',
			opacity: 0,
			transition: exitTransition,
		},
		'&[open]::backdrop': {
			'opacity': 1,
			'transition': enterTransition,
			'@starting-style': {
				opacity: 0,
			},
		},
	},
})

export const lightboxImageStyle = style({
	width: vars.space.full,
	height: vars.space.full,
	objectFit: 'contain',
})

globalStyle(`${lightboxStyle}[open] ${lightboxImageStyle}`, {
	'@media': {
		[transition.media.motion]: {
			'transition': `transform ${transition.duration.normal} ${transition.easing['ease-out']}`,
			'@starting-style': {
				transform: 'scale(0.96)',
			},
		},
	},
})

export const lightboxCloseStyle = style({
	'position': 'absolute',
	'top': vars.space[4],
	'right': vars.space[4],
	'display': 'flex',
	'alignItems': 'center',
	'justifyContent': 'center',
	'width': vars.space[12],
	'height': vars.space[12],
	'borderRadius': vars.borderRadius.full,
	'color': 'white',
	'background': 'rgba(0, 0, 0, 0.6)',
	'outline': 'none',
	'transition': `background-color ${transition.duration.fast} ease, transform ${transition.duration.fast} ${transition.easing['ease-out']}`,
	'@media': {
		[transition.media.motion]: {
			selectors: {
				'&:active': {
					transform: transition.press,
				},
			},
		},
	},
	'selectors': {
		[pseudoSelectors.hover]: {
			background: 'rgba(0, 0, 0, 0.8)',
		},
		[pseudoSelectors.focusVisible]: {
			boxShadow: vars.shadow.outline,
		},
	},
})

globalStyle(`:root:has(${lightboxStyle}[open])`, {
	overflow: 'clip',
})
