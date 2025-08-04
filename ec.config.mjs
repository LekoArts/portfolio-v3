import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { defineEcConfig } from 'astro-expressive-code'

export default defineEcConfig({
	themes: ['one-light', 'night-owl'],
	plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
	defaultProps: {
		showLineNumbers: false,
		collapseStyle: 'collapsible-auto',
	},
	frames: {
		extractFileNameFromCode: false,
	},
	/**
	 * The <html> has the data-theme attribute (possible values: 'light', 'dark', 'system'). This change ensures that the themes change with the theme selector. For 'system' it will fallback to the prefers-color-scheme media query.
	 */
	themeCssSelector: (theme, { styleVariants }) => {
		if (styleVariants.length === 2) {
			const baseTheme = styleVariants[0]?.theme
			const altTheme = styleVariants.find(v => v.theme.type !== baseTheme?.type)?.theme
			if (theme === baseTheme || theme === altTheme)
				return `[data-theme='${theme.type}']`
		}
		return `[data-theme='${theme.name}']`
	},
})
