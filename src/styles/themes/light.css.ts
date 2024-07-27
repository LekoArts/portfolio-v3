import { createTheme } from '@vanilla-extract/css'
import { vars } from '@styles/themes/contract.css'
import { lightThemeColors } from '@styles/tokens/colors'
import { BASE } from '@styles/themes/base'

export const lightThemeClass = createTheme(vars, {
	color: lightThemeColors,
	...BASE,
})
