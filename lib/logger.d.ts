import { ILog } from './types';
import { JJLogger } from './jj-logger';
/**
 * Loads the database logs
 * @param sync Send failed logs to the database
 * @returns Logs
 */
export declare function load(this: JJLogger, sync?: boolean): Promise<ILog[] | null>;
/**
 * Saves the log into the database
 * @param log Log
 */
export declare function save(this: JJLogger, log: ILog): Promise<boolean>;
/**
 * Create a log and sends it to the database
 * @param opts Log options
 * @param contents Contents of log
 */
export declare function logToLogger(this: JJLogger, opts: ILog, contents?: any[]): Promise<any>;
/**
 * Sends the failed logs to the database
 */
export declare function syncPendingLogs(this: JJLogger): Promise<unknown[]>;
/**
 * Returns the Log array
 * @param fetch Force the fetch of the database logs
 * @returns Log array
 */
export declare function getLogs(this: JJLogger, fetch?: boolean): Promise<ILog[]>;
