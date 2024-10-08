import Alert from '@components/mdx/alert.astro'
import Collapsible from '@components/mdx/collapsible.astro'
import Playground from '@components/mdx/playground.astro'
import Video from '@components/mdx/video.astro'
import YouTube from '@components/mdx/youtube.astro'
import Link from '@components/mdx/link.astro'
import Code from '@components/mdx/code.astro'

export const components = {
	Alert,
	Collapsible,
	Playground,
	Video,
	YouTube,
	a: Link,
	pre: Code,
}
