import type { CollectionEntry } from 'astro:content'
import { slugify } from '@utils/slugify'
import { IS_PLAYWRIGHT } from 'astro:env/server'

/**
 * Get all distinct categories from the collection and add a slug for each
 */
export function getDistinctCategories(data: Array<CollectionEntry<'categories'>>) {
	return data.map(category => ({
		...category,
		slug: slugify(category.data.name),
	}))
}

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
 * Sort published writing entries DESC by date
 */
export function getSortedWriting(data: Array<CollectionEntry<'writing'>>) {
	return data.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
}

/**
 * Sort garden entries DESC by date
 */
export function getSortedGarden(data: Array<CollectionEntry<'garden'>>) {
	return data.sort((a, b) => new Date(b.data.lastUpdated).getTime() - new Date(a.data.lastUpdated).getTime())
}

/**
 * Sort photosets by their creation date DESC
 */
export function getSortedPhotosets(data: Array<CollectionEntry<'photos'>>) {
	return data.sort((a, b) => new Date(b.data.date_create!).getTime() - new Date(a.data.date_create!).getTime())
}

export interface SeriesPartItem {
	slug: string
	title: string
	part: number
}

/**
 * Find all posts in a series. The series object can be defined on the frontmatter field of a garden post. It'll have an id and a part number.
 *
 * Only return the slug and title of the individual posts in the series.
 *
 * The result is sorted by the part number.
 */
export function getSeriesPosts(data: Array<CollectionEntry<'garden'>>, seriesId: string | undefined) {
	if (!seriesId) {
		return []
	}

	const result: Array<SeriesPartItem> = []

	for (const entry of data) {
		if (entry.data.series?.id === seriesId) {
			result.push({
				slug: slugify(entry.id, 'garden'),
				title: entry.data.title,
				part: entry.data.series.part,
			})
		}
	}

	return result.sort((a, b) => a.part - b.part)
}
