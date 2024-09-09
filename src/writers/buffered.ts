
import type { LogArg, LogWriter, LogLevel, DatetimeFn, TrailingSpaceString } from '../types.js';
import { format } from './format.js';
import { EMPTY, RESOLVED, IS_NODE } from '../constants.js';
import { datetimeISO } from '../utils.js';

export interface BufferedWriterOpts {
  maxBufferLength?: number;
  flushTimeout?: number;
  datetime?: DatetimeFn;
}

export class BufferedWriter implements LogWriter {

  #buffer: string;
  #timeout: any;
  #flushing: boolean;
  #datetime: DatetimeFn;
  readonly #write: (str: string) => any;
  readonly #maxBufferLength: number;
  readonly #flushTimeout: number;

  constructor(opts: BufferedWriterOpts = EMPTY) {
    this.#buffer = '';
    this.#timeout = null;
    this.#flushing = false;
    this.#maxBufferLength = typeof opts.maxBufferLength === 'number' ? opts.maxBufferLength as number : 8192;
    this.#flushTimeout = typeof opts.maxBufferLength === 'number' ? opts.flushTimeout as number : 250;
    this._flush = this._flush.bind(this);
    this.#write = IS_NODE ? process.stdout.write.bind(process.stdout) : console.log.bind(console);
    this.#datetime = opts.datetime ?? datetimeISO;
  }

  private _flush() {
    this.#write(this.#buffer);
    this.#buffer = '';
    if (this.#timeout) {
      clearTimeout(this.#timeout);
      this.#timeout = null;
    }
    this.#flushing = false;
  }

  write(level: LogLevel, prefix: TrailingSpaceString, message: string, args: LogArg[]): any {
    this.#buffer += format(this.#datetime, level, prefix, message, args) + '\n';
    if (!this.#flushing) {
      if (this.#buffer.length >= this.#maxBufferLength) {
        this.#flushing = true;
        RESOLVED.then(this._flush);
      } else if (this.#timeout === null) {
        this.#flushing = true;
        this.#timeout = setTimeout(this._flush, this.#flushTimeout);
      }
    }
  }

}
