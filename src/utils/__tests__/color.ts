import { getColor, transparentize, transparentizeDict } from '../color'

const colorPalette = {
	black: '#000',
	purple: {
		400: '#c084fc',
		500: 'oklch(0.627 0.265 303.9)',
	},
}

describe('getColor', () => {
	it('should get color from root', () => {
		expect(getColor(colorPalette, 'black')).toBe('#000')
	})
	it('should get nested color property', () => {
		expect(getColor(colorPalette, 'purple.400')).toBe('#c084fc')
	})
	it('should support OKLCH colors', () => {
		expect(getColor(colorPalette, 'purple.500')).toBe('oklch(0.627 0.265 303.9)')
	})
	it('should return fallback color when color is not found', () => {
		expect(getColor(colorPalette, 'purple.600', '#c084fc')).toBe('#c084fc')
	})
})

describe('transparentizeDict', () => {
	it('should get same color at root with full opacity', () => {
		expect(transparentizeDict('black', 1)(colorPalette)).toBe('oklch(0 0 none)')
	})
	it('should use rgba string with transparency', () => {
		expect(transparentizeDict('black', 0.5)(colorPalette)).toBe('oklch(0 0 none / 0.5)')
	})
	it('should get nested color property', () => {
		expect(transparentizeDict('purple.400', 0.5)(colorPalette)).toBe('oklch(0.7216853850869135 0.1766883997516293 305.5037586794067 / 0.5)')
	})
	it('should support OKLCH colors', () => {
		expect(transparentizeDict('purple.500', 0.5)(colorPalette)).toBe('oklch(0.627 0.265 303.9 / 0.5)')
	})
})

describe('transparentize', () => {
	it('should get same color with full opacity', () => {
		expect(transparentize('#000', 1)).toBe('oklch(0 0 none)')
	})
	it('should use rgba string with transparency', () => {
		expect(transparentize('#000', 0.5)).toBe('oklch(0 0 none / 0.5)')
	})
	it('should support hex colors', () => {
		expect(transparentize('#90a963', 0.5)).toBe('oklch(0.6989046526038842 0.09908254305424133 124.93454018901396 / 0.5)')
	})
	it('should support OKLCH colors', () => {
		expect(transparentize('oklch(100% 0 0)', 0.5)).toBe('oklch(1 0 0 / 0.5)')
	})
})
