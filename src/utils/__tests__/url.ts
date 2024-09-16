import { hasTrailingSlash, isInternalUrl, withTrailingSlash, withoutTrailingSlash } from '../url'

describe('hasTrailingSlash', () => {
	it('should return true if URL has a trailing slash', () => {
		expect(hasTrailingSlash('https://example.com/')).toBe(true)
	})

	it('should return false if URL does not have a trailing slash', () => {
		expect(hasTrailingSlash('https://example.com')).toBe(false)
	})
})

describe('withTrailingSlash', () => {
	it('should add a trailing slash to URL if it does not have one', () => {
		expect(withTrailingSlash('https://example.com')).toBe('https://example.com/')
	})

	it('should not modify URL if it already has a trailing slash', () => {
		expect(withTrailingSlash('https://example.com/')).toBe('https://example.com/')
	})
})

describe('withoutTrailingSlash', () => {
	it('should remove the trailing slash from URL if it has one', () => {
		expect(withoutTrailingSlash('https://example.com/')).toBe('https://example.com')
	})

	it('should not modify URL if it does not have a trailing slash', () => {
		expect(withoutTrailingSlash('https://example.com')).toBe('https://example.com')
	})

	it('should return "/" if URL is empty', () => {
		expect(withoutTrailingSlash('')).toBe('/')
	})
})

describe('isInternalUrl', () => {
	it('should return true if URL is internal', () => {
		expect(isInternalUrl('/path')).toBe(true)
	})

	it('should return false if URL is external', () => {
		expect(isInternalUrl('https://google.com')).toBe(false)
	})
})
