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

