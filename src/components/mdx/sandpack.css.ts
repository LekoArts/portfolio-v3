import type { SandpackTheme } from '@codesandbox/sandpack-react'
import { vars } from '@styles/themes/contract.css'
import { darkThemeClass } from '@styles/themes/dark.css'
import { fonts } from '@styles/tokens/typography'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

const surface1 = createVar()
const surface2 = createVar()
const surface3 = createVar()
const clickable = createVar()
const base = createVar()
const disabled = createVar()
const hover = createVar()
const accent = createVar()
const error = createVar()
const errorSurface = createVar()
const syntaxPlain = createVar()
const syntaxComment = createVar()
const syntaxKeyword = createVar()
const syntaxTag = createVar()
const syntaxPunctuation = createVar()
const syntaxDefinition = createVar()
const syntaxProperty = createVar()
const syntaxStatic = createVar()
const syntaxString = createVar()

globalStyle('html', {
	vars: {
		[surface1]: '#FAFAFA',
		[surface2]: '#EAEAEB',
		[surface3]: '#EAEAEB',
		[clickable]: '#424243',
		[base]: '#9D9D9F',
		[disabled]: '#AFB2BB',
		[hover]: '#383A42',
		[accent]: '#526FFF',
		[error]: '#E45649',
		[errorSurface]: '#FCECEA',
		[syntaxPlain]: '#383A42',
		[syntaxComment]: '#A0A1A7',
		[syntaxKeyword]: '#A626A4',
		[syntaxTag]: '#E45649',
		[syntaxPunctuation]: '#383A42',
		[syntaxDefinition]: '#4078F2',
		[syntaxProperty]: '#986801',
		[syntaxStatic]: '#986801',
		[syntaxString]: '#50A14F',
	},
})

globalStyle(`html.${darkThemeClass}`, {
	vars: {
		[surface1]: '#011627',
		[surface2]: '#0b2942',
		[surface3]: '#021320',
		[clickable]: '#5f7e97',
		[base]: '#5f7e97',
		[disabled]: '#4b6479',
		[hover]: '#c5e4fd',
		[accent]: '#c5e4fd',
		[error]: '#EF5350',
		[errorSurface]: '#811e18',
		[syntaxPlain]: '#d6deeb',
		[syntaxComment]: '#637777',
		[syntaxKeyword]: '#c792ea',
		[syntaxTag]: '#7fdbca',
		[syntaxPunctuation]: '#7fdbca',
		[syntaxDefinition]: '#82aaff',
		[syntaxProperty]: '#c5e478',
		[syntaxStatic]: '#f78c6c',
		[syntaxString]: '#ecc48d',
	},
})

export const customTheme: SandpackTheme = {
	colors: {
		surface1,
		surface2,
		surface3,
		clickable,
		base,
		disabled,
		hover,
		accent,
		error,
		errorSurface,
	},
	syntax: {
		plain: syntaxPlain,
		comment: {
			color: syntaxComment,
		},
		keyword: {
			color: syntaxKeyword,
		},
		tag: syntaxTag,
		punctuation: syntaxPunctuation,
		definition: syntaxDefinition,
		property: {
			color: syntaxProperty,
		},
		static: syntaxStatic,
		string: syntaxString,
	},
	font: {
		body: fonts.body,
		mono: fonts.mono,
		size: '14px',
		lineHeight: '20px',
	},
}

export const customBarStyle = style({
	color: vars.color.text,
	background: vars.color.cardBg,
	borderBottom: '1px solid rgba(214, 222, 235, 0.15)',
	boxShadow: 'inset 0 1px 0px 0px rgba(255, 255, 255, 0.05), inset 0 -1px 0px 0px rgba(0, 0, 0, 0.05)',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	fontSize: vars.fontSize.sm,
	fontWeight: vars.fontWeight.medium,
	padding: `${vars.space[2]} ${vars.space[4]}`,
})
