import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './playwright',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? `github` : `list`,
	use: {
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'portfolio-v3',
			use: { ...devices['Desktop Chrome'] },
		},
	],
	webServer: {
		command: process.env.IS_BUILD ? `pnpm run preview` : `pnpm run dev`,
		port: 4321,
		reuseExistingServer: !process.env.CI,
	},
})
