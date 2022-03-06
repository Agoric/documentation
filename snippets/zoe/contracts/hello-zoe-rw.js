// @jessie-check
import { Far } from '@endo/marshal';

export const start = _zcf => {
  let value = 'Hello, World!';
  const publicFacet = Far('Getter', {
    get: () => value,
  });
  const creatorFacet = Far('Setter', {
    set: v => (value = v),
  });
  return harden({ creatorFacet, publicFacet });
};
harden(start);
