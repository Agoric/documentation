# Multipool Autoswap

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/2a8b0fc2ece7344604bcc23b295367cd871f6995/packages/zoe/src/contracts/multipoolAutoswap/multipoolAutoswap.js) (Last updated: 2020-09-14)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)


Multipool Autoswap is a rewrite of [UniSwap](https://uniswap.org/) that supports
multiple liquidity pools and direct exchanges across pools.

Each liquidity pool maintains a price for exchanges between the central token and a
secondary token. Secondary tokens can be exchanged with each other, but only through
the central token. For example, if X and Y are two token types and C is the central
token, a swap giving X and wanting Y would first use the pool (X, C) then the pool
(Y, C). There are no direct liquidity pools between two secondary tokens.

There should only need to be one instance of this contract, so liquidity can be
shared as much as possible. Each secondary currency has a separate pool of liquidity.

When the contract is instantiated, the central token is specified in the
terms. Separate invitations are available by calling methods on the publicFacet for
adding and removing liquidity and for making trades. Other publicFacet operations
support querying prices and the sizes of pools. New Pools can be created with
`addPool()`.

When making trades or requesting prices, the caller must specify that either the
input price (swapIn, getInputPrice) or the output price (swapOut, getOutPutPrice) is
fixed. For swaps, the required keywords are `In` for the trader's `give` amount, and
`Out` for the trader's `want` amount.  `getInputPrice()` and `getOutputPrice()` each
take an amount for the currency that is being specified, and a brand to indicate the
currency of the desired amount.

When adding and removing liquidity, the keywords are `Central`, `Secondary`, and
`Liquidity`. Adding liquidity uses `Central` and `Secondary` in the `give` section,
while to remove liquidity the `give` section only needs the particular liquidity
token specified for `give`, and it will figure out the appropriate amounts to pay
out.

Transactions that don't require an invitation include `addPool()` and the queries
(`getInputPrice()`, `getOutputPrice()`, `getPoolAllocation()`,
`getLiquidityIssuer()`, and `getLiquiditySupply()`).

This contract follows the design of [UniSwap](https://uniswap.org/).

## The MultipoolAutoswap API

These examples presume that the central token is bucks. Moola and simoleans are
secondary currencies.

### Trading with MultipoolAutoswap

Once trading pools have been set up, a new trader can interact by asking for the
current price, making an invitation, and making an offer. If Sara needs 275 moola for
a deal she has negotiated and has simoleans she can spend, she can use
getOutputPrice() to get a quote.

```js
const quote = E(publicFacet).getOutputPrice(
  moolaAmountMath.make(275), simoleansBrand);
  ```
  
Let's assume the quote is for 216 simoleans. Sara believes the price is somewhat
volatile, and she doesn't want to make repeated calls, so she pads her offer. If the
appropriate pools don't exist, she'll get an error (`brands were not recognized`).

```js
const saraProposal = harden({
  want: { out: simoleans(275) },
  give: { in: moola(220) },
});

const swapInvitation = await E(publicFacet).makeSwapOutInvitation();
const moolaPayment = harden({ In: sMoolaPurse.withdraw(220) });

const saraSeat = await E(zoe).offer(swapInvitation, saraProposal, moolaPayment);
const saraResult = await saraSeat.getOfferResult();
```

If the result is `Swap successfully completed.`, she got the simoleans for 220 or
less (she'll want to deposit any refund). Otherwise the market price moved against
her, and she'll have to check the price again and make another offer.

```js
const moolaRefund = await E(saraSeat).getPayout('In');
const simoleanProceeds = await E(saraSeat).getPayout('Out');

const moolaRefundAmount = E(sMoolaPurse).deposit(moolaRefund);
E(simoleanPurse).deposit(simoleanProceeds);
```

###  Creating a new Pool

When the contract is first instantiated, there won't be any pools ready for
 trading. `addPool()` adds a new currency, which can then be funded. When a pool is
first funded, there's no other basis on which to decide how much liquidity to create,
so the liquidity amount equals the amount of the central token in the offer.

```js
const moolaLiquidityIssuer = await E(publicFacet).addPool(moolaIssuer, 'Moola');
const moolaLiquidityAmountMath = await makeLocalAmountMath(moolaLiquidityIssuer);
```

Alice decides that the current rate in the external market is 2 Moola for each
Buck, so she deposits twice as many Moola as Bucks.

```js
const aliceProposal = harden({
  want: { Liquidity: moolaLiquidity(50) },
  give: {
    Secondary: moolaAmountMath.make(100),
    Central: bucksAmountMath.make(50),
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
that the current ratio is 1234 moola to 1718 bucks.

```js
const moolaPoolAlloc = E(publicFacet).getPoolAllocation(moolaBrand);
const bucksValue = moolaPoolAlloc.Central.value;
const moolaValue = moolaPoolAlloc.secondary.value;
```

Then he can add liquidity. The price ratio changes when anyone trades with the pool,
and the pool calculates the amount of `secondary` currency required based on the
amount of `central` currency provided, so he'll bump up the amount of moola
contributed. If he was concerned about how much liquidity this would produce, he
could calcuate it and specify a ballpark figure, but there's usually no need to do
that.

```js
const bobProposal = harden({
  give: {
    TokenA: moola(1200),
    TokenB: bucks(1800)
  },
  want: { Liquidity: liquidity(0) },
  exit: { onDemand: null },
]);

const bobPayments = {
  TokenA: bobMoolaPayment,
  TokenB: bobBucksPayment,
}

const seat = await E(zoe).offer(addLiquidityInvite, bobProposal, bobPayments);
```
