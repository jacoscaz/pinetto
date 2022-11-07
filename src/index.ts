
export type { LoggerOpts, LogWriter, LogLevel, LogArg } from './types';

export { NodeBufferedWriter } from './writers/node-buffered';
export { ConsoleWriter } from './writers/console';

import { createLogger, Logger } from './logger';

export { createLogger, Logger };

export default createLogger;




