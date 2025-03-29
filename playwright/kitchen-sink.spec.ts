import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/community/kitchen-sink/')
})

test.describe('Smoke Test', () => {
	test('should have MDX content', async ({ page }) => {
		page.locator('h2:has-text("Example Heading")')
	})
})

test.describe('Headings', () => {
	test('should have accessible permalinks', async ({ page }) => {
		const heading = page.locator('h2:has-text("Example Heading")')
		await expect(heading).toHaveAttribute('id', 'example-heading')
		await expect(heading).toHaveAttribute('tabindex', '-1')

		const headingLink = page.getByLabel('Permalink: Example Heading')
		await expect(headingLink).toHaveAttribute('href', '#example-heading')
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

test.describe('Alerts', () => {
	test('should have titles', async ({ page }) => {
		page.locator('data-testid=alert-success >> text=Success Title')
		page.locator('data-testid=alert-note >> text=Note Title')
		page.locator('data-testid=alert-warning >> text=Warning Title')
		page.locator('data-testid=alert-caution >> text=Caution Title')
	})
	test('should have contents', async ({ page }) => {
		page.locator('data-testid=alert-success >> text=This is a success.')
		page.locator('data-testid=alert-note >> text=This is a note.')
		page.locator('data-testid=alert-warning >> text=This is a warning.')
		page.locator('data-testid=alert-caution >> text=This is a caution.')
	})
})

test.describe('Code', () => {
	test('should show inline code', async ({ page }) => {
		page.locator('code:has-text("inline-code-block)')
	})
	test('should not show code-header with no language/title defined', async ({ page }) => {
		const childSelector = 'pre:has-text("without any meta")'
		const codeWrapperLocator = page.locator('data-testid=code-wrapper', {
			has: page.locator(childSelector),
		})

		const codeHeader = codeWrapperLocator.getByTestId('code-header')
		await expect(codeHeader).not.toBeVisible()
	})
	test('should show code-header with language', async ({ page }) => {
		const childSelector = 'text=/.*"simple language".*/'
		const codeWrapperLocator = page.locator('data-testid=code-wrapper', {
			has: page.locator(childSelector),
		})

		const codeHeader = codeWrapperLocator.getByTestId('code-header')
		await expect(codeHeader).toBeVisible()
		const lang = codeHeader.locator('[data-lang="ts"]')
		await expect(lang).toContainText('ts')
	})
	test('should show code-header with language & title', async ({ page }) => {
		const childSelector = 'text=/.*"simple language with title".*/'
		const codeWrapperLocator = page.locator('data-testid=code-wrapper', {
			has: page.locator(childSelector),
		})

		const codeHeader = codeWrapperLocator.getByTestId('code-header')
		await expect(codeHeader).toBeVisible()
		const lang = codeHeader.locator('[data-lang="js"]')
		await expect(lang).toContainText('js')
		const title = codeHeader.getByTestId('code-title')
		await expect(title).toContainText('title.js')
	})
	test('should show line numbers', async ({ page }) => {
		const childSelector = 'text=/.*"simple language with title and line numbers".*/'
		const codeWrapperLocator = page.locator('data-testid=code-wrapper', {
			has: page.locator(childSelector),
		})

		const content = await codeWrapperLocator.locator('span.line').first().evaluate(el => window.getComputedStyle(el, ':before').content)

		expect(content).toContain('counter(step)')
	})
	test('should show line numbers and line highlights', async ({ page }) => {
		const childSelector = 'text=/.*"simple language with title and line numbers and highlight and a really long text, too".*/'
		const codeWrapperLocator = page.locator('data-testid=code-wrapper', {
			has: page.locator(childSelector),
		})

		const highlighted = codeWrapperLocator.locator('span.highlighted').first()
		const normal = codeWrapperLocator.locator('span:not(.highlighted)').first()

		const content = await codeWrapperLocator.locator('span.line').first().evaluate(el => window.getComputedStyle(el, ':before').content)

		expect(content).toContain('counter(step)')

		const highlightCSS = /linear-gradient\(90deg, rgb\(140, 175, 255\)/g

		await expect(highlighted).toHaveCSS('background', highlightCSS)
		await expect(normal).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
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
		const caption = page.getByRole('figure').locator('figcaption').first()

		await expect(video).toBeVisible()
		await expect(caption).toContainText('Showcasing the Figma plugin in action.')
	})
})
