import queryString from 'query-string'
import { SITE } from '@constants/meta'

const base = new URL(SITE.url)

export function hasTrailingSlash(url: string) {
	return url.endsWith('/')
}

export function withTrailingSlash(url: string) {
	return hasTrailingSlash(url) ? url : `${url}/`
}

export function withoutTrailingSlash(url: string) {
	return (hasTrailingSlash(url) ? url.slice(0, -1) : url) || '/'
}

export function isInternalUrl(url: string): boolean {
	return new URL(url, base).hostname === base.hostname
}

const arrayFormat = 'comma'

export const queryStringTags = {
	/**
	 * @example queryStringTags.from(`?tags=JavaScript,React`)
	 * @example queryStringTags.from(window.location.search)
	 */
	from: (locationSearch: string) => {
		let result
		const parsed = queryString.parse(locationSearch, { arrayFormat })

		// Only set `result` if there are tags in the query string
		if (parsed.tags) {
			// If only one tag is selected a string is returned, not an array
			if (typeof parsed.tags === 'string') {
				result = {
					tags: [parsed.tags],
				}
			}
			else {
				result = parsed
			}
		}
		return result
	},
	/**
	 * @example queryStringTags.to({ tags: [`JavaScript`, `React`] })
	 */
	to: (input: Record<string, any>): string => queryString.stringify(input, { arrayFormat, skipNull: true }),
}
