const GITHUB_REPO_BASE = 'https://github.com/LekoArts/portfolio-v3/edit/main'

export const getWritingEditLink = (filePath: string) => `${GITHUB_REPO_BASE}/${filePath}`

export function getBlueskyShareLink(link: string, message: string) {
	return `https://bsky.app/intent/compose?text=${encodeURIComponent(`${message} by @lekoarts.de\n\n${link}`)}`
}

export function getMastodonShareLink(link: string, message: string) {
	return `https://elk.zone/intent/post?text=${encodeURIComponent(`${message} by @lekoarts@mastodon.social\n\n${link}`)}`
}
