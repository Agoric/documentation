import { test } from '@agoric/zoe/tools/prepare-test-env-ava';
import { amountMath, makeIssuerKit, MathKind } from '@agoric/ertp';

import { setupZCFTest } from '../../tools/setupZcfTest';

test('ertp guide amountMath allMathKinds', async t => {
  // #region allMathKinds
  makeIssuerKit('Quatloos'); // Defaults to MathKind.NAT
  makeIssuerKit('Quatloos', MathKind.SET);
  // #endregion allMathKinds
  t.truthy(true);
});

test('ertp guide amountMath methods getValue', async t => {
  // #region getValue
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const quatloos123 = amountMath.make(quatloosBrand, 123n);
  // returns 123
  const value = amountMath.getValue(quatloosBrand, quatloos123);
  // #endregion getValue
  t.is(value, 123n);
});

test('ertp guide amountMath methods makeEmpty', async t => {
  // #region makeEmpty
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  // Returns an empty amount for this issuer.
  // Since this is a fungible amount it returns 0
  const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
  // #endregion makeEmpty
  t.deepEqual(empty, amountMath.make(quatloosBrand, 0n));
});

test('ertp guide amountMath methods makeEmptyFromAmount', async t => {
  // #region makeEmptyFromAmount
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  // Returns an empty amount for this issuer.
  // Since this is a fungible amount it returns 0
  const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
  // quatloosAmount837 = { value: 837n, brand: quatloos }
  const quatloosAmount837 = amountMath.make(quatloosBrand, 837n);
  // Returns an amount = { value: 0n, brand: quatloos }
  const quatloosAmount0 = amountMath.makeEmptyFromAmount(quatloosAmount837);
  // #endregion makeEmptyFromAmount
  t.deepEqual(empty, quatloosAmount0);
});

test('ertp guide amountMath methods isEmpty', async t => {
  // #region isEmpty
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
  const quatloos1 = amountMath.make(quatloosBrand, 1n);
  // returns true
  amountMath.isEmpty(empty);
  // returns false
  amountMath.isEmpty(quatloos1);
  // #endregion isEmpty
  t.truthy(amountMath.isEmpty(empty));
  t.falsy(amountMath.isEmpty(quatloos1));
});

test('ertp guide amountMath methods isGTE', async t => {
  // #region isGTE
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
  const quatloos1 = amountMath.make(quatloosBrand, 1n);
  // Returns true
  amountMath.isGTE(quatloos1, empty);
  // Returns false
  amountMath.isGTE(empty, quatloos1);
  // #endregion isGTE
  t.truthy(amountMath.isGTE(quatloos1, empty));
  // Returns false
  t.falsy(amountMath.isGTE(empty, quatloos1));
});

test('ertp guide amountMath methods isEqual', async t => {
  // #region isEqual
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const empty = amountMath.makeEmpty(quatloosBrand, MathKind.NAT);
  const quatloos1 = amountMath.make(quatloosBrand, 1n);
  const anotherQuatloos1 = amountMath.make(quatloosBrand, 1n);

  // Returns true
  amountMath.isEqual(quatloos1, anotherQuatloos1);
  // Returns false
  amountMath.isEqual(empty, quatloos1);
  // #endregion isEqual

  t.truthy(amountMath.isEqual(quatloos1, anotherQuatloos1));
  t.falsy(amountMath.isEqual(empty, quatloos1));
});

test('ertp guide amountMath methods coerce', async t => {
  // #region coerce
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const quatloos50 = amountMath.make(quatloosBrand, 50n);
  amountMath.coerce(quatloosBrand, quatloos50); // equal to quatloos50
  // #endregion coerce
  t.deepEqual(amountMath.coerce(quatloosBrand, quatloos50), quatloos50);
});

test('ertp guide amountMath methods add', async t => {
  // #region add
  const { brand: myItemsBrand } = makeIssuerKit('myItems', 'set');
  const listAmountA = amountMath.make(myItemsBrand, harden(['1', '2', '4']));
  const listAmountB = amountMath.make(myItemsBrand, harden(['3']));

  // Returns an amount containing all of ['1', '2', '4', '3']
  const combinedList = amountMath.add(listAmountA, listAmountB);
  // #endregion add
  t.deepEqual(
    combinedList,
    amountMath.make(myItemsBrand, ['1', '2', '4', '3']),
  );
});

test('ertp guide amountMath methods subtract', async t => {
  // #region subtract
  const { brand: myItemsBrand } = makeIssuerKit('myItems', 'set');
  const listAmountA = amountMath.make(myItemsBrand, ['1', '2', '4']);
  const listAmountB = amountMath.make(myItemsBrand, ['3']);
  const listAmountC = amountMath.make(myItemsBrand, ['2']);
  // Returns ['1', '4']
  const subtractedList = amountMath.subtract(listAmountA, listAmountC);
  // Throws error
  t.throws(() => amountMath.subtract(listAmountA, listAmountB), {
    message: /right element .* was not in left/,
  });
  // #endregion subtract
  t.deepEqual(subtractedList, amountMath.make(myItemsBrand, ['1', '4']));
});

test('ertp guide amountMath methods make', async t => {
  // #region make
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  /// An `amount` with `value` = 837 and `brand` = Quatloos
  const quatloos837 = amountMath.make(quatloosBrand, 837n);
  const anotherQuatloos837 = harden({ brand: quatloosBrand, value: 837n });
  t.deepEqual(quatloos837, anotherQuatloos837);
  // #endregion make
});

test('ertp guide amountMath related', async t => {
  // #region makeIssuerKit
  const { issuer, mint, brand } = makeIssuerKit('quatloos');
  // #endregion makeIssuerKit
  t.truthy(mint);
  t.truthy(brand);

  const quatloosIssuer = issuer;

  // #region getAmountMathKind2
  const myAmountMathKind = quatloosIssuer.getAmountMathKind();
  // #endregion getAmountMathKind2
  t.is(myAmountMathKind, 'nat');
});

test('ertp guide zcf.getMathKind related', async t => {
  const { issuer, mint, brand } = makeIssuerKit('quatloos');
  const { zcf } = await setupZCFTest(harden({ Quatloos: issuer }));
  t.truthy(issuer);
  t.truthy(mint);
  t.truthy(brand);
  const quatloosBrand = brand;
  // #region zcfGetMathKind
  const quatloosMathKind = zcf.getMathKind(quatloosBrand);
  // #endregion zcfGetMathKind
  t.is(quatloosMathKind, 'nat');
});
