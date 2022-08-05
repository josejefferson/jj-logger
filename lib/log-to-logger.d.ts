import { ILog } from './types'
export declare class Logs {
	logs: ILog[]
	logsForUpload: ILog[]
	constructor();
	load(): Promise<ILog | Error | null>;
	save(): false | Promise<true | Error>;
	log(opts: ILog, contents: any[]): boolean;
	getLogs(): ILog[];
}
declare const _default: Logs
export default _default
