
# Pinetto

An isomorphic, opinionated logging library that focuses on:

- **Simplicity**: zero runtime dependencies, ~300 LoCs.
- **Readability**: produces plain-text, human-readable output.
- **Performance**: uses asynchronous logging techniques when possible.
- **Child loggers**: supports child loggers based on prefix concatenation.
- **Customization**: the default log writer can be overridden to customize
  logging behavior.
- **Isomorphism**: supports browsers and server-side runtimes.
- **ESM**: ships with separate ESM and CommonJS builds.

## Etymology

In many areas this library stands opposite to [pino][pino], hence the name.

> **-etto**
>
> forms nouns from nouns, denoting a diminutive
>
> &mdash; [Wikipedia][etto]

## Usage

### Within ES modules

```typescript
import pinetto from 'pinetto';
```

### Within CommonJS modules

```javascript
const { default: pinetto } = require('pinetto');
```

### Basic usage

```typescript
const logger = pinetto({ level: 'debug' });
const child = logger.child('child-prefix');

logger.info('Hello, world!'); // prints hello world
child.debug('Hello, world!'); // prints hello world

logger.level = 'warn';        // log level can be changed at runtime
                              // the change propagates to child loggers

child.info('Hello, world!');  // prints nothing
```

### Templating & Formatting

The default formatter support a minimal printf-style templating syntax:

```typescript
const logger = pinetto({ level: 'debug' });

logger.info('Hello, %s!', 'World');
```

### Custom log writer

```typescript
import pinetto, { LogWriter } from 'pinetto';

const writer: LogWriter = {
  write(level, prefix, message, args) {
    console.log('I only print the first argument:', args[0]);
  },
};

const logger = pinetto({ level: 'debug', writer });

logger.info('one', 'two', 'three'); // prints "I only ... one"
```

### Supported levels

`trace`, `debug`, `info`, `warn`, `error`.

## License

MIT

[pino]: https://www.npmjs.com/package/pino`
[etto]: https://en.wiktionary.org/wiki/-etto
