import { extractAtomsFromProps } from '../box'
import { sprinkles } from './box.css'

describe('extractAtomsFromProps', () => {
	it('should support atom props', () => {
		expect(extractAtomsFromProps({ padding: 'small' }, sprinkles)).toEqual({
			hasAtomProps: true,
			atomProps: { padding: 'small' },
			otherProps: {},
			customProps: {},
		})
	})
	it('should support other props', () => {
		expect(extractAtomsFromProps({ textDecoration: 'underline' }, sprinkles)).toEqual({
			hasAtomProps: false,
			atomProps: {},
			otherProps: { textDecoration: 'underline' },
			customProps: {},
		})
	})
	it('should support custom props', () => {
		expect(extractAtomsFromProps({ __custom: 'value' }, sprinkles)).toEqual({
			hasAtomProps: false,
			atomProps: {},
			otherProps: {},
			customProps: { custom: 'value' },
		})
	})
	it('should support multiple props', () => {
		expect(extractAtomsFromProps({ padding: 'small', textDecoration: 'underline', __custom: 'value' }, sprinkles)).toEqual({
			hasAtomProps: true,
			atomProps: { padding: 'small' },
			otherProps: { textDecoration: 'underline' },
			customProps: { custom: 'value' },
		})
	})
})
