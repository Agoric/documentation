/**
 * @file Test using bundleSource() on the contract.
 */
// @ts-check

/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test } from '../../prepare-test-env-ava.js';

// #region bundleSourceImports
import bundleSource from '@endo/bundle-source';
import { createRequire } from 'module';
// #endregion bundleSourceImports
import { E } from '@endo/far';
// #region importZoeForTest
import { makeZoeKitForTest } from '@agoric/zoe/tools/setup-zoe.js';
// #endregion importZoeForTest

// #region contractPath
const myRequire = createRequire(import.meta.url);
const contractPath = myRequire.resolve(`../src/offer-up.contract.js`);
// #endregion contractPath

test('bundleSource() bundles the contract for use with zoe', async t => {
  // #region testBundleSource
  const bundle = await bundleSource(contractPath);
  t.is(bundle.moduleFormat, 'endoZipBase64');
  t.log(bundle.endoZipBase64Sha512);
  t.true(bundle.endoZipBase64.length > 10_000);
  // #endregion testBundleSource

  // #region testInstall
  const { zoeService: zoe } = await makeZoeKitForTest();
  const installation = await E(zoe).install(bundle);
  t.log(installation);
  t.is(typeof installation, 'object');
  // #endregion testInstall
});
