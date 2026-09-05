import { satteri, satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import satteriSandpack from '@lekoarts/satteri-sandpack'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import expressiveCode from 'astro-expressive-code'
import { defineConfig, envField } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import { SITE } from './src/constants/meta.js'
import { REDIRECTS } from './src/constants/redirects.js'
import { satteriAlerts, satteriHeadingPermalinks } from './src/utils/satteri'

const IS_PLAYWRIGHT = Boolean(process.env.IS_PLAYWRIGHT)

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: SITE.url,
	trailingSlash: SITE.trailingSlash,
	redirects: REDIRECTS,
	vite: {
		plugins: [tsconfigPaths(), vanillaExtractPlugin()],
	},
	integrations: [expressiveCode(), mdx(), react(), sitemap({
		filter: page => page !== `${SITE.url}/privacy-policy/` && page !== `${SITE.url}/legal-notice/`,
	})],
	image: {
		service: {
			entrypoint: './src/lib/netlify-image-service.ts',
		},
	},
	cacheDir: './.cache',
	devToolbar: {
		enabled: false,
	},
	env: {
		schema: {
			IS_PLAYWRIGHT: envField.boolean({ access: 'public', context: 'server', default: false, optional: true }),
			GITHUB_TOKEN: envField.string({ access: 'secret', context: 'server' }),
		},
	},
	markdown: {
		processor: satteri({
			mdastPlugins: [satteriSandpack({ componentName: ['Playground', 'FileExplorer'] }), satteriAlerts],
			hastPlugins: [
				// Each document needs a fresh slugger before the permalink plugin reads heading IDs.
				() => satteriHeadingIdsPlugin(),
				satteriHeadingPermalinks,
			],
		}),
	},
	adapter: IS_PLAYWRIGHT
		? undefined
		: netlify({
				// Keep the custom Unpic-backed service; it generates Netlify Image CDN URLs directly.
				imageCDN: false,
				devFeatures: {
					images: false,
					environmentVariables: false,
					edgeFunctions: false,
				},
			}),
})
