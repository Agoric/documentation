// @jessie-check
/**
 * @file The defensively-typed counter excerpted by
 *   main/guides/js-programming/hardened-js.md.
 */
// #region defensiveCounter
import { Nat } from '@endo/nat';

/** @param {number | bigint} init */
const makeCounter = init => {
  let value = Nat(init);
  return harden({
    increment: () => {
      value += 1n;
      return value;
    },
  });
};
// #endregion defensiveCounter

export { makeCounter };
