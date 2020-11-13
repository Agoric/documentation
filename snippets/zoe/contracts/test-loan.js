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

  const {
    issuer: collateralIssuer,
    amountMath: collateralMath,
    mint: collateralMint,
  } = makeIssuerKit('moola');
  const {
    issuer: loanIssuer,
    amountMath: loanMath,
    mint: loanMint,
  } = makeIssuerKit('simoleans');

  // Create autoswap installation and instance
  const autoswapBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/autoswap'),
  );
  const autoswapInstallation = await E(zoe).install(autoswapBundle);

  const { instance: autoswapInstance } = await E(zoe).startInstance(
    autoswapInstallation,
    harden({ Central: collateralIssuer, Secondary: loanIssuer }),
  );

  const issuerKeywordRecord = harden({
    Collateral: collateralIssuer,
    Loan: loanIssuer,
  });

  const timer = buildManualTimer(console.log);

  const priceAuthority = makeFakePriceAuthority({
    mathIn: collateralMath,
    mathOut: loanMath,
    priceList: [4, 2],
    timer,
  });

  const doAddCollateral = _ => {};
  const allCollateralAmount = collateralMath.make(1000);
  const myWarningLevel = loanMath.make(1500);

  // #region customMarginCall
  E(priceAuthority)
    .quoteWhenLT(allCollateralAmount, myWarningLevel)
    .then(priceQuote => doAddCollateral(priceQuote));
  // #endregion customMarginCall

  const { subscription: periodAsyncIterable } = makeSubscriptionKit();

  const loanPayment = loanMint.mintPayment(loanMath.make(1000));

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

  const maxLoan = loanMath.make(1000);

  const proposal = harden({
    give: { Loan: maxLoan },
  });

  const payments = harden({
    Loan: loanPayment,
  });

  const lenderSeat = await E(zoe).offer(lendInvitation, proposal, payments);

  const borrowInvitation = await E(lenderSeat).getOfferResult();
  // #endregion lend

  const collateralPayment = collateralMint.mintPayment(allCollateralAmount);

  // #region borrow
  const borrowerProposal = harden({
    want: { Loan: maxLoan },
    give: { Collateral: allCollateralAmount },
  });

  const borrowerPayments = {
    Collateral: collateralPayment,
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

  const liquidationTriggerValue = loanMath.make(1000);
  const liquidate = () => {};

  // #region liquidate
  const internalLiquidationPromise = E(priceAuthority).quoteWhenLT(
    allCollateralAmount,
    liquidationTriggerValue,
  );
  internalLiquidationPromise.then(liquidate);
  // #endregion liquidate
});
