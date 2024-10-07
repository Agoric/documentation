# Orca Contract Code Walkthrough

This section provides a walkthrough of the Orca contract code, explaining its structure, key components, and functionality. The Orca contract is designed to manage orchestration accounts and fund them. It interacts with multiple chains and provides functionality for creating accounts and funding them. The code for the contract logic is in two files:

1. `orca.contract.js`
2. `orca.flows.js`

## Walkthrough: `orca.contract.js`

The `orca.contract.js` files brings in necessary dependencies and types from various Agoric packages. The flows import contains specific logic for the Orca contract operations.

```js
import { AmountShape } from '@agoric/ertp';
import { makeTracer } from '@agoric/internal';
import { withOrchestration } from '@agoric/orchestration/src/utils/start-helper.js';
import { ChainInfoShape } from '@agoric/orchestration/src/typeGuards.js';
import { InvitationShape } from '@agoric/zoe/src/typeGuards.js';
import { M } from '@endo/patterns';
import * as flows from './orca.flows.js';
```

### Type Definitions and Shapes

These definitions create shapes for validating the structure of amounts and orchestration powers.

```js
const SingleAmountRecord = M.and(
  M.recordOf(M.string(), AmountShape, { numPropertiesLimit: 1 }),
  M.not(harden({}))
);

const OrchestrationPowersShape = M.splitRecord({
  localchain: M.remotable('localchain'),
  orchestrationService: M.remotable('orchestrationService'),
  storageNode: M.remotable('storageNode'),
  timerService: M.remotable('timerService'),
  agoricNames: M.remotable('agoricNames')
});
```

### Main Contract Function

This is the main contract function that sets up the contract's functionality.

```js
const contract = async (
  zcf,
  privateArgs,
  zone,
  { orchestrateAll, zoeTools, chainHub }
) => {
  // ... (contract logic)
};
```

Within the `contract` function, following actions are performed.

- **Chain Registration**: Below section registers chains and their connections with the `chainHub`.

```js
const { chainDetails } = zcf.getTerms();
for (const [name, info] of entries(chainDetails)) {
  const { connections = {} } = info;
  trace('register', name, {
    chainId: info.chainId,
    connections: keys(connections)
  });
  chainHub.registerChain(name, info);
  for (const [chainId, connInfo] of entries(connections)) {
    chainHub.registerConnection(info.chainId, chainId, connInfo);
  }
}
```

- **Creating Account and Funding Functions**: These functions are created using the `orchestrateAll` helper, which sets up the necessary flow logic for account creation and funding.

```js
const { makeAccount, makeCreateAndFund } = orchestrateAll(flows, {
  localTransfer: zoeTools.localTransfer
});
```

- **Public Facet**: The public facet provides two methods: `makeAccountInvitation` creates an invitation to make an orchestration account, and `makeCreateAndFundInvitation` creates an invitation to make an account and fund it.

```js
const publicFacet = zone.exo(
  'Orca Public Facet',
  M.interface('Orca PF', {
    makeAccountInvitation: M.callWhen().returns(InvitationShape),
    makeCreateAndFundInvitation: M.callWhen().returns(InvitationShape)
  }),
  {
    makeAccountInvitation() {
      return zcf.makeInvitation(makeAccount, 'Make an Orchestration Account');
    },
    makeCreateAndFundInvitation() {
      return zcf.makeInvitation(
        makeCreateAndFund,
        'Make an Orchestration Account and Fund it',
        undefined,
        M.splitRecord({ give: SingleAmountRecord })
      );
    }
  }
);
```

### `start` Function

The start function is wrapped with `withOrchestration`, which provides additional orchestration setup and tools for the contract.

```js
export const start = withOrchestration(contract);
harden(start);
```

## Walkthrough `orca.flows.js`

This section provides a walkthrough of the `orca.flows.js` file, which contains flow functions for the Orca contract. The `orca.flows.js` file defines two main functions:

1. `makeAccount`: Creates an account on a Cosmos chain.
2. `makeCreateAndFund`: Creates an account on a Cosmos chain and funds it.

These functions are called by the Zoe vat when a user makes an offer using a corresponding orca contract inivitation.

### `makeAccount` Function

This function creates an account on a specified Cosmos chain. This function not only creates the account but also returns a continuing offer that allows the user to perform further actions like delegation, rewards withdrawl, and transfers. Here are the parameters of this function:

- `orch`: An Orchestrator instance parameter represents an instance of the `Orchestrator`, a powerful abstraction that manages interactions with the blockchain. It provides methods to interact with different chains, create accounts, and fetch chain information.
- `_ctx`: Unused context object
- `seat`: A `ZCFSeat` instance. It holds a proposal object corresponding to the current offer.
- `offerArgs`: An object containing `chainName` (that identifies the chain the orchestration account should be created on) and `denom`.

The function validates the `offerArgs` to ensure it contains a `chainName`, retrieves the specified chain using `orch`, creates an account on the chain using `chain.makeAccount()`, and returns the account as a continuing offer. Below is the code of `makeAccount` after removing some debug information logging code.

```js
mustMatch(offerArgs, M.splitRecord({ chainName: M.string() }));
const { chainName } = offerArgs;
seat.exit();
const chain = await orch.getChain(chainName);
const chainAccount = await chain.makeAccount();
return chainAccount.asContinuingOffer();
```

Once the account is created, the function returns a continuing offer by calling `chainAccount.asContinuingOffer()`. This allows the user to perform further actions on the account, such as delegating tokens or withdrawing rewards, through subsequent offers.

### `makeCreateAndFund` Function

This function creates an account on a specified Cosmos chain and funds it. It accepts the same set of parameters as `make Account`. The function:

- Extracts the amount to be transferred from the seat's proposal, and retrieves both the Agoric chain and the specified target chain.
- Fetches chain info and asset information.
- Creates accounts on both the Agoric chain (local) and the target chain (remote).
- Transfers funds from the seat to the local account.
- Transfers half of the received funds from the local account to the remote account.
- Checks the balance of the remote account, and returns the remote account as a continuing offer.

Below is the code of `makeCreateAndFund` after removing some debug information logging code.

```js
  const { give } = seat.getProposal();
  const [[_kw, amt]] = Object.entries(give);
  const [agoric, chain] = await Promise.all([
    orch.getChain('agoric'),
    orch.getChain(chainName),
  ]);
  const localAccount = await agoric.makeAccount();
  const remoteAccount = await chain.makeAccount();
  const remoteAddress = await remoteAccount.getAddress();
  await localTransfer(seat, localAccount, give);
  await localAccount.transfer(
    {
      denom: 'ubld',
      value: amt.value / 2n,
    },
    remoteAddress,
  );
  seat.exit();
  return remoteAccount.asContinuingOffer();
```

As in the previous case, the function returns a continuing offer by calling `remoteAccount.asContinuingOffer()` for further actions on the account.

Apart from above mentioned logic, several trace calls are made to log the current state of the function. This is useful for debugging and ensuring that the function's inputs and intermediate states are correct.
