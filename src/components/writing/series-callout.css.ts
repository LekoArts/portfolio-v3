import { themesSelectors } from '@styles/atoms.css'
import { vars } from '@styles/themes/contract.css'
import { colorPalette } from '@styles/tokens/colors'
import { prominent } from '@styles/typography.css'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

const listItemActiveBgVar = createVar()
const listItemActiveColorVar = createVar()
const listItemBgVar = createVar()
const listItemColorVar = createVar()

export const detailsStyle = style({
	vars: {
		[listItemActiveBgVar]: colorPalette.blue[600],
		[listItemBgVar]: colorPalette.blue[100],
		[listItemActiveColorVar]: colorPalette.white,
		[listItemColorVar]: colorPalette.black,
	},
	backgroundColor: colorPalette.blue[50],
	selectors: {
		[themesSelectors.dark]: {
			backgroundColor: colorPalette.blueGray[800],
			vars: {
				[listItemActiveBgVar]: colorPalette.blue[400],
				[listItemBgVar]: colorPalette.blueGray[600],
				[listItemActiveColorVar]: colorPalette.black,
				[listItemColorVar]: colorPalette.blueGray[200],
			},
		},
	},
})

export const summaryStyle = style([
	prominent,
	{
		display: 'list-item',
		cursor: 'pointer',
	},
])

globalStyle(`${detailsStyle} ol`, {
	marginBottom: 0,
})

globalStyle(`${detailsStyle} ol li:last-of-type`, {
	marginBottom: 0,
})

globalStyle(`${detailsStyle} ol li:before`, {
	content: 'counter(list-item) !important',
	position: 'absolute',
	top: '0.25em',
	width: '1.3em',
	height: '1.3em',
	backgroundColor: listItemBgVar,
	color: 'black',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})

globalStyle(`${detailsStyle} a, ${detailsStyle} span`, {
	marginLeft: vars.space[2],
})

globalStyle(`${detailsStyle} ol li[data-is-current="true"]:before`, {
	backgroundColor: listItemActiveBgVar,
	color: `${listItemActiveColorVar} !important`,
})

globalStyle(`${detailsStyle} ol li:before`, {
	color: `${listItemColorVar} !important`,
})
