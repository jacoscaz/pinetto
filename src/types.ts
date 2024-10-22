

export type BaseLogArg = string | number | boolean | null | undefined;

export type LogArg = BaseLogArg | (() => BaseLogArg);

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

export interface LogWriter {
  write(entry: string): any;
}

export interface LoggerOpts {
  writer?: LogWriter;
  prefix?: string;
  level?: LogLevel;
  datetime?: DatetimeFn;
}

export type TrailingSpaceString<T extends string = string> = `${T} ` | '';

export interface DatetimeFn {
  (): TrailingSpaceString;
}
