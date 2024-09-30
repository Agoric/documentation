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

Let's look at the Inter Protocol [assetReserve.js](https://github.com/Agoric/agoric-sdk/blob/agoric-upgrade-13/packages/inter-protocol/src/reserve/assetReserve.js) contract to get more of the details. It publishes to [published.reserve.metrics](https://github.com/Agoric/agoric-sdk/blob/agoric-upgrade-13/packages/inter-protocol/test/reserve/snapshots/test-reserve.js.md) data of the form

```js
/**
 * @typedef {object} MetricsNotification
 * @property {AmountKeywordRecord} allocations
 * @property {Amount<'nat'>} shortfallBalance shortfall from liquidation that
 *   has not yet been compensated.
 * @property {Amount<'nat'>} totalFeeMinted total Fee tokens minted to date
 * @property {Amount<'nat'>} totalFeeBurned total Fee tokens burned to date
 */
```

For example:

```js
    {
      allocations: {
        Fee: {
          brand: Object @Alleged: IST brand {},
          value: 64561373455n,
        },
        ATOM: {
          brand: Object @Alleged: ATOM brand {},
          value: 6587020n
        },
      },
      shortfallBalance: {
        brand: Object @Alleged: IST brand {},
        value: 5747205025n,
      },
      totalFeeBurned: {
        brand: Object @Alleged: IST brand {},
        value: n,
      },
      totalFeeMinted: {
        brand: Object @Alleged: IST brand {},
        value: 0n,
      },
    },
```

The method that writes this data is:

```js
        writeMetrics() {
          const { state } = this;
          const metrics = harden({
            allocations: state.collateralSeat.getCurrentAllocation(),
            shortfallBalance: state.shortfallBalance,
            totalFeeMinted: state.totalFeeMinted,
            totalFeeBurned: state.totalFeeBurned,
          });
          void state.metricsKit.recorder.write(metrics);
        },
```

The `metricsKit` is made with a `makeRecorderKit` function:

```js
        metricsKit: makeRecorderKit(
          metricsNode,
          /** @type {import('@agoric/zoe/src/contractSupport/recorder.js').TypedMatcher<MetricsNotification>} */ (
            M.any()
          ),
        ),
```

We "prepare" (in the [exo](https://endojs.github.io/endo/modules/_endo_exo.html) sense) that function for making
a `RecorderKit` using [prepareRecorderKitMakers](/reference/zoe-api/zoe-helpers#preparerecorderkitmakers-baggage-marshaller).

```js
const { makeRecorderKit } = prepareRecorderKitMakers(
  baggage,
  privateArgs.marshaller
);
```

The contract gets `baggage`, along with `privateArgs` when it starts in
[the usual way for upgradable contracts](./contract-upgrade.html#upgradable-declaration):

```js
/**
 * Asset Reserve holds onto assets for the Inter Protocol, and ...
 *
 * @param {{
 *   ...
 *   marshaller: ERef<Marshaller>,
 *   storageNode: ERef<StorageNode>,
 * }} privateArgs
 * @param {Baggage} baggage
 */
export const prepare = async (zcf, privateArgs, baggage) => {
  // ...
};
```

The reserve uses its `StorageNode` and makes a child to get `metricsNode`:

```js
const metricsNode = await E(storageNode).makeChildNode('metrics');
```

The `marshaller` is used to serialize data structures such as `MetricsNotification` above.

### Deployment Capabilities for the reserve

To start `assetReserve`, the [setupReserve](https://github.com/Agoric/agoric-sdk/blob/agoric-upgrade-13/packages/inter-protocol/src/proposals/econ-behaviors.js#L76) function again supplies
the two relevant `privateArgs`, `marshaller` and `storageNode`:

```js
const STORAGE_PATH = 'reserve';
const storageNode = await E(storageNode).makeChildNode(STORAGE_PATH);
const marshaller = await E(board).getReadonlyMarshaller();
```

The `setupReserve` function gets `chainStorage` and `board` deployment capabilities passed in:

```js
export const setupReserve = async ({
  consume: {
    board,
    chainStorage,
// ...
  },
// ...
}) => { ... };
```
