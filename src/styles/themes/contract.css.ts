import { BASE } from '@styles/themes/base'
import { nullColors } from '@styles/tokens/colors'
import { createThemeContract } from '@vanilla-extract/css'

export const vars = createThemeContract({
	color: nullColors,
	...BASE,
})
