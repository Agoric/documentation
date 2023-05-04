# Coding Permissions

Write a json file with the permissions that the proposal will need. For example, [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/inter-protocol/test/psm/gov-add-psm.js) is the proposal we created for the PSM contract:

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