"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.defaultLogger = exports.JJLogger = void 0;
var config_1 = require("./config");
var helpers_1 = require("./helpers");
var log_1 = require("./log");
var logger_1 = require("./logger");
var presets_1 = require("./presets");
var JJLogger = /** @class */ (function () {
    function JJLogger(options) {
        (0, helpers_1.validateOptions)(options);
        this.logs = [];
        this.pendingLogs = [];
        this.loadFn = (options === null || options === void 0 ? void 0 : options.loadFn) || config_1.defaultLoadFn;
        this.saveFn = (options === null || options === void 0 ? void 0 : options.saveFn) || config_1.defaultSaveFn;
        this.presets = __spreadArray(__spreadArray([], ((options === null || options === void 0 ? void 0 : options.presets) || (0, presets_1.defaultPresets)()), true), ((options === null || options === void 0 ? void 0 : options.customPresets) || []), true);
    }
    return JJLogger;
}());
exports.JJLogger = JJLogger;
JJLogger.prototype.setLoadFn = config_1.setLoadFn;
JJLogger.prototype.setSaveFn = config_1.setSaveFn;
JJLogger.prototype.setMongoose = config_1.setMongoose;
JJLogger.prototype.setMongooseModel = config_1.setMongooseModel;
JJLogger.prototype.setSequelize = config_1.setSequelize;
JJLogger.prototype.setSequelizeModel = config_1.setSequelizeModel;
JJLogger.prototype.load = logger_1.load;
JJLogger.prototype.save = logger_1.save;
JJLogger.prototype.logToLogger = logger_1.logToLogger;
JJLogger.prototype.syncPendingLogs = logger_1.syncPendingLogs;
JJLogger.prototype.getLogs = logger_1.getLogs;
JJLogger.prototype.log = log_1.log;
JJLogger.prototype.addPreset = presets_1.add;
JJLogger.prototype.setPresetsOnFn = presets_1.setOnFn;
exports.defaultLogger = createLogger();
function createLogger(options) {
    var logger = new JJLogger(options);
    return {
        instance: logger,
        // loadFn: logger.loadFn,
        // saveFn: logger.saveFn,
        presets: logger.presets,
        setLoadFn: logger.setLoadFn.bind(logger),
        setSaveFn: logger.setSaveFn.bind(logger),
        setMongoose: logger.setMongoose.bind(logger),
        setMongooseModel: logger.setMongooseModel.bind(logger),
        setSequelize: logger.setSequelize.bind(logger),
        setSequelizeModel: logger.setSequelizeModel.bind(logger),
        // load: logger.load.bind(logger) as typeof logger.load,
        // save: logger.save.bind(logger) as typeof logger.save,
        // logToLogger: logger.logToLogger.bind(logger) as typeof logger.logToLogger,
        // syncPendingLogs: logger.syncPendingLogs.bind(logger) as typeof logger.syncPendingLogs,
        getLogs: logger.getLogs.bind(logger),
        log: logger.log.bind(logger),
        addPreset: logger.addPreset.bind(logger),
        // setPresetsOnFn: logger.setPresetsOnFn.bind(logger) as typeof logger.setPresetsOnFn
    };
}
exports.createLogger = createLogger;
