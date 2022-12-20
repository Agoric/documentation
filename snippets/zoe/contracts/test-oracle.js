// @ts-check

/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test } from '../../prepare-test-env-ava.js';

import url from 'url';
import { resolve as importMetaResolve } from 'import-meta-resolve';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import { makeZoeKit } from '@agoric/zoe';
import bundleSource from '@endo/bundle-source';
import { makeIssuerKit, AssetKind, AmountMath } from '@agoric/ertp';
import { assert, details } from '@agoric/assert';
import { E } from '@endo/eventual-send';
import { Far } from '@endo/marshal';

test('oracle contract', async t => {
  const { zoeService: zoe } = makeZoeKit(makeFakeVatAdmin().admin);

  // #region bundle
  const contractUrl = await importMetaResolve(
    '@agoric/zoe/src/contracts/oracle.js',
    import.meta.url,
  );
  const contractPath = url.fileURLToPath(contractUrl);
  const contractBundle = await bundleSource(contractPath);
  const installation = await E(zoe).install(contractBundle);
  // #endregion bundle

  const {
    mint: linkMint,
    issuer: linkIssuer,
    brand: linkBrand,
  } = makeIssuerKit('$LINK', AssetKind.NAT);

  const feeAmount = AmountMath.make(linkBrand, 1000n);

  const reply = 42;

  const oracleHandler = Far('oracleHandler', {
    async onQuery(query, fee) {
      let requiredFee;
      if (query.kind === 'Paid') {
        requiredFee = feeAmount;
        assert(
          AmountMath.isGTE(fee, requiredFee),
          details`Minimum fee of ${feeAmount} not met; have ${fee}`,
        );
      }
      return harden({ reply, requiredFee });
    },
    async onError(_query, _reason) {
      // do nothing
    },
    async onReply(_query, _reply, _fee) {
      // do nothing
    },
  });

  // #region startInstance
  const { creatorFacet, publicFacet } = await E(zoe).startInstance(
    installation,
    { Fee: linkIssuer },
  );
  // #endregion startInstance

  // #region initialize
  const initializedCreatorFacet = await E(creatorFacet).initialize({
    oracleHandler,
  });
  // #endregion initialize

  // #region freeQuery
  const response = await E(publicFacet).query(
    'What is the answer to the Ultimate Question of Life, the Universe, and Everything?',
  );
  // response = 42
  // #endregion freeQuery

  t.is(response, 42);

  const link = AmountMath.make(linkBrand, 1n);

  const linkPayment = linkMint.mintPayment(link);

  // #region paidQuery
  const queryInvitation = E(publicFacet).makeQueryInvitation(
    'What is *really* the answer?',
  );

  const proposal = harden({
    give: { Fee: link },
  });

  const payments = harden({
    Fee: linkPayment,
  });

  const querySeat = E(zoe).offer(queryInvitation, proposal, payments);

  const offerResult = await E(querySeat).getOfferResult();
  // offerResult = 42
  // #endregion paidQuery

  t.is(offerResult, 42);

  // #region API
  const oracleHandlerAPI = Far('oracleHandlerAPI', {
    onQuery: async (_query, _fee) => {},
    onError: async (_query, _reason) => {},
    onReply: async (_query, _reply, _fee) => {},
  });
  // #endregion API

  t.truthy(oracleHandlerAPI);
  t.truthy(initializedCreatorFacet);
});
