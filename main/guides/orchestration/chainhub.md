# ChainHub

The [ChainHub API](https://github.com/Agoric/agoric-sdk/blob/859d8c0d151ff6f686583db1eaf72efb89cc7648/packages/orchestration/src/exos/chain-hub.js#L99) is responsible managing chain and IBC connection information. It facilitate the registration and retrieval of chain and connection data.

```js
const zone = makeDurableZone(baggage);
const { agoricNames } = remotePowers;
const chainHub = makeChainHub(agoricNames, zone);
```

The `makeChainHub` function accepts a `Remote<NameHub>` reference (`agoricNames`) and an optional `Zone` for managing data durability. The `makeChainHub` fuction creates a new `ChainHub` either in the specified zone or in the heap if no zone is provided. The resulting object is an Exo singleton, which means it has no previous state. Its state consists only of a cache of queries to `agoricNames` and the information provided in registration calls.

The `ChainHub` objects maintains two `MapStores`:

- `chainInfos`: for storing `CosmosChainInfo` objects.
- `connectionInfos`: for storing `IBCConnectionInfo` objects.

These `MapStores` are not exposed directly. They are abstracted and used internally by the methods provided by the ChainHub.

# ChainHub Interface

The core functionality is encapsulated within the `makeChainHub` function, which sets up a new ChainHub in the given zone. The ChainHub is responsible for:

- **Registering Chain Information (`registerChain`)**: Stores information about a chain inside the `chainInfos` mapstore, which can be used for quickly looking up details without querying a remote source.

```js
const chainInfo = harden({
  chainId: 'agoric-3',
  icaEnabled: false,
  icqEnabled: false,
  pfmEnabled: false,
  ibcHooksEnabled: false,
  stakingTokens: [{ denom: 'uist' }],
});
let nonce = 0n;

const chainKey = `${chainInfo.chainId}-${(nonce += 1n)}`;

chainHub.registerChain(chainKey, chainInfo);
```

The function takes two parameters: `name`, which is a `string` representing the unique identifier of the chain, and `chainInfo`, which is an object structured according to the `CosmosChainInfo` format.

- **Retrieving Chain Information (`getChainInfo`)**: Retrieves stored chain information from the `chainInfos` mapstore or fetches it from a remote source if not available locally.

```js
chainHub.getChainInfo('agoric-3');
```

The function takes a single parameter, `chainName`, which is a `string` template type `K`, and returns a promise (`Vow`) that resolves to `ActualChainInfo<K>`, providing detailed information about the specified chain based on its name.

- **Registering Connection Information (`registerConnection`)**: Stores information about a connection between two chains in `connectionInfos` mapstore, such as IBC connection details.

```js
const chainConnection = {
  id: 'connection-0',
  client_id: '07-tendermint-2',
  counterparty: {
    client_id: '07-tendermint-2',
    connection_id: 'connection-1',
    prefix: {
      key_prefix: '',
    },
  },
  state: 3 /* IBCConnectionState.STATE_OPEN */,
  transferChannel: {
    portId: 'transfer',
    channelId: 'channel-1',
    counterPartyChannelId: 'channel-1',
    counterPartyPortId: 'transfer',
    ordering: 1 /* Order.ORDER_UNORDERED */,
    state: 3 /* IBCConnectionState.STATE_OPEN */,
    version: 'ics20-1',
  },
};

chainHub.registerConnection('agoric-3', 'cosmoshub', chainConnection);
```

The function accepts three parameters: `chainId1` and `chainId2`, both of which are `strings` representing the identifiers of the two chains being connected, and `connectionInfo`, which is an object containing the details of the IBC connection as specified by the `IBCConnectionInfo` format

- **Retrieving Connection Information (`getConnectionInfo`)**: Retrieves stored connection information from `connectionInfos` mapstore or fetches it from a remote source if not available locally.

```js
const chainConnection = await E.when(
  chainHub.getConnectionInfo('agoric-3', 'cosmoshub'),
);
```

The function takes two parameters, `chain1` and `chain2`, each of which can be either a `string` representing a chain identifier or an `object` with a `chainId` property, and it returns a promise (`Vow`) that resolves with an `IBCConnectionInfo` object detailing the connection between the two chains.

- **Retrieving Combined Chain and Connection Information (`getChainsAndConnection`)**: A composite function that fetches information about two chains and their connection simultaneously.

```js
const [agoric3, cosmoshub, connectionInfo] = await E.when(
  chainHub.getChainsAndConnection('agoric-3', 'cosmoshub'),
);
```

The function accepts two parameters, `chainName1` and `chainName2`, both of which are strings but defined as template types `C1` and `C2` respectively. It returns a promise (`Vow`) that resolves to a tuple containing the detailed information of both chains, `ActualChainInfo<C1>` and `ActualChainInfo<C2>`, along with their IBC connection information (`IBCConnectionInfo`).
