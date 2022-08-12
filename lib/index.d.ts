declare function Logger(...args: any[]): any;
declare namespace Logger {
    var getLogs: any;
    var presets: [string, (opts: import("./types").ILog, content: any[]) => {
        params: any[];
        content?: any[];
    }][];
    var addPreset: typeof import("./presets").addPreset;
}
export = Logger;
