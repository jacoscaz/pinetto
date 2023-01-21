
import type { LogArg, LogWriter, LogLevel } from '../types';
import { format } from './format';

export class ConsoleWriter implements LogWriter {

  write(level: LogLevel, prefix: string | undefined, message: string, args: LogArg[]): any {
    console[level](format(level, prefix, message, args));
  }

}
