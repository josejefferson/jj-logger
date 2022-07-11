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
 * Adiciona um objeto com as informações do erro no objeto Error
 */
function parseErrors(contents) {
	for (const content of contents) {
		if (content instanceof Error) {
			content.errorInfo = {
				name: content.name,
				message: content.message,
				stack: content.stack
			}
		}
	}
}

module.exports = {
	isLevel,
	isColor,
	parseErrors
}