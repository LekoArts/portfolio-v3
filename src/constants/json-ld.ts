import { SITE } from './meta.mjs'

export const IDENTITY = {
	'@id': `${SITE.url}/#identity`,
	'@type': `Organization`,
	'alternateName': `Lennart Jörgens`,
	'description': SITE.description,
	'email': `hello@lekoarts.de`,
	'founder': `Lennart Jörgens`,
	'foundingDate': `2017-12-08`,
	'image': {
		'@type': `ImageObject`,
		'height': `1024`,
		'url': `${SITE.url}/social/logo-1024w.png`,
		'width': `1024`,
	},
	'logo': {
		'@type': `ImageObject`,
		'height': `60`,
		'url': `${SITE.url}/social/logo-60w.png`,
		'width': `60`,
	},
	'name': SITE.titleDefault,
	'sameAs': [
    `https://twitter.com/lekoarts_de`,
    `https://www.youtube.com/c/LeKoArtsDE`,
    `https://github.com/LekoArts`,
    `https://dribbble.com/LekoArts`,
    `https://www.behance.net/lekoarts`,
    `https://mastodon.social/@lekoarts`,
	],
	'url': SITE.url,
}

export const CREATOR = {
	'@id': `${SITE.url}/#creator`,
	'@type': `Organization`,
	'alternateName': `Lennart Jörgens`,
	'description': SITE.description,
	'email': `hello@lekoarts.de`,
	'founder': `Lennart Jörgens`,
	'foundingDate': `2017-12-08`,
	'image': {
		'@type': `ImageObject`,
		'height': `1024`,
		'url': `${SITE.url}/social/logo-1024w.png`,
		'width': `1024`,
	},
	'logo': {
		'@type': `ImageObject`,
		'height': `60`,
		'url': `${SITE.url}/social/logo-60w.png`,
		'width': `60`,
	},
	'name': SITE.titleDefault,
	'url': SITE.url,
}

export interface BreadcrumbListItem {
	url: string
	name: string
}

export function breadcrumbList(items: Array<BreadcrumbListItem>) {
	const homeLevel = {
		'@type': `ListItem`,
		'item': {
			'@id': SITE.url,
			'name': `Homepage`,
		},
		'position': 1,
	}
	const nestedLevels = items.map((item, index) => ({
		'@type': `ListItem`,
		'item': {
			'@id': `${SITE.url}${item.url}`,
			'name': item.name,
		},
		'position': index + 2,
	}))
	return {
		'@context': `https://schema.org`,
		'@type': `BreadcrumbList`,
		'description': `Breadcrumbs list`,
		'itemListElement': [homeLevel, ...nestedLevels],
		'name': `Breadcrumbs`,
	}
}

interface ArticleProps {
	category: {
		name: string
		slug: string
	}
	post: {
		title: string
		description: string
		slug: string
		date: string
		lastUpdated: string
		year: string
		image: string
	}
	isGarden: boolean
}

export function article({ category, post, isGarden }: ArticleProps) {
	return {
		'@context': `https://schema.org`,
		'@graph': [
			IDENTITY,
			CREATOR,
			{
				'@type': `Article`,
				'articleSection': isGarden ? `Digital Garden` : `Writing`,
				'author': { '@id': `${SITE.url}/#identity` },
				'copyrightHolder': { '@id': `${SITE.url}/#identity` },
				'copyrightYear': post.year,
				'creator': { '@id': `${SITE.url}/#creator` },
				'dateModified': post.lastUpdated,
				'datePublished': post.date,
				'description': post.description,
				'genre': category.name,
				'headline': post.title,
				'image': {
					'@type': `ImageObject`,
					'url': `${SITE.url}${post.image}`,
				},
				'inLanguage': `en-US`,
				'mainEntityOfPage': `${SITE.url}${post.slug}`,
				'name': post.title,
				'publisher': { '@id': `${SITE.url}/#creator` },
				'url': `${SITE.url}${post.slug}`,
			},
			breadcrumbList([
				{ name: category.name, url: category.slug },
				{ name: post.title, url: post.slug },
			]),
		],
	}
}

export const HOMEPAGE = {
	'@context': `https://schema.org`,
	'@graph': [
		IDENTITY,
		CREATOR,
		{
			'@type': `WebPage`,
			'author': { '@id': `${SITE.url}/#identity` },
			'copyrightHolder': { '@id': `${SITE.url}/#identity` },
			'copyrightYear': `2017`,
			'creator': { '@id': `${SITE.url}/#creator` },
			'datePublished': `2017-12-08T23:33:12-05:00`,
			'description': SITE.description,
			'headline': SITE.titleDefault,
			'image': {
				'@type': `ImageObject`,
				'url': `${SITE.url}${SITE.defaultOgImage}`,
			},
			'inLanguage': `en-US`,
			'mainEntityOfPage': SITE.url,
			'name': SITE.titleDefault,
			'publisher': { '@id': `${SITE.url}/#creator` },
			'url': SITE.url,
		},
		breadcrumbList([]),
	],
}
