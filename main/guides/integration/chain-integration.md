# Integrating with Agoric Network

The Agoric network builds a blockchain for smart contracts in JavaScript using the `cosmos-sdk`. Cosmos-sdk is software that provides the widely-used CometBFT consensus (formerly Tendermint Core) and best-in-class support for chain operations like staking and governance. For simplicity of chain integration, the Agoric Network works identically to the Cosmos Hub, except using different parameters (e.g., `ubld` instead of `uatom`).

## TL;DR for Cosmos-experienced

This section points at relevant reference documentation for the underlying `cosmos-sdk` and CometBFT consensus engine, and summarizes the differences.

The Agoric Network currently uses `cosmos-sdk` v0.53. The general Cosmos documentation for this version can be [found here](https://docs.cosmos.network/sdk/v0.53/), including structure and `golang` documentation, and REST API documentation.

To browse and try the REST/gRPC-gateway API interactively, use a chain's LCD Swagger UI (served at `/swagger/` on an API node that has Swagger enabled) or a public explorer's API console. To use the "Try it out" functionality, change the Base URL to a live Agoric API endpoint such as `main.api.agoric.net` (see [Chain resources](#chain-resources) below for how to discover current endpoints):

| ![Alt name of image](./assets/cosmos-api.png) |
| --------------------------------------------- |

The chain can also be accessed via JavaScript using the [`cosmjs` library](https://github.com/cosmos/cosmjs) (and [associated tutorials](https://tutorials.cosmos.network/tutorials/7-cosmjs/1-cosmjs-intro.html)), or using [CosmosKit](https://cosmoskit.com/).

## Chain resources

- The base network entry points for the Agoric chain are specified in the [network config](https://main.agoric.net/network-config).
- Additional chain information, including tokens and their logos, gas fee information for wallets, additional entry points, and explorers is maintained in the Cosmos [Chain Registry](https://github.com/cosmos/chain-registry/tree/master/agoric).
- The source code for the Agoric Network runtime and contracts is in [the Agoric open source repository](https://github.com/Agoric/agoric-sdk) on GitHub.
- The base unit for staking is `ubld` (corresponding to `uatom` for Cosmos Hub)
- The command utility of the agoric chain is `agd` (corresponding to [`simd` for the Cosmos Hub](https://docs.cosmos.network/sdk/v0.53/user/run-node/interact-node)).

---

# Tools

## Building `agd`

The `agd` command line tool can be built by running the commands as below:

```sh
git clone -b community-dev https://github.com/Agoric/agoric-sdk
cd agoric-sdk
SKIP_DOWNLOAD=false ./bin/agd build
export PATH=$PWD/bin:$PATH
```

To confirm that `agd` is in your `$PATH`, execute

```
agd version --long
```

Unlike typical cosmos-sdk chains where the daemon is a single executable file, Agoric's use of cosmos-sdk depends
on many components of agoric-sdk at runtime. Copying `agd` to `/usr/local/bin` or the like is unlikely to produce
a working installation. For more detail, see [#7825](https://github.com/Agoric/agoric-sdk/issues/7825).

# FAQ

- How are transactions encoded?
  [Cosmos SDK v0.53 Docs - Encoding](https://docs.cosmos.network/sdk/v0.53/learn/advanced/encoding)
- What data is needed to create a transaction (last block hash, nonce, sender public key, etc.)?
  [Cosmos SDK v0.53 Docs - Transaction Lifecycle](https://docs.cosmos.network/sdk/v0.53/learn/beginner/tx-lifecycle)
- What data is signed and how is that data obtained (for example truncated SHA256 of transaction data)?
  [Cosmos SDK v0.53 Docs - Transactions](https://docs.cosmos.network/sdk/v0.53/learn/advanced/transactions)
- Do transactions expire?
  Transaction do not expire unless you specify --timeout-height: [Cosmos SDK v0.53 Docs - Transactions](https://docs.cosmos.network/sdk/v0.53/learn/advanced/transactions)
  However they do have a sequence number and may be invalidated if another transaction with the same sequence number is processed by the chain
- How are addresses generated?
  [Cosmos SDK v0.53 Docs - Accounts](https://docs.cosmos.network/sdk/v0.53/learn/beginner/accounts)
- How is the blockchain queried?
  JSON-RPC, gRPC, REST [Cosmos SDK v0.53 Docs - Interact with a Node](https://docs.cosmos.network/sdk/v0.53/user/run-node/interact-node)
