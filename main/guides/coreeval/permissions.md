# Coding Permissions

Write a json file with the permissions that the proposal will need. For example,
[gov-add-psm-permit.json](https://github.com/Agoric/agoric-sdk/blob/master/packages/inter-protocol/test/psm/gov-add-psm-permit.json) 
is the proposal Agoric created for the PSM contract. Note that permissions are set by listing the
permission and setting it to any String. Thus,`"bankManager": true` and `"bankManager": false` are
equivalent; they both set the `bankManager` permission.

::: details Show example permissions file
```
{
  "consume": {
    "agoricNamesAdmin": true,
    "bankManager": true,
    "board": true,
    "chainStorage": true,
    "zoe": "zoe",
    "feeMintAccess": "zoe",
    "economicCommitteeCreatorFacet": "economicCommittee",
    "econCharterKit": true,
    "provisionPoolStartResult": true,
    "psmKit": true,
    "chainTimerService": "timer"
  },
  "produce": {
    "testFirstAnchorKit": true
  },
  "installation": {
    "consume": {
      "contractGovernor": true,
      "psm": true,
      "mintHolder": true
    }
  },
  "instance": {
    "consume": {
      "economicCommittee": true
    }
  },
  "issuer": {
    "produce": {
      "DAI": true
    },
    "consume": {
      "DAI": true
    }
  },
  "brand": {
    "consume": {
      "DAI": true,
      "IST": true
    },
    "produce": {
      "DAI": true
    }
  }
}
```
:::

## Consume Section

In this section you need to set all the permissions that your contract will need to be able to use
(i.e., "consume"). Some of the listed permissions in the example PSM permission file above are of
general interest to most contracts, while others are more specific to the PSM contract.

* **agoricNamesAdmin**: Grants write access to the Agoric name service. This permission is somewhat specific to the PSM contract.
* **bankManager**: Grants access to bank-related functionality within ERTP, allowing the contract to manipulate nearly all Cosmos assets in the chain. Because this capability is very powerful, this permission should only be granted to contracts that absolutely need it.
* **board**: Grants write access to the [board name service](/guides/wallet/README.md#the-agoric-board).
* **chainStorage**: Grants write access to the chain storage node, which is required when running `agd query` commands. Thus, most contracts will need access to this.
* **zoe**: When this permission is set, it grants access to the Zoe framework. All contracts will need access to this.
* **feeMintAccess**: When this permission is set, the contract will be able to create digital assets. Only contracts that mint privileged Agoric digital assets (i.e., not the unprivileged **[zcf.makeZDFMint()](/reference/zoe-api/zoe-contract-facet.md#zcf-makezcfmint-keyword-assetkind-displayinfo)**) will need access to this.
* **economicCommitteeCreatorFacet**, **econCharterKit**, **provisionPoolStartResult**: These 3 permissions are required by governed contracts.
* **chainTimerService**: When this permission is set, it grants access to the *chainTimerService*. All governed contracts need access to this so they know when a vote is complete.

## Produce Section

Specifies what, if anything, the contract produces. For example, the example PSM contract produces *testFirstAnchorKit* which is used for testing purposes.

## Installation Section 

Specifies what well-known installations the contract requires. At a minimum, the contract itself should be listed as an installation. Governed contracts should include a *contractGovernor* installation.

## Instance Section

Specifies what instances, if any, the contract produces or consumes.

## Issuer Section

Specifies what digital assets, if any, the contract issuer can produce or consume.

## Brand Section

Specifies what **[Brands](/reference/ertp-api/brand.md)**, if any, the contract can produce or consume.
Note that any **Brands** associated with digital assets that the contract mints 
are not included in this section, unless they're also produced or consumed in some other capacity.