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
    if (typeof args[args.length - 1] === 'object') {
        newOptions = args[args.length - 1];
        args = args.slice(0, -1);
    }
    if (typeof args[args.length - 3] === 'boolean' &&
        typeof args[args.length - 2] === 'boolean' &&
        typeof args[args.length - 1] === 'boolean') {
        /**
         * Se os três últimos argumentos forem booleanos
         * (..., true, false, true)
         */
        options.hideProduction = args[args.length - 3];
        options.hideConsole = args[args.length - 2];
        options.ignoreLogger = args[args.length - 1];
        args = args.slice(0, -3);
    }
    else if (typeof args[args.length - 2] === 'boolean' &&
        typeof args[args.length - 1] === 'boolean') {
        /**
         * Se os dois últimos argumentos forem booleanos
         * (..., true, false)
         */
        options.hideProduction = args[args.length - 2];
        options.hideConsole = args[args.length - 1];
        args = args.slice(0, -2);
    }
    else if (typeof args[args.length - 1] === 'boolean') {
        /**
         * Se os dois últimos argumentos forem booleanos
         * (..., true)
         */
        options.hideProduction = args[args.length - 1];
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
