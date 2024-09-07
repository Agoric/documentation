# VStorage Reference

In the Agoric platform, VStorage is a key-value store that:

- provides a **read-only interface where clients of the consensus layer** can query the stored data using specific paths.
- is organized in a **hierarchical, path-based structure**. Clients can query these paths to retrieve the data. For example:
```sh
$ agd query vstorage keys 'published.vaultFactory.managers.manager0.vaults'
children:
- vault0
```
- can be written through a specialized API called **[chainStorage](../guides/zoe/pub-to-storage#publishing-to-chainstorage)** from within the JavaScript VM.

![vstorage query diagram](../guides/getting-started/assets/vstorage-brand-q.svg)

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
children:
- vault0
```
For more information on [agd](https://docs.agoric.com/guides/agoric-cli/agd-query-tx), you can refer to the documentation for [query command](https://docs.agoric.com/guides/agoric-cli/agd-query-tx#query-commands) in `agd` CLI.

## VStorage with CLI
VStorage can be accessed via CLI using:

```sh
$ agd [--node {url}] query vstorage {path}
```

<!-- TODO: Add reference to --node documentation-->

For example:
```sh
$ agd query vstorage path published.agoricNames
children:
- brand
- installation
- instance
...
```

With [Agoric CLI](https://docs.agoric.com/guides/agoric-cli/#agoric-cli-reference), you can also use `follow` command to support vstorage query along with some of the marshalling conventions discussed below:
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

## VStorage Protobuf Service Definition
The protobuf definition of vstorage is [agoric.vstorage.Query](https://github.com/Agoric/agoric-sdk/blob/mainnet1B/golang/cosmos/proto/agoric/vstorage/query.proto#L11) package.
```
service Query {
  // Return an arbitrary vstorage datum.
  rpc Data(QueryDataRequest) returns (QueryDataResponse) {
    option (google.api.http).get = "/agoric/vstorage/data/{path}";
  }

  // Return the children of a given vstorage path.
  rpc Children(QueryChildrenRequest)
    returns (QueryChildrenResponse) {
      option (google.api.http).get = "/agoric/vstorage/children/{path}";
  }
}
```

## VStorage chainStorage API
`chainStorage` API offers write-access to VStorage for contracts, by [connecting to a subscriber](https://docs.agoric.com/guides/js-programming/notifiers.html) to a `chainStorage` node.

While adding [Adding Parameter Governance to a Contract](https://docs.agoric.com/guides/governance/#adding-parameter-governance-to-a-contract), `storageNode` and `marshaller` are passed to the contract in its `privateArgs` so it can publish to chainStorage.

```
const marshaller = await E(board).getPublishingMarshaller();
const storageNode = await E(chainStorage).makeChildNode(contractName);
...
const installation = await E(zoe).startInstance(
  ...,
  privateArgs: harden({
      storageNode,
      marshaller,
  })
)
```
The `chainStorage` node corresponds to the `published` key in the [vstorage hierarchy](https://docs.agoric.com/reference/vstorage-ref.html#vstorage-hierarchy). Using `E(chainStorage).makeChildNode(contractName)` gives the contract access to write to the `published.{contractName}` key and all keys under it. 
To understand more on `Marshaller` and `chainStorage` Node, please refer to documentation on [Publishing to chainStorage](https://docs.agoric.com/guides/zoe/pub-to-storage.html#publishing-to-chainstorage)

## VStorage Viewer
To visualize the current state of VStorage, The [vstorage-viewer](https://github.com/p2p-org/p2p-agoric-vstorage-viewer) contributed by p2p is often _very_ handy:

[![vstorage viewer screenshot](https://user-images.githubusercontent.com/150986/259798595-40cd22f0-fa01-43a9-b92a-4f0f4813a4f6.png)](https://p2p-org.github.io/p2p-agoric-vstorage-viewer/#https://devnet.rpc.agoric.net/|published,published.agoricNames|)

## DApp UI and VStorage
As mentioned above, VStorage offers clients an access to data from contracts, including dApp UI. For detail tutorial on tools and libraries available for this connection is available [here](https://docs.agoric.com/guides/getting-started/ui-tutorial/querying-vstorage.html#querying-vstorage).

## Common VStorage Examples

### vstorage: top level keys
The `published` and `bundles` keys are the most relevant to dapp development.

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
### vstorage: published.\* keys

The following keys appear under `published`.
see also [Inter Protocol data](https://github.com/Agoric/agoric-sdk/tree/agoric-upgrade-13/packages/inter-protocol#reading-data-off-chain).

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
### vstorage: agoricNames hubs

agoricNames contains several other NameHubs.
See also [agoricNames](https://docs.agoric.com/guides/integration/name-services.html#agoricnames-agoricnamesadmin-well-known-names).

```js
['brand', 'installation', 'instance', 'issuer', 'oracleBrand', 'vbankAsset'];
```

### vstorage: well known contracts

`published.agoricNames.installation` contains _Installations_ representing code of important contracts. The data at this key are the entries of the NameHub. Here we show the object comprised
of those entries.
See also [agoricNames in vstorage](https://docs.agoric.com/guides/integration/name-services.html#agoricnames-in-vstorage)
regarding un-marshalling the data using board IDs.

```js
    {
      VaultFactory: Object @Alleged: BundleIDInstallation#board05815 {},
      auctioneer: Object @Alleged: BundleIDInstallation#board04016 {},
      binaryVoteCounter: Object @Alleged: BundleIDInstallation#board02314 {},
      centralSupply: Object @Alleged: BundleIDInstallation#board0188 {},
      committee: Object @Alleged: BundleIDInstallation#board00613 {},
      contractGovernor: Object @Alleged: BundleIDInstallation#board02810 {},
      econCommitteeCharter: Object @Alleged: BundleIDInstallation#board01422 {},
      feeDistributor: Object @Alleged: BundleIDInstallation#board00917 {},
      kreadCommitteeCharter: Object @Alleged: BundleIDInstallation#board01679 {},
      kreadKit: Object @Alleged: BundleIDInstallation#board04980 {},
      mintHolder: Object @Alleged: BundleIDInstallation#board02733 {},
      priceAggregator: Object @Alleged: BundleIDInstallation#board02021 {},
      provisionPool: Object @Alleged: BundleIDInstallation#board05311 {},
      psm: Object @Alleged: BundleIDInstallation#board05432 {},
      reserve: Object @Alleged: BundleIDInstallation#board00218 {},
      scaledPriceAuthority: Object @Alleged: BundleIDInstallation#board04719 {},
      walletFactory: Object @Alleged: BundleIDInstallation#board04312 {},
    }
```

`published.agoricNames.instance` contains _instances_ of important contracts.
The data at this key are the entries of the NameHub. Here we show the object comprised of those entries.

`published.agoricNames.instance` contains _instances_ of important contracts.
The data at this key are the entries of the NameHub. Here we show the object comprised of those entries.

```js
    {
      'ATOM-USD price feed': Object @Alleged: InstanceHandle#board02963 {},
      Crabble: Object @Alleged: InstanceHandle#board04395 {},
      CrabbleCommittee: Object @Alleged: InstanceHandle#board02393 {},
      CrabbleGovernor: Object @Alleged: InstanceHandle#board05396 {},
      VaultFactory: Object @Alleged: InstanceHandle#board00360 {},
      VaultFactoryGovernor: Object @Alleged: InstanceHandle#board03773 {},
      auctioneer: Object @Alleged: InstanceHandle#board01759 {},
      econCommitteeCharter: Object @Alleged: InstanceHandle#board04661 {},
      economicCommittee: Object @Alleged: InstanceHandle#board04149 {},
      feeDistributor: Object @Alleged: InstanceHandle#board05262 {},
      kread: Object @Alleged: InstanceHandle#board04783 {},
      kreadCommittee: Object @Alleged: InstanceHandle#board01985 {},
      kreadCommitteeCharter: Object @Alleged: InstanceHandle#board06284 {},
      provisionPool: Object @Alleged: InstanceHandle#board01664 {},
      'psm-IST-DAI_axl': Object @Alleged: InstanceHandle#board01867 {},
      'psm-IST-DAI_grv': Object @Alleged: InstanceHandle#board02568 {},
      'psm-IST-USDC_axl': Object @Alleged: InstanceHandle#board05669 {},
      'psm-IST-USDC_grv': Object @Alleged: InstanceHandle#board05970 {},
      'psm-IST-USDT_axl': Object @Alleged: InstanceHandle#board02271 {},
      'psm-IST-USDT_grv': Object @Alleged: InstanceHandle#board01272 {},
      reserve: Object @Alleged: InstanceHandle#board06458 {},
      reserveGovernor: Object @Alleged: InstanceHandle#board03365 {},
      'scaledPriceAuthority-stATOM': Object @Alleged: InstanceHandle#board05892 {},
      'stATOM-USD price feed': Object @Alleged: InstanceHandle#board04091 {},
      walletFactory: Object @Alleged: InstanceHandle#board06366 {},
    }
```
### vstorage: well-known assets

`published.agoricNames.issuer` has Issuers of well-known assets.

```js
    {
      ATOM: Object @Alleged: ATOM issuer#board02656 {},
      BLD: Object @Alleged: BLD issuer#board0592 {},
      DAI_axl: Object @Alleged: DAI_axl issuer#board02437 {},
      DAI_grv: Object @Alleged: DAI_grv issuer#board05039 {},
      IST: Object @Alleged: IST issuer#board0223 {},
      Invitation: Object @Alleged: Zoe Invitation issuer#board0371 {},
      KREAdCHARACTER: Object @Alleged: KREAdCHARACTER issuer#board01386 {},
      KREAdITEM: Object @Alleged: KREAdITEM issuer#board03687 {},
      USDC_axl: Object @Alleged: USDC_axl issuer#board05141 {},
      USDC_grv: Object @Alleged: USDC_grv issuer#board00443 {},
      USDT_axl: Object @Alleged: USDT_axl issuer#board06445 {},
      USDT_grv: Object @Alleged: USDT_grv issuer#board01547 {},
      stATOM: Object @Alleged: stATOM issuer#board00689 {},
    }
```

`published.agoricNames.brand` has the well-known Brands.

```js
    {
      ATOM: Object @Alleged: ATOM brand#board05557 {},
      BLD: Object @Alleged: BLD brand#board0566 {},
      DAI_axl: Object @Alleged: DAI_axl brand#board05736 {},
      DAI_grv: Object @Alleged: DAI_grv brand#board03138 {},
      IST: Object @Alleged: IST brand#board0257 {},
      Invitation: Object @Alleged: Zoe Invitation brand#board0074 {},
      KREAdCHARACTER: Object @Alleged: KREAdCHARACTER brand#board03281 {},
      KREAdITEM: Object @Alleged: KREAdITEM brand#board00282 {},
      USDC_axl: Object @Alleged: USDC_axl brand#board03040 {},
      USDC_grv: Object @Alleged: USDC_grv brand#board04542 {},
      USDT_axl: Object @Alleged: USDT_axl brand#board01744 {},
      USDT_grv: Object @Alleged: USDT_grv brand#board03446 {},
      stATOM: Object @Alleged: stATOM brand#board00990 {},
      timer: Object @Alleged: timerBrand#board0425 {},
    }
```

`published.agoricNames.oracleBrand` has the well-known oracle brands.

```js
    {
      ATOM: Object @Alleged: Brand#board03935 {},
      USD: Object @Alleged: Brand#board01034 {},
      stATOM: Object @Alleged: Brand#board04388 {},
    }
```

`published.agoricNames.vbankAsset` shows denoms registered with the vbank.

```js
    {
...
      'ibc/42225F147137DDEB5FEF0F1D0A92F2AD57557AFA2C4D6F30B21E0D983001C002': {
        brand: Object @Alleged: stATOM brand#board00990 {},
        denom: 'ibc/42225F147137DDEB5FEF0F1D0A92F2AD57557AFA2C4D6F30B21E0D983001C002',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: stATOM issuer#board00689 {},
        issuerName: 'stATOM',
        proposedName: 'stATOM',
      },
...
      'ibc/BA313C4A19DFBF943586C0387E6B11286F9E416B4DD27574E6909CABE0E342FA': {
        brand: Object @Alleged: ATOM brand#board05557 {},
        denom: 'ibc/BA313C4A19DFBF943586C0387E6B11286F9E416B4DD27574E6909CABE0E342FA',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: ATOM issuer#board02656 {},
        issuerName: 'ATOM',
        proposedName: 'ATOM',
      },
...
      ubld: {
        brand: Object @Alleged: BLD brand#board0566 {},
        denom: 'ubld',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: BLD issuer#board0592 {},
        issuerName: 'BLD',
        proposedName: 'Agoric staking token',
      },
      uist: {
        brand: Object @Alleged: IST brand#board0257 {},
        denom: 'uist',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: IST issuer#board0223 {},
        issuerName: 'IST',
        proposedName: 'Agoric stable token',
      },
    }
```

### boardAux

The keys under `published.boardAux` are board IDs.
Here we show a handful.

```js
['board00282', 'board0074', 'board01744'];
```

The data are auxiliary info about objects in the board;
for example, displayInfo of brands, including assetKind.

```js
    {
      board0074: {
        allegedName: 'Zoe Invitation',
        displayInfo: {
          assetKind: 'set',
        },
      },
      board01744: {
        allegedName: 'USDT_axl',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
      },
    }
```

### vstorage: provisionPool

`published.provisionPool.governance` gives current values of governed params.
See similar data in [Inter Protocol data](https://github.com/Agoric/agoric-sdk/tree/agoric-upgrade-13/packages/inter-protocol#reading-data-off-chain).

```js
    {
      current: {
        Electorate: {
          type: 'invitation',
          value: {
            brand: Object @Alleged: Zoe Invitation brand#board0074 {},
            value: [
              {
                description: 'questionPoser',
                handle: Object @Alleged: InvitationHandle#board00848 {},
                installation: Object @Alleged: BundleIDInstallation#board00613 {},
                instance: Object @Alleged: InstanceHandle#board04149 {},
              },
            ],
          },
        },
        PerAccountInitialAmount: {
          type: 'amount',
          value: {
            brand: Object @Alleged: IST brand#board0257 {},
            value: 250000n,
          },
        },
      },
    }
```

`published.provisionPool.metrics`

```js
    {
      totalMintedConverted: {
        brand: Object @Alleged: IST brand#board0257 {},
        value: 20000000n,
      },
      totalMintedProvided: {
        brand: Object @Alleged: IST brand#board0257 {},
        value: 2750000n,
      },
      walletsProvisioned: 11n,
    }
```

### vstorage: wallet

The address of each provisioned smart wallet is a key under `published.wallet`.
Here we show a handful.
See also: [Smart Wallet VStorage Topics](/guides/getting-started/contract-rpc#smart-wallet-vstorage-topics)

```js
[
  'agoric1890064p6j3xhzzdf8daknd6kpvhw766ds8flgw',
  'agoric1ee9hr0jyrxhy999y755mp862ljgycmwyp4pl7q',
  'agoric1enwuyn2hzyyvt39x87tk9rhlkpqtyv9haj7mgs',
];
```

The `.current` child has current wallet status. For example:

```js
    {
      liveOffers: [],
      offerToPublicSubscriberPaths: [],
      offerToUsedInvitation: [],
      purses: [
        {
          balance: {
            brand: Object @Alleged: Zoe Invitation brand#board0074 {},
            value: [
              {
                description: 'Voter0',
                handle: Object @Alleged: InvitationHandle#null {},
                installation: Object @Alleged: BundleIDInstallation#board00613 {},
                instance: Object @Alleged: InstanceHandle#null {},
              },
              {
                description: 'charter member invitation',
                handle: Object @Alleged: InvitationHandle#null {},
                installation: Object @Alleged: BundleIDInstallation#board01679 {},
                instance: Object @Alleged: InstanceHandle#null {},
              },
            ],
          },
          brand: Object @Alleged: Zoe Invitation brand#board0074 {},
        },
      ],
    }
```

The `published.wallet.${address}` key has wallet's last update. For example:

```js
    {
      currentAmount: {
        brand: Object @Alleged: Zoe Invitation brand#board0074 {},
        value: [
          {
            description: 'Voter0',
            handle: Object @Alleged: InvitationHandle#null {},
            installation: Object @Alleged: BundleIDInstallation#board00613 {},
            instance: Object @Alleged: InstanceHandle#null {},
          },
          {
            description: 'charter member invitation',
            handle: Object @Alleged: InvitationHandle#null {},
            installation: Object @Alleged: BundleIDInstallation#board01679 {},
            instance: Object @Alleged: InstanceHandle#null {},
          },
        ],
      },
      updated: 'balance',
    }
```

See also:

- [Querying VStorage UI Tutorial](https://docs.agoric.com/guides/getting-started/ui-tutorial/querying-vstorage)
- [Querying VStorage](/guides/getting-started/contract-rpc#querying-vstorage)
- [Publishing to chainStorage](../guides/zoe/pub-to-storage)
- [x/vstorage module](https://github.com/Agoric/agoric-sdk/tree/003f0c2232815a8d64a3f9a5b05521a10160ce34/golang/cosmos/x/vstorage#readme)
