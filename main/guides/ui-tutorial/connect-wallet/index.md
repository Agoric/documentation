## Connect Wallet

At this point you should have an app rendering with a single "Connect Wallet" button. Try
clicking on it and you should see a modal pop up with many wallets to choose from. Click "Keplr", approve the connection, and you should see the button shows your truncated address.

### Accessing the Wallet Data

Now that we've connected to our wallet extension, there's some common tasks an app would want to do:

- Access the user's purse balances to see their tokens.
- Sign transactions in Keplr to make offers and interact with a smart contract.

The `AgoricProvider` makes both of these tasks straightforward. We'll focus on the first
point in this section, and later on we'll see how to make an offer.

### Create a Purses Component

Since the "Offer Up" contract uses IST as a fee token to purchase NFTs, we can start by
showing the user's IST balance.

Create a new file, `src/Purses.tsx`, where you'll write a component for rendering purse balances.

```tsx
import { useAgoric } from '@agoric/react-components';

const Purses = () => {
  const { walletConnection } = useAgoric();

  return (
    <div className="card">
      <h3>Purses</h3>
      {walletConnection ? (
        <div style={{ textAlign: 'left' }}>
          <div>
            <b>IST: </b>
            TODO - Render IST Balance
          </div>
        </div>
      ) : (
        'No wallet connected.'
      )}
    </div>
  );
};

export default Purses;
```

Then, in `App.tsx` render the component inside the `AgoricProvider`, below the
`<ConnectWalletButton />`:

```tsx
import Purses from './Purses';
...
    <ConnectWalletButton />
    <Purses />
...
```

Once the app rebuilds, you should see a "Purses" section. You'll notice that it uses the `walletConnection`
object from the `useAgoric` hook. This is provided by the `AgoricProvider`, and right now the component
just uses it to see if there is a wallet connection. If it still shows "No wallet connected." after connecting
to Keplr, make sure that your local chain is running and check your console for any RPC errors.

### Rendering the IST Balance

We'll access the purse data from the `useAgoric` hook. First, we'll create a new hook for convenience,
since we'll need to render another purse for the NFTs later on. Create a new file, `src/hooks.ts`

```ts
import { useAgoric } from '@agoric/react-components';

export const usePurse = (brandPetname: string) => {
  const { purses } = useAgoric();

  return purses?.find(p => p.brandPetname === brandPetname);
};
```

This provides a utility for looking up a user's purse by name.

Next, we'll add a dependency on `@agoric/web-components`, which provides a utility for rendering
amounts and handling various denoms:

```
yarn add -D @agoric/web-components@0.15.1-dev-1329752.0
```

Then, in `Purses.tsx`, we can put it all together to render the IST balance:

```tsx
import { useAgoric } from '@agoric/react-components';
import { usePurse } from './hooks';
import { stringifyAmountValue } from '@agoric/web-components';

const Purses = () => {
  const { walletConnection } = useAgoric();
  const istPurse = usePurse('IST');

  return (
    <div className="card">
      <h3>Purses</h3>
      {walletConnection ? (
        <div style={{ textAlign: 'left' }}>
          <div>
            <b>IST: </b>
            {istPurse ? (
              stringifyAmountValue(
                istPurse.currentAmount,
                istPurse.displayInfo.assetKind,
                istPurse.displayInfo.decimalPlaces
              )
            ) : (
              <i>Fetching balance...</i>
            )}
          </div>
        </div>
      ) : (
        'No wallet connected.'
      )}
    </div>
  );
};
```

When the app rebuilds, you should see the real IST balance appear below "Purses". Now you're able
to connect to a user's wallet and render their purse balances, but what can you do from there?
In the next section, you'll learn how to read smart contract data from the UI so the user can
interact with it.

As usual, if you have any difficulties along the way, you can check out the `checkpoint-3`
branch in the example repo.

### Next

[Querying Contract Data](../querying-contract-data/index.md)
