import chalk from 'chalk'
import type { ILog } from './types'

/**
 * Printa um log no console
 */
export default function logToConsole(opts: ILog, contents: any[]) {
	// Condições para logar no console
	if (!process.env.LOG_ALL && opts.hideConsole) return
	if (
		!process.env.LOG_ALL &&
		process.env.NODE_ENV === 'production' &&
		opts.hideProduction
	)
		return
	contents = [...contents]

	// Formata as horas
	const date = new Date(opts.date)
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const seconds = date.getSeconds().toString().padStart(2, '0')
	const fmtDate = chalk.gray(`${hours}:${minutes}:${seconds}`)

	// Colore os textos
	for (const i in contents) {
		const content = contents[i]
		if (typeof content === 'string' && chalk[opts.color]) {
			contents[i] = chalk[opts.color](content)
		}
	}

	// Formata o título
	let title: string | null = null
	if (typeof opts.title === 'string') {
		title = chalk.underline(opts.title)
		if (opts.ignoreLogger) title = '!' + title
		if (opts.hideConsole) title = '(' + title + ')'
		title += ':'
		if (opts.hideProduction) title += '*'
	}

	// Imprime
	if (!title) console.log(fmtDate, ...contents)
	else console.log(fmtDate, title, ...contents)
}
