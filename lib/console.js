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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logToConsole = void 0;
var chalk_1 = __importDefault(require("chalk"));
/**
 * Display the log in the console
 */
function logToConsole(opts, contents) {
    // Conditions for logging into the console
    if (!process.env.LOG_ALL && opts.hideConsole)
        return;
    if (!process.env.LOG_ALL &&
        process.env.NODE_ENV === 'production' &&
        opts.hideProduction)
        return;
    contents = __spreadArray([], contents, true);
    // Format the time
    var date = new Date(opts.date);
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    var fmtDate = chalk_1.default.gray("".concat(day, "/").concat(month, " ").concat(hours, ":").concat(minutes, ":").concat(seconds));
    // Color the texts
    for (var i in contents) {
        var content = contents[i];
        if (typeof content === 'string' && chalk_1.default[opts.color]) {
            contents[i] = chalk_1.default[opts.color](content);
        }
    }
    // Format the title
    var title = null;
    if (typeof opts.title === 'string') {
        title = chalk_1.default.underline(opts.title);
        if (opts.ignoreLogger)
            title = '!' + title;
        if (opts.hideConsole)
            title = '(' + title + ')';
        title += ':';
        if (opts.hideProduction)
            title += '*';
    }
    // Print
    if (!title)
        console.log.apply(console, __spreadArray([fmtDate], contents, false));
    else
        console.log.apply(console, __spreadArray([fmtDate, title], contents, false));
}
exports.logToConsole = logToConsole;
