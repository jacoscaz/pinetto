
import type { LogWriter } from '../types.js';

import { EOL, IS_NODE } from '../constants.js';

export class ProcessWriter implements LogWriter {

  constructor() {
    if (!IS_NODE) {
      throw new Error('Cannot use ProcessWriter(): Node.js not detected');
    }
  }

  write(entry: string): any {
    process.stdout.write(entry);
    process.stdout.write(EOL.value);
  }

}
