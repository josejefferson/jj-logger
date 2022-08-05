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
var chalk_1 = __importDefault(require("chalk"));
/**
 * Printa um log no console
 */
function logToConsole(opts, contents) {
    // Condições para logar no console
    if (!process.env.LOG_ALL && opts.hideConsole)
        return;
    if (!process.env.LOG_ALL &&
        process.env.NODE_ENV === 'production' &&
        opts.hideProduction)
        return;
    contents = __spreadArray([], contents, true);
    // Formata as horas
    var date = new Date(opts.date);
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    var fmtDate = chalk_1.default.gray("".concat(hours, ":").concat(minutes, ":").concat(seconds));
    // Colore os textos
    for (var i in contents) {
        var content = contents[i];
        if (typeof content === 'string' && chalk_1.default[opts.color]) {
            contents[i] = chalk_1.default[opts.color](content);
        }
    }
    // Formata o título
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
    // Imprime
    if (!title)
        console.log.apply(console, __spreadArray([fmtDate], contents, false));
    else
        console.log.apply(console, __spreadArray([fmtDate, title], contents, false));
}
exports.default = logToConsole;
