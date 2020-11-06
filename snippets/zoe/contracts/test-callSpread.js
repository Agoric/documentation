// eslint-disable-next-line import/no-extraneous-dependencies
import '@agoric/install-ses';
// eslint-disable-next-line import/no-extraneous-dependencies
import test from 'ava';
import bundleSource from '@agoric/bundle-source';
import { E } from '@agoric/eventual-send';
import '@agoric/zoe/exported';
import buildManualTimer from '@agoric/zoe/tools/manualTimer';

import { setup } from '@agoric/zoe/test/unitTests/setupBasicMints';
import { assertPayoutDeposit } from '@agoric/zoe/test/zoeTestHelpers';
import { makeFakePriceAuthority } from '@agoric/zoe/tools/fakePriceAuthority';

const makeTestPriceAuthority = (amountMaths, priceList, timer) =>
  makeFakePriceAuthority({
    mathIn: amountMaths.get('simoleans'),
    mathOut: amountMaths.get('moola'),
    priceList,
    timer,
  });

test('callSpread, mid-strike', async t => {
  const {
    moolaIssuer,
    simoleanIssuer,
    moola,
    simoleans,
    bucksIssuer,
    bucksMint,
    bucks,
    zoe,
    amountMaths,
    brands,
  } = setup();
  const contractBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/callSpread'),
  );
  const installation = await E(zoe).install(contractBundle);

  // Alice will create and fund a call spread contract, and give the invitations
  // to Bob and Carol. Bob and Carol will promptly schedule collection of funds.
  // The spread will then mature, and both will get paid.

  // Setup Alice
  const aliceBucksPayment = bucksMint.mintPayment(bucks(300));
  // Setup Bob
  const bobBucksPurse = bucksIssuer.makeEmptyPurse();
  // Setup Carol
  const carolBucksPurse = bucksIssuer.makeEmptyPurse();

  const manualTimer = buildManualTimer(console.log, 0);
  const priceAuthority = makeTestPriceAuthority(
    amountMaths,
    [20, 45],
    manualTimer,
  );

  const quoteAuthority = await E(priceAuthority).getQuoteIssuer(
    brands.get('simoleans'),
    brands.get('moola'),
  );
  // #region startInstance
  // underlying is 2 Simoleans, strike range is 30-50 (doubled)
  const terms = harden({
    expiration: 3,
    underlyingAmount: simoleans(2),
    priceAuthority,
    strikePrice1: moola(60),
    strikePrice2: moola(100),
    settlementAmount: bucks(300),
    timer: manualTimer,
  });
  const issuerKeywordRecord = harden({
    Underlying: simoleanIssuer,
    Collateral: bucksIssuer,
    Strike: moolaIssuer,
    Quote: quoteAuthority,
  });

  const { creatorInvitation } = await zoe.startInstance(
    installation,
    issuerKeywordRecord,
    terms,
  );
  // #endregion startInstance

  // #region invitationDetails
  const invitationDetail = await E(zoe).getInvitationDetails(creatorInvitation);
  const longOptionAmount = invitationDetail.longAmount;
  const shortOptionAmount = invitationDetail.shortAmount;
  // #endregion invitationDetails

  // #region creatorInvitation
  const aliceProposal = harden({
    want: { LongOption: longOptionAmount, ShortOption: shortOptionAmount },
    give: { Collateral: bucks(300) },
  });
  const alicePayments = { Collateral: aliceBucksPayment };
  const aliceSeat = await zoe.offer(
    creatorInvitation,
    aliceProposal,
    alicePayments,
  );
  const {
    LongOption: bobLongOption,
    ShortOption: carolShortOption,
  } = await aliceSeat.getPayouts();
  // #endregion creatorInvitation

  // #region bobExercise
  const bobOptionSeat = await zoe.offer(bobLongOption);
  const bobPayout = bobOptionSeat.getPayout('Collateral');
  // #endregion bobExercise

  const bobDeposit = assertPayoutDeposit(
    t,
    bobPayout,
    bobBucksPurse,
    bucks(225),
  );

  const carolOptionSeat = await zoe.offer(carolShortOption);
  const carolPayout = carolOptionSeat.getPayout('Collateral');
  const carolDeposit = assertPayoutDeposit(
    t,
    carolPayout,
    carolBucksPurse,
    bucks(75),
  );

  const simoleanMath = amountMaths.get('simoleans');
  const moolaMath = amountMaths.get('moola');
  const bucksMath = amountMaths.get('bucks');
  // #region verifyTerms
  const optionValue = shortOptionAmount.value[0];
  const carolTerms = await zoe.getTerms(optionValue.instance);
  t.is('short', optionValue.position);
  t.is(3, carolTerms.expiration);
  t.is(manualTimer, carolTerms.timer);
  t.is(priceAuthority, carolTerms.priceAuthority);
  t.truthy(simoleanMath.isEqual(simoleans(2), carolTerms.underlyingAmount));
  t.truthy(moolaMath.isEqual(moola(60), carolTerms.strikePrice1));
  t.truthy(moolaMath.isEqual(moola(100), carolTerms.strikePrice2));
  t.truthy(bucksMath.isEqual(bucks(300), carolTerms.settlementAmount));
  // #endregion verifyTerms

  await E(manualTimer).tick();
  await E(manualTimer).tick();
  await E(manualTimer).tick();
  await Promise.all([bobDeposit, carolDeposit]);
});
