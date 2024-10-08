# Contract Walkthroughs

This section is designed to provide detailed explanations and insights into example Orchestration smart contracts.

In this section, we will cover two primary contracts:

1. **Assets Transfer Contract**: A guide to `send-anywhere` contract that demonstrates a simple yet robust and secure way for cross-chain assets transfer.
2. **Unbond Contract**: A detailed walkthrough of the unbonding and liquid staking process, highlighting the steps involved in managing cross-chain operations.

Each walkthrough will include detailed explanations of the contract code, providing insights into the mechanics and best practices of smart contract development on the Agoric platform. By the end of these walkthroughs, you should have a solid understanding of how to utilize Agoric’s tools and libraries to create robust and efficient cross-chain smart contracts.

## Assets Transfer Contract

The "Send Anywhere" contract is a robust and secure solution for transferring assets between blockchains. It ensures that:

- Assets are securely held in a local account before being transferred.
- Detailed logs are kept for transparency and error tracing.
- The contract is resilient to failure, with built-in rollback mechanisms.
- By using Agoric’s Orchestration tools, this contract provides a secure way to facilitate cross-chain asset transfers.

[See Contract Overview](/guides/orchestration/contract-walkthroughs/send-anywhere)

## Unbond Contract

The Unbond Contract focuses on the process of unbonding staked assets and performing liquid staking. Key topics include:

- Interacting with multiple chains using the orchestrator.
- Implementing delegation and undelegation logic.
- Managing asynchronous operations and ensuring the completion of long-running processes.

[See Contract Overview](/guides/orchestration/contract-walkthroughs/cross-chain-unbond)
