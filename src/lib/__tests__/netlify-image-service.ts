import type { ImageMetadata } from 'astro'
import imageService, { getDefaultImageProvider, getTransformOptions } from '../netlify-image-service'

const importedImage: ImageMetadata = {
	src: '/_astro/photo.hash.jpg',
	width: 1600,
	height: 900,
	format: 'jpg',
}

const netlifyImageConfig = {
	endpoint: {
		route: '/_image',
	},
	service: {
		config: {
			fallbackService: 'netlify',
		},
	},
}

const astroImageConfig = {
	...netlifyImageConfig,
	service: {
		config: {
			fallbackService: 'astro',
		},
	},
}

async function getURL(options: Record<string, unknown>, imageConfig = netlifyImageConfig): Promise<string> {
	return imageService.getURL!(options as never, imageConfig as never, undefined as never)
}

describe('netlify image service', () => {
	it('infers imported image dimensions from the requested width', () => {
		const options = getTransformOptions({
			src: importedImage,
			width: 720,
		}, { fallbackService: 'netlify' })

		expect(options).toMatchObject({
			url: importedImage.src,
			width: 720,
			height: 405,
			aspectRatio: 16 / 9,
			provider: 'netlify',
		})
	})

	it('generates configured width descriptors with proportional heights', async () => {
		const srcSet = await imageService.getSrcSet!({
			src: importedImage,
			width: 720,
			height: 405,
			layout: 'constrained',
			widths: [720, 960, 1280, 1440, 2000],
		} as never, netlifyImageConfig as never, undefined as never)

		expect(srcSet).toEqual([
			{ transform: expect.objectContaining({ width: 720, height: 405 }), descriptor: '720w' },
			{ transform: expect.objectContaining({ width: 960, height: 540 }), descriptor: '960w' },
			{ transform: expect.objectContaining({ width: 1280, height: 720 }), descriptor: '1280w' },
			{ transform: expect.objectContaining({ width: 1440, height: 810 }), descriptor: '1440w' },
			{ transform: expect.objectContaining({ width: 2000, height: 1125 }), descriptor: '2000w' },
		])
	})

	it('constructs Netlify image URLs', async () => {
		const url = new URL(await getURL({
			src: importedImage,
			width: 720,
			height: 405,
			fit: 'cover',
		}), 'https://example.com')

		expect(url.pathname).toBe('/.netlify/images')
		expect(Object.fromEntries(url.searchParams)).toEqual({
			w: '720',
			h: '405',
			fit: 'cover',
			url: importedImage.src,
		})
	})

	it('selects Netlify only for Netlify builds and uses local assets for Playwright', async () => {
		expect(getDefaultImageProvider({}, false)).toBe('astro')
		expect(getDefaultImageProvider({ NETLIFY: 'true' }, false)).toBe('netlify')
		expect(getDefaultImageProvider({ NETLIFY_LOCAL: 'true' }, false)).toBe('netlify')
		expect(getDefaultImageProvider({}, true)).toBe('netlify')
		expect(getDefaultImageProvider({ IS_PLAYWRIGHT: 'true', NETLIFY: 'true' }, true)).toBe('astro')
		expect(await getURL({ src: importedImage, width: 720, height: 405 }, astroImageConfig)).toBe(importedImage.src)
	})

	it('returns responsive HTML attributes without overriding Astro URLs', async () => {
		const options: Record<string, unknown> = {
			alt: '',
			decoding: 'async',
			fetchpriority: 'auto',
			fit: 'cover',
			height: 405,
			layout: 'constrained',
			loading: 'lazy',
			sizes: '(min-width: 720px) 720px, 100vw',
			src: importedImage,
			width: 720,
		}
		options['data-astro-image'] = 'constrained'

		const attributes = await imageService.getHTMLAttributes!(options as never, netlifyImageConfig as never, undefined as never)

		expect(attributes).toMatchObject({
			alt: '',
			decoding: 'async',
			loading: 'lazy',
			role: 'presentation',
			sizes: '(min-width: 720px) 720px, 100vw',
			style: {
				'object-fit': 'cover',
				'max-width': '720px',
				'max-height': '405px',
				'aspect-ratio': '1.7777777777777777',
				'width': '100%',
			},
		})
		expect(attributes).toHaveProperty('data-astro-image', 'constrained')
		expect(attributes).not.toHaveProperty('src')
		expect(attributes).not.toHaveProperty('srcset')
	})
})
