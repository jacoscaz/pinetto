
import type { LogWriter } from './types.js'

import { strictEqual } from 'node:assert';
import { describe, it, beforeEach, } from 'node:test';

import { Logger, createLogger } from './logger.js';
import { datetimeVoid } from './utils.js';

describe('a logger', () => {

  let output: string | null = null;

  const writer: LogWriter = {
    write(entry: string): any {
      output = entry;
    }
  };

  let logger: Logger;

  beforeEach(() => {
    output = null;
  });

  describe('with log level set at trace', () => {

    beforeEach(() => {
      logger = createLogger({ 
        writer, 
        level: 'trace',
        datetime: datetimeVoid,
      });
    });

    it.only('should pass a message with no params to the writer with level info', () => {
      logger.info('Hello, World!');
      strictEqual(output, 'INF Hello, World!');
    });

    it('should pass a message with one param to the writer with level debug', () => {
      logger.info('Hello, World! %s', 42);
      strictEqual(output, 'INF Hello, World! 42');
    });
  });

  describe('with log level set at info', () => {

    beforeEach(() => {
      logger = createLogger({ 
        writer, 
        level: 'info',
        datetime: datetimeVoid,
      });
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
      strictEqual(output, 'INF Hello, World!');
    });

    it('should write a message with log level warn', () => {
      logger.warn('Hello, World!');
      strictEqual(output, 'WRN Hello, World!');
    });

    it('should write a message with log level error', () => {
      logger.error('Hello, World!');
      strictEqual(output, 'ERR Hello, World!');
    });

  });

  describe('with a custom prefix separator', () => {
    beforeEach(() => {
      logger = createLogger({ 
        writer,
        datetime: datetimeVoid, 
      });
    });

    it ('should correctly format the prefix in a chain of one', () => {
      logger.child('p1').info('Hello, World!');
      strictEqual(output, 'INF p1 Hello, World!');
    });

    it ('should correctly format the prefix in a chain of two', () => {
      logger.child('p1').child('p2').info('Hello, World!');
      strictEqual(output, 'INF p1p2 Hello, World!');
    });
  });

});

