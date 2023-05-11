# Coding Permissions

Write a json file with the permissions that the proposal will need. For example, [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/inter-protocol/test/psm/gov-add-psm-permit.json) is the proposal Agoric created for the PSM contract:


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

In this section you need to set all the permissions that your contract will need to be able to use (i.e., "consume"). Some of the listed permissions in the example PSM permission file above are of general interest to most contracts, while others are more specific to the PSM contract.

* **agoricNamesAdmin**: Grants write access to the Agoric name service. This permission is somewhat specific to the PSM contract.
* **bankManager**: Grants access to bank-related functionality within ERTP and Zoe. Most contracts will need access.
* **board**: Grants write access to the board name service. This permission is somewhat specific to the PSM contract.
* **chainStorage**: Grants write access to the chain storage node, which is required when running `agd query` commands. Thus, most contracts will need access to this.
* **zoe**: When this permission is set to "zoe", it grants access to the Zoe framework. All contracts will need access to this.
* **feeMintAccess**: When this permission is set to "zoe", the contract will be able to create digital assets. Any contract that mints digital assets will need access to this.
* **economicCommitteeCreatorFacet**, **econCharterKit**, **provisionPoolStartResult**: These 3 permissions are required by governed contracts.
* **chainTimerService**: When this permission is set to "timer", it grants access to the *chainTimerService*. All governed contracts need access to this so they know when a vote is complete.

## Produce Section

Specifies what, if anything, the contract produces. For example, the example PSM contract produces *testFirstAnchorKit* which is used for testing purposes.

## Installation Section 

Specifies what installations the contract requires. At a minimum, the contract itself should be listed as an installation. Governed contracts should include a *contractGovernor* installation.

## Instance Section

Specifies what instances, if any, the contract produces or consumes.

## Issuer Section

Specifies what tokens, if any, the contract issuer can produce or consume.

## Brand Section

Specifies what brands, if any, the contract can produce or consume. Note that any brands that the contract may mint are not included in this section, unless they're also produced or consumed in some other capacity.