"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logExpress = void 0;
var log_1 = require("./log");
/**
 * Express middleware
 */
var logExpress = function () { return function (req, res, next) {
    next();
    res.on('finish', function () {
        var _a, _b;
        (_b = (_a = (0, log_1.log)()).http) === null || _b === void 0 ? void 0 : _b.call(_a, {
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
}; };
exports.logExpress = logExpress;
