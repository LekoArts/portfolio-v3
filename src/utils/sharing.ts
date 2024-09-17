const GITHUB_REPO_BASE = 'https://github.com/LekoArts/portfolio-v3/edit/main'

export const getGardenEditLink = (relativePath: string) => `${GITHUB_REPO_BASE}/src/content/garden/${relativePath}`

export const getWritingEditLink = (relativePath: string) => `${GITHUB_REPO_BASE}/src/content/writing/${relativePath}`

export function getTwitterShareLink(link: string, message: string) {
	return `https://twitter.com/intent/tweet/?text=${encodeURIComponent(message)}&via=lekoarts_de&url=${encodeURIComponent(
		link,
	)}`
}

export function getMastodonShareLink(link: string, message: string) {
	return `https://elk.zone/intent/post?text=${encodeURIComponent(`${message} by @lekoarts@mastodon.social \n\n${link}`)}`
}
