import { load, save } from './config'
import { MissingFunctionError } from './errors'
import { parseErrors } from './helpers'
import { ILog } from './types'

export class Logs {
	logs: ILog[]

	constructor() {
		this.logs = []
		this.load()
	}

	load(): Promise<ILog | Error | null> {
		return load()
			.then((logs) => {
				this.logs.unshift(...logs)
				return logs
			})
			.catch((err) => {
				if (err instanceof MissingFunctionError) return err
				console.error(err)
				return err
			})
	}

	save(log: ILog): false | Promise<true | Error> {
		if (!log) return false
		return save(log)
			.then(() => {
				return true
			})
			.catch((err) => {
				if (err instanceof MissingFunctionError) return err
				console.error(err)
				return err
			})
	}

	log(opts: ILog, contents: any[]) {
		if (opts.ignoreLogger) return false
		opts.contents = contents
		parseErrors(opts)
		this.logs.push(opts)
		this.save(opts)
	}

	getLogs(): ILog[] {
		return this.logs
	}
}

export default new Logs()
