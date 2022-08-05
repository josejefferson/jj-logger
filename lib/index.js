"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var get_options_1 = __importDefault(require("./get-options"));
var log_to_console_1 = __importDefault(require("./log-to-console"));
var log_to_logger_1 = __importDefault(require("./log-to-logger"));
var presets_1 = __importStar(require("./presets"));
function Logger() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var opts = get_options_1.default.apply(void 0, args);
    function log() {
        var contents = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            contents[_i] = arguments[_i];
        }
        try {
            (0, log_to_console_1.default)(opts, contents);
        }
        catch (err) {
            console.error(err);
        }
        try {
            log_to_logger_1.default.log(opts, contents);
        }
        catch (err) {
            console.error(err);
        }
        return opts;
    }
    (0, presets_1.default)(log, Logger, opts);
    return log;
}
Logger.getLogs = log_to_logger_1.default.getLogs.bind(log_to_logger_1.default);
Logger.presets = presets_1.presets;
Logger.addPreset = presets_1.addPreset;
module.exports = Logger;
