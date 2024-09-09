
import type { LogArg, LogWriter, LogLevel, DatetimeFn, TrailingSpaceString } from '../types.js';

import { EMPTY } from '../constants.js';
import { datetimeISO } from '../utils.js';
import { format } from './format.js';

export interface ConsoleWriterOpts {
  stacktrace?: boolean;
  datetime?: DatetimeFn;
}

type ConsoleLogFn = (this: Console, ...data: any[]) => void;

export class ConsoleWriter implements LogWriter {

  readonly #methods: Record<LogLevel, ConsoleLogFn>;
  readonly #datetime: DatetimeFn;

  constructor(opts: ConsoleWriterOpts = EMPTY) {
    this.#methods = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
      trace: opts.stacktrace ? console.trace : console.log,
    };
    this.#datetime = opts.datetime ?? datetimeISO;
  }

  write(level: LogLevel, prefix: TrailingSpaceString, message: string, args: LogArg[]): any {
    this.#methods[level].call(console, format(this.#datetime, level, prefix, message, args));
  }

}
