import { themesSelectors } from '@styles/atoms.css'
import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { transition } from '@styles/tokens/motion'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

const mis = '25px'
const smis = '35px'
const lgis = '50px'

export const iconWrapperStyle = style({
	'width': mis,
	'height': mis,
	'@media': {
		[minMediaQuery('sm')]: {
			width: smis,
			height: smis,
		},
		[minMediaQuery('lg')]: {
			width: lgis,
			height: lgis,
		},
	},
})

const transformVar = createVar()

export const gardenItemStyle = style({
	'vars': {
		[transformVar]: 'translate3d(6px, 0px, 0px)',
	},
	'display': 'grid',
	'gridTemplateColumns': `${mis} 1fr 20px`,
	'alignItems': 'center',
	'gridGap': vars.space[6],
	'borderRadius': vars.borderRadius.lg,
	'position': 'relative',
	'overflow': 'hidden',
	'@media': {
		[minMediaQuery('sm')]: {
			gridTemplateColumns: `${smis} 1fr 20px`,
		},
		[minMediaQuery('lg')]: {
			gridTemplateColumns: `${lgis} 1fr 24px`,
		},
		'(prefers-reduced-motion: reduce)': {
			vars: {
				[transformVar]: 'translate3d(0px, 0px, 0px) !important',
			},
		},
	},
	'selectors': {
		[themesSelectors.dark]: {
			vars: {
				'--icon-bg': colorPalette.blueGray[800],
				'--icon-fg': colorPalette.blueGray[100],
			},
		},
		[pseudoSelectors.hover]: {
			textDecoration: 'none',
			backgroundColor: vars.color.bgHover,
		},
		'&.hidden': {
			display: 'none',
		},
	},
})

globalStyle(`${gardenItemStyle} > span`, {
	transform: 'translate3d(0px, 0px, 0px)',
	transition: `transform ${transition.duration.slow} cubic-bezier(.73,.26,.42,1.24)`,
})

globalStyle(`${gardenItemStyle}:hover > span`, {
	transform: transformVar,
	transition: `transform ${transition.duration.slow} cubic-bezier(.73,.26,.42,1.24)`,
})

export const gardenItemSpacerStyle = style({
	background: vars.color.divider,
	border: 'none',
	position: 'absolute',
	bottom: 0,
})

export const gardenItemWrapperStyle = style({
	'marginLeft': `calc(${vars.space[2]} * -1)`,
	'marginRight': `calc(${vars.space[2]} * -1)`,
	'@media': {
		[minMediaQuery('lg')]: {
			marginLeft: `calc(${vars.space[6]} * -1)`,
			marginRight: `calc(${vars.space[6]} * -1)`,
		},
	},
})
