

export interface LogFn<A> {
  (level: string, prefix: string | undefined, ...args: A[]): void;
}

export type Level = 'trace' | 'debug' | 'info' | 'warn' | 'error';
const LEVELS: Level[] = ['trace', 'debug', 'info', 'warn', 'error'];
const noop = () => {};
const empty = Object.create(null);

class LogMethods<A> {

  private _log: LogFn<A>;
  private _level!: Level;

  constructor(log: LogFn<A>, level: Level = 'info') {
    this._log = log;
    this.level = level;
  }

  get level() {
    return this._level;
  }

  set level(value: Level) {
    for (let i = 0, seen = false, level; i < LEVELS.length; i += 1) {
      level = LEVELS[i];
      if (seen || (seen = level === value)) {
        delete this[level];
      } else {
        this[level] = noop;
      }
    }
  }

  error(prefix: string | undefined, ...args: A[]) {
    this._log('[ERR]', prefix, ...args);
  }

  warn(prefix: string | undefined, ...args: A[]) {
    this._log('[WRN]', prefix, ...args);
  }

  info(prefix: string | undefined, ...args: A[]) {
    this._log('[INF]', prefix, ...args);
  }

  debug(prefix: string | undefined, ...args: A[]) {
    this._log('[DBG]', prefix, ...args);
  }

  trace(prefix: string | undefined, ...args: A[]) {
    this._log('[TRC]', prefix, ...args);
  }

}

export interface LoggerOpts<A> {
  log?: LogFn<A>;
  methods?: LogMethods<A>;
  prefix?: string;
  level?: Level;
}

export const defaultLog: LogFn<any> = typeof console === 'undefined'
  ? noop : (level, prefix, ...args) => {
    if (typeof prefix === 'undefined') {
      console.log(new Date().toISOString(), level, ...args);
    } else {
      console.log(new Date().toISOString(), level, prefix, ...args);
    }
  };

export class Logger<A> {

  private readonly _root: boolean;
  private readonly _prefix: string | undefined;
  private readonly _methods: LogMethods<A>;

  constructor(opts: LoggerOpts<A> = empty) {
    const { prefix, log, methods, level } = opts;
    this._root = !methods;
    this._prefix = prefix;
    this._methods = methods || new LogMethods<A>(log || defaultLog);
    if (level) {
      this.level = level;
    }
  }

  get level(): Level {
    return this._methods.level;
  }

  set level(value: Level) {
    if (this._root) {
      this._methods.level = value;
    }
  }

  error(...args: A[]) {
    this._methods.error(this._prefix, ...args);
  }

  warn(...args: A[]) {
    this._methods.warn(this._prefix, ...args);
  }

  info(...args: A[]) {
    this._methods.info(this._prefix, ...args);
  }

  debug(...args: A[]) {
    this._methods.debug(this._prefix, ...args);
  }

  trace(...args: A[]) {
    this._methods.trace(this._prefix, ...args);
  }

  child(prefix: string) {
    return new Logger({ methods: this._methods, prefix: `${this._prefix || ''}${prefix}`});
  }

}



