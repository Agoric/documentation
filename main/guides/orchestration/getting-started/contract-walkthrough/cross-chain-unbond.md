# Cross-Chain Unbond Contract

<!-- XXX the diagram below is a useful part of the page but it needs to be updated before it is uncommented. -->
<!-- ## Overview Diagram

<br/>
<img src="/reference/assets/sequence-diagrams/orchestration-unbond-example.svg" width="100%" />
<br/> -->

This walkthrough outlines the functionality of the Unbond Contract that enables unbonding of assets from a
Cosmos-based chain and transferring them to another chain using IBC (Inter-Blockchain Communication).

## Overview

The Unbond Contract leverages the Agoric orchestration to interact with external chains, like Osmosis and Stride, to facilitate unbonding and transferring assets from one chain to another.

The contract consists of two main parts:

- **Contract File (`unbond.contract.js`)**: Defines the contract structure, and public-facing APIs.
- **Flows File (`unbond.flows.js`)**: Implements the logic for the unbonding and transfer operations.

---

## Contract: `unbond.contract.js`

This file contains the main orchestration contract, which is wrapped using the `withOrchestration` helper for Zoe. It exposes a public facet that allows users to initiate the unbonding process and transfer assets to another chain.

### Imports

The key imports include the `withOrchestration` helper, pattern matching utility `M`, and the flows from `unbond.flows.js` files.

```js
import { M } from '@endo/patterns';
import { withOrchestration } from '../utils/start-helper.js';
import * as flows from './unbond.flows.js';
```

### `contract` Function

The `contract` function when wrapped inside `withOrchestration` defines the [`start` function](#start-function) which is the entry point of the contract. The contract exports a `start` function [below](#start-function). It is merely a convention/convenience that we define a more abstract `contract` function here and pass it to `withOrchestration`. The `contract` function parameters include:

- `zcf`: Zoe Contract Facet.
- `privateArgs`: Object containing remote references to various services.
- `zone`: A `Zone` object with access to storage for persistent data.
- `OrchestrationTools`: A set of orchestration related tools needed by the contract.

```js
const contract = async (
  zcf,
  privateArgs,
  zone,
  { orchestrateAll, zcfTools }
) => {
  const { unbondAndTransfer } = orchestrateAll(flows, { zcfTools });

  const publicFacet = zone.exo('publicFacet', undefined, {
    makeUnbondAndTransferInvitation() {
      return zcf.makeInvitation(
        unbondAndTransfer,
        'Unbond and transfer',
        undefined,
        harden({
          give: {},
          want: {},
          exit: M.any()
        })
      );
    }
  });

  return harden({ publicFacet });
};
```

The `orchestrateAll` function links the flows from the flows file to the contract logic. In this case, it links the `unbondAndTransfer` flow. The `publicFacet` exposes the `makeUnbondAndTransferInvitation` method, which creates a Zoe invitation to allow users to make an offer for the unbonding and transferring process.

The following code defines the `start` function of the contract that is returned by a call to `withOrchestration` with [`contract` function](#contract-function) as a parameter. In essence `contract` function is the entry point or `start` function of this contract with some orchestration setup.

```js
export const start = withOrchestration(contract);
```

---

## Flows: `unbond.flows.js`

This file contains the orchestration flow that performs the unbonding and transferring of assets across chains.

### Flow Function: `unbondAndTransfer`

The `unbondAndTransfer` flow orchestrates the process of unbonding assets from a source chain (e.g., Osmosis) and transferring them to a destination chain (e.g., Stride).

```js
export const unbondAndTransfer = async (orch, { zcfTools }) => {
  const osmosis = await orch.getChain('osmosis');
  const osmoDenom = (await osmosis.getChainInfo()).stakingTokens[0].denom;

  const osmoAccount = await osmosis.makeAccount();
  const delegations = await osmoAccount.getDelegations();
  const osmoDelegations = delegations.filter(d => d.amount.denom === osmoDenom);

  await osmoAccount.undelegate(osmoDelegations);

  const stride = await orch.getChain('stride');
  const strideAccount = await stride.makeAccount();

  const balance = await osmoAccount.getBalance(osmoDenom);
  await osmoAccount.transfer(strideAccount.getAddress(), balance);
};
```

The above code achieve several things including:

- Retrieval of `osmosis` chain object, and `osmo` denom from the chain info.
- Create an `osmoAccount` on `osmosis`. _Note that in real-life scenario, this step would not be needed as we would be using an account that has already delegated some `osmo` assets_.
- Perform `undelegate` on `osmo` delegations of the `osmoAccount`.
- Create an account on `stride` chain.
- Transfer all `osmo` balance from `osmoAccount` to `strideAccount`.

Upon successful transfer, the assets are moved from the Osmosis chain to the Stride chain, ready for the user to claim.
