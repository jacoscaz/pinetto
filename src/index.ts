
export type { LoggerOpts, LogWriter, LogLevel, LogArg } from './types.js';

export { BufferedWriter } from './writers/buffered.js';
export { ConsoleWriter } from './writers/console.js';

import { createLogger, Logger } from './logger.js';

export { createLogger, Logger };

export default createLogger;




