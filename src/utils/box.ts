export interface AtomsFnBase {
	(...args: any): string
	properties: Set<string>
}

export function extractAtomsFromProps<AtomsFn extends AtomsFnBase>(props: any, atomsFn: AtomsFn) {
	let hasAtomProps = false
	const atomProps: Record<string, unknown> = {}
	const otherProps: Record<string, unknown> = {}
	const customProps: Record<string, unknown> = {}

	for (const key in props) {
		if (key[0] === `_` && key[1] === `_`) {
			const actualKey = key.substring(2)
			customProps[actualKey] = props[key]
		}
		else if (atomsFn.properties.has(key)) {
			hasAtomProps = true
			atomProps[key] = props[key]
		}
		else {
			otherProps[key] = props[key]
		}
	}

	return { hasAtomProps, atomProps, otherProps, customProps }
}

export type OverrideTokens<T> = {
	[K in keyof T as K extends string ? `__${K}` : number]: any | Record<string, unknown>
}
