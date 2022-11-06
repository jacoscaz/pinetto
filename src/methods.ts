
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
        this[level] = (prefix: string, message: string, args: LogArg[]) => {
          this._writer.write(level, prefix, message, args);
        };
      } else {
        this[level] = NOOP;
      }
    }
  }

  error!: (prefix: string, message: string, args: LogArg[]) => void;
  warn!: (prefix: string, message: string, args: LogArg[]) => void;
  info!: (prefix: string, message: string, args: LogArg[]) => void;
  debug!: (prefix: string, message: string, args: LogArg[]) => void;
  trace!: (prefix: string, message: string, args: LogArg[]) => void;

}
