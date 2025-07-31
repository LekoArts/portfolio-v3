import { style } from '@vanilla-extract/css'
import { pseudoSelectors } from '../styles/selectors'
import { vars } from '../styles/themes/contract.css'
import { minMediaQuery } from '../styles/tokens/breakpoints'

export const cardsGridStyle = style({
	'display': 'grid',
	'gridTemplateColumns': 'repeat(1, 1fr)',
	'gap': vars.space[4],
	'@media': {
		[minMediaQuery('md')]: {
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: vars.space[8],
		},
	},
})

export const artGridStyle = style([
	cardsGridStyle,
	{
		'@media': {
			[minMediaQuery('md')]: {
				gridTemplateColumns: 'repeat(2, 1fr)',
			},
		},
	},
])

const photoCardBaseStyle = style({
	borderRadius: vars.borderRadius.lg,
})

export const photoLinkStyle = style([photoCardBaseStyle, {
	boxShadow: vars.shadow.lg,
	position: 'relative',
	selectors: {
		[pseudoSelectors.after]: {
			content: '""',
			position: 'absolute',
			width: vars.space.full,
			height: vars.space.full,
			transitionProperty: 'box-shadow',
			transitionDuration: '.3s',
			transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
			boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.2)',
			opacity: 1,
			borderRadius: vars.borderRadius.lg,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		},
		'&:hover:after': {
			boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.5)',
		},
	},
}])

export const staticImageStyle = style([photoCardBaseStyle, {}])

export const repositoriesGridStyle = style({
	'display': 'grid',
	'gridTemplateColumns': '1fr',
	'@media': {
		[minMediaQuery('lg')]: {
			gridTemplateColumns: '2fr 1fr',
		},
	},
})
