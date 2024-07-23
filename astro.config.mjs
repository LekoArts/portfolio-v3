import { defineConfig } from 'astro/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import { SITE } from './src/constants/meta.mjs'
import { REDIRECTS } from './src/data/redirects.mjs'

// https://astro.build/config
export default defineConfig({
	site: SITE.url,
	trailingSlash: 'always',
	redirects: REDIRECTS,
	cacheDir: './.cache',
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
	output: 'static',
	adapter: netlify(),
	integrations: [sitemap({
		filter: page => page !== `${SITE.url}/privacy-policy` && page !== `${SITE.url}/legal-notice`,
	}), react()],
})
