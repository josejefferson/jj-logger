import type { Config, ILog } from './types';
export declare const config: Config;
/**
 * Sets database load function
 */
export declare function setLoadFn(fn: Config['loadFn']): void;
/**
 * Sets database save function
 */
export declare function setSaveFn(fn: Config['saveFn']): void;
/**
 * Automatically sets Mongoose schema and model
 * @param mongoose Mongoose
 * @returns Schema and Model
 */
export declare function setMongoose(mongoose: any): {
    schema: any;
    model: any;
};
/**
 * Sets logger functions from an existing Mongoose model
 * @param model Mongoose model
 */
export declare function setMongooseModel(model: any): void;
/**
 * Automatically sets Sequelize model
 * @param sequelize Sequelize module
 * @param connection Sequelize connection
 * @returns Model
 */
export declare function setSequelize(sequelize: any, connection: any): {
    model: any;
};
/**
 * Sets logger functions from an existing Sequelize model
 * @param model Sequelize model
 */
export declare function setSequelizeModel(model: any): void;
/**
 * Run the database load function
 */
export declare function load(): Promise<any[]>;
/**
 * Run the database save function
 */
export declare function save(log: ILog): Promise<any>;
