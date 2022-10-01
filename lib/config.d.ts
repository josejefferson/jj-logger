import { JJLogger } from './jj-logger';
import type { Config, ILog } from './types';
export declare const defaultLoadFn: () => never;
export declare const defaultSaveFn: () => never;
/**
 * Sets database load function
 */
export declare function setLoadFn(this: JJLogger, fn: Config['loadFn']): void;
/**
 * Sets database save function
 */
export declare function setSaveFn(this: JJLogger, fn: Config['saveFn']): void;
/**
 * Automatically sets Mongoose schema and model
 * @param mongoose Mongoose
 * @returns Schema and Model
 */
export declare function setMongoose(this: JJLogger, mongoose: any): {
    schema: any;
    model: any;
};
/**
 * Sets logger functions from an existing Mongoose model
 * @param model Mongoose model
 */
export declare function setMongooseModel(this: JJLogger, model: any): void;
/**
 * Automatically sets Mongoose schema and model and returns Save function and Load function
 * @param mongoose Mongoose
 * @returns Schema and Model
 */
export declare function useMongoose(mongoose: any): {
    schema: any;
    model: any;
    loadFn: () => Promise<any[]>;
    saveFn: (log: ILog) => Promise<any>;
};
/**
 * Returns logger functions from an existing Mongoose model
 * @param model Mongoose model
 */
export declare function useMongooseModel(model: any): {
    loadFn: () => Promise<any[]>;
    saveFn: (log: ILog) => Promise<any>;
};
/**
 * Automatically sets Sequelize model
 * @param sequelize Sequelize module
 * @param connection Sequelize connection
 * @returns Model
 */
export declare function setSequelize(this: JJLogger, sequelize: any, connection: any): {
    model: any;
};
/**
 * Sets logger functions from an existing Sequelize model
 * @param model Sequelize model
 */
export declare function setSequelizeModel(this: JJLogger, model: any): void;
/**
 * Automatically sets Sequelize model
 * @param sequelize Sequelize module
 * @param connection Sequelize connection
 * @returns Model
 */
export declare function useSequelize(sequelize: any, connection: any): {
    model: any;
    loadFn: () => Promise<any>;
    saveFn: (log: ILog) => any;
};
/**
 * Sets logger functions from an existing Sequelize model
 * @param model Sequelize model
 */
export declare function useSequelizeModel(model: any): {
    loadFn: () => Promise<any>;
    saveFn: (log: ILog) => any;
};
