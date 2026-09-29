# Example Zoe Contracts

While Zoe provides the means to build custom smart contracts, there is a good chance you will
want to use one that follows a commonly-used structure. `agoric-sdk` currently ships the demo
contracts below in
[`packages/zoe/src/contracts`](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts).
None of them are automatically deployed on-chain; for what actually runs in production, see
[Deployed Zoe Contracts](../actual-contracts/).

The economy contracts that used to be listed here (PSM, Vault, the constant-product AMM) were
removed from `agoric-sdk`; see [Vault](./vault) and [ConstantProduct AMM](./constantProductAMM)
for where that history went.

## Oracle Contracts

| Contract                                      | Description                                                                                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [Oracle Query](./oracle)                      | A low-level oracle contract for querying [Chainlink](https://docs.chain.link/docs/request-and-receive-data#config) or other oracles. |
| [PriceAuthority](/guides/zoe/price-authority) | To use an price oracle in your own contract, we recommend using the `priceAuthority` higher-level abstraction.                       |

## DeFi Contracts

These contracts create various sorts of financial instruments.

| Contract                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Loan](./loan)                           | A basic collateralized loan contract. Demo-only: the production loan path was the (now-removed) Inter Protocol `vaultFactory`.                                                                                                                                                                                                                                                                                                                                                |
| [Funded Call Spread](./fundedCallSpread) | Creates a pair of fully collateralized call spread options. They are ERTP assets and can be used as such in other contracts. This contract has two variants, which affect how invitations are created. This version is fully funded by the creator, who receives a matching pair of call spread options. They can be traded or sold separately.                                                                                                                               |
| [Priced Call Spread](./pricedCallSpread) | Creates a pair of fully collateralized call spread options. They are ERTP assets and can be used as such in other contracts. This contract has two variants, which affect how invitations are created. In this version, the creator requests a pair of invitations. Each one lets the holder obtain one of the positions by providing a started portion of the collateral. This version is useful for a market maker who finds pairs of participants with matching interests. |
| [Covered Call](./covered-call)           | Creates a call option, which is the right to buy an underlying asset.                                                                                                                                                                                                                                                                                                                                                                                                         |
| [OTC Desk](./otc-desk)                   | A contract for giving quotes that can be exercised. The quotes are guaranteed to be exercisable because they are actually options with escrowed underlying assets.                                                                                                                                                                                                                                                                                                            |

## Removed from agoric-sdk

| Contract                                    | Status                                                                                                                                                      |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vault](./vault)                            | The production collateralized-loan contract; part of Inter Protocol, removed from `agoric-sdk`. The page covers where its parts went.                       |
| [ConstantProduct AMM](./constantProductAMM) | The production automated market maker; part of Inter Protocol, removed from `agoric-sdk`. The page covers its history and the surviving demo `autoswap.js`. |

## Orchestration Example Contracts

[`@agoric/orchestration`](https://github.com/Agoric/agoric-sdk/tree/master/packages/orchestration/src/examples)
ships current `*.contract.js` examples of Zoe contracts that drive interchain accounts through
`vowTools` and `orchestrationKit`: `stake-bld`, `stake-ica`, `send-anywhere`, `swap-anything`,
`swap`, `unbond`, `auto-stake-it`, and `staking-combinations`. They're a better current
reference for a production-style contract than the demos on this page. See
[Deployed Zoe Contracts](../actual-contracts/) for what's actually running on mainnet.

## Generic Sales/Trading Contracts

These contracts involve trading or selling ERTP digital assets.

| Contract                                       | Description                                                                                                                                                                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Sell Items](./sell-items)                     | A generic sales contract, mostly used for selling NFTs for money.                                                                                                                                                      |
| [Atomic Swap](./atomic-swap)                   | A basic trade of digital assets between two parties.                                                                                                                                                                   |
| [Barter Exchange](./barter-exchange)           | An exchange with an order book letting all kinds of goods to be offered for explicit barter swaps.                                                                                                                     |
| [Second-Price Auction](./second-price-auction) | An auction in which the highest bidder wins and pays the second-highest bid. This version doesn't conceal the bids (an essential aspect of second price auctions). Therefore, **it should not be used in production**. |
| [Simple Exchange](./simple-exchange)           | A basic exchange with an order book for one asset, priced in a second asset.                                                                                                                                           |

## Test-fixture Contracts

These live under `packages/zoe/test/unitTests/contracts/`, not `packages/zoe/src/contracts/`;
they exist to exercise Zoe's test suite, not as contracts you'd reuse directly.

| Contract                           | Description                                                                                                                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Escrow To Vote](./escrow-to-vote) | A coin voting contract in which votes are weighted by the escrowed governance tokens.                                                                                                   |
| [Use Object](./use-obj-example)    | An example of how you might associate the ability to take an action with ownership of a particular digital asset. In this case, you can color a pixel if you own the NFT for the pixel. |

## Minting Contracts

| Contract                                   | Description                                                                  |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| [Mint Payments](./mint-payments)           | An example of minting fungible tokens.                                       |
| [Mint and Sell NFTs](./mint-and-sell-nfts) | A contract that mints NFTs and sells them through a separate sales contract. |

## Miscellaneous Contracts

| Contract                               | Description                                                   |
| -------------------------------------- | ------------------------------------------------------------- |
| [Automatic Refund](./automatic-refund) | A trivial contract that gives the user back what they put in. |
