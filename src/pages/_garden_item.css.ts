import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { prominent } from '@styles/typography.css'
import { style } from '@vanilla-extract/css'

export const metaStyle = style({
	'display': 'grid',
	'gap': vars.space[2],
	'gridTemplateColumns': '1fr',
	'@media': {
		[minMediaQuery('md')]: {
			gridTemplateColumns: '1fr auto',
		},
	},
})

export const gardenCtaStyle = style([
	prominent,
	{
		boxShadow: vars.shadow.xl,
		color: colorPalette.green[100],
		textShadow: '0px 2px 0px rgba(0, 0, 0, 0.35)',
		backgroundImage: `linear-gradient(to right top, ${colorPalette.green[800]}, ${colorPalette.lime[600]})`,
	},
])

export const plantIconStyle = style({
	'color': colorPalette.lime[300],
	'filter': 'drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.25))',
	'height': vars.space[8],
	'width': vars.space[8],
	'marginRight': vars.space[6],
	'@media': {
		[minMediaQuery('md')]: {
			height: vars.space[12],
			width: vars.space[12],
		},
	},
})
