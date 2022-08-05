"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
/**
 * Retorna um objeto de opções do logger de acordo com os argumentos
 */
function getOptions() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var options = {
        date: new Date().toISOString()
    };
    var newOptions = null;
    /**
     * Se o último argumento for objeto, juntá-lo às opções
     * (..., {})
     */
    if (typeof args.at(-1) === 'object') {
        newOptions = args.at(-1);
        args = args.slice(0, -1);
    }
    if (typeof args.at(-3) === 'boolean' &&
        typeof args.at(-2) === 'boolean' &&
        typeof args.at(-1) === 'boolean') {
        /**
         * Se os três últimos argumentos forem booleanos
         * (..., true, false, true)
         */
        options.hideProduction = args.at(-3);
        options.hideConsole = args.at(-2);
        options.ignoreLogger = args.at(-1);
        args = args.slice(0, -3);
    }
    else if (typeof args.at(-2) === 'boolean' &&
        typeof args.at(-1) === 'boolean') {
        /**
         * Se os dois últimos argumentos forem booleanos
         * (..., true, false)
         */
        options.hideProduction = args.at(-2);
        options.hideConsole = args.at(-1);
        args = args.slice(0, -2);
    }
    else if (typeof args.at(-1) === 'boolean') {
        /**
         * Se os dois últimos argumentos forem booleanos
         * (..., true)
         */
        options.hideProduction = args.at(-1);
        args = args.slice(0, -1);
    }
    /**
     * Procura uma cor
     * (..., 'blue', ...)
     */
    for (var _a = 0, _b = Object.entries(args).reverse(); _a < _b.length; _a++) {
        var _c = _b[_a], i = _c[0], arg = _c[1];
        if ((0, helpers_1.isColor)(arg)) {
            options.color = arg;
            args.splice(+i, 1);
        }
    }
    /**
     * Procura um nível
     * (..., 'ERROR', ...)
     */
    for (var _d = 0, _e = Object.entries(args).reverse(); _d < _e.length; _d++) {
        var _f = _e[_d], i = _f[0], arg = _f[1];
        if ((0, helpers_1.isLevel)(arg)) {
            options.level = arg;
            args.splice(+i, 1);
        }
    }
    if (args.length >= 2) {
        /**
         * Título no primeiro argumento e código no segundo
         * ('Título', 'Código', ...)
         */
        options.title = args[0];
        options.code = args[1];
    }
    else if (args.length === 1) {
        /**
         * Título no primeiro argumento
         * ('Título', ...)
         */
        options.title = args[0];
    }
    Object.assign(options, newOptions);
    return options;
}
exports.default = getOptions;
