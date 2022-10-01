"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = exports.config = exports.log = exports.getLogs = exports.instance = exports.helpers = exports.errors = void 0;
var jj_logger_1 = require("./jj-logger");
var config_1 = require("./config");
__exportStar(require("./console"), exports);
exports.errors = __importStar(require("./errors"));
__exportStar(require("./get-options"), exports);
exports.helpers = __importStar(require("./helpers"));
__exportStar(require("./middleware"), exports);
__exportStar(require("./types"), exports);
exports.instance = jj_logger_1.defaultLogger.instance;
exports.getLogs = jj_logger_1.defaultLogger.getLogs;
exports.log = jj_logger_1.defaultLogger.log;
exports.config = {
    setLoadFn: jj_logger_1.defaultLogger.setLoadFn,
    setSaveFn: jj_logger_1.defaultLogger.setSaveFn,
    setMongoose: jj_logger_1.defaultLogger.setMongoose,
    setMongooseModel: jj_logger_1.defaultLogger.setMongooseModel,
    setSequelize: jj_logger_1.defaultLogger.setSequelize,
    setSequelizeModel: jj_logger_1.defaultLogger.setSequelizeModel,
    useMongoose: config_1.useMongoose,
    useMongooseModel: config_1.useMongooseModel,
    useSequelize: config_1.useSequelize,
    useSequelizeModel: config_1.useSequelizeModel
};
exports.presets = {
    presets: jj_logger_1.defaultLogger.presets,
    add: jj_logger_1.defaultLogger.addPreset
};
