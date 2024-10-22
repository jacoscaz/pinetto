
import type { LogArg, LogWriter, LogLevel, TrailingSpaceString, DatetimeFn } from './types.js';

import { LEVELS, NOOP } from './constants.js';
import { format } from './format.js';

export class LogMethods {

  #level!: LogLevel;
  #writer: LogWriter;
  #datetime: DatetimeFn;

  constructor(writer: LogWriter, level: LogLevel = 'info', datetime: DatetimeFn) {
    this.#writer = writer;
    this.level = level;
    this.#datetime = datetime;
  }

  get level() {
    return this.#level;
  }

  set level(value: LogLevel) {
    for (let i = 0, seen = false, level: LogLevel; i < LEVELS.length; i += 1) {
      level = LEVELS[i];
      if (seen || (seen = level === value)) {
        this[level] = LogMethods.prototype[level];
      } else {
        this[level] = NOOP;
      }
    }
  }

  error(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write(format(this.#datetime, 'ERR', prefix, message, args));
  };

  warn(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write(format(this.#datetime, 'WRN', prefix, message, args));
  };

  info(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write(format(this.#datetime, 'INF', prefix, message, args));
  };

  debug(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write(format(this.#datetime, 'DBG', prefix, message, args));
  };

  trace(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write(format(this.#datetime, 'TRC', prefix, message, args));
  };

}
