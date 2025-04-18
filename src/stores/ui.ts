import { persistentMap } from '@nanostores/persistent'

export type LayoutType = 'masonry' | 'grid'

export interface UIStore {
	photosLayout: LayoutType
}

export const $ui = persistentMap<UIStore>('lekoarts-ui:', {
	photosLayout: 'masonry',
}, {
	encode: JSON.stringify,
	decode: JSON.parse,
})
