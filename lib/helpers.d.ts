import chalk from 'chalk';
import type { ILog, Levels } from './types';
export declare const LEVELS: Levels[];
/**
 * Returns True if the string represents a level
 */
export declare function isLevel(string: string): string is Levels;
/**
 * Returns True if the string represents a color
 */
export declare function isColor(string: string): string is typeof chalk.ForegroundColor;
/**
 * Insert the error details within details object
 */
export declare function parseErrors(log: ILog): void;
