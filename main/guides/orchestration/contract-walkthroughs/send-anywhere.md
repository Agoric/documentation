# "Send Anywhere" Contract Walkthrough

The "Send Anywhere" contract is designed to facilitate the transfer of assets from one chain to another using
Agoric's [Orchestration](/glossary/#orchestration) library. The contract allows a user to send assets of a specific
brand to a destination address on any supported blockchain, using IBC for Cosmos chains and Circle's CCTP (via a
Noble account) for USDC destined for a non-Cosmos chain such as an EVM chain.

The high-level flow of the contract is:

- Look up the `denom` for the offered brand on the local (Agoric) chain, and look up the destination chain's
  `ChainInfo` in `chainHub`.
- Transfer the asset from the source seat to a local account held by the contract, to hold it temporarily.
- If the destination chain is a Cosmos chain, IBC-transfer directly to the destination address.
- Otherwise, if the asset is USDC and the destination chain has a CCTP destination domain, route the funds through a
  shared Noble account and burn them there with `depositForBurn`, to be minted on the destination chain.
- On any failure, withdraw the assets back from the local account to the seat and fail the seat with the error.

The contract is implemented in two separate files:

1. `send-anywhere.contract.js` implements the `start` function of the contract to initialize the contract and
   expose `publicFacet`.
2. `send-anywhere.flows.js` implements the `sendIt` (and `makeNobleAccount`) orchestration flows that perform the
   actual transfer of assets when a user makes an offer.

Let us walk through these files one by one.

## 1. `send-anywhere.contract.js`

The contract begins by importing various modules and utilities necessary for its functionality. These include:

- **ChainHub administration**: `prepareChainHubAdmin` prepares a creator-facet API for registering additional chain
  configuration after the contract has started.
- **Type validation**: `AnyNatAmountShape` and `InvitationShape` ensure that the contract works with correct data
  types, such as amounts and invitations.
- **Orchestration utilities**: `withOrchestration` wraps the contract's `start` function to provide `chainHub`,
  `orchestrate`, `vowTools`, and `zoeTools`; `registerChainsAndAssets` populates `chainHub` from the chain and asset
  info the contract was started with.
- **Flows**: `sendIt` and `makeNobleAccount` are imported from `send-anywhere.flows.js`; `makeLocalAccount` is
  imported from the shared `shared.flows.js` used across orchestration examples.

### Single Amount Record Validation

In order to ensure that only a single asset (or `brand`) is transferred per transaction, a `SingleNatAmountRecord` is defined:

```js
export const SingleNatAmountRecord = M.and(
  M.recordOf(M.string(), AnyNatAmountShape, {
    numPropertiesLimit: 1,
  }),
  M.not(harden({})),
);
harden(SingleNatAmountRecord);
```

This validation ensures that the proposal shape submitted by users contains exactly one asset and no other extraneous properties.

### Registering ChainHub and preparing accounts

The contract's `privateArgs` may carry `chainInfo`/`assetInfo` for chains and assets that are not already
well-known; `registerChainsAndAssets` loads those into `chainHub` before any flow runs:

```js
const creatorFacet = prepareChainHubAdmin(zone, chainHub);

registerChainsAndAssets(
  chainHub,
  zcf.getTerms().brands,
  privateArgs.chainInfo,
  privateArgs.assetInfo,
);
```

The contract then prepares two durable, shared accounts: a local (Agoric) account that temporarily holds funds
in transit, and a Noble account used for CCTP transfers. Both are created via `orchestrate(...)` and cached with
`zone.makeOnce`, so they survive contract upgrades and are only created once:

```js
const makeLocalAccount = orchestrate(
  'makeLocalAccount',
  {},
  sharedFlows.makeLocalAccount,
);
const makeNobleAccount = orchestrate(
  'makeNobleAccountFlow',
  {},
  makeNobleAccountFlow,
);

const sharedLocalAccountP = zone.makeOnce('localAccount', () =>
  makeLocalAccount(),
);
const nobleAccountP = zone.makeOnce('nobleAccount', () => makeNobleAccount());
```

