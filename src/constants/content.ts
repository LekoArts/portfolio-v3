import type { TagsColorSchemes } from './types'

export const TOPICS_CHOICES = [
	'Web Development', // Gatsby, MDX, Astro, Design
	'React',
	'Developer Tools', // CLI, Tooling
	'Programming', // JS, TS, Python, Rust
	'Self-Hosting', // Unraid, Discord
	'General', // General
	'AI', // AI, Mastra, LLMs
	'Outdoors', // Hiking, Outdoors
	'Travel', // Vacation, Travel
] as const

export const TOPIC_TO_COLOR_MAP: Record<typeof TOPICS_CHOICES[number], TagsColorSchemes> = {
	'Web Development': 'yellow',
	'React': 'blue',
	'Developer Tools': 'teal',
	'Programming': 'purple',
	'Self-Hosting': 'green',
	'General': 'gray',
	'AI': 'purple',
	'Outdoors': 'green',
	'Travel': 'orange',
}

export const ICON_CHOICES = [
	'web-development',
	'react',
	'developer-tools',
	'programming',
	'self-hosting',
	'general',
	'ai',
	'outdoors',
	'travel',
] as const

export const TYPE_CHOICES = ['essay', 'tutorial', 'note'] as const
