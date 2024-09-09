
import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { format } from './format.js';
import { datetimeVoid } from '../utils.js';

describe('the default formatter', () => {
  it('should format with level info and one arg', () => {
    const formatted = format(datetimeVoid, 'info', '', 'Hello, %s!', ['World']);
    strictEqual('INF Hello, World!', formatted);
  });
  it('should format with level debug and zero args', () => {
    const formatted = format(datetimeVoid, 'debug', '', 'Hello, World!', []);
    strictEqual('DBG Hello, World!', formatted);
  });
  it('should invoke arguments wrapped in classic functions', () => {
    const formatted = format(datetimeVoid, 'info', '', 'Hello, %s!', [function () { return 'World'; }]);
    strictEqual('INF Hello, World!', formatted);
  });
  it('should invoke arguments wrapped in arrow functions', () => {
    const formatted = format(datetimeVoid, 'info', '', 'Hello, %s!', [() => 'World']);
    strictEqual('INF Hello, World!', formatted);
  });
  it('should use a custom datetime formatter', () => {
    const formatted = format(() => 'foobar ', 'info', '', 'Hello, World!', []);
    strictEqual('foobar INF Hello, World!', formatted);
  });
});