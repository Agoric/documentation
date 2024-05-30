## Querying Vstorage

A fundamental part of building a Dapp UI is interacting with smart contracts. How can a UI
read data from a smart contract on the Agoric blockchain? This section will show you how,
using the available tools and libraries at your disposal.

### ChainStorageWatcher

Recall from the previous section the `useAgoric` hook. Another utility the hook provides is
the `chainStorageWatcher`. This utility is also available on its own through the [@agoric/rpc](https://www.npmjs.com/package/@agoric/rpc)
package, but we'll use one provided by `useAgoric` as it's already instantiated and configured
to use the RPC endpoints we added earlier.

Example:

```ts
const { chainStorageWatcher } = useAgoric();
```

### Querying Vstorage

In order to submit an offer to a contract, we need to look it up on-chain first.
We'll find it in vstorage under `published.agoricNames.instance` (see: [vstorage reference](../../../reference/vstorage-ref.md)).
First, we'll create a new component that will look up the contract (eventually, it will sign and submit offers to it as well).

Create a new file, `src/Trade.tsx`:

```tsx
const Trade = () => {
  return (
    <div className="trade">TODO - Create inputs for submitting an offer.</div>
  );
};

export default Trade;
```

And add some styling for it in `App.css` while we're at it:

```css
... .trade {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #171717;
  border-radius: 24px;
  margin-bottom: 16px;
  padding: 16px;
}
```

And add the component to `App.tsx`:

```tsx
...
  <h1>Agoric UI Tutorial</h1>
  <Trade />
  <ConnectWalletButton />
  <Purses />
...
```

After rebuilding the app, you should see the component rendering with the placeholder text we gave it. Next, let's
add the `chainStorageWatcher` and look up the contract on-chain. First add `@agoric/rpc` as a dependency:

```
yarn add -D @agoric/rpc@0.10.0
```

Next, let's go to our `src/hooks.ts` file and create another hook for reading the chain data:

```ts
import { AgoricChainStoragePathKind as Kind } from '@agoric/rpc';
import { useEffect, useState } from 'react';

...

export const useContract = () => {
  const [brands, setBrands] = useState<{ [k: string]: unknown } | null>(null);
  const [instance, setInstance] = useState<unknown | null>(null);
  const { chainStorageWatcher } = useAgoric();

  useEffect(() => {
    const stopWatchingInstance = chainStorageWatcher?.watchLatest<
      Array<[string, unknown]>
    >([Kind.Data, 'published.agoricNames.instance'], instances => {
      console.log('Got instances', instances);
      setInstance(instances.find(([name]) => name === 'offerUp')!.at(1));
    });

    const stopWatchingBrands = chainStorageWatcher?.watchLatest<
      Array<[string, unknown]>
    >([Kind.Data, 'published.agoricNames.brand'], brands => {
      console.log('Got brands', brands);
      setBrands(Object.fromEntries(brands));
    });

    return () => {
      stopWatchingInstance?.();
      stopWatchingBrands?.();
    };
  }, [chainStorageWatcher]);

  return { instance, brands };
};

```

As you can see, this hook makes use of `chainStorageWatcher` to watch two vstorage paths, and logs the results to the console:

- `published.agoricNames.instance` - The list of available contract instances on-chain, keyed by name.
- `published.agoricNames.brand` - The list of available brands on-chain, keyed by name.

The `chainStorageWatcher` handles all the vstorage queries and marshalling for you, so
you get convenient access to the data from your application. It automatically polls
and emits updates when the data on-chain changes. For more details about vstorage, see
[Querying VStorage](../../getting-started/contract-rpc.md#querying-vstorage) and [Publishing to Chain Storage](../../zoe/pub-to-storage.md)

Next, go ahead and add this hook to the `Trade` component you made before this:

```tsx
import { useContract } from './hooks';

const Trade = () => {
  // Don't do anything with brands or instances yet.
  useContract();

  return (
    <div className="trade">TODO - Create inputs for submitting an offer.</div>
  );
};

export default Trade;
```

You should now see the `brands` and `instances` being logged to the console. See if you
can spot the "offerUp" instance, and the "Item" brand. These were added when you deployed
the contract to the chain, and we'll use them to specify our offer in the next section.
