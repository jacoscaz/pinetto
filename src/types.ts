

export type LogArg = string | number | boolean | null | undefined;

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

export interface LogWriter {
  write(level: LogLevel, prefix: string, message: string, args: LogArg[]): any;
}

export interface LoggerOpts {
  writer?: LogWriter;
  prefix?: string;
  level?: LogLevel;
}




