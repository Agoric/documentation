# Publishing to chainStorage

Contracts can use [notifiers and subscriptions](../js-programming/notifiers)
to publish to clients. To publish data visible to [vstorage queries](../getting-started/contract-rpc#querying-vstorage), contracts should connect
a subscriber to a `chainStorage` node.

## Deployment Capabilities for Publishing to chainStorage

In [Adding Parameter Governance to a Contract](../governance/#adding-parameter-governance-to-a-contract),
`storageNode` and `marshaller` are passed to the contract in its `privateArgs` so it can publish to chainStorage.

In [dapp-agoric-basics](https://github.com/Agoric/dapp-agoric-basics), the `startSwapContract` uses 2 [permitted deployment capabilities](../coreeval/permissions), `chainStorage` and `board` and uses them to make the `privateArgs`:

```js
const marshaller = await E(board).getPublishingMarshaller();
const storageNode = await E(chainStorage).makeChildNode(contractName);
```

A `Marshaller` is parameterized by functions for mapping unforgeable object identities to plain data slot references and back. Using the [board](../integration/name-services#the-board-publishing-under-arbitrary-names) name service gives consistent slot references across contracts.
As discussed in [Marshalling Amounts and Instances](../getting-started/contract-rpc#marshalling-amounts-and-instances), this lets
off-chain clients use the same `@endo/marshal` API.

The `chainStorage` node corresponds to the `published` key in the
[vstorage hierarchy](/reference/vstorage-ref).
Using `E(chainStorage).makeChildNode(contractName)` gives the contract
access to write to the `published.swaparoo` key and all keys under it.

The `swaparoo` contract delegates the rest of publishing governance parameters to the `@agoric/governance` package.

## Publishing structured data to chainStorage

Let's work through the details of writing a notification. A contract that
manages a durable resource often wants to publish a metrics notification
whenever that resource changes:

```js
/**
 * @typedef {object} MetricsNotification
 * @property {Amount<'nat'>} totalMinted total tokens minted to date
 */
```

A method that writes this data using a `RecorderKit` looks like:

```js
        writeMetrics() {
          const { state } = this;
          const metrics = harden({ totalMinted: state.totalMinted });
          void state.metricsRecorder.write(metrics);
        },
```

The `metricsRecorder` comes from a `RecorderKit` made with `makeRecorderKit`:

```js
        metricsRecorder: makeRecorderKit(metricsNode, M.any()).recorder,
```

`makeRecorderKit` itself is made by "preparing" (in the [exo](https://endojs.github.io/endo/modules/_endo_exo.html) sense)
[`prepareRecorderKitMakers`](/reference/zoe-api/zoe-helpers#preparerecorderkitmakers-baggage-marshaller)
against the contract's `baggage`:

```js
const { makeRecorderKit } = prepareRecorderKitMakers(
  baggage,
  privateArgs.marshaller,
);
```

The contract gets `baggage`, along with `privateArgs`, as the standard `start`
arguments described in [Durability](./contract-upgrade.md#durability):

```js
/**
 * @param {ZCF} zcf
 * @param {{
 *   marshaller: ERef<Marshaller>,
 *   storageNode: ERef<StorageNode>,
 * }} privateArgs
 * @param {Baggage} baggage
 */
export const start = async (zcf, privateArgs, baggage) => {
  // ...
};
```

The contract uses its `storageNode` and makes a child node to get `metricsNode`:

```js
const metricsNode = await E(privateArgs.storageNode).makeChildNode('metrics');
```

The `marshaller` is used to serialize data structures such as `MetricsNotification` above.

For a real, current contract that wires up `prepareRecorderKitMakers`,
`storageNode`, and `marshaller` this way (as part of a larger orchestration
setup), see
[`stake-bld.contract.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/examples/stake-bld.contract.js).
