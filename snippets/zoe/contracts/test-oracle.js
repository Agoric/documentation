// @ts-check

import '@agoric/zoe/tools/prepare-test-env';
import { makeFakeVatAdmin } from '@agoric/zoe/src/contractFacet/fakeVatAdmin';
import { makeZoe } from '@agoric/zoe';
import bundleSource from '@agoric/bundle-source';
import { makeIssuerKit, MathKind } from '@agoric/ertp';
import { assert, details } from '@agoric/assert';
import test from 'ava';
import { E } from '@agoric/eventual-send';

test('oracle contract', async t => {
  const zoe = makeZoe(makeFakeVatAdmin().admin);

  // #region bundle
  const contractBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/oracle'),
  );
  const installation = await E(zoe).install(contractBundle);
  // #endregion bundle

  const {
    mint: linkMint,
    issuer: linkIssuer,
    amountMath: linkMath,
  } = makeIssuerKit('$LINK', MathKind.NAT);

  const feeAmount = linkMath.make(1000);

  const reply = 42;

  const oracleHandler = harden({
    async onQuery(query, fee) {
      let requiredFee;
      if (query.kind === 'Paid') {
        requiredFee = feeAmount;
        assert(
          linkMath.isGTE(fee, requiredFee),
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

  const link = linkMath.make(1);

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
  const oracleHandlerAPI = {
    onQuery: async (_query, _fee) => {},
    onError: async (_query, _reason) => {},
    onReply: async (_query, _reply, _fee) => {},
  };
  // #endregion API

  t.truthy(oracleHandlerAPI);
  t.truthy(initializedCreatorFacet);
});
