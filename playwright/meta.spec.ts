import { SITE } from '@constants/meta'
import { expect, test } from '@playwright/test'

const metaTagAssertions = [
	{
		name: 'Index Page',
		url: '/',
		title: SITE.titleDefault,
		metaTags: [
			{
				key: 'og:title',
				value: SITE.titleDefault,
			},
			{
				key: 'og:description',
				value: SITE.description,
			},
			{
				key: 'og:image',
				value: `https://www.lekoarts.de${SITE.defaultOgImage}`,
			},
		],
	},
	{
		name: 'Blog Post (Tutorial)',
		url: '/react/using-deferred-static-generation-with-analytics-tools/',
		title: 'Using Deferred Static Generation With Analytics Tools',
		metaTags: [
			{
				key: 'og:title',
				value: 'Using Deferred Static Generation With Analytics Tools',
			},
			{
				key: 'og:description',
				value: 'Only want to build out the most popular pages as static pages? No problem, you can use your analytics tool to control the usage of Deferred Static Generation in Gatsby.',
			},
			{
				key: 'og:image',
				value: 'https://www.lekoarts.de/og-images/dsg-analytics.png',
			},
			{
				key: 'twitter:label2',
				value: 'Category',
				type: 'name',
			},
			{
				key: 'twitter:data2',
				value: 'React',
				type: 'name',
			},
		],
	},
	{
		name: 'Blog Post (Prose)',
		url: '/design/introducing-the-theme-ui-plugin-for-figma/',
		title: 'Introducing the Theme UI Plugin for Figma',
		metaTags: [
			{
				key: 'og:title',
				value: 'Introducing the Theme UI Plugin for Figma',
			},
			{
				key: 'og:description',
				value: 'The Theme UI plugin for Figma allows for a workflow where Theme UI is the starting point both for design & development.',
			},
			{
				key: 'og:image',
				value: 'https://www.lekoarts.de/og-images/theme-ui-plugin.png',
			},
			{
				key: 'twitter:label2',
				value: 'Category',
				type: 'name',
			},
			{
				key: 'twitter:data2',
				value: 'Design',
				type: 'name',
			},
		],
	},
	{
		name: 'Garden Post',
		url: '/garden/how-to-add-plausible-analytics-to-gatsby/',
		title: 'How to Add Plausible Analytics to Gatsby',
		metaTags: [
			{
				key: 'og:title',
				value: 'How to Add Plausible Analytics to Gatsby',
			},
			{
				key: 'og:description',
				value: 'Learn how to add Plausible Analytics to your Gatsby site. Also read how to add TypeScript types for Plausible and 404 page tracking.',
			},
			{
				key: 'og:image',
				value: 'https://www.lekoarts.de/og/garden?title=How+to+Add+Plausible+Analytics+to+Gatsby&lastUpdated=Aug+22%2C+2023&tags=Gatsby',
			},
			{
				key: 'twitter:label2',
				value: 'Tags',
				type: 'name',
			},
			{
				key: 'twitter:data2',
				value: 'Gatsby',
				type: 'name',
			},
		],
	},
]

const noIndexPages = [
	{
		name: 'Legal Notice',
		url: '/legal-notice/',
	},
	{
		name: 'Privacy Policy',
		url: '/privacy-policy/',
	},
	{
		name: 'Resume',
		url: '/resume/',
	},
]

test.describe('Meta Tags', () => {
	for (const assertion of metaTagAssertions) {
		test(`${assertion.name} should have correct individual tags`, async ({ page }) => {
			await page.goto(assertion.url)

			await expect(page).toHaveTitle(assertion.title)

			for (const tag of assertion.metaTags) {
				let content: string | null

				if (tag.type === 'name') {
					content = await page.locator(`meta[name="${tag.key}"]`).getAttribute('value')
				}
				else {
					content = await page.locator(`meta[property="${tag.key}"]`).getAttribute('content')
				}

				expect(content).toContain(tag.value)
			}
		})
	}
	for (const assertion of noIndexPages) {
		test(`${assertion.name} should have noindex meta tag`, async ({ page }) => {
			await page.goto(assertion.url)

			const content = await page.locator('meta[name="robots"]').getAttribute('content')

			expect(content).toStrictEqual('noindex, nofollow')
		})
	}
	test('should be correct generally speaking', async ({ page }) => {
		await page.goto('/')
		const lang = await page.locator('html').getAttribute('lang')
		expect(lang).toBe('en-US')
	})
	test('should be correct on category pages', async ({ page }) => {
		await page.goto('/tutorials/')
		await expect(page).toHaveTitle(`Tutorials | ${SITE.title}`)
		const desc1 = await page.locator('meta[property="og:description"]').getAttribute('content')
		expect(desc1).toStrictEqual(
			'Tutorials across different categories in a longform format & with interactive elements',
		)

		await page.goto('/community/')
		await expect(page).toHaveTitle(`Community articles | ${SITE.title}`)
		const desc2 = await page.locator('meta[property="og:description"]').getAttribute('content')
		expect(desc2).toStrictEqual(
			'Building an engaging & inclusive community is hard and takes work. From the perspective of an open source maintainer I want to help you achieve this goal.',
		)
	})
})
