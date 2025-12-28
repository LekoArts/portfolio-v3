import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { style } from '@vanilla-extract/css'

export const cardGridStyle = style({
	'display': 'grid',
	'gridTemplateColumns': '1fr',
	'width': `calc(${vars.space.full} + ${vars.space[4]})`,
	'gap': vars.space[4],
	'@media': {
		[minMediaQuery('md')]: {
			width: `calc(${vars.space.full} + ${vars.space[12]})`,
		},
		[minMediaQuery('md')]: {
			gridTemplateColumns: 'repeat(2, 1fr)',
			gap: vars.space[6],
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

export const rssLinkStyle = style({
	color: `${vars.color.primary} !important`,
	display: 'inline-flex',
	alignItems: 'center',
	gap: vars.space[1],
})
