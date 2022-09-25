import type { ILogger } from './types';
/**
 * Create a logger
 *
 * @example
 * log('Title', 'CODE', 'yellow', 'warning')('Contents here...')
 * log('Title', 'CODE').warning('Contents here...')
 */
export declare function log(...args: any[]): ILogger;
