# Zoe Pre-Built Contracts

<Zoe-Version/>

While Zoe provides the means to build custom smart contracts, there is a good chance you will
want to use one that follows a commonly-used structure. Therefore, we currently provide several
pre-built contracts that can be imported and run on Zoe:

- [Oracle Contract](./oracle.md) - the low-level oracle contract that
  can be used for querying [Chainlink oracles](https://docs.chain.link/docs/request-and-receive-data#config) or other oracles.
- [Atomic Swap](./atomic-swap.md) - A basic trade of digital assets between two parties.
- [Autoswap](./autoswap.md) - An automated market maker (implementating Uniswap v1) that
  can always trade between the two currencies in its liquidity pool.
- [Barter Exchange](./barter-exchange.md) - An exchange with an order book that allows all
  kinds of goods to be offered for explicit barter swaps.
- [Call Spread](./callSpread.md) - Creates a pair of fully collateralized call spread
  options, which are packaged as ERTP assets so they can be used as assets in other
  contracts.
- [Covered Call](./covered-call.md) - This type of contract oversees the sale and execution of a
  call option.
- [Multipool Autoswap](./multipoolAutoswap.md) - An automated market maker implementing
  Uniswap v1. It has multiple liquidity pools and can trade between any pair of funded
  currencies.
- [Second-price Auction](./second-price-auction.md) - An auction in which the highest bidder wins
  and pays the second-highest bid. This version doesn't conceal the bids (an essential aspect
  of second price auctions), therefore, <b>it should not be used in production.</b>
- [Simple Exchange](./simple-exchange.md) - A basic exchange with an order book for one asset,
  priced in a second asset.

If you want to build your own smart contract, start with the [Zoe API](../../api/README.md)
