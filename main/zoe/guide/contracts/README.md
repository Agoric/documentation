# Zoe Pre-Built Contracts

<Zoe-Version/>

While Zoe provides the means to build custom smart contracts, there is a good chance you will
want to use one that follows a commonly-used structure. Therefore, we currently provide several
pre-built contracts that can be imported and run on Zoe:

## Oracles

- [Oracle Contract](./oracle.md) - the low-level oracle contract that
  can be used for querying [Chainlink
  oracles](https://docs.chain.link/docs/request-and-receive-data#config)
  or other oracles. 

- [PriceAuthority](/zoe/guide/price-authority.md): To use an price
  oracle in your own contract, we recommend using the `priceAuthority`
  higher-level abstraction.

## DeFi Contracts

These contracts create various sorts of financial instruments.

- [Loan Contract](./loan.md) - a basic collateralized loan contract.
- [Funded Call Spread](./fundedCallSpread.md) - Creates a pair of fully collateralized call spread
  options. They are ERTP assets and can be used as such in other contracts. There are two variants
  of this contract, which affect the way invitations are created. This version is fully funded by
  the creator, who receives a matching pair of call spread options, which can be traded or sold
  separately.
- [Priced Call Spread](./pricedCallSpread.md) - Creates a pair of fully collateralized call spread
  options. They are ERTP assets and can be used as such in other contracts. There are two variants
  of this contract, which affect the way invitations are created. In this version, the creator
  requests a pair of invitations, each of which enables the holder to obtain one of the positions by
  providing a started portion of the collateral. This version would be useful for a market maker who
  finds pairs of people with matching interests.
- [Covered Call](./covered-call.md) - Creates a call option, which is the right
  to buy an underlying asset.
- [OTC Desk](./otc-desk.md) - A contract for giving quotes that can be
  exercised. The quotes are guaranteed to be exercisable because they
  are actually options with the underlying assets escrowed.

## Uniswap-like Constant Product AMMs

- [Autoswap](./autoswap.md) - An automated market maker (implementating Uniswap v1) that
  can always trade between the two currencies in its liquidity pool.
- [Multipool Autoswap](./multipoolAutoswap.md) - An automated market maker implementing
  Uniswap v1. It has multiple liquidity pools and can trade between any pair of funded
  currencies.

## Generic Sales/Trading Contracts

These contracts involve trading or selling ERTP digital assets.

- [Sell Items](./sell-items.md) - A generic sales contract, mostly
  used for selling NFTs for money.
- [Atomic Swap](./atomic-swap.md) - A basic trade of digital assets between two parties.
- [Barter Exchange](./barter-exchange.md) - An exchange with an order book that allows all
  kinds of goods to be offered for explicit barter swaps.
- [Second-price Auction](./second-price-auction.md) - An auction in which the highest bidder wins
  and pays the second-highest bid. This version doesn't conceal the bids (an essential aspect
  of second price auctions), therefore, <b>it should not be used in production.</b>
- [Simple Exchange](./simple-exchange.md) - A basic exchange with an order book for one asset,
  priced in a second asset.

## Governance

- [Escrow To Vote](./escrow-to-vote.md) - A coin voting contract in which
  votes are weighted by the escrowed governance tokens.

## Minting

- [Mint Payments](./mint-payments.md) - An example of minting fungible
  tokens.
- [Mint and Sell NFTs](./mint-and-sell-nfts.md) - A contract that
  mints NFTs and sells them through a separate sales contract.

## Misc

- [Use Obj Example](./use-obj-example.md) - An example of how you
  might associate the ability to take an action with ownership of a
  particular digital asset. In this case, you can color a pixel if you
  own the NFT for the pixel.

## Trivial Examples

- [Automatic Refund](./automatic-refund.md) - A trivial contract that
  gives the user back what they put in.


If you want to build your own smart contract, start with the [Zoe API](../../api/README.md)
