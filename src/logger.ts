import { load, save } from './config'
import { MissingFunctionError } from './errors'
import { parseErrors } from './helpers'
import type { ILog } from './types'

export class Logger {
	logs: ILog[]

	constructor() {
		this.logs = []
		this.load().catch((err) => {
			if (err instanceof MissingFunctionError) return err
			console.error(err)
			return err
		})
	}

	/**
	 * Loads the database logs
	 * @returns Logs
	 */
	async load(): Promise<ILog[] | null> {
		const logs = await load()
		this.logs = logs
		return logs
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
	log(opts: ILog, contents: any[]) {
		if (opts.ignoreLogger) return false
		opts.contents = contents
		parseErrors(opts)
		this.logs.push(opts)
		if (process.env.NODE_ENV !== 'production') return false
		this.save(opts).catch((err) => {
			if (err instanceof MissingFunctionError) return err
			console.error(err)
			return err
		})
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
