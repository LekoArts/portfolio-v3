/**
 * Returns a date in the format "MMM DD, YYYY"
 */
export function defaultDateFormat(date: Date): string {
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Returns a date in the format "YYYY"
 */
export function yearDateFormat(date: Date): string {
	return date.toLocaleDateString('en-US', { year: 'numeric' })
}

/**
 * Returns a date in ISO format
 */
export function isoDateFormat(date: Date): string {
	return date.toISOString()
}
