
import type { LogWriter } from '../types';
import { NodeBufferedWriter } from './node-buffered';
import { ConsoleWriter } from './console';

const isNode = typeof process !== 'undefined'
  && process.release?.name === 'node';

export const DefaultWriter: new () => LogWriter = isNode ? NodeBufferedWriter : ConsoleWriter;
