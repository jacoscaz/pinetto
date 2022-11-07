
import type { LogWriter, LogLevel, LogArg, Logger } from '../dist/cjs'

import { strictEqual, deepStrictEqual } from 'assert';
import pinetto from '../dist/cjs';

interface LogParams {
  level: LogLevel,
  prefix: string,
  message: string,
  args: LogArg[],
}

describe('a logger', () => {

  let output: LogParams | null = null;

  const writer: LogWriter = {
    write(level: LogLevel, prefix: string, message: string, args: LogArg[]): any {
      output = { level, prefix, message, args };
    }
  };

  let logger: Logger;

  beforeEach(() => {
    output = null;
  });

  describe('with log level set at trace', () => {

    beforeEach(() => {
      logger = pinetto({ writer, level: 'trace' });
    });

    it('should pass a message with no params to the writer with level info', () => {
      logger = pinetto({ writer });
      logger.info('Hello, World!');
      strictEqual(output?.level, 'info');
      strictEqual(output?.message, 'Hello, World!');
      deepStrictEqual(output?.args, []);
    });

    it('should pass a message with one param to the writer with level debug', () => {
      logger.info('Hello, World!', 42);
      strictEqual(output?.level, 'info');
      strictEqual(output?.message, 'Hello, World!');
      deepStrictEqual(output?.args, [42]);
    });
  });

  describe('with log level set at info', () => {

    beforeEach(() => {
      logger = pinetto({ writer, level: 'info' });
    });

    it('should not write a message with log level trace', () => {
      logger.trace('Hello, World!');
      strictEqual(output, null);
    });

    it('should not write a message with log level debug', () => {
      logger.debug('Hello, World!');
      strictEqual(output, null);
    });

    it('should write a message with log level info', () => {
      logger.info('Hello, World!');
      strictEqual(output?.level, 'info');
    });

    it('should write a message with log level warn', () => {
      logger.warn('Hello, World!');
      strictEqual(output?.level, 'warn');
    });

    it('should write a message with log level error', () => {
      logger.error('Hello, World!');
      strictEqual(output?.level, 'error');
    });

  });

});
