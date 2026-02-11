import Alert from '@components/mdx/alert.astro'
import Collapsible from '@components/mdx/collapsible.astro'
import Link from '@components/mdx/link.astro'
import Playground from '@components/mdx/playground.astro'
import Video from '@components/mdx/video.astro'
import YouTube from '@components/mdx/youtube.astro'
import FileExplorer from './file-explorer.astro'

export const components = {
	Alert,
	Collapsible,
	Playground,
	FileExplorer,
	Video,
	YouTube,
	a: Link,
}
