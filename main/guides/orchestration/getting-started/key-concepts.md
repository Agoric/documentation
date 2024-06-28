# Orchestration Key Concepts

Here, we overview the fundamental concepts involved with building orchestration smart contracts.


### Interchain Account (ICA)

[Interchain Accounts](https://tutorials.cosmos.network/academy/3-ibc/8-ica.html) (ICAs) are an IBC feature used in Agoric’s orchestration API. They enable an Agoric smart contract to control an account on another blockchain within the Cosmos ecosystem, facilitated by Agoric [Orchestration](#orchestration) API. This feature leverages the [Inter-Blockchain Communication (IBC)](#ibc) protocol to facilitate interactions and transactions across different blockchains seamlessly.


<br/>
<img src="../assets/icaoverview.png" width="100%" />
<br/>

A key advantage of ICAs is that they make accounts on other chains look like any other (remotable) object, meaning normal object access rules (introduction/parenthood/endowment/initial conditions) apply. When a contract creates an ICA, it has sole access to and control over the account but can delegate certain forms of access to its clients.



### Example ICA Usage from a Smart Contract

```javascript
const chainId = 'cosmoshub-4';
const hostConnectionId = 'connection-0';
const controllerConnectionId =  'connection-1';
const bondDenom =  'uatom';
const icqEnabled =  true;
const { orchestration, marshaller, storageNode, timer } = privateArgs;
const zone = makeDurableZone(baggage);

const { accountsStorageNode } = await provideAll(baggage, {
  accountsStorageNode: () => E(storageNode).makeChildNode('accounts'),
});

const { makeRecorderKit } = prepareRecorderKitMakers(baggage, marshaller);
const vowTools = prepareVowTools(zone.subZone('vows'));
const makeCosmosOrchestrationAccount = prepareCosmosOrchestrationAccount(
  zone,
  makeRecorderKit,
  vowTools,
  zcf,
);

async function makeAccountKit() {
  const account = await E(orchestration).makeAccount(
    chainId,
    hostConnectionId,
    controllerConnectionId,
  );

  const icqConnection = icqEnabled
    ? await E(orchestration).provideICQConnection(controllerConnectionId)
    : undefined;

  const accountAddress = await E(account).getAddress();
  trace('account address', accountAddress);

  const accountNode = await E(accountsStorageNode).makeChildNode(
    accountAddress.address,
  );

  const holder = makeCosmosOrchestrationAccount(accountAddress, bondDenom, {
    account,
    storageNode: accountNode,
    icqConnection,
    timer,
  });
  return holder;
}
```


### Baggage

baggage is a MapStore that provides a way to preserve the state and behavior of objects between [smart contract upgrades](https://docs.agoric.com/guides/zoe/contract-upgrade) in a way that preserves the identity of objects as seen from other [vats](#vat). In the provided contract, baggage is used to ensure that the state of various components is maintained even after the contract is upgraded.

```javascript
export const start = async (zcf, privateArgs, baggage) => {
  ...
  const { accountsStorageNode } = await provideAll(baggage, {
    accountsStorageNode: () => E(storageNode).makeChildNode('accounts'),
  });
  ...
}
```


### Exo
An Exo object is an exposed Remotable object with methods (aka a [Far](/glossary/#zone) object), which is normally defined with an [InterfaceGuard](#todo-interface-guard) as a protective outer layer, providing the first layer of defensiveness.

This [@endo/exo](https://github.com/endojs/endo/tree/master/packages/exo) package defines the APIs for making Exo objects, and for defining ExoClasses and ExoClassKits for making Exo objects.

```javascript
const publicFacet = zone.exo(
  'StakeAtom',
  M.interface('StakeAtomI', {
    makeAccount: M.callWhen().returns(M.remotable('ChainAccount')),
    makeAccountInvitationMaker: M.callWhen().returns(InvitationShape),
  }),
  {
    async makeAccount() {
      trace('makeAccount');
      const holder = await makeAccountKit();
      return holder;
    },
    makeAccountInvitationMaker() {
      trace('makeCreateAccountInvitation');
      return zcf.makeInvitation(
        async seat => {
          seat.exit();
          const holder = await makeAccountKit();
          return holder.asContinuingOffer();
        },
        'wantStakingAccount',
      );
    },
  },
);
```



### Zones
Each [Zone](/glossary/#zone) provides an API that allows the allocation of [Exo objects](#exo) and Stores [(object collections)](https://github.com/Agoric/agoric-sdk/tree/master/packages/store/README.md) which use the same underlying persistence mechanism. This allows library code to be agnostic to whether its objects are backed purely by the JS heap (ephemeral), pageable out to disk (virtual), or can be revived after a vat upgrade (durable).


See [SwingSet vat upgrade documentation](https://github.com/Agoric/agoric-sdk/tree/master/packages/SwingSet/docs/vat-upgrade.md) for more example use of the zone API.

```javascript
const zone = makeDurableZone(baggage);
...
zone.subZone('vows')
```


### ChainHub

The `makeChainHub` utility manages the connections and metadata for various blockchain networks. It simplifies accessing and interacting with multiple chains, providing a unified interface for the orchestration logic to manage cross-chain operations effectively.

```javascript
const chainHub = makeChainHub(remotePowers.agoricNames);
```

# Recorder Kit Makers

These are used to record state changes and events within the contract. `prepareRecorderKitMakers` is a utility that prepares the tools necessary to create these kits, ensuring that the contract can maintain a detailed log of its operations for auditing and debugging purposes.

```javascript
const { makeRecorderKit } = prepareRecorderKitMakers(baggage, marshaller);
const recorderKit = makeRecorderKit(
    privateArgs.storageNode,
    /** @type {import('@agoric/zoe/src/contractSupport/recorder.js').TypedMatcher<MetricsNotification>} */ (
      M.any()
    ),
)
await recorderKit.recorder.write(proposalsArray);
```

### Vow Tools

These tools handle promises and asynchronous operations within the contract. `prepareVowTools` prepares the necessary utilities to manage these asynchronous tasks, ensuring that the contract can handle complex workflows that involve waiting for events or responses from other chains.

```javascript
const vowTools = prepareVowTools(zone.subZone('vows'));
...
const makeLocalOrchestrationAccountKit = prepareLocalChainAccountKit(
  zone,
  makeRecorderKit,
  zcf,
  privateArgs.timerService,
  vowTools,
  makeChainHub(privateArgs.agoricNames),
);
...
const makeCosmosOrchestrationAccount = prepareCosmosOrchestrationAccount(
  zone,
  makeRecorderKit,
  vowTools,
  zcf,
);
```


### Durable Zone

A zone specifically designed for durability, allowing the contract to persist its state across upgrades. This is critical for maintaining the continuity and reliability of the contract’s operations.
```javascript
const zone = makeDurableZone(baggage);
```

### Account Kits

These are comprehensive kits that bundle the account information and related tools for managing interchain accounts. Functions like `prepareLocalChainAccountKit` and `prepareCosmosOrchestrationAccount` create these kits, providing all necessary functionalities to manage accounts on both local and remote chains.

```javascript
const { holder } = await makeLocalAccountKit();
...
const holder = await makeAccountKit();
```

## Example API Usage

```javascript
const amount = coins(100, 'utia');
const celestiaChain = await orchestrator.getChain('celestia');
const icaCelestia = await celestiaChain.createAccount();
await icaOsmosis.transfer(icaCelestia.getAddress(), amount);
await E(timerService).delay(600n);
return icaCelestia.delegate(celestiaValidator, amount);
```
