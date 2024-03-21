# Deployed Zoe Contracts

In the [mainnet-1B release of agoric-sdk](https://github.com/Agoric/agoric-sdk/releases/tag/mainnet1B-rc3), the chain is configured to automatically deploy the following Zoe contracts. A [community post on Inter Protocol Vaults Contract Implementations](https://community.agoric.com/t/inter-protocol-vaults-contract-implementations/261) has a high level description.

| Contract             | Description                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| centralSupply        | used to initialize the vbank IST purse balance based on supply reported from the cosmos x/bank module                                                           |
| mintHolder           | use to hold mints for BLD as well as inter-chain assets such as ATOM, USDC, and USDT                                                                            |
| committee            | represents the Economic Committee that governs Inter Protocol parameters                                                                                        |
| binaryVoteCounter    | instantiated once for each question that a committee votes on                                                                                                   |
| econCommitteeCharter | controls what questions can be put to the economic committee                                                                                                    |
| contractGovernor     | each governed contract is started by starting its governor                                                                                                      |
| [PSM](./PSM)         | The Parity Stability Module (PSM) supports efficiently minting and burning Inter Stable Tokens (ISTs) in exchange for approved external stable tokens.          |
| vaultFactory         | allows users to mint IST backed by collateral such as ATOM; hands off vaults to auctioneer when value of collateral in a vault falls below a governed threshold |
| auctioneer           | auctions collateral from liquidated vaults                                                                                                                      |
| fluxAggregator       | a [Price Authority](../price-authority) that aggregates prices from oracle oeprators                                                                            |
| scaledPriceAuthoriy  | provides prices for tradeable assets such as ATOM in terms of idealized "oracle ATOM" prices from oracle operators                                              |
| feeDistributor       | collects fees from Inter Protocol contracts and distributes to reserve and/or stakers                                                                           |
| assetReserve         | holds assets in reserve to back IST                                                                                                                             |
| walletFactory        | executes Zoe offers on behalf of users                                                                                                                          |

## Deployed Vat Services

Other services run in vats that are not contracts.

| vat            | services                                                                               |
| -------------- | -------------------------------------------------------------------------------------- |
| bootstrap      | initial vat. also runs [core eval scripts](../../coreeval/)                            |
| vatAdmin       | creates, [upgrades](../../zoe/contract-upgrade), and terminates vats                   |
| agoricNames    | the `agoricNames` [name service](../../integration/name-services)                      |
| bank           | connects cosmos denoms with ERTP Brands/Issuers/Mints                                  |
| board          | the `board` [name service](../../integration/name-services)                            |
| bridge         | chainStorage etc.                                                                      |
| priceAuthority | registers [Price Authorities](../price-authority) and routes requests for price quotes |
| provisioning   | `namesByAddress` [name service](../../integration/name-services)                       |
| timer          | `chainTimerService`                                                                    |
| zoe            | the Zoe Service                                                                        |
