
import type { LogArg, LogLevel } from './types';
import type { LogMethods } from './methods';

export interface ChildLoggerOpts {
  prefix?: string;
  methods: LogMethods;
  prefixSeparator?: string;
}

export class ChildLogger {

  protected readonly _prefix: string | undefined;
  protected readonly _methods: LogMethods;
  protected readonly _prefixSeparator: string;

  constructor(opts: ChildLoggerOpts) {
    const { prefix, methods, prefixSeparator } = opts;
    this._prefix = prefix;
    this._methods = methods;
    this._prefixSeparator = typeof prefixSeparator === 'string' ? prefixSeparator : ' ';
  }

  get level(): LogLevel {
    return this._methods.level;
  }

  error(message: string, ...args: LogArg[]) {
    this._methods.error(this._prefix, message, args);
  }

  warn(message: string, ...args: LogArg[]) {
    this._methods.warn(this._prefix, message, args);
  }

  info(message: string, ...args: LogArg[]) {
    this._methods.info(this._prefix, message, args);
  }

  debug(message: string, ...args: LogArg[]) {
    this._methods.debug(this._prefix, message, args);
  }

  trace(message: string, ...args: LogArg[]) {
    this._methods.trace(this._prefix, message, args);
  }

  child(prefix: string) {
    return new ChildLogger({
      methods: this._methods,
      prefix: typeof this._prefix === 'string' ? `${this._prefix}${this._prefixSeparator}${prefix}` : prefix,
      prefixSeparator: this._prefixSeparator,
    });
  }

}
