export interface LogFn {
    (level: string, prefix: string | undefined, ...args: any[]): void;
}
export declare type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error';
declare class LogMethods {
    private _log;
    private _level;
    constructor(log: LogFn, level?: Level);
    get level(): Level;
    set level(value: Level);
    error(prefix: string | undefined, ...args: any[]): void;
    warn(prefix: string | undefined, ...args: any[]): void;
    info(prefix: string | undefined, ...args: any[]): void;
    debug(prefix: string | undefined, ...args: any[]): void;
    trace(prefix: string | undefined, ...args: any[]): void;
}
export interface LoggerOpts {
    log?: LogFn;
    methods?: LogMethods;
    prefix?: string;
    level?: Level;
}
export declare const defaultLog: LogFn;
export declare class Logger {
    private readonly _root;
    private readonly _prefix;
    private readonly _methods;
    constructor(opts?: LoggerOpts);
    get level(): Level;
    set level(value: Level);
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
    child(prefix: string): Logger;
}
export declare const createLogger: (opts?: LoggerOpts) => Logger;
export default createLogger;
//# sourceMappingURL=index.d.ts.map