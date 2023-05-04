# Deploying to Agoric Testnet

In order for an Agoric contract to publish data without having the user pay fees, the use of a chain storage node is required. A chain storage node is an object that can be passed to a contract by submitting a proposal using cosmos-sdk level API ([swingset.CoreEval](https://community.agoric.com/t/blder-dao-governance-using-arbitrary-code-injection-swingset-coreeval/99)). The proposal runs a script that gets access to the chain storage node and starts an instance of the contract, passing the storage node as a privateArg to the contract.

To deploy a contract, you need to do the following:

1. [Code the permissions that the proposal will require](./permissions.md).
2. [Code the proposal itself](./proposal.md).
3. [Create a local testnet](./local-testnet.md).



