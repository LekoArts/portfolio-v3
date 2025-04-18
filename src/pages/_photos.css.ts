import type { StyleRule } from '@vanilla-extract/css'
import { pseudoSelectors } from '@styles/selectors'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { style, styleVariants } from '@vanilla-extract/css'

export const layoutIconStyle = style({
	color: vars.color.textMuted,
	transition: 'all 0.3s ease-in-out',
	selectors: {
		[pseudoSelectors.hover]: {
			color: vars.color.heading,
		},
		'&.active': {
			background: vars.color.ghostBg,
			color: vars.color.heading,
		},
	},
})

export const explanationLayoutWrapperStyle = style({
	'display': 'flex',
	'justifyContent': 'space-between',
	'flexDirection': 'column-reverse',
	'gap': vars.space[2],
	'@media': {
		[minMediaQuery('sm')]: {
			flexDirection: 'row',
			alignItems: 'center',
		},
	},
})

export const LAYOUT_TYPES = ['masonry', 'grid'] as const
export type ImageWrapperVariants = typeof LAYOUT_TYPES[number]

const imageWrapper: Record<ImageWrapperVariants, StyleRule> = {
	grid: {
		'display': 'grid',
		'gridTemplateColumns': 'repeat(auto-fit, minmax(200px, 1fr))',
		'gap': vars.space[4],
		'paddingLeft': vars.space[4],
		'paddingRight': vars.space[4],
		'@media': {
			[minMediaQuery('sm')]: {
				paddingLeft: vars.space[6],
				paddingRight: vars.space[6],
			},
			[minMediaQuery('lg')]: {
				gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
			},
			[minMediaQuery('xl')]: {
				gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
			},
		},
	},
	masonry: {
		'columns': '2',
		'gap': vars.space[4],
		'paddingLeft': vars.space[4],
		'paddingRight': vars.space[4],
		'@media': {
			[minMediaQuery('sm')]: {
				columns: '3',
				gap: vars.space[5],
				paddingLeft: vars.space[6],
				paddingRight: vars.space[6],
			},
			[minMediaQuery('lg')]: {
				columns: '4',
			},
			[minMediaQuery('xl')]: {
				columns: '5',
			},
		},
	},
}

export const imageWrapperVariants = styleVariants(imageWrapper, variant => [variant])

const gridImages: Record<ImageWrapperVariants, StyleRule> = {
	grid: {
		aspectRatio: '1 !important',
		objectFit: 'cover',
		maxHeight: '100% !important',
		borderRadius: vars.borderRadius.lg,
	},
	masonry: {
		'width': '100%',
		'height': 'auto',
		'marginBottom': vars.space[4],
		'borderRadius': vars.borderRadius.lg,
		'@media': {
			[minMediaQuery('sm')]: {
				marginBottom: vars.space[5],
			},
		},
	},
}

export const gridImagesVariants = styleVariants(gridImages, variant => [variant])
