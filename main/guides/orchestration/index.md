# Orchestration Overview
Agoric's Orchestration API is a tool to help developers build seamless applications out of disparate interoperable chains and services.
This composability allows for the development of user-centric applications that leverage the unique strengths of different blockchain ecosystems.

The Agoric Orchestration API simplifies interactions between multiple networks, particularly those
using the [Inter-Blockchain Communication (IBC)](/glossary/#ibc) protocol within Cosmos. The API acts as an 
abstraction layer, streamlining multi-step processes.

Orchestration integrates with existing Agoric components ([SwingSet](/guides/platform/#swingset), Cosmos modules) and introduces vat-orchestration. This [vat](/glossary/#vat) manages Inter-Chain Account (ICA) identities and connections to host chains, ensuring proper transaction authorization. 

The Orchestration API handles asynchronous tasks and complex workflows, including those spanning multiple chains. This empowers smart contracts for actions like inter-chain staking and multi-hop transfers, facilitated by notifications from the transfer vat and IBC middleware updates. Orchestration simplifies complex cross-chain interactions within a secure and user-controlled environment on the Agoric platform.


# Introduction to Orchestration API Flows

The following sequence diagram provides a comprehensive overview of the orchestration process within the Agoric platform. This example illustrates the interaction between various components, highlighting how the orchestration library (`OrchLib`) facilitates cross-chain operations. This is a good first example to understand the flow of the Orchestration API, showing the steps involved in creating and managing cross-chain transactions.


<br/>
<img src="/reference/assets/orchestration-workflow-1.svg" width="100%" />
<br/>