import { MissingFunctionError } from './errors'
import { JJLogger } from './jj-logger'
import type { Config, ILog } from './types'

export const defaultLoadFn = () => {
	throw new MissingFunctionError('No load function')
}

export const defaultSaveFn = () => {
	throw new MissingFunctionError('No save function')
}

/**
 * Sets database load function
 */
export function setLoadFn(this: JJLogger, fn: Config['loadFn']) {
	if (typeof fn !== 'function' && fn !== null) {
		throw new Error('Invalid function')
	}

	this.loadFn = fn || defaultLoadFn
}

/**
 * Sets database save function
 */
export function setSaveFn(this: JJLogger, fn: Config['saveFn']) {
	if (typeof fn !== 'function' && fn !== null) {
		throw new Error('Invalid function')
	}

	this.saveFn = fn || defaultSaveFn
}

/**
 * Automatically sets Mongoose schema and model
 * @param mongoose Mongoose
 * @returns Schema and Model
 */
export function setMongoose(this: JJLogger, mongoose: any) {
	const { schema, model, loadFn, saveFn } = useMongoose(mongoose)
	this.loadFn = loadFn
	this.saveFn = saveFn
	return { schema, model }
}

/**
 * Sets logger functions from an existing Mongoose model
 * @param model Mongoose model
 */
export function setMongooseModel(this: JJLogger, model: any) {
	const { loadFn, saveFn } = useMongooseModel(model)
	this.loadFn = loadFn
	this.saveFn = saveFn
}

/**
 * Automatically sets Mongoose schema and model and returns Save function and Load function
 * @param mongoose Mongoose
 * @returns Schema and Model
 */
export function useMongoose(mongoose: any) {
	const existingModel = mongoose.models['Log']
	if (existingModel) {
		return {
			...useMongooseModel(existingModel),
			schema: existingModel.schema,
			model: existingModel
		}
	}

	const schema = new mongoose.Schema({ date: { type: Date, expires: 604800 } }, { strict: false })

	const model = mongoose.model('Log', schema)
	return { ...useMongooseModel(model), schema, model }
}

/**
 * Returns logger functions from an existing Mongoose model
 * @param model Mongoose model
 */
export function useMongooseModel(model: any) {
	const loadFn: Config['loadFn'] = async (...args) => {
		if (model.db.readyState !== 1) {
			await new Promise((resolve) => model.db.once('connected', resolve))
		}

		return model.find(...args)
	}

	const saveFn: Config['saveFn'] = async (...args) => {
		if (model.db.readyState !== 1) {
			await new Promise((resolve) => model.db.once('connected', resolve))
		}

		return model.create(...args)
	}

	return { loadFn, saveFn }
}

/**
 * Automatically sets Sequelize model
 * @param sequelize Sequelize module
 * @param connection Sequelize connection
 * @returns Model
 */
export function setSequelize(this: JJLogger, sequelize: any, connection: any) {
	const { model, loadFn, saveFn } = useSequelize(sequelize, connection)
	this.loadFn = loadFn
	this.saveFn = saveFn
	return { model }
}

/**
 * Sets logger functions from an existing Sequelize model
 * @param model Sequelize model
 */
export function setSequelizeModel(this: JJLogger, model: any) {
	const { loadFn, saveFn } = useSequelizeModel(model)
	this.loadFn = loadFn
	this.saveFn = saveFn
}

/**
 * Automatically sets Sequelize model
 * @param sequelize Sequelize module
 * @param connection Sequelize connection
 * @returns Model
 */
export function useSequelize(sequelize: any, connection: any) {
	const model = connection.define('Log', {
		id: {
			type: sequelize.DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		content: {
			type: sequelize.DataTypes.TEXT
		}
	})

	return { ...useSequelizeModel(model), model }
}

/**
 * Sets logger functions from an existing Sequelize model
 * @param model Sequelize model
 */
export function useSequelizeModel(model: any) {
	const loadFn = async () => {
		const logs = await model.findAll()
		return logs
			.map((log: any) => {
				try {
					return JSON.parse(log.content)
				} catch {
					return null
				}
			})
			.filter((log: any) => log)
	}

	const saveFn = (log: ILog) => {
		return model.create({
			content: JSON.stringify(log)
		})
	}

	return { loadFn, saveFn }
}
