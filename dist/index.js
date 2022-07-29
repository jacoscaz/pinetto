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
export const defaultLog = typeof console === 'undefined'
    ? noop : (level, prefix, ...args) => {
    if (typeof prefix === 'undefined') {
        console.log(new Date().toISOString(), level, ...args);
    }
    else {
        console.log(new Date().toISOString(), level, prefix, ...args);
    }
};
export class Logger {
    constructor(opts = empty) {
        const { prefix, log, methods, level } = opts;
        this._root = !methods;
        this._prefix = prefix;
        this._methods = methods || new LogMethods(log || defaultLog);
        if (level) {
            this.level = level;
        }
    }
    get level() {
        return this._methods.level;
    }
    set level(value) {
        if (this._root) {
            this._methods.level = value;
        }
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
        return new Logger({ methods: this._methods, prefix: `${this._prefix || ''}${prefix}` });
    }
}
export const createLogger = (opts = empty) => {
    return new Logger(opts);
};
export default createLogger;
//# sourceMappingURL=index.js.map