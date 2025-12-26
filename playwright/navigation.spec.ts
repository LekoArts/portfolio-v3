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

		await click(page, '[aria-label="Primary navigation"] >> text=Photos')
		await expect(page).toHaveURL('/photos/')

		await click(page, '[aria-label="Primary navigation"] >> text=About')
		await expect(page).toHaveURL('/about/')

		await click(page, '[aria-label="lekoarts.de, Back to homepage"] svg')
		await expect(page).toHaveURL('/')
	})
	test('digital garden from /writing', async ({ page }) => {
		await page.goto('/writing/')

		await firstClick(page, 'text=Digital Garden')
		await expect(page).toHaveURL('/garden/')
	})
	test('post from /writing', async ({ page }) => {
		await page.goto('/writing/')

		await firstClick(page, 'text=Kitchen Sink')
		await expect(page).toHaveURL('/community/kitchen-sink/')
	})
	test('art pages', async ({ page }) => {
		await page.goto('/photos/?tags=3D')
		await page.goto('/photos/')
	})
	test('footer navigation', async ({ page }) => {
		await page.goto('/')

		await click(page, 'footer[role="contentinfo"] >> text=Writing')
		await expect(page).toHaveURL('/writing/')

		await click(page, 'footer[role="contentinfo"] >> text=Digital Garden')
		await expect(page).toHaveURL('/garden/')

		await click(page, 'footer[role="contentinfo"] >> text=RSS Feed')
		await expect(page).toHaveURL('/rss.xml')
	})
	test('writing (tutorial) pages', async ({ page }) => {
		await page.goto('/react/using-deferred-static-generation-with-analytics-tools/')
		await page.goto('/javascript/creating-a-figma-plugin-with-svelte/')
	})
	test('writing (prose) pages', async ({ page }) => {
		await page.goto('/design/introducing-the-theme-ui-plugin-for-figma/')
		await page.goto('/javascript/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/')
	})
	test('garden pages', async ({ page }) => {
		await page.goto('/garden/running-cypress-tests-with-github-actions-in-parallel/')
		await page.goto('/garden/how-to-test-cli-output-in-jest-vitest/')
	})
	test('other pages', async ({ page }) => {
		await page.goto('/uses/')
		await page.goto('/resume/')
		await page.goto('/privacy-policy/')
		await page.goto('/legal-notice/')
	})
})
