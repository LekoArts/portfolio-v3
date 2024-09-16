import { map } from 'nanostores'
import type { Tag } from '@constants/types'

interface TagGroupStore {
	garden: Array<Tag>
	photography: Array<string>
}

export type TagGroupKeys = keyof TagGroupStore

const initialValue: TagGroupStore = {
	garden: [],
	photography: [],
}

export const $tagGroup = map(initialValue)

export function addTag(id: TagGroupKeys, tag: Tag) {
	$tagGroup.setKey(id, [...$tagGroup.get()[id], tag])
}

export function removeTag(id: TagGroupKeys, tag: Tag) {
	$tagGroup.setKey(id, $tagGroup.get()[id].filter(t => t !== tag))
}
