// @jessie-check
import { Far } from '@endo/marshal';

export const start = _zcf => {
  const publicFacet = Far('Getter', {
    get: () => 'Hello, World!',
  });
  return harden({ publicFacet });
};
harden(start);
