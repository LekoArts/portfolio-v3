export const shadows = {
	'xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
	'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
	'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
	'outline': '0 0 0 3px rgba(66, 153, 225, 0.6)',
	'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
	'none': 'none',
	'card': {
		default: '0 0 0 1px rgb(33 33 38/0.095), 0 1px 5px -4px rgba(19,19,22,0.8), 0 4px 8px rgba(32,42,54,0.08)',
		defaultHover: '0 0 0 1px rgb(33 33 38/0.075), 0 1px 7px -4px rgba(19,19,22,0.8), 0 4px 11px rgba(32,42,54,0.05)',
		defaultHoverDark: '0 0 0 1px rgb(87 87 113/0.5), 0 1px 7px -4px rgba(21, 93, 252, 0.5), 0 4px 11px rgba(57,67,79,0.1)',
		titleOnlyDark: '0 0 0 1px rgb(93 93 145/0.5), 0 1px 7px -4px rgba(0, 17, 55, 0.5), 0 4px 11px rgba(0,0,0,0.1)',
		ghost: 'none',
		ghostDark: '0 0 0 1px rgb(87 87 113/0.03), 0 1px 7px -4px rgba(21, 93, 252, 0.2), 0 4px 11px rgba(57,67,79,0.1)',
	},
}

export type Shadows = keyof typeof shadows
