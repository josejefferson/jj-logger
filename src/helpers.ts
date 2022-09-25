import chalk from 'chalk'
import type { ILog, Levels } from './types'

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
export function isColor(
	string: string
): string is typeof chalk.ForegroundColor {
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
