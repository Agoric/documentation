import '@agoric/install-ses';
import test from 'ava';
import { E } from '@agoric/eventual-send';
import { makeBoard } from '@agoric/cosmic-swingset/lib/ag-solo/vats/lib-board';

import { makeIssuerKit, MathKind } from '@agoric/ertp';

test('ertp guide readme', async t => {
  // #region makeIssuerKit
  const {
    issuer: quatloosIssuer,
    mint: quatloosMint,
    amountMath: quatloosAmountMath,
    brand: quatloosBrand,
  } = makeIssuerKit('quatloos');
  // #endregion makeIssuerKit

  t.is(quatloosBrand, quatloosIssuer.getBrand());

  // #region seven
  const quatloosSeven = quatloosAmountMath.make(7);
  // #endregion seven

  // #region mintPayment
  const quatloosPayment = quatloosMint.mintPayment(quatloosSeven);
  // #endregion mintPayment

  // #region deposit
  const quatloosPurse = quatloosIssuer.makeEmptyPurse();
  quatloosPurse.deposit(quatloosPayment);
  // #endregion deposit

  // #region five
  const quatloosFive = quatloosAmountMath.make(5);
  // #endregion five

  // #region withdraw
  const myQuatloosPayment = quatloosPurse.withdraw(quatloosFive);
  // #endregion withdraw

  const aliceQuatloosPurse = quatloosIssuer.makeEmptyPurse();

  // #region depositFacet
  const aliceQuatloosDepositFacet = aliceQuatloosPurse.getDepositFacet();
  // #endregion depositFacet

  const board = makeBoard();

  // #region getId
  const aliceQuatloosDepositFacetId = await E(board).getId(
    aliceQuatloosDepositFacet,
  );
  // #endregion getId

  // #region getValue
  const depositFacet = await E(board).getValue(aliceQuatloosDepositFacetId);
  E(aliceQuatloosDepositFacet).receive(myQuatloosPayment);
  // #endregion getValue

  t.is(depositFacet, aliceQuatloosDepositFacet);
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
  const {
    mint: agoricTheatreTicketMint,
    amountMath: agoricTheatreTicketAmountMath,
  } = makeIssuerKit('Agoric Theater tickets', MathKind.SET);
  // #endregion makeTicketIssuer

  // #region ticketPayments
  const ticketAmounts = ticketValues.map(ticketValue =>
    agoricTheatreTicketAmountMath.make(harden([ticketValue])),
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
