// @ts-check

import '@agoric/zoe/exported.js';

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
