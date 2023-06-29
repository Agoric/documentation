# Running Code on Testnet

Agoric facilitates safely injecting code to the Agoric testnet, usually for the purpose of running a contract and modifying it based on the result of a governance vote. To do so, we submit a proposal using cosmos-sdk level API ([swingset.CoreEval](https://community.agoric.com/t/blder-dao-governance-using-arbitrary-code-injection-swingset-coreeval/99)). If the proposal passes its governance vote, its JavaScript code is run with ocaps extracted using the proposal's declared capabilities, which the code can combine to perform privileged tasks.

To do this, do the following:

1. [Declare the capabilities that the proposal will require](./permissions.md).
2. [Code the proposal itself](./proposal.md).
3. [Deploy the proposal to a local testnet](./local-testnet.md).



