import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';
import { AmountMath, makeIssuerKit, AssetKind } from '@agoric/ertp';

import { setupZCFTest } from '../../tools/setupZcfTest.js';

test('ertp guide AmountMath allAssetKinds', async t => {
  // #region allAssetKinds
  makeIssuerKit('Quatloos'); // Defaults to AssetKind.NAT
  makeIssuerKit('Quatloos', AssetKind.SET);
  // #endregion allAssetKinds
  t.truthy(true);
});

test('ertp guide AmountMath methods getValue', async t => {
  // #region getValue
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const quatloos123 = AmountMath.make(quatloosBrand, 123n);
  // returns 123
  const value = AmountMath.getValue(quatloosBrand, quatloos123);
  // #endregion getValue
  t.is(value, 123n);
});

test('ertp guide AmountMath methods makeEmpty', async t => {
  // #region makeEmpty
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  // Returns an empty amount for this issuer.
  // Since this is a fungible amount it returns 0
  const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
  // #endregion makeEmpty
  t.deepEqual(empty, AmountMath.make(quatloosBrand, 0n));
});

test('ertp guide AmountMath methods makeEmptyFromAmount', async t => {
  // #region makeEmptyFromAmount
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  // Returns an empty amount for this issuer.
  // Since this is a fungible amount it returns 0
  const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
  // quatloosAmount837 = { value: 837n, brand: quatloos }
  const quatloosAmount837 = AmountMath.make(quatloosBrand, 837n);
  // Returns an amount = { value: 0n, brand: quatloos }
  const quatloosAmount0 = AmountMath.makeEmptyFromAmount(quatloosAmount837);
  // #endregion makeEmptyFromAmount
  t.deepEqual(empty, quatloosAmount0);
});

test('ertp guide AmountMath methods isEmpty', async t => {
  // #region isEmpty
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
  const quatloos1 = AmountMath.make(quatloosBrand, 1n);
  // returns true
  AmountMath.isEmpty(empty);
  // returns false
  AmountMath.isEmpty(quatloos1);
  // #endregion isEmpty
  t.truthy(AmountMath.isEmpty(empty));
  t.falsy(AmountMath.isEmpty(quatloos1));
});

test('ertp guide AmountMath methods isGTE', async t => {
  // #region isGTE
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
  const quatloos1 = AmountMath.make(quatloosBrand, 1n);
  // Returns true
  AmountMath.isGTE(quatloos1, empty);
  // Returns false
  AmountMath.isGTE(empty, quatloos1);
  // #endregion isGTE
  t.truthy(AmountMath.isGTE(quatloos1, empty));
  // Returns false
  t.falsy(AmountMath.isGTE(empty, quatloos1));
});

test('ertp guide AmountMath methods isEqual', async t => {
  // #region isEqual
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const empty = AmountMath.makeEmpty(quatloosBrand, AssetKind.NAT);
  const quatloos1 = AmountMath.make(quatloosBrand, 1n);
  const anotherQuatloos1 = AmountMath.make(quatloosBrand, 1n);

  // Returns true
  AmountMath.isEqual(quatloos1, anotherQuatloos1);
  // Returns false
  AmountMath.isEqual(empty, quatloos1);
  // #endregion isEqual

  t.truthy(AmountMath.isEqual(quatloos1, anotherQuatloos1));
  t.falsy(AmountMath.isEqual(empty, quatloos1));
});

test('ertp guide AmountMath methods coerce', async t => {
  // #region coerce
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  const quatloos50 = AmountMath.make(quatloosBrand, 50n);
  AmountMath.coerce(quatloosBrand, quatloos50); // equal to quatloos50
  // #endregion coerce
  t.deepEqual(AmountMath.coerce(quatloosBrand, quatloos50), quatloos50);
});

test('ertp guide AmountMath methods add', async t => {
  // #region add
  const { brand: myItemsBrand } = makeIssuerKit('myItems', 'set');
  const listAmountA = AmountMath.make(myItemsBrand, harden(['1', '2', '4']));
  const listAmountB = AmountMath.make(myItemsBrand, harden(['3']));

  // Returns an amount containing all of ['1', '2', '4', '3']
  const combinedList = AmountMath.add(listAmountA, listAmountB);
  // #endregion add
  t.deepEqual(
    combinedList,
    AmountMath.make(myItemsBrand, harden(['1', '2', '4', '3'])),
  );
});

test('ertp guide AmountMath methods subtract', async t => {
  // #region subtract
  const { brand: myItemsBrand } = makeIssuerKit('myItems', 'set');
  const listAmountA = AmountMath.make(myItemsBrand, harden(['1', '2', '4']));
  const listAmountB = AmountMath.make(myItemsBrand, harden(['3']));
  const listAmountC = AmountMath.make(myItemsBrand, harden(['2']));
  // Returns ['1', '4']
  const subtractedList = AmountMath.subtract(listAmountA, listAmountC);
  // Throws error
  t.throws(() => AmountMath.subtract(listAmountA, listAmountB), {
    message: /right element .* was not in left/,
  });
  // #endregion subtract
  t.deepEqual(
    subtractedList,
    AmountMath.make(myItemsBrand, harden(['1', '4'])),
  );
});

test('ertp guide AmountMath methods make', async t => {
  // #region make
  const { brand: quatloosBrand } = makeIssuerKit('quatloos');
  /// An `amount` with `value` = 837 and `brand` = Quatloos
  const quatloos837 = AmountMath.make(quatloosBrand, 837n);
  const anotherQuatloos837 = harden({ brand: quatloosBrand, value: 837n });
  t.deepEqual(quatloos837, anotherQuatloos837);
  // #endregion make
});

test('ertp guide AmountMath related', async t => {
  // #region makeIssuerKit
  const { issuer, mint, brand } = makeIssuerKit('quatloos');
  // #endregion makeIssuerKit
  t.truthy(mint);
  t.truthy(brand);

  const quatloosIssuer = issuer;

  // #region getAssetKind2
  const myAssetKind = quatloosIssuer.getAssetKind();
  // #endregion getAssetKind2
  t.is(myAssetKind, 'nat');
});

test('ertp guide zcf.getAssetKind related', async t => {
  const { issuer, mint, brand } = makeIssuerKit('quatloos');
  const { zcf } = await setupZCFTest(harden({ Quatloos: issuer }));
  t.truthy(issuer);
  t.truthy(mint);
  t.truthy(brand);
  const quatloosBrand = brand;
  // #region zcfGetKind
  const quatloosAssetKind = zcf.getAssetKind(quatloosBrand);
  // #endregion zcfGetAssetKind
  t.is(quatloosAssetKind, 'nat');
});
