import type { FlickrParams, FlickrPhoto, TransformedFlickrPhoto } from '@constants/types'
import { FLICKR_API_KEY } from 'astro:env/server'

const BASE_URL = 'https://api.flickr.com/services/rest/'
const USER_ID = '192975453@N04'
const EXTRAS = 'description,url_z,url_c,url_l,original_format,date_taken'

type Method = 'photosets.getPhotos' | 'photosets.getList'

interface fetchFlickrOptions {
	method: Method
	query: FlickrParams
}

export async function fetchFlickr<T>({
	method,
	query,
}: fetchFlickrOptions): Promise<T> {
	const url = new URL(BASE_URL)

	url.searchParams.append('method', `flickr.${method}`)
	url.searchParams.append('api_key', FLICKR_API_KEY)
	url.searchParams.append('user_id', USER_ID)
	url.searchParams.append('extras', EXTRAS)
	url.searchParams.append('format', 'json')
	url.searchParams.append('nojsoncallback', '1')

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			if (value) {
				url.searchParams.append(key, value)
			}
		})
	}

	const res = await fetch(url.toString(), { headers: {
		'user-agent': 'LekoArts/portfolio-v3',
	} })
	const data = await res.json()

	return data as T
}

const SIZES = {
	z: 'sm',
	c: 'md',
	l: 'lg',
} as const

function transformImageUrls(photo: FlickrPhoto) {
	const output = {
		images: {},
	} as Pick<TransformedFlickrPhoto, 'images'>

	Object.entries(SIZES).forEach(([_letter, name]) => {
		const letter = _letter as keyof typeof SIZES
		const height = photo[`height_${letter}`]
		const width = photo[`width_${letter}`]

		output.images[name] = {
			url: photo[`url_${letter}`],
			height,
			width,
			orientation: width === height ? 'square' : width > height ? 'landscape' : 'portrait',
		}
	})

	return output
}

export function transformFlickrPhoto(photo: FlickrPhoto, extras?: { photoset_title: string }): TransformedFlickrPhoto {
	return {
		id: photo.id,
		title: photo.title,
		description: photo.description._content,
		date_taken: new Date(photo.datetaken),
		...transformImageUrls(photo),
		...extras,
	}
}
