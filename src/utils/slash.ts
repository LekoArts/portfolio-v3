import { SITE } from '@constants/meta'
import { withoutTrailingSlash, withTrailingSlash } from '@utils/url'

const singleSlashRegex = /\/{2,}/g

/**
 * Normalize a slug to:
 * - Always start with a leading slash
 * - Respect the "trailingSlash" setting
 * - Not have double slashes
 */
export function normalize(slug: string): string {
	/**
	 * If path is an absolute URL, normalization should only apply to current Astro site
	 */
	if (URL.canParse(slug) && !slug.startsWith(SITE.url)) {
		return slug
	}

	if (SITE.trailingSlash === 'always') {
		slug = withTrailingSlash(slug)
	}
	else if (SITE.trailingSlash === 'never') {
		slug = withoutTrailingSlash(slug)
	}

	if (!slug.startsWith('/')) {
		slug = `/${slug}`
	}

	// Replace multiple slashes with a single slash
	slug = slug.replace(singleSlashRegex, '/')

	return slug
}
