import type { Options } from 'rehype-autolink-headings'
import { toString } from 'hast-util-to-string'
import { h, s } from 'hastscript'

/**
 * Custom options for the rehype-autolink-headings plugin.
 */
export const rehypeAutolinkHeadingsOptions: Options = {
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
}
