# Contract Walkthroughs

This section is designed to provide detailed explanations and insights into example orchestration smart contracts.

In this section, we will cover three primary contracts:

1. `swapExample.contract.js`: A comprehensive guide to the process of swapping assets between different chains using the Agoric orchestration library.
2. `unbondExample.contract.js`: A detailed walkthrough of the unbonding and liquid staking process, highlighting the steps involved in managing cross-chain operations.
3. `orca.contract.js`: A dapp template serving as an introduction to the foundational concepts and implementation of basic orchestration within an Agoric dApp (currently under active development).

Each walkthrough will include line-by-line explanations of the contract code, providng insights into the mechanics and best practices of smart contract development on the Agoric platform. By the end of these walkthroughs, you should have a solid understanding of how to utilize Agoric’s tools and libraries to create robust and efficient cross-chain smart contracts.

## Swap Contract

The Swap Contract demonstrates how to swap assets between the Agoric chain and another blockchain. This example covers:

- Initializing and seting up the contract.
- Creating and managing accounts on different chains.
- Executing cross-chain asset transfers.
- Handling errors and ensuring secure transactions.

[See Contract Overview](/guides/orchestration/getting-started/contract-walkthrough/cross-chain-swap)

## Unbond Contract

The Unbond Contract focuses on the process of unbonding staked assets and performing liquid staking. Key topics include:

- Interacting with multiple chains using the orchestrator.
- Implementing delegation and undelegation logic.
- Managing asynchronous operations and ensuring the completion of long-running processes.

[See Contract Overview](/guides/orchestration/getting-started/contract-walkthrough/cross-chain-unbond)

## Dapp Orchestration Basics

The Agoric Dapp Orchestration Basics walkthrough (currently under development) will provide an introduction to the core concepts and basic implementation of orchestrtion within an Agoric dApp. This guide aims to:

- Explain the fundamental principles of orchestration.
- Show an end-to-end dApp using the Orchestration API

[See Contract Overview](/guides/orchestration/getting-started/contract-walkthrough/orchestration-basics)
