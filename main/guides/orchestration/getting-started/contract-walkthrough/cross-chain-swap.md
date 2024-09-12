# Cross-Chain Swap Contract

## Overview Diagram

<br/>
<img src="/reference/assets/sequence-diagrams/orchestration-swap-example.svg" width="100%" />
<br/>

## Imports

```javascript
import { StorageNodeShape } from '@agoric/internal'
import { TimerServiceShape } from '@agoric/time'
import { withdrawFromSeat } from '@agoric/zoe/src/contractSupport/zoeHelpers.js'
import { deeplyFulfilled } from '@endo/marshal'
import { M, objectMap } from '@endo/patterns'
import { orcUtils } from '../utils/orc.js'
import { withOrchestration } from '../utils/start-helper.js'
```

Importing Shapes and Utilities:

- `StorageNodeShape` and `TimerServiceShape` are imported for validating the `privateArgs`.
- `withdrawFromSeat` is a helper function from Zoe to withdraw funds from a seat.
- `deeplyFulfilled` is a function that ensures that all promises within an object are resolved.
- `M` are pattern-matching utilities, and `objectMap` is like `Array.map` but for properties of an object.
- `orcUtils` is a utility library specific to orchestrating chain operations.
- `withOrchestration` is a function that sets up orchestration.

## Type Imports

```javascript
/**
 * @import {Orchestrator, IcaAccount, CosmosValidatorAddress} from '../types.js'
 * @import {TimerService} from '@agoric/time';
 * @import {LocalChain} from '@agoric/vats/src/localchain.js';
 * @import {Remote} from '@agoric/internal';
 * @import {CosmosInterchainService} from '../exos/cosmos-interchain-service.js';
 * @import {NameHub} from '@agoric/vats';
 * @import {Zone} from '@agoric/zone';
 * @import {OrchestrationTools} from '../utils/start-helper.js';
 */
```

This includes type information to help with TypeScript or JSDoc annotations, which are useful for understanding the types used throughout the contract.

## `stakeAndSwapFn` Offer Handler

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
- `seat`: The seat representing the contract's position in the offer.
- `offerArgs`: Arguments provided with the offer, including staked amount and validator address.

```javascript
const { give } = seat.getProposal()
```

Extracts the `give` part of the proposal from the seat. This includes what the user is offering to the contract.

```javascript
const omni = await orch.getChain('omniflixhub')
const agoric = await orch.getChain('agoric')
```

Retrieves chain objects for omniflixhub (a remote chain) and agoric (the local chain) chains using the orchestrator.

```javascript
const [omniAccount, localAccount] = await Promise.all([
  omni.makeAccount(),
  agoric.makeAccount()
])
```

Creates accounts on both omniflixhub and agoric chains concurrently.

```javascript
const omniAddress = omniAccount.getAddress()
```

Retrieves the address of the omniAccount.

## Depositing and Exiting

```javascript
// deposit funds from user seat to LocalChainAccount
const payments = await withdrawFromSeat(zcf, seat, give)
await deeplyFulfilled(
  objectMap(payments, payment => localAccount.deposit(payment))
)
seat.exit()
```

### Withdraw Funds

Withdraws the funds specified in the give part of the proposal from the seat.

### Deposit Funds

Deposits the withdrawn payments into the local account.

### Exit Seat

The seat exits the offer, completing the offer being handled.

## Building and Executing Swap Instructions

```javascript
// build swap instructions with orcUtils library
const transferMsg = orcUtils.makeOsmosisSwap({
  destChain: 'omniflixhub',
  destAddress: omniAddress,
  amountIn: give.Stable,
  brandOut: '...',
  slippage: 0.03
})
```

Parameters include destination chain, destination address, input amount, output brand, and slippage tolerance. In the `give` keyword record, the `Stable` keyword is expected to have the assets to trade.

### Executing the `Swap` Instructions & Delegate

