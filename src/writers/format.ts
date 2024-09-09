
import type { LogArg, LogLevel, DatetimeFn, TrailingSpaceString } from '../types.js';

import { printf } from '../printf/printf.js';

export const LABELS: Record<LogLevel, string> = {
  error: 'ERR',
  warn: 'WRN',
  info: 'INF',
  debug: 'DBG',
  trace: 'TRC'
};

export const format = (datetime: DatetimeFn, level: LogLevel, prefix: TrailingSpaceString, message: string, args: LogArg[]): string => {
  return `${datetime()}${LABELS[level]} ${prefix}${printf(message, args)}`;
};
