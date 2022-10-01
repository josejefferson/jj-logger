import { MissingFunctionError } from './errors'
import { parseErrors } from './helpers'
import { ILog } from './types'
import { JJLogger } from './jj-logger'

/**
 * Loads the database logs
 * @param sync Send failed logs to the database
 * @returns Logs
 */
export async function load(this: JJLogger, sync = true): Promise<ILog[] | null> {
	if (sync) await this.syncPendingLogs()
	const logs = await this.loadFn()
	this.logs = logs
	this.logs.sort((a, b) => {
		if (!a || !b || (a && !a.date) || (b && !b.date)) return 0
		return Number(new Date(b.date)) - Number(new Date(a.date))
	})
	return this.logs
}

/**
 * Saves the log into the database
 * @param log Log
 */
export async function save(this: JJLogger, log: ILog): Promise<boolean> {
	if (!log) return Promise.resolve(false)
	await this.saveFn(log)
	return true
}

/**
 * Create a log and sends it to the database
 * @param opts Log options
 * @param contents Contents of log
 */
export async function logToLogger(this: JJLogger, opts: ILog, contents?: any[]): Promise<any> {
	if (opts.ignoreLogger) return Promise.resolve(false)
	if (contents) opts.contents = contents
	parseErrors(opts)
	this.logs.unshift(opts)
	if (process.env.NODE_ENV !== 'production') return Promise.resolve(false)
	try {
		await this.save(opts)
		return true
	} catch (err) {
		this.pendingLogs.push(opts)
		if (err instanceof MissingFunctionError) return
		console.error(err)
		return err
	}
}

/**
 * Sends the failed logs to the database
 */
export async function syncPendingLogs(this: JJLogger) {
	const pendingLogs = [...this.pendingLogs]
	this.pendingLogs = []
	const promises = pendingLogs.map(this.logToLogger.bind(this))
	return Promise.all(promises)
}

/**
 * Returns the Log array
 * @param fetch Force the fetch of the database logs
 * @returns Log array
 */
export function getLogs(this: JJLogger, fetch = false): Promise<ILog[]> {
	return fetch ? this.load() : Promise.resolve(this.logs)
}
