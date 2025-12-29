import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import remarkSandpack from '@lekoarts/remark-sandpack'
import { imageService } from '@unpic/astro/service'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import expressiveCode from 'astro-expressive-code'
import { defineConfig, envField } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import tsconfigPaths from 'vite-tsconfig-paths'
import { SITE } from './src/constants/meta.js'
import { REDIRECTS } from './src/constants/redirects.js'
import { rehypeAutolinkHeadingsOptions } from './src/utils/rehype'
import { codemodAlerts } from './src/utils/remark'

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
		service: imageService(),
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
		smartypants: true,
		gfm: true,
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]],
		remarkPlugins: [[remarkSandpack, { componentName: ['Playground'] }], codemodAlerts],
	},
	adapter: IS_PLAYWRIGHT
		? undefined
		: netlify({
				devFeatures: {
					images: false,
					environmentVariables: false,
				},
			}),
})
