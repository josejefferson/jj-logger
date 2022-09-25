import { setLoadFn, setMongoose, setMongooseModel, setSaveFn, setSequelize, setSequelizeModel } from './config';
import { add } from './presets';
export declare const config: {
    setLoadFn: typeof setLoadFn;
    setSaveFn: typeof setSaveFn;
    setMongoose: typeof setMongoose;
    setMongooseModel: typeof setMongooseModel;
    setSequelize: typeof setSequelize;
    setSequelizeModel: typeof setSequelizeModel;
};
export * from './console';
export * as errors from './errors';
export * from './get-options';
export * as helpers from './helpers';
export * from './log';
export * from './logger';
export * from './middleware';
export * from './types';
export declare const presets: {
    presets: import("./types").Preset[];
    add: typeof add;
};
