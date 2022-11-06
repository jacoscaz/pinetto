
export type { LoggerOpts, LogWriter } from './types';

export { NodeBufferedWriter } from './writers/node-buffered';
export { ConsoleWriter } from './writers/console';

import { createLogger } from './logger';

export { createLogger };

export default createLogger;




