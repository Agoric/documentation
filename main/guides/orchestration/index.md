# What is Agoric Orchestration?

Agoric’s Orchestration capability allows developers to easily build cross-chain interactions into existing applications or to create novel cross-chain-focused products.

The Agoric Orchestration API sits on top of Agoric’s novel VM that provides three key elements that make multichain applications possible:

- **Remote account control and transfer**: Use the Orchestration APIs to easily create accounts on remote chains, transfer assets, and invoke contracts. Your Agoric contract orchestrates all behavior directly.
- **Multiblock execution with `async` and `await`**: Agoric applications communicate asynchronously and await responses which may come in the same block or many blocks (or weeks!) later. Contracts simply continue executing when the response arrives.
- **On-chain Timers**: Contracts can set timers for regular execution which makes executing common activities like subscriptions easy.

Agoric’s Orchestration APIs simplify controlling accounts on remote chains, moving assets, and using capabilities on any chain the API reaches.

## Orchestration Overview

Agoric's Orchestration API is a tool to help developers build seamless applications out of disparate interoperable chains and services. This composability allows for the development of user-centric applications that leverage the unique strengths of different blockchain ecosystems.

The Agoric Orchestration API simplifies interactions between multiple networks, particularly those using the [Inter-Blockchain Communication (IBC)](/glossary/#ibc) protocol within Cosmos. The API acts as an abstraction layer, streamlining multi-step processes.

Orchestration integrates with existing Agoric components ([SwingSet](/guides/platform/#swingset), Cosmos modules) and introduces vat-orchestration. This [vat](/glossary/#vat) manages Inter-Chain Account (ICA) identities and connections to host chains, ensuring proper transaction authorization.

The Orchestration API handles asynchronous tasks and complex workflows, including those spanning multiple chains. This empowers smart contracts for actions like inter-chain staking and multi-hop transfers, facilitated by notifications from the transfer vat and IBC middleware updates. Orchestration simplifies complex cross-chain interactions within a secure and user-controlled environment on the Agoric platform.

## Introduction to Orchestration API Flow

The following sequence diagram provides a comprehensive overview of the Orchestration process within the Agoric platform. This example illustrates the interaction between various components, highlighting how the Orchestration library (`OrchLib`) facilitates cross-chain operations. This is a good first example to understand the flow of the Orchestration API, showing the steps involved in creating and managing cross-chain transactions.

```mermaid
---
title: Orchestration Osmosis Transfer Example
config:
  themeVariables:
    fontSize: "32px"
---
sequenceDiagram
    actor contract
    contract->>OrchLib: provideOrchestration
    OrchLib --> contract: orch
    create participant orch
    contract --> orch: getChain('osmosis')
    orch->>AgoricNames: lookup('chain', 'osmosis')
    AgoricNames-->>orch: ChainInfo for osmosis
    orch --> contract: osmosis chain object
    participant osmosis
    contract->>osmosis: makeAccount()
    osmosis --> contract: osmoAccount123
    create participant osmoAccount123
    contract->>osmoAccount123: getAddress()
    contract->>osmoAccount123: getBalances()
    contract->>osmoAccount123: send(amount, receiverAddress)
    osmoAccount123-->>contract: Transaction Status
    %% note Cross-Chain Operation
    contract->>osmoAccount123: transferSteps(amount, transferMsg)
    %% note Execute Steps Across Chains
    osmoAccount123-->>contract: Transfer Complete
```
