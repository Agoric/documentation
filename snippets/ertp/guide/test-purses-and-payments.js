import { test } from '@agoric/zoe/tools/prepare-test-env-ava';

// #region import
import { amountMath, makeIssuerKit } from '@agoric/ertp';
// #endregion import

test('ertp guide purse getCurrentAmount', async t => {
  const { issuer: quatloosIssuer, brand: quatloosBrand, mint } = makeIssuerKit(
    'quatloos',
  );

  const quatloosPayment5 = mint.mintPayment(amountMath.make(quatloosBrand, 5n));

  // #region getCurrentAmount
  const quatloosPurse = quatloosIssuer.makeEmptyPurse();
  // Balance should be 0 Quatloos.
  const currentBalance = quatloosPurse.getCurrentAmount();
  // Deposit a payment of 5 Quatloos
  quatloosPurse.deposit(quatloosPayment5);
  // Balance should be 5 Quatloos
  const newBalance = quatloosPurse.getCurrentAmount();
  // #endregion getCurrentAmount

  t.deepEqual(currentBalance, amountMath.make(quatloosBrand, 0n));
  t.deepEqual(newBalance, amountMath.make(quatloosBrand, 5n));
});

test('ertp guide purse withdraw', async t => {
  const { issuer, mint, brand } = makeIssuerKit('quatloos');
  const quatloosPurse = issuer.makeEmptyPurse();
  quatloosPurse.deposit(mint.mintPayment(amountMath.make(brand, 100n)));

  // #region withdraw
  // Withdraw 3 Quatloos from a purse.
  const newPayment = quatloosPurse.withdraw(amountMath.make(brand, 3n));
  // #endregion withdraw

  t.deepEqual(await issuer.getAmountOf(newPayment), amountMath.make(brand, 3n));
});

test('ertp guide purse deposit', async t => {
  const {
    issuer: quatloosIssuer,
    mint: quatloosMint,
    brand: quatloosBrand,
  } = makeIssuerKit('quatloos');

  // #region deposit
  const quatloosPurse = quatloosIssuer.makeEmptyPurse();
  const quatloos123 = amountMath.make(quatloosBrand, 123n);
  const quatloosPayment = quatloosMint.mintPayment(quatloos123);

  // Deposit a payment for 123 quatloos into the purse. Ensure that this is the amount you expect.
  quatloosPurse.deposit(quatloosPayment, quatloos123);
  const secondPayment = quatloosMint.mintPayment(
    amountMath.make(quatloosBrand, 100n),
  );
  // Throws error since secondPayment is 100 Quatloos and quatloos123 is 123 Quatloos
  t.throws(() => quatloosPurse.deposit(secondPayment, quatloos123), {
    message: /payment balance .* must equal amount .*/,
  });
  // #endregion deposit
});
test('ertp guide purse getDepositFacet', async t => {
  const {
    issuer: quatloosIssuer,
    mint: quatloosMint,
    brand: quatloosBrand,
  } = makeIssuerKit('quatloos');

  const purse = quatloosIssuer.makeEmptyPurse();
  const payment = quatloosMint.mintPayment(
    amountMath.make(quatloosBrand, 100n),
  );

  // #region getDepositFacet
  const depositOnlyFacet = purse.getDepositFacet();
  // Give depositOnlyFacet to someone else. They can pass a payment
  // that will be deposited:
  depositOnlyFacet.receive(payment);
  // #endregion getDepositFacet

  t.deepEqual(purse.getCurrentAmount(), amountMath.make(quatloosBrand, 100n));
});

test('ertp guide purse payment example', async t => {
  // #region example
  // Create a purse with a balance of 10 Quatloos
  const {
    issuer: quatloosIssuer,
    mint: quatloosMint,
    brand: quatloosBrand,
  } = makeIssuerKit('quatloos');
  const quatloosPurse = quatloosIssuer.makeEmptyPurse();
  const quatloos10 = amountMath.make(quatloosBrand, 10n);
  const quatloosPayment = quatloosMint.mintPayment(quatloos10);
  // If the two arguments aren't equal (i.e. both need to be for 10 Quatloos),
  // throws an error. But they are both for 10 Quatloos, so no problem.
  quatloosPurse.deposit(quatloosPayment, quatloos10);

  // Withdraw 3 Quatloos from the purse into a payment
  const quatloos3 = amountMath.make(quatloosBrand, 3n);
  const withdrawalPayment = quatloosPurse.withdraw(quatloos3);

  // The balance of the withdrawal payment is 3 Quatloos
  await quatloosIssuer.getAmountOf(withdrawalPayment);

  // The new balance of the purse is 7 Quatloos
  quatloosPurse.getCurrentAmount();
  // #endregion example

  t.deepEqual(
    quatloosPurse.getCurrentAmount(),
    amountMath.make(quatloosBrand, 7n),
  );
  t.deepEqual(
    await quatloosIssuer.getAmountOf(withdrawalPayment),
    amountMath.make(quatloosBrand, 3n),
  );
});
