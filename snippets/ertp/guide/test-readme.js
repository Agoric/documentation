/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test } from '../../prepare-test-env-ava.js';
// @ts-check

import { E } from '@endo/eventual-send';

// We need to disable this lint until @agoric/vats is released
// and adopted in package.json.
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeFakeBoard } from '@agoric/vats/tools/board-utils.js';

// #region importErtp
import { makeIssuerKit, AmountMath, AssetKind } from '@agoric/ertp';
// #endregion importErtp

test('ertp guide readme', async t => {
  // #region makeIssuerKit
  const {
    issuer: quatloosIssuer,
    mint: quatloosMint,
    brand: quatloosBrand,
  } = makeIssuerKit('quatloos');
  // #endregion makeIssuerKit

  t.is(quatloosBrand, quatloosIssuer.getBrand());

  // #region seven
  const quatloosSeven = AmountMath.make(quatloosBrand, 7n);
  // #endregion seven

  // #region mintPayment
  const quatloosPayment = quatloosMint.mintPayment(quatloosSeven);
  // #endregion mintPayment

  // #region deposit
  const quatloosPurse = quatloosIssuer.makeEmptyPurse();
  quatloosPurse.deposit(quatloosPayment);
  // #endregion deposit

  // #region five
  const quatloosFive = AmountMath.make(quatloosBrand, 5n);
  // #endregion five

  // #region withdraw
  const myQuatloosPayment = quatloosPurse.withdraw(quatloosFive);
  // #endregion withdraw

  const aliceQuatloosPurse = quatloosIssuer.makeEmptyPurse();

  // #region depositFacet
  const aliceQuatloosDepositFacet = aliceQuatloosPurse.getDepositFacet();
  // #endregion depositFacet

  const board = makeFakeBoard();

  // #region getId
  const aliceQuatloosDepositFacetId = await E(board).getId(
    aliceQuatloosDepositFacet,
  );
  // #endregion getId

  // #region getValue
  const depositFacet = E(board).getValue(aliceQuatloosDepositFacetId);
  await E(depositFacet).receive(myQuatloosPayment);
  // #endregion getValue

  t.is(await depositFacet, aliceQuatloosDepositFacet);
  t.deepEqual(await aliceQuatloosPurse.getCurrentAmount(), quatloosFive);

  // #region ticketValues
  const startDateString = new Date(2019, 11, 9, 20, 30).toISOString();

  const ticketValues = Array(1114)
    .fill()
    .map((_, i) => ({
      seat: i + 1,
      show: 'Hamilton',
      start: startDateString,
    }));
  // #endregion ticketValues

  // #region makeTicketIssuer
  const { mint: agoricTheatreTicketMint, brand: agoricTheatreTicketBrand } =
    makeIssuerKit('Agoric Theater tickets', AssetKind.SET);
  // #endregion makeTicketIssuer

  // #region ticketPayments
  const ticketAmounts = ticketValues.map(ticketValue =>
    AmountMath.make(agoricTheatreTicketBrand, harden([ticketValue])),
  );
  const agoricTheatreTicketPayments = ticketAmounts.map(ticketAmount =>
    agoricTheatreTicketMint.mintPayment(ticketAmount),
  );
  // #endregion ticketPayments

  const agoricTheatreTicketIssuer = agoricTheatreTicketMint.getIssuer();

  const allLive = await Promise.all(
    agoricTheatreTicketPayments.map(payment =>
      agoricTheatreTicketIssuer.isLive(payment),
    ),
  );

  t.truthy(allLive.every(a => a));
});

test('MarkM 2024-10 talk', t => {
  /** @type {Record<string, {issuer: Issuer, brand: Brand}>} */

  // #region amountMathProps
  const { make, isGTE } = AmountMath;
  // #endregion amountMathProps

  // #region declareShared
  const shared = {};
  // #endregion declareShared

  // #region aliceBuyer1
  /** @param {{ bucks: Payment, vendor: any }} some */
  const makeBuyer = some => {
    const { bucks, tickets } = shared;
    const my = {
      bucks: bucks.issuer.makeEmptyPurse(),
      tickets: tickets.issuer.makeEmptyPurse(),
    };
    my.bucks.deposit(some.bucks);
    // #endregion aliceBuyer1

    // #region aliceBuyer2
    return harden({
      buyTicket() {
        const pmt = my.bucks.withdraw(make(bucks.brand, 10n));
        const allegedTicket = some.vendor.buy(pmt);
        // #endregion aliceBuyer2
        // #region aliceBuyer3
        const got = my.tickets.deposit(allegedTicket);
        t.log('Alice got', got);
        isGTE(got, make(tickets.brand, 1n)) || assert.fail();
        return got;
      },
      getBalances: () => ({
        bucks: my.bucks.getCurrentAmount(),
        tickets: my.tickets.getCurrentAmount(),
      }),
    });
  };
  // #endregion aliceBuyer3

  // #region bobSeller
  /** @param {{ bucks: Payment, tickets: Payment}} some */
  const makeSeller = some => {
    const { bucks, tickets } = shared;
    const my = {
      bucks: bucks.issuer.makeEmptyPurse(),
      tickets: tickets.issuer.makeEmptyPurse(),
    };
    my.bucks.deposit(some.bucks);
    my.tickets.deposit(some.tickets);

    return harden({
      /** @param {Payment} allegedPayment */
      buy(allegedPayment) {
        const amt = my.bucks.deposit(allegedPayment);
        isGTE(amt, make(bucks.brand, 10n)) || assert.fail();
        t.log('Bob got', amt);
        return my.tickets.withdraw(make(tickets.brand, 1n));
      },
      getBalances: () => ({
        bucks: my.bucks.getCurrentAmount(),
        tickets: my.tickets.getCurrentAmount(),
      }),
    });
  };
  // #endregion bobSeller

  // #region makeBucks
  const bucksKit = makeIssuerKit('Bucks');
  const { mint: bucksMint, ...bucks } = bucksKit;
  Object.assign(shared, { bucks });
  // #endregion makeBucks

  // #region bucksAmount
  const bucks100 = AmountMath.make(bucks.brand, 100n);
  // #endregion bucksAmount

  // #region bucksPayment100
  const paymentA = bucksMint.mintPayment(bucks100);
  // #endregion bucksPayment100

  // #region bobPayments
  const { mint: ticketsMint, ...tickets } = makeIssuerKit('Tickets');
  Object.assign(shared, { tickets });

  const paymentsB = {
    bucks: bucksMint.mintPayment(make(bucks.brand, 200n)),
    tickets: ticketsMint.mintPayment(make(tickets.brand, 50n)),
  };
  // #endregion bobPayments

  // #region aliceBuysFromBob
  const bob = makeSeller(paymentsB);
  const alice = makeBuyer({ bucks: paymentA, vendor: bob });

  const howMuch = (bv, tv) => ({
    bucks: make(bucks.brand, bv),
    tickets: make(tickets.brand, tv),
  });

  t.deepEqual(alice.getBalances(), howMuch(100n, 0n));
  t.deepEqual(bob.getBalances(), howMuch(200n, 50n));

  alice.buyTicket();

  t.deepEqual(alice.getBalances(), howMuch(90n, 1n));
  t.deepEqual(bob.getBalances(), howMuch(210n, 49n));
  // #endregion aliceBuysFromBob
});
