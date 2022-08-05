"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
var config_1 = require("./config");
var errors_1 = require("./errors");
var helpers_1 = require("./helpers");
var Logs = /** @class */ (function () {
    function Logs() {
        this.logs = [];
        this.logsForUpload = [];
        this.load();
        if (process.env.NODE_ENV === 'production') {
            setInterval(this.save.bind(this), 60000);
        }
    }
    Logs.prototype.load = function () {
        var _this = this;
        return (0, config_1.load)()
            .then(function (logs) {
            var _a;
            (_a = _this.logs).unshift.apply(_a, logs);
            return logs;
        })
            .catch(function (err) {
            if (err instanceof errors_1.MissingFunctionError)
                return err;
            console.error(err);
            return err;
        });
    };
    Logs.prototype.save = function () {
        var _this = this;
        if (!this.logsForUpload.length)
            return false;
        return (0, config_1.save)(this.logsForUpload)
            .then(function () {
            _this.logsForUpload = [];
            return true;
        })
            .catch(function (err) {
            if (err instanceof errors_1.MissingFunctionError)
                return err;
            console.error(err);
            return err;
        });
    };
    Logs.prototype.log = function (opts, contents) {
        if (opts.ignoreLogger)
            return false;
        opts.contents = contents;
        (0, helpers_1.parseErrors)(opts);
        this.logs.push(opts);
        this.logsForUpload.push(opts);
    };
    Logs.prototype.getLogs = function () {
        return this.logs;
    };
    return Logs;
}());
exports.Logs = Logs;
exports.default = new Logs();
