# SendAnywhere Contract Walkthrough

The "Send Anywhere" contract is designed to facilitate the transfer of assets from one chain to another using
Agoric's Orchestration library. The contract allows a user to send a specific amount of a brand (token or asset)
to a destination address on any supported blockchain.

The high-level flow of the contract is:

- Validate the asset brand on the source chain.
- Create or ensure the existence of a local account (held by the contract) to handle temporary holding.
- Transfer the asset from the source address to the local account.
- Initiate a transfer to the destination address, which could reside on a remote blockchain.
- Gracefully handle failures.

The contract is implemented in two separate files:

1. `send-anywhere.contract.js` implements the `start` function of the contract to initialize the contract and
   expose `publicFacet` and `creatorFacet`.
2. `send-anywhere.flows.js` implements the `sendIt` function which performs that actual transfer of assets when a
   user makes an offer.

Let us walkthroug these files one by one.

## `send-anywhere.contract.js`

The contract begins by importing various modules and utilities necessary for its functionality. These include:

- **State management**: `makeSharedStateRecord` is imported to create and manage the state across contract executions.
- **Type validation**: `AmountShape` and `InvitationShape` ensure that the contract works with correct data types, such as amounts and invitations.
- **Orchestration utilities**: `withOrchestration` is imported to facilitate interactions with Zoe and other orchestration functions.
- **Flows**: The orchestration flows for handling transfers are imported from `send-anywhere.flows.js`.

These imports set up the contract for the validation, orchestration, and execution of transfers.

### Contract State Setup

The contract defines a shared state record as below:

```js
const contractState = makeSharedStateRecord(
  /** @type {{ account: OrchestrationAccount<any> | undefined }} */ {
    localAccount: undefined,
  },
);
```

This state keeps track of the local account that will hold the transferred assets temporarily before they are sent to the destination address.

- **State initialization**: The state starts with an undefined `localAccount`. This account will be created later during the orchestration process if needed.
  This shared state ensures that the contract retains context between different transactions and orchestrations.

### Single Amount Record Validation

In order to ensure that only a single asset (or `brand`) is transferred per transaction, a `SingleNatAmountRecord` is defined:

```js
export const SingleNatAmountRecord = M.and(
  M.recordOf(M.string(), AnyNatAmountShape, {
    numPropertiesLimit: 1,
  }),
  M.not(harden({})),
);
harden(SingleNatAmountRecord);
```

This validation ensures that the proposal shape submitted by users contains exactly one asset and no other extraneous properties.

### Logging setup

The contract initializes a logging mechanism (`logNode`) to capture the contract's internal actions and state changes. Logs are written to a newly created `log` child in VStorage, making debugging and auditing easier.

```js
const logNode = E(privateArgs.storageNode).makeChildNode('log');

const log = msg => vowTools.watch(E(logNode).setValue(msg));
```

### Orchestration functions (`orchFns`):

These functions, imported from `send-anywhere.flows.js`, define the main behaviors for handling asset transfers. The contract wraps these functions with the necessary context (such as the contract state, logging, and Zoe tools).

```js
const orchFns = orchestrateAll(flows, {
  contractState,
  log,
  zoeTools,
});
```

### Public Facet and Invitation Creation

The contract provides a public-facing API (`publicFacet`) that allows external users to interact with it:

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
        M.splitRecord({ give: SingleNatAmountRecord }),
      );
    },
  },
);
```

The exposed `makeSendInvitation` method creates an invitation for users, allowing them to initiate a transfer by submitting a proposal. The proposal must match the structure defined by the `SingleNatAmountRecord`, ensuring that only one asset is transferred per transaction. The invitation is connected to the `sendIt` function (explained later), which performs the asset transfer.
The public facet makes the contract accessible to external users, enabling them to initiate asset transfers in a controlled and secure way.

## `send-anywhere.flows.js`

This flows file defines a single function `sendIt` that handles offers made to the contract. The `sendIt`
function is the core of the transfer process. It handles the actual movement of assets between the local and
remote chains. The parameters passed to this function include:

- `orch`: The orchestrator object for managing chain/account interactions.
- `ctx`: The contract state and utility functions, including:
  - `contractState`: Holds the local account for intermediate storage.
  - `localTransfer`: The transfer function for moving assets between local accounts.
- `seat`: The Zoe seat representing the assets to be transferred.
- `offerArgs`: Includes details about the destination chain and address.

The `sendIt` function performs several important steps:

### Offer Validation and Setup

Upon receiving an offer, the `sendIt` function:
TODO: link here

- Validates the offer arguments using [endo]() pattern-matching to ensure the correct structure is submitted (lines 17-18 in send-anywhere.flows.js).
  TODO: link here
- Retrieves the `proposal` from the seat, extracting the asset (`brand` and `amount`) being transferred.
- The contract ensures that the asset brand is registered on the local chain by querying the chain’s asset registry (`vbank`). If not, the contract throws an error and exits the transaction.
- If a local account for the contract doesn’t already exist, the function creates one.

```js
mustMatch(offerArgs, harden({ chainName: M.scalar(), destAddr: M.string() }));
const { chainName, destAddr } = offerArgs;
// NOTE the proposal shape ensures that the `give` is a single asset
const { give } = seat.getProposal();
const [[_kw, amt]] = entries(give);
void log(`sending {${amt.value}} from ${chainName} to ${destAddr}`);
const agoric = await orch.getChain('agoric');
const assets = await agoric.getVBankAssetInfo();
void log(`got info for denoms: ${assets.map(a => a.denom).join(', ')}`);
const { denom } = NonNullish(
  assets.find(a => a.brand === amt.brand),
  `${amt.brand} not registered in vbank`,
);

if (!contractState.localAccount) {
  contractState.localAccount = await agoric.makeAccount();
}
```

This setup phase ensures the transaction is valid and the contract is prepared to handle it.

### Asset Transfer

Once everything is validated, the contract performs the following steps:

- **Local transfer**: The assets are first transferred from the Zoe seat to the contract’s local account using `localTransfer` API.

```js
await localTransfer(seat, contractState.localAccount, give);
```

- **Remote transfer**: The contract initiates the transfer to the destination address on remote chain. This transfer includes details such as the destination chain ID and address.

```js
await contractState.localAccount.transfer(
  {
    value: destAddr,
    encoding: 'bech32',
    chainId,
  },
  { denom, value: amt.value },
);
```

- **Error handling**: If the transfer fails, the contract reverses the transaction by withdrawing the assets from the local account back to the Zoe seat. A detailed error message is logged and the seat is exited with the error.
  This process ensures that assets are transferred securely, with clear rollback mechanisms in case of failure.

```js
await withdrawToSeat(contractState.localAccount, seat, give);
const errorMsg = `IBC Transfer failed ${q(e)}`;
void log(`ERROR: ${errorMsg}`);
seat.exit(errorMsg);
throw makeError(errorMsg);
```
