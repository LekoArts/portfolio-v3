import { ICON_CHOICES, TAGS_CHOICES, TYPE_CHOICES } from '@constants/content'
import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'

const writing = defineCollection({
	loader: glob({ pattern: '**\/[^_]*.mdx', base: './src/content/writing' }),
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
	loader: glob({ pattern: '**\/[^_]*.mdx', base: './src/content/garden' }),
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
	loader: glob({ pattern: '**\/[^_]*.yaml', base: './src/content/categories' }),
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
	categories,
	navigations,
	garden,
	writing,
}