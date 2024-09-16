import { GITHUB_TOKEN } from 'astro:env/server'

export async function fetchGithub<T>(body: string): Promise<T> {
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${GITHUB_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body,
	})

	return await res.json()
}
