# Contract Walkthroughs

This section is designed to provide detailed explanations and insights into example orchestration smart contracts.

In this section, we will cover three primary contracts:

1. `Assets Transfer Contract`: A guide to `send-anywhere` contract that demonstrates a simple yet robust and secure way for cross-chain assets transfer.
2. `Swap Contract`: A comprehensive guide to the process of swapping assets between different chains using the Agoric orchestration library.
3. `Unbond Contract`: A detailed walkthrough of the unbonding and liquid staking process, highlighting the steps involved in managing cross-chain operations.
4. `Orchestration Basics Contract`: A dApp template serving as an introduction to the foundational concepts and implementation details of orchestration basics within an Agoric dApp.

Each walkthrough will include detailed explanations of the contract code, providing insights into the mechanics and best practices of smart contract development on the Agoric platform. By the end of these walkthroughs, you should have a solid understanding of how to utilize Agoric’s tools and libraries to create robust and efficient cross-chain smart contracts.

## Assets Transfer Contract

The "Send Anywhere" contract is a robust and secure solution for transferring assets between blockchains. It ensures that:

- Assets are securely held in a local account before being transferred.
- Detailed logs are kept for transparency and error tracing.
- The contract is resilient to failure, with built-in rollback mechanisms.
- By using Agoric’s orchestration tools, this contract provides a secure way to facilitate cross-chain asset transfers.

[See Contract Overview](/guides/orchestration/getting-started/contract-walkthrough/send-anywhere)

## Swap Contract

The Swap Contract demonstrates how to swap assets between the Agoric chain and another blockchain. This example covers:

- Initializing and setting up the contract.
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

## DApp Orchestration Basics

DApp Orchestration Basics walkthrough will provide an introduction to the implementation level details of orchestration within an Agoric dApp. This guide aims to:

- Explain the fundamental principles of orchestration.
- Show an end-to-end dApp using the Orchestration API

[See Contract Overview](/guides/orchestration/getting-started/contract-walkthrough/orchestration-basics)
