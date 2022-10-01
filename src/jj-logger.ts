import {
	defaultLoadFn,
	defaultSaveFn,
	setLoadFn,
	setMongoose,
	setMongooseModel,
	setSaveFn,
	setSequelize,
	setSequelizeModel
} from './config'
import { validateOptions } from './helpers'
import { log } from './log'
import { getLogs, load, logToLogger, save, syncPendingLogs } from './logger'
import { add, defaultPresets, setOnFn } from './presets'
import { Config, ILog, IOptions, Preset } from './types'

export class JJLogger {
	logs: ILog[]
	pendingLogs: ILog[]
	loadFn: Config['loadFn']
	saveFn: Config['saveFn']
	presets: Preset[]

	setLoadFn: typeof setLoadFn
	setSaveFn: typeof setSaveFn
	setMongoose: typeof setMongoose
	setMongooseModel: typeof setMongooseModel
	setSequelize: typeof setSequelize
	setSequelizeModel: typeof setSequelizeModel

	load: typeof load
	save: typeof save
	logToLogger: typeof logToLogger
	syncPendingLogs: typeof syncPendingLogs
	getLogs: typeof getLogs

	log: typeof log

	addPreset: typeof add
	setPresetsOnFn: typeof setOnFn

	constructor(options?: IOptions) {
		validateOptions(options)
		this.logs = []
		this.pendingLogs = []
		this.loadFn = options?.loadFn || defaultLoadFn
		this.saveFn = options?.saveFn || defaultSaveFn
		this.presets = [...(options?.presets || defaultPresets()), ...(options?.customPresets || [])]
	}
}

JJLogger.prototype.setLoadFn = setLoadFn
JJLogger.prototype.setSaveFn = setSaveFn
JJLogger.prototype.setMongoose = setMongoose
JJLogger.prototype.setMongooseModel = setMongooseModel
JJLogger.prototype.setSequelize = setSequelize
JJLogger.prototype.setSequelizeModel = setSequelizeModel

JJLogger.prototype.load = load
JJLogger.prototype.save = save
JJLogger.prototype.logToLogger = logToLogger
JJLogger.prototype.syncPendingLogs = syncPendingLogs
JJLogger.prototype.getLogs = getLogs

JJLogger.prototype.log = log

JJLogger.prototype.addPreset = add
JJLogger.prototype.setPresetsOnFn = setOnFn

export const defaultLogger = createLogger()

export function createLogger(options?: IOptions) {
	const logger = new JJLogger(options)

	return {
		instance: logger,

		// loadFn: logger.loadFn,
		// saveFn: logger.saveFn,
		presets: logger.presets,

		setLoadFn: logger.setLoadFn.bind(logger) as typeof logger.setLoadFn,
		setSaveFn: logger.setSaveFn.bind(logger) as typeof logger.setSaveFn,
		setMongoose: logger.setMongoose.bind(logger) as typeof logger.setMongoose,
		setMongooseModel: logger.setMongooseModel.bind(logger) as typeof logger.setMongooseModel,
		setSequelize: logger.setSequelize.bind(logger) as typeof logger.setSequelize,
		setSequelizeModel: logger.setSequelizeModel.bind(logger) as typeof logger.setSequelizeModel,

		// load: logger.load.bind(logger) as typeof logger.load,
		// save: logger.save.bind(logger) as typeof logger.save,
		// logToLogger: logger.logToLogger.bind(logger) as typeof logger.logToLogger,
		// syncPendingLogs: logger.syncPendingLogs.bind(logger) as typeof logger.syncPendingLogs,
		getLogs: logger.getLogs.bind(logger) as typeof logger.getLogs,

		log: logger.log.bind(logger) as typeof logger.log,

		addPreset: logger.addPreset.bind(logger) as typeof logger.addPreset
		// setPresetsOnFn: logger.setPresetsOnFn.bind(logger) as typeof logger.setPresetsOnFn
	}
}
