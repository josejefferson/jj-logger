import getOptions from './get-options'
import logToConsole from './log-to-console'
import Logs from './log-to-logger'
import setPresets, { presets, addPreset } from './presets'

function Logger(...args: any[]) {
	const opts = getOptions(...args)

	function log(...contents: any[]) {
		try {
			logToConsole(opts, contents)
		} catch (err) {
			console.error(err)
		}
		try {
			Logs.log(opts, contents)
		} catch (err) {
			console.error(err)
		}
		return opts
	}

	setPresets(log, Logger, opts)
	return log
}

Logger.getLogs = Logs.getLogs.bind(Logs)
Logger.presets = presets
Logger.addPreset = addPreset

export = Logger
