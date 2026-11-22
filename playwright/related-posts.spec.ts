import { expect, test } from '@playwright/test'

test.describe('Related posts', () => {
	test('lists up to three other posts, none from the same series', async ({ page }) => {
		await page.goto('/my-first-unraid-server/')

		const related = page.getByRole('region', { name: 'Related posts' })
		await expect(related).toBeVisible()

		const links = related.getByRole('link')
		const count = await links.count()
		expect(count).toBeGreaterThan(0)
		expect(count).toBeLessThanOrEqual(3)

		const seriesHrefs = await page.getByTestId('series-callout').locator('ol > li a').evaluateAll(els => els.map(el => el.getAttribute('href')))
		const relatedHrefs = await links.evaluateAll(els => els.map(el => el.getAttribute('href')))
		for (const href of relatedHrefs) {
			expect(href).not.toBe('/my-first-unraid-server/')
			expect(seriesHrefs).not.toContain(href)
		}
	})

	test('navigates to a related post', async ({ page }) => {
		await page.goto('/how-to-write-theme-aware-styles-with-vanilla-extract/')

		const link = page.getByRole('region', { name: 'Related posts' }).getByRole('link').first()
		const href = await link.getAttribute('href')
		await link.click()

		await expect(page).toHaveURL(href!)
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
	})
})