Carries out the swap instructions using the results of `orcUtils.makeOsmosisSwap` above.

```javascript
await localAccount
  .transferSteps(give.Stable, transferMsg)
  .then(_txResult =>
    omniAccount.delegate(offerArgs.validator, offerArgs.staked)
  )
  .catch(e => console.error(e))
```

Transfers the stablecoins according to the swap instructions. On `transferSteps` being resolves, we delegate the staked amount to the specified validator on the omniflixhub chain.

We log any errors that occur during the process.

## Declaring `privateArgs` shape, and upgradeability

```javascript
/** @type {ContractMeta<typeof start>} */
export const meta = {
  privateArgsShape: {
    agoricNames: M.remotable('agoricNames'),
    localchain: M.remotable('localchain'),
    orchestrationService: M.or(M.remotable('orchestration'), null),
    storageNode: StorageNodeShape,
    marshaller: M.remotable('marshaller'),
    timerService: M.or(TimerServiceShape, null)
  },
  upgradability: 'canUpgrade'
}
harden(meta)
```

This defines the shape of private arguments and the contract’s upgradability, and `harden` ensures that the metadata object is immutable.

## `makeNatAmountShape` function

```javascript
/**
 * @param {Brand} brand must be a 'nat' brand, not checked
 * @param {NatValue} [min]
 */
export const makeNatAmountShape = (brand, min) =>
  harden({ brand, value: min ? M.gte(min) : M.nat() })
```

Utility function to create a shape for amounts of the specified fungible brand. If a minimum value is provided, ensures the amount is greater than or equal to it.

## `contract` Function

The `contract` function when wrapped inside `withOrchestration` defines the [`start` function](#start-function) which is the entry point of the contract. The contract exports a `start` function [below](#start-function). It is merely a convention/convenience that we define a more abstract `contract` function here and pass it to `withOrchestration`. The arguments of this function are `zcf`, `privateAge`, `zone`, and `tools` for orchestration.

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
 *   timerService: Remote<TimerService>;
 *   marshaller: Marshaller;
 * }} privateArgs
 * @param {Zone} zone
 * @param {OrchestrationTools} tools
 */
const contract = async (zcf, privateArgs, zone, { orchestrate }) => {
```

## Getting brands from Contract Terms

```javascript
const { brands } = zcf.getTerms()
```

This retrieves the brands specified in the contract terms.

## Handler for swap and stake offers

```javascript
/** deprecated historical example */
/**
 * @type {OfferHandler<
 *   unknown,
 *   { staked: Amount<'nat'>; validator: CosmosValidatorAddress }
 * >}
 */
const swapAndStakeHandler = orchestrate('LSTTia', { zcf }, stakeAndSwapFn)
```

`swapAndStakeHandler` defines the offer handler for the swap and stake operation using [`stakeAndSwapFn` function](#stakeandswapfn-offer-handler).

## Make Invitation and Create `publicFacet`

```javascript
const publicFacet = zone.exo('publicFacet', undefined, {
  makeSwapAndStakeInvitation() {
    return zcf.makeInvitation(
      swapAndStakeHandler,
      'Swap for TIA and stake',
      undefined,
      harden({
        give: { Stable: makeNatAmountShape(brands.Stable, 1n) },
        want: {}, // XXX ChainAccount Ownable?
        exit: M.any()
      })
    )
  }
})
```

Defines the `publicFacet` for the contract, which includes the method to make an `invitation` for users to swap stablecoins for TIA and stake, and returns the hardened public facet. Defining `publicFacet` with `zone.exo` makes it [remotely accessible](/glossary/#exo) and persistent through contract upgrades with a [durable `zone`](/glossary/#zone).

## `start` Function

```javascript
export const start = withOrchestration(contract)
```

Defines the `start` function of the contract that is returned by a call to `withOrchestration` with [`contract` function](#contract-function) as a parameter. In essence `contract` function is the entry point or `start` function of this contract with some orchestration setup.
