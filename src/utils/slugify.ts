import sindresorhusSlugify, { type Options } from '@sindresorhus/slugify'
import { withTrailingSlash } from './url'

export const slugifyOptions = {
	decamelize: false,
} satisfies Options

const singleSlashRegex = /\/{2,}/g

/**
 * Creates a slug out of given input
 * @param {string} input
 * @returns {string} Slugified string with trailing slash
 */
export function slugify(input: string, prefix = ``) {
	if (!input) {
		throw new Error(`slugify requires an input`)
	}

	const slug = sindresorhusSlugify(input, slugifyOptions)
	const slugifiedPrefix = sindresorhusSlugify(prefix, slugifyOptions)

	return withTrailingSlash(`/${slugifiedPrefix}/${slug}`.replace(singleSlashRegex, `/`))
}
