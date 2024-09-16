import { listenKeys } from 'nanostores'
import { $tagGroup, type TagGroupKeys } from '@stores/tag-group'
import { queryStringTags } from '@utils/url'
import type { Tag } from '@constants/types'

interface InitializeTagGroupProps {
	itemSelector?: string
	id: TagGroupKeys
}

export function initializeTagGroup({ itemSelector = '.tag-group-item', id }: InitializeTagGroupProps) {
	// Parse query params when loading the page
	const parsed = queryStringTags.from(window.location.search)
	const items = document.querySelectorAll<HTMLLinkElement>(itemSelector)

	// If tags in the query params (?tags=MDX,Astro) are present, set them in the store and filter the items
	if (parsed?.tags && parsed.tags.length > 0) {
		$tagGroup.setKey(id, parsed.tags as Array<Tag>)

		items.forEach((item) => {
			const tags = item.dataset.tags?.split(',') || []
			const isActive = tags.some(tag => parsed.tags?.includes(tag))

			if (isActive) {
				item.classList.remove('hidden')
			}
			else {
				item.classList.add('hidden')
			}
		})
	}

	// When $tagGroup changes, update the list by only showing items with the selectedTags
	listenKeys($tagGroup, [id], ({ [id]: selectedTags }) => {
		// If no tags are selected, show all items
		if (selectedTags.length === 0) {
			items.forEach(item => item.classList.remove('hidden'))
			window.history.pushState({}, '', `${window.location.pathname}`)
			return
		}

		const queryString = queryStringTags.to({ tags: selectedTags })
		window.history.pushState(
			{},
			'',
			`${window.location.pathname}?${queryString}`,
		)

		items.forEach((item) => {
			const tags = item.dataset.tags?.split(',') || []
			const isActive = tags.some(tag => selectedTags.includes(tag))

			if (isActive) {
				item.classList.remove('hidden')
			}
			else {
				item.classList.add('hidden')
			}
		})
	})
}
