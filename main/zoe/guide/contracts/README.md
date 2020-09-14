# Zoe Pre-Built Contracts

<Zoe-Version/>

::: tip Out-of-date status
Zoe's master branch is currently an Alpha release candidate. This doc is in the process of
being updated, and should be current with the release candidate in another few days. What you
see here is out of date. We apologize for any inconvenience this may cause.
:::

While Zoe provides the means to build custom smart contracts, there is a good chance you will
want to use one that follows a commonly-used structure. Therefore, we currently provide several
pre-built contracts that can be imported and run on Zoe:

- [Atomic Swap](./atomic-swap) - A basic trade of digital assets between two parties.
- [Autoswap (an implementation of Uniswap v1)](./autoswap) - A swap
  that automatically executes upon finding a match in the current liquidity pool.
- [Covered Call](./covered-call) - This type of contract oversees the sale and execution of a
  call option.
- [Second-price Auction](./second-price-auction) - An auction in which the highest bidder wins
  and pays the second-highest bid. This version doesn't conceal the bids (an essential aspect
  of second price auctions), therefore, <b>it should not be used in production.</b>
- [Simple Exchange](./simple-exchange) - A basic exchange with an order book for one asset,
  priced in a second asset.
- [Barter Exchange](./barter-exchange) - An exchange with an order book that allows all kinds of goods to be offered for explicit barter swaps.

If you want to build your own smart contract, start with the [Zoe API](../../api/README.md)
