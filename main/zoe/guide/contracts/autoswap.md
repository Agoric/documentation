# Autoswap

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/2a8b0fc2ece7344604bcc23b295367cd871f6995/packages/zoe/src/contracts/autoswap.js) (Last updated: Sep 14, 2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

Autoswap is a contract that maintains a pool of assets (the 'liquidity pool') that
can always trade against any incoming offer. It can do this because the
[constant product rule](https://medium.com/scalar-capital/uniswap-a-unique-exchange-f4ef44f807bf)
ensures that it will never run out of assets and will always be able to quote a
price it can trade at.

This contract follows the design of [UniSwap](https://uniswap.org/), with a single
pool. This means any autoswap installation can make exchanges between two
issuers. Our `constantProduct` AMM generalizes this to many pools, all of which share a
common intermediate pool. We make this single autoswap contract available because it's
simpler and therefore easier to read. We expect all practical usage to migrate to
the constantProduct AMM.

## The Autoswap API

When the contract is instantiated, its two tokens (`Central` and `Secondary`) are
specified in the `issuerKeywordRecord`. There is no behavioral difference between the
two when trading; the names were chosen for consistency with constantProduct AMM. When
trading, use the keywords `In` and `Out` to specify the amount to be paid in and the
amount to be received.

When adding or removing liquidity, the amounts deposited must be in proportion to the
current balances in the pool. The amount of the `Central` asset is used as the
basis. The `Secondary` assets must be added in proportion.  If less `Secondary` is
provided than required, we refuse the offer. If more is
provided than is required, we return the excess.

Before trading can take place, someone must add liquidity using
`makeAddLiquidityInvitation()`. Separate invitations are available that distinguish
adding and removing liquidity, and swaps with input and output specified. Other API
operations support price checks and checking the size of the liquidity pool.

The `swap()` operation requires either the input amount or the output amount to be
specified. `makeSwapInInvitation()` treats the give amount as definitive, while
`makeSwapOutInvitation()` honors the want amount. With swapIn, a want amount can be
specified, and if the offer can't be satisfied, the offer will be refunded. Similarly
with swapOut, the want amount will be satisfied if possible. If more is provided as the
give amount than necessary, the excess will be refunded. If not enough is provided, the
offer will be refunded.

The `publicFacet` has methods to
 * get price quotes
   * for a specified input: `getInputPrice()`
   * for a specified output: `getOutputPrice()`
 * make new invitations
   * swap with input specified:`makeSwapInInvitation()`
   * swap with output specified:`makeSwapOutInvitation()`
   * add liquidity: `makeAddLiquidityInvitation()`
   * remove liquidity: `makeRemoveLiquidityInvitation()`
 * query about the state of liquidity pools
   * the current outstanding liquidity: `getLiquiditySupply()`
   * the current balances in the pool: `getPoolAllocation()`
 * get the shared liquidity issuer
    * Liquidity issuer: `getLiquidityIssuer()`

## Initialization

When someone creates an instance of the Autoswap code, they receive only the public
facet. The creator has no special access or privileges.

```js
const issuerKeywordRecord = harden({
  Central: moolaIssuer,
  Secondary: simoleanIssuer,
});

const publicFacet = await E(zoe).startInstance(
  autoswapInstallation,
  issuerKeywordRecord,
);
```

## Adding liquidity to the pool

We can contribute to the Autoswap liquidity pool by making an offer using an
invitation to add liquidity. For instance, let's say that Alice creates a proposal
with the associated payments of moola and simoleans and escrows them. At the time she
creates the pool, the market price is 2 moola for 1 simolean, so that's the rate she
sets up.

```js
const moola = value => AmountMath.make(moolaBrand, value);
const simoleans = value => AmountMath.make(simoleanBrand, value);
const liquidity = value => AmountMath.make(liquidityBrand, value);
const liquidityIssuer = await E(zoe).getLiquidityIssuer();
const aliceLiquidityPurse = E(liquidityIssuer).makeEmptyPurse();

const aliceProposal = harden({
  give: {
    Central: moola(10),
    Secondary: simolean(5)
  },
  want: { Liquidity: liquidity(10) },
  exit: { onDemand: null },
]);

const alicePayments = {
  Central: aliceMoolaPayment,
  Secondary: aliceSimoleanPayment
}

const seat =
  await E(zoe).offer(addLiquidityInvitation, aliceProposal, alicePayments);
const liquidityPayment = await E(seat).getPayout('Liquidity');

E(aliceLiquidityPurse).deposit(liquidityPayment);
```

## Making a swap offer

Let's say that Bob wants to use the moola-to-simolean Autoswap to sell 2 moola for
simolean. First he uses the `publicFacet` to check the price:

```js
const simoleanAmounts = E(publicFacet).getInputPrice(moola(2), simoleanBrand);
```

He learns that the current value of 2 moola is 1 simolean. Because other people may
make offers before Bob does, he can't rely on this price lasting. However, he can make
his offer conditional on getting at least 1 simolean back. If the price has moved
against him, he will get his money back:

```js
 const bobMoolaForSimProposal = harden({
  want: { Secondary: simoleans(1) },
  give: { Central: moola(2) },
});
```

Bob uses the `publicFacet` to get an invitation for the swap he wants to make.

```js
const swapInvitation = await E(publicFacet).makeSwapInInvitation();
```

He escrows 2 moola with Zoe and uses his invitation to make an offer:

```js
const bobMoolaPayment = harden({ Central: bobMoolaPayment });

const swapSeat = await E(zoe).offer(swapInvitation, bobMoolaProposal, bobMoolaPayment);
```

Now Bob can get his payout:

```js
const bobMoolaPayout = await E(swapSeat).getPayout('Central');
const bobSimoleanPayout = await E(swapSeat).getPayout('Secondary');
```

## Removing Liquidity

When Alice wants to remove liquidity to get moola and simoleans back, she makes a new
proposal and escrows a payment of liquidity tokens:

```js
const aliceRemoveLiquidityInvitation = await E(publicFacet).makeRemoveLiquidityInvitation();

const aliceRemoveLiquidityProposal = harden({
  give: { Liquidity: liquidity(5) },
});

const aliceSeat = await E(zoe).offer(
  aliceRemoveLiquidityInvitation,
  aliceRemoveLiquidityProposal,
  harden({ Liquidity: E(aliceLiquidityPurse).withdraw(liquidity(5)) }),
);

const aliceMoolaPayout = await E(aliceSeat).getPayout('Central');
const aliceSimoleanPayout = await E(aliceSeat).getPayout('Secondary');
```
