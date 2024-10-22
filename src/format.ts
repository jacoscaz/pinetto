
import type { LogArg, DatetimeFn, TrailingSpaceString } from './types.js';

import { printf } from './printf/printf.js';

export const format = (datetime: DatetimeFn, level: string, prefix: TrailingSpaceString, message: string, args: LogArg[]): string => {
  return `${datetime()}${level} ${prefix}${printf(message, args)}`;
};
