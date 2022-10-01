// import {
// 	setLoadFn,
// 	setMongoose,
// 	setMongooseModel,
// 	setSaveFn,
// 	setSequelize,
// 	setSequelizeModel
// } from './config'
// import { add, presets as _presets } from './presets'
// export const config = {
// 	setLoadFn,
// 	setSaveFn,
// 	setMongoose,
// 	setMongooseModel,
// 	setSequelize,
// 	setSequelizeModel
// }
// export * from './console'
// export * as errors from './errors'
// export * from './get-options'
// export * as helpers from './helpers'
// export * from './log'
// export * from './logger'
// export * from './middleware'
// export * from './types'
// export const presets = { presets: _presets, add }

import { defaultLogger } from './jj-logger'
import { useMongoose, useMongooseModel, useSequelize, useSequelizeModel } from './config'
export * from './console'
export * as errors from './errors'
export * from './get-options'
export * as helpers from './helpers'
export * from './middleware'
export * from './types'

export const instance = defaultLogger.instance
export const getLogs = defaultLogger.getLogs
export const log = defaultLogger.log

export const config = {
	setLoadFn: defaultLogger.setLoadFn,
	setSaveFn: defaultLogger.setSaveFn,
	setMongoose: defaultLogger.setMongoose,
	setMongooseModel: defaultLogger.setMongooseModel,
	setSequelize: defaultLogger.setSequelize,
	setSequelizeModel: defaultLogger.setSequelizeModel,
	useMongoose: useMongoose,
	useMongooseModel: useMongooseModel,
	useSequelize: useSequelize,
	useSequelizeModel: useSequelizeModel
}

export const presets = {
	presets: defaultLogger.presets,
	add: defaultLogger.addPreset
}
