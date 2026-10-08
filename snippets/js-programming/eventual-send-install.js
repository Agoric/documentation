// @jessie-check
/* eslint-disable import/order, import/first, import/no-duplicates --
   an excerpted region keeps each example's own imports adjacent to the code
   they support, so imports and statements interleave here on purpose.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file The `installBundleID` example excerpted by
 *   main/guides/js-programming/eventual-send.md. It lives in its own module
 *   because it imports `E` from `@endo/eventual-send`, while the rest of the
 *   page's examples import the same name from `@endo/far`.
 */
import { zoe, bundleId } from './zoe-for-examples.js';

// #region installBundleId
import { E } from '@endo/eventual-send';

const installationP = E(zoe)
  .installBundleID(bundleId)
  .then(installation => {
    console.log('installed', installation);
    return installation;
  })
  .catch(reason => {
    console.error('installation failed', reason);
    throw reason;
  });
// #endregion installBundleId

export { installationP };
