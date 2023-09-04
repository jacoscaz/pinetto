
import type { LoggerOpts, LogLevel } from './types.js';
import { LogMethods } from './methods.js';
import { EMPTY } from './constants.js'
import { DefaultWriter } from './writers/default.js';
import { ChildLogger } from './child.js';

export class Logger extends ChildLogger {

  constructor(opts: LoggerOpts = EMPTY) {
    const { level, writer, prefixSeparator } = opts;
    const methods = new LogMethods(writer || new DefaultWriter(), level);
    super({ methods, prefixSeparator });
  }

  set level(value: LogLevel) {
    this._methods.level = value;
  }

}

export const createLogger = (opts: LoggerOpts = EMPTY) => {
  return new Logger(opts);
};
