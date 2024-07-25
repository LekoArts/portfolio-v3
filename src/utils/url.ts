export function hasTrailingSlash(url: string) {
	return url.endsWith(`/`)
}

export function withTrailingSlash(url: string) {
	return hasTrailingSlash(url) ? url : `${url}/`
}

export function withoutTrailingSlash(url: string) {
	return (hasTrailingSlash(url) ? url.slice(0, -1) : url) || `/`
}
