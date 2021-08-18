import { E } from '@agoric/eventual-send';
import bundleSource from '@agoric/bundle-source';

import { makeZoeKit } from '@agoric/zoe';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';

const contractRoot = `${__dirname}/zcfTesterContract`;

export const setupZCFTest = async (issuerKeywordRecord, terms) => {
  /** @type {ContractFacet} */
  let zcf;
  const setZCF = jig => {
    zcf = jig.zcf;
  };
  // The contract provides the `zcf` via `setTestJig` upon `start`.
  const { zoeService } = makeZoeKit(makeFakeVatAdmin(setZCF).admin);
  const feePurse = E(zoeService).makeFeePurse();
  const zoe = E(zoeService).bindDefaultFeePurse(feePurse);
  const bundle = await bundleSource(contractRoot);
  const installation = await E(zoe).install(bundle);
  const { creatorFacet, instance } = await E(zoe).startInstance(
    installation,
    issuerKeywordRecord,
    terms,
  );
  return { zoe, zcf, instance, installation, creatorFacet };
};
