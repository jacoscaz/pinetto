
import type { LoggerOpts, LogLevel } from './types.js';
import { LogMethods } from './methods.js';
import { EMPTY, IS_NODE } from './constants.js';
import { ChildLogger } from './child.js';
import { BufferedWriter } from './writers/buffered.js';
import { ConsoleWriter } from './writers/console.js';

const DefaultWriter = IS_NODE ? BufferedWriter : ConsoleWriter;

export class Logger extends ChildLogger {

  constructor(opts: LoggerOpts = EMPTY) {
    const { level, writer, datetime, prefix } = opts;
    const methods = new LogMethods(writer || new DefaultWriter({ datetime }), level);
    super({ methods, prefix: prefix?.length ? `${prefix} ` : '' });
  }

  set level(value: LogLevel) {
    this._methods.level = value;
  }

}

export const createLogger = (opts: LoggerOpts = EMPTY) => {
  return new Logger(opts);
};
