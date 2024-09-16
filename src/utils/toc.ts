import type { MarkdownHeading } from 'astro'

export interface TocItem extends MarkdownHeading {
	subheadings: Array<TocItem>
}

export function buildToc(headings: Array<MarkdownHeading>): Array<TocItem> {
	const toc: Array<TocItem> = []
	const parentHeadings = new Map<number, TocItem>()

	headings.forEach((h) => {
		const heading: TocItem = { ...h, subheadings: [] }
		parentHeadings.set(heading.depth, heading)

		// Anything beyond h3 should not be included in the ToC
		if (heading.depth > 3) {
			return
		}

		if (heading.depth === 2) {
			toc.push(heading)
		}
		else {
			parentHeadings.get(heading.depth - 1)?.subheadings.push(heading)
		}
	})

	return toc
}

export function getIds(headings: Array<MarkdownHeading>) {
	return headings.map(h => h.slug)
}
