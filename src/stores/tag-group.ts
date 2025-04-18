import type { Tag } from '@constants/types'
import { map } from 'nanostores'

interface TagGroupStore {
	garden: Array<Tag>
	photos: Array<string>
}

export type TagGroupKeys = keyof TagGroupStore

const initialValue: TagGroupStore = {
	garden: [],
	photos: [],
}

export const $tagGroup = map(initialValue)

export function addTag(id: TagGroupKeys, tag: Tag) {
	$tagGroup.setKey(id, [...$tagGroup.get()[id], tag])
}

export function removeTag(id: TagGroupKeys, tag: Tag) {
	$tagGroup.setKey(id, $tagGroup.get()[id].filter(t => t !== tag))
}