Since `makeOnce` returns a promise (well, a durable vow, treated as a promise inside a flow), uses of
`sharedLocalAccountP`/`nobleAccountP` inside a flow must `await` them before use.

### Orchestration functions

The `sendIt` flow, imported from `send-anywhere.flows.js`, defines the main behavior for handling asset transfers.
The contract wraps it with the context it needs: logging, the shared accounts, `chainHub`, the `USDC` brand (to
recognize CCTP-eligible transfers), and `zoeTools`:

```js
const sendAnywhere = orchestrate(
  'sendAnywhere',
  {
    log,
    chainHub,
    sharedLocalAccountP,
    nobleAccountP,
    USDC: brands.USDC,
    zoeTools,
  },
  sendIt,
);
```

### Public Facet and Invitation Creation

The contract provides a public-facing API (`publicFacet`) that allows external users to interact with it:

```js
const publicFacet = zone.exo(
  'Send PF',
  M.interface('Send PF', {
    makeSendInvitation: M.callWhen().returns(InvitationShape),
  }),
  {
    makeSendInvitation() {
      return zcf.makeInvitation(
        sendAnywhere,
        'send',
        undefined,
        M.splitRecord({ give: SingleNatAmountRecord }),
      );
    },
  },
);
```

The `makeSendInvitation` method creates an invitation for users, allowing them to initiate a transfer by submitting a proposal. The
proposal must match the structure defined by `SingleNatAmountRecord`, ensuring that only one asset is transferred per transaction.
The invitation is connected to the `sendAnywhere` behavior (a prepared instance of the `sendIt` flow, explained
below), which performs the asset transfer. Finally, the contract is exported wrapped in `withOrchestration`:

```js
export const start = withOrchestration(contract, { publishAccountInfo: true });
```

## 2. `send-anywhere.flows.js`

This flows file defines `sendIt`, the orchestration flow that handles offers made to the contract, plus a small
helper `makeNobleAccount` used to create the shared Noble account above. The parameters passed to `sendIt` include:

- `orch`: the orchestrator object for managing chain/account interactions.
- `ctx`: the contract context supplied via `orchestrate(...)`, including:
  - `chainHub`: to look up chain info for the destination chain.
  - `sharedLocalAccountP` / `nobleAccountP`: the shared local and Noble accounts.
  - `log`: access to logging.
  - `USDC`: the brand used to recognize CCTP-eligible transfers.
  - `zoeTools`: helper functions for transferring assets, containing
    - `localTransfer`: support for moving assets from the seat to a local account.
    - `withdrawToSeat`: support for moving assets from a local account back to a seat.
- `seat`: the Zoe seat representing the assets to be transferred.
- `offerArgs`: `{ chainName, destAddr }`, the destination chain name and address.

### Offer Validation and Setup

Upon receiving an offer, `sendIt`:

