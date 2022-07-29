import { Logger } from './dist/index.js';

const logger = new Logger({ level: 'debug' });
logger.info('Hello, world!');

const child = logger.child('child-prefix');
child.info('Hello, world!');

logger.level = 'warn';
child.info('Hello, world!');
