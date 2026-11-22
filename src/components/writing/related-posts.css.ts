import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { transition } from '@styles/tokens/motion'
import { globalStyle, style } from '@vanilla-extract/css'

export const listStyle = style({
	listStyle: 'none',
	margin: 0,
	padding: 0,
})

export const linkStyle = style({
	'display': 'grid',
	'gridTemplateColumns': '1fr',
	'gap': vars.space[1],
	'paddingBlock': vars.space[3],
	// The hover fill extends past the text so titles stay aligned with the content column
	'paddingInline': vars.space[3],
	'marginInline': `calc(${vars.space[3]} * -1)`,
	'borderRadius': vars.borderRadius.md,
	'color': 'inherit',
	'textDecoration': 'none',
	'@media': {
		[minMediaQuery('md')]: {
			gridTemplateColumns: '1fr auto',
			alignItems: 'baseline',
			gap: vars.space[6],
			paddingBlock: vars.space[2],
		},
		[transition.media.hover]: {
			selectors: {
				'&:hover': {
					background: vars.color.ghostBgSubtle,
				},
			},
		},
	},
	'selectors': {
		[pseudoSelectors.hover]: {
			textDecoration: 'none',
		},
		[pseudoSelectors.focusVisible]: {
			outline: 'none',
			boxShadow: vars.shadow.outline,
		},
	},
})

export const titleStyle = style({
	fontSize: vars.fontSize.lg,
	fontWeight: vars.fontWeight.medium,
	color: vars.color.heading,
})

globalStyle(`${linkStyle}:hover ${titleStyle}`, {
	color: vars.color.primary,
})

export const dateStyle = style({
	fontVariantNumeric: 'tabular-nums',
	whiteSpace: 'nowrap',
})
