const config = {
	loadFn: async () => {},
	saveFn: async () => {}
}

/**
 * Define a função de carregamento do banco de dados
 */
function setLoadFn(fn) {
	if (typeof fn !== 'function') {
		throw new Error('Invalid function')
	}

	config.loadFn = fn
}

/**
 * Define a função de salvamento do banco de dados
 */
function setSaveFn(fn) {
	if (typeof fn !== 'function') {
		throw new Error('Invalid function')
	}

	config.saveFn = fn
}

/**
 * Define as funções de carregamento e salvamento do banco de dados MongoDB
 */
function setMongooseModel(model) {
	config.loadFn = (...args) => model.find(...args)
	config.saveFn = (...args) => model.create(...args)
}

/**
 * Executa a função de carregamento do banco de dados
 */
function load(...args) {
	return config.loadFn(...args)
}

/**
 * Executa a função de salvamento do banco de dados
 */
function save(...args) {
	return config.saveFn(...args)
}

module.exports = {
	load,
	save,
	setLoadFn,
	setSaveFn,
	setMongooseModel
}