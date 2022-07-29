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
export declare const defaultLog: LogFn;
interface ChildLoggerOpts {
    prefix?: string;
    methods: LogMethods;
}
declare class ChildLogger {
    protected readonly _prefix: string | undefined;
    protected readonly _methods: LogMethods;
    constructor(opts: ChildLoggerOpts);
    get level(): Level;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
    child(prefix: string): ChildLogger;
}
export interface LoggerOpts {
    log?: LogFn;
    prefix?: string;
    level?: Level;
}
export declare class Logger extends ChildLogger {
    constructor(opts?: LoggerOpts);
    set level(value: Level);
}
export declare const createLogger: (opts?: LoggerOpts) => Logger;
export default createLogger;
//# sourceMappingURL=index.d.ts.map