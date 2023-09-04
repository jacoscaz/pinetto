
# Pinetto

An isomorphic, opinionated logging library that focuses on:

- **Simplicity**: zero runtime dependencies, ~500 LoCs
- **Readability**: produces plain-text, human-readable output
- **Performance**: uses asynchronous logging techniques when possible
- **Child loggers**: supports chained child loggers using prefix concatenation
- **Isomorphism**: supports browsers and server-side runtimes
- **ESM**: ships with separate ESM and CommonJS builds

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

### Supported options

```typescript
const logger = pinetto({
  level: 'debug',
  writer: () => { /* ... */ },
  prefixSeparator: '',
})
```

| Option            | Description                                                                    | Default value                          |
|-------------------|--------------------------------------------------------------------------------|----------------------------------------|
| `level`           | Starting log level, one of `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"` | `"info"`                               |
| `writer`          | A custom log writer function (see below)                                       | Default log writer using `console.log` |
| `prefixSeparator` | A string that is used to concatenate prefixes in chain of child loggers        | `" "`                                  |

### Formatting

`printf`-style syntax is supported:

```typescript
const logger = pinetto({ level: 'debug' });

logger.info('Hello, %s!', 'World');
```

### Log writers

Pinetto ships with two different writers: `ConsoleWriter` and `BufferedWriter`.
The former falls back onto standard `console` logging methods while the latter
flushes log entries to either `console.log()` or `process.stdout.write()` in an
asynchronous fashion, depending on whether a node-like environment is detected.

By default, pinetto will use `BufferedWriter` in node-like environments and
`ConsoleWriter` everywhere else. However, the writer can be manually set via
the respective constructor option:

```typescript
import pinetto, { ConsoleWriter, BufferedWriter } from 'pinetto';

const logger = pinetto({ level: 'debug', writer: new ConsoleWriter() });
```

## License

Pinetto is released under the MIT license.

The following packages have been vendored into pinetto, although slowly
diverging from the respective sources:

- [boolean][bool1] at commit [6af03e40f55ed848eb2d2f84c9d11cd629a94b6d][bool2] (BSD-3-CLAUSE)
- [fast-printf][printf1] at commit [8372e5cbc7d4f16a655fd4c42077db0147c077af][printf2] (MIT)

[bool1]: https://www.npmjs.com/package/boolean
[bool2]: https://github.com/thenativeweb/boolean/tree/6af03e40f55ed848eb2d2f84c9d11cd629a94b6d
[printf1]: https://www.npmjs.com/package/fast-printf
[printf2]: https://github.com/gajus/fast-printf/tree/8372e5cbc7d4f16a655fd4c42077db0147c077af
[pino]: https://www.npmjs.com/package/pino
[etto]: https://en.wiktionary.org/wiki/-etto
