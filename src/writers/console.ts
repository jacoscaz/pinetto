
import type { LogWriter } from '../types.js';

export class ConsoleWriter implements LogWriter {

  write(entry: string): any {
    console.log(entry);
  }

}
