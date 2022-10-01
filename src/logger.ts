import { load, save } from './config'
import { MissingFunctionError } from './errors'
import { parseErrors } from './helpers'
import type { ILog } from './types'

export class Logger {
	logs: ILog[]
	pendingLogs: ILog[]

	constructor() {
		this.logs = []
		this.pendingLogs = []
	}

	/**
	 * Loads the database logs
	 * @param sync Send failed logs to the database
	 * @returns Logs
	 */
	async load(sync = true): Promise<ILog[] | null> {
		if (sync) await this.syncPendingLogs()
		const logs = await load()
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
	async save(log: ILog): Promise<boolean> {
		if (!log) return Promise.resolve(false)
		await save(log)
		return true
	}

	/**
	 * Create a log and sends it to the database
	 * @param opts Log options
	 * @param contents Contents of log
	 */
	async log(opts: ILog, contents?: any[]): Promise<any> {
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
	async syncPendingLogs() {
		const pendingLogs = [...this.pendingLogs]
		this.pendingLogs = []
		const promises = pendingLogs.map(this.log.bind(this))
		return Promise.all(promises)
	}

	/**
	 * Returns the Log array
	 * @param fetch Force the fetch of the database logs
	 * @returns Log array
	 */
	getLogs(fetch = false): Promise<ILog[]> {
		return fetch ? this.load() : Promise.resolve(this.logs)
	}
}

/**
 * Saved logs
 */
export const logs = new Logger()

/**
 * Returns the Log array
 * @param fetch Force the fetch of the database logs
 * @returns Log array
 */
export const getLogs: typeof logs['getLogs'] = logs.getLogs.bind(logs)
