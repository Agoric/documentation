# Cross-Chain Swap Contract

## Imports
```javascript
import { StorageNodeShape } from '@agoric/internal';
import { TimerServiceShape } from '@agoric/time';
import { withdrawFromSeat } from '@agoric/zoe/src/contractSupport/zoeHelpers.js';
import { Far } from '@endo/far';
import { deeplyFulfilled } from '@endo/marshal';
import { M, objectMap } from '@endo/patterns';
import { orcUtils } from '../utils/orc.js';
import { provideOrchestration } from '../utils/start-helper.js';
```

Importing Shapes and Utilities:
- `StorageNodeShape` and TimerServiceShape are imported for defining the shape of certain objects.
- `withdrawFromSeat` is a helper function from Zoe to withdraw funds from a seat.
- `Far` is used to create a remotely accessible object.
- `deeplyFulfilled` ensures that all promises within an object are resolved.
- `M` and `objectMap` are pattern-matching utilities.
- `orcUtils` is a utility library specific to orchestrating chain operations.
- `provideOrchestration` is a function that sets up orchestration.

## JSDoc Annotations for Type Information
```javascript
/**
 * @import {Orchestrator, IcaAccount, CosmosValidatorAddress} from '../types.js'
 * @import {TimerService} from '@agoric/time';
 * @import {LocalChain} from '@agoric/vats/src/localchain.js';
 * @import {Remote} from '@agoric/internal';
 * @import {OrchestrationService} from '../service.js';
 * @import {Baggage} from '@agoric/vat-data'
 * @import {NameHub} from '@agoric/vats';
 */
```

This includes type information to help with TypeScript or JSDoc annotations, which are useful for understanding the types used throughout the contract.

## `stakeAndSwapFn` Function Definition

```javascript
/**
 * @param {Orchestrator} orch
 * @param {object} ctx
 * @param {ZCF} ctx.zcf
 * @param {ZCFSeat} seat
 * @param {object} offerArgs
 * @param {Amount<'nat'>} offerArgs.staked
 * @param {CosmosValidatorAddress} offerArgs.validator
 */
const stakeAndSwapFn = async (orch, { zcf }, seat, offerArgs) => {
    ...
```

Function Parameters:
- `orch`: The orchestrator object to manage interactions with chains/accounts.
- `ctx`: Context object containing zcf.
- `seat`: The seat representing the user’s position in the contract.
- `offerArgs`: Arguments provided with the offer, including staked amount and validator address.

```javascript
const { give } = seat.getProposal();
```

Extracts the give part of the proposal from the seat. This includes what the user is offering to the contract.

```javascript
const omni = await orch.getChain('omniflixhub');
const agoric = await orch.getChain('agoric');
```

Retrieves chain objects for omniflixhub and agoric chains using the orchestrator.

```javascript
const [omniAccount, localAccount] = await Promise.all([
    omni.makeAccount(),
    agoric.makeAccount(),
]);
```

Creates accounts on both omniflixhub and agoric chains concurrently.

```javascript
const omniAddress = omniAccount.getAddress();
```

Retrieves the address of the omniAccount.

## Depositing and Exiting

```javascript
// deposit funds from user seat to LocalChainAccount
const payments = await withdrawFromSeat(zcf, seat, give);
await deeplyFulfilled(
    objectMap(payments, payment =>
      localAccount.deposit(payment),
    ),
);
seat.exit();
```

### Withdraw Funds
Withdraws the funds specified in the give part of the proposal from the seat.

### Deposit Funds 
Deposits the withdrawn payments into the local account.

### Exit Seat
The user’s seat exits the contract, completing their involvement.

## Building and Executing Swap Instructions

```javascript
// build swap instructions with orcUtils library
const transferMsg = orcUtils.makeOsmosisSwap({
    destChain: 'omniflixhub',
    destAddress: omniAddress,
    amountIn: give.Stable,
    brandOut: 'FIXME',
    slippage: 0.03,
});
```

