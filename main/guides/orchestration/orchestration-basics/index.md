# dApp Orchestration Basics

To get started with developing using the Orchestration API, developers can make use of our [dapp-orchestration-basics](https://github.com/Agoric/dapp-orchestration-basics) template.

Following the dApp pattern of our existing dapp templates, `dapp-orchestration-basics` also contains a `contract` and a `ui`
directory within a single yarn workspace. In this walkthrough, we learn about the installation process, the contract
code, and UI components of `dapp-orchestration-basics`.

:::warning Template predates some current `@agoric/orchestration` conventions
`dapp-orchestration-basics` has not been updated since early 2025 and predates ChainHub's
`registerChainsAndAssets` helper and the current, destination-first `transfer(destination, amount, opts?)`
signature (the template's `orca.flows.js` still calls `transfer(amount, destination)`, amount-first). If you use
this template as a starting point, cross-check any account method you call against
[Key Concepts](/guides/orchestration/key-concepts) or the
[`orchestration-api.ts`](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/orchestration-api.ts)
source before relying on the argument order shown here.
:::

1. [Installation and Deployment](installation)
2. [Contract Code Walkthrough](contract)
3. [UI Walkthrough](ui)
