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

		const srcset = await firstImage.getAttribute('srcset')
		expect(srcset).not.toBeNull()
		expect(getSrcSetWidths(srcset!)).toEqual(EXPECTED_WIDTHS)

		await expect.poll(async () => firstImage.evaluate((image) => {
			if (!(image instanceof HTMLImageElement))
				return false

			return image.complete && image.naturalHeight > 0 && image.naturalWidth > 0
		})).toBe(true)

		const expectedMaxHeight = await firstImage.evaluate(image => Math.round(720 * (image as HTMLImageElement).naturalHeight / (image as HTMLImageElement).naturalWidth))
		await expect(firstImage).toHaveCSS('max-height', `${expectedMaxHeight}px`)

		const sourceURLs = await images.evaluateAll(elements => Array.from(new Set(elements.map(image => image.getAttribute('src')))).filter(Boolean)) as string[]
		const failedURLs: string[] = []
		// Batch requests so the local preview server isn't flooded with hundreds of parallel connections
		for (let i = 0; i < sourceURLs.length; i += 25) {
			const batch = sourceURLs.slice(i, i + 25)
			const responses = await Promise.all(batch.map(url => request.fetch(url, { method: 'HEAD' })))
			failedURLs.push(...batch.filter((_, index) => !responses[index].ok()))
		}
		expect(failedURLs).toEqual([])
	})

	test('switches between masonry and grid layouts', async ({ page }) => {
		const wrapper = page.locator('#photos-img-wrapper')
		const firstImage = wrapper.locator('img').first()
		const masonryButton = page.getByRole('button', { name: 'Masonry layout' })
		const gridButton = page.getByRole('button', { name: 'Grid layout' })

		await masonryButton.click()
		await expect(masonryButton).toHaveClass(/active/)
		await expect(wrapper).toHaveCSS('display', 'block')

		await expect(masonryButton).toHaveAttribute('aria-pressed', 'true')

		await gridButton.click()
		await expect(gridButton).toHaveClass(/active/)
		await expect(gridButton).toHaveAttribute('aria-pressed', 'true')
		await expect(masonryButton).toHaveAttribute('aria-pressed', 'false')
		await expect(wrapper).toHaveCSS('display', 'grid')
		await expect(firstImage).toHaveCSS('aspect-ratio', '1 / 1')
		await expect(firstImage).toHaveCSS('object-fit', 'cover')

		await page.reload()
		await expect(gridButton).toHaveClass(/active/)
		await expect(wrapper).toHaveCSS('display', 'grid')
	})

	test('opens a named photo in the lightbox and closes it again', async ({ page }) => {
		const thumbnail = page.getByRole('button', { name: /^Open Photo 1 of \d+ from / }).first()
		const dialog = page.getByRole('dialog', { name: 'Photo viewer' })

		await thumbnail.click()
		await expect(dialog).toBeVisible()
		await expect(dialog.getByRole('img', { name: /^Photo 1 of \d+ from / })).toBeVisible()
		await page.keyboard.press('ArrowRight')
		await expect(dialog).toBeFocused()
		await expect(dialog.getByRole('button', { name: 'Close photo viewer' })).not.toBeFocused()

		await dialog.getByRole('button', { name: 'Close photo viewer' }).click()
		await expect(dialog).toBeHidden()
		await expect(thumbnail).toBeFocused()

		// The dialog itself takes focus so arrow navigation doesn't light up the close button's focus ring
		for (const key of ['Enter', 'Space']) {
			await thumbnail.press(key)
			await expect(dialog).toBeVisible()
			await expect(dialog).toBeFocused()
			await page.keyboard.press('ArrowRight')
			await expect(dialog).toBeFocused()
			await page.keyboard.press('Tab')
			await expect(dialog.getByRole('button', { name: 'Close photo viewer' })).toBeFocused()
			await page.keyboard.press('Escape')
			await expect(dialog).toBeHidden()
			await expect(thumbnail).toBeFocused()
		}
	})

	test('arrow keys in the lightbox skip photos hidden by filters', async ({ page }) => {
		const albums = await page.locator('.tag-group-item').evaluateAll(els => [
			...new Set(els.map(el => el.getAttribute('data-tags'))),
		])
		const [first, , third] = albums as Array<string>
		await page.goto(`/photos/?tags=${encodeURIComponent(first)},${encodeURIComponent(third)}`)
		await expect(page.locator('.tag-group-item:not(.hidden)')).toHaveCount(await page.locator(`.tag-group-item[data-tags="${first}"], .tag-group-item[data-tags="${third}"]`).count())

		const firstAlbum = page.getByRole('button', {
			name: new RegExp(`from ${first}$`),
		})
		await firstAlbum.last().click()
		const dialog = page.getByRole('dialog', { name: 'Photo viewer' })
		const image = dialog.getByRole('img')
		const lastOfFirst = await image.getAttribute('alt')

		await page.keyboard.press('ArrowRight')
		await expect(image).toHaveAttribute('alt', `Photo 1 of ${await page.getByRole('button', {
			name: new RegExp(`from ${third}$`),
		}).count()} from ${third}`)
		await page.keyboard.press('ArrowLeft')
		await expect(image).toHaveAttribute('alt', lastOfFirst!)
	})
})
