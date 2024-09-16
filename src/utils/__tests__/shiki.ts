import { parseMeta, transformHighlight } from '../shiki'

describe('parseMeta', () => {
	it('handles falsy input', () => {
		expect(parseMeta('')).toBeNull()
	})
	it('handles malformed input', () => {
		expect(parseMeta('{ title: "test.js" }')).toBeNull()
		expect(parseMeta('title=test.js numbers=true')).toBeNull()
	})
	it('handles correct input', () => {
		expect(parseMeta('{{ }}')).toEqual({})

		expect(parseMeta('{{ "title": "test.js" }}')).toEqual({ title: 'test.js' })
		expect(parseMeta('{{ title: "test.js" }}')).toEqual({ title: 'test.js' })
		expect(parseMeta(`{{ title: 'test.js' }}`)).toEqual({ title: 'test.js' })
		expect(parseMeta(`{{ 'title': 'test.js' }}`)).toEqual({ title: 'test.js' })

		expect(parseMeta('{{ title: "test.js", highlight: [1, [3, 5]], numbers: true }}')).toEqual({ title: 'test.js', highlight: [1, [3, 5]], numbers: true })
	})
})

describe('transformHighlight', () => {
	it('handles falsy input', () => {
		expect(transformHighlight(undefined)).toEqual([])
	})
	it('handles correct input', () => {
		expect(transformHighlight([1])).toEqual([1])
		expect(transformHighlight([1, 2])).toEqual([1, 2])
		expect(transformHighlight([1, [3, 5], 7])).toEqual([1, 3, 4, 5, 7])
	})
})
