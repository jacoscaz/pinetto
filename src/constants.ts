
import type { LogLevel } from './types.js'

export const LEVELS: LogLevel[] = ['trace', 'debug', 'info', 'warn', 'error'];

export const NOOP = () => {};

export const EMPTY = Object.create(null);

export const RESOLVED = Promise.resolve();

export const IS_NODE = typeof process !== 'undefined'
  && process.release.name === 'node';

export const EOL = { value: '\n' };

if (IS_NODE) {
  import('node:os').then(({ EOL: _EOL }) => {
      EOL.value = _EOL;
  });
}
