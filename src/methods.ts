
import type { LogArg, LogWriter, LogLevel, TrailingSpaceString } from './types.js';
import { LEVELS, NOOP } from './constants.js';

export class LogMethods {

  #writer: LogWriter;
  #level!: LogLevel;

  constructor(writer: LogWriter, level: LogLevel = 'info') {
    this.#writer = writer;
    this.level = level;
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
    this.#writer.write('error', prefix, message, args);
  };

  warn(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write('warn', prefix, message, args);
  };

  info(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write('info', prefix, message, args);
  };

  debug(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write('debug', prefix, message, args);
  };

  trace(prefix: TrailingSpaceString, message: string, args: LogArg[]) {
    this.#writer.write('trace', prefix, message, args);
  };

}
