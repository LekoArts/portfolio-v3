import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths(), vanillaExtractPlugin()],
	test: {
		globals: true,
		include: ['src/**/__tests__/!(*.css).ts'],
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},
})
