import { satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri'
import { mdxToJs } from 'satteri'
import { satteriAlerts, satteriHeadingPermalinks } from '../satteri'

describe('sätteri markdown plugins', () => {
	it.each([
		['NOTE', 'note'],
		['WARNING', 'warning'],
		['CAUTION', 'caution'],
		['SUCCESS', 'success'],
	])('converts %s blockquotes into Alert components', (inputStatus, outputStatus) => {
		const source = `> [!${inputStatus}]\n> **Alert Title**\n>\n> Alert content with **formatting**.`
		const result = mdxToJs(source, {
			jsx: true,
			mdastPlugins: [satteriAlerts],
		})

		expect(result.code).toContain(`<Alert status="${outputStatus}" title="Alert Title">`)
		expect(result.code).toContain('{"Alert content with "}')
		expect(result.code).toContain('<_components.strong>{"formatting"}</_components.strong>')
	})

	it('leaves regular blockquotes unchanged', () => {
		const result = mdxToJs('> A regular blockquote.', {
			jsx: true,
			mdastPlugins: [satteriAlerts],
		})

		expect(result.code).toContain('<_components.blockquote>')
		expect(result.code).not.toContain('<Alert')
	})

	it('preserves accessible heading permalink markup', async () => {
		const result = await mdxToJs('## Example Heading', {
			jsx: true,
			hastPlugins: [() => satteriHeadingIdsPlugin(), satteriHeadingPermalinks],
		})

		expect(result.code).toContain('<_components.div className="markdown-heading">')
		expect(result.code).toContain('<_components.h2 id="example-heading" tabIndex="-1">')
		expect(result.code).toContain('href="#example-heading" aria-label="Permalink: Example Heading" className="anchor"')
		expect(result.code).toContain('className="anchor-icon" viewBox="0 0 16 16" aria-hidden="true"')
	})

	it('visually hides the introduction heading wrapper', async () => {
		const result = await mdxToJs('## Introduction', {
			jsx: true,
			hastPlugins: [() => satteriHeadingIdsPlugin(), satteriHeadingPermalinks],
		})

		expect(result.code).toContain('<_components.div className="markdown-heading visually-hidden">')
	})
})
