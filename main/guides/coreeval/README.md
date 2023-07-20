# Permissioned Contract Deployment

Until mainnet enters the Mainnet-3 phase of the [multi-phase mainnet rollout](https://agoric.com/blog/announcements/mainnet-phase-0-launch),
permissionless [contract installation with Zoe](/guides/zoe/#writing-and-installing-a-contract)
is limited to development environments.

Until then, permission to deploy contracts can be granted using an Agoric extension to [Cosmos SDK Governance](https://hub.cosmos.network/main/delegators/delegator-guide-cli.html#participating-in-governance) called `swingset.CoreEval`. As discussed in [governance using Hardened JavaScript: swingset\.CoreEval](https://community.agoric.com/t/bld-staker-governance-using-hardened-javascript-swingset-coreeval/99),
if such a proposal passes, its JavaScript code is run with ocaps extracted using the proposal's declared capabilities, which the code can combine to perform privileged tasks.

To do try it out in a local testnet chain:

1. [Declare the capabilities that the proposal will require](./permissions.md).
2. [Code the proposal itself](./proposal.md).
3. [Deploy the proposal to a local testnet](./local-testnet.md).



