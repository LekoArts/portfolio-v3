import type { ComplexStyleRule } from '@vanilla-extract/css'
import { style } from '@vanilla-extract/css'

export const visuallyHidden = {
	border: '0px',
	clip: 'rect(0px, 0px, 0px, 0px)',
	height: '1px',
	width: '1px',
	margin: '-1px',
	padding: '0px',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	position: 'absolute !important',
}

export const visuallyHiddenStyle = style(visuallyHidden as ComplexStyleRule)
