
export type { LoggerOpts, LogWriter, LogLevel, LogArg } from './types.js';

export { BufferedWriter } from './writers/buffered.js';
export { ConsoleWriter } from './writers/console.js';
export { ProcessWriter } from './writers/process.js';

export { datetimeISO, datetimeVoid } from './utils.js';

import { createLogger, Logger } from './logger.js';

export { createLogger, Logger };

export default createLogger;




