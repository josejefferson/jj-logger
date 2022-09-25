import type { ILog, Preset, PresetFunction } from './types';
export declare const presets: Preset[];
/**
 * Add a Preset
 * @param name Presets name
 * @param fn Presets function
 * @example
 * presets.add('test', (opts, content) => {
 *   return {
 *     params: ['Test title', 'green'], // Logger parameters
 *     content: [] // Replaces the content of the logger (optional)
 *   }
 * })
 *
 * log().test('Hello World')
 */
export declare function add(name: string, fn: PresetFunction): void;
export declare function setOnFn(log: any, Logger: any, opts: ILog): void;
