import type { SelectorMap } from '@utils/vanilla-extract'
import { EC_CSS_VARS } from '@constants/ec.mjs'
import { vars } from '@styles/themes/contract.css'
import { darkThemeClass } from '@styles/themes/dark.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { fonts } from '@styles/tokens/typography'
import { zIndices } from '@styles/tokens/z-indices'
import { em, round } from '@utils/css'
import { themeAwareStyles } from '@utils/vanilla-extract'
import { createGlobalVar, globalStyle, style } from '@vanilla-extract/css'

// The ORDER of responsive array variants should be:
// [`sm`, `md`, null, `lg`, `xl`]

const ecCodeFontSize = createGlobalVar(EC_CSS_VARS.codeFontSize)
const ecCodeLineHeight = createGlobalVar(EC_CSS_VARS.codeLineHeight)
const ecBorderRadius = createGlobalVar(EC_CSS_VARS.borderRadius)
const ecFontFamily = createGlobalVar(EC_CSS_VARS.fontFamily)
const ecFrameBoxShadowCssValue = createGlobalVar(EC_CSS_VARS.frameBoxShadowCssValue)
const ecFrameEditorTabBarBackground = createGlobalVar(EC_CSS_VARS.frameEditorTabBarBackground)

export const expressiveCodeRootStyle = style({})

globalStyle('html', {
	'vars': {
		[ecCodeFontSize]: em(12, 14),
		[ecCodeLineHeight]: round(20 / 12),
		[ecBorderRadius]: vars.borderRadius.lg,
		[ecFontFamily]: fonts.mono,
		[ecFrameBoxShadowCssValue]: vars.shadow.card.default,
		[ecFrameEditorTabBarBackground]: '#eaeaeb',
	},
	'@media': {
		[minMediaQuery('md')]: {
			vars: {
				[ecCodeFontSize]: em(14, 16),
				[ecCodeLineHeight]: round(24 / 14),
			},
		},
		[minMediaQuery('lg')]: {
			vars: {
				[ecCodeFontSize]: em(16, 18),
				[ecCodeLineHeight]: round(28 / 16),
			},
		},
		[minMediaQuery('xl')]: {
			vars: {
				[ecCodeFontSize]: em(18, 20),
				[ecCodeLineHeight]: round(32 / 18),
			},
		},
	},
})

