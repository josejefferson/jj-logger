"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.getLogs = exports.logs = exports.Logger = void 0;
var config_1 = require("./config");
var errors_1 = require("./errors");
var helpers_1 = require("./helpers");
var Logger = /** @class */ (function () {
    function Logger() {
        this.logs = [];
        this.pendingLogs = [];
    }
    /**
     * Loads the database logs
     * @param sync Send failed logs to the database
     * @returns Logs
     */
    Logger.prototype.load = function (sync) {
        if (sync === void 0) { sync = true; }
        return __awaiter(this, void 0, void 0, function () {
            var logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sync) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.syncPendingLogs()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, (0, config_1.load)()];
                    case 3:
                        logs = _a.sent();
                        this.logs = logs;
                        this.logs.sort(function (a, b) {
                            if (!a || !b || (a && !a.date) || (b && !b.date))
                                return 0;
                            return Number(new Date(b.date)) - Number(new Date(a.date));
                        });
                        return [2 /*return*/, this.logs];
                }
            });
        });
    };
    /**
     * Saves the log into the database
     * @param log Log
     */
    Logger.prototype.save = function (log) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!log)
                            return [2 /*return*/, Promise.resolve(false)];
                        return [4 /*yield*/, (0, config_1.save)(log)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Create a log and sends it to the database
     * @param opts Log options
     * @param contents Contents of log
     */
    Logger.prototype.log = function (opts, contents) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (opts.ignoreLogger)
                            return [2 /*return*/, Promise.resolve(false)];
                        if (contents)
                            opts.contents = contents;
                        (0, helpers_1.parseErrors)(opts);
                        this.logs.unshift(opts);
                        if (process.env.NODE_ENV !== 'production')
                            return [2 /*return*/, Promise.resolve(false)];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.save(opts)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        err_1 = _a.sent();
                        this.pendingLogs.push(opts);
                        if (err_1 instanceof errors_1.MissingFunctionError)
                            return [2 /*return*/];
                        console.error(err_1);
                        return [2 /*return*/, err_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sends the failed logs to the database
     */
    Logger.prototype.syncPendingLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pendingLogs, promises;
            return __generator(this, function (_a) {
                pendingLogs = __spreadArray([], this.pendingLogs, true);
                this.pendingLogs = [];
                promises = pendingLogs.map(this.log.bind(this));
                return [2 /*return*/, Promise.all(promises)];
            });
        });
    };
    /**
     * Returns the Log array
     * @param fetch Force the fetch of the database logs
     * @returns Log array
     */
    Logger.prototype.getLogs = function (fetch) {
        if (fetch === void 0) { fetch = false; }
        return fetch ? this.load() : Promise.resolve(this.logs);
    };
    return Logger;
}());
exports.Logger = Logger;
/**
 * Saved logs
 */
exports.logs = new Logger();
/**
 * Returns the Log array
 * @param fetch Force the fetch of the database logs
 * @returns Log array
 */
exports.getLogs = exports.logs.getLogs.bind(exports.logs);
