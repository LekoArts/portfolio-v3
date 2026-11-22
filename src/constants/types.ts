import type { TAGS_CHOICES } from '@constants/content'

export type AlertStatus = 'note' | 'warning' | 'caution' | 'success'

export const SVG_ICON_NAMES = [
	'general',
	'web-development',
	'developer-tools',
	'programming',
	'self-hosting',
	'ai',
	'hiking',
	'travel',
	'react',
	'pause',
	'play',
	'close',
	'check',
	'info',
	'warning',
	'lightbulb',
	'star',
	'arrow-right',
	'arrow-left',
	'share',
	'moon',
	'sun',
	'computer',
	'refresh',
	'export',
	'backward',
	'download',
	'grid',
	'list',
	'masonry',
	'rss',
	'resume',
	'bluesky',
	'linkedin',
] as const

export type SVGIconNames = typeof SVG_ICON_NAMES[number]

export type TagsColorSchemes = 'green' | 'blue' | 'purple' | 'yellow' | 'teal' | 'gray' | 'red' | 'orange'

export type ArrayElement<ArrayType extends readonly unknown[] | undefined>
	= ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Tag = typeof TAGS_CHOICES[number] | (string & {})
