# AutoSwap

An AutoSwap is like a swap, except instead of having to find a
matching offer, an offer is always matched against the existing
liquidity pool. The AutoSwap contract checks whether your offer will
keep the [constant product
invariant](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf)
before accepting.

Based on UniSwap.

## Initialization

Create an instance of an autoswap invite:

```js
const aliceInvite = zoe.makeInstance(
  installationHandle,
  { assays },
);
```

## Adding liquidity to the pool

The moola<->simolean autoswap invite that we just created has a number of
methods available:

#### Invite API:
1. `addLiquidity`
2. `removeLiquidity`
3. `swap`

#### Public API:
1. `getPrice`
2. `getLiquidityAssay`
3. `getPoolUnits`
4. `makeInvite`

We can contribute to the autoswap liquidity pool by calling `addLiquidity` on a seat. For instance,
let's say that Alice decides to add liquidity. She creates an offer
rule with the associated payments of moola and simoleans and
escrows them by redeeming her invite:

```js
// Alice adds liquidity
// 10 moola = 5 simoleans at the time of the liquidity adding
// aka 2 moola = 1 simolean
const aliceOfferRules = harden({
  payoutRules: [
    {
      kind: 'offerAtMost',
      units: moolaAssay.makeUnits(10),
    },
    {
      kind: 'offerAtMost',
      units: simoleanAssay.makeUnits(5),
    },
    {
      kind: 'wantAtLeast',
      units: liquidityAssay.makeUnits(10),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
]);
const alicePayments = [aliceMoolaPayment, aliceSimoleanPayment, undefined];

const {
  seat: aliceSeat,
  payout: aliceAddLiquidityPayoutP,
} = await zoe.redeem(aliceInvite, aliceOfferRules, alicePayments);

```
She is able to ensure that she will get a minimum number of liquidity
tokens back by specifying a rule for the liquidity token slot with
`wantAtLeast`. In this case, Alice is stating that she wants at least
10 liquidity tokens back.

## Making a swap offer

Let's say that Bob wants to use the moola<->simolean autoswap
to exchange 2 moola. First he will check the price:

```js
const simoleanUnits = autoswap.getPrice([
  units2Moola,
  undefined,
  undefined,
]);
```
By using `getPrice`, he learns that the current price for 2 moola is 1
simolean. Because other people may make offers before Bob does, he
can't rely on this price. However, he can make his offer conditional
on getting at least 1 simolean back. If the price has moved, he will
get a refund:

```js
 const bobMoolaForSimOfferRules = harden({
   payoutRules: [
    {
      kind: 'offerAtMost',
      units: moolaAssay.makeUnits(2),
    },
    {
      kind: 'wantAtLeast',
      units: simoleanAssay.makeUnits(1),
    },
    {
      kind: 'wantAtLeast',
      units: liquidityAssay.makeUnits(0),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
);
```
He escrows 2 moola with Zoe and redeems his invite:

```js
const bobMoolaForSimPayments = [bobMoolaPayment, undefined, undefined];

const { seat: bobSeat, payout: bobPayoutP } = await zoe.redeem(
  bobExclInvite,
  bobMoolaForSimOfferRules,
  bobMoolaForSimPayments,
);
```

Then Bob uses this seat to make an offer.

```js
const offerOk = bobSeat.swap();
```

Now Bob can get his payout:

```js
const [bobMoolaPayment, bobSimoleanPayment ] = await bobPayoutP;
```

## Removing Liquidity

If Alice wants to remove liquidity and get moola and simoleans back,
she can do that by making new offerRules and escrowing a payment of
liquidity tokens:

```js
const aliceRemoveLiquidityInvite = publicAPI.makeInvite();

const aliceRemoveLiquidityOfferRules = harden({
  payoutRules: [
    {
      kind: 'wantAtLeast',
      units: moolaAssay.makeUnits(0),
    },
    {
      kind: 'wantAtLeast',
      units: simoleanAssay.makeUnits(0),
    },
    {
      kind: 'offerAtMost',
      units: allAssays[2].makeUnits(10),
    },
  ],
  exitRule: {
    kind: 'onDemand',
  },
});

const {
  seat: aliceRemoveLiquiditySeat,
  payout: aliceRemoveLiquidityPayoutP,
} = await zoe.redeem(
  aliceRemoveLiquidityInvite,
  aliceRemoveLiquidityOfferRules,
  harden([undefined, undefined, liquidityPayments[2]]),
);

const removeLiquidityResult = aliceRemoveLiquiditySeat.removeLiquidity();

const alicePayoutPayments = await aliceRemoveLiquidityPayoutP;
```
