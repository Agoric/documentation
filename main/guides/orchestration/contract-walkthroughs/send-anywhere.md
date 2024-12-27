# "Send Anywhere" Contract Walkthrough

The "Send Anywhere" contract is designed to facilitate the transfer of assets from one chain to another using
Agoric's [Orchestration](/glossary/#orchestration) library. The contract allows a user to send assets of a specific brand
to a destination address on any supported blockchain.

The high-level flow of the contract is:

- Validates the asset brand on the source chain.
- Creates or ensures the existence of a local account (held by the contract) to handle temporary holding.
- Transfers the asset from the source address to the local account.
- Initiates a transfer to the destination address, which could reside on the remote blockchain.
- Gracefully handles failures.

The contract is implemented in two separate files:

1. `send-anywhere.contract.js` implements the `start` function of the contract to initialize the contract and
   expose `publicFacet`.
2. `send-anywhere.flows.js` implements the `sendIt` function which performs the actual transfer of assets when a user makes an offer.

Let us walk through these files one by one.

## 1. `send-anywhere.contract.js`

The contract begins by importing various modules and utilities necessary for its functionality. These include:

- **State management**: `makeSharedStateRecord` is imported to create and manage state across contract incarnations.
- **Type validation**: `AnyNatAmountShape` and `InvitationShape` ensure that the contract works with correct data types, such as amounts and invitations.
- **Orchestration utilities**: `withOrchestration` is imported to facilitate interactions with Orchestration functions.
- **Flows**: The Orchestration flows for handling transfers are imported from `send-anywhere.flows.js` to be made available to Zoe.

These imports set up the contract for the validation, orchestration, and execution of transfers through the Zoe API.

### Single Amount Record Validation

In order to ensure that only a single asset (or `brand`) is transferred per transaction, a `SingleNatAmountRecord` is defined:

```js
export const SingleNatAmountRecord = M.and(
  M.recordOf(M.string(), AnyNatAmountShape, {
    numPropertiesLimit: 1
  }),
  M.not(harden({}))
);
harden(SingleNatAmountRecord);
```

This validation ensures that the proposal shape submitted by users contains exactly one asset and no other extraneous properties.

### Contract State Setup

The contract defines a shared state record as below:

```js
  const sharedLocalAccountP = zone.makeOnce('localAccount', () =>
    makeLocalAccount(),
  );
```

`sharedLocalAccountP` stores the local account that will hold the transferred assets temporarily before they 
are sent to the destination address. Since this is initialized with a promise (`makeOnce` returns a promise, so
we add a `P` to the variable name), uses of `sharedLocalAccountP` will have to await it before making use of it. 

### Logging setup

The contract initializes a logging mechanism (`logNode`) to capture the contract's internal actions and state changes. Logs are written
to a newly created `log` child in VStorage, making debugging and auditing easier.

```js
const logNode = E(privateArgs.storageNode).makeChildNode('log');

const log = msg => vowTools.watch(E(logNode).setValue(msg));
```

### Orchestration functions

These functions, imported from `send-anywhere.flows.js`, define the main behaviors for handling asset transfers. The contract wraps
these functions with the necessary context (such as the contract state, logging, and Zoe tools).

```js
const orchFns = orchestrateAll(flows, {
  log,
  sharedLocalAccountP,
  zoeTools,
});
```

### Public Facet and Invitation Creation

The contract provides a public-facing API (`publicFacet`) that allows external users to interact with it:

```js
const publicFacet = zone.exo(
  'Send PF',
  M.interface('Send PF', {
    makeSendInvitation: M.callWhen().returns(InvitationShape)
  }),
  {
    makeSendInvitation() {
      return zcf.makeInvitation(
        orchFns.sendIt,
        'send',
        undefined,
        M.splitRecord({ give: SingleNatAmountRecord })
      );
    }
  }
);
```

The `makeSendInvitation` method creates an invitation for users, allowing them to initiate a transfer by submitting a proposal. The
proposal must match the structure defined by `SingleNatAmountRecord`, ensuring that only one asset is transferred per transaction.
The invitation is connected to the `sendIt` function (explained later), which performs the asset transfer.

