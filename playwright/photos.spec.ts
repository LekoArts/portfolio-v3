import { expect, test } from '@playwright/test'

const EXPECTED_WIDTHS = [720, 960, 1280, 1440, 2000]

function getSrcSetWidths(srcset: string): number[] {
	return srcset.split(',').map(entry => Number(entry.trim().match(/ (\d+)w$/)?.[1]))
}

test.describe('Photos', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/photos/')
	})

	test('renders responsive images with the preserved attributes', async ({ page, request }) => {
		const images = page.locator('#photos-img-wrapper img')
		const firstImage = images.first()

		await expect(images).not.toHaveCount(0)
		await expect(firstImage).toHaveAttribute('loading', 'lazy')
		await expect(firstImage).toHaveAttribute('decoding', 'async')
		await expect(firstImage).toHaveAttribute('role', 'presentation')
		await expect(firstImage).toHaveAttribute('data-astro-image', 'constrained')
		await expect(firstImage).toHaveAttribute('sizes', '(min-width: 720px) 720px, 100vw')
		await expect(firstImage).toHaveCSS('max-width', '720px')
		await expect(firstImage).toHaveCSS('max-height', '405px')

		const srcset = await firstImage.getAttribute('srcset')
		expect(srcset).not.toBeNull()
		expect(getSrcSetWidths(srcset!)).toEqual(EXPECTED_WIDTHS)

		await expect.poll(async () => firstImage.evaluate((image) => {
			if (!(image instanceof HTMLImageElement))
				return false

			return image.complete && image.naturalHeight > 0 && image.naturalWidth > 0
		})).toBe(true)

		const sourceURLs = await images.evaluateAll(elements => Array.from(new Set(elements.map(image => image.getAttribute('src')))).filter(Boolean))
		const responses = await Promise.all(sourceURLs.map(url => request.fetch(url!, { method: 'HEAD' })))
		expect(responses.every(response => response.ok())).toBe(true)
	})

	test('switches between masonry and grid layouts', async ({ page }) => {
		const wrapper = page.locator('#photos-img-wrapper')
		const firstImage = wrapper.locator('img').first()
		const masonryButton = page.getByRole('button', { name: 'Switch to "masonry" layout' })
		const gridButton = page.getByRole('button', { name: 'Switch to "grid" layout' })

		await masonryButton.click()
		await expect(masonryButton).toHaveClass(/active/)
		await expect(wrapper).toHaveCSS('display', 'block')

		await gridButton.click()
		await expect(gridButton).toHaveClass(/active/)
		await expect(wrapper).toHaveCSS('display', 'grid')
		await expect(firstImage).toHaveCSS('aspect-ratio', '1 / 1')
		await expect(firstImage).toHaveCSS('object-fit', 'cover')
	})
})
