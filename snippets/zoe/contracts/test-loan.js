// @ts-check

import '@agoric/install-ses';
import { makeFakeVatAdmin } from '@agoric/zoe/src/contractFacet/fakeVatAdmin';
import { makeZoe } from '@agoric/zoe';
import bundleSource from '@agoric/bundle-source';
import { makeIssuerKit } from '@agoric/ertp';
import test from 'ava';
import { E } from '@agoric/eventual-send';
import buildManualTimer from '@agoric/zoe/tools/manualTimer';
import { makeFakePriceAuthority } from '@agoric/zoe/tools/fakePriceAuthority';
import { makeSubscriptionKit } from '@agoric/notifier';

test('loan contract', async t => {
  const zoe = makeZoe(makeFakeVatAdmin().admin);

  const contractBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/loan'),
  );
  const installation = await E(zoe).install(contractBundle);

  const collateralKit = makeIssuerKit('moola');
  const loanKit = makeIssuerKit('simoleans');

  // Create autoswap installation and instance
  const autoswapBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/autoswap'),
  );
  const autoswapInstallation = await E(zoe).install(autoswapBundle);

  const { instance: autoswapInstance } = await E(zoe).startInstance(
    autoswapInstallation,
    harden({ Central: collateralKit.issuer, Secondary: loanKit.issuer }),
  );

  const issuerKeywordRecord = harden({
    Collateral: collateralKit.issuer,
    Loan: loanKit.issuer,
  });

  const timer = buildManualTimer(console.log);

  const priceAuthority = makeFakePriceAuthority({
    mathIn: collateralKit.amountMath,
    mathOut: loanKit.amountMath,
    priceList: [4, 2],
    timer,
  });

  const doAddCollateral = _ => {};
  const allCollateralAmount = collateralKit.amountMath.make(1000);
  const x = loanKit.amountMath.make(1500);

  // #region customMarginCall
  E(priceAuthority)
    .quoteWhenLT(allCollateralAmount, x)
    .then(priceQuote => doAddCollateral(priceQuote));
  // #endregion customMarginCall

  const { subscription: periodAsyncIterable } = makeSubscriptionKit();

  // #region lend
  const terms = {
    mmr: 150,
    autoswapInstance,
    priceAuthority,
    periodAsyncIterable,
    interestRate: 5,
  };

  const { creatorInvitation: lendInvitation } = await E(zoe).startInstance(
    installation,
    issuerKeywordRecord,
    terms,
  );

  const maxLoan = loanKit.amountMath.make(1000);

  const proposal = harden({
    give: { Loan: maxLoan },
  });

  const payments = harden({
    Loan: loanKit.mint.mintPayment(maxLoan),
  });

  const lenderSeat = await E(zoe).offer(lendInvitation, proposal, payments);

  const borrowInvitation = await E(lenderSeat).getOfferResult();
  // #endregion lend

  // #region borrow
  const borrowerProposal = harden({
    want: { Loan: maxLoan },
    give: { Collateral: allCollateralAmount },
  });

  const borrowerPayments = {
    Collateral: collateralKit.mint.mintPayment(allCollateralAmount),
  };
  const borrowSeat = await E(zoe).offer(
    borrowInvitation,
    borrowerProposal,
    borrowerPayments,
  );

  const borrowFacet = E(borrowSeat).getOfferResult();
  // #endregion borrow

  const invitationIssuer = await E(zoe).getInvitationIssuer();

  // #region closeLoanInvitation
  const closeLoanInvitation = await E(borrowFacet).makeCloseLoanInvitation();
  // #endregion closeLoanInvitation

  // #region addCollateralInvitation
  const addCollateralInvitation = await E(
    borrowFacet,
  ).makeAddCollateralInvitation();
  // #endregion addCollateralInvitation

  // #region debtNotifier
  const debtNotifier = await E(borrowFacet).getDebtNotifier();
  const state = await debtNotifier.getUpdateSince();
  t.deepEqual(state.value, maxLoan);
  // #endregion debtNotifier

  t.truthy(await E(invitationIssuer).isLive(closeLoanInvitation));
  t.truthy(await E(invitationIssuer).isLive(addCollateralInvitation));

  const liquidationTriggerValue = loanKit.amountMath.make(1000);
  const liquidate = () => {};

  // #region liquidate
  const internalLiquidationPromise = E(priceAuthority).quoteWhenLT(
    allCollateralAmount,
    liquidationTriggerValue,
  );
  internalLiquidationPromise.then(liquidate);
  // #endregion liquidate
});