## 2. `send-anywhere.flows.js`

This flows file defines a single function `sendIt` that handles offers made to the contract. The `sendIt`
function is the core of the transfer process. It handles the actual movement of assets between the local and
remote chains. The parameters passed to this function include:

- `orch`: The orchestrator object for managing chain/account interactions.
- `ctx`: The contract state and utility functions, including:
  - `sharedLocalAccountP`: Holds the local account for intermediate storage.
  - `log`: access to logging
  - zoeTools: Helper functions for transferring assets. Contains
    - `localTransfer`: Support for moving assets between local accounts.
    - `withdrawToSeat`: Support for moving assets from a local account to an account on a remote chain.
- `seat`: The Zoe seat representing the assets to be transferred.
- `offerArgs`: Includes details about the destination chain and address.

The `sendIt` function performs the following important steps:

### Offer Validation and Setup

Upon receiving an offer, the `sendIt` function:

- Validates the offer arguments using [endo's pattern-matching library](https://github.com/endojs/endo/tree/master/packages/patterns) to ensure the correct structure is submitted.
- Retrieves the `proposal` from the seat, extracting (from `give`) the asset (`brand` and `amount`) being transferred.
- The contract ensures that the asset brand is registered on the local chain by querying the chain’s asset registry
   (`vbank`). If not the contract throws an error and exits the transaction. It also gets the `denom` for the
   destination chain from the `vbank`.
- retrieves the `chainId` for the remote chain.

```js
mustMatch(offerArgs, harden({ chainName: M.scalar(), destAddr: M.string() }));
const { chainName, destAddr } = offerArgs;

const { give } = seat.getProposal();
const [[_kw, amt]] = entries(give);
void log(`sending {${amt.value}} from ${chainName} to ${destAddr}`);
const agoric = await orch.getChain('agoric');
const assets = await agoric.getVBankAssetInfo();
void log(`got info for denoms: ${assets.map(a => a.denom).join(', ')}`);

const { denom } = NonNullish(
  assets.find(a => a.brand === amt.brand),
  `${amt.brand} not registered in vbank`
);
const chain = await orch.getChain(chainName);
const info = await chain.getChainInfo();
const { chainId } = info;
assert(typeof chainId === 'string', 'bad chainId');
void log(`got info for chain: ${chainName} ${chainId}`);
```

This setup phase ensures the transaction is valid and the contract is prepared to handle it. Notice that all checks
are complete before any transfers are started.

### Assets Transfer

Once everything is validated, the contract performs the following steps:

- **Local transfer**: The assets are first transferred from the Zoe seat to the contract’s local account using `localTransfer` API.

```js
const sharedLocalAccount = await sharedLocalAccountP;
await localTransfer(seat, sharedLocalAccount, give);
```

- **Remote transfer**: The contract initiates the transfer to the destination address on the remote chain. This transfer includes
  details such as the destination chain ID and address.

```js
await contractState.localAccount.transfer(
  {
    value: destAddr,
    encoding: 'bech32',
    chainId
  },
  { denom, value: amt.value }
);
```

- **Error handling**: If the transfer fails, the contract reverses the transaction by withdrawing the assets from the local account
  back to the Zoe seat. A detailed error message is logged and the seat is exited with the error. This process ensures that assets
  are transferred securely, with clear rollback mechanisms in case of failure.

```js
await withdrawToSeat(contractState.localAccount, seat, give);
const errorMsg = `IBC Transfer failed ${q(e)}`;
void log(`ERROR: ${errorMsg}`);
seat.exit(errorMsg);
throw makeError(errorMsg);
```

## Conclusion

The "Send Anywhere" contract is a robust and flexible solution for transferring assets between blockchains. It ensures that:

- Assets are securely held in a local account before being transferred.
- Detailed logs are kept for transparency and error tracing.
- The contract is resilient to failure, with built-in rollback mechanisms.
- By using Agoric’s Orchestration tools, this contract provides a secure way to facilitate cross-chain asset transfers.
