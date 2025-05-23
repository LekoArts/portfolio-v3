import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { style } from '@vanilla-extract/css'

export const cardGridStyle = style({
	'display': 'grid',
	'gridTemplateColumns': '1fr',
	'width': vars.space.full,
	'@media': {
		[minMediaQuery('md')]: {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
		[minMediaQuery('lg')]: {
			width: `calc(${vars.space.full} + ${vars.space[12]})`,
		},
	},
})

export const sidebarWrapperStyle = style({
	'display': 'block',
	'@media': {
		[minMediaQuery('2xl')]: {
			display: 'flex',
		},
	},
})
