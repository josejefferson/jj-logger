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
export declare type ILogReturnPromise = Promise<any> & {
    opts?: ILog;
};
export declare type ILogReturn = Promise<any> & {
    opts: ILog;
};
export interface ILogger {
    (...content: any[]): ILogReturn;
    success: (...contents: any[]) => ILogReturn;
    warning: (...contents: any[]) => ILogReturn;
    error: (...contents: any[]) => ILogReturn;
    info: (...contents: any[]) => ILogReturn;
    http: (...contents: any[]) => ILogReturn;
    db: (...contents: any[]) => ILogReturn;
    [key: string]: (...contents: any[]) => ILogReturn;
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
