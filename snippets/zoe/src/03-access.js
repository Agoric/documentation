import { Far } from '@endo/far';

export const start = _z => {
  let value = 'Hello, World!';

  // We can limit the public API to read-only
  // by omitting the set() method
  const publicFacet = Far('ValueView', {
    get: () => value,
  });

  // The creatorFacet is provided only to the
  // caller of E(zoe).startInstance()
  const creatorFacet = Far('ValueCell', {
    get: () => value,
    set: v => (value = v),
  });

  return { publicFacet, creatorFacet };
};
