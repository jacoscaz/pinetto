
import { strictEqual } from 'node:assert';

import { format } from './format.js';

describe('the default formatter', () => {
  it('should format with level info and one arg', () => {
    const formatted = format('info', '', 'Hello, %s!', ['World']);
    strictEqual(formatted.slice(24), ' [INF] Hello, World!');
  });
  it('should format with level debug and zero args', () => {
    const formatted = format('debug', '', 'Hello, World!', []);
    strictEqual(formatted.slice(24), ' [DBG] Hello, World!');
  });
  it('should invoke arguments wrapped in classic functions', () => {
    const formatted = format('info', '', 'Hello, %s!', [function () { return 'World'; }]);
    strictEqual(formatted.slice(24), ' [INF] Hello, World!');
  });
  it('should invoke arguments wrapped in arrow functions', () => {
    const formatted = format('info', '', 'Hello, %s!', [() => 'World']);
    strictEqual(formatted.slice(24), ' [INF] Hello, World!');
  });
});