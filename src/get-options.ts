import { isColor, isLevel } from './helpers'
import type { ILog } from './types'

/**
 * Retorna um objeto de opções do logger de acordo com os argumentos
 */
export default function getOptions(...args: any[]) {
	const options: ILog = {
		date: new Date().toISOString()
	}

	let newOptions = null

	/**
	 * Se o último argumento for objeto, juntá-lo às opções
	 * (..., {})
	 */
	if (typeof args[args.length - 1] === 'object') {
		newOptions = args[args.length - 1]
		args = args.slice(0, -1)
	}

	if (
		typeof args[args.length - 3] === 'boolean' &&
		typeof args[args.length - 2] === 'boolean' &&
		typeof args[args.length - 1] === 'boolean'
	) {
		/**
		 * Se os três últimos argumentos forem booleanos
		 * (..., true, false, true)
		 */
		options.hideProduction = args[args.length - 3]
		options.hideConsole = args[args.length - 2]
		options.ignoreLogger = args[args.length - 1]
		args = args.slice(0, -3)
	} else if (
		typeof args[args.length - 2] === 'boolean' &&
		typeof args[args.length - 1] === 'boolean'
	) {
		/**
		 * Se os dois últimos argumentos forem booleanos
		 * (..., true, false)
		 */
		options.hideProduction = args[args.length - 2]
		options.hideConsole = args[args.length - 1]
		args = args.slice(0, -2)
	} else if (typeof args[args.length - 1] === 'boolean') {
		/**
		 * Se os dois últimos argumentos forem booleanos
		 * (..., true)
		 */
		options.hideProduction = args[args.length - 1]
		args = args.slice(0, -1)
	}

	/**
	 * Procura uma cor
	 * (..., 'blue', ...)
	 */
	for (const [i, arg] of Object.entries(args).reverse()) {
		if (isColor(arg)) {
			options.color = arg
			args.splice(+i, 1)
		}
	}

	/**
	 * Procura um nível
	 * (..., 'ERROR', ...)
	 */
	for (const [i, arg] of Object.entries(args).reverse()) {
		if (isLevel(arg)) {
			options.level = arg
			args.splice(+i, 1)
		}
	}

	if (args.length >= 2) {
		/**
		 * Título no primeiro argumento e código no segundo
		 * ('Título', 'Código', ...)
		 */
		options.title = args[0]
		options.code = args[1]
	} else if (args.length === 1) {
		/**
		 * Título no primeiro argumento
		 * ('Título', ...)
		 */
		options.title = args[0]
	}

	Object.assign(options, newOptions)

	return options
}
