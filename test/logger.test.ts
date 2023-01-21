
import type { LogWriter, LogLevel, LogArg, Logger } from '../dist/cjs'

import { strictEqual, deepStrictEqual } from 'assert';
import pinetto from '../dist/cjs';
import { format } from '../dist/cjs/writers/format';

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
      strictEqual(output!.level, 'info');
      strictEqual(output!.message, 'Hello, World!');
      deepStrictEqual(output!.args, []);
    });

    it('should pass a message with one param to the writer with level debug', () => {
      logger.info('Hello, World!', 42);
      strictEqual(output!.level, 'info');
      strictEqual(output!.message, 'Hello, World!');
      deepStrictEqual(output!.args, [42]);
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
      strictEqual(output!.level, 'info');
    });

    it('should write a message with log level warn', () => {
      logger.warn('Hello, World!');
      strictEqual(output!.level, 'warn');
    });

    it('should write a message with log level error', () => {
      logger.error('Hello, World!');
      strictEqual(output!.level, 'error');
    });

  });

  describe('with a custom prefix separator', () => {
    beforeEach(() => {
      logger = pinetto({ writer, prefixSeparator: '#' });
    });

    it ('should correctly format the prefix in a chain of one', () => {
      logger.child('p1').info('Hello, World!');
      strictEqual(output!.prefix, 'p1');
    });

    it ('should correctly format the prefix in a chain of two', () => {
      logger.child('p1').child('p2').info('Hello, World!');
      strictEqual(output!.prefix, 'p1#p2');
    });
  });

});

describe('the default formatter', () => {
  it('should format with level info and one arg', () => {
    const formatted = format('info', '', 'Hello, %s!', ['World']);
    strictEqual(formatted.slice(24), ' [INF] Hello, World!');
  });
  it('should format with level debug and zero args', () => {
    const formatted = format('debug', '', 'Hello, World!', []);
    strictEqual(formatted.slice(24), ' [DBG] Hello, World!');
  });
});
