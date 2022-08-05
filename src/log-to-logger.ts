import { load, save } from './config'
import { MissingFunctionError } from './errors'
import { parseErrors } from './helpers'
import { ILog } from './types'

export class Logs {
	logs: ILog[]
	logsForUpload: ILog[]

	constructor() {
		this.logs = []
		this.logsForUpload = []
		this.load()

		if (process.env.NODE_ENV === 'production') {
			setInterval(this.save.bind(this), 60000)
		}
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

	save(): false | Promise<true | Error> {
		if (!this.logsForUpload.length) return false
		return save(this.logsForUpload)
			.then(() => {
				this.logsForUpload = []
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
		this.logsForUpload.push(opts)
	}

	getLogs(): ILog[] {
		return this.logs
	}
}

export default new Logs()
