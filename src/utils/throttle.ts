/**
 * Throttle function to limit execution of a function to once every `limit` milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(callback: T, limit: number) {
	let waiting = false
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (!waiting) {
			callback.apply(this, args)
			waiting = true
			setTimeout(() => {
				waiting = false
			}, limit)
		}
	}
}
