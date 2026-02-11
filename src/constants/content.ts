import type { TagsColorSchemes } from './types'

export const TAGS_CHOICES = [
	'Web Development', // Gatsby, MDX, Astro, Design
	'React',
	'Developer Tools', // CLI, Tooling
	'Programming', // JS, TS, Python, Rust
	'Self-Hosting', // Unraid, Discord
	'General', // General
	// 'AI', // AI, Mastra, LLMs
	'Hiking', // Hiking, Hiking
	// 'Travel', // Vacation, Travel
] as const

export const TAG_TO_COLOR_MAP: Record<typeof TAGS_CHOICES[number], TagsColorSchemes> = {
	'Web Development': 'yellow',
	'React': 'blue',
	'Developer Tools': 'teal',
	'Programming': 'purple',
	'Self-Hosting': 'green',
	'General': 'gray',
	// 'AI': 'purple',
	'Hiking': 'green',
	// 'Travel': 'orange',
}

export const ICON_CHOICES = [
	'web-development',
	'react',
	'developer-tools',
	'programming',
	'self-hosting',
	'general',
	'ai',
	'hiking',
	'travel',
] as const

export const TYPE_CHOICES = ['essay', 'tutorial', 'note'] as const
