
import type { LogWriter } from '../types.js';
import { EMPTY, RESOLVED, IS_NODE, EOL } from '../constants.js';

export interface BufferedWriterOpts {
  maxBufferLength?: number;
  flushTimeout?: number;
}

export class BufferedWriter implements LogWriter {

  #buffer: string;
  #timeout: any;
  #flushing: boolean;
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
    this.#write = IS_NODE 
      ? (entry: string) => {
          process.stdout.write(entry);
          process.stdout.write(EOL.value);
        }
      : console.log.bind(console)
    ;
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

  write(entry: string): any {
    this.#buffer += entry + EOL.value;
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
