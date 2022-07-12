const chalk = require('chalk')

const LEVELS = [
	'SUCCESS',
	'ERROR',
	'DEBUG',
	'INFO',
	'WARNING'
]

/**
 * Retorna true se a string representa um nível
 */
function isLevel(string) {
	if (typeof string !== 'string') return false
	return LEVELS.includes(string.trim().toUpperCase())
}

/**
 * Retorna true se a string representa uma cor
 */
function isColor(string) {
	if (typeof string !== 'string') return false
	return !!chalk[string]
}

/**
 * Insere os detalhes do erro dentro do objeto dele
 */
function parseErrors(log) {
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
			log.contents[i] = `${content.name}: ${content.message}`
			break
		}
	}
}

module.exports = {
	isLevel,
	isColor,
	parseErrors
}