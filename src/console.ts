import chalk from 'chalk'
import type { ILog } from './types'

/**
 * Display the log in the console
 */
export function logToConsole(opts: ILog, contents: any[]) {
	// Conditions for logging into the console
	if (!process.env.LOG_ALL && opts.hideConsole) return
	if (
		!process.env.LOG_ALL &&
		process.env.NODE_ENV === 'production' &&
		opts.hideProduction
	)
		return
	contents = [...contents]

	// Format the time
	const date = new Date(opts.date)
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const seconds = date.getSeconds().toString().padStart(2, '0')
	const fmtDate = chalk.gray(`${hours}:${minutes}:${seconds}`)

	// Color the texts
	for (const i in contents) {
		const content = contents[i]
		if (typeof content === 'string' && chalk[opts.color]) {
			contents[i] = chalk[opts.color](content)
		}
	}

	// Format the title
	let title: string | null = null
	if (typeof opts.title === 'string') {
		title = chalk.underline(opts.title)
		if (opts.ignoreLogger) title = '!' + title
		if (opts.hideConsole) title = '(' + title + ')'
		title += ':'
		if (opts.hideProduction) title += '*'
	}

	// Print
	if (!title) console.log(fmtDate, ...contents)
	else console.log(fmtDate, title, ...contents)
}
