
import type { LogWriter } from '../types.js';

import { EOL, IS_NODE } from '../constants.js';

interface WriteStream {
  write(data: string): any;
}

const getStream = (stream: 'stdout' | 'stderr' | WriteStream): WriteStream => {
  switch (stream) {
    case 'stdout':
      return process.stdout;
    case 'stderr':
      return process.stderr;
    default:
      return stream;
  }
};

export class ProcessWriter implements LogWriter {

  #stream: WriteStream;

  constructor(stream: 'stdout' | 'stderr' | WriteStream = 'stdout') {
    if (!IS_NODE) {
      throw new Error('Cannot use ProcessWriter(): Node.js not detected');
    }
    this.#stream = getStream(stream);
  }

  write(entry: string): any {
    this.#stream.write(entry);
    this.#stream.write(EOL.value);
  }

}
