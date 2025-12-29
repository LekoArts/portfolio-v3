/**
 * Truncate a text to a specified length, adding ellipsis if necessary. Only cut off at a complete word.
 *
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text.
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text
	}
	const truncated = text.slice(0, maxLength)
	const lastSpaceIndex = truncated.lastIndexOf(' ')
	if (lastSpaceIndex === -1) {
		return `${truncated}...`
	}
	return `${truncated.slice(0, lastSpaceIndex)}...`
}
