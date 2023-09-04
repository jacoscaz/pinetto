
import type { LogArg, LogWriter, LogLevel } from '../types.js';

import { EMPTY } from '../constants.js';
import { format } from './format.js';

export interface ConsoleWriterOpts {
  stacktrace?: boolean;
}

type ConsoleLogFn = (this: Console, ...data: any[]) => void;

export class ConsoleWriter implements LogWriter {

  private readonly _methods: Record<LogLevel, ConsoleLogFn>;

  constructor(opts: ConsoleWriterOpts = EMPTY) {
    this._methods = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
      trace: opts.stacktrace ? console.trace : console.log,
    };
  }

  write(level: LogLevel, prefix: string | undefined, message: string, args: LogArg[]): any {
    this._methods[level].call(console, format(level, prefix, message, args));
  }

}
