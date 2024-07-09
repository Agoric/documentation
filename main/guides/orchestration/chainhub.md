# ChainHub

The [ChainHub API](https://github.com/Agoric/agoric-sdk/blob/859d8c0d151ff6f686583db1eaf72efb89cc7648/packages/orchestration/src/exos/chain-hub.js#L99) is responsible for managing chain and IBC connection information. It facilitates the registration and retrieval of chain and connection information.

```js
const zone = makeDurableZone(baggage);
const { agoricNames } = remotePowers;
const chainHub = makeChainHub(agoricNames, zone);
```

The `makeChainHub` function accepts a `Remote<NameHub>` reference (`agoricNames`) and an optional `Zone` to manage data durability. The `makeChainHub` function creates a new `ChainHub` instance either in the specified zone or in the heap if no zone is provided. The resulting object is an Exo singleton, meaning it has no previous state. Its state consists solely of a cache of queries to `agoricNames` and the information provided during registration calls.

The `ChainHub` object maintains two `MapStores`:

- `chainInfos`: For storing `CosmosChainInfo` objects.
- `connectionInfos`: For storing `IBCConnectionInfo` objects.

These `MapStores` are not exposed directly. They are abstracted and used internally by the methods provided by the ChainHub.

# ChainHub APIs

The core functionality is encapsulated within the `makeChainHub` function, which sets up a new `ChainHub` in the specified zone. The `ChainHub` provides the following APIs:

## **chainHub.registerChain(name, chainInfo)**

- name: **string**
- chainInfo: **CosmosChainInfo**

Stores information about a chain in the `chainInfos` MapStore, enabling quick lookup of details without querying a remote source.

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

## **chainHub.getChainInfo(chainName)**

- chainName: **string**
- Returns: **Vow\<ActualChainInfo\<K\>\>**

Retrieves stored chain information from the `chainInfos` MapStore or fetches it from a remote source if not available locally.

```js
chainHub.getChainInfo('agoric-3');
```

## **chainHub.registerConnection(chainId1, chainId2)**

- chainId1: **string**
- chainId2: **string**
- Returns: **IBCConnectionInfo**

Stores information about a connection between two chains in `connectionInfos` Mapstore, such as IBC connection details.

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

## **chainHub.getConnectionInfo(chain1, chain2)**

- chain1: **string** | { chainId: **string** }
- chain2: **string** | { chainId: **string** }
- Returns: **Vow\<IBCConnectionInfo\<K\>\>**

Retrieves stored connection information from `connectionInfos` Mapstore or fetches it from a remote source if not available locally.

```js
const chainConnection = await E.when(
  chainHub.getConnectionInfo('agoric-3', 'cosmoshub'),
);
```

## **chainHub.getChainsAndConnection(chainName1, chainName2)**

- chainName1: **C1** extends **string**
- chainName2: **C2** extends **string**
- Returns: **Vow\<[ActualChainInfo\<C1\>, ActualChainInfo\<C2\>, IBCConnectionInfo]\>**

This method fetches information about two chains and their connection simultaneously.

```js
const [agoric3, cosmoshub, connectionInfo] = await E.when(
  chainHub.getChainsAndConnection('agoric-3', 'cosmoshub'),
);
```
