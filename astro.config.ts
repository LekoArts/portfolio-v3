import { defineConfig, envField } from 'astro/config'
import { imageService } from '@unpic/astro/service'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import { remarkSandpack } from 'remark-sandpack'
import rehypeSlug from 'rehype-slug'
import { h, s } from 'hastscript'
import { toString } from 'hast-util-to-string'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import react from '@astrojs/react'
import { transformerCodeMeta } from './src/utils/shiki'
import { SITE } from './src/constants/meta.js'
import { REDIRECTS } from './src/constants/redirects.js'

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: SITE.url,
	trailingSlash: 'always',
	redirects: REDIRECTS,
	vite: {
		plugins: [vanillaExtractPlugin()],
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
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
			behavior: 'after',
			group(node: any) {
				// Hide the "Introduction" heading that is only there for the ToC
				const isIntroduction = node.properties.id === 'introduction'

				return h(`.markdown-heading${isIntroduction ? '.visually-hidden' : ''}`)
			},
			headingProperties() {
				return { tabIndex: -1 }
			},
			properties(node: any) {
				return { ariaLabel: `Permalink: ${toString(node)}`, className: 'anchor' }
			},
			content() {
				return h('svg', { className: 'anchor-icon', viewBox: '0 0 16 16', ariaHidden: true }, [
					s('path', { d: 'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z' }),
				])
			},
		}]],
		// @ts-expect-error - Incorrect types in remark-sandpack
		remarkPlugins: [[remarkSandpack, { componentName: 'Playground' }]],
		shikiConfig: {
			themes: {
				light: 'one-light',
				dark: 'night-owl',
			},
			wrap: true,
			transformers: [transformerCodeMeta(),
			/**
			 * Remove dangling new line at the end of the code block.
			 */
				{
					preprocess(code) {
						if (code.endsWith('\n')) {
							code = code.slice(0, -1)
						}
						return code
					},
				},
				/**
				 * Remove line breaks between lines.
				 * Useful when you override `display: block` to `.line` in CSS.
				 */
				{
					code(code) {
						code.children = code.children.filter(line => !(line.type === 'text' && line.value === '\n'))
					},
				}],
		},
	},
})
