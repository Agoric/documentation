# Deployed Zoe Contracts

The chain's bootstrap sequence still installs and starts a small set of Zoe contracts from
`agoric-sdk` itself. Everything else that runs in production today (Fast USDC, the YMax
portfolio contract, the orchestration examples) ships from its own package, either inside
`agoric-sdk` or in a sibling repository, and is deployed with a
[core-eval proposal](/guides/coreeval/) after the chain is already live.

## Inter Protocol was removed from agoric-sdk

Earlier revisions of this page described Inter Protocol (the [PSM](./PSM), `vaultFactory`,
`auctioneer`, `assetReserve`, `fluxAggregator`, `feeDistributor`, and the constant-product
AMM) as the chain's flagship deployed contracts. All of that source was deleted from
`agoric-sdk` in [Agoric/agoric-sdk#12744](https://github.com/Agoric/agoric-sdk/pull/12744)
(merged June 18, 2026): Inter Protocol is no longer supported, and there is no current
package to link to. The instances that were already running on mainnet before that change
keep running (the PR removed repository *source*, not the *on-chain instances*), but nobody
can install a fresh copy from `agoric-sdk` anymore.

Two pieces of the surrounding governance machinery survived the removal, relocated rather
than deleted:

- `startEconomicCommittee` and the committee/charter invitation behaviors moved to
  [`@agoric/vats`](https://github.com/Agoric/agoric-sdk/blob/master/packages/vats/src/proposals/start-econ-committee.js).
- The `econCommitteeCharter` contract moved to
  [`@agoric/governance`](https://github.com/Agoric/agoric-sdk/blob/master/packages/governance/src/econCommitteeCharter.js)
  (kept under its old name for on-chain continuity).

If you need the last Inter Protocol source for reference, browse the tree at the commit
before removal:
[`packages/inter-protocol` at `cbcea8c2`](https://github.com/Agoric/agoric-sdk/tree/cbcea8c2415f2c9c4bc1ea9ff90730f2773bafaa/packages/inter-protocol).
Treat it as historical: it will not build against current `agoric-sdk` packages.

## Contracts started during chain bootstrap

| Contract             | Package                                                                                                       | Description                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| centralSupply        | [`@agoric/vats`](https://github.com/Agoric/agoric-sdk/blob/master/packages/vats/src/centralSupply.js)          | initializes the vbank IST purse balance from the supply reported by the Cosmos `x/bank` module |
| mintHolder            | [`@agoric/vats`](https://github.com/Agoric/agoric-sdk/blob/master/packages/vats/src/mintHolder.js)             | holds mints for BLD and interchain assets such as ATOM, USDC, and USDT               |
| provisionPool         | [`@agoric/vats`](https://github.com/Agoric/agoric-sdk/blob/master/packages/vats/src/provisionPool.js)          | funds new smart-wallet accounts; governed by the economic committee                  |
| committee             | [`@agoric/governance`](https://github.com/Agoric/agoric-sdk/blob/master/packages/governance/src/committee.js)  | represents the economic committee that governs parameters of governed contracts      |
| binaryVoteCounter     | [`@agoric/governance`](https://github.com/Agoric/agoric-sdk/blob/master/packages/governance/src/binaryVoteCounter.js) | instantiated once per yes/no question the committee votes on                  |
| econCommitteeCharter  | [`@agoric/governance`](https://github.com/Agoric/agoric-sdk/blob/master/packages/governance/src/econCommitteeCharter.js) | controls what questions can be put to the economic committee                |
| contractGovernor      | [`@agoric/governance`](https://github.com/Agoric/agoric-sdk/blob/master/packages/governance/src/contractGovernor.js) | each governed contract is started alongside its own governor instance          |
| walletFactory         | [`@agoric/smart-wallet`](https://github.com/Agoric/agoric-sdk/blob/master/packages/smart-wallet/src/walletFactory.js) | creates and upgrades each user's [smart wallet](/guides/integration/name-services), and executes their Zoe offers |

## Product contracts deployed on top of the chain

These ship as core-eval proposals after bootstrap, each from its own package rather than
`agoric-sdk`'s bootstrap vats.

| Contract         | Package                                                                                                                     | Description                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Fast USDC          | [`@agoric/fast-usdc-contract`](https://github.com/Agoric/agoric-sdk/blob/master/packages/fast-usdc-contract/src/fast-usdc.contract.ts) | advances USDC to a recipient on Agoric ahead of a slower Circle CCTP transfer settling      |
| Portfolio (YMax)   | [`@agoric/portfolio-contract`](https://github.com/Agoric/agoric-sdk/blob/master/packages/portfolio-contract/src/portfolio.contract.ts) | manages a multi-chain yield portfolio using orchestration accounts                          |

## Orchestration examples

[`@agoric/orchestration`](https://github.com/Agoric/agoric-sdk/tree/master/packages/orchestration/src/examples)
ships a set of `*.contract.js` example contracts that exercise the orchestration API
(chain accounts, `vowTools`, `orchestrationKit`). They aren't all installed by default on
mainnet, but they're the best current worked examples of a Zoe contract that drives
interchain accounts: `stake-bld`, `stake-ica`, `send-anywhere`, `swap-anything`, `swap`,
`unbond`, `auto-stake-it`, and `staking-combinations`. See each file's header comment for
what it demonstrates.

## Deployed Vat Services

Other services run in vats that are not Zoe contracts.

| vat            | services                                                                               |
| -------------- | -------------------------------------------------------------------------------------- |
| bootstrap      | initial vat. also runs [core eval scripts](/guides/coreeval/)                          |
| vatAdmin       | creates, [upgrades](/guides/zoe/contract-upgrade), and terminates vats                 |
| agoricNames    | the `agoricNames` [name service](/guides/integration/name-services)                    |
| bank           | connects cosmos denoms with ERTP Brands/Issuers/Mints                                  |
| board          | the `board` [name service](/guides/integration/name-services)                          |
| bridge         | chainStorage etc.                                                                      |
| priceAuthority | registers [Price Authorities](../price-authority) and routes requests for price quotes |
| provisioning   | `namesByAddress` [name service](/guides/integration/name-services)                     |
| timer          | `chainTimerService`                                                                    |
| zoe            | the Zoe Service                                                                        |
