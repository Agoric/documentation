# Overview of `orca.contract.js`
Here, we will walkthrough the orchestration basics demo contract.

## Table of Contents
- [Overview of `orca.contract.js`](#overview-of-orcacontractjs)
  - [Table of Contents](#table-of-contents)
  - [Directory Structure](#directory-structure)
  - [`createAccountsFn` Orhestration Handler function](#createaccountsfn-orhestration-handler-function)
    - [Parameters](#parameters)
    - [Workflow](#workflow)
  - [The `start` Function](#the-start-function)
    - [Parameters](#parameters-1)
    - [Creating Offer Handler](#creating-offer-handler)
    - [Public Facet](#public-facet)
    - [Return Value](#return-value)



The `orca.contract.js` file defines the smart contract that orchestrates interactions with various blockchains using the Ochestration API, facilitating the creation and management of accounts on these chains. The primary components of this contract are the `createAccountsFn` function and the `start` function.

## Directory Structure

<details>

```console
tree contract -I 'node_modules'
contract
├── Makefile
├── jsconfig.json
├── package.json
├── patch-bn.js
├── rollup.config.mjs
├── scripts
│   ├── deploy-contract.js
│   └── run-chain.sh
├── src
│   ├── @types
│   │   └── zoe-contract-facet.d.ts
│   ├── collectFees.js
│   ├── debug.js
│   ├── facade.js
│   ├── fixHub.js
│   ├── objectTools.js
│   ├── orc.js
│   ├── orca.contract.js
│   ├── orca.proposal.js
│   ├── platform-goals
│   │   ├── README.md
│   │   ├── board-aux.core.js
│   │   ├── endo1.core.js
│   │   ├── start-contract.js
│   │   ├── start-governed-contract.js
│   │   └── types.js
│   ├── tools
│   │   └── debug.js
│   └── types.js
├── test
│   ├── boot-tools.js
│   ├── build-proposal.test.js
│   ├── bundle-source.test.js
│   ├── lib-gov-test
│   │   └── puppet-gov.js
│   ├── market-actors.js
│   ├── mintStable.js
│   ├── orca-contract.test.js
│   ├── prepare-test-env-ava.js
│   ├── snapshots
│   │   ├── test-postalSvc.js.md
│   │   ├── test-postalSvc.js.snap
│   │   ├── test-swap-wallet.js.md
│   │   ├── test-swap-wallet.js.snap
│   │   ├── test-vote-by-committee.js.md
│   │   └── test-vote-by-committee.js.snap
│   ├── test-build-proposal.js
│   ├── test-bundle-source.js
│   ├── test-deploy-tools.js
│   └── wallet-tools.js
├── tools
│   ├── README.md
│   ├── agd-lib.js
│   ├── bundle-tools.js
│   ├── e2e-tools.js
│   ├── rollup-plugin-core-eval.js
│   ├── startOrch.js
│   └── ui-kit-goals
│       ├── README.md
│       ├── batchQuery.js
│       ├── makeHttpClient.js
│       ├── marshalTables.js
│       ├── name-service-client.js
│       ├── queryKit.js
│       └── test-nameProxy.js
└── tsconfig.json

12 directories, 61 files

```

</details>

## `createAccountsFn` Orhestration Handler function

The `createAccountsFn` function is an asynchronous operation designed to create an account on a specified Cosmos chain. This function not only creates the account but also returns a continuing offer that allows the user to perform further actions like Delegation, WithdrawRewards, and Transfers. Let's break down the key components of this function:

### Parameters
- **`orch`**: 
  - **Type**: `Orchestrator`
  - **Purpose**: The `orch` parameter represents an instance of the Orchestrator, a powerful abstraction that manages interactions with the blockchain. It provides methods to interact with different chains, create accounts, and fetch chain information.
  
- **`_ctx`**: 
  - **Type**: `undefined`
  - **Purpose**: This context parameter is not used in this particular function but is often included in functions to pass additional information or tools that might be needed for processing. (unused for now in the first release)

- **`seat`**: 
  - **Type**: `ZCFSeat`
  - **Purpose**: The [`seat`](/glossary/#seat) parameter represents the user's position from within the contract. It holds the proposal made by the user, which includes the assets they are willing to give or receive.

- **`offerArgs`**: 
  - **Type**: `{ chainName: string }`
  - **Purpose**: The `offerArgs` object contains arguments related to the user's offer, specifically the `chainName` that identifies which chain the orchestration account should be created on.

### Workflow

```javascript
const createAccountsFn = async (orch, _ctx, seat, { chainName }) => {
  const { give } = seat.getProposal();
  trace('version 0.1.36');
  trace('give');
  trace(give);
```

- **Extracting Proposal**: The function begins by extracting the user's proposal from the `seat`. The `give` object represents what the user is willing to offer in the transaction.
- **Tracing Information**: Several `trace` calls are made to log the current state of the function. This is useful for debugging and ensuring that the function's inputs and intermediate states are correct.

```javascript
  trace('inside createAccounts');
  trace('orch');
  trace(orch);
  trace('seat');
  trace(seat);
  trace(chainName);
  seat.exit();
```

When we run the contract, we will see these log results, as a sanity check of our contract having the dependencies it needs to perform the work we want.

Next, we simply exit the seat with `seat.exit()` because we are not intending to perform any asset reallocation in this example contract.

```javascript
try {
    const chain = await orch.getChain(chainName);
    trace('chain object');
    trace(chain);
```

**Fetching Chain Object**: The function then retrieves the chain object using `orch.getChain(chainName)`. This object contains all the necessary information and methods to interact with the specified chain. We pass the `chainName` provided by the `offerArgs`.

```javascript
    const info = await chain.getChainInfo();
    trace('chain info', info);
```

**Fetching Chain Information**: The chain information is fetched using `chain.getChainInfo()`. This step is crucial as it provides details about the chain, such as its denomination, address prefixes, and other chain-specific data that might be required for account creation.

```javascript
    const chainAccount = await chain.makeAccount();
    console.log("chainAccount")
    console.log(chainAccount)
```

**Creating Account**: The core operation of this function is to create an account on the specified chain. This is done by calling `chain.makeAccount()`. The returned `chainAccount` object represents the newly created account and includes methods to interact with the account, such as sending tokens or delegating stake.

```javascript
    return await chainAccount.asContinuingOffer();
} catch (error) {
    console.error('Error in createAccounts:', error);
}
```

**Returning Continuing Offer**: Once the account is created, the function returns a continuing offer by calling `chainAccount.asContinuingOffer()`. This allows the user to perform further actions on the account, such as delegating tokens or withdrawing rewards, through subsequent offers.

**Error Handling**: We wrap the function in a `try...catch` block to handle any errors that might occur during the process. If an error is encountered, it is logged to the console for us to diagnose issues during development and testing.


## The `start` Function

The `start` function is the entry point of the contract, responsible for initializing the contract and setting up the public interface that external users can interact with. Let's break down the function line by line.

### Parameters
- `zcf`: **Zoe Contract Facet** - Provides essential utilities for contract execution, including making invitations, accessing state, and managing offers. See [zcf](/glossary/#zoe-contract-facet-zcf) for more.
- `privateArgs`: A collection of services and utilities that are provided privately to the contract. These include:
  - `orchestrationService`: Manages orchestration operations across multiple chains.
  - `marshaller`: Handles serialization and deserialization of data.
  - `storageNode`: The storage node in vstorade that our contract can write to, and write children to.
  - `timer`: Provides access to timing-related functionalities. This is not used yet in this example.
  - `localchain`: Manages local chain interactions.
  - `agoricNames`: A service that manages name lookups for Agoric chains and connections.
- `baggage`: Used for persisting contract-related data across reboots/upgrades, ensuring that the contract's state is preserved.

```javascript
export const start = async (zcf, privateArgs, baggage) => {
  trace('inside start function');
  trace('privateArgs', privateArgs);
```

 The `start` function begins by tracing the function entry and the provided `privateArgs` to make sure that all necessary services are available in our logs.

```javascript
  const {
    orchestrationService: orchestration,
    marshaller,
    storageNode,
    timer,
    localchain,
    agoricNames,
  } = privateArgs;
```

**Destructuring `privateArgs`**: The relevant services from `privateArgs` are unpacked and assigned to local variables for easier access within the function.

```javascript
  trace('orchestration: ', orchestration);
  trace('marshaller: ', marshaller);
  trace('storageNode: ', storageNode);
  trace('timer: ', timer);
  trace('localchain: ', localchain);
  trace('agoricNames: ', agoricNames);
```

**Tracing Services**: Each service is logged for debugging purposes, ensuring that all services are correctly initialized.

```javascript
  const { orchestrate, zone } = provideOrchestration(
    zcf,
    baggage,
    privateArgs,
    privateArgs.marshaller,
  );
```

**Orchestration Setup**: The `provideOrchestration` function is invoked, which sets up the orchestration tooling for us, as a convenience. This function returns two key elements:
  - `orchestrate`: the orchestration offer handler for `createAccountsFn`.
  - `zone`: The [zone]((/glossary/#zone)) we use to allocate exposed remotable objects, or [Exos](/glossary/#exo).

### Creating Offer Handler

```javascript
  /** @type {OfferHandler} */
  const makeAccount = orchestrate(
    'makeAccount',
    undefined,
    createAccountsFn,
  );
```

**OfferHandler Definition**: An `OfferHandler` we name `makeAccount` is created using the `orchestrate` method. This links the handler to the `createAccountsFn` function, which is responsible for creating accounts on a chain.

### Public Facet

The `publicFacet` is the part of the contract that is exposed to external users, allowing them to interact with it. See [`facet`](/glossary/#facet)

```javascript
  const publicFacet = zone.exo(
    'Orca Public Facet',
    M.interface('Orca PF', {
      makeAccountInvitation: M.callWhen().returns(InvitationShape),
    }),
    {
      makeAccountInvitation() {
        return zcf.makeInvitation(
          makeAccount,
          'Make an Orchestration Account',
        );
      },
    },
  );
```

**Creating Public Facet**: The `zone.exo` method is used to create an isolated object (exo) that defines the public interface of the contract.

**Interface Guard Definition**: The public facet exposes a single method, `makeAccountInvitation`, which returns an invitation for creating an orchestration account. The invitation is created using `zcf.makeInvitation` and is tied to the `makeAccount` offer handler.

Here, our interface guard enforces that when `makeAccountInvitation` is invoked, it expects no input parameters, and expects to return an `InvitationShape`. Otherwise, the interface guard will reject the offer before it reaches the contract.

### Return Value

```javascript
  return { publicFacet };
};
```

**Returning Public Facet**: The function returns an object containing the `publicFacet`. This makes the public interface accessible to users and other contracts, enabling them to interact with the contract's, all while adhering to the [object-capabilities model](/glossary/#object-capabilities).
