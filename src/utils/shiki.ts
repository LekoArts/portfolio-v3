import type { ArrayElement } from '@constants/types'
import type { ShikiConfig } from 'astro'

type ShikiTransformer = ArrayElement<ShikiConfig['transformers']>

const META_REGEX = /^\{\s*\{.*?\}\s*\}$/
const KEY_REGEX = /([\w-]+)\s*:/g

interface Meta {
	title?: string
	numbers?: boolean
	highlight?: Array<number | Array<number>>
}

export function parseMeta(input: string | undefined): Meta | null {
	if (!input) {
		return null
	}

	if (!META_REGEX.test(input)) {
		return null
	}

	// 1. Convert {{}} to {}
	// 2. Add "quotes" to keys
	// 3. Replace single quotes with double quotes
	const meta = input.slice(1, -1).replace(KEY_REGEX, '"$1":').replaceAll('\'', '"')

	return JSON.parse(meta)
}

/**
 * Transforms [1, [3, 5], 7] into [1, 3, 4, 5, 7]
 */
export function transformHighlight(input: Meta['highlight']) {
	if (!input) {
		return []
	}

	return input.flatMap((item) => {
		if (Array.isArray(item)) {
			const [start, end] = item
			return Array.from({ length: end - start + 1 }, (_, i) => start + i)
		}

		return item
	})
}

const symbol = Symbol('highlighted-lines')

/**
 * The code block will have a meta string as following:
 * `{{ title: "test.js", highlight: [1, [3, 5]], numbers: true }}`
 *
 * With this transformer, the code block will have the following changes:
 * - Add a data-title attribute with the value of the title
 * - Add a line-numbers class if numbers is true
 * - Add a highlighted class to the lines that are in the highlight array
 */
export function transformerCodeMeta(): ShikiTransformer {
	return {
		name: 'meta-as-data-attributes',
		pre(node) {
			const meta = parseMeta(this.options.meta?.__raw)

			if (meta) {
				const { title, numbers } = meta

				if (numbers) {
					this.addClassToHast(node, 'line-numbers')
				}

				if (title) {
					node.properties['data-title'] = title
				}
			}

			return node
		},
		line(node, line) {
			const meta = parseMeta(this.options.meta?.__raw)

			if (meta) {
				const { highlight } = meta

				;(this.meta as any)[symbol] = transformHighlight(highlight)
				const lines: Array<number> = (this.meta as any)[symbol] || []

				if (lines?.includes(line)) {
					this.addClassToHast(node, 'highlighted')
				}
			}

			return node
		},
	}
}

/**
 * Remove line breaks between lines.
 * Useful when you override `display: block` to `.line` in CSS.
 */
export function removeLineBreaks(): ShikiTransformer {
	return {
		code(code) {
			code.children = code.children.filter(line => !(line.type === 'text' && line.value === '\n'))
		},
	}
}
