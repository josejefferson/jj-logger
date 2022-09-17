import { ILog } from './types';
export declare class Logs {
    logs: ILog[];
    constructor();
    load(): Promise<ILog | Error | null>;
    save(log: ILog): false | Promise<true | Error>;
    log(opts: ILog, contents: any[]): boolean;
    getLogs(): ILog[];
}
declare const _default: Logs;
export default _default;
