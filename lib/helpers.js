"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErrors = exports.isColor = exports.isLevel = exports.LEVELS = void 0;
var chalk_1 = __importDefault(require("chalk"));
exports.LEVELS = ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING'];
/**
 * Retorna true se a string representa um nível
 */
function isLevel(string) {
    if (typeof string !== 'string')
        return false;
    return string.trim().toUpperCase() in exports.LEVELS;
}
exports.isLevel = isLevel;
/**
 * Retorna true se a string representa uma cor
 */
function isColor(string) {
    if (typeof string !== 'string')
        return false;
    return string in chalk_1.default;
}
exports.isColor = isColor;
/**
 * Insere os detalhes do erro dentro do objeto dele
 */
function parseErrors(log) {
    var _a, _b;
    for (var _i = 0, _c = Object.entries(log.contents); _i < _c.length; _i++) {
        var _d = _c[_i], i = _d[0], content = _d[1];
        if (content instanceof Error) {
            (_a = log.details) !== null && _a !== void 0 ? _a : (log.details = {});
            if (typeof log.details !== 'object')
                continue;
            log.details.errorInfo = __assign(__assign({}, content), { name: content.name, message: content.message, stack: content.stack });
            log.contents[+i] = "".concat(content.name, ": ").concat(content.message);
            (_b = log.code) !== null && _b !== void 0 ? _b : (log.code = content.name);
            break;
        }
    }
}
exports.parseErrors = parseErrors;
