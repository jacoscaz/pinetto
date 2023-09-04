
export type { LoggerOpts, LogWriter, LogLevel, LogArg } from './types.js';

export { BufferedWriter as NodeBufferedWriter } from './writers/node-buffered.js';
export { ConsoleWriter } from './writers/console.js';

import { createLogger, Logger } from './logger.js';

export { createLogger, Logger };

export default createLogger;




