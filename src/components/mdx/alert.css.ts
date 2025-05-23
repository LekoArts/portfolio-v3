import type { AlertStatus } from '@constants/types'
import type { StyleRule } from '@vanilla-extract/css'
import { codeBlockWrapper, codeHeaderStyle } from '@components/mdx/code.css'
import { themesSelectors } from '@styles/atoms.css'
import { vars } from '@styles/themes/contract.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { transparentize } from '@utils/color'
import { em } from '@utils/css'
import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css'

const bgVar = createVar()
const colorVar = createVar()
const linkDecorationVar = createVar()

const alertBaseStyle = style({
	'vars': {
		[bgVar]: vars.color.bg,
		[colorVar]: vars.color.text,
		[linkDecorationVar]: colorPalette.gray[300],
	},
	'marginRight': vars.space[0],
	'marginLeft': vars.space[0],
	'background': bgVar,
	'overflow': 'hidden',
	'@media': {
		[minMediaQuery('lg')]: {
			marginRight: `calc(${vars.space[4]} * -1)`,
			marginLeft: `calc(${vars.space[4]} * -1)`,
		},
	},
})

export const alertTitleStyle = style({
	lineHeight: vars.lineHeight.md,
	color: vars.color.heading,
})

export const alertIconStyle = style({
	'width': '20px',
	'height': '20px',
	'marginRight': vars.space[3],
	'display': 'inherit',
	'flexShrink': 0,
	'lineHeight': vars.lineHeight.md,
	'color': colorVar,
	'@media': {
		[minMediaQuery('md')]: {
			width: '25px',
			height: '25px',
		},
		[minMediaQuery('lg')]: {
			width: '35px',
			height: '35px',
		},
	},
})

const colorMap = {
	info: 'blue',
	warning: 'orange',
	success: 'green',
	error: 'red',
} as const

const darkBgOpacity = 0.15
const darkBg = 200
const darkColor = 300
const bg = 100
const color = 500

globalStyle(`${alertBaseStyle} a`, {
	textDecorationColor: `${linkDecorationVar} !important`,
})

globalStyle(`${alertBaseStyle} p`, {
	'marginBottom': `${em(16, 14)} !important`,
	'marginTop': `${vars.space[0]} !important`,
	'@media': {
		[minMediaQuery('sm')]: {
			marginBottom: `${em(20, 16)} !important`,
			marginTop: `${vars.space[0]} !important`,
		},
		[minMediaQuery('lg')]: {
			marginBottom: `${em(24, 18)} !important`,
			marginTop: `${vars.space[0]} !important`,
		},
		[minMediaQuery('xl')]: {
			marginBottom: `${em(24, 20)} !important`,
			marginTop: `${vars.space[0]} !important`,
		},
	},
})

globalStyle(`${alertBaseStyle} p:first-of-type`, {
	marginTop: `${vars.space[0]} !important`,
})

globalStyle(`${alertBaseStyle} p:last-of-type`, {
	marginTop: `${vars.space[0]} !important`,
	marginBottom: `${vars.space[0]} !important`,
})

globalStyle(`${alertBaseStyle} .${codeBlockWrapper}`, {
	width: '100%',
})

globalStyle(`${alertBaseStyle} .${codeBlockWrapper} pre`, {
	marginLeft: `${vars.space[0]} !important`,
	marginRight: `${vars.space[0]} !important`,
})

globalStyle(`${alertBaseStyle} > *:last-child pre:last-of-type`, {
	marginBottom: `${vars.space[0]} !important`,
})

globalStyle(`${alertBaseStyle} .${codeBlockWrapper} .${codeHeaderStyle}`, {
	marginLeft: `${vars.space[0]} !important`,
	marginRight: `${vars.space[0]} !important`,
})

const alerts: Record<AlertStatus, StyleRule> = {
	note: {
		vars: {
			[bgVar]: colorPalette[colorMap.info][bg],
			[colorVar]: colorPalette[colorMap.info][color],
			[linkDecorationVar]: colorPalette[colorMap.info][300],
		},
		selectors: {
			[themesSelectors.dark]: {
				vars: {
					[bgVar]: transparentize(colorPalette[colorMap.info][darkBg], darkBgOpacity),
					[colorVar]: colorPalette[colorMap.info][darkColor],
					[linkDecorationVar]: colorPalette[colorMap.info][500],
				},
			},
		},
	},
	warning: {
		vars: {
			[bgVar]: colorPalette[colorMap.warning][bg],
			[colorVar]: colorPalette[colorMap.warning][color],
			[linkDecorationVar]: colorPalette[colorMap.warning][300],
		},
		selectors: {
			[themesSelectors.dark]: {
				vars: {
					[bgVar]: transparentize(colorPalette[colorMap.warning][darkBg], darkBgOpacity),
					[colorVar]: colorPalette[colorMap.warning][darkColor],
					[linkDecorationVar]: colorPalette[colorMap.warning][400],
				},
			},
		},
	},
	success: {
		vars: {
			[bgVar]: colorPalette[colorMap.success][bg],
			[colorVar]: colorPalette[colorMap.success][color],
			[linkDecorationVar]: colorPalette[colorMap.success][400],
		},
		selectors: {
			[themesSelectors.dark]: {
				vars: {
					[bgVar]: transparentize(colorPalette[colorMap.success][darkBg], darkBgOpacity),
					[colorVar]: colorPalette[colorMap.success][darkColor],
					[linkDecorationVar]: colorPalette[colorMap.success][500],
				},
			},
		},
	},
	caution: {
		vars: {
			[bgVar]: colorPalette[colorMap.error][bg],
			[colorVar]: colorPalette[colorMap.error][color],
			[linkDecorationVar]: colorPalette[colorMap.error][300],
		},
		selectors: {
			[themesSelectors.dark]: {
				vars: {
					[bgVar]: transparentize(colorPalette[colorMap.error][darkBg], darkBgOpacity),
					[colorVar]: colorPalette[colorMap.error][darkColor],
					[linkDecorationVar]: colorPalette[colorMap.error][500],
				},
			},
		},
	},
}

export const alertVariants = styleVariants(alerts, alert => [alertBaseStyle, alert])
