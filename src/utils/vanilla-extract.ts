import { mergeWith } from 'lodash-es'
import type { CSSProperties } from '@vanilla-extract/css'
import type { CSSVarFunction } from '@vanilla-extract/private'
import type { Properties } from 'csstype'
import { COLOR_SCHEMES } from '@constants/themes'

const isObject = (value: unknown) => !!(value && typeof value === 'object' && !Array.isArray(value))

const isString = (value: unknown) => typeof value === 'string'

type CSSTypeProperties = Properties<number | (string & Record<string, unknown>)>

type CSSPropertiesWithModes<Modes extends string> = {
	[Property in keyof CSSTypeProperties]:
		| CSSTypeProperties[Property]
		| CSSVarFunction
		| Array<CSSVarFunction | CSSTypeProperties[Property]>
		| Record<Modes, CSSTypeProperties[Property] | CSSVarFunction | Array<CSSVarFunction | CSSTypeProperties[Property]>>
}

type CSSPropertiesWithVars = CSSProperties & {
	vars?: {
		[key: string]: string
	}
}

export interface SelectorMap<Modes extends string = (typeof COLOR_SCHEMES)[number]> {
	[selector: string]: CSSProperties | CSSPropertiesWithModes<Modes>
}

interface IThemeAwareStylesProps {
	selectorMap: SelectorMap
	defaultTheme: (typeof COLOR_SCHEMES)[number]
	alternateThemeClass: string
	rootClass?: string
}

export function themeAwareStyles({
	selectorMap,
	defaultTheme,
	alternateThemeClass,
	rootClass = '',
}: IThemeAwareStylesProps) {
	const selectors: Record<string, CSSPropertiesWithVars> = {}
	const r = rootClass ? `${rootClass} ` : ''
	const alternate = defaultTheme === 'light' ? COLOR_SCHEMES[1] : COLOR_SCHEMES[0]

	Object.entries(selectorMap).forEach(([selector, selectorStyle]) => {
		Object.entries(selectorStyle).forEach(([property, cssOrObject]) => {
			if (isObject(cssOrObject)) {
				selectors[`${r}${selector}`] = {
					...selectors[`${r}${selector}`],
					// @ts-expect-error - TODO: Fix this
					[property]: cssOrObject[defaultTheme],
				}
				selectors[`html.${alternateThemeClass} ${r}${selector}`] = {
					...selectors[`html.${alternateThemeClass} ${r}${selector}`],
					// @ts-expect-error - TODO: Fix this
					[property]: cssOrObject[alternate],
				}
			}
			else if (isString(cssOrObject)) {
				selectors[`${r}${selector}`] = {
					...selectors[`${r}${selector}`],
					[property]: cssOrObject,
				}
			}
		})
	})

	return selectors
}

function removeEmpty(obj: Record<string, string | null>) {
	// @ts-expect-error - TODO: Fix this
	return Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})
}

function customizer(objValue: Array<Record<string, string>> | undefined, srcValue: Record<string, string | null>) {
	const srcKeys = Object.keys(srcValue)
	const srcKeysLength = srcKeys.length

	// If srcValue only has one key and it's 'null', return 'null'
	// This way the resulting array will be [{ key: 'value' }, null, { key: 'value' }]
	if (srcKeysLength === 1 && srcValue[srcKeys[0]] === null) {
		// @ts-expect-error - TODO: Fix this
		return (objValue || []).concat(null)
	}

	// removeEmpty will remove all keys with 'null' values
	return (objValue || []).concat(removeEmpty(srcValue))
}

export function responsiveStyles(responsiveVariantArray: Array<Record<string, Record<string, string>>>) {
	const styles: Record<string, Array<Record<string, string> | null>> = {}
	mergeWith(styles, ...responsiveVariantArray, customizer)
	return styles
}
