import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

async function click(page: Page, selector: string) {
	return page.locator(selector).click()
}

async function firstClick(page: Page, selector: string) {
	return page.locator(selector).first().click()
}

test.describe('Navigation', () => {
	test('primary navigation', async ({ page }) => {
		await page.goto('/')

		await click(page, '[aria-label="Primary navigation"] >> text=Writing')
		await expect(page).toHaveURL('/writing/')
		const nav = page.getByRole('navigation', { name: 'Primary navigation' })
		await expect(nav.getByRole('link', { name: 'Writing' })).toHaveAttribute('aria-current', 'page')
		await expect(nav.locator('[aria-current]')).toHaveCount(1)

		await click(page, '[aria-label="Primary navigation"] >> text=Photos')
		await expect(page).toHaveURL('/photos/')

		await click(page, '[aria-label="Primary navigation"] >> text=About')
		await expect(page).toHaveURL('/about/')

		await click(page, '[aria-label="lekoarts.de, Back to homepage"] svg')
		await expect(page).toHaveURL('/')
	})
	test('homepage sections are headings', async ({ page }) => {
		await page.goto('/')
		for (const name of [
			'Latest Post',
			'Featured',
			'More Posts',
			'Photos',
			'Open Source',
		]) {
			await expect(page.getByRole('heading', { level: 2, name, exact: true })).toBeVisible()
		}
		await expect(page.getByRole('heading', { level: 3, name: 'Featured Projects' })).toBeVisible()
		await expect(page.getByRole('heading', { level: 3 })).not.toHaveCount(1)
	})

	test('unknown pages offer a way back', async ({ page }) => {
		const errors: Array<string> = []
		page.on('pageerror', error => errors.push(error.message))
		const response = await page.goto('/this-page-does-not-exist/')
		expect(response?.status()).toBe(404)

		await expect(page).toHaveTitle(/Page not found/)
		await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible()
		await page.getByRole('link', { name: 'Browse all writing' }).click()
		await expect(page).toHaveURL('/writing/')
		expect(errors).toEqual([])
	})
	test('requires trailing slashes in the static preview', async ({ page }) => {
		const noSlashResponse = await page.goto('/writing')
		expect(noSlashResponse?.status()).toBe(404)

		const trailingSlashResponse = await page.goto('/writing/')
		expect(trailingSlashResponse?.ok()).toBe(true)
		await expect(page).toHaveURL('/writing/')
	})
	test('RSS from /writing', async ({ page }) => {
		await page.goto('/writing/')

		await firstClick(page, 'text=RSS Feed')
		await expect(page).toHaveURL('/rss.xml')
	})
	test('post from /writing', async ({ page }) => {
		await page.goto('/writing/')

		await firstClick(page, 'text=Kitchen Sink')
		await expect(page).toHaveURL('/kitchen-sink/')
	})
	test('filters writing by tags and syncs the URL', async ({ page }) => {
		const tagsParam = () => new URL(page.url()).searchParams.get('tags')
		const cards = page.locator('.tag-group-item')
		const visibleCards = page.locator('.tag-group-item:not(.hidden)')
		const react = page.locator('lekoarts-tag-group button[data-item="React"]')
		const devTools = page.locator('lekoarts-tag-group button[data-item="Developer Tools"]')

		await page.goto('/writing/?tags=React')
		await expect(react).toHaveClass(/active/)
		const total = await cards.count()
		const reactCount = await visibleCards.count()
		expect(reactCount).toBeGreaterThan(0)
		expect(reactCount).toBeLessThan(total)
		for (const tags of await visibleCards.evaluateAll(els => els.map(el => el.getAttribute('data-tags') ?? '')))
			expect(tags.split(',')).toContain('React')

		await expect(react).toHaveAttribute('aria-pressed', 'true')

		await devTools.click()
		await expect(devTools).toHaveClass(/active/)
		await expect(devTools).toHaveAttribute('aria-pressed', 'true')
		expect(tagsParam()).toBe('React,Developer Tools')
		expect(await visibleCards.count()).toBeGreaterThan(reactCount)

		await page.goBack()
		expect(tagsParam()).toBe('React')
		await expect(devTools).toHaveAttribute('aria-pressed', 'false')
		await expect(visibleCards).toHaveCount(reactCount)

		await page.goForward()
		expect(tagsParam()).toBe('React,Developer Tools')
		await expect(devTools).toHaveAttribute('aria-pressed', 'true')

		await react.click()
		await devTools.click()
		await expect(page).toHaveURL('/writing/')
		await expect(visibleCards).toHaveCount(total)

		// Restoring from history must not push new entries
		const historyLength = await page.evaluate(() => history.length)
		await page.goBack()
		expect(tagsParam()).toBe('Developer Tools')
		await expect(react).toHaveAttribute('aria-pressed', 'false')
		await expect(devTools).toHaveAttribute('aria-pressed', 'true')

		await page.goForward()
		await expect(page).toHaveURL('/writing/')
		await expect(devTools).toHaveAttribute('aria-pressed', 'false')
		await expect(visibleCards).toHaveCount(total)
		expect(await page.evaluate(() => history.length)).toBe(historyLength)
	})
	test('ignores unknown tags in the URL', async ({ page }) => {
		const visibleCards = page.locator('.tag-group-item:not(.hidden)')

		await page.goto('/writing/?tags=React,Does Not Exist')
		await expect(page.locator('lekoarts-tag-group button[data-item="React"]')).toHaveAttribute('aria-pressed', 'true')
		expect(new URL(page.url()).searchParams.get('tags')).toBe('React')

		await page.goto('/writing/?tags=Does Not Exist')
		await expect(page).toHaveURL('/writing/')
		await expect(visibleCards).toHaveCount(await page.locator('.tag-group-item').count())
	})
	for (const colorScheme of ['light', 'dark'] as const) {
		test(`shows a focus ring on every card variant (${colorScheme})`, async ({ page }) => {
			await page.emulateMedia({ colorScheme })
			const ring = /rgba\(66, 153, 225, 0\.6\) 0px 0px 0px 3px/
			await page.goto('/')
			// Homepage cards use h3 titles; only the default variant has a description
			const homeCards = {
				'default': page.locator('div:has(> a > h3 + p)').first(),
				'title-only': page.locator('div:has(> a > h3):not(:has(> a > h3 + p))').first(),
			}
			for (const card of Object.values(homeCards)) {
				await card.getByRole('link').focus()
				await expect(card).toHaveCSS('box-shadow', ring)
			}

			await page.goto('/writing/')
			const ghost = page.locator('.tag-group-item:has(> a > p):not(:has(> a > h2))').first()
			await ghost.getByRole('link').focus()
			await expect(ghost).toHaveCSS('box-shadow', ring)
		})
	}

	test('art pages', async ({ page }) => {
		await page.goto('/photos/?tags=3D')
		await page.goto('/photos/')
	})
	test('footer navigation', async ({ page }) => {
		await page.goto('/')

		await click(page, 'footer[role="contentinfo"] >> text=Writing')
		await expect(page).toHaveURL('/writing/')

		await click(page, 'footer[role="contentinfo"] >> text=RSS Feed')
		await expect(page).toHaveURL('/rss.xml')
	})
	test('tutorials', async ({ page }) => {
		await page.goto('/using-deferred-static-generation-with-analytics-tools/')
		await page.goto('/creating-a-figma-plugin-with-svelte/')
	})
	test('essays', async ({ page }) => {
		await page.goto('/introducing-the-theme-ui-plugin-for-figma/')
		await page.goto('/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/')
	})
	test('notes', async ({ page }) => {
		await page.goto('/running-cypress-tests-with-github-actions-in-parallel/')
		await page.goto('/how-to-test-cli-output-in-jest-vitest/')
	})
	test('other pages', async ({ page }) => {
		await page.goto('/uses/')
		await page.goto('/resume/')
		await page.goto('/privacy-policy/')
		await page.goto('/legal-notice/')
	})
})
