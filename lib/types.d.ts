import type { ForegroundColor } from 'chalk';
export declare type Colors = typeof ForegroundColor;
export declare type Levels = 'SUCCESS' | 'ERROR' | 'DEBUG' | 'INFO' | 'WARNING';
export interface ILog {
    date: string;
    hideProduction?: boolean;
    hideConsole?: boolean;
    ignoreLogger?: boolean;
    color?: typeof ForegroundColor;
    level?: Levels;
    title?: string;
    code?: any;
    details?: any;
    contents?: any[];
    [key: string]: any;
}
export interface ILogger {
    (...content: any[]): ILog;
    success: (...contents: any[]) => ILog;
    warning: (...contents: any[]) => ILog;
    error: (...contents: any[]) => ILog;
    info: (...contents: any[]) => ILog;
    http: (...contents: any[]) => ILog;
    db: (...contents: any[]) => ILog;
    [key: string]: (...contents: any[]) => ILog;
}
export declare type Config = {
    loadFn: null | (() => Promise<any[]>);
    saveFn: null | ((log: ILog) => Promise<any>);
};
export declare type PresetFunction = (opts: ILog, content: any[]) => {
    params: any[];
    content?: any[];
};
export declare type Preset = [string, PresetFunction];
