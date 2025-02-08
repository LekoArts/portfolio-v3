import { FONT_URLS } from '@constants/fonts'
import { fontFamily, fonts } from '@styles/tokens/typography'
import { globalFontFace, style } from '@vanilla-extract/css'

globalFontFace(fontFamily.interUI, {
	fontWeight: '400 700',
	fontDisplay: 'swap',
	fontStyle: 'normal',
	src: `url(${FONT_URLS.interUI}) format("woff2")`,
	unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
})

globalFontFace(fontFamily.interUIFallback, {
	fontStyle: 'normal',
	fontWeight: '400',
	src: 'local(Arial)',
	ascentOverride: '90%',
	descentOverride: '22.43%',
	lineGapOverride: '0%',
	sizeAdjust: '107.64%',
})

globalFontFace(fontFamily.crimsonPro, {
	fontStyle: 'normal',
	fontWeight: '600 800',
	fontDisplay: 'swap',
	src: `url(${FONT_URLS.crimsonPro}) format('woff2')`,
	unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
})

globalFontFace(fontFamily.crimsonProFallback, {
	fontStyle: 'normal',
	fontWeight: '700',
	src: 'local(Times New Roman)',
	ascentOverride: '90.86%',
	descentOverride: '21.78%',
	lineGapOverride: '0%',
	sizeAdjust: '98.66%',
})

export const bodyFontFamilyClass = style({
	fontFamily: fonts.body,
})

export const headingFontFamilyClass = style({
	fontFamily: fonts.heading,
})

export const monoFontFamilyClass = style({
	fontFamily: fonts.mono,
})
