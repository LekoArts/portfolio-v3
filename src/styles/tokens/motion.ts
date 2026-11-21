export const transition = {
	property: {
		all: 'all',
		common: 'background-color, border-color, border, color, fill, stroke, opacity, box-shadow, transform',
		colors: 'background-color, border-color, border, color, fill, stroke',
		dimensions: 'width, height',
		position: 'left, right, top, bottom',
		background: 'background-color, background-image, background-position',
	},
	easing: {
		'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
		'ease-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
		'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	duration: {
		'ultra-fast': '50ms',
		'faster': '100ms',
		'fast': '150ms',
		'normal': '200ms',
		'slow': '300ms',
		'slower': '400ms',
		'ultra-slow': '500ms',
	},
	media: {
		/**
		 * Devices with a precise pointer that can hover. Touch devices otherwise keep hover styles "stuck" after a tap.
		 */
		'hover': '(hover: hover) and (pointer: fine)',
		/**
		 * Same as `hover`, but also requires that the visitor hasn't asked for reduced motion. Use for hover transforms.
		 */
		'hover-motion': '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
	},
}
