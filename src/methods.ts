
import type { LogArg, LogWriter, LogLevel } from './types';
import { LEVELS, NOOP } from './constants';

export class LogMethods {

  private _writer: LogWriter;
  private _level!: LogLevel;

  constructor(writer: LogWriter, level: LogLevel = 'info') {
    this._writer = writer;
    this.level = level;
  }

  get level() {
    return this._level;
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

  error(prefix: string, message: string, args: LogArg[]) {
    this._writer.write('error', prefix, message, args);
  };

  warn(prefix: string, message: string, args: LogArg[]) {
    this._writer.write('warn', prefix, message, args);
  };

  info(prefix: string, message: string, args: LogArg[]) {
    this._writer.write('info', prefix, message, args);
  };

  debug(prefix: string, message: string, args: LogArg[]) {
    this._writer.write('debug', prefix, message, args);
  };

  trace(prefix: string, message: string, args: LogArg[]) {
    this._writer.write('trace', prefix, message, args);
  };

}
