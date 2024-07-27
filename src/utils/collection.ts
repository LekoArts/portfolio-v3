import type { CollectionEntry } from 'astro:content'

/**
 * Get the `slug` of each category, deduplicate the list, and return it as an array (after combining it with `/tutorials`)
 */
export function getDistinctCategoriesSlugs(data: Array<CollectionEntry<'categories'>>) {
	const categories = data.map(category => `/${category.id}`)

	return [...new Set(categories), '/tutorials']
}
