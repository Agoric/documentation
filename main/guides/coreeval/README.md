# Permissioned Contract Deployment

The Agoric platform includes an on-chain governance mechanism for signaling, changing consensus parameters, network upgrades etc.,
based on the [Cosmos SDK gov module](https://tutorials.cosmos.network/tutorials/8-understand-sdk-modules/4-gov.html), with
a custom proposal type, [swingset.CoreEval](https://github.com/Agoric/agoric-sdk/blob/mainnet1B-rc3/golang/cosmos/proto/agoric/swingset/swingset.proto#L12), for executing Hardened JavaScript code
in the privileged VM core. In particular, approved code can perform
contract deployment.

::: tip Note

Until mainnet enters the Mainnet-3 phase of the [multi-phase mainnet rollout](https://agoric.com/blog/announcements/mainnet-phase-0-launch),
permissionless [contract installation](/guides/zoe/#contract-installation)
is limited to development environments.

:::

## Builder Script

In our earlier discussion of [contract installation](/guides/zoe/#contract-installation), our test read contract source files,
bundled them, and passed the result directly to Zoe:

```js
const bundle = await bundleSource(contractPath);
const installation = await E(zoe).install(bundle);
```

Code on chain can't read contract source files from local disk that way.
Instead, the Agoric VM has storage for code bundles, indexed by hash.
Part of the `start:contract` package script we used in [starting the offer-up contract](../getting-started), was an [agd tx swingset install-bundle](/guides/agoric-cli/agd-query-tx.html#agd-tx-swingset-install-bundle) command.

A CoreEval proposal has one or more **scripts**, each paired with a declarative **permit** that says what powers to grant to the script
when executing it.

- **permit**, **script** pairs. In the [basic offer-up dapp](../getting-started), we have just one such pair. Both parts are specified in `offer-up-proposal.js`.

Until then, permission to deploy contracts can be granted using an Agoric extension to [Cosmos SDK Governance](https://hub.cosmos.network/main/delegators/delegator-guide-cli.html#participating-in-governance) called `swingset.CoreEval`. As discussed in [governance using Hardened JavaScript: swingset\.CoreEval](https://community.agoric.com/t/bld-staker-governance-using-hardened-javascript-swingset-coreeval/99),
if such a proposal passes, its JavaScript code is run with ocaps extracted using the proposal's declared capabilities, which the code can combine to perform privileged tasks.

To do try it out in a local testnet chain:

1. [Declare the capabilities that the proposal will require](./permissions.md).
2. [Code the proposal itself](./proposal.md).
3. [Deploy the proposal to a local testnet](./local-testnet.md).