globalStyle(`html.${darkThemeClass}`, {
	vars: {
		[ecFrameBoxShadowCssValue]: '0 0 0 1px rgb(50 50 98 / 20%), 0 1px 5px -4px rgb(137 137 221 / 80%), 0 4px 8px rgb(36 43 65 / 20%)',
		[ecFrameEditorTabBarBackground]: '#021c30',
	},
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code`, {
	fontSize: 'inherit',
	lineHeight: 'inherit',
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code + .expressive-code, ${expressiveCodeRootStyle} .expressive-code + details`, {
	'marginTop': em(16, 14),
	'@media': {
		[minMediaQuery('md')]: {
			marginTop: em(20, 16),
		},
		[minMediaQuery('lg')]: {
			marginTop: em(24, 18),
		},
		[minMediaQuery('xl')]: {
			marginTop: em(24, 20),
		},
	},
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code .frame .header .title`, {
	fontSize: `calc(${ecCodeFontSize} - 0.1em)`,
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code .gutter .ln`, {
	justifyContent: 'center',
	paddingInline: '1ch',
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code .copy button`, {
	'width': vars.space[8],
	'height': vars.space[8],
	'@media': {
		[minMediaQuery('sm')]: {
			width: vars.space[10],
			height: vars.space[10],
		},
	},
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code .frame .copy`, {
	'marginTop': '4px',
	'@media': {
		[minMediaQuery('sm')]: {
			marginTop: '0px',
		},
	},
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code .frame.has-title .copy`, {
	'marginTop': '-2px',
	'@media': {
		[minMediaQuery('sm')]: {
			marginTop: '0px',
		},
	},
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code .frame.is-terminal .copy`, {
	'marginTop': '-3px',
	'@media': {
		[minMediaQuery('sm')]: {
			marginTop: '0px',
		},
	},
})

globalStyle(`${expressiveCodeRootStyle} .expressive-code .frame.has-title [data-language]::before`, {
	'position': 'absolute',
	'zIndex': zIndices.docked,
	'right': '0.4em',
	'top': '0.4em',
	'padding': '0.1em 0.75em',
	'content': 'attr(data-language)',
	'textTransform': 'uppercase',
	'borderRadius': vars.borderRadius.md,
	'color': 'white',
	'background': 'rebeccapurple',
	'fontSize': '0.65em',
	'pointerEvents': 'none',
	'transition': 'opacity 0.2s ease-in-out',
	'letterSpacing': vars.letterSpacing.wide,
	'fontWeight': vars.fontWeight.medium,
	'boxShadow': 'inset 0 1px 0 0 rgba(255,255,255,0.15), inset 0 -1px 0 0 rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.15)',
	'@media': {
		[minMediaQuery('md')]: {
			borderRadius: vars.borderRadius.lg,
		},
	},
})

const badgeStyles: SelectorMap = {
	'[data-language=\'js\']::before': {
		background: 'rgba(247, 223, 30, 0.75)',
		color: 'black',
	},
	'[data-language=\'jsx\']::before': {
		background: 'rgba(97, 218, 251, 0.75)',
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgba(37, 66, 77, 1)' },
	},
	'[data-language=\'ts\']::before': {
		background: 'rgba(97, 218, 251, 0.75)',
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgba(37, 66, 77, 1)' },
	},
	'[data-language=\'tsx\']::before': {
		background: 'rgba(97, 218, 251, 0.75)',
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgba(37, 66, 77, 1)' },
	},
	'[data-language=\'html\']::before': {
		background: 'rgba(0, 90, 156, 0.75)',
		color: { light: 'white', dark: 'rgba(144, 207, 255, 1)' },
	},
	'[data-language=\'xml\']::before': {
		background: 'rgba(0, 90, 156, 0.75)',
		color: { light: 'white', dark: 'rgba(144, 207, 255, 1)' },
	},
	'[data-language=\'graphql\']::before': {
		background: 'rgba(225, 0, 152, 0.75)',
		color: { light: 'white', dark: 'rgba(255, 120, 196, 1)' },
	},
	'[data-language=\'css\']::before': {
		background: 'rgba(255, 152, 0, 0.75)',
		color: { light: 'white', dark: 'rgba(255, 205, 138, 1)' },
	},
	'[data-language=\'mdx\']::before': {
		background: 'rgba(249, 172, 0, 0.75)',
		color: { light: 'white', dark: 'rgba(68, 44, 13, 1)' },
	},
	'[data-language=\'py\']::before': {
		background: 'rgba(51, 111, 160, 0.75)',
		color: 'rgb(255, 229, 194)',
	},
	'[data-language=\'plaintext\']::before': {
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgb(255, 255, 255)' },
		background: { light: 'white', dark: 'rgba(255, 255, 255, 0.25)' },
	},
	'[data-language=\'sh\']::before': {
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgb(255, 255, 255)' },
		background: { light: 'white', dark: 'rgba(255, 255, 255, 0.25)' },
	},
	'[data-language=\'shell\']::before': {
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgb(255, 255, 255)' },
		background: { light: 'white', dark: 'rgba(255, 255, 255, 0.25)' },
	},
	'[data-language=\'yaml\']::before': {
		background: 'rgba(255, 168, 223, 0.75)',
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgba(87, 20, 63, 1)' },
	},
	'[data-language=\'md\']::before': {
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgb(255, 255, 255)' },
		background: { light: 'white', dark: 'rgba(255, 255, 255, 0.25)' },
	},
	'[data-language=\'json\']::before': {
		background: 'rgba(250, 240, 230, 0.75)',
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgba(27, 24, 24, 0.95)' },
	},
	'[data-language=\'diff\']::before': {
		background: 'rgba(230, 255, 237, 0.75)',
		color: { light: `${colorPalette.blueGray[800]}`, dark: 'rgba(34, 41, 36, 1)' },
	},
	'[data-language=\'svelte\']::before': {
		background: { light: 'rgb(255, 62, 0)', dark: 'rgba(255, 62, 0, 0.75)' },
		color: { light: 'white', dark: 'rgb(255, 221, 211)' },
	},
	'[data-language=\'astro\']::before': {
		background: { light: 'rgb(227, 57, 142)', dark: 'rgba(227, 57, 142, 0.75)' },
		color: { light: 'white', dark: 'rgb(255, 221, 211)' },
	},
}

const preparedEcColorBadgeStyles = themeAwareStyles({
	selectorMap: badgeStyles,
	defaultTheme: 'light',
	alternateThemeClass: darkThemeClass,
	rootClass: `${expressiveCodeRootStyle} .expressive-code .frame.has-title`,
})

Object.entries(preparedEcColorBadgeStyles).forEach(([selector, selectorStyle]) => {
	globalStyle(selector, selectorStyle)
})
