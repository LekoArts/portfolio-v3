import type { TOPICS_CHOICES } from '@constants/content'

export type AlertStatus = 'note' | 'warning' | 'caution' | 'success'

export type SVGIconNames
	= | 'general'
		| 'web-development'
		| 'developer-tools'
		| 'programming'
		| 'self-hosting'
		| 'ai'
		| 'outdoors'
		| 'travel'
		| 'logo'
		| 'react'
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
		| 'grid'
		| 'list'
		| 'masonry'
		| 'rss'

export type TagsColorSchemes = 'green' | 'blue' | 'purple' | 'yellow' | 'teal' | 'gray' | 'red' | 'orange'

export type ArrayElement<ArrayType extends readonly unknown[] | undefined>
	= ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Topic = typeof TOPICS_CHOICES[number] | (string & {})

export interface BreadcrumbListItem {
	url: string
	name: string
}
