import { visuallyHidden } from '@components/a11y/visually-hidden.css'
import { vars } from '@styles/themes/contract.css'
import { darkThemeClass } from '@styles/themes/dark.css'
import { minMediaQuery } from '@styles/tokens/breakpoints'
import { colorPalette } from '@styles/tokens/colors'
import { space } from '@styles/tokens/space'
import { fonts } from '@styles/tokens/typography'
import { em, round } from '@utils/css'
import { globalStyle, type GlobalStyleRule } from '@vanilla-extract/css'

globalStyle('html', {
	scrollPaddingTop: `calc(${space.navigationHeight} + ${vars.space[4]})`,
})

globalStyle('body', {
	fontFamily: fonts.body,
	color: vars.color.text,
	background: vars.color.bg,
	lineHeight: vars.lineHeight.base,
	transitionProperty: 'background-color, color',
	transitionDuration: '0.3s',
	position: 'relative',
	minHeight: vars.space.full,
	fontFeatureSettings: '\'kern\'',
})

globalStyle('*', {
	borderColor: colorPalette.transparent,
	wordWrap: 'break-word',
	boxSizing: 'border-box',
	margin: vars.space[0],
	borderWidth: vars.space[0],
	borderStyle: 'solid',
})

globalStyle('a', {
	backgroundColor: colorPalette.transparent,
	color: 'inherit',
	textDecoration: 'inherit',
})

globalStyle('img', {
	borderStyle: 'none',
})

globalStyle('hr', {
	boxSizing: 'content-box',
	height: vars.space[0],
	overflow: 'visible',
})

globalStyle('pre, code, kbd', {
	fontFamily: fonts.mono,
	fontSize: '1em',
})

globalStyle('button, input, select, textarea', {
	fontFamily: 'inherit',
	fontSize: '100%',
	lineHeight: 1.15,
	margin: vars.space[0],
})

globalStyle('button, input', {
	overflow: 'visible',
})

globalStyle('button, select', {
	textTransform: 'none',
})

globalStyle('textarea', {
	overflow: 'auto',
})

globalStyle('details', {
	display: 'block',
})

globalStyle('summary', {
	display: 'list-item',
})

globalStyle('body, blockquote, h1, h2, h3, h4, h5, h6, hr, figure, p, pre', {
	margin: vars.space[0],
})

globalStyle('button', {
	background: colorPalette.transparent,
	padding: vars.space[0],
	cursor: 'pointer',
})

globalStyle('ol, ul', {
	margin: vars.space[0],
	padding: vars.space[0],
})

globalStyle('table', {
	borderCollapse: 'collapse',
})

globalStyle('h1, h2, h3, h4, h5, h6', {
	fontSize: 'inherit',
	fontWeight: 'inherit',
})

globalStyle('button, input, select, textarea', {
	padding: vars.space[0],
	lineHeight: 'inherit',
	color: 'inherit',
})

globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
	display: 'block',
})

globalStyle('img, video', {
	maxWidth: vars.space.full,
	height: vars.space.auto,
})

globalStyle('.visually-hidden', visuallyHidden as GlobalStyleRule)

/* Shiki CSS - Begin */

globalStyle(`html.${darkThemeClass} .astro-code, html.${darkThemeClass} .astro-code span`, {
	color: 'var(--shiki-dark) !important',
	backgroundColor: 'var(--shiki-dark-bg) !important',
	fontStyle: 'var(--shiki-dark-font-style) !important',
	fontWeight: 'var(--shiki-dark-font-weight) !important',
	textDecoration: 'var(--shiki-dark-text-decoration) !important',
})

globalStyle(`html.${darkThemeClass} .astro-code span.highlighted span`, {
	backgroundColor: 'transparent !important',
})

globalStyle('html .astro-code > code > span', {
	'paddingLeft': em(12, 12),
	'paddingRight': em(12, 12),
	'marginLeft': `-${em(12, 12)}`,
	'marginRight': `-${em(12, 12)}`,
	'@media': {
		[minMediaQuery('sm')]: {
			paddingLeft: em(16, 14),
			paddingRight: em(16, 14),
			marginLeft: `-${em(16, 14)}`,
			marginRight: `-${em(16, 14)}`,
		},
		[minMediaQuery('lg')]: {
			paddingLeft: em(24, 16),
			paddingRight: em(24, 16),
			marginLeft: `-${em(24, 16)}`,
			marginRight: `-${em(24, 16)}`,
		},
		[minMediaQuery('xl')]: {
			paddingLeft: em(24, 18),
			paddingRight: em(24, 18),
			marginLeft: `-${em(24, 18)}`,
			marginRight: `-${em(24, 18)}`,
		},
	},
})

globalStyle('html .astro-code .line', {
	'display': 'block',
	// These min-height values must be the same as line-height in tailwind-typography.css.ts for the 'pre:not(.sp-pre-placeholder)' selector
	'minHeight': `${round(20 / 12)}em`,
	'@media': {
		[minMediaQuery('md')]: {
			minHeight: `${round(24 / 14)}em`,
		},
		[minMediaQuery('lg')]: {
			minHeight: `${round(28 / 16)}em`,
		},
		[minMediaQuery('xl')]: {
			minHeight: `${round(32 / 18)}em`,
		},
	},
})

globalStyle('html .astro-code.line-numbers > code', {
	counterReset: 'step',
	counterIncrement: 'step 0',
})

globalStyle('html .astro-code.line-numbers > code .line::before', {
	content: 'counter(step)',
	counterIncrement: 'step',
	width: '2em',
	display: 'inline-block',
	textAlign: 'left',
	opacity: 0.3,
	userSelect: 'none',
})

globalStyle('html .astro-code.line-numbers code .line.highlighted::before', {
	opacity: 0.6,
})

/* Shiki CSS - End */
