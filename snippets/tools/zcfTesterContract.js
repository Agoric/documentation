// @ts-check

/**
 * @typedef {import('@agoric/zoe/src/types-index.js').ContractStartFn} ContractStartFn
 */

/**
 * Tests ZCF
 *
 * @type {ContractStartFn}
 */
const start = zcf => {
  // make the `zcf` available to the tests
  zcf.setTestJig();
  return {};
};

harden(start);
export { start };
