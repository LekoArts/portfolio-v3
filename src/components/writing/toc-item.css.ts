import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { globalStyle, style } from '@vanilla-extract/css'

export const listItemStyle = style({
	'marginTop': vars.space[2],
	'@media': {
		[minMediaQuery('2xl')]: {
			marginTop: vars.space[3],
		},
	},
})

export const linkStyle = style({
	fontWeight: vars.fontWeight.normal,
	color: 'inherit',
	selectors: {
		'&.active': {
			fontWeight: vars.fontWeight.medium,
			color: vars.color.primary,
		},
	},
})

export const nestedListStyle = style({
	marginLeft: vars.space[2],
})

globalStyle(`${nestedListStyle} > li`, {
	marginTop: vars.space[1],
})
