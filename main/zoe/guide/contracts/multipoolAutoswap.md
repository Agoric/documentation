# Multipool Autoswap

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/2a8b0fc2ece7344604bcc23b295367cd871f6995/packages/zoe/src/contracts/multipoolAutoswap/multipoolAutoswap.js) (Last updated: 2020-09-14)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)


Multipool Autoswap is an automated market maker (AMM) that supports
multiple liquidity pools and direct exchanges across pools.

Each liquidity pool maintains a price for exchanges between the central token and a
secondary token. Secondary tokens can be exchanged with each other, but only through
the central token. For example, if simoleans and moola are two token types and bucks
is the central currency, a swap giving simoleans and wanting moola would first use
the pool (simoleans, bucks) then the pool (moola, bucks). There are no direct
liquidity pools between two secondary tokens.

There should only need to be one instance of this contract, so liquidity can be
shared as much as possible. Each secondary currency has a separate pool of liquidity.

When the contract is instantiated, the terms specify the central token.  Invitations
for adding and removing liquidity and for making trades are available by calling
methods on the publicFacet. Other publicFacet operations support querying prices and
the sizes of pools. Create new pools with `addPool()`.

When making trades or requesting prices, the caller must specify that either the
input price (swapIn, getInputPrice) or the output price (swapOut, getOutputPrice) is
fixed. For swaps, the required keywords are `In` for the trader's `give` amount, and
`Out` for the trader's `want` amount.  `getInputPrice()` and `getOutputPrice()` each
take an amount for the currency that is being specified, and a brand to indicate the
currency of the desired amount.

When adding and removing liquidity, the keywords are `Central`, `Secondary`, and
`Liquidity`. Adding liquidity uses `Central` and `Secondary` in the `give` section
and `Liquidity` in the `want` section. Removing liquidity reverses the keywords:
`Liquidity` in the `give` section, and `Central` and `Secondary` in the want
section. If the proposal specifies amounts directly taken from a recent quote, and
any trading has intervened, the trade is unlikely to be accepted. You can either
specify limits on how far the price may have moved, or specify limits of zero and
trust the contract to trade fairly.

Transactions that don't require an invitation include `addPool()` and the queries
(`getInputPrice()`, `getOutputPrice()`, `getPoolAllocation()`,
`getLiquidityIssuer()`, and `getLiquiditySupply()`).

## The MultipoolAutoswap API

These examples use Bucks as the central token. Moola and Simoleans are secondary
currencies.

### Trading with MultipoolAutoswap

Once trading pools have been set up, a new trader can interact with the market by
asking for the current price, making an invitation, and making an offer. If Sara has
Simoleans and needs 275 Moola for a deal she has negotiated, she can use
getOutputPrice() to get a quote.

```js
const quote = E(publicFacet).getOutputPrice(
  amountMath.make(275), simoleansBrand);
  ```
  
Let's assume the quote says she needs to provide 216 Simoleans. Sara believes the
price is somewhat volatile, and she doesn't want to make repeated calls, so she pads
her offer. If the appropriate pools don't exist, she'll get an error (`brands were
not recognized`). If someone sells a lot of Simoleans into the pool just ahead of
her, the price will increase, and she'll have to decide whether to deposit more
Simoleans or wait for the price to stabilize. If someone buys a lot of Simoleans just
ahead of her order, she'll get the 275 Moola for less and will get some Simoleans
back.

```js
const saraProposal = harden({
  want: { Out: amountMath.make(moola, 275n) },
  give: { In: amountMath.make(simolean, 220n) },
});

const swapInvitation = await E(publicFacet).makeSwapOutInvitation();
const simoleanPayment =
  harden({ In: saraSimoleanPurse.withdraw(amountMath.make(simolean, 220n)) });

const saraSeat = await E(zoe).offer(swapInvitation, saraProposal, simoleanPayment);
const saraResult = await saraSeat.getOfferResult();
```

If the result is `Swap successfully completed.`, she got the Moola for 220 Simoleans
or less (she'll want to deposit any refund). Otherwise the market price moved against
her, and she'll have to check the price again and make another offer.

```js
const moolaProceeds = await E(saraSeat).getPayout('In');
const simoleanRefund = await E(saraSeat).getPayout('Out');

const moolaProceedsAmount = E(saraMoolaPurse).deposit(moolaProceeds);
E(saraSimoleanPurse).deposit(simoleanRefund);
```

###  Creating a new Pool

When the contract is first instantiated, there won't be any pools ready for
trading. `addPool()` adds a new currency, which can then be funded. When a pool is
first funded, there's no other basis on which to decide how much liquidity to create,
so the liquidity amount equals the amount of the central token in the offer.

```js
const moolaLiquidityIssuer = await E(publicFacet).addPool(moolaIssuer, 'Moola');
const moolaLiquidityAmountMath = await makeAmountMath(moolaLiquidityIssuer);
```

Alice decides that the current rate in the external market is 2 Moola for each
Buck, so she deposits twice as many Moola as Bucks.

```js
const aliceProposal = harden({
  want: { Liquidity: moolaLiquidity(50n) },
  give: {
    Secondary: amountMath.make(moola, 100n),
    Central: amountMath.make(bucks, 50n),
  },
});
const alicePayments = {
  Secondary: aliceMoolaPayment,
  Central: aliceBucksPayment,
};

const aliceAddLiquidityInvitation = E(publicFacet).makeAddLiquidityInvitation();
const addLiquiditySeat = await zoe.offer(
  aliceAddLiquidityInvitation,
  aliceProposal,
  alicePayments,
);
```

### Adding Liquidity to an Existing Pool

When adding or removing liquidity to pools that have already been established, the
amounts deposited must be in proportion to the current balances in the pool. The
calculation is based on the amount of the `Central` asset. The `Secondary` assets
must be added in proportion.  If less `Secondary` is provided than required, the
offer is exited with no trade. If more of the secondary is provided than is required,
the excess is returned.

Bob calls `getPoolAllocation()` to find the relative levels. Let's say the answer is
that the current ratio is 1234 Moola to 1718 Bucks.

```js
const moolaPoolAlloc = E(publicFacet).getPoolAllocation(moolaBrand);
const bucksValue = moolaPoolAlloc.Central.value;
const moolaValue = moolaPoolAlloc.secondary.value;
```

Now he can add liquidity.  The price ratio changes when anyone trades with the pool,
so he should leave some flexibility in the proposal. The pool calculates the amount
of `secondary` currency required based on the amount of `central` currency provided.
Bob bumps up the amount of Moola he'll contribute by a little. If he was concerned
about how much liquidity this would produce, he would calculate it and specify a rough
figure, but there's no need in this case.

```js
const bobProposal = harden({
  give: {
    Central: amountMath.make(bucks, 1800n)
    Secondary: amountMath.make(moola, 1200n),
  },
  want: { Liquidity: amountMath.make(liquidity, 0n) },
  exit: { onDemand: null },
]);

const bobPayments = {
  Central: bobBucksPayment,
  Secondary: bobMoolaPayment,
}

const seat = await E(zoe).offer(addLiquidityInvite, bobProposal, bobPayments);
```
