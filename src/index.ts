import {
	setLoadFn,
	setMongoose,
	setMongooseModel,
	setSaveFn,
	setSequelize,
	setSequelizeModel
} from './config'
import { add, presets as _presets } from './presets'
export const config = {
	setLoadFn,
	setSaveFn,
	setMongoose,
	setMongooseModel,
	setSequelize,
	setSequelizeModel
}
export * from './console'
export * as errors from './errors'
export * from './get-options'
export * as helpers from './helpers'
export * from './log'
export * from './logger'
export * from './middleware'
export * from './types'
export const presets = { presets: _presets, add }
