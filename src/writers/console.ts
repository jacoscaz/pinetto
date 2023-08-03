
import type { LogArg, LogWriter, LogLevel } from '../types';

import { EMPTY } from '../constants';
import { format } from './format';

export interface ConsoleWriterOpts {
  stacktrace?: boolean;
}

export class ConsoleWriter implements LogWriter {
  
  private stacktrace: boolean;

  constructor(opts: ConsoleWriterOpts = EMPTY) {
    this.stacktrace = typeof opts.stacktrace === 'boolean' ? opts.stacktrace : true;
  }

  write(level: LogLevel, prefix: string | undefined, message: string, args: LogArg[]): any {
    if (level !== 'trace') {
      console[level](format(level, prefix, message, args));
    } else {
      console[this.stacktrace ? 'trace' : 'log'](format(level, prefix, message, args));
    }
  }

}
