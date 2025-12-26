import type { RSSFeedItem } from '@astrojs/rss'
import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { SITE } from '@constants/meta'
import { filterPublished } from '@utils/collection'
import { normalize } from '@utils/slash'
import { getCollection } from 'astro:content'

function generateContent(description: string, link: string) {
	return `<p>${description}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${SITE.url}${link}">Keep reading</a>.</strong></div>`
}

export const GET: APIRoute = async () => {
	const writing = (await getCollection('writing', filterPublished)).map(entry => ({
		title: entry.data.title,
		description: entry.data.description,
		content: generateContent(entry.data.description, normalize(entry.data.slug)),
		link: normalize(entry.data.slug),
		pubDate: entry.data.date,
	} satisfies RSSFeedItem))

	const garden = (await getCollection('garden')).map(entry => ({
		title: entry.data.title,
		description: entry.data.description,
		content: generateContent(entry.data.description, normalize(entry.data.slug)),
		link: normalize(entry.data.slug),
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
