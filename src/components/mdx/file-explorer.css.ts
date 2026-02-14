import { vars } from '@styles/themes/contract.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const spLayout = style({
	borderTopLeftRadius: '0px !important',
	borderTopRightRadius: '0px !important',
	vars: {
		'--sp-layout-height': '500px',
	},
})

export const rootWrapper = style({
	overflow: 'hidden',
	borderRadius: vars.borderRadius.lg,
})

globalStyle(`${rootWrapper} pre code`, {
	color: 'var(--sp-syntax-color-plain)',
	fontFamily: 'var(--sp-font-mono)',
	fontSize: 'var(--sp-font-size)',
	background: 'unset',
	fontWeight: 'unset',
	borderRadius: 'unset',
})

export const header = style({
	color: 'rgb(214, 222, 235)',
	background: 'linear-gradient(to bottom, rgb(14 61 100) 0%, rgb(6 41 69) 100%)',
	borderBottom: '1px solid rgba(214, 222, 235, 0.15)',
	boxShadow: 'inset 0 1px 0px 0px rgba(255, 255, 255, 0.05), inset 0 -1px 0px 0px rgba(0, 0, 0, 0.05)',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	fontSize: vars.fontSize.sm,
	padding: `${vars.space[2]} ${vars.space[4]}`,
})
