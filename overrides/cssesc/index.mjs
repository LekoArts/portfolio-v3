/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/*! https://mths.be/cssesc v3.0.0 by @mathias */
'use strict'

const object = {}
const hasOwnProperty = object.hasOwnProperty
const merge = function merge(options, defaults) {
	if (!options) {
		return defaults
	}
	const result = {}
	for (const key in defaults) {
		// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
		// only recognized option names are used.
		result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key]
	}
	return result
}

const regexAnySingleEscape = /[ -,./:-@[-^`{-~]/
const regexSingleEscape = /[ -,./:-@[\]^`{-~]/
const regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g

// https://mathiasbynens.be/notes/css-escapes#css
const cssesc = function cssesc(string, options) {
	options = merge(options, cssesc.options)
	if (options.quotes !== 'single' && options.quotes !== 'double') {
		options.quotes = 'single'
	}
	const quote = options.quotes === 'double' ? '"' : '\''
	const isIdentifier = options.isIdentifier

	const firstChar = string.charAt(0)
	let output = ''
	let counter = 0
	const length = string.length
	while (counter < length) {
		const character = string.charAt(counter++)
		let codePoint = character.charCodeAt()
		let value = void 0
		// If it’s not a printable ASCII character…
		if (codePoint < 0x20 || codePoint > 0x7E) {
			if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
				// It’s a high surrogate, and there is a next character.
				const extra = string.charCodeAt(counter++)
				if ((extra & 0xFC00) === 0xDC00) {
					// next character is low surrogate
					codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000
				}
				else {
					// It’s an unmatched surrogate; only append this code unit, in case
					// the next code unit is the high surrogate of a surrogate pair.
					counter--
				}
			}
			value = `\\${codePoint.toString(16).toUpperCase()} `
		}
		else {
			if (options.escapeEverything) {
				if (regexAnySingleEscape.test(character)) {
					value = `\\${character}`
				}
				else {
					value = `\\${codePoint.toString(16).toUpperCase()} `
				}
			}
			else if (/[\t\n\f\r\v]/.test(character)) {
				value = `\\${codePoint.toString(16).toUpperCase()} `
			}
			else if (character === '\\' || !isIdentifier && (character === '"' && quote === character || character === '\'' && quote === character) || isIdentifier && regexSingleEscape.test(character)) {
				value = `\\${character}`
			}
			else {
				value = character
			}
		}
		output += value
	}

	if (isIdentifier) {
		if (/^-[-\d]/.test(output)) {
			output = `\\-${output.slice(1)}`
		}
		else if (/\d/.test(firstChar)) {
			output = `\\3${firstChar} ${output.slice(1)}`
		}
	}

	// Remove spaces after `\HEX` escapes that are not followed by a hex digit,
	// since they’re redundant. Note that this is only possible if the escape
	// sequence isn’t preceded by an odd number of backslashes.
	output = output.replace(regexExcessiveSpaces, ($0, $1, $2) => {
		if ($1 && $1.length % 2) {
			// It’s not safe to remove the space, so don’t.
			return $0
		}
		// Strip the space.
		return ($1 || '') + $2
	})

	if (!isIdentifier && options.wrap) {
		return quote + output + quote
	}
	return output
}

// Expose default options (so they can be overridden globally).
cssesc.options = {
	escapeEverything: false,
	isIdentifier: false,
	quotes: 'single',
	wrap: false,
}

cssesc.version = '3.0.0'

export default cssesc
