
# Pinetto

An isomorphic, opinionated logging library that focuses on:

- **Simplicity**: zero runtime dependencies, ~500 LoCs
- **Readability**: produces plain-text, human-readable output
- **Performance**: uses asynchronous logging techniques when possible
- **Child loggers**: supports chained child loggers using prefix concatenation
- **Isomorphism**: supports browsers and server-side runtimes
- **ESM**: ships with separate ESM and CommonJS builds
- **Flexibility**: log level can be changed at runtime

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
const root = pinetto({ level: 'debug' });
root.info('Hello, %s!', 'World');
// => 2024-09-09T19:05:28.884Z INF Hello, World!

const child = logger.child('[foo]');
child.debug('Hello, %s!', () => 'World');
// => 2024-09-09T19:06:02.643Z INF [foo] Hello, World!

const grandchild = child.child('[bar]');
grandchild.debug('Hello, %s!', 'World');
// => 2024-09-09T19:06:02.643Z INF [foo][bar] Hello, World!

// The log level can be changed at runtime and the change
// propagates to child loggers.
logger.level = 'warn';        
child.info('Hello, world!'); 
// => <prints nothing>
```

### Supported options

| Option | Description | Default value |
| --- | --- | --- |
| `level` | Starting log level, one of `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"` | `"info"` |
| `writer` | Log writer function (see below) | Depends on the environment |
| `datetime` | A function that returns a date/time string (see below) | `datetimeISO` |

### String formatting

`printf`-style syntax is supported:

```typescript
const logger = pinetto({ level: 'debug' });

logger.info('Hello, %s!', 'World');
```

### Date/time

The `datetime` option may be used to customize whether and how each log line
will be prefixed with a date/time string:

```typescript
const logger = pinetto({ 
  level: 'debug',
  datetime: () => `${new Date().getFullYear()} `,
});

logger.info('Hello, %s!', 'World');
// => 2024 INF Hello, World!
```

Pinetto ships with two datetime functions: `datetimeVoid`, which returns an
empty string, and `datetimeISO`, which returns an [ISO 8601][iso8601] string
(well, technically it's the [RFC 3339][rfc3339] string returned by 
`Date#toISOString`).

Note that datetime functions **must return a string that ends with a space
character**.

[iso8601]: https://en.wikipedia.org/wiki/ISO_8601
[rfc3339]: https://www.rfc-editor.org/rfc/rfc3339

### Functions as arguments

If a log argument is provided in the form of a function it will invoked
only when the log triggers and its return value will be passed to the
formatter.

This helps with reducing the number of expensive serialization operations,
such as `JSON.stringify()`, taking place even when the log level is such
that the result of the serialization will never be used:

```typescript
logger.level = 'warn';
logger.info('Foo %s', () => JSON.serialize({ bar: 42 }));
// JSON.serialize() will never be invoked
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

Pinetto is released under [the MIT license][license].

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
[license]: ./LICENSE
