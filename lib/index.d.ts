import { useMongoose, useMongooseModel, useSequelize, useSequelizeModel } from './config';
export * from './console';
export * as errors from './errors';
export * from './get-options';
export * as helpers from './helpers';
export * from './middleware';
export * from './types';
export declare const instance: import("./jj-logger").JJLogger;
export declare const getLogs: typeof import("./logger").getLogs;
export declare const log: typeof import("./log").log;
export declare const config: {
    setLoadFn: typeof import("./config").setLoadFn;
    setSaveFn: typeof import("./config").setSaveFn;
    setMongoose: typeof import("./config").setMongoose;
    setMongooseModel: typeof import("./config").setMongooseModel;
    setSequelize: typeof import("./config").setSequelize;
    setSequelizeModel: typeof import("./config").setSequelizeModel;
    useMongoose: typeof useMongoose;
    useMongooseModel: typeof useMongooseModel;
    useSequelize: typeof useSequelize;
    useSequelizeModel: typeof useSequelizeModel;
};
export declare const presets: {
    presets: import("./types").Preset[];
    add: typeof import("./presets").add;
};
