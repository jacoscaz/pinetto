
import type { LogLevel } from './types'

export const LEVELS: LogLevel[] = ['trace', 'debug', 'info', 'warn', 'error'];

export const NOOP = () => {};

export const EMPTY = Object.create(null);

export const RESOLVED = Promise.resolve();
