# Zoe Pre-Built Contracts

<Zoe-Version/>

While Zoe provides the means to build custom smart contracts, there is a good chance you will
want to use one that follows a commonly-used structure. Therefore, we currently provide several
pre-built contracts that can be imported and run on Zoe:

- [Atomic Swap](./atomic-swap) - A basic trade of digital assets between two parties.
- [Autoswap](./autoswap) - An automated market maker (implementating Uniswap v1) that
  can always trade between the two currencies in its liquidity pool.
- [Barter Exchange](./barter-exchange) - An exchange with an order book that allows all kinds of goods to be offered for explicit barter swaps.
- [Covered Call](./covered-call) - This type of contract oversees the sale and execution of a
  call option.
- [Second-price Auction](./second-price-auction) - An auction in which the highest bidder wins
  and pays the second-highest bid. This version doesn't conceal the bids (an essential aspect
  of second price auctions), therefore, <b>it should not be used in production.</b>
- [Simple Exchange](./simple-exchange) - A basic exchange with an order book for one asset,
  priced in a second asset.

If you want to build your own smart contract, start with the [Zoe API](../../api/README.md)
