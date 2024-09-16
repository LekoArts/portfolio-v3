import { buildToc } from '../toc'

const input = [
	{
		depth: 2,
		slug: 'what-to-expect-from-here-on-out',
		text: 'What to expect from here on out',
	},
	{
		depth: 3,
		slug: 'typography-should-be-easy',
		text: 'Typography should be easy',
	},
	{
		depth: 2,
		slug: 'what-if-we-stack-headings',
		text: 'What if we stack headings?',
	},
]

const inputWithDepth4 = [
	{
		depth: 2,
		slug: 'what-to-expect-from-here-on-out',
		text: 'What to expect from here on out',
	},
	{
		depth: 3,
		slug: 'typography-should-be-easy',
		text: 'Typography should be easy',
	},
	{
		depth: 4,
		slug: 'what-if-we-stack-headings',
		text: 'What if we stack headings?',
	},
]

describe('buildToc', () => {
	it('creates ToC', () => {
		expect(buildToc(input)).toMatchInlineSnapshot(`
			[
			  {
			    "depth": 2,
			    "slug": "what-to-expect-from-here-on-out",
			    "subheadings": [
			      {
			        "depth": 3,
			        "slug": "typography-should-be-easy",
			        "subheadings": [],
			        "text": "Typography should be easy",
			      },
			    ],
			    "text": "What to expect from here on out",
			  },
			  {
			    "depth": 2,
			    "slug": "what-if-we-stack-headings",
			    "subheadings": [],
			    "text": "What if we stack headings?",
			  },
			]
		`)
	})
	it('skips anything beyond h3', () => {
		expect(buildToc(inputWithDepth4)).toMatchInlineSnapshot(`
			[
			  {
			    "depth": 2,
			    "slug": "what-to-expect-from-here-on-out",
			    "subheadings": [
			      {
			        "depth": 3,
			        "slug": "typography-should-be-easy",
			        "subheadings": [],
			        "text": "Typography should be easy",
			      },
			    ],
			    "text": "What to expect from here on out",
			  },
			]
		`)
	})
})
