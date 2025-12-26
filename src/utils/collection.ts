import type { CollectionEntry } from 'astro:content'
import { normalize } from '@utils/slash'
import { IS_PLAYWRIGHT } from 'astro:env/server'

/**
 * Filter out non-published writing entries in PROD, show them during DEV
 */
export function filterPublished(entry: CollectionEntry<'writing'>) {
	// If the site is run inside Playwright, show all entries
	if (IS_PLAYWRIGHT) {
		return true
	}

	return import.meta.env.PROD ? entry.data.published : true
}

/**
 * Filter by slugs
 */
export function filterBySlugs(
	entry: CollectionEntry<'writing'>,
	slugList: string[],
) {
	return slugList.includes(entry.data.slug)
}

/**
 * Sort published writing entries DESC by date
 */
export function getSortedWriting(data: Array<CollectionEntry<'writing'>>) {
	return data.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
}

export interface SeriesPartItem {
	slug: string
	title: string
	part: number
}

/**
 * Find all posts in a series. The series object can be defined on the frontmatter field of a post. It'll have an id and a part number.
 *
 * Only return the slug and title of the individual posts in the series.
 *
 * The result is sorted by the part number.
 */
export function getSeriesPosts(data: Array<CollectionEntry<'writing'>>, seriesId: string | undefined) {
	if (!seriesId) {
		return []
	}

	const result: Array<SeriesPartItem> = []

	for (const entry of data) {
		if (entry.data.series?.id === seriesId) {
			result.push({
				slug: normalize(entry.data.slug),
				title: entry.data.title,
				part: entry.data.series.part,
			})
		}
	}

	return result.sort((a, b) => a.part - b.part)
}
