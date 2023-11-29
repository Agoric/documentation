// #region contract
import { Far } from '@endo/far';

// #region greet
const greet = who => `Hello, ${who}!`;
// #endregion greet

// #region start
export const start = () => {
  // #endregion start
  // #region publicFacet
  return {
    publicFacet: Far('Hello', { greet }),
  };
  // #endregion publicFacet
};
// #endregion contract
