const { load, save } = require('./config')
const { parseErrors } = require('./helpers')

class Logs {
	constructor() {
		this.logs = []
		this.logsForUpload = []
		this.load()

		if (process.env.NODE_ENV === 'production') {
			setInterval(this.save.bind(this), 60000)
		}
	}

	load() {
		return load().then((logs) => {
			this.logs.unshift(...logs)
			return logs
		}).catch((err) => {
			if (err.noFunction) return err
			console.error(err)
			return err
		})
	}

	save() {
		if (!this.logsForUpload.length) return false
		return save(this.logsForUpload).then(() => {
			this.logsForUpload = []
			return true
		}).catch((err) => {
			if (err.noFunction) return err
			console.error(err)
			return err
		})
	}

	log(opts, contents) {
		if (opts.ignoreLogger) return false
		opts.contents = contents
		parseErrors(opts)
		this.logs.push(opts)
		this.logsForUpload.push(opts)
	}

	getLogs() {
		return this.logs
	}
}

module.exports = new Logs()