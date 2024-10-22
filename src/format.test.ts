
import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { format } from './format.js';
import { datetimeVoid } from './utils.js';

describe('the default formatter', () => {
  it('should format with level info and one arg', () => {
    const formatted = format(datetimeVoid, 'INF', '', 'Hello, %s!', ['World']);
    strictEqual('INF Hello, World!', formatted);
  });
  it('should format with level debug and zero args', () => {
    const formatted = format(datetimeVoid, 'DBG', '', 'Hello, World!', []);
    strictEqual('DBG Hello, World!', formatted);
  });
  it('should invoke arguments wrapped in classic functions', () => {
    const formatted = format(datetimeVoid, 'INF', '', 'Hello, %s!', [function () { return 'World'; }]);
    strictEqual('INF Hello, World!', formatted);
  });
  it('should invoke arguments wrapped in arrow functions', () => {
    const formatted = format(datetimeVoid, 'INF', '', 'Hello, %s!', [() => 'World']);
    strictEqual('INF Hello, World!', formatted);
  });
  it('should use a custom datetime formatter', () => {
    const formatted = format(() => 'foobar ', 'INF', '', 'Hello, World!', []);
    strictEqual('foobar INF Hello, World!', formatted);
  });
});