/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
	test: {
		globals: true,
		include: ['src/**/__tests__/*.ts'],
		coverage: {
			reporter: [`text`, `json`, `html`],
		},
	},
})
