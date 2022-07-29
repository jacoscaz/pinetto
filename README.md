
# Pinetto

An isomorphic, opinionated logging library that focuses on:

- **Simplicity**: one source file, zero runtime dependencies.
- **Inspectability**: the default logging function passes its arguments as they
  are to `console.log()`, which facilitates inspection in IDEs and produces 
  plain-text, human-readable output.
- **Child loggers**: comes with baked-in support for child loggers based on
  prefix concatenation.
- **Customization**: the default logging function can be overridden to
  customize all logging behavior.
- **Isomorphism**: support browsers and server-side runtimes (Node, Deno, Bun)
  through separate ES and CommonJS builds.

## Etymology

In many areas this library stands opposite to [pino][pino], hence the name.

> **-etto**
>
> forms nouns from nouns, denoting a diminutive
>
> &mdash; [Wikipedia][etto]

## Usage

Within ES modules:

```typescript
import pinetto from 'pinetto';
```

Within CommonJS modules:

```javascript
const { default: pinetto } = require('pinetto');
```

Basic usage:

```typescript
const logger = pinetto({ level: 'debug' });
const child = logger.child('child-prefix');

logger.info('Hello, world!'); // prints hello world
child.debug('Hello, world!'); // prints hello world

logger.level = 'warn';        // log level can be changed at runtime
                              // the change propagates to child loggers

child.info('Hello, world!');  // prints nothing
```

Custom logging function:

```typescript
const logger = pinetto({ 
  log: (label, prefix, ...args) => {
    console.log('I only print the first argument', args[0]);
  }, 
});

logger.info('first', 'second', 'third'); // prints "I only ... first"
```

Supported levels: `trace`, `debug`, `info`, `warn`, `error`.

## License

MIT

[pino]: https://www.npmjs.com/package/pino`
[etto]: https://en.wiktionary.org/wiki/-etto
