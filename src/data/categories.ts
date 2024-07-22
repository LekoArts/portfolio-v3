interface Category {
	name: string
	description: string
	gradient: string
	image: string
}

export const CATEGORIES: Array<Category> = [
	{
		name: 'Community',
		description: 'Building an engaging & inclusive community is hard and takes work. From the perspective of an open source maintainer I want to help you achieve this goal.',
		gradient: 'linear-gradient(to top, #459077, #1c382e)',
		image: './category-images/community.png',
	},
	{
		name: 'Design',
		description: 'One of my hobbies is creating digital art & designs with various tools. This space got so much more accessible to more folks over the last couple of years and I hope to also spark some interest!',
		gradient: 'linear-gradient(to top, #4f46e5, #312e81)',
		image: './category-images/design.png',
	},
	{
		name: 'JavaScript',
		description: 'At this point one can build nearly everything with JavaScript. I write about different frameworks, supersets & experiments here, including TypeScript.',
		gradient: 'linear-gradient(to top, #eab308, #7f591c)',
		image: './category-images/javascript.png',
	},
	{
		name: 'React',
		description: 'React is a JavaScript library for building user interfaces. I write about the ecosystem and its tools, about code patterns, and React in general.',
		gradient: 'linear-gradient(to top, #22d3ee, #164e63)',
		image: './category-images/react.png',
	},
]
