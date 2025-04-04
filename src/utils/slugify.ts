import type { Options } from '@sindresorhus/slugify'
import sindresorhusSlugify from '@sindresorhus/slugify'
import { withTrailingSlash } from '@utils/url'

export const slugifyOptions = {
	decamelize: false,
} satisfies Options

const singleSlashRegex = /\/{2,}/g

/**
 * Creates a slug out of given input and prefix
 */
export function slugify(input: string, prefix = '') {
	if (!input) {
		throw new Error('slugify requires an input')
	}

	const slug = sindresorhusSlugify(input, slugifyOptions)
	const slugifiedPrefix = sindresorhusSlugify(prefix, slugifyOptions)

	return withTrailingSlash(`/${slugifiedPrefix}/${slug}`.replace(singleSlashRegex, '/'))
}
