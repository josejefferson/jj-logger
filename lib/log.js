"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var console_1 = require("./console");
var get_options_1 = require("./get-options");
var logger_1 = require("./logger");
var presets_1 = require("./presets");
/**
 * Create a logger
 *
 * @example
 * log('Title', 'CODE', 'yellow', 'warning')('Contents here...')
 * log('Title', 'CODE').warning('Contents here...')
 */
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var opts = get_options_1.getOptions.apply(void 0, args);
    var executeLog = function () {
        var contents = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            contents[_i] = arguments[_i];
        }
        var logSaveResolve;
        var logReturn = new Promise(function (resolve) {
            logSaveResolve = resolve;
        });
        opts.date = new Date().toISOString();
        logReturn.opts = opts;
        try {
            (0, console_1.logToConsole)(opts, contents);
        }
        catch (err) {
            console.error(err);
        }
        try {
            logger_1.logs.log(opts, contents).then(logSaveResolve);
        }
        catch (err) {
            console.error(err);
        }
        return logReturn;
    };
    (0, presets_1.setOnFn)(executeLog, log, opts);
    return executeLog;
}
exports.log = log;
