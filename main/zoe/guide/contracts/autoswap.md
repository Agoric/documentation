# Autoswap

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/958a2c0a3dec38bdba2234934119ea2c28958262/packages/zoe/src/contracts/autoswap.js) (Last updated: 4/22/2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

::: tip Out-of-date status
Zoe's master branch is currently an Alpha release candidate. This doc
and its underlying contract are in the process of being updated, and should be current with the release candidate in another few days. What you see here is out of date. We apologize for any inconvenience this may cause.
:::

An Autoswap is like a swap, except instead of having to find a
matching offer, an offer is always matched against the existing
liquidity pool. The Autoswap contract checks whether your offer will
keep the [constant product
invariant](https://github.com/runtimeverification/verified-smart-contracts/blob/uniswap/uniswap/x-y-k.pdf)
before accepting.

An implementation of [UniSwap](https://uniswap.org/).

## Initialization

Create an instance of the Autoswap code, and receive an invite that
when used, will let you add liquidity to Autoswap.

```js
const issuerKeywordRecord = harden({
  TokenA: moolaIssuer,
  TokenB: simoleanIssuer,
});

const addLiquidityInvite = await E(zoe).makeInstance(
  autoswapInstallationHandle,
  issuerKeywordRecord,
);
```

## Adding liquidity to the pool

We can contribute to the Autoswap liquidity pool by making an offer by
using an addLiquidityInvite. For instance, let's say that Alice
creates a proposal with the associated payments of moola and simoleans
and escrows them:

```js
// Alice adds liquidity
// 10 moola = 5 simoleans at the time of the liquidity adding
// aka 2 moola = 1 simolean

const moola = moolaAmountMath.make;
const simoleans = simoleanAmountMath.make;
const liquidity = liquidityAmountMath.make;

const aliceProposal = harden({
  give: {
    TokenA: moola(10),
    TokenB: simolean(5)
  },
  want: { Liquidity: liquidity(10) },
  exit: { onDemand: null },
]);

const alicePayments = {
  TokenA: aliceMoolaPayment,
  TokenB: aliceSimoleanPayment
}

const {
  outcome,
  payout: aliceAddLiquidityPayoutP,
} = await E(zoe).offer(addLiquidityInvite, aliceProposal, alicePayments);

```
She is able to ensure that she will get a minimum number of liquidity
tokens back by specifying a rule for the liquidity token slot with
`want`. In this case, Alice is stating that she wants at least
10 liquidity tokens back.

## Making a swap offer

Let's say that Bob wants to use the moola<->simolean Autoswap
to exchange 2 moola. First he will check the price using the public
API:

#### Public API:
1. `getCurrentPrice`
2. `getLiquidityIssuer`
3. `getPoolAllocation`
4. `makeInvite`

```js
const simoleanAmounts = E(publicAPI).getCurrentPrice(harden({ TokenA: moola(2) }));
```
By using `getCurrentPrice`, he learns that the current price for 2 moola is 1
simolean. Because other people may make offers before Bob does, he
can't rely on this price. However, he can make his offer conditional
on getting at least 1 simolean back. If the price has moved, he will
get a refund:

```js
 const bobMoolaForSimProposal = harden({
  want: { TokenB: simoleans(1) },
  give: { TokenA: moola(2) },
});
```

Now Bob uses the publicAPI to get an invite specifically for swapping.

```js
const swapInvite = await E(publicAPI).makeSwapInvite();
```

He escrows 2 moola with Zoe and uses his invite to make an offer:

```js
const bobMoolaForSimPayments = harden({ TokenA: bobMoolaPayment });

const { outcome, payout: bobPayoutP } = await E(zoe).offer(
  swapInvite,
  bobMoolaForSimProposal,
  bobMoolaForSimPayments,
);
```

Now Bob can get his payout:

```js
const bobPayout = await bobPayoutP;

const bobMoolaPayout1 = await bobPayout.TokenA;
const bobSimoleanPayout1 = await bobPayout.TokenB;
```

## Removing Liquidity

If Alice wants to remove liquidity and get moola and simoleans back,
she can do that by making a new proposal and escrowing a payment of
liquidity tokens:

```js
const aliceRemoveLiquidityInvite = await E(publicAPI).makeRemoveLiquidityInvite();

const aliceRemoveLiquidityProposal = harden({
  give: { Liquidity: liquidity(10) },
});

const {
  outcome: removeLiquidityResult,
  payout: aliceRemoveLiquidityPayoutP,
} = await E(zoe).offer(
  aliceRemoveLiquidityInvite,
  aliceRemoveLiquidityProposal,
  harden({ Liquidity: liquidityPayout }),
);

const aliceRemoveLiquidityPayout = await aliceRemoveLiquidityPayoutP;

const aliceMoolaPayout = await aliceRemoveLiquidityPayout.TokenA;
const aliceSimoleanPayout = await aliceRemoveLiquidityPayout.TokenB;
const aliceLiquidityPayout = await aliceRemoveLiquidityPayout.Liquidity;
```
