import { Far } from '@endo/far';

export const start = _z => {
  // Contracts can use ordinary variables for state
  // that lasts between transactions.
  let value = 'Hello, World!';
  const publicFacet = Far('ValueCell', {
    get: () => value,
    set: v => (value = v),
  });

  return { publicFacet };
};

// p.s. Fits in a tweet!
// https://twitter.com/DeanTribble/status/1433268983977820161
