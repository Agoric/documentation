# Introduction to Agoric UI Kit
The Agoric UI Kit is a collection of components and tools designed to help developers build graphical user interfaces for Agoric decentralized applications (dapps). It provides a set of reusable React components, utilities for reading contract data from vstorage, functions for connecting to the user's wallet, and methods for executing offers on the Agoric blockchain.

## Setup
To use the Agoric UI Kit, please follow the [instructions documented in the `ui-kit` repository](https://github.com/Agoric/ui-kit/blob/main/packages/react-components/README.md).

## React Components
The UI Kit provides a set of React components in the `packages/react-components` directory. These components are designed to make it easier to build user interfaces for Agoric dapps using React. To use these components, simply import them into your React application and integrate them into your UI.

## Reading Contract Data (vstorage)
The UI Kit includes utilities for reading data from vstorage, the virtual storage system used by Agoric contracts. The `makeAgoricChainStorageWatcher` function allows you to subscribe to updates to vstorage and efficiently retrieve data using the Agoric RPC API.

```js
import {
  makeAgoricChainStorageWatcher,
  AgoricChainStoragePathKind as Kind,
} from '@agoric/rpc';

const watcher = makeAgoricChainStorageWatcher(restApi, chainName);

// Watch vstorage children at a given node.
const stopWatching = watcher.watchLatest<string[]>(
  [Kind.Children, 'published.vaultFactory.managers'],
  managerIds => {
    console.log('Got vault manager IDs:', managerIds);
  },
);

// Stop watching.
stopWatching();

// Watch vstorage data at a given node.
watcher.watchLatest<Brands>(
  [Kind.Data, 'published.agoricNames.brand'],
  brands => {
    console.log('Do something with the brands');
  },
);
```

### Connecting to User's Account (Keplr)
The UI Kit provides the `makeAgoricWalletConnection` function to connect to the user's wallet using Keplr, a browser extension for interacting with Agoric and Cosmos-based blockchains. This function allows you to retrieve information about the user's purses (token accounts) and other account-related data. Please note, if you are using React, you can use `@agoric/react-components` instead of this API.
```js
import { subscribeLatest } from '@agoric/notifier';
import { makeAgoricChainStorageWatcher } from '@agoric/rpc';
import { makeAgoricWalletConnection } from '@agoric/web-components';

const watcher = makeAgoricChainStorageWatcher(apiAddr, chainName);
const connection = await makeAgoricWalletConnection(watcher, rpcAddr);
const { pursesNotifier, publicSubscribersNotifier } = chainConnection;

for await (const purses of subscribeLatest(pursesNotifier)) {
  console.log('Got purses:', purses);
}
```

### Using a Custom Signer
If you're using a custom signer instead of Keplr, you can provide your own signer implementation when creating the `AgoricWalletConnection`. Here's an example of setting up a custom signer using the `@cosmjs/stargate` library:

```js
import {
  agoricRegistryTypes,
  agoricConverters,
  makeAgoricWalletConnection,
} from '@agoric/web-components';
import { Registry } from '@cosmjs/proto-signing';
import {
  AminoTypes,
  defaultRegistryTypes,
  createBankAminoConverters,
  createAuthzAminoConverters,
} from '@cosmjs/stargate';

// ...

const signingStargateClient = await SigningStargateClient.connectWithSigner(
  rpcEndpoint, // RPC endpoint to use
  customAminoSigner, // E.g. window.getOfflineSignerOnlyAmino(chainId)
  {
    aminoTypes: new AminoTypes({
      ...agoricConverters,
      ...createBankAminoConverters(),
      ...createAuthzAminoConverters(),
    }),
    registry: new Registry([...defaultRegistryTypes, ...agoricRegistryTypes]),
  },
);
const agoricWalletConnection = await makeAgoricWalletConnection(
  chainStorageWatcher,
  rpcEndpoint,
  (e: unknown) => {
    console.error('wallet connection error', e);
  },
  { address: myAddress, client: signingStargateClient },
);
```

## Executing Offers
The UI Kit provides functionality to execute offers (transactions) on the Agoric blockchain. The `makeOffer` function allows you to create and submit an offer, specifying the contract instance, the amounts to give and want, and any additional arguments. You can also provide a callback function to handle the different stages of the offer execution process.

```js
import { makeAgoricChainStorageWatcher } from '@agoric/rpc';
import { makeAgoricWalletConnection } from '@agoric/web-components';

const watcher = makeAgoricChainStorageWatcher(apiAddr, chainName);
const connection = await makeAgoricWalletConnection(watcher, rpcAddr);

const amountToGive = { brand: someBrand, value: 123n };
const amountToWant = { brand: someOtherBrand, value: 456n };

connection.makeOffer(
  {
    source: 'agoricContract',
    instancePath: ['SimpleSwapExampleInstance'],
    callPipe: [
      ['getSwapManagerForBrand', [amountToGive.brand]],
      ['makeSwapOffer'],
    ],
  },
  {
    give: { In: amountToGive },
    want: { Out: amountToWant },
  },
  { exampleArg: 'foo' },
  ({ status, data }) => {
    if (status === 'error') {
      console.error('Offer error', data);
    }
    if (status === 'seated') {
      console.log('Transaction submitted:', data.txn);
      console.log('Offer id:', data.offerId);
    }
    if (status === 'refunded') {
      console.log('Offer refunded');
    }
    if (status === 'accepted') {
      console.log('Offer accepted');
    }
  },
);
```
