import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import remarkSandpack from '@lekoarts/remark-sandpack'
import { imageService } from '@unpic/astro/service'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig, envField } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import tsconfigPaths from 'vite-tsconfig-paths'
import { SITE } from './src/constants/meta.js'
import { REDIRECTS } from './src/constants/redirects.js'
import { rehypeAutolinkHeadingsOptions } from './src/utils/rehype'
import { codemodAlerts } from './src/utils/remark'
import { removeLineBreaks, transformerCodeMeta } from './src/utils/shiki'

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: SITE.url,
	trailingSlash: 'always',
	redirects: REDIRECTS,
	vite: {
		plugins: [tsconfigPaths(), vanillaExtractPlugin()],
	},
	integrations: [sitemap({
		filter: page => page !== `${SITE.url}/privacy-policy/` && page !== `${SITE.url}/legal-notice/`,
	}), mdx(), react()],
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
			FLICKR_API_KEY: envField.string({ access: 'secret', context: 'server' }),
		},
	},
	markdown: {
		syntaxHighlight: 'shiki',
		smartypants: true,
		gfm: true,
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]],
		remarkPlugins: [[remarkSandpack, { componentName: ['Playground'] }], codemodAlerts],
		shikiConfig: {
			themes: {
				light: 'one-light',
				dark: 'night-owl',
			},
			wrap: true,
			transformers: [
				transformerCodeMeta(),
				removeLineBreaks(),
			],
		},
	},
})
