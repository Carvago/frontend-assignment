// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill for environments that don't support structuredClone (e.g. older Node/jsdom)
if (typeof globalThis.structuredClone === 'undefined') {
  (globalThis as typeof globalThis & {structuredClone: (obj: unknown) => unknown}).structuredClone =
    function structuredClone<T>(obj: T): T {
      if (obj === undefined) return undefined as T;
      try {
        return JSON.parse(JSON.stringify(obj)) as T;
      } catch {
        return obj;
      }
    };
}
