import type { CollectionEntry } from 'astro:content'
import { normalize } from '@utils/slash'

export interface RelatedPostItem {
	slug: string
	title: string
	date: Date
}

/**
 * Pick up to `count` random posts that share at least one tag with `current`.
 * The post itself and other parts of its series are left out because the series navigation already links to them.
 */
export function getRelatedPosts(current: CollectionEntry<'writing'>, entries: Array<CollectionEntry<'writing'>>, count = 3): Array<RelatedPostItem> {
	const seriesId = current.data.series?.id
	const candidates = entries.filter(entry =>
		entry.id !== current.id
		&& (!seriesId || entry.data.series?.id !== seriesId)
		&& entry.data.tags.some(tag => current.data.tags.includes(tag)),
	)

	// Fisher–Yates shuffle
	for (let i = candidates.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
	}

	return candidates.slice(0, count).map(entry => ({
		slug: normalize(entry.data.slug),
		title: entry.data.title,
		date: entry.data.date,
	}))
}
