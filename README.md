
# Pinetto

An opinionated logging library that focuses on:

- **Simplicity**: one source file, zero runtime dependencies.
- **Inspectability**: the default logging function passes its arguments as they
  are to `console.log()`, which facilitates inspection in IDEs and produces 
  plain-text, human-readable output.
- **Child loggers**: comes with baked-in support for child loggers based on
  prefix concatenation.
- **Customization**: the default logging function can be overridden to
  customize all logging behavior.

In many areas this library stands opposite to [pino][pino], hence the name,
and is nowhere near as production-ready as the latter. 

You probably should not use this, at least for the time being.

## Usage

```typescript
import { Logger } from 'pinetto'; 

const logger = new Logger({ level: 'debug' });
logger.info('Hello, world!');

const child = logger.child('child-prefix');
child.info('Hello, world!');

logger.level = 'warn';
child.info('Hello, world!');
```

## License

MIT

[pino]: https://www.npmjs.com/package/pino`


