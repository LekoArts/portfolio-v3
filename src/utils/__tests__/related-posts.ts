import type { CollectionEntry } from 'astro:content'
import { getRelatedPosts } from '../related-posts'

function post(id: string, tags: Array<string>, series?: { id: string, part: number }): CollectionEntry<'writing'> {
	return {
		id,
		collection: 'writing',
		data: {
			slug: id,
			title: `Title ${id}`,
			date: new Date('2024-01-01'),
			tags,
			series,
		},
	} as unknown as CollectionEntry<'writing'>
}

const current = post('current', ['React', 'CSS'], { id: 'styling', part: 1 })
const entries = [
	current,
	post('series-sibling', ['React'], { id: 'styling', part: 2 }),
	post('other-series', ['CSS'], { id: 'other', part: 1 }),
	post('shares-react', ['React']),
	post('shares-css', ['CSS', 'Design']),
	post('shares-both', ['React', 'CSS']),
	post('unrelated', ['Hiking']),
]

describe('getRelatedPosts', () => {
	it('only returns posts that share a tag, excluding the post itself and its series', () => {
		const slugs = getRelatedPosts(current, entries, 10).map(p => p.slug).sort()

		expect(slugs).toEqual([
			'/other-series/',
			'/shares-both/',
			'/shares-css/',
			'/shares-react/',
		])
	})
	it('returns at most `count` posts', () => {
		expect(getRelatedPosts(current, entries)).toHaveLength(3)
	})
	it('returns no posts when nothing shares a tag', () => {
		expect(getRelatedPosts(post('lonely', ['Gardening']), entries)).toEqual([])
	})
	it('maps entries to slug, title and date', () => {
		const [item] = getRelatedPosts(post('x', ['Hiking']), entries)

		expect(item).toEqual({
			slug: '/unrelated/',
			title: 'Title unrelated',
			date: new Date('2024-01-01'),
		})
	})
})
