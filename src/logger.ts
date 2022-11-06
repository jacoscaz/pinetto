
import type { LoggerOpts, LogLevel } from './types';
import { LogMethods } from './methods';
import { EMPTY } from './constants'
import { DefaultWriter } from './writers/default';
import { ChildLogger } from './child';

export class Logger extends ChildLogger {

  constructor(opts: LoggerOpts = EMPTY) {
    const { prefix, level, writer } = opts;
    const methods = new LogMethods(writer || new DefaultWriter(), level);
    super({ methods, prefix });
  }

  set level(value: LogLevel) {
    this._methods.level = value;
  }

}

export const createLogger = (opts: LoggerOpts = EMPTY) => {
  return new Logger(opts);
};
