
import type { LogArg, LogLevel } from '../types.js';

import { printf } from '../printf/printf.js';

export const LABELS: Record<LogLevel, string> = {
  error: '[ERR]',
  warn: '[WRN]',
  info: '[INF]',
  debug: '[DBG]',
  trace: '[TRC]'
};

export const format = (level: LogLevel, prefix: string | undefined, message: string, args: LogArg[]): string => {
  return prefix
    ? `${new Date().toISOString()} ${LABELS[level]} ${prefix} ${printf(message, args)}`
    : `${new Date().toISOString()} ${LABELS[level]} ${printf(message, args)}`
  ;
};
