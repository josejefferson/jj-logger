import chalk from 'chalk'
import { ILog } from './types'

const LOG = false
const NO_LOG = true
const PROD = false
const DEV = true
const LOGGER = false
const NO_LOGGER = true

type PresetFunction = (opts: ILog, content: any[]) => {
	params: any[],
	content?: any[]
}

type Preset = [string, PresetFunction]

export const presets: Preset[] = [
	['success', (opts) => ({ params: ['SUCCESS', 'greenBright', PROD, LOG, LOGGER, opts] })],

	['warning', (opts) => ({ params: ['WARNING', 'yellowBright', PROD, LOG, LOGGER, opts] })],

	['error', (opts) => ({ params: ['ERROR', 'redBright', PROD, LOG, LOGGER, opts] })],

	['info', (opts) => ({ params: ['INFO', 'cyanBright', PROD, LOG, LOGGER, opts] })],

	['debug', (opts) => ({ params: ['DEBUG', DEV, LOG, NO_LOGGER, opts] })],

	['http', (opts, content) => {
		const details = content[0]
		opts.code ??= details.status || '???'
		const status = details.status >= 400 ? chalk.white(details.status) : details.status
		let text = `${details.method} (${status}) ${details.url} - ${details.time}ms`
		if (details.ips?.length) text += ' - ' + details.ips?.join(', ')
		if (details.referer) text += ' - ' + details.referer

		return {
			params: ['HTTP', 'INFO', 'gray', DEV, !(process.env.LOG_HTTP && NO_LOG), Object.assign(opts, { details })],
			content: [text]
		}
	}],

	['db', (opts, content) => {
		const details = content[0]
		const text = `${details.event} - ${details.collection} - ${details.id}`
		return {
			params: ['DB', 'INFO', 'gray', DEV, !(process.env.LOG_DB && NO_LOG), Object.assign(opts, { details })],
			content: [text]
		}
	}]
]

export function addPreset(name: string, fn: PresetFunction) {
	presets.push([name, fn])
}

export default function setPresets(log: any, Logger: any, opts: ILog) {
	for (const preset of presets) {
		const [presetName, presetFunction] = preset
		log[presetName] = (...content: any[]) => {
			return Logger(...presetFunction(opts, content).params)(...(presetFunction(opts, content).content || content))
		}
	}
}