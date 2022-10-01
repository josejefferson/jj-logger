import { JJLogger } from './jj-logger';
/**
 * Express middleware
 */
export declare const logExpress: (instance?: JJLogger) => (req: any, res: any, next: Function) => void;
