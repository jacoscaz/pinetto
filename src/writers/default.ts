
import type { LogWriter } from '../types.js';
import { IS_NODE } from '../constants.js';
import { BufferedWriter } from './node-buffered.js';
import { ConsoleWriter } from './console.js';

export const DefaultWriter: new () => LogWriter = IS_NODE ? BufferedWriter : ConsoleWriter;
