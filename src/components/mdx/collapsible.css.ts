import { themesSelectors } from '@styles/atoms.css'
import { vars } from '@styles/themes/contract.css'
import { colorPalette } from '@styles/tokens/colors'
import { transition } from '@styles/tokens/motion'
import { prominent } from '@styles/typography.css'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

const linkDecorationVar = createVar()

// Reduced motion: content fades, height snaps. `content-visibility` keeps the content painted while closing
const fadeTransition = `opacity ${transition.duration.fast} ease, content-visibility ${transition.duration.fast} allow-discrete`
const expandTransition = `block-size ${transition.duration.normal} ${transition.easing['ease-out']}, opacity ${transition.duration.normal} ${transition.easing['ease-out']}, content-visibility ${transition.duration.normal} allow-discrete`

export const detailsStyle = style({
	'vars': {
		[linkDecorationVar]: colorPalette.blue[300],
	},
	'backgroundColor': colorPalette.blue[50],
	'interpolateSize': 'allow-keywords',
	'selectors': {
		[themesSelectors.dark]: {
			backgroundColor: colorPalette.blueGray[800],
			vars: {
				[linkDecorationVar]: colorPalette.blue[500],
			},
		},
		'&::details-content': {
			display: 'flow-root',
			blockSize: 0,
			overflow: 'clip',
			opacity: 0,
			transition: fadeTransition,
		},
		'&[open]::details-content': {
			blockSize: 'auto',
			opacity: 1,
		},
	},
	'@media': {
		[transition.media.motion]: {
			selectors: {
				'&::details-content': {
					transition: expandTransition,
				},
			},
		},
	},
})

export const summaryStyle = style([
	prominent,
	{
		display: 'list-item',
		cursor: 'pointer',
	},
])

globalStyle(`${detailsStyle} p:first-of-type`, {
	marginTop: vars.space[4],
})

globalStyle(`${detailsStyle} a`, {
	textDecorationColor: linkDecorationVar,
})

globalStyle(`${detailsStyle} > *:last-child`, {
	marginBottom: `${vars.space[0]} !important`,
})
