import type { CATEGORY_CHOICES, TAGS_CHOICES } from '@constants/content'
import type { DataEntryMap } from 'astro:content'

export type FlickrImageUrls = DataEntryMap['photos'][string]['data']['photos'][number]['imageUrls']

export type AlertStatus = 'note' | 'warning' | 'caution' | 'success'

export type SVGIconNames
	= | 'cli'
		| 'discord'
		| 'elitepvpers'
		| 'gatsby'
		| 'general'
		| 'javascript'
		| 'logo'
		| 'mdx'
		| 'python'
		| 'react'
		| 'typescript'
		| 'pause'
		| 'play'
		| 'close'
		| 'check'
		| 'info'
		| 'warning'
		| 'lightbulb'
		| 'star'
		| 'arrow-right'
		| 'share'
		| 'moon'
		| 'sun'
		| 'computer'
		| 'refresh'
		| 'export'
		| 'backward'
		| 'download'
		| 'rust'
		| 'grid'
		| 'list'
		| 'masonry'
		| 'astro'
		| 'unraid'

export interface CardProps {
	slug: string
	title: string
	subtitle?: string
	description: string
}

export type ArrayElement<ArrayType extends readonly unknown[] | undefined>
  = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Tag = typeof TAGS_CHOICES[number] | (string & {})
export type Category = (typeof CATEGORY_CHOICES)[number]

export interface BreadcrumbListItem {
	url: string
	name: string
}

/**
 * Parameters required or allowed with a Flickr API request.
 * @see https://www.flickr.com/services/api/flickr.photos.search.html
 */
export interface FlickrParams {
	[key: string]: string | undefined
	/** @see https://www.flickr.com/services/api/misc.api_keys.html */
	api_key?: string
	format?: 'json' | 'xml'
	nojsoncallback?: '0' | '1'
	method?: string
	/** Comma-delimited list of method-specific, extra fields to return */
	extras?: string
	tags?: string
	sort?: 'date-posted-asc' | 'date-posted-desc' | 'date-taken-asc' | 'date-taken-desc' | 'interestingness-desc' | 'interestingness-asc' | 'relevance'
	/**
	 * Numer of items to return per page of results. The maximum is 500.
	 */
	per_page?: string
	photo_id?: string
	user_id?: string
	photoset_id?: string
}

type FlickrStatus = 'ok' | 'fail'

interface FlickrPaginationInfo {
	page: number
	pages: number
	perpage: number
	per_page: number
	total: number
}

export interface FlickrPhoto {
	id: string
	secret: string
	server: string
	farm: number
	title: string
	isprimary: string
	ispublic: number
	isfriend: number
	isfamily: number
	description: {
		_content: string
	}
	datetaken: string
	datetakengranularity: string
	datetakenunknown: string
	url_z: string
	height_z: number
	width_z: number
	url_c: string
	height_c: number
	width_c: number
	url_l: string
	height_l: number
	width_l: number
}

interface FlickrImage {
	url: string
	height: number
	width: number
	orientation: 'landscape' | 'portrait' | 'square'
}

export interface TransformedFlickrPhoto {
	id: string
	title: string
	description: string
	date_taken: Date
	images: {
		sm: FlickrImage
		md: FlickrImage
		lg: FlickrImage
	}
	photoset_title?: string
}

interface FlickrPhotoset extends FlickrPaginationInfo {
	id: string
	primary: string
	title: string
	owner: string
	ownername: string
	photo: Array<FlickrPhoto>
}

interface FlickrPhotosets extends FlickrPaginationInfo {
	photoset: Array<{
		id: string
		owner: string
		username: string
		primary: string
		title: {
			_content: string
		}
		description: {
			_content: string
		}
		date_create: string
		date_update: string
	}>
}

export interface FlickrPhotosetsGetPhotosResponse {
	photoset: FlickrPhotoset
	stat: FlickrStatus
}

export interface FlickrPhotosetsGetListResponse {
	photosets: FlickrPhotosets
	stat: FlickrStatus
}
