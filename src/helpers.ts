import chalk from 'chalk'
import type { Levels, ILog } from './types'

export const LEVELS: Levels[] = ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING']

/**
 * Retorna true se a string representa um nível
 */
export function isLevel(string: string): string is Levels {
	if (typeof string !== 'string') return false
	return string.trim().toUpperCase() in LEVELS
}

/**
 * Retorna true se a string representa uma cor
 */
export function isColor(
	string: string
): string is typeof chalk.ForegroundColor {
	if (typeof string !== 'string') return false
	return string in chalk
}

/**
 * Insere os detalhes do erro dentro do objeto dele
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
