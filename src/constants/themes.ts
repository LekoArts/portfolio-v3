import { darkThemeClass } from '@styles/themes/dark.css'
import { lightThemeClass } from '@styles/themes/light.css'

export const STORAGE_KEY = 'lekoarts-themes'
export const THEMES = {
	system: 'system',
	light: 'light',
	dark: 'dark',
} as const
export type Theme = typeof THEMES[keyof typeof THEMES]

export const COLOR_SCHEMES = [THEMES.light, THEMES.dark] as const

export const VALUE = {
	[THEMES.light]: lightThemeClass,
	[THEMES.dark]: darkThemeClass,
} as const
export const ATTRS = Object.values(VALUE)