### Build Swap Instructions
Constructs the swap instructions using orcUtils.makeOsmosisSwap. Parameters include destination chain, destination address, input amount, output brand (placeholder), and slippage tolerance.

```javascript
await localAccount
.transferSteps(give.Stable, transferMsg)
.then(_txResult =>
    omniAccount.delegate(offerArgs.validator, offerArgs.staked),
)
.catch(e => console.error(e));
```

### Execute Swap
Transfers the stablecoins according to the swap instructions.

### Delegate
Delegates the staked amount to the specified validator on the omniflixhub chain.

### Error Handling
Logs any errors that occur during the process.

## Export Contract Meta
```javascript
/** @type {ContractMeta<typeof start>} */
export const meta = {
  privateArgsShape: {
    agoricNames: M.remotable('agoricNames'),
    localchain: M.remotable('localchain'),
    orchestrationService: M.or(M.remotable('orchestration'), null),
    storageNode: StorageNodeShape,
    marshaller: M.remotable('marshaller'),
    timerService: M.or(TimerServiceShape, null),
  },
  upgradability: 'canUpgrade',
};
harden(meta);
```

### Contract Metadata
Defines the shape of private arguments and the contract’s upgradability.

### harden
Ensures that the metadata object is immutable.

## Utility Functions
```javascript
// XXX copied from inter-protocol
// TODO move to new `@agoric/contracts` package when we have it
/**
 * @param {Brand} brand must be a 'nat' brand, not checked
 * @param {NatValue} [min]
 */
export const makeNatAmountShape = (brand, min) =>
  harden({ brand, value: min ? M.gte(min) : M.nat() });
```

### makeNatAmountShape
Utility function to create a shape for amounts of the specified brand. If a minimum value is provided, ensures the amount is greater than or equal to it.

## Start Function
```javascript
/**
 * @param {ZCF} zcf
 * @param {{
 *   agoricNames: Remote<NameHub>;
 *   localchain: Remote<LocalChain>;
 *   orchestrationService: Remote<OrchestrationService>;
 *   storageNode: Remote<StorageNode>;
 *   timerService: Remote<TimerService>;
 *   marshaller: Marshaller;
 * }} privateArgs
 * @param {Baggage} baggage
 */
export const start = async (zcf, privateArgs, baggage) => {
  const {
    agoricNames,
    localchain,
    orchestrationService,
    storageNode,
    timerService,
    marshaller,
  } = privateArgs;
```

## Start Function Parameters
Includes `zcf`, `privateArgs`, and `baggage`.

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

```javascript
const { brands } = zcf.getTerms();
```

This retrieves the brands specified in the contract terms.

## Offer Handlers

```javascript
  /** deprecated historical example */
  /**
   * @type {OfferHandler<
   *   unknown,
   *   { staked: Amount<'nat'>; validator: CosmosValidatorAddress }
   * >}
   */
  const swapAndStakeHandler = orchestrate('LSTTia', { zcf }, stackAndSwapFn);
```

### swapAndStakeHandler Offer Handler
Defines the offer handler for the swap and stake operation using `stakeAndSwapFn`.

```javascript
const makeSwapAndStakeInvitation = () =>
    zcf.makeInvitation(
        swapAndStakeHandler,
        'Swap for TIA and stake',
        undefined,
        harden({
            give: { Stable: makeNatAmountShape(brands.Stable, 1n) },
            want: {}, // XXX ChainAccount Ownable?
            exit: M.any(),
        }),
    );
```

Creates an `invitation` for users to swap stablecoins for TIA and stake.

## Public Facet
```javascript
  const publicFacet = Far('SwapAndStake Public Facet', {
    makeSwapAndStakeInvitation,
  });

  return harden({ publicFacet });
};
```

Defines the `publicFacet` for the contract, which includes the method to make an `invitation`, and returns the hardened public facet.