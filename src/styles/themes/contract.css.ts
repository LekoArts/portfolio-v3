import { createThemeContract } from '@vanilla-extract/css'
import { nullColors } from '@styles/tokens/colors'
import { BASE } from '@styles/themes/base'

export const vars = createThemeContract({
	color: nullColors,
	...BASE,
})
