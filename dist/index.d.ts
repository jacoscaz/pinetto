export interface LogFn<A> {
    (level: string, prefix: string | undefined, ...args: A[]): void;
}
export declare type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error';
declare class LogMethods<A> {
    private _log;
    private _level;
    constructor(log: LogFn<A>, level?: Level);
    get level(): Level;
    set level(value: Level);
    error(prefix: string | undefined, ...args: A[]): void;
    warn(prefix: string | undefined, ...args: A[]): void;
    info(prefix: string | undefined, ...args: A[]): void;
    debug(prefix: string | undefined, ...args: A[]): void;
    trace(prefix: string | undefined, ...args: A[]): void;
}
export interface LoggerOpts<A> {
    log?: LogFn<A>;
    methods?: LogMethods<A>;
    prefix?: string;
    level?: Level;
}
export declare const defaultLog: LogFn<any>;
export declare class Logger<A> {
    private readonly _root;
    private readonly _prefix;
    private readonly _methods;
    constructor(opts?: LoggerOpts<A>);
    get level(): Level;
    set level(value: Level);
    error(...args: A[]): void;
    warn(...args: A[]): void;
    info(...args: A[]): void;
    debug(...args: A[]): void;
    trace(...args: A[]): void;
    child(prefix: string): Logger<A>;
}
export declare const createLogger: <A = any>(opts: LoggerOpts<A>) => Logger<A>;
export default createLogger;
//# sourceMappingURL=index.d.ts.map