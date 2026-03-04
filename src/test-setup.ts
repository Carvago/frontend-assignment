if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = <T>(val: T): T => {
    if (val === undefined) return undefined as T;
    if (val === null) return null as T;
    return JSON.parse(JSON.stringify(val));
  };
}
