/* global lockdown */
/**
 * @file The `lockdown()` options call excerpted by
 *   main/guides/js-programming/hardened-js.md. Run as its own Node process
 *   by snippets/js-programming/test-hardened-js-types.js, because a realm
 *   may only be locked down once and the AVA realm already is.
 */
// #region lockdownOptions
import 'ses';

lockdown({
  errorTaming: 'unsafe-debug',
  overrideTaming: 'min',
});
// #endregion lockdownOptions

console.log(
  JSON.stringify({
    objectPrototypeFrozen: Object.isFrozen(Object.prototype),
    stackIsReadable: typeof Error('sample').stack === 'string',
  }),
);
