# Chain Hub

This [code module](https://github.com/Agoric/agoric-sdk/blob/859d8c0d151ff6f686583db1eaf72efb89cc7648/packages/orchestration/src/exos/chain-hub.js#L99) is designed for managing chain and IBC connection information. It facilitate the registration and retrieval of chain and connection data. Let's break down the components and functionalities of this code.

The `makeChainHub` function accepts a NameHub reference (`agoricNames`) and an optional Zone for managing data durability. Inside the function two `MapStores` are created:

- `chainInfos`: for storing `CosmosChainInfo` objects.
- `connectionInfos`: for storing `IBCConnectionInfo` objects.

# ChainHub Interface

The core functionality is encapsulated within the `makeChainHub` function, which sets up a new ChainHub in the given zone. The ChainHub is responsible for:

- **Registering Chain Information (`registerChain`)**: Stores information about a blockchain inside the `chainInfos` mapstore, which can be used for quickly looking up details without querying a remote source.

- **Retrieving Chain Information (`getChainInfo`)**: Retrieves stored chain information from the `chainInfos` mapstore or fetches it from a remote source if not available locally.

- **Registering Connection Information (`registerConnection`)**: Stores information about a connection between two chains in `connectionInfos` mapstore, such as IBC connection details.

- **Retrieving Connection Information (`getConnectionInfo`)**: Retrieves stored connection information from `connectionInfos` mapstore or fetches it from a remote source if not available locally.

- **Retrieving Combined Chain and Connection Information (`getChainsAndConnection`)**: A composite function that fetches information about two chains and their connection simultaneously.
