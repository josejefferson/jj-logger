import { MissingFunctionError } from './errors'
import type { Config, ILog } from './types'

export const config: Config = {
	loadFn: null,
	saveFn: null
}

/**
 * Sets database load function
 */
export function setLoadFn(fn: Config['loadFn']) {
	if (typeof fn !== 'function' && fn !== null) {
		throw new Error('Invalid function')
	}

	config.loadFn = fn
}

/**
 * Sets database save function
 */
export function setSaveFn(fn: Config['saveFn']) {
	if (typeof fn !== 'function' && fn !== null) {
		throw new Error('Invalid function')
	}

	config.saveFn = fn
}

/**
 * Automatically sets Mongoose schema and model
 * @param mongoose Mongoose
 * @returns Schema and Model
 */
export function setMongoose(mongoose: any) {
	const existingModel = mongoose.models['Log']
	if (existingModel) {
		setMongooseModel(existingModel)
		return { schema: existingModel.schema, model: existingModel }
	}

	const schema = new mongoose.Schema(
		{ date: { type: Date, expires: 604800 } },
		{ strict: false }
	)

	const model = mongoose.model('Log', schema)
	setMongooseModel(model)

	return { schema, model }
}

/**
 * Sets logger functions from an existing Mongoose model
 * @param model Mongoose model
 */
export function setMongooseModel(model: any) {
	config.loadFn = async (...args) => {
		if (model.db.readyState !== 1) {
			await new Promise((resolve) => model.db.once('connected', resolve))
		}

		return model.find(...args)
	}

	config.saveFn = async (...args) => {
		if (model.db.readyState !== 1) {
			await new Promise((resolve) => model.db.once('connected', resolve))
		}

		return model.create(...args)
	}
}

/**
 * Automatically sets Sequelize model
 * @param sequelize Sequelize module
 * @param connection Sequelize connection
 * @returns Model
 */
export function setSequelize(sequelize: any, connection: any) {
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

	setSequelizeModel(model)

	return { model }
}

/**
 * Sets logger functions from an existing Sequelize model
 * @param model Sequelize model
 */
export function setSequelizeModel(model: any) {
	config.loadFn = async () => {
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

	config.saveFn = (log: ILog) => {
		return model.create({
			content: JSON.stringify(log)
		})
	}
}

/**
 * Run the database load function
 */
export async function load() {
	if (!config.loadFn) {
		throw new MissingFunctionError('No load function')
	}

	return config.loadFn()
}

/**
 * Run the database save function
 */
export async function save(log: ILog) {
	if (!config.saveFn) {
		throw new MissingFunctionError('No save function')
	}

	return config.saveFn(log)
}
