# Cross-Chain Unbond Contract

## Overview Diagram
<br/>
<img src="/reference/assets/sequence-diagrams/orchestration-unbond-example.svg" width="100%" />
<br/>

## Imports
```javascript
import { M } from '@endo/patterns';
import { provideOrchestration } from '../utils/start-helper.js';
```

- `M`: Imported from @endo/patterns, provides pattern-matching utilities.
- `provideOrchestration`: Imported from a utility module, used to set up orchestration.

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

## unbondAndLiquidStakeFn Function Definition
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

## Placeholder for Delegation and Undelegation
TODO
```javascript
// TODO implement these
// const delegations = await celestiaAccount.getDelegations();
// // wait for the undelegations to be complete (may take weeks)
// await celestiaAccount.undelegate(delegations);
// ??? should this be synchronous? depends on how names are resolved.
```

### Delegation and Undelegation TODO
Placeholder comments for future implementation of getting delegations and undelegating them.


## Interaction with Stride Chain
```javascript
const stride = await orch.getChain('stride');
const strideAccount = await stride.makeAccount();
```

### Get Chain
Retrieves the stride chain object using the orchestrator.

### Make Account
Creates an account on the stride chain.

## Placeholder for Liquid Staking
TODO
```javascript
  // TODO the `TIA` string actually needs to be the Brand from AgoricNames
  // const tiaAmt = await celestiaAccount.getBalance('TIA');
  // await celestiaAccount.transfer(tiaAmt, strideAccount.getAddress());
  // await strideAccount.liquidStake(tiaAmt);
  console.log(omniAccount, strideAccount);
```

### Liquid Staking
TODO
Placeholder comments for future implementation of getting the TIA balance, transferring it to the stride account, and performing liquid staking.

## Start Function
```javascript
/**
 * @param {ZCF} zcf
 * @param {{
 *   agoricNames: Remote<NameHub>;
 *   localchain: Remote<LocalChain>;
 *   orchestrationService: Remote<OrchestrationService>;
 *   storageNode: Remote<StorageNode>;
 *   marshaller: Marshaller;
 *   timerService: Remote<TimerService>;
 * }} privateArgs
 * @param {Baggage} baggage
 */
export const start = async (zcf, privateArgs, baggage) => {
  const {
    agoricNames,
    localchain,
    orchestrationService,
    storageNode,
    marshaller,
    timerService,
  } = privateArgs;
```

### Start Function Parameters:
- `zcf`: Zoe Contract Facet.
- `privateArgs`: Object containing remote references to various services.
- `baggage`: Storage for persistent data.


## Provide Orchestration
```javascript
  const { orchestrate } = provideOrchestration(
    zcf,
    baggage,
    {
      agoricNames,
      localchain,
      orchestrationService,
      storageNode,
      timerService,
    },
    marshaller,
  );
```

Sets up orchestration using the provided arguments and `marshaller`.

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
Defines the offer handler for the unbond and liquid stake operation using `unbondAndLiquidStakeFn`.

## Make Invitation
```javascript
const makeUnbondAndLiquidStakeInvitation = () =>
    zcf.makeInvitation(
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
```

## Public Facet
```javascript
const publicFacet = Far('SwapAndStake Public Facet', {
    makeUnbondAndLiquidStakeInvitation,
});

return harden({ publicFacet });
};
```

Defines the `publicFacet` for the contract, which includes the method to make an `invitation`, and returns the hardened public facet.