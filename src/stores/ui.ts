import { persistentMap } from '@nanostores/persistent'

export type LayoutType = 'masonry' | 'grid' | 'list'

export interface UIStore {
	photographyLayout: LayoutType
}

export const $ui = persistentMap<UIStore>('lekoarts-ui:', {
	photographyLayout: 'masonry',
}, {
	encode: JSON.stringify,
	decode: JSON.parse,
})
