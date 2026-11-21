import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/kitchen-sink/')
})

test.describe('Smoke Test', () => {
	test('should have MDX content', async ({ page }) => {
		await expect(page.locator('h2:has-text("Example Heading")')).toBeVisible()
	})
})

test.describe('Headings', () => {
	test('should have accessible permalinks', async ({ page }) => {
		const heading = page.locator('h2:has-text("Example Heading")')
		await expect(heading).toHaveAttribute('id', 'example-heading')
		await expect(heading).toHaveAttribute('tabindex', '-1')

		const headingLink = page.getByLabel('Permalink: Example Heading')
		await expect(headingLink).toHaveAttribute('href', '#example-heading')

		// Reach the permalink through sequential keyboard navigation, not programmatic focus
		for (let i = 0; i < 50 && !(await headingLink.evaluate(el => el === document.activeElement)); i++)
			await page.keyboard.press('Tab')
		await expect(headingLink).toBeFocused()

		// Keyboard focus reveals it instantly instead of fading in
		await expect(headingLink).toHaveCSS('transition-duration', '0s')
		expect(await headingLink.evaluate(el => getComputedStyle(el).opacity)).toBe('1')
	})
})

test.describe('GitHub Flavored Markdown', () => {
	test('should render tables', async ({ page }) => {
		const table = page.getByRole('table')

		await expect(table.getByRole('columnheader')).toHaveText(['Wrestler', 'Origin', 'Finisher'])
		await expect(table.getByRole('cell', { name: 'Bret “The Hitman” Hart' })).toBeVisible()
	})
})

test.describe('Playground', () => {
	test('should render correctly', async ({ page }) => {
		await expect(page.getByTestId('playground-title')).toHaveText('Testing Things')
		await expect(page.getByTestId('playground-code-editor')).toBeVisible()
		await expect(page.getByTestId('playground-preview')).toBeVisible()

		const editor = page.getByTestId('playground-code-editor')
		const activeTab = editor.locator('div[aria-selected="true"] > button')
		const inactiveTab = editor.locator('div[aria-selected="false"] > button')

		await expect(activeTab).toHaveText('App.js')
		await expect(inactiveTab).toHaveText('root.js')
	})
})

test.describe('File Explorer', () => {
	test('should render the configured files', async ({ page }) => {
		await expect(page.getByText('Obsidian File Structure', { exact: true })).toBeVisible()
		await expect(page.getByText('Travel_Advanced.md', { exact: true })).toBeVisible()
	})
})

test.describe('Alerts', () => {
	test('should have titles', async ({ page }) => {
		await expect(page.getByTestId('alert-success')).toContainText('Success Title')
		await expect(page.getByTestId('alert-note')).toContainText('Note Title')
		await expect(page.getByTestId('alert-warning')).toContainText('Warning Title')
		await expect(page.getByTestId('alert-caution')).toContainText('Caution Title')
	})
	test('should have contents', async ({ page }) => {
		await expect(page.getByTestId('alert-success')).toContainText('This is a success.')
		await expect(page.getByTestId('alert-note')).toContainText('This is a note.')
		await expect(page.getByTestId('alert-warning')).toContainText('This is a warning.')
		await expect(page.getByTestId('alert-caution')).toContainText('This is a caution.')
	})
})

test.describe('Code', () => {
	test('should preserve semantic text spacing around inline code', async ({ page }) => {
		const paragraph = page.getByText('Here goes an inline-code-block code block.', { exact: true })

		await expect(paragraph).toBeVisible()
		await expect(paragraph).toHaveText('Here goes an inline-code-block code block.')
		await expect(paragraph.locator('code')).toHaveText('inline-code-block')
	})
	test('should render a code block', async ({ page }) => {
		const codeBlock = page.locator('.expressive-code pre')
		await expect(codeBlock.first()).toBeVisible()
	})
	test('should render a code block with a title', async ({ page }) => {
		const codeBlockWithTitle = page.locator('.expressive-code .frame .header .title')
		await expect(codeBlockWithTitle.first()).toBeVisible()
	})
	test('should render line numbers in a code block', async ({ page }) => {
		const lineNumbers = page.locator('.expressive-code .gutter .ln')
		await expect(lineNumbers.first()).toBeVisible()
	})
})

test.describe('Collapsible', () => {
	test('should have title', async ({ page }) => {
		const title = page.getByTestId('collapsible-summary')
		await expect(title).toHaveText('Click me here')
	})
	test('should have content', async ({ page }) => {
		const col = page.getByTestId('collapsible-wrapper')
		await expect(col).toContainText('Some more text.')
	})
})

test.describe('Video', () => {
	test('should render correctly', async ({ page }) => {
		const video = page.getByLabel('Video showcasing the example plugin in action.')
		const caption = page.getByTestId('video').locator('figcaption').first()

		await expect(video).toBeVisible()
		await expect(caption).toContainText('Showcasing the Figma plugin in action.')
	})

	test('can be paused and resumed with the keyboard', async ({ page }) => {
		const figure = page.getByTestId('video').first()
		const video = figure.locator('video')
		const pause = figure.getByRole('button', { name: 'Pause video' })

		await pause.focus()
		await page.keyboard.press('Enter')
		await expect(video).toHaveJSProperty('paused', true)

		const play = figure.getByRole('button', { name: 'Play video' })
		await page.keyboard.press('Enter')
		await expect(video).toHaveJSProperty('paused', false)
		await expect(play).toHaveCount(0)
	})

	test('stays in the paused state when playback fails', async ({ page }) => {
		await page.addInitScript(() => {
			HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Playback blocked', 'NotAllowedError'))
			;(window as any).unhandled = 0
			window.addEventListener('unhandledrejection', () => (window as any).unhandled++)
		})
		await page.reload()

		const figure = page.getByTestId('video').first()
		const play = figure.getByRole('button', { name: 'Play video' })
		await expect(play).toBeVisible()

		await play.click()
		await expect(play).toBeVisible()
		await expect(figure.getByRole('button', { name: 'Pause video' })).toHaveCount(0)
		await expect(figure.locator('video')).toHaveJSProperty('paused', true)
		// Give an unhandled rejection a chance to surface before checking
		await page.waitForTimeout(100)
		expect(await page.evaluate(() => (window as any).unhandled)).toBe(0)
	})

	test('starts paused when reduced motion is preferred', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' })
		await page.reload()

		const figure = page.getByTestId('video').first()
		await expect(figure.getByRole('button', { name: 'Play video' })).toBeVisible()
		await expect(figure.locator('video')).toHaveJSProperty('paused', true)
	})
})
