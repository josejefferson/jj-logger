import { logToConsole } from './console'
import { getOptions } from './get-options'
import { JJLogger } from './jj-logger'
import type { ILogger, ILogReturnPromise } from './types'

/**
 * Create a logger
 *
 * @example
 * log('Title', 'CODE', 'yellow', 'warning')('Contents here...')
 * log('Title', 'CODE').warning('Contents here...')
 */
export function log(this: JJLogger, ...args: any[]): ILogger {
	const _this = this
	const opts = getOptions(...args)

	const executeLog = <ILogger>function (...contents: any[]) {
		let logSaveResolve: (value?: unknown) => void
		const logReturn: ILogReturnPromise = new Promise((resolve) => {
			logSaveResolve = resolve
		})

		logReturn.opts = opts

		try {
			logToConsole(opts, contents)
		} catch (err) {
			console.error(err)
		}

		try {
			_this.logToLogger(opts, contents).then(logSaveResolve)
		} catch (err) {
			console.error(err)
		}

		return logReturn
	}

	this.setPresetsOnFn.bind(this)(executeLog, log.bind(this), opts)
	return executeLog
}
