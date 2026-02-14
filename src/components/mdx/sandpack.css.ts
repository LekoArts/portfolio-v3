import type { SandpackTheme } from '@codesandbox/sandpack-react'
import { fonts } from '@styles/tokens/typography'
import { createVar, globalStyle } from '@vanilla-extract/css'

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

globalStyle(':root', {
	vars: {
		[surface1]: '#011627',
		[surface2]: '#243b4c',
		[surface3]: '#112331',
		[clickable]: '#6988a1',
		[base]: '#808080',
		[disabled]: '#4D4D4D',
		[hover]: '#c5e4fd',
		[accent]: '#c5e4fd',
		[error]: '#ffcdca',
		[errorSurface]: '#811e18',
		[syntaxPlain]: '#d6deeb',
		[syntaxComment]: '#999999',
		[syntaxKeyword]: '#c792ea',
		[syntaxTag]: '#7fdbca',
		[syntaxPunctuation]: '#7fdbca',
		[syntaxDefinition]: '#82aaff',
		[syntaxProperty]: '#addb67',
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
			fontStyle: 'italic',
		},
		keyword: {
			color: syntaxKeyword,
			fontStyle: 'italic',
		},
		tag: syntaxTag,
		punctuation: syntaxPunctuation,
		definition: syntaxDefinition,
		property: {
			color: syntaxProperty,
			fontStyle: 'italic',
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
