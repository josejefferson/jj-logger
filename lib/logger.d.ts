import type { ILog } from './types';
export declare class Logger {
    logs: ILog[];
    constructor();
    /**
     * Loads the database logs
     * @returns Logs
     */
    load(): Promise<ILog[] | null>;
    /**
     * Saves the log into the database
     * @param log Log
     */
    save(log: ILog): Promise<boolean>;
    /**
     * Create a log and sends it to the database
     * @param opts Log options
     * @param contents Contents of log
     */
    log(opts: ILog, contents: any[]): boolean;
    /**
     * Returns the Log array
     * @param fetch Force the fetch of the database logs
     * @returns Log array
     */
    getLogs(fetch?: boolean): Promise<ILog[]>;
}
/**
 * Saved logs
 */
export declare const logs: Logger;
/**
 * Returns the Log array
 * @param fetch Force the fetch of the database logs
 * @returns Log array
 */
export declare const getLogs: typeof logs['getLogs'];
