import { Far } from '@endo/far';

// #region startfn
export const start = () => {
  let value = 'Hello, World!';
  const get = () => value;
  const set = v => (value = v);

  return {
    publicFacet: Far('ValueCell', { get, set }),
  };
};
// #endregion startfn
