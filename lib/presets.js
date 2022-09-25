"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOnFn = exports.add = exports.presets = void 0;
var chalk_1 = __importDefault(require("chalk"));
var LOG = false;
var NO_LOG = true;
var PROD = false;
var DEV = true;
var LOGGER = false;
var NO_LOGGER = true;
exports.presets = [
    [
        'success',
        function (opts) { return ({ params: ['SUCCESS', 'greenBright', PROD, LOG, LOGGER, opts] }); }
    ],
    [
        'warning',
        function (opts) { return ({
            params: ['WARNING', 'yellowBright', PROD, LOG, LOGGER, opts]
        }); }
    ],
    [
        'error',
        function (opts) { return ({ params: ['ERROR', 'redBright', PROD, LOG, LOGGER, opts] }); }
    ],
    [
        'info',
        function (opts) { return ({ params: ['INFO', 'cyanBright', PROD, LOG, LOGGER, opts] }); }
    ],
    ['debug', function (opts) { return ({ params: ['DEBUG', DEV, LOG, NO_LOGGER, opts] }); }],
    [
        'http',
        function (opts, content) {
            var _a, _b, _c, _d;
            var details = content[0];
            (_a = opts.code) !== null && _a !== void 0 ? _a : (opts.code = details.status || '???');
            var status = details.status >= 400 ? chalk_1.default.white(details.status) : details.status;
            var text = "".concat(details.method, " (").concat(status, ") ").concat(details.url, " - ").concat((_b = details.time) !== null && _b !== void 0 ? _b : '???', "ms");
            if ((_c = details.ips) === null || _c === void 0 ? void 0 : _c.length)
                text += ' - ' + ((_d = details.ips) === null || _d === void 0 ? void 0 : _d.join(', '));
            if (details.referer)
                text += ' - ' + details.referer;
            return {
                params: [
                    'HTTP',
                    'INFO',
                    'gray',
                    DEV,
                    !(process.env.LOG_HTTP && NO_LOG),
                    Object.assign(opts, { details: details })
                ],
                content: [text]
            };
        }
    ],
    [
        'db',
        function (opts, content) {
            var details = content[0];
            var text = "".concat(details.event, " - ").concat(details.collection, " - ").concat(details.id);
            return {
                params: [
                    'DB',
                    'INFO',
                    'gray',
                    DEV,
                    !(process.env.LOG_DB && NO_LOG),
                    Object.assign(opts, { details: details })
                ],
                content: [text]
            };
        }
    ]
];
/**
 * Add a Preset
 * @param name Presets name
 * @param fn Presets function
 * @example
 * presets.add('test', (opts, content) => {
 *   return {
 *     params: ['Test title', 'green'], // Logger parameters
 *     content: [] // Replaces the content of the logger (optional)
 *   }
 * })
 *
 * log().test('Hello World')
 */
function add(name, fn) {
    exports.presets.push([name, fn]);
}
exports.add = add;
function setOnFn(log, Logger, opts) {
    var _loop_1 = function (preset) {
        var presetName = preset[0], presetFunction = preset[1];
        log[presetName] = function () {
            var content = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                content[_i] = arguments[_i];
            }
            return Logger.apply(void 0, presetFunction(opts, content).params).apply(void 0, (presetFunction(opts, content).content || content));
        };
    };
    for (var _i = 0, presets_1 = exports.presets; _i < presets_1.length; _i++) {
        var preset = presets_1[_i];
        _loop_1(preset);
    }
}
exports.setOnFn = setOnFn;
