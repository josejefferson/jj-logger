"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logExpress = void 0;
var jj_logger_1 = require("./jj-logger");
/**
 * Express middleware
 */
var logExpress = function (instance) {
    if (instance === void 0) { instance = jj_logger_1.defaultLogger.instance; }
    return function (req, res, next) {
        next();
        res.on('finish', function () {
            var _a, _b;
            (_b = (_a = instance.log()).http) === null || _b === void 0 ? void 0 : _b.call(_a, {
                body: req.body,
                hostname: req.hostname,
                ips: req.ips,
                userAgent: req.headers['user-agent'] || null,
                method: req.method,
                url: req.originalUrl,
                referer: req.headers.referrer || req.headers.referer || req.headers.origin,
                time: res.time,
                status: res.statusCode
            });
        });
    };
};
exports.logExpress = logExpress;
