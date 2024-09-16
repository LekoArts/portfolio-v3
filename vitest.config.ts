/// <reference types="vitest" />

import { type ViteUserConfig, getViteConfig } from 'astro/config'

export default getViteConfig({
	test: {
		globals: true,
		include: ['src/**/__tests__/!(*.css).ts'],
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},
} as ViteUserConfig)
