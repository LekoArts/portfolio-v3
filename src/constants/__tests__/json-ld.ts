import type { ArticleProps } from '../json-ld'
import { article, breadcrumbList } from '../json-ld'

const post: ArticleProps['post'] = {
	title: 'The Expanse',
	description: 'Sci-Fi',
	slug: '/the-expanse',
	date: '2021-07-17',
	lastUpdated: '2021-07-17',
	year: '2021',
	image: '/path-to-image.png',
	type: 'essay',
}

describe('json-ld', () => {
	it('breadcrumbList', () => {
		expect(
			breadcrumbList([
				{ name: 'James', url: '/james' },
				{ name: 'Naomi', url: '/naomi' },
			]),
		).toMatchSnapshot()
	})
	describe('article', () => {
		it('basic output', () => {
			const result = article({ post })
			expect(result['@graph'][2]).toMatchSnapshot()
		})
	})
})
