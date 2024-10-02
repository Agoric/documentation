# Permissioned Contract Deployment

Until mainnet enters the Mainnet-3 phase of the [multi-phase mainnet rollout](https://agoric.com/blog/announcements/mainnet-phase-0-launch),
permissionless [contract installation with Zoe](/guides/zoe/contract-walkthru#contract-installation)
is limited to development environments.

Until then, permission to deploy contracts can be granted using an Agoric extension to [Cosmos SDK Governance](https://hub.cosmos.network/delegators/delegator-guide-cli.html#participating-in-governance) called `swingset.CoreEval`. As discussed in [governance using Hardened JavaScript: swingset\.CoreEval](https://community.agoric.com/t/bld-staker-governance-using-hardened-javascript-swingset-coreeval/99),
if such a proposal passes, its JavaScript code is run with ocaps extracted using the proposal's permitted capabilities, which the code can combine to perform privileged tasks.

To make a proposal to deploy a contract:

1. [Write JavaScript code to deploy the contract](./proposal.md).
2. [Declare the capabilities that the script requires](./permissions.md).
3. [Submit transactions to install and deploy the contract](./local-testnet.md).