- Validates the offer arguments using [endo's pattern-matching library](https://github.com/endojs/endo/tree/master/packages/patterns) to ensure the correct structure is submitted.
- Retrieves the `proposal` from the seat, extracting (from `give`) the asset (`brand` and `amount`) being transferred.
- Resolves the `denom` for the offered brand by querying the Agoric chain's asset registry (`vbank`) via a
  `denomForBrand` helper.
- Looks up the destination chain's `ChainInfo` from `chainHub`.

```js
mustMatch(offerArgs, harden({ chainName: M.scalar(), destAddr: M.string() }));
const { chainName, destAddr } = offerArgs;

const { give } = seat.getProposal();
const [[_kw, amt]] = entries(give);
void log(`sending {${amt.value}} from ${chainName} to ${destAddr}`);
const denom = await denomForBrand(orch, amt.brand);

/** @type {ChainInfo} */
const info = await chainHub.getChainInfo(chainName);

const sharedLocalAccount = await sharedLocalAccountP;
```

`denomForBrand` mirrors the `vbank` lookup used elsewhere in the SDK:

```js
const denomForBrand = async (orch, brand) => {
  const agoric = await orch.getChain('agoric');
  const assets = await agoric.getVBankAssetInfo();
  const { denom } = NonNullish(
    assets.find(a => a.brand === brand),
    `${brand} not registered in ChainHub`,
  );
  return denom;
};
```

### Error recovery

Both transfer paths below share the same failure handling: withdraw the assets back to the seat, log the error, and
**fail** the seat (not merely exit it) so the offer result rejects with the error:

```js
const recoverFailedTransfer = async e => {
  await withdrawToSeat(sharedLocalAccount, seat, give);
  const errorMsg = `IBC Transfer failed ${q(e)}`;
  void log(`ERROR: ${errorMsg}`);
  seat.fail(errorMsg);
  throw makeError(errorMsg);
};
```

### Cosmos destinations: direct IBC transfer

When the destination chain's `info.namespace === 'cosmos'`, the flow confirms a connection exists from Agoric to
the destination, moves the assets into the shared local account, then transfers directly to the destination
address:

```js
if (info.namespace === 'cosmos') {
  const { chainId } = info;
  assert(typeof chainId === 'string', 'bad chainId');

  const [_a, _o, connection] = await chainHub.getChainsAndConnection(
    'agoric',
    chainName,
  );
  connection.counterparty || Fail`No IBC connection to ${chainName}`;

  await localTransfer(seat, sharedLocalAccount, give);

  try {
    await sharedLocalAccount.transfer(
      { value: destAddr, encoding: 'bech32', chainId },
      { denom, value: amt.value },
    );
  } catch (e) {
    return recoverFailedTransfer(e);
  }
}
```

Note that `transfer` takes the destination first: `transfer(destination, amount)`.

### Non-Cosmos USDC destinations: CCTP via Noble

When the asset is `USDC` and the destination chain's info carries a `cctpDestinationDomain` (a non-Cosmos chain
reachable via Circle's CCTP, such as an EVM chain), the flow instead moves the funds onto the shared Noble account
and burns them there with `depositForBurn`, targeting the destination chain and address by CAIP-10 account ID:

```js
} else if (amt.brand === USDC && 'cctpDestinationDomain' in info) {
  const nobleAccount = await nobleAccountP;
  const nobleAddr = nobleAccount.getAddress();
  const denomAmt = { denom, value: amt.value };
  try {
    await sharedLocalAccount.transfer(nobleAddr, denomAmt);
  } catch (e) {
    return recoverFailedTransfer(e);
  }

  const destAccountId = `${info.namespace}:${info.reference}:${destAddr}`;
  try {
    await nobleAccount.depositForBurn(destAccountId, denomAmt);
  } catch (e) {
    try {
      // if Noble rejects the burn, move the funds back to the local account
      const lcaAddress = await sharedLocalAccount.getAddress();
      await nobleAccount.transfer(lcaAddress, denomAmt);
    } catch (err) {
      // the funds are stranded on Noble; this requires a contract upgrade to recover
      const errorMsg = `IBC Transfer from Noble back to LocalAccount failed: ${q(err)}`;
      seat.fail(errorMsg);
      throw makeError(errorMsg);
    }
    return recoverFailedTransfer(e);
  }
} else {
  Fail`There is currently support only for IBC and USDC transfers`;
}
```

If `depositForBurn` itself fails, the flow tries to pull the funds back from Noble to the shared local account so
`recoverFailedTransfer` can return them to the seat; if even that fails, the funds are stranded on the Noble
account and the contract logs that a contract upgrade is required to recover them.

Once either path completes successfully, the flow exits the seat:

```js
seat.exit();
void log(`transfer complete, seat exited`);
```

## Conclusion

The "Send Anywhere" contract is a robust and flexible solution for transferring assets between blockchains,
supporting both IBC-native Cosmos destinations and non-Cosmos destinations reachable over CCTP. It ensures that:

- Assets are securely held in a local account before being transferred.
- Detailed logs are kept for transparency and error tracing.
- The contract is resilient to failure, with rollback (and, for the Noble leg, best-effort recovery) mechanisms.
- By using Agoric's Orchestration tools, this contract provides a secure way to facilitate cross-chain asset transfers.
