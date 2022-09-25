import { getOptions } from './get-options'
import { logToConsole } from './console'
import { logs } from './logger'
import { setOnFn as setPresetsOnFn } from './presets'
import type { ILogger } from './types'

/**
 * Create a logger
 *
 * @example
 * log('Title', 'CODE', 'yellow', 'warning')('Contents here...')
 * log('Title', 'CODE').warning('Contents here...')
 */
export function log(...args: any[]): ILogger {
	const opts = getOptions(...args)

	const executeLog = <ILogger>function (...contents: any[]) {
		try {
			logToConsole(opts, contents)
		} catch (err) {
			console.error(err)
		}

		try {
			logs.log(opts, contents)
		} catch (err) {
			console.error(err)
		}
		return opts
	}

	setPresetsOnFn(executeLog, log, opts)
	return executeLog
}
