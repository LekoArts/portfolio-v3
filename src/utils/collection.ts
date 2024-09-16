import type { CollectionEntry } from 'astro:content'
import { IS_PLAYWRIGHT } from 'astro:env/server'
import { slugify } from '@utils/slugify'

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
