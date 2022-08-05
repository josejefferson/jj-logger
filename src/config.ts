import { MissingFunctionError } from './errors'

type Config = {
	loadFn: null | ((...args: any[]) => Promise<any[]>)
	saveFn: null | ((...args: any[]) => Promise<any>)
}

const config: Config = {
	loadFn: null,
	saveFn: null
}

/**
 * Define a função de carregamento do banco de dados
 */
export function setLoadFn(fn: Config['loadFn']) {
	if (typeof fn !== 'function') {
		throw new Error('Invalid function')
	}

	config.loadFn = fn
}

/**
 * Define a função de salvamento do banco de dados
 */
export function setSaveFn(fn: Config['saveFn']) {
	if (typeof fn !== 'function') {
		throw new Error('Invalid function')
	}

	config.saveFn = fn
}

/**
 * Define as funções de carregamento e salvamento do banco de dados MongoDB
 */
export function setMongooseModel(model: any) {
	config.loadFn = (...args) => model.find(...args)
	config.saveFn = (...args) => model.create(...args)
}

/**
 * Executa a função de carregamento do banco de dados
 */
export async function load(...args: any[]) {
	if (!config.loadFn) {
		throw new MissingFunctionError('No load function')
	}

	return config.loadFn(...args)
}

/**
 * Executa a função de salvamento do banco de dados
 */
export async function save(...args: any[]) {
	if (!config.saveFn) {
		throw new MissingFunctionError('No save function')
	}

	return config.saveFn(...args)
}
