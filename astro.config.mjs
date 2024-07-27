import { defineConfig } from 'astro/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import { SITE } from './src/constants/meta.mjs'
import { REDIRECTS } from './src/constants/redirects.mjs'

// https://astro.build/config
export default defineConfig({
	output: 'static',
	adapter: netlify(),
	site: SITE.url,
	trailingSlash: 'always',
	redirects: REDIRECTS,
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'night-owl',
			},
			wrap: true,
		},
	},
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
	integrations: [sitemap({
		filter: page => page !== `${SITE.url}/privacy-policy/` && page !== `${SITE.url}/legal-notice/`,
	}), react(), mdx()],
	cacheDir: './.cache',
})
