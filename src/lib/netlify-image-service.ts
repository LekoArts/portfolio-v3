import type { ExternalImageService, ImageMetadata } from 'astro'
import type { ImageCdn, ProviderOptions } from 'unpic'
import { env } from 'node:process'
import { getSrcSetEntries, inferImageDimensions, transformProps } from '@unpic/core'
import { transformUrl } from 'unpic'

export interface NetlifyImageServiceConfig {
	fallbackService?: ImageCdn
}

interface ImageConfig {
	endpoint?: string | {
		route?: string
	}
	service: {
		config: NetlifyImageServiceConfig
	}
}

interface ImageOptions {
	[key: string]: unknown
	src: ImageMetadata | string
	width?: number
	widths?: number[]
	densities?: (number | `${number}x`)[]
	height?: number
	format?: string
	quality?: number | string
	fit?: string
	position?: string
	layout?: 'constrained' | 'fixed' | 'full-width' | 'none'
}

interface TransformOptions {
	aspectRatio?: number
	fit?: string
	format?: string
	height?: number
	layout?: 'constrained' | 'fixed' | 'full-width' | 'none'
	provider: ImageCdn
	quality?: number | string
	url: string
	width?: number
}

export function getDefaultImageProvider(
	environment: NodeJS.ProcessEnv = env,
	hasNetlifyGlobal = 'Netlify' in globalThis,
): ImageCdn {
	if (environment.IS_PLAYWRIGHT)
		return 'astro'

	if (environment.NETLIFY || environment.NETLIFY_LOCAL || hasNetlifyGlobal)
		return 'netlify'

	return 'astro'
}

function getProvider(config: NetlifyImageServiceConfig): ImageCdn {
	return config.fallbackService ?? getDefaultImageProvider()
}

function getProviderOptions(imageConfig: ImageConfig): Partial<ProviderOptions> {
	const endpoint = typeof imageConfig.endpoint === 'object'
		? imageConfig.endpoint.route
		: imageConfig.endpoint

	return {
		astro: {
			endpoint,
		},
	}
}

export function getTransformOptions(options: ImageOptions, config: NetlifyImageServiceConfig): TransformOptions {
	const { widths: _widths, densities: _densities, ...transform } = options
	const dimensions: { width?: number, height?: number } = typeof options.src === 'string'
		? {}
		: inferImageDimensions(options, options.src)
	const width = dimensions.width ?? options.width
	const height = dimensions.height ?? options.height

	return {
		provider: getProvider(config),
		...transform,
		...dimensions,
		aspectRatio: width && height ? width / height : undefined,
		url: typeof options.src === 'string' ? options.src : options.src.src,
	}
}

const service: ExternalImageService<NetlifyImageServiceConfig> = {
	getSrcSet(options, imageConfig) {
		const transformOptions = getTransformOptions(options, imageConfig.service.config)
		const entries = getSrcSetEntries({
			aspectRatio: transformOptions.aspectRatio,
			breakpoints: options.widths ? [...options.widths] : undefined,
			format: transformOptions.format,
			height: transformOptions.height,
			layout: transformOptions.layout === 'full-width' ? 'fullWidth' : transformOptions.layout === 'none' ? undefined : transformOptions.layout,
			src: transformOptions.url,
			width: transformOptions.width,
		})

		return entries.map(({ width, height }) => ({
			transform: {
				...options,
				width: Number(width),
				height: height === undefined ? undefined : Number(height),
			},
			descriptor: `${width}w`,
		}))
	},
	validateOptions(options) {
		if (options.densities)
			console.warn('The densities option is not supported by the Netlify image service')

		return options
	},
	getURL(options, imageConfig) {
		const transformOptions = getTransformOptions(options, imageConfig.service.config)

		if (transformOptions.provider === 'astro')
			return transformOptions.url

		return transformUrl(transformOptions, {}, getProviderOptions(imageConfig))?.toString() ?? transformOptions.url
	},
	getHTMLAttributes(options, imageConfig) {
		const transformOptions = getTransformOptions(options, imageConfig.service.config)
		const layout = transformOptions.layout === 'full-width' ? 'fullWidth' : transformOptions.layout
		const objectFit = (() => {
			switch (transformOptions.fit) {
				case 'contain':
				case 'cover':
				case 'fill':
				case 'inherit':
				case 'initial':
				case 'none':
				case 'scale-down':
					return transformOptions.fit
				default:
					return undefined
			}
		})()
		const attributes = {
			alt: typeof options.alt === 'string' ? options.alt : undefined,
			cdn: transformOptions.provider,
			decoding: options.decoding === 'sync' || options.decoding === 'async' || options.decoding === 'auto'
				? options.decoding
				: undefined,
			fetchpriority: options.fetchpriority === 'high' || options.fetchpriority === 'low' || options.fetchpriority === 'auto'
				? options.fetchpriority
				: undefined,
			loading: options.loading === 'eager' || options.loading === 'lazy' ? options.loading : undefined,
			objectFit,
			role: typeof options.role === 'string' ? options.role : undefined,
			sizes: typeof options.sizes === 'string' ? options.sizes : undefined,
			src: transformOptions.url,
		}
		const props = layout === 'fullWidth'
			? transformProps({
					...attributes,
					aspectRatio: transformOptions.aspectRatio,
					height: transformOptions.height,
					layout,
				})
			: transformProps({
					...attributes,
					height: transformOptions.height!,
					layout: layout === 'fixed' ? 'fixed' : 'constrained',
					width: transformOptions.width!,
				})

		if (props.fetchpriority === 'auto')
			delete props.fetchpriority

		const {
			height: _height,
			src: _src,
			srcset: _srcset,
			width: _width,
			...htmlAttributes
		} = props
		const className = typeof options.class === 'string' ? options.class : undefined

		return {
			...htmlAttributes,
			...(className ? { class: className } : {}),
			'data-astro-image': options['data-astro-image'],
		}
	},
}

export default service
