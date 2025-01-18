
# CHANGELOG

## 4.0.0

### Changed

- **[breaking]** This package is now an ESM-only package, having dropped the
  dual CJS+ESM builds.

### Added

- `ProcessWriter()` now accepts a parameter to specify which stream it should
  write to (`"stdout"`, `"stderr"` or an instance of `stream.Writable`).

## 3.0.0

### Changed

- *[internal]* Defaults to non-buffering writers in all runtimes. Buffering
  should be an opt-in feature due to the confusion it can create due to the
  altering of message ordering when pinetto is not the only thing that writes
  to stdout / console.log.
- **[breaking]** Refactors the `LogWriter` interface to centralize formatting
  in loggers rather than delegating to writers.
