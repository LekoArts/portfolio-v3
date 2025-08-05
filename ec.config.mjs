import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { defineEcConfig } from 'astro-expressive-code'
import { EC_CSS_VARS } from './src/constants/ec.mjs'

export default defineEcConfig({
	themes: ['one-light', 'night-owl'],
	plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
	defaultProps: {
		showLineNumbers: false,
		collapseStyle: 'collapsible-auto',
		wrap: true,
		overridesByLang: {
			'bash,sh,zsh': {
				wrap: false,
			},
		},
	},
	frames: {
		extractFileNameFromCode: false,
	},
	styleOverrides: {
		codeFontSize: `var(--${EC_CSS_VARS.codeFontSize}, 0.85rem)`,
		codeLineHeight: `var(--${EC_CSS_VARS.codeLineHeight}, 1.65)`,
		borderRadius: `var(--${EC_CSS_VARS.borderRadius}, 0.3rem)`,
		codeFontFamily: `var(--${EC_CSS_VARS.fontFamily})`,
		borderWidth: '0px',
		borderColor: 'transparent',
		codePaddingInline: '1rem',
		frames: {
			frameBoxShadowCssValue: `var(--${EC_CSS_VARS.frameBoxShadowCssValue})`,
			editorTabBarBackground: `var(--${EC_CSS_VARS.frameEditorTabBarBackground}, #eaeaeb)`,
			terminalTitlebarBackground: `var(--${EC_CSS_VARS.frameEditorTabBarBackground}, #eaeaeb)`,
		},
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
