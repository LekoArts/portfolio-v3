import { ICON_CHOICES, TAGS_CHOICES, TYPE_CHOICES } from '@constants/content'
import { flickrPhotosetsGetListWithPhotosLoader, flickrPhotosetsGetPhotosLoader } from '@lekoarts/flickr-loader'
import { glob } from 'astro/loaders'
import { defineCollection, reference, z } from 'astro:content'

const FLICKR_USERNAME = 'ars_aurea'

const writing = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './content/writing' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional().default(''),
		date: z.date(),
		lastUpdated: z.date(),
		description: z.string(),
		type: z.enum(TYPE_CHOICES),
		category: reference('categories'),
		image: z.string(),
		published: z.boolean(),
	}),
})

const garden = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './content/garden' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		lastUpdated: z.date(),
		tags: z.array(z.enum(TAGS_CHOICES)),
		icon: z.enum(ICON_CHOICES),
	}),
})

const categories = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/categories' }),
	schema: ({ image }) => z.object({
		name: z.string(),
		description: z.string(),
		gradient: z.string(),
		image: image(),
	}),
})

const navigations = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/navigations' }),
	schema: z.array(z.object({
		name: z.string(),
		link: z.string().optional(),
		items: z.array(z.object({
			name: z.string(),
			link: z.string(),
			isExternal: z.boolean().optional(),
		})).optional(),
	})),
})

const art3d = defineCollection({
	loader: flickrPhotosetsGetPhotosLoader({
		photoset_id: '72177720300732809',
		username: FLICKR_USERNAME,
	}),
})

const artDesign = defineCollection({
	loader: flickrPhotosetsGetPhotosLoader({
		photoset_id: '72177720300725772',
		username: FLICKR_USERNAME,
	}),
})

const photography = defineCollection({
	loader: flickrPhotosetsGetListWithPhotosLoader({
		username: FLICKR_USERNAME,
		nin: ['72177720300732809', '72177720300725772'],
	}),
})

export const collections = {
	categories,
	navigations,
	garden,
	writing,
	art3d,
	artDesign,
	photography,
}
