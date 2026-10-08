# VStorage Reference

::: warning
The examples on this page were captured from a live chain snapshot and are
**illustrative, not authoritative**: exact board IDs, wallet addresses, and
`published.*` values change with every governance vote, chain upgrade, and
block. Treat the shapes and key names as stable; treat the specific IDs and
numbers as a point-in-time example, not something to hard-code.
:::

See also:

- [Querying VStorage](/guides/getting-started/contract-rpc#querying-vstorage)
- [Publishing to chainStorage](/guides/zoe/pub-to-storage)
- [x/vstorage module](https://github.com/Agoric/agoric-sdk/tree/master/golang/cosmos/x/vstorage#readme)

To read these paths off-chain, the current tools are the `vstorage-kit`/`smart-wallet-kit`
helpers in [`@agoric/client-utils`](https://github.com/Agoric/agoric-sdk/tree/master/packages/client-utils#readme),
the [`@agoric/casting`](https://github.com/Agoric/agoric-sdk/tree/master/packages/casting#readme)
library (`makeFollower`/`makeLeader`), or the `agoric follow` CLI command, which
unmarshal the CapData shown below into the `Object @Alleged: ...#boardNNN {}`
form used in these examples.

## vstorage: top level keys

The `published` and `bundles` keys are the most relevant to dapp development.

```js
    {
      activityhash: 'historical',
      beansOwing: 'swingset execution fee accounting',
      bundles: 'MsgInstallBundle outcome',
      egress: 'reserved for future use',
      highPriorityQueue: 'a priority mechanism',
      highPrioritySenders: 'a priority mechanism',
      published: 'for the chainStorage API; see below',
    }
```

## vstorage: published.\* keys

The following keys appear under `published` on a current chain. This list
changes over time as contracts are installed or retired by governance; the
one below is a snapshot, not an exhaustive or permanent list.

```js
    {
      agoricNames: 'name service controlled by chain governance',
      auction: 'the collateral auctioneer used by VaultFactory liquidations',
      boardAux: 'auxiliary data for brands etc. keyed by boardId',
      committees: 'economic committee / charter electorates',
      crabble: 'a long-running demo game contract, reserved by governance proposal #64',
      fastUsdc: 'the Fast USDC contract: fee config, feed policy, pool metrics, and transactions',
      kread: 'a long-running demo game contract, reserved by governance proposal #53',
      priceFeed: 'oracle price feeds (one child per feed, e.g. ATOM-USD_price_feed)',
      provisionPool: 'provides initial BLD during smart wallet provisioning',
      psm: 'the Parity Stability Module instances (one child per PSM, e.g. IST.USDC)',
      reserve: 'the collateral reserve contract',
      vaultFactory: 'the VaultFactory contract: governance, managers, metrics',
      wallet: 'smart wallet status',
      ymax0: 'a yield-portfolio orchestration contract instance',
      ymax1: 'a yield-portfolio orchestration contract instance',
    }
```

## vstorage: agoricNames hubs

agoricNames contains several other NameHubs.
See also [agoricNames](/guides/integration/name-services.html#agoricnames-agoricnamesadmin-well-known-names).

```js
[
  'brand',
  'chain',
  'chainConnection',
  'installation',
  'instance',
  'issuer',
  'oracleBrand',
  'vbankAsset',
];
```

`chain` and `chainConnection` are Orchestration additions: `chain` holds
per-chain configuration (chain-registry-style info keyed by chain name), and
`chainConnection` holds established interchain connection info, both used by
contracts that hold or move assets on other chains. `agoricNamesReserved` in
`packages/vats/src/core/utils.js` also declares a `uiConfig` hub (for
per-contract UI configuration), but it has not been populated with entries on
this chain as of this writing, so it isn't shown below.

## vstorage: well known contracts

`published.agoricNames.installation` contains _Installations_ representing code of important contracts. The data at this key are the entries of the NameHub. Here we show the object comprised
of those entries.
See also [agoricNames in vstorage](/guides/integration/name-services.html#agoricnames-in-vstorage)
regarding un-marshalling the data using board IDs.

```js
    {
      QstnContract: Object @Alleged: BundleIDInstallation#board026542 {},
      VaultFactory: Object @Alleged: BundleIDInstallation#board013354 {},
      auctioneer: Object @Alleged: BundleIDInstallation#board047351 {},
      binaryVoteCounter: Object @Alleged: BundleIDInstallation#board02314 {},
      centralSupply: Object @Alleged: BundleIDInstallation#board0188 {},
      committee: Object @Alleged: BundleIDInstallation#board00613 {},
      contractGovernor: Object @Alleged: BundleIDInstallation#board049352 {},
      econCommitteeCharter: Object @Alleged: BundleIDInstallation#board01422 {},
      fastUsdc: Object @Alleged: BundleIDInstallation#board060381 {},
      feeDistributor: Object @Alleged: BundleIDInstallation#board008387 {},
      kreadCommitteeCharter: Object @Alleged: BundleIDInstallation#board01998 {},
      kreadKit: Object @Alleged: BundleIDInstallation#board02897 {},
      mintHolder: Object @Alleged: BundleIDInstallation#board041386 {},
      postalService: Object @Alleged: BundleIDInstallation#board028519 {},
      priceAggregator: Object @Alleged: BundleIDInstallation#board048372 {},
      provisionPool: Object @Alleged: BundleIDInstallation#board013508 {},
      psm: Object @Alleged: BundleIDInstallation#board030392 {},
      reserve: Object @Alleged: BundleIDInstallation#board002511 {},
      scaledPriceAuthority: Object @Alleged: BundleIDInstallation#board031370 {},
      walletFactory: Object @Alleged: BundleIDInstallation#board011545 {},
      ymax0: Object @Alleged: BundleIDInstallation#board038544 {},
      ymax1: Object @Alleged: BundleIDInstallation#board020535 {},
    }
```

`published.agoricNames.instance` contains _instances_ of important contracts.
The data at this key are the entries of the NameHub. Here we show the object comprised of those entries.

```js
    {
      'ATOM-USD price feed': Object @Alleged: InstanceHandle#board058340 {},
      Crabble: Object @Alleged: InstanceHandle#board014143 {},
      CrabbleCommittee: Object @Alleged: InstanceHandle#board061141 {},
      CrabbleGovernor: Object @Alleged: InstanceHandle#board031144 {},
      QstnContract: Object @Alleged: InstanceHandle#board055543 {},
      VaultFactory: Object @Alleged: InstanceHandle#board00360 {},
      VaultFactoryGovernor: Object @Alleged: InstanceHandle#board03773 {},
      auctioneer: Object @Alleged: InstanceHandle#board032353 {},
      'dATOM-USD price feed': Object @Alleged: InstanceHandle#board061375 {},
      econCommitteeCharter: Object @Alleged: InstanceHandle#board059338 {},
      economicCommittee: Object @Alleged: InstanceHandle#board012327 {},
      fastUsdc: Object @Alleged: InstanceHandle#board026384 {},
      feeDistributor: Object @Alleged: InstanceHandle#board015388 {},
      kread: Object @Alleged: InstanceHandle#board003101 {},
      kreadCommittee: Object @Alleged: InstanceHandle#board052103 {},
      kreadCommitteeCharter: Object @Alleged: InstanceHandle#board029102 {},
      postalService: Object @Alleged: InstanceHandle#board053518 {},
      provisionPool: Object @Alleged: InstanceHandle#board01664 {},
      'psm-IST-DAI_axl': Object @Alleged: InstanceHandle#board02271 {},
      'psm-IST-DAI_grv': Object @Alleged: InstanceHandle#board01272 {},
      'psm-IST-USDC': Object @Alleged: InstanceHandle#board051120 {},
      'psm-IST-USDC_axl': Object @Alleged: InstanceHandle#board01867 {},
      'psm-IST-USDC_grv': Object @Alleged: InstanceHandle#board02568 {},
      'psm-IST-USDT': Object @Alleged: InstanceHandle#board064124 {},
      'psm-IST-USDT_axl': Object @Alleged: InstanceHandle#board05669 {},
      'psm-IST-USDT_grv': Object @Alleged: InstanceHandle#board05970 {},
      reserve: Object @Alleged: InstanceHandle#board06458 {},
      reserveGovernor: Object @Alleged: InstanceHandle#board03365 {},
      'scaledPriceAuthority-ATOM': Object @Alleged: InstanceHandle#board006346 {},
      'scaledPriceAuthority-dATOM': Object @Alleged: InstanceHandle#board035376 {},
      'scaledPriceAuthority-stATOM': Object @Alleged: InstanceHandle#board043347 {},
      'scaledPriceAuthority-stOSMO': Object @Alleged: InstanceHandle#board036348 {},
      'scaledPriceAuthority-stTIA': Object @Alleged: InstanceHandle#board013349 {},
      'scaledPriceAuthority-stkATOM': Object @Alleged: InstanceHandle#board002350 {},
      'stATOM-USD price feed': Object @Alleged: InstanceHandle#board023341 {},
      'stOSMO-USD price feed': Object @Alleged: InstanceHandle#board009342 {},
      'stTIA-USD price feed': Object @Alleged: InstanceHandle#board040343 {},
      'stkATOM-USD price feed': Object @Alleged: InstanceHandle#board053344 {},
      walletFactory: Object @Alleged: InstanceHandle#board06366 {},
      ymax0: Object @Alleged: InstanceHandle#board041540 {},
      ymax1: Object @Alleged: InstanceHandle#board014536 {},
    }
```

Notice `fastUsdc`, `ymax0`, and `ymax1` (Orchestration-based yield/portfolio
contracts) alongside the long-running `VaultFactory`/PSM/auction stack; this
list grows and shrinks as governance installs and retires contracts.

## vstorage: well-known assets

`published.agoricNames.issuer` has Issuers of well-known assets.

```js
    {
      ATOM: Object @Alleged: ATOM issuer#board02656 {},
      BLD: Object @Alleged: BLD issuer#board0592 {},
      DAI_axl: Object @Alleged: DAI_axl issuer#board02437 {},
      DAI_grv: Object @Alleged: DAI_grv issuer#board05039 {},
      FastLP: Object @Alleged: PoolShares issuer#board011383 {},
      IST: Object @Alleged: IST issuer#board0223 {},
      Invitation: Object @Alleged: Zoe Invitation issuer#board0371 {},
      KREAdCHARACTER: Object @Alleged: KREAdCHARACTER issuer#board033104 {},
      KREAdITEM: Object @Alleged: KREAdITEM issuer#board016105 {},
      PoC26: Object @Alleged: PoC26 issuer#board049513 {},
      USDC: Object @Alleged: USDC issuer#board007117 {},
      USDC_axl: Object @Alleged: USDC_axl issuer#board02437 {},
      USDC_grv: Object @Alleged: USDC_grv issuer#board05039 {},
      USDT: Object @Alleged: USDT issuer#board030121 {},
      USDT_axl: Object @Alleged: USDT_axl issuer#board05141 {},
      USDT_grv: Object @Alleged: USDT_grv issuer#board00443 {},
      dATOM: Object @Alleged: dATOM issuer#board001373 {},
      stATOM: Object @Alleged: stATOM issuer#board059111 {},
      stOSMO: Object @Alleged: stOSMO issuer#board062162 {},
      stTIA: Object @Alleged: stTIA issuer#board028171 {},
      stkATOM: Object @Alleged: stkATOM issuer#board016182 {},
    }
```

`FastLP` (Fast USDC pool shares) and `PoC26` are recent additions alongside
the original PSM/staking-derivative assets; `USDC` (native, distinct from the
IBC-relayed `USDC_axl`/`USDC_grv`) backs Fast USDC's Noble-to-Agoric transfers.

`published.agoricNames.brand` has the well-known Brands.

```js
    {
      ATOM: Object @Alleged: ATOM brand#board05557 {},
      BLD: Object @Alleged: BLD brand#board0566 {},
      DAI_axl: Object @Alleged: DAI_axl brand#board01744 {},
      DAI_grv: Object @Alleged: DAI_grv brand#board03446 {},
      FastLP: Object @Alleged: PoolShares brand#board038382 {},
      IST: Object @Alleged: IST brand#board0257 {},
      Invitation: Object @Alleged: Zoe Invitation brand#board0074 {},
      KREAdCHARACTER: Object @Alleged: KREAdCHARACTER brand#board06299 {},
      KREAdITEM: Object @Alleged: KREAdITEM brand#board046100 {},
      PoC26: Object @Alleged: PoC26 brand#board036514 {},
      USDC: Object @Alleged: USDC brand#board016118 {},
      USDC_axl: Object @Alleged: USDC_axl brand#board05736 {},
      USDC_grv: Object @Alleged: USDC_grv brand#board03138 {},
      USDT: Object @Alleged: USDT brand#board004122 {},
      USDT_axl: Object @Alleged: USDT_axl brand#board03040 {},
      USDT_grv: Object @Alleged: USDT_grv brand#board04542 {},
      dATOM: Object @Alleged: dATOM brand#board020374 {},
      stATOM: Object @Alleged: stATOM brand#board037112 {},
      stOSMO: Object @Alleged: stOSMO brand#board019163 {},
      stTIA: Object @Alleged: stTIA brand#board006172 {},
      stkATOM: Object @Alleged: stkATOM brand#board033183 {},
      timer: Object @Alleged: timerBrand#board0425 {},
    }
```

`published.agoricNames.oracleBrand` has the well-known oracle brands.

```js
    {
      ATOM: Object @Alleged: Brand#board03935 {},
      USD: Object @Alleged: Brand#board01034 {},
      dATOM: Object @Alleged: Brand#board050371 {},
      stATOM: Object @Alleged: Brand#board022110 {},
      stOSMO: Object @Alleged: Brand#board036161 {},
      stTIA: Object @Alleged: Brand#board053170 {},
      stkATOM: Object @Alleged: Brand#board018181 {},
    }
```

`published.agoricNames.vbankAsset` shows denoms registered with the vbank.

```js
    {
// ...
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
// ...
      'ibc/B1E6288B5A0224565D915D1F66716486F16D8A44BF33A9EC323DD6BA30764C35': {
        brand: Object @Alleged: stATOM brand#board037112 {},
        denom: 'ibc/B1E6288B5A0224565D915D1F66716486F16D8A44BF33A9EC323DD6BA30764C35',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: stATOM issuer#board059111 {},
        issuerName: 'stATOM',
        proposedName: 'stATOM',
      },
// ...
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
      ufastlp: {
        brand: Object @Alleged: PoolShares brand#board038382 {},
        denom: 'ufastlp',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: PoolShares issuer#board011383 {},
        issuerName: 'FastLP',
        proposedName: 'FastLP',
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

Note that `USDC` here (and `FastLP`/`ufastlp`) is a **vbank-registered denom
managed by Fast USDC's own IBC path**, distinct from the IBC-relayed
`USDC_axl`/`USDC_grv` variants that arrive over Axelar/Gravity Bridge; check
`denom` and `issuerName` rather than assuming a single canonical "USDC".

## boardAux

The keys under `published.boardAux` are board IDs.
Here we show a handful.

```js
['board0074', 'board004122', 'board01744'];
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
      board004122: {
        allegedName: 'USDT',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
      },
      board01744: {
        allegedName: 'DAI_axl',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 18,
        },
      },
    }
```

## vstorage: provisionPool

`published.provisionPool.governance` gives current values of governed params.

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
                handle: Object @Alleged: InvitationHandle#board036509 {},
                installation: Object @Alleged: BundleIDInstallation#board00613 {},
                instance: Object @Alleged: InstanceHandle#board012327 {},
              },
            ],
          },
        },
        PerAccountInitialAmount: {
          type: 'amount',
          value: {
            brand: Object @Alleged: BLD brand#board0566 {},
            value: 10000000n,
          },
        },
      },
    }
```

Note `PerAccountInitialAmount` is now denominated in `BLD`, not `IST` as in
earlier chain history.

`published.provisionPool.metrics`

```js
    {
      totalMintedConverted: {
        brand: Object @Alleged: BLD brand#board0566 {},
        value: 0n,
      },
      totalMintedProvided: {
        brand: Object @Alleged: BLD brand#board0566 {},
        value: 3800000000n,
      },
      walletsProvisioned: 1462n,
    }
```

## vstorage: wallet

The address of each provisioned smart wallet is a key under `published.wallet`.
Here we show a handful.
See also: [Smart Wallet VStorage Topics](/guides/getting-started/contract-rpc#smart-wallet-vstorage-topics)

```js
[
  'agoric1003uxlkc77u6szrg603m273r00usecc0xvrhph',
  'agoric1009qfjzn5enucuwzmfv3kwy690y5vne4m7kyxr',
  'agoric10229lxdgw6urj90h8xvkg7y6lw6s06u7zgwyy6',
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
            value: [],
          },
          brand: Object @Alleged: Zoe Invitation brand#board0074 {},
        },
      ],
    }
```

The `published.wallet.${address}` key has the wallet's last update. This
shape has grown beyond simple balance changes; for example, an Orchestration
`invokeEntry` invocation result looks like:

```js
    {
      id: 'setTargetAllocation.2026-07-10T03:07:19.504Z',
      result: {
        passStyle: 'string',
      },
      updated: 'invocation',
    }
```

## vstorage: fastUsdc

`published.fastUsdc` has `feeConfig`, `feedPolicy`, `poolMetrics`, and `txns`
children for the [Fast USDC](https://github.com/Agoric/agoric-sdk/tree/master/packages/fast-usdc#readme)
contract.

`published.fastUsdc.poolMetrics` reports the liquidity pool's running totals:

```js
    {
      encumberedBalance: {
        brand: Object @Alleged: USDC brand#board016118 {},
        value: 299739207n,
      },
      shareWorth: {
        denominator: {
          brand: Object @Alleged: PoolShares brand#board038382 {},
          value: 60439964842n,
        },
        numerator: {
          brand: Object @Alleged: USDC brand#board016118 {},
          value: 62829671966n,
        },
      },
      totalBorrows: {
        brand: Object @Alleged: USDC brand#board016118 {},
        value: 3415666304045n,
      },
      totalContractFees: {
        brand: Object @Alleged: USDC brand#board016118 {},
        value: 698308370n,
      },
      totalPoolFees: {
        brand: Object @Alleged: USDC brand#board016118 {},
        value: 2760193415n,
      },
      totalRepays: {
        brand: Object @Alleged: USDC brand#board016118 {},
        value: 3415366564838n,
      },
    }
```

`published.fastUsdc.feeConfig` shows the current fee schedule, including
per-destination-chain overrides (keyed by [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
chain ID, for example `eip155:1` for Ethereum mainnet):

```js
    {
      contractRate: {
        denominator: {
          brand: Object @Alleged: USDC brand#board016118 {},
          value: 10n,
        },
        numerator: {
          brand: Object @Alleged: USDC brand#board016118 {},
          value: 2n,
        },
      },
      destinationOverrides: {
        'eip155:1': {
          relay: {
            brand: Object @Alleged: USDC brand#board016118 {},
            value: 500000n,
          },
        },
        // ...one entry per overridden destination chain
      },
      flat: {
        brand: Object @Alleged: USDC brand#board016118 {},
        value: 10000n,
      },
      variableRate: {
        denominator: {
          brand: Object @Alleged: USDC brand#board016118 {},
          value: 1000n,
        },
        numerator: {
          brand: Object @Alleged: USDC brand#board016118 {},
          value: 1n,
        },
      },
    }
```
