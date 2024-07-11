# Cross-Chain Unbond Contract

## Overview Diagram
<br/>
<img src="/reference/assets/sequence-diagrams/orchestration-unbond-example.svg" width="100%" />
<br/>

## Imports
```javascript
import { M } from '@endo/patterns';
import { withOrchestration } from '../utils/start-helper.js';
```

- `M`: Imported from @endo/patterns, provides pattern-matching utilities.
- `withOrchestration`: Imported from a utility module, used to set up and provide access to orchestration tools.

## JSDoc Annotations for Type Information
```javascript
/**
  * @import {Orchestrator, IcaAccount, CosmosValidatorAddress} from '../types.js'
 * @import {TimerService} from '@agoric/time';
 * @import {Baggage} from '@agoric/vat-data';
 * @import {LocalChain} from '@agoric/vats/src/localchain.js';
 * @import {NameHub} from '@agoric/vats';
 * @import {Remote} from '@agoric/internal';
 * @import {Zone} from '@agoric/zone';
 * @import {CosmosInterchainService} from '../exos/cosmos-interchain-service.js';
 * @import {OrchestrationTools} from '../utils/start-helper.js';
 */
```

This includes type information annotations to help with TypeScript or JSDoc, making it easier to understand the types used throughout the contract.

## `unbondAndLiquidStakeFn` Function
```javascript
/**
 * @param {Orchestrator} orch
 * @param {object} ctx
 * @param {ZCF} ctx.zcf
 * @param {ZCFSeat} _seat
 * @param {undefined} _offerArgs
 */
const unbondAndLiquidStakeFn = async (orch, { zcf }, _seat, _offerArgs) => {
    ...
```

### Function Parameters
- `orch`: The orchestrator object to manage interactions with chains/accounts.
- `ctx`: Context object containing zcf.
- `_seat`: The seat representing the user’s position in the contract (not used in this function, hence `_` prefix).
- `_offerArgs`: Arguments provided with the offer (not used in this function, hence `_` prefix).

## Interacting with Chains
```javascript
const omni = await orch.getChain('omniflixhub');
const omniAccount = await omni.makeAccount();
```

### Get Chain
Retrieves the omniflixhub chain object using the orchestrator.

### Make Account
Creates an account on the omniflixhub chain.

## Interaction with Stride Chain
```javascript
const stride = await orch.getChain('stride');
const strideAccount = await stride.makeAccount();
```

### Get Chain
Retrieves the stride chain object using the orchestrator.

### Make Account
Creates an account on the stride chain.

## `contract` Function
```javascript
/**
 * Orchestration contract to be wrapped by withOrchestration for Zoe
 *
 * @param {ZCF} zcf
 * @param {{
 *   agoricNames: Remote<NameHub>;
 *   localchain: Remote<LocalChain>;
 *   orchestrationService: Remote<CosmosInterchainService>;
 *   storageNode: Remote<StorageNode>;
 *   marshaller: Marshaller;
 *   timerService: Remote<TimerService>;
 * }} privateArgs
 * @param {Zone} zone
 * @param {OrchestrationTools} tools
 */
const contract = async (zcf, privateArgs, zone, { orchestrate }) => {
  ```
  ### `contract` Function Parameters:
- `zcf`: Zoe Contract Facet.
- `privateArgs`: Object containing remote references to various services.
- `zone`: A `Zone` object with access to storage for persistent data.
- `OrchestrationTools`: A set of orchestration related tools needed by the contract.

## Offer Handler for Unbond and Liquid Stake
```javascript
/** @type {OfferHandler} */
const unbondAndLiquidStake = orchestrate(
    'LSTTia',
    { zcf },
    unbondAndLiquidStakeFn,
);
```

### Offer Handler
Defines the offer handler for the unbond and liquid stake operation using [`unbondAndLiquidStakeFn`](#unbondandliquidstakefn-function).

## Make Invitation and Create `publicFacet`
```javascript
const publicFacet = zone.exo('publicFacet', undefined, {
  makeUnbondAndLiquidStakeInvitation() {
    return zcf.makeInvitation(
      unbondAndLiquidStake,
      'Unbond and liquid stake',
      undefined,
      harden({
        // Nothing to give; the funds come from undelegating
        give: {},
        want: {}, // XXX ChainAccount Ownable?
        exit: M.any(),
      }),
    );
  },
});

return harden({ publicFacet });
```

Defines the `publicFacet` for the contract, which includes the method to make an `invitation`, and returns the hardened public facet. Defining `publicFacet` with `zone.exo` makes it [remotely accessible](/glossary/#exo) and persistent through contract upgrades with a [durable `zone`](/glossary/#zone).

## `start` Function
```javascript
export const start = withOrchestration(contract);
```

Defines the `start` function of the contract as a wrapped veriosn of [`contract` function above](#contract-function) with `withOrchestration`.