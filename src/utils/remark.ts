import type { AlertStatus } from '@constants/types'
import type { Root } from 'mdast'
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { visit } from 'unist-util-visit'

const AlertRe = /^\[!(NOTE|WARNING|CAUTION|SUCCESS)\]\n$/

/**
 * This codemod turns GitHub-style blockquote alerts into `<Alert>` components.
 *
 * @example
 *
 * For example, the following MDX:
 *
 * ```mdx
 * > [!NOTE]
 * > **This is the note title**
 * >
 * > This is the note content.
 * ```
 *
 * Will be transformed into:
 *
 * ```mdx
 * <Alert status="note" title="This is the note title">
 *   This is the note content.
 * </Alert>
 * ```
 */
export function codemodAlerts() {
	return (tree: Root) => {
		visit(tree, 'blockquote', (node, nodeIndex, parent) => {
			if (!parent || typeof nodeIndex === 'undefined') {
				return
			}

			const first = node.children[0]
			if (!first) {
				return
			}

			if (
			// Should contain two children: the alert status and the title
				first.type === 'paragraph' && first.children.length === 2
				// Status will be a text
				&& first.children[0].type === 'text' && AlertRe.test(first.children[0].value)
				// Title will be **strong**
				&& first.children[1].type === 'strong'
				// Title content will be a text
				&& first.children[1].children.length === 1
				&& first.children[1].children[0].type === 'text'
			) {
				const rawStatus = first.children[0].value.match(AlertRe)?.[1] as Uppercase<AlertStatus> | undefined

				const status = rawStatus?.toLowerCase() as AlertStatus | undefined ?? 'note'
				const title = first.children[1].children[0].value

				const attributes: MdxJsxFlowElement['attributes'] = [
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
				]

				parent.children.splice(nodeIndex, 1, {
					type: 'mdxJsxFlowElement',
					name: 'Alert',
					attributes,
					children: node.children.slice(1),
				})
			}
		})
	}
}
