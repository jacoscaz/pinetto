
import type { LogArg, LogLevel, TrailingSpaceString } from './types.js';
import type { LogMethods } from './methods.js';

export interface ChildLoggerOpts {
  prefix: TrailingSpaceString;
  methods: LogMethods;
}

export class ChildLogger {

  readonly #prefix: TrailingSpaceString;
  protected readonly _methods: LogMethods;

  constructor(opts: ChildLoggerOpts) {
    const { prefix, methods } = opts;
    this.#prefix = prefix;
    this._methods = methods;
  }

  get level(): LogLevel {
    return this._methods.level;
  }

  error(message: string, ...args: LogArg[]) {
    this._methods.error(this.#prefix, message, args);
  }

  warn(message: string, ...args: LogArg[]) {
    this._methods.warn(this.#prefix, message, args);
  }

  info(message: string, ...args: LogArg[]) {
    this._methods.info(this.#prefix, message, args);
  }

  debug(message: string, ...args: LogArg[]) {
    this._methods.debug(this.#prefix, message, args);
  }

  trace(message: string, ...args: LogArg[]) {
    this._methods.trace(this.#prefix, message, args);
  }

  child(prefix: string) {
    return new ChildLogger({
      methods: this._methods,
      prefix: `${this.#prefix.slice(0, -1)}${prefix} `,
    });
  }

}
