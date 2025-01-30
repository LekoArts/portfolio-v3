import { BASE } from '@styles/themes/base'
import { vars } from '@styles/themes/contract.css'
import { lightThemeColors } from '@styles/tokens/colors'
import { createTheme } from '@vanilla-extract/css'

export const lightThemeClass = createTheme(vars, {
	color: lightThemeColors,
	...BASE,
})
