import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/kitchen-sink/')
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
})
