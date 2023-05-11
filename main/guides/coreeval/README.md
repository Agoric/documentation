# Injecting Code to Agoric Testnet

Agoric facilitates safely injecting code to the Agoric testnet, usually for the purpose of running a contract and modifying it based on the result of a governance vote. To do so, we submit a proposal using cosmos-sdk level API ([swingset.CoreEval](https://community.agoric.com/t/blder-dao-governance-using-arbitrary-code-injection-swingset-coreeval/99)). The proposal runs a script that runs the contract, and possibly runs an additional script, depending on the result of a governance vote.

To do this, do the following:

1. [Code the permissions that the proposal will require](./permissions.md).
2. [Code the proposal itself](./proposal.md).
3. [Create a local testnet](./local-testnet.md).



