# Orchestration Basics Contract Testing Guide
Here, we will walkthrough the testing setup for the Orchestration Basics demo contract, `orca.contract.js`.

## Table of Contents

- [Orchestration Basics Contract Testing Guide](#orchestration-basics-contract-testing-guide)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Import Statements](#import-statements)
  - [Setup and Context](#setup-and-context)
    - [Initializing Zoe and Bundling Contracts](#initializing-zoe-and-bundling-contracts)
    - [Mocking Dummy Storage Node](#mocking-dummy-storage-node)
    - [Mocking Dummy Marshaller](#mocking-dummy-marshaller)
    - [Setting Up Agoric Names](#setting-up-agoric-names)
    - [Creating Cosmos Interchain Service](#creating-cosmos-interchain-service)
    - [Final Context Setup](#final-context-setup)
  - [Installing the Contract](#installing-the-contract)
  - [Starting the Contract](#starting-the-contract)
  - [Orchestration Account Scenario](#orchestration-account-scenario)
    - [Macro Definition](#macro-definition)
    - [Chain Configuration Validation](#chain-configuration-validation)
    - [Setting Up the Testing Context](#setting-up-the-testing-context)
    - [Starting the Zoe Instance](#starting-the-zoe-instance)
    - [Creating an Account Invitation](#creating-an-account-invitation)
    - [Making the Account Offer](#making-the-account-offer)
    - [Retrieving and Verifying the Offer Result](#retrieving-and-verifying-the-offer-result)
    - [Querying vStorage for Verification](#querying-vstorage-for-verification)
    - [Continuing the Offer](#continuing-the-offer)
    - [Test Execution](#test-execution)

This document provides a detailed walkthrough of the `orca-contract.test.js` file. This test script is designed to validate the functionality of the Orca contract within the Agoric platform using AVA as the testing framework.

## Overview

The `orca-contract.test.js` script performs various tests, including:
- Installing the contract on Zoe.
- Starting the contract.
- Registering chains.
- Orchestrating accounts.
- Verifying results via vstorage queries.

## Import Statements

The test script begins by importing necessary modules and setting up the test environment:

```javascript
import { test as anyTest } from './prepare-test-env-ava.js';
import { createRequire } from 'module';
import { E, Far } from '@endo/far';
import { makeNodeBundleCache } from '@endo/bundle-source/cache.js';
import { makeZoeKitForTest } from '@agoric/zoe/tools/setup-zoe.js';
import { startOrcaContract } from '../src/orca.proposal.js';
import { makeMockTools } from './boot-tools.js';
import { getBundleId } from '../tools/bundle-tools.js';
import { startOrchCoreEval } from '../tools/startOrch.js';
```

## Setup and Context

The `makeTestContext` function sets up the testing environment by creating necessary mocks, bundling contracts, and initializing services:

### Initializing Zoe and Bundling Contracts

```javascript
const makeTestContext = async t => {
const { zoeService: zoe, feeMintAccess } = makeZoeKitForTest();
const bundleCache = await makeNodeBundleCache('bundles/', {}, s => import(s));
const bundle = await bundleCache.load(contractPath, 'orca');
const tools = await makeMockTools(t, bundleCache);
```

- **Zoe Initialization**: `makeZoeKitForTest()` sets up a test environment with Zoe
- **Contract Bundling**: The contract is bundled using `makeNodeBundleCache`, which caches the compiled contract for faster testing.

### Mocking Dummy Storage Node

```javascript
const makeDummyStorageNode = nodeName => {
    return Far('DummyStorageNode', {
        makeChildNode: async (childName) => {
            console.log(`makeChildNode called with name: ${childName}`);
            return makeDummyStorageNode(childName);
        },
        getPath: () => `/${nodeName}`,
        setValue: (value) => {
            console.log(`setValue called on node: ${nodeName} with value: ${value}`);
            return value;
        },
    });
};
```

**Storage Node Mock**: A mock storage node is created to simulate interactions with vstorage. This node can create child nodes and store values.

### Mocking Dummy Marshaller

```javascript
const makeDummyMarshaller = () => {
    return Far('DummyMarshaller', {
        toCapData: (data) => ({}),
        fromCapData: (capData) => ({}),
    });
};
```

**Marshaller Mock**: A dummy marshaller is created to handle data serialization and deserialization.

### Setting Up Agoric Names

```javascript
const agoricNames = Far('DummyAgoricNames', {
    lookup: async (key, name) => {
      if (key === 'chain' && (name === 'agoric' || name === 'osmosis')) {
        const state = {
          name,
          chainId: `${name}local`,
          denom: name === 'agoric' ? 'ubld' : 'uosmo',
          expectedAddressPrefix: name === 'agoric' ? 'agoric' : 'osmo',
          details: `${name} chain details`,
        };

        return {
          ...state,
          makeAccount: Far('Account', {
            getChainId: () => state.chainId,
            getAccountAddress: () => `${state.name}AccountAddress`,
            getBalance: () => `1000${state.denom}`,
          }),
        };
      } else if (key === 'chainConnection' && (name.includes('agoric') || name.includes('osmosis'))) {
        return {
          connectionName: name,
          sourceChain: name.split('_')[0],
          destinationChain: name.split('_')[1],
          transferChannel: {
            version: '1',
            state: 'open',
            portId: 'transfer',
            counterPartyPortId: 'transfer',
            counterPartyChannelId: 'channel-1',
            channelId: 'channel-0',
          },
        };
      }
      throw Error(`Chain or connection not found: ${name}`);
    },
});
```

**Agoric Names Mock**: A mock service for `agoricNames` is set up to simulate looking up chain information and connection details. This is crucial for testing how the contract interacts with different chains.

### Creating Cosmos Interchain Service

```javascript
const cosmosInterchainService = Far('DummyCosmosInterchainService', {
    getChainHub: async () => ({
        registerChain: async (name, details) => console.log(`chain registered: ${name}`, details),
        getChain: async (name) => {
            if (name.includes('agoric') || name.includes('osmosis')) {
            return {
                name,
                chainId: `${name}local`,
                denom: name === 'agoric' ? 'ubld' : 'uosmo',
                expectedAddressPrefix: name === 'agoric' ? 'agoric' : 'osmo',
            };
            }
            throw Error(`chain not found: ${name}`);
        },
    }),
  });
```

**Interchain Service Mock**: This service simulates interchain operations, such as registering chains and retrieving chain information.

### Final Context Setup

```javascript
return { 
    zoe, 
    bundle, 
    bundleCache, 
    feeMintAccess, 
    cosmosInterchainService, 
    agoricNames,     
    storageNode: makeDummyStorageNode(),
    marshaller: makeDummyMarshaller(),
    ...tools 
};
```

**Returning Context**: The function returns an object containing all the initialized services, mocks, and tools required for the test environment.

## Installing the Contract

The first test installs the Orca contract using `zoe`:

```javascript
test('Install the contract', async t => {
  const { zoe, bundle } = t.context;
  const installation = await E(zoe).install(bundle);
  t.log('installed:', installation);
  t.is(typeof installation, 'object');
});
```

## Starting the Contract
This test starts the Orca contract using the Zoe service and mock services we created earlier:

```javascript
test('Start Orca contract', async t => {
  const { zoe, bundle, cosmosInterchainService, agoricNames, storageNode, marshaller } = t.context;
  const installation = E(zoe).install(bundle);

  const privateArgs = {
    cosmosInterchainService,
    orchestrationService: cosmosInterchainService,
    storageNode,
    marshaller,
    agoricNames
  };

  const { instance } = await E(zoe).startInstance(installation, {}, {}, privateArgs);
  t.log('started:', instance);
  t.truthy(instance);
});
```



## Orchestration Account Scenario

The `orchestrationAccountScenario` macro for testing the orchestration of accounts across different chains. This macro handles everything from account creation to verifying results using vstorage. 

### Macro Definition

```javascript
const orchestrationAccountScenario = test.macro({
  title: (_, chainName) =>
    `orchestrate - ${chainName} makeAccount returns a ContinuingOfferResult`,
```

**Purpose**: This defines a test macro, `orchestrationAccountScenario`, that takes a chain name as a parameter and tests the orchestration process.

**Title Function**: Here, `title` generates a descriptive name for the test, including the chain name, so we can easily identify it in test logs.

### Chain Configuration Validation

```javascript
exec: async (t, chainName) => {
    const config = chainConfigs[chainName];
    if (!config) {
      return t.fail(`unknown chain: ${chainName}`);
    }
```

**Configuration Check**: This test begins by validating whether the provided `chainName` has a corresponding configuration in the `chainConfigs` object. If not, the test fails immediately.

**Purpose**: This makes sure that the test is only run for recognized chains, avoiding unnecessary errors.

### Setting Up the Testing Context

```javascript
const { zoe, bundle, cosmosInterchainService, agoricNames, storageNode, marshaller } = t.context;
t.log('installing the contract...');
const installation = E(zoe).install(bundle);
```

**Extracting Context**: The test destructures several key elements from the testing context we set up, including Zoe, the contract bundle, and services like `cosmosInterchainService`.

**Contract Installation**: Using [`E`](/glossary/#E), we invoke the install method on `zoe`, passing the `bundleId` as an argument. This is the first step in the 2-step, contract deployment process. Next, we need to start the contract instance. 

### Starting the Zoe Instance

```javascript
const privateArgs = {
    cosmosInterchainService,
    orchestrationService: cosmosInterchainService,
    storageNode,
    marshaller,
    agoricNames,
};

const { instance } = await E(zoe).startInstance(installation, {}, {}, privateArgs);
t.truthy(instance);
```

**Private Arguments**: The `privateArgs` object is prepared with essential services and dependencies that the contract may require.

**Instance Creation**: Zoe is used to start an instance of the contract with these arguments. The test verifies that the instance is successfully created.

### Creating an Account Invitation

```javascript
const publicFacet = await E(zoe).getPublicFacet(instance);
const initialInvitation = await E(publicFacet).makeAccountInvitation();
```

**Public Facet Access**: The test retrieves the public facet of the contract instance, which provides access to public methods.

**Account Invitation**: An invitation is created using the `makeAccountInvitation` method. This invitation will be used to create an account on the specified chain.

### Making the Account Offer

```javascript
const makeAccountOffer = {
    give: {},
    want: {},
    exit: { onDemand: null }, 
};

const offerId = 'offerId';
const initialUserSeat = await E(zoe).offer(initialInvitation, makeAccountOffer, undefined, { id: offerId });
```

**Offer Structure**: The `makeAccountOffer` object is defined, detailing what the user is offering and what they want in return. In this case, both `give` and `want` are empty.

**Making the Offer**: The offer is submitted using Zoe's `offer` method, and an `offerId` is assigned to track the offer. The result is captured in `initialUserSeat`.

### Retrieving and Verifying the Offer Result

```javascript
const offerResult = await E(initialUserSeat).getOfferResult();
t.truthy(offerResult, 'Offer result should exist');
```

**Result Retrieval**: The test retrieves the result of the offer using `getOfferResult`. 

**Verification**: It asserts that the result is valid, ensuring that the account creation process was successful.

### Querying vStorage for Verification

```javascript
const qt = makeQueryTool();
const wallet = 'test-wallet'; 
const { address, currentWalletRecord } = await queryVstorage(t, qt, wallet, offerId);
```

**vStorage Query**: The test uses a query tool, `qt`, to check the state of vstorage, verifying that the wallet's state reflects the new account's creation and that the offer ID is correctly recorded.

**Address Validation**: The retrieved address is checked to verify it matches the expected format for the chain.

```js
t.regex(address, new RegExp(`^${config.expectedAddressPrefix}1`), `Address for ${chainName} is valid`);
```

### Continuing the Offer

```javascript
const continuingInvitation = await E(publicFacet).makeAccountInvitation();
t.truthy(continuingInvitation, 'continuing invitation should be created');

const continuingOffer = {
    give: {},
    want: {},
    exit: { onDemand: null },
};

const continuingUserSeat = await E(zoe).offer(continuingInvitation, continuingOffer, undefined, { previousOffer: offerId });
const continuingOfferResult = await E(continuingUserSeat).getOfferResult();

t.truthy(continuingOfferResult, 'continuing offer should produce a result');
t.log('continuing offer result', continuingOfferResult);
```

**Creating a Continuing Invitation**: The test generates a new invitation for a subsequent offer, ensuring the contract can handle repeated interactions.

**Making and Verifying the Continuing Offer**: The test submits a new offer and verifies that the result is as expected. The `previousOffer` parameter links this offer to the previous one, simulating an ongoing interaction.

### Test Execution

```javascript
test(orchestrationAccountScenario, 'osmosis');
```

**Running the Test**: The test is finally executed for the 'osmosis' chain, validating the entire orchestration process from account creation to offer continuation on that chain.

