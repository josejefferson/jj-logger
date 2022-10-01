import chalk from 'chalk'
import type { ILog, IOptions, Levels } from './types'

export const LEVELS: Levels[] = ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING']

/**
 * Returns True if the string represents a level
 */
export function isLevel(string: string): string is Levels {
	if (typeof string !== 'string') return false
	return LEVELS.some((level) => level === string.trim().toUpperCase())
}

/**
 * Returns True if the string represents a color
 */
export function isColor(string: string): string is typeof chalk.ForegroundColor {
	if (typeof string !== 'string') return false
	return string in chalk
}

/**
 * Insert the error details within details object
 */
export function parseErrors(log: ILog) {
	for (const [i, content] of Object.entries(log.contents)) {
		if (content instanceof Error) {
			log.details ??= {}
			if (typeof log.details !== 'object') continue
			log.details.errorInfo = {
				...content,
				name: content.name,
				message: content.message,
				stack: content.stack
			}
			log.contents[+i] = `${content.name}: ${content.message}`
			log.code ??= content.name
			break
		}
	}
}

export function validateOptions(options: IOptions) {
	if (typeof options === 'undefined') {
		return
	}

	if (typeof options !== 'object') {
		throw new Error('"options" is not an object')
	}

	if ('loadFn' in options && typeof options.loadFn !== 'function' && options.loadFn !== null) {
		throw new Error('"options.loadFn" is not a function')
	}

	if ('saveFn' in options && typeof options.saveFn !== 'function' && options.saveFn !== null) {
		throw new Error('"options.saveFn" is not a function')
	}

	if ('load' in options && typeof options.load !== 'boolean') {
		throw new Error('"options.load" is not a boolean')
	}

	if ('presets' in options && !Array.isArray(options.presets)) {
		throw new Error('"options.presets" is not an array')
	}

	for (const [i, preset] of Object.entries(options.presets)) {
		if (typeof preset[0] !== 'string') {
			throw new Error(`"options.presets[${i}][0]" is not a string`)
		}

		if (typeof preset[1] !== 'function') {
			throw new Error(`"options.presets[${i}][1]" is not a function`)
		}
	}

	if ('customPresets' in options && !Array.isArray(options.customPresets)) {
		throw new Error('"options.customPresets" is not an array')
	}

	for (const [i, preset] of Object.entries(options.customPresets)) {
		if (typeof preset[0] !== 'string') {
			throw new Error(`"options.customPresets[${i}][0]" is not a string`)
		}

		if (typeof preset[1] !== 'function') {
			throw new Error(`"options.customPresets[${i}][1]" is not a function`)
		}
	}
}
