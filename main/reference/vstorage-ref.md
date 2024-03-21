# VStorage Reference

See also:

- [Querying VStorage](/guides/getting-started/contract-rpc#querying-vstorage)
- [x/vstorage module](https://github.com/Agoric/agoric-sdk/tree/003f0c2232815a8d64a3f9a5b05521a10160ce34/golang/cosmos/x/vstorage#readme)

## vstorage: top level keys

> The published and bundles keys are the most relevant to dapp development.

    {
      activityhash: 'historical',
      beansOwing: 'swingset execution fee accounting',
      bundles: 'MsgInstallBundle outcome',
      egress: 'reserved for future use',
      highPrioritySenders: 'a priority mechanism',
      mailbox: 'reserved for future use',
      published: 'for the chainStorage API; see below',
    }

## vstorage: published.\* keys

> The following keys appear under published.\*.
>
> see also [Inter Protocol data](https://github.com/Agoric/agoric-sdk/tree/agoric-upgrade-13/packages/inter-protocol#reading-data-off-chain).

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

## vstorage: agoricNames hubs

> agoricNames contains several other NameHubs.
> See also [agoricNames](https://docs.agoric.com/guides/integration/name-services.html#agoricnames-agoricnamesadmin-well-known-names).

    [
      'brand',
      'installation',
      'instance',
      'issuer',
      'oracleBrand',
      'vbankAsset',
    ]

## vstorage: well known contracts

> published.agoricNames.installation has the contents (entries)
> of the Installation namehub. Here we show the object comprised
> of those entries.
> See also [agoricNames in vstorage](https://docs.agoric.com/guides/integration/name-services.html#agoricnames-in-vstorage)
> regarding un-marshalling the data using board IDs.

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

> published.agoricNames.instance has the contents (entries) of the Instance namehub.

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

## vstorage: well-known assets

> published.agoricNames.issuer has Issuers of well-known assets.

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

> published.agoricNames.issuer has the well-known Brands.

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

> published.agoricNames.issuer has the well-known oracle brands.

    {
      ATOM: Object @Alleged: Brand#board03935 {},
      USD: Object @Alleged: Brand#board01034 {},
      stATOM: Object @Alleged: Brand#board04388 {},
    }

> published.agoricNames.issuer shows denoms registered with the vbank.

    {
      'ibc/295548A78785A1007F232DE286149A6FF512F180AF5657780FC89C009E2C348F': {
        brand: Object @Alleged: USDC_axl brand#board03040 {},
        denom: 'ibc/295548A78785A1007F232DE286149A6FF512F180AF5657780FC89C009E2C348F',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: USDC_axl issuer#board05141 {},
        issuerName: 'USDC_axl',
        proposedName: 'USD Coin',
      },
      'ibc/386D09AE31DA7C0C93091BB45D08CB7A0730B1F697CD813F06A5446DCF02EEB2': {
        brand: Object @Alleged: USDT_grv brand#board03446 {},
        denom: 'ibc/386D09AE31DA7C0C93091BB45D08CB7A0730B1F697CD813F06A5446DCF02EEB2',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: USDT_grv issuer#board01547 {},
        issuerName: 'USDT_grv',
        proposedName: 'Tether USD',
      },
      'ibc/3914BDEF46F429A26917E4D8D434620EC4817DC6B6E68FB327E190902F1E9242': {
        brand: Object @Alleged: DAI_axl brand#board05736 {},
        denom: 'ibc/3914BDEF46F429A26917E4D8D434620EC4817DC6B6E68FB327E190902F1E9242',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 18,
        },
        issuer: Object @Alleged: DAI_axl issuer#board02437 {},
        issuerName: 'DAI_axl',
        proposedName: 'DAI',
      },
      'ibc/3D5291C23D776C3AA7A7ABB34C7B023193ECD2BC42EA19D3165B2CF9652117E7': {
        brand: Object @Alleged: DAI_grv brand#board03138 {},
        denom: 'ibc/3D5291C23D776C3AA7A7ABB34C7B023193ECD2BC42EA19D3165B2CF9652117E7',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 18,
        },
        issuer: Object @Alleged: DAI_grv issuer#board05039 {},
        issuerName: 'DAI_grv',
        proposedName: 'DAI',
      },
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
      'ibc/6831292903487E58BF9A195FDDC8A2E626B3DF39B88F4E7F41C935CADBAF54AC': {
        brand: Object @Alleged: USDC_grv brand#board04542 {},
        denom: 'ibc/6831292903487E58BF9A195FDDC8A2E626B3DF39B88F4E7F41C935CADBAF54AC',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: USDC_grv issuer#board00443 {},
        issuerName: 'USDC_grv',
        proposedName: 'USC Coin',
      },
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
      'ibc/F2331645B9683116188EF36FC04A809C28BD36B54555E8705A37146D0182F045': {
        brand: Object @Alleged: USDT_axl brand#board01744 {},
        denom: 'ibc/F2331645B9683116188EF36FC04A809C28BD36B54555E8705A37146D0182F045',
        displayInfo: {
          assetKind: 'nat',
          decimalPlaces: 6,
        },
        issuer: Object @Alleged: USDT_axl issuer#board06445 {},
        issuerName: 'USDT_axl',
        proposedName: 'Tether USD',
      },
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

## boardAux

> The keys under published.boardAux.\* are board IDs.
> Here we show a handful.

    [
      'board00282',
      'board0074',
      'board01744',
    ]

> The data are auxiliary info about objects in the board;
> for example, displayInfo of brands, including assetKind.

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

## vstorage: provisionPool

> published.provisionPool.governance
> See also Inter Protocol governance.

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

> published.provisionPool.metrics

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

## vstorage: wallet

> The address of each provisioned smart wallet is a key under published.wallet.\*.
> Here we show a hand-ful.
> See also: [Smart Wallet VStorage Topics](/guides/getting-started/contract-rpc#smart-wallet-vstorage-topics)

    [
      'agoric1890064p6j3xhzzdf8daknd6kpvhw766ds8flgw',
      'agoric1ee9hr0jyrxhy999y755mp862ljgycmwyp4pl7q',
      'agoric1enwuyn2hzyyvt39x87tk9rhlkpqtyv9haj7mgs',
    ]

> The .current child has current wallet status. For example:

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

> The address key has wallet last update. For example:

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
