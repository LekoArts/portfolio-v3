import { ATTRS, STORAGE_KEY, THEMES, type Theme, VALUE } from '@constants/themes'

const THEME_STATES = Object.values(THEMES)

export function disableAnimation() {
	const css = document.createElement('style')
	css.appendChild(
		document.createTextNode(
			'*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}',
		),
	)
	document.head.appendChild(css)

	return () => {
		// Force restyle
		;(() => window.getComputedStyle(document.body))()

		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css)
		}, 1)
	}
}

export function parseTheme(theme: unknown): Theme {
	if (
		theme === THEMES.light
		|| theme === THEMES.dark
		|| theme === THEMES.system
	) {
		return theme
	}

	return THEMES.system
}

export function loadTheme(): Theme {
	return parseTheme(
		typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY),
	)
}

export function storeTheme(theme: Theme): void {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, theme)
	}
}

export function getSystemTheme(): 'light' | 'dark' {
	return matchMedia('(prefers-color-scheme: light)').matches
		? THEMES.light
		: THEMES.dark
}

export function onThemeChange(theme: Theme): void {
	const d = document.documentElement
	const systemTheme = getSystemTheme()
	const t = theme === 'system' ? VALUE[systemTheme] : VALUE[theme]

	const enableAnimation = disableAnimation()

	LekoArtsThemeProvider.applyTheme(theme)
	d.classList.remove(...ATTRS)
	d.classList.add(t)
	d.dataset.theme = theme
	d.style.colorScheme = theme === 'system' ? systemTheme : theme

	storeTheme(theme)

	enableAnimation()
}

export function getNextTheme(): Theme {
	const theme = document.documentElement.dataset.theme as Theme
	return THEME_STATES[(THEME_STATES.indexOf(theme) + 1) % THEME_STATES.length]
}
