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
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.load = exports.setSequelizeModel = exports.setSequelize = exports.setMongooseModel = exports.setMongoose = exports.setSaveFn = exports.setLoadFn = exports.config = void 0;
var errors_1 = require("./errors");
exports.config = {
    loadFn: null,
    saveFn: null
};
/**
 * Sets database load function
 */
function setLoadFn(fn) {
    if (typeof fn !== 'function') {
        throw new Error('Invalid function');
    }
    exports.config.loadFn = fn;
}
exports.setLoadFn = setLoadFn;
/**
 * Sets database save function
 */
function setSaveFn(fn) {
    if (typeof fn !== 'function') {
        throw new Error('Invalid function');
    }
    exports.config.saveFn = fn;
}
exports.setSaveFn = setSaveFn;
/**
 * Automatically sets Mongoose schema and model
 * @param mongoose Mongoose
 * @returns Schema and Model
 */
function setMongoose(mongoose) {
    var existingModel = mongoose.models['Log'];
    if (existingModel) {
        setMongooseModel(existingModel);
        return { schema: existingModel.schema, model: existingModel };
    }
    var schema = new mongoose.Schema({ date: { type: Date, expires: 604800 } }, { strict: false });
    var model = mongoose.model('Log', schema);
    setMongooseModel(model);
    return { schema: schema, model: model };
}
exports.setMongoose = setMongoose;
/**
 * Sets logger functions from an existing Mongoose model
 * @param model Mongoose model
 */
function setMongooseModel(model) {
    var _this = this;
    exports.config.loadFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(model.db.readyState !== 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) { return model.db.once('connected', resolve); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, model.find.apply(model, args)];
                }
            });
        });
    };
    exports.config.saveFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(model.db.readyState !== 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) { return model.db.once('connected', resolve); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, model.create.apply(model, args)];
                }
            });
        });
    };
}
exports.setMongooseModel = setMongooseModel;
/**
 * Automatically sets Sequelize model
 * @param sequelize Sequelize module
 * @param connection Sequelize connection
 * @returns Model
 */
function setSequelize(sequelize, connection) {
    var model = connection.define('Log', {
        id: {
            type: sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: sequelize.DataTypes.TEXT
        }
    });
    setSequelizeModel(model);
    return { model: model };
}
exports.setSequelize = setSequelize;
/**
 * Sets logger functions from an existing Sequelize model
 * @param model Sequelize model
 */
function setSequelizeModel(model) {
    var _this = this;
    exports.config.loadFn = function () { return __awaiter(_this, void 0, void 0, function () {
        var logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.findAll()];
                case 1:
                    logs = _a.sent();
                    return [2 /*return*/, logs
                            .map(function (log) {
                            try {
                                return JSON.parse(log.content);
                            }
                            catch (_a) {
                                return null;
                            }
                        })
                            .filter(function (log) { return log; })];
            }
        });
    }); };
    exports.config.saveFn = function (log) {
        return model.create({
            content: JSON.stringify(log)
        });
    };
}
exports.setSequelizeModel = setSequelizeModel;
/**
 * Run the database load function
 */
function load() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!exports.config.loadFn) {
                throw new errors_1.MissingFunctionError('No load function');
            }
            return [2 /*return*/, exports.config.loadFn()];
        });
    });
}
exports.load = load;
/**
 * Run the database save function
 */
function save(log) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!exports.config.saveFn) {
                throw new errors_1.MissingFunctionError('No save function');
            }
            return [2 /*return*/, exports.config.saveFn(log)];
        });
    });
}
exports.save = save;
