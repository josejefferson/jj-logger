import chalk from 'chalk'
import type { Levels, ILog } from './types'
export declare const LEVELS: Levels[]
/**
 * Retorna true se a string representa um nível
 */
export declare function isLevel(string: string): string is Levels;
/**
 * Retorna true se a string representa uma cor
 */
export declare function isColor(string: string): string is typeof chalk.ForegroundColor;
/**
 * Insere os detalhes do erro dentro do objeto dele
 */
export declare function parseErrors(log: ILog): void;
