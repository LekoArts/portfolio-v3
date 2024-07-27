/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
	plausible: (name: string, options?: { callback?: () => void, props?: { [key: string]: string } }) => void
}

declare namespace astroHTML.JSX {
	interface HTMLAttributes {
		value?: string
	}
}
