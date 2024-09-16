import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@styles/themes/contract.css'
import { darkThemeClass } from '@styles/themes/dark.css'
import { breakpointNames, minMediaQuery } from '@styles/tokens/breakpoints'
import { responsiveStyles, themeAwareStyles } from '@utils/vanilla-extract'
import {
	proseBaseStyle,
	proseLgVariant,
	proseMdVariant,
	proseRootLg,
	proseRootMd,
	proseRootMobile,
	proseRootXl,
	proseSmVariant,
	proseXlVariant,
} from './tailwind-typography.css'

// The ORDER of responsive array variants should be:
// [`sm`, `md`, null, `lg`, `xl`]

const proseRootBaseStyle = style({
	color: vars.color.textProse,
})

export const proseRootStyle = style([
	proseRootBaseStyle,
	proseRootMobile,
	{
		'@media': {
			[minMediaQuery('sm')]: proseRootMd,
			[minMediaQuery('lg')]: proseRootLg,
			[minMediaQuery('xl')]: proseRootXl,
		},
	},
])

globalStyle(`${proseRootStyle} img`, {
	boxShadow: vars.shadow.lg,
	borderRadius: vars.borderRadius.lg,
	marginLeft: 'auto',
	marginRight: 'auto',
})

globalStyle(`${proseRootStyle} .markdown-heading`, {
	position: 'relative',
})

globalStyle(`${proseRootStyle} .markdown-heading:hover .anchor`, {
	visibility: 'visible',
})

globalStyle(`${proseRootStyle} .markdown-heading .anchor`, {
	position: 'absolute',
	display: 'flex',
	margin: 'auto',
	opacity: 1,
	justifyContent: 'center',
	alignItems: 'center',
	width: vars.space[10],
	height: vars.space[7],
	top: '50%',
	paddingRight: vars.space[4],
	left: `calc(-1 * ${vars.space[9]})`,
	transform: 'translateY(calc(-50% + 0.1rem))',
	visibility: 'hidden',
})

globalStyle(`${proseRootStyle} .markdown-heading .anchor .anchor-icon`, {
	display: 'inline-block',
	overflow: 'visible !important',
	verticalAlign: 'text-bottom',
	fill: 'currentColor',
	height: vars.space[5],
	width: vars.space[5],
})

globalStyle(`${proseRootStyle} .img-left-wrap-text`, {
	'display': 'grid',
	'gridTemplateColumns': '1fr',
	'gridGap': vars.space[4],
	'@media': {
		[minMediaQuery('sm')]: {
			gridTemplateColumns: '1fr 2fr',
			gridGap: vars.space[6],
		},
		[minMediaQuery('md')]: {
			gridTemplateColumns: '1fr 1.75fr',
			gridGap: vars.space[12],
		},
	},
})

globalStyle(`${proseRootStyle} .img-left-wrap-text img`, {
	margin: 0,
})

const preparedBaseStyles = themeAwareStyles({
	selectorMap: proseBaseStyle,
	defaultTheme: 'light',
	alternateThemeClass: darkThemeClass,
	rootClass: proseRootStyle,
})

Object.entries(preparedBaseStyles).forEach(([selector, selectorStyle]) => {
	globalStyle(selector, selectorStyle)
})

const proseResponsiveStyles = responsiveStyles([
	proseSmVariant,
	proseMdVariant,
	proseMdVariant,
	proseLgVariant,
	proseXlVariant,
])

const [_, ...bpn] = breakpointNames

Object.entries(proseResponsiveStyles).forEach(([selector, selectorResponsiveArray]) => {
	const [mobileStyle, ...rest] = selectorResponsiveArray
	const mediaQueries = {}

	rest.forEach((s, index) => {
		if (s) {
			// @ts-expect-error - TODO: Fix this
			mediaQueries[minMediaQuery(bpn[index])] = s
		}
	})
	globalStyle(`${proseRootStyle} ${selector}`, {
		...mobileStyle,
		'@media': mediaQueries,
	})
})
