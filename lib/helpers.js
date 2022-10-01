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
exports.validateOptions = exports.parseErrors = exports.isColor = exports.isLevel = exports.LEVELS = void 0;
var chalk_1 = __importDefault(require("chalk"));
exports.LEVELS = ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING'];
/**
 * Returns True if the string represents a level
 */
function isLevel(string) {
    if (typeof string !== 'string')
        return false;
    return exports.LEVELS.some(function (level) { return level === string.trim().toUpperCase(); });
}
exports.isLevel = isLevel;
/**
 * Returns True if the string represents a color
 */
function isColor(string) {
    if (typeof string !== 'string')
        return false;
    return string in chalk_1.default;
}
exports.isColor = isColor;
/**
 * Insert the error details within details object
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
function validateOptions(options) {
    if (typeof options === 'undefined') {
        return;
    }
    if (typeof options !== 'object') {
        throw new Error('"options" is not an object');
    }
    if ('loadFn' in options &&
        typeof options.loadFn !== 'function' &&
        options.loadFn !== null) {
        throw new Error('"options.loadFn" is not a function');
    }
    if ('saveFn' in options &&
        typeof options.saveFn !== 'function' &&
        options.saveFn !== null) {
        throw new Error('"options.saveFn" is not a function');
    }
    if ('load' in options && typeof options.load !== 'boolean') {
        throw new Error('"options.load" is not a boolean');
    }
    if ('presets' in options && !Array.isArray(options.presets)) {
        throw new Error('"options.presets" is not an array');
    }
    for (var _i = 0, _a = Object.entries(options.presets); _i < _a.length; _i++) {
        var _b = _a[_i], i = _b[0], preset = _b[1];
        if (typeof preset[0] !== 'string') {
            throw new Error("\"options.presets[".concat(i, "][0]\" is not a string"));
        }
        if (typeof preset[1] !== 'function') {
            throw new Error("\"options.presets[".concat(i, "][1]\" is not a function"));
        }
    }
    if ('customPresets' in options && !Array.isArray(options.customPresets)) {
        throw new Error('"options.customPresets" is not an array');
    }
    for (var _c = 0, _d = Object.entries(options.customPresets); _c < _d.length; _c++) {
        var _e = _d[_c], i = _e[0], preset = _e[1];
        if (typeof preset[0] !== 'string') {
            throw new Error("\"options.customPresets[".concat(i, "][0]\" is not a string"));
        }
        if (typeof preset[1] !== 'function') {
            throw new Error("\"options.customPresets[".concat(i, "][1]\" is not a function"));
        }
    }
}
exports.validateOptions = validateOptions;
