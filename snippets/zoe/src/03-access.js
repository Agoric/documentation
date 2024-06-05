// #region access-contract
import { Far } from '@endo/far';

export const start = () => {
  let value = 'Hello, World!';
  const get = () => value;
  const set = v => (value = v);

  return {
    publicFacet: Far('ValueView', { get }),
    creatorFacet: Far('ValueCell', { get, set }),
  };
};
// #endregion access-contract
