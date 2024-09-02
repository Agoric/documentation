# Send Anywhere Contract

## Imports

First, we need to import necessary modules and utilities:

- `makeStateRecord` is used to create an immutable state record.
- `AmountShape` and `InvitationShape` are type guards for [Amounts](/glossary/#amount) and [Invitations](/glossary/#invitation). These will be used to validate the types of the amounts and invitations.
- `M` provides pattern-matching utilities for validation.
- `withOrchestration` is a wrapper which provides access to Zoe API and orchestration functions.
- `sendAnywhere.flows.js` defines the actual contract flows.
- `prepareChainHubAdmin` creates and returns a `CreatorFacet`. See more [here](/guides/zoe/contract-access-control.html#access-control-with-objects).

```js
import { makeStateRecord } from '@agoric/async-flow';
import { AmountShape } from '@agoric/ertp';
import { InvitationShape } from '@agoric/zoe/src/typeGuards.js';
import { M } from '@endo/patterns';
import { withOrchestration } from '../utils/start-helper.js';
import * as flows from './sendAnywhere.flows.js';
import { prepareChainHubAdmin } from '../exos/chain-hub-admin.js';
```


## `sendIt` Offer Handler
Now we will define the main function that handles the offer. It will be called when the user makes an offer to the contract.
Following are the parameters that will be passed to this function:

- `orch`: The orchestrator object to manage interactions with chains/accounts.
- `ctx`: Context object containing current contract execution state and local transfer function.
  - `contractState`: The contract state object created using `makeStateRecord`.
  - `localTransfer`: The transfer function to transfer funds to/from local chain account.
- `seat`: The seat representing the contract's position in the offer.
- `offerArgs`: Arguments provided with the offer, including chain name and destination address.

```js
/**
 * @param {Orchestrator} orch
 * @param {object} ctx
 * @param {{ localAccount?: OrchestrationAccountI & LocalAccountMethods }} ctx.contractState
 * @param {GuestOf<ZoeTools['localTransfer']>} ctx.localTransfer
 * @param {ZCFSeat} seat
 * @param {{ chainName: string; destAddr: string }} offerArgs
 */
export const sendIt = async (orch, { contractState, localTransfer }, seat, offerArgs) => { ... }
```

Now we will perform some checks and preparations before handling the offer. This will include checking the asset being offered and if the local account exists, and if not, creating it.

```js
const { give } = seat.getProposal();
const [[, amt]] = Object.entries(give);
const { chainName, destAddr } = offerArgs;
const agoric = await orch.getChain('agoric');
const assets = await agoric.getVBankAssetInfo();
const { denom } = NonNullish(
assets.find(a => a.brand === amt.brand),
${amt.brand} not registered in vbank,
);
const chain = await orch.getChain(chainName);
if (!contractState.localAccount) {
  const agoricChain = await orch.getChain('agoric');
  contractState.localAccount = await agoricChain.makeAccount();
}
```

Once we have validated everything, we will proceed to make the exchange. This involves withdrawing the funds from the seat to a local account and then transferring them to the destination address on the specified chain. Once done the seat exits the offer, completing the offer being handled.

```js
await localTransfer(seat, contractState.localAccount, give);
await contractState.localAccount.transfer(
  { denom, value: amt.value },
  {
    value: destAddr,
    encoding: 'bech32',
    chainId,
  },
);
seat.exit();
```

## Declaring `privateArgs` shape, and upgradeability

Then, we define the shape of a single amount record and harden it to ensure immutability.

```js
export const SingleAmountRecord = M.and(
  M.recordOf(M.string(), AmountShape, {
    numPropertiesLimit: 1,
  }),
  M.not(harden({})),
);
harden(SingleAmountRecord);
```

## `contract` Function

The `contract` function when wrapped inside `withOrchestration` defines the [`start` function](#start-function) which is the entry point of the contract. It is merely a convention/convenience that we define a more abstract `contract` function here and pass it to `withOrchestration`. The arguments of this function are `zcf`, `privateArgs`, `zone`, and `tools` for orchestration.

```js
/**
 * Orchestration contract to be wrapped by withOrchestration for Zoe
 *
 * @param {ZCF} zcf
 * @param {OrchestrationPowers & { marshaller: Marshaller }} privateArgs
 * @param {Zone} zone
 * @param {OrchestrationTools} tools
 */
const contract = async (zcf, privateArgs, zone, { chainHub, orchestrateAll, zoeTools }) => { ... }
```

## Handler for Sending Offers

Next, we define the orchestration functions for the send operation using `flows` defined in `sendAnywhere.flows.js`.

```js
const orchFns = orchestrateAll(flows, {
  zcf,
  contractState,
  localTransfer: zoeTools.localTransfer,
});
```

## Make Invitation and Create `publicFacet`

We need to define the `publicFacet` for the contract, which includes the method to make an invitation for users to send assets, and returns the hardened public facet. Defining `publicFacet` with `zone.exo` makes it remotely accessible and persistent through contract upgrades with a durable `zone`.

```js
const publicFacet = zone.exo(
  'Send PF',
  M.interface('Send PF', {
    makeSendInvitation: M.callWhen().returns(InvitationShape),
  }),
  {
    makeSendInvitation() {
      return zcf.makeInvitation(
        orchFns.sendIt,
        'send',
        undefined,
        M.splitRecord({ give: SingleAmountRecord }),
      );
    },
  },
);
```

## `start` Function

```js
export const start = withOrchestration(contract);
```

Defines the `start` function of the contract that is returned by a call to `withOrchestration` with `contract` function as a parameter. In essence `contract` function is the entry point or `start` function of this contract with some orchestration setup.
