import type { Topic } from '@constants/types'
import { map } from 'nanostores'

interface TagGroupStore {
	writing: Array<Topic>
	photos: Array<string>
}

export type TagGroupKeys = keyof TagGroupStore

const initialValue: TagGroupStore = {
	writing: [],
	photos: [],
}

export const $tagGroup = map(initialValue)

export function addTag(id: TagGroupKeys, tag: Topic) {
	$tagGroup.setKey(id, [...$tagGroup.get()[id], tag])
}

export function removeTag(id: TagGroupKeys, tag: Topic) {
	$tagGroup.setKey(id, $tagGroup.get()[id].filter(t => t !== tag))
}
