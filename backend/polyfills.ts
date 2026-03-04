import util from 'util';

// Polyfills for util.is* functions removed in Node.js v25+, required by nedb
const polyfills: Record<string, (v: unknown) => boolean> = {
  isArray: (v) => Array.isArray(v),
  isDate: (v) => v instanceof Date,
  isRegExp: (v) => v instanceof RegExp,
  isBoolean: (v) => typeof v === 'boolean',
  isNumber: (v) => typeof v === 'number',
  isString: (v) => typeof v === 'string',
  isNull: (v) => v === null,
  isUndefined: (v) => v === undefined,
  isObject: (v) => v !== null && typeof v === 'object',
  isBuffer: (v) => Buffer.isBuffer(v),
};

for (const [name, fn] of Object.entries(polyfills)) {
  if (!(util as any)[name]) {
    (util as any)[name] = fn;
  }
}
