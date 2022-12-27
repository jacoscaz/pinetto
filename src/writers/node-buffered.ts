
import type { LogArg, LogWriter, LogLevel } from '../types';
import { format } from '../format';
import { EMPTY, RESOLVED } from '../constants';

export interface NodeBufferedWriterOpts {
  maxBufferLength?: number;
  flushTimeout?: number;
}

export class NodeBufferedWriter implements LogWriter {

  private _buffer: string;
  private _timeout: any;
  private _flushing: boolean;
  private readonly _maxBufferLength: number;
  private readonly _flushTimeout: number;

  constructor(opts: NodeBufferedWriterOpts = EMPTY) {
    this._buffer = '';
    this._timeout = null;
    this._flushing = false;
    this._maxBufferLength = typeof opts.maxBufferLength === 'number' ? opts.maxBufferLength as number : 8192;
    this._flushTimeout = typeof opts.maxBufferLength === 'number' ? opts.flushTimeout as number : 250;
    this._flush = this._flush.bind(this);
  }

  private _flush() {
    process.stdout.write(this._buffer);
    this._buffer = '';
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    this._flushing = false;
  }

  write(level: LogLevel, prefix: string | undefined, message: string, args: LogArg[]): any {
    this._buffer += format(level, prefix, message, args) + '\n';
    if (!this._flushing) {
      if (this._buffer.length >= this._maxBufferLength) {
        this._flushing = true;
        RESOLVED.then(this._flush);
      } else if (this._timeout === null) {
        this._flushing = true;
        this._timeout = setTimeout(this._flush, this._flushTimeout);
      }
    }
  }
}
