import { Far } from '@endo/far';

// A Zoe contract is a module that exports a start function
// that defines the contract's API.
export const start = _z => {
  // publicFacet provides public API methods
  // Mark it Far() to allow callers from outside the contract
  // and give it a suggestive interface name for debugging.
  const publicFacet = Far('Hello', {
    greet: who => {
      return `Hello, ${who}!`;
    },
  });

  return { publicFacet };
};
