import { CATEGORY_CHOICES, ICON_CHOICES, TAGS_CHOICES, TYPE_CHOICES } from '@constants/content'
import { defineCollection, z } from 'astro:content'

const writing = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional().default(''),
		date: z.date(),
		lastUpdated: z.date(),
		description: z.string(),
		type: z.enum(TYPE_CHOICES),
		category: z.enum(CATEGORY_CHOICES),
		image: z.string(),
		published: z.boolean(),
	}),
})

const garden = defineCollection({
	type: 'content',
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
	type: 'data',
	schema: ({ image }) => z.object({
		name: z.string(),
		description: z.string(),
		gradient: z.string(),
		image: image().refine(img => img.width >= 800, {
			message: 'Image width should be at least 800px',
		}),
	}),
})

const navigations = defineCollection({
	type: 'data',
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
	categories,
	navigations,
	garden,
	writing,
}
