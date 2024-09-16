import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

const space = {
	none: 0,
	small: '4px',
	medium: '8px',
	large: '16px',
}

const responsiveProperties = defineProperties({
	conditions: {
		mobile: {},
		tablet: { '@media': 'screen and (min-width: 768px)' },
	},
	defaultCondition: 'mobile',
	properties: {
		display: ['none', 'flex', 'block', 'inline-block'],
		paddingTop: space,
		paddingBottom: space,
		paddingLeft: space,
		paddingRight: space,
	},
	shorthands: {
		padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
	},
})

export const sprinkles = createSprinkles(responsiveProperties)
