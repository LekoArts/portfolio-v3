/**
 * Copies a string to the user's clipboard
 * @example
 * await copyToClipboard(`Hello world`)
 */
export function copyToClipboard(str: string) {
	if (navigator?.clipboard) {
		return navigator.clipboard.writeText(str)
	}
	return Promise.reject(new Error('The Clipboard API is not available.'))
}
