# VStorage in Agoric

In the Agoric platform, VStorage, or a Virtual Storage, is a key-value store that:

- provides a **read-only interface for clients of the consensus layer**. Clients can query the stored data using specific paths.
- is organized in a **hierarchical, path-based structure**. Each fragment of data is stored at a specific path, and clients can query these paths to retrieve the data.
- can be written through a specialized API called **[chainStorage](https://docs.agoric.com/guides/zoe/pub-to-storage.html#publishing-to-chainstorage)**. This API allows the VM to manage data storage in a controlled and secure manner.

<details>
<!-- Extracted from the data examples -->
<!-- https://github.com/Agoric/agoric-sdk/tree/003f0c2232815a8d64a3f9a5b05521a10160ce34/golang/cosmos/x/vstorage#readme -->
<!-- https://github.com/Agoric/agoric-sdk/tree/agoric-upgrade-13/packages/inter-protocol#reading-data-off-chain -->
<summary> Need for store in dApp? </summary>
In a dApp, VStorage can be used for:

- to store crucial state and configuration data, making it accessible for clients inside the consensus layer.
- to read the current state of smart contracts.

</details>

![vstorage query diagram](./assets/vstorage-brand-q.svg)

## VStorage Hierarchy

VStorage is structured as a tree with paths and nodes that store the actual data. This design facilitates easy querying while ensuring data consistency and security.

For example, here is an example of [Inter Protocol key structure](https://github.com/Agoric/agoric-sdk/tree/agoric-upgrade-13/packages/inter-protocol#reading-data-off-chain) inside Agoric:

```
- published
    - vaultFactory
        - governance
        - metrics
        - managers
            - manager0
                - metrics
                - governance
                - vaults
                    - vault0
```

You can then use this hierarchy to access the data fragments.
```sh
# lists vaults
$ agd query vstorage keys 'published.vaultFactory.managers.manager0.vaults'
```

## VStorage with CLI
VStorage can be accessed via CLI using:

```sh
$ agd /[--node {url}] query vstorage {path}
```

For example:
```sh
$ agd query vstorage path published.agoricNames
children:
- brand
- installation
- instance
...
```

With Agoric CLI, you can also use `follow` command to support vstorage query plus some of the marshalling conventions discussed below:
```sh
$ agoric follow -lF :published.agoricNames.brand
[
  [
    "BLD",
    slotToVal("board0566","Alleged: BLD brand"),
  ],
  [
    "IST",
    slotToVal("board0257","Alleged: IST brand"),
  ],
...
]
```

## VStorage Query API

## VStorage chainStorage API

## VStorage Viewer

<!-- Cannot find the right data for it. -->
## Cost Caution

<!-- Cannot find the right data for it. -->
## Best Practices

<!-- Cannot find the right data for it. -->
## Troubleshooting


## Example Codes
Here are some of the most commonly used keys in dapp development

- **Top level keys**: The `published` and `bundles` keys are the most relevant to dapp development.
```js
{
    activityhash: 'historical',
    beansOwing: 'swingset execution fee accounting',
    bundles: 'MsgInstallBundle outcome',
    egress: 'reserved for future use',
    highPrioritySenders: 'a priority mechanism',
    mailbox: 'reserved for future use',
    published: 'for the chainStorage API; see below',
}
```

- **published.\* keys**: The following keys appear under `published`.
```js
{
    agoricNames: 'name service controlled by chain governance',
    auction: 'see Inter Protocol',
    boardAux: 'auxiliary data for brands etc. keyed by boardId (since #49 2023-09-21)',
    committees: 'see Inter Protocol',
    crabble: 'reserved by chain governance proposal #64 decided 2023-12-18',
    kread: 'reserved by chain governance proposal #53 decided 2023-10-01',
    priceFeed: 'see Inter Protocol',
    provisionPool: 'provideds initial IST during smart wallet provisioning',
    psm: 'see Inter Protocol',
    reserve: 'see Inter Protocol',
    vaultFactory: 'see Inter Protocol',
    wallet: 'smart wallet status',
}
```

- **agoricNames hubs**: agoricNames contains several other NameHubs.
See also [agoricNames](https://docs.agoric.com/guides/integration/name-services.html#agoricnames-agoricnamesadmin-well-known-names).
```js
[
    'brand',
    'installation',
    'instance', 
    'issuer', 
    'oracleBrand', 
    'vbankAsset'
]
```

<!-- More to be added -->