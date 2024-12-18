import { BASE } from '@styles/themes/base'
import { vars } from '@styles/themes/contract.css'
import { darkThemeColors } from '@styles/tokens/colors'
import { createTheme } from '@vanilla-extract/css'

export const darkThemeClass = createTheme(vars, {
	color: darkThemeColors,
	...BASE,
})
