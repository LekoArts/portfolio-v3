import { defaultDateFormat, isoDateFormat, yearDateFormat } from '../date'

describe('defaultDateFormat', () => {
	it('returns date in the format "MMM DD, YYYY"', () => {
		const date = new Date('2022-01-01')
		const formattedDate = defaultDateFormat(date)
		expect(formattedDate).toBe('Jan 1, 2022')
	})
})

describe('yearDateFormat', () => {
	it('returns date in the format "YYYY"', () => {
		const date = new Date('2022-01-01')
		const formattedDate = yearDateFormat(date)
		expect(formattedDate).toBe('2022')
	})
})

describe('isoDateFormat', () => {
	it('returns date in ISO format', () => {
		const date = new Date('2022-01-01')
		const formattedDate = isoDateFormat(date)
		expect(formattedDate).toBe('2022-01-01T00:00:00.000Z')
	})
})
