
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

In many areas this library stands opposite to [pino][pino], hence the name,
and is nowhere near as production-ready as the latter. 

> **-etto**
>
> forms nouns from nouns, denoting a diminutive
>
> &mdash; [Wikipedia][etto]

You probably should not use this, at least for the time being.

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
logger.info('Hello, world!');

const child = logger.child('child-prefix');
child.info('Hello, world!');

logger.level = 'warn';
child.info('Hello, world!');  // prints nothing
```

Supported levels: `trace`, `debug`, `info`, `warn`, `error`.

## License

MIT

[pino]: https://www.npmjs.com/package/pino`
[etto]: https://en.wiktionary.org/wiki/-etto
