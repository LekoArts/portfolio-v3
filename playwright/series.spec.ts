import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/my-first-unraid-server/')
})

test.describe('Series Callout', () => {
	test('displays callout', async ({ page }) => {
		await expect(page.getByTestId('series-callout')).toBeVisible()
	})
	test('displays title and items', async ({ page }) => {
		// Get the <summary> element inside the details
		const summary = page.getByTestId('series-callout').locator('summary')
		await expect(summary).toContainText('My First Unraid Server')

		// Get the <ol> and its <li> children
		const listItems = await page.getByTestId('series-callout').locator('ol > li')
		await expect(await listItems.count()).toBeGreaterThan(1)
		await expect(listItems.nth(0)).toContainText('My First Unraid Server')
		await expect(listItems.nth(1)).toContainText('Essential Unraid Apps')
	})
	test('navigates to other post in series', async ({ page }) => {
		const callout = await page.getByTestId('series-callout')

		// Expand the details if not already open
		const isOpen = await callout.getAttribute('open')
		if (!isOpen) {
			await callout.locator('summary').click()
		}
		const listItems = await page.getByTestId('series-callout').locator('ol > li')
		await listItems.nth(1).locator('a').click()
		await expect(page).toHaveURL('/essential-unraid-apps/')
	})
})
