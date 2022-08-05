import { ILog } from './types';
declare type PresetFunction = (opts: ILog, content: any[]) => {
    params: any[];
    content?: any[];
};
declare type Preset = [string, PresetFunction];
export declare const presets: Preset[];
export declare function addPreset(name: string, fn: PresetFunction): void;
export default function setPresets(log: any, Logger: any, opts: ILog): void;
export {};
