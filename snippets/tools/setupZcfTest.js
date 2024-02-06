import { E } from '@endo/eventual-send';
import bundleSource from '@endo/bundle-source';

import { createRequire } from 'module';
import { makeZoeKit } from '@agoric/zoe';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';

const nodeRequire = createRequire(import.meta.url);

export const setupZCFTest = async (issuerKeywordRecord, terms) => {
  const contractRoot = await nodeRequire.resolve('./zcfTesterContract.js');
  /** @type {ContractFacet} */
  let zcf;
  const setZCF = jig => {
    zcf = jig.zcf;
  };
  // The contract provides the `zcf` via `setTestJig` upon `start`.
  const { zoeService: zoe } = makeZoeKit(makeFakeVatAdmin(setZCF).admin);
  const bundle = await bundleSource(contractRoot);
  const installation = await E(zoe).install(bundle);
  const { creatorFacet, instance } = await E(zoe).startInstance(
    installation,
    issuerKeywordRecord,
    terms,
  );
  return { zoe, zcf, instance, installation, creatorFacet };
};
