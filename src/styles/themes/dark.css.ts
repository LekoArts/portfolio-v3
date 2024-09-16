import { createTheme } from '@vanilla-extract/css'
import { darkThemeColors } from '@styles/tokens/colors'
import { vars } from '@styles/themes/contract.css'
import { BASE } from '@styles/themes/base'

export const darkThemeClass = createTheme(vars, {
	color: darkThemeColors,
	...BASE,
})
