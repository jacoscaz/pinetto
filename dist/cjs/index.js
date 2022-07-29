"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.Logger = exports.defaultLog = void 0;
const LEVELS = ['trace', 'debug', 'info', 'warn', 'error'];
const noop = () => { };
const empty = Object.create(null);
class LogMethods {
    constructor(log, level = 'info') {
        this._log = log;
        this.level = level;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        for (let i = 0, seen = false, level; i < LEVELS.length; i += 1) {
            level = LEVELS[i];
            if (seen || (seen = level === value)) {
                delete this[level];
            }
            else {
                this[level] = noop;
            }
        }
    }
    error(prefix, ...args) {
        this._log('[ERR]', prefix, ...args);
    }
    warn(prefix, ...args) {
        this._log('[WRN]', prefix, ...args);
    }
    info(prefix, ...args) {
        this._log('[INF]', prefix, ...args);
    }
    debug(prefix, ...args) {
        this._log('[DBG]', prefix, ...args);
    }
    trace(prefix, ...args) {
        this._log('[TRC]', prefix, ...args);
    }
}
exports.defaultLog = typeof console === 'undefined'
    ? noop : (level, prefix, ...args) => {
    if (typeof prefix === 'undefined') {
        console.log(new Date().toISOString(), level, ...args);
    }
    else {
        console.log(new Date().toISOString(), level, prefix, ...args);
    }
};
class ChildLogger {
    constructor(opts) {
        const { prefix, methods } = opts;
        this._prefix = prefix;
        this._methods = methods;
    }
    get level() {
        return this._methods.level;
    }
    error(...args) {
        this._methods.error(this._prefix, ...args);
    }
    warn(...args) {
        this._methods.warn(this._prefix, ...args);
    }
    info(...args) {
        this._methods.info(this._prefix, ...args);
    }
    debug(...args) {
        this._methods.debug(this._prefix, ...args);
    }
    trace(...args) {
        this._methods.trace(this._prefix, ...args);
    }
    child(prefix) {
        return new ChildLogger({ methods: this._methods, prefix: `${this._prefix || ''}${prefix}` });
    }
}
class Logger extends ChildLogger {
    constructor(opts = empty) {
        const { prefix, log, level } = opts;
        const methods = new LogMethods(log || exports.defaultLog, level);
        super({ methods, prefix });
    }
    set level(value) {
        this._methods.level = value;
    }
}
exports.Logger = Logger;
const createLogger = (opts = empty) => {
    return new Logger(opts);
};
exports.createLogger = createLogger;
exports.default = exports.createLogger;
//# sourceMappingURL=index.js.map