import { defineConfig } from 'astro/config'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { SITE } from '@constants/meta.mjs'
import { REDIRECTS } from '@data/redirects'

export default defineConfig({
	site: SITE.url,
	trailingSlash: 'always',
	redirects: REDIRECTS.map(r => ({ [r.fromPath]: r.toPath })),
	cacheDir: './.cache',
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
})
