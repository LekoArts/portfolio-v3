import calculateReadingTime from 'reading-time'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'

export function getReadingTime(text: string): string | undefined {
	if (!text || !text.length)
		return undefined
	try {
		const { minutes } = calculateReadingTime(toString(fromMarkdown(text)), { wordsPerMinute: 238 })
		if (minutes && minutes > 0) {
			return `${Math.ceil(minutes)} min read`
		}
		return undefined
	}
	// eslint-disable-next-line unused-imports/no-unused-vars
	catch (e) {
		return undefined
	}
}
