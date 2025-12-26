import { ICON_CHOICES, TOPICS_CHOICES, TYPE_CHOICES } from '@constants/content'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const writing = defineCollection({
	loader: glob({ pattern: '**\/[^_]*.mdx', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional().default(''),
		slug: z.string(),
		description: z.string(),
		date: z.date(),
		lastUpdated: z.date(),
		type: z.enum(TYPE_CHOICES),
		topics: z.array(z.enum(TOPICS_CHOICES)),
		image: z.string().optional(),
		published: z.boolean().optional().default(true),
		icon: z.enum(ICON_CHOICES).optional(),
		series: z.object({
			id: z.string(),
			part: z.number(),
		}).optional(),
	}),
})

const navigations = defineCollection({
	loader: glob({ pattern: '**\/[^_]*.yaml', base: './src/content/navigations' }),
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

export const collections = {
	navigations,
	writing,
}
