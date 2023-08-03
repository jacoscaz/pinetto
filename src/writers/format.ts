
import type { LogArg } from '../types';
import { LogLevel } from '../types';

export const LABELS: Record<LogLevel, string> = {
  error: '[ERR]',
  warn: '[WRN]',
  info: '[INF]',
  debug: '[DBG]',
  trace: '[TRC]'
};

const FORMAT_RGXP = /%[sdicobf]/g;

const argToString = (arg: LogArg): string => {
  return String(typeof arg === 'function' ? arg() : arg); 
};

const formatMessage = (message: string, args: LogArg[]): string => {
  if (args.length === 0) {
    return message;
  }
  let count = 0;
  return message.replace(FORMAT_RGXP, (match) => {
    if (count < args.length) {
      return argToString(args[count++]);
    }
    return match;
  });
};

export const format = (level: LogLevel, prefix: string | undefined, message: string, args: LogArg[]): string => {
  return prefix
    ? `${new Date().toISOString()} ${LABELS[level]} ${prefix} ${formatMessage(message, args)}`
    : `${new Date().toISOString()} ${LABELS[level]} ${formatMessage(message, args)}`
  ;
};
