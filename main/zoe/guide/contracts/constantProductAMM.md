# ConstantProduct AMM

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/vpool-xyk-amm/multipoolMarketMaker.js) (Last updated: 2021-10-26)
##### [View contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)


The Constant Product AMM is an automated market maker (AMM) that supports multiple
liquidity pools and direct exchanges across pools. It's called the "Constant
Product" AMM because it uses the constant product rule, which is one of a family of
rules that enable a market maker to guarantee to be able to continue to make
trades, regardless of how prices change. (The constant product rule does this by
ensuring that the product of the contents of two pools of assets remains constant
as trading takes place.)

Each liquidity pool maintains a price for exchanges between the central token
and a secondary token. Secondary tokens can be exchanged with each other, but
only through the central token. For example, if BLD and ATM are two token types
and RUN is the central currency, a swap giving ATM and wanting BLD would first
use the pool (ATM, RUN) then the pool (BLD, RUN). There are no direct liquidity
pools between two secondary tokens.

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
take two amounts. When `getInputPrice()` or `swapIn()` is called, the `amountOut`
parameter indicated the desired `amountOut`; if `amountIn` is insufficient to provide
that much, the result indicates that no trade will take place. (The returned amountIn
and amountOut will both be empty amounts.) Similarly, when `swapIn()` or
`getOutputPrice()` is called, `amountIn` is treated as a maximum.  If it would take a
greater amount to get the specified `amountOut`, the result indicates no trade.

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

## The ConstantProduct API

These examples use RUN as the central token. BLD and ATM are secondary currencies.

### Trading with the ConstantProduct AMM

Once trading pools have been set up (see below), a new trader can interact with the
market by asking for the current price, making an invitation, and making an
offer. If Sara has ATM and needs 275 BLD for a deal she has negotiated, she can use
getOutputPrice() to get a quote. (An empty amount indicates no limit on the
amountOut of the result.)

```js
const quote = E(publicFacet).getOutputPrice(
  AmountMath.make(BLDBrand, 275n),
  AmountMath.makeEmpty(ATMBrand),
);
  ```
  
Let's assume the quote says she needs to provide 216 ATM. Sara believes the
price is somewhat volatile, and she doesn't want to make repeated calls, so she pads
her offer. If the appropriate pools don't exist, she'll get an error (`brands were
not recognized`). If someone sells a lot of ATM into the pool just ahead of
her, the price will increase, and she'll have to decide whether to deposit more
ATM or wait for the price to stabilize. If someone buys a lot of ATM just
ahead of her order, she'll get the 275 BLD for less and will get some ATM
back.

```js
const saraProposal = harden({
  want: { Out: AmountMath.make(BLDBrand, 275n) },
  give: { In: AmountMath.make(atmBrand, 220n) },
});

const swapInvitation = await E(publicFacet).makeSwapOutInvitation();
const atmPayment =
  harden({ In: saraAtmPurse.withdraw(AmountMath.make(atmBrand, 220n)) });

const saraSeat = await E(zoe).offer(swapInvitation, saraProposal, atmPayment);
const saraResult = await saraSeat.getOfferResult();
```

If the result is `Swap successfully completed.`, she got the BLD for 220 ATM
or less (she'll want to deposit any refund). Otherwise the market price moved against
her, and she'll have to check the price again and make another offer.

```js
const BLDProceeds = await E(saraSeat).getPayout('In');
const atmRefund = await E(saraSeat).getPayout('Out');

const BLDProceedsAmount = E(saraBLDPurse).deposit(BLDProceeds);
E(saraAtmPurse).deposit(atmRefund);
```

###  Creating a new Pool

When the contract is first instantiated, there won't be any pools ready for
trading. `addPool()` adds a new currency, which can then be funded.  (All
currencies must be fungible.) When a pool is first funded, there's no other basis
on which to decide how much liquidity to create, so the liquidity amount equals the
amount of the central token in the offer.

```js
const BLDLiquidityIssuer = await E(publicFacet).addPool(BLDIssuer, 'BLD');
```

Alice sees that the current rate in the external market is 2 BLD for each
RUN, so she deposits twice as many BLD as RUN to fund the market.

```js
const aliceProposal = harden({
  want: { Liquidity: BLDLiquidity(50n) },
  give: {
    Secondary: AmountMath.make(BLDBrand, 100n),
    Central: AmountMath.make(RUNBrand, 50n),
  },
});
const alicePayments = {
  Secondary: aliceBLDPayment,
  Central: aliceRUNPayment,
};

const aliceAddLiquidityInvitation = E(publicFacet).makeAddLiquidityInvitation();
const addLiquiditySeat = await E(zoe).offer(
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
that the current ratio is 1234 BLD to 1718 RUN.

```js
const BLDPoolAlloc = E(publicFacet).getPoolAllocation(BLDBrand);
const RUNValue = BLDPoolAlloc.Central.value;
const BLDValue = BLDPoolAlloc.secondary.value;
```

Now he can add liquidity.  The price ratio changes when anyone trades with the pool,
so he should leave some flexibility in the proposal. The pool calculates the amount
of `secondary` currency required based on the amount of `central` currency provided.
Bob bumps up the amount of BLD he'll contribute by a little. If he was concerned
about how much liquidity this would produce, he would calculate it and specify a rough
figure, but there's no need in this case.

```js
const bobProposal = harden({
  give: {
    Central: AmountMath.make(RUNBrand, 1800n),
    Secondary: AmountMath.make(BLDBrand, 1200n),
  },
  want: { Liquidity: AmountMath.make(liquidityBrand, 0n) },
  exit: { onDemand: null },
});

const bobPayments = {
  Central: bobRUNPayment,
  Secondary: bobBLDPayment,
}

const seat = await E(zoe).offer(addLiquidityInvite, bobProposal, bobPayments);
```

## Governance

The ConstantProduct AMM uses governance to manage changes to two parameters: `PoolFee`
and `ProtocolFee`. The current values of the parameters and the history of governance
voting to update their values is visible through the governance APIs.

An instance of the ConstantProduct AMM is managed by a contractGovernor, which
controls the ability to change contract parameters and add new types of collateral.
The contractGovernor adds these four methods to the contract's publicFacet:

* `getSubscription()`: get a [Subscription](/guides/js-programming/notifiers.md) that
    updates when votes are called.
* `getContractGovernor()`: returns the contractGovernor for verification.
* `getGovernedParamsValues()`: returns a structure showing the current values of
    the two parameters.
* `getParamValue('PoolFee')`: gets a description of the current value of
    either parameter. Note the initial capital letter.
