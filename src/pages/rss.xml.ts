import type { RSSFeedItem } from '@astrojs/rss'
import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { SITE } from '@constants/meta'
import { filterPublished } from '@utils/collection'
import { slugify } from '@utils/slugify'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async () => {
	const writing = (await getCollection('writing', filterPublished)).map(entry => ({
		title: entry.data.title,
		description: entry.data.description,
		link: slugify(entry.id, entry.data.category.id),
		pubDate: entry.data.date,
	} satisfies RSSFeedItem))

	const garden = (await getCollection('garden')).map(entry => ({
		title: entry.data.title,
		description: entry.data.description,
		link: slugify(entry.id, 'garden'),
		pubDate: entry.data.date,
	} satisfies RSSFeedItem))

	const items = [...writing, ...garden].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

	return rss({
		title: SITE.titleDefault,
		description: SITE.description,
		site: SITE.url,
		items,
		customData: '<language>en-us</language>',
	})
}
