import type { AlertStatus } from '@constants/types'
import { defineHastPlugin, defineMdastPlugin } from 'satteri'

const AlertRe = /^\[!(NOTE|WARNING|CAUTION|SUCCESS)\]\n$/

/**
 * Turns GitHub-style blockquote alerts into `<Alert>` components.
 */
export const satteriAlerts = defineMdastPlugin({
	name: 'alerts',
	blockquote(node, ctx) {
		const first = node.children[0]

		if (
			first?.type !== 'paragraph'
			|| first.children.length !== 2
			|| first.children[0].type !== 'text'
			|| !AlertRe.test(first.children[0].value)
			|| first.children[1].type !== 'strong'
			|| first.children[1].children.length !== 1
			|| first.children[1].children[0].type !== 'text'
		) {
			return
		}

		const rawStatus = first.children[0].value.match(AlertRe)?.[1] as Uppercase<AlertStatus> | undefined
		const status = rawStatus?.toLowerCase() as AlertStatus | undefined ?? 'note'
		const title = first.children[1].children[0].value

		ctx.replaceNode(node, {
			type: 'mdxJsxFlowElement',
			name: 'Alert',
			attributes: [
				{
					type: 'mdxJsxAttribute',
					name: 'status',
					value: status,
				},
				{
					type: 'mdxJsxAttribute',
					name: 'title',
					value: title,
				},
			],
			children: node.children.slice(1),
		})
	},
})

/**
 * Adds the existing accessible permalink markup after headings.
 */
export const satteriHeadingPermalinks = defineHastPlugin({
	name: 'heading-permalinks',
	element: {
		filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		visit(node, ctx) {
			const id = node.properties?.id

			if (typeof id !== 'string') {
				return
			}

			ctx.setProperty(node, 'tabIndex', -1)
			ctx.wrapNode(node, {
				type: 'element',
				tagName: 'div',
				properties: {
					className: id === 'introduction' ? ['markdown-heading', 'visually-hidden'] : ['markdown-heading'],
				},
				children: [
					{
						type: 'element',
						tagName: 'a',
						properties: {
							href: `#${id}`,
							ariaLabel: `Permalink: ${ctx.textContent(node)}`,
							className: ['anchor'],
						},
						children: [
							{
								type: 'element',
								tagName: 'svg',
								properties: {
									className: ['anchor-icon'],
									viewBox: '0 0 16 16',
									ariaHidden: 'true',
								},
								children: [
									{
										type: 'element',
										tagName: 'path',
										properties: {
											d: 'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z',
										},
										children: [],
									},
								],
							},
						],
					},
				],
			})
		},
	},
})
