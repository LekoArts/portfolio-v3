import type { TAGS_CHOICES } from '@constants/content'

export type AlertStatus = 'note' | 'warning' | 'caution' | 'success'

export type SVGIconNames
	= | 'cli'
		| 'discord'
		| 'gatsby'
		| 'general'
		| 'javascript'
		| 'logo'
		| 'mdx'
		| 'python'
		| 'react'
		| 'typescript'
		| 'pause'
		| 'play'
		| 'close'
		| 'check'
		| 'info'
		| 'warning'
		| 'lightbulb'
		| 'star'
		| 'arrow-right'
		| 'share'
		| 'moon'
		| 'sun'
		| 'computer'
		| 'refresh'
		| 'export'
		| 'backward'
		| 'download'
		| 'rust'
		| 'grid'
		| 'list'
		| 'masonry'
		| 'astro'
		| 'unraid'

export type CardVariants = 'default' | 'title-only'

export interface CardProps {
	slug: string
	title: string
	subtitle?: string
	description?: string
	variant?: CardVariants
	icon?: SVGIconNames
}

export type ArrayElement<ArrayType extends readonly unknown[] | undefined>
	= ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Tag = typeof TAGS_CHOICES[number] | (string & {})

export interface BreadcrumbListItem {
	url: string
	name: string
}
