
import type { LogArg, LogLevel } from './types';
import type { LogMethods } from './methods';

export interface ChildLoggerOpts {
  prefix?: string;
  methods: LogMethods;
}

export class ChildLogger {

  protected readonly _prefix: string;
  protected readonly _methods: LogMethods;

  constructor(opts: ChildLoggerOpts) {
    const { prefix, methods } = opts;
    this._prefix = prefix || '';
    this._methods = methods;
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
    return new ChildLogger({ methods: this._methods, prefix: `${this._prefix}${prefix}`});
  }

}
