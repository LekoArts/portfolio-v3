interface Window {
	plausible: (name: string, options?: { callback?: () => void, props?: { [key: string]: string } }) => void
}

declare namespace astroHTML.JSX {
	interface HTMLAttributes {
		value?: string
	}
}

declare let LekoArtsThemeProvider: {
	applyTheme: (theme?: 'light' | 'dark' | 'system') => void
}
