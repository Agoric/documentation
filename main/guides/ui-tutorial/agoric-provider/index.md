## Setting Up the Agoric Provider

The `AgoricProvider` provides a few things in the context of your app, accessible through hooks and components:

- A wallet connection with cosmos-kit
- Access to the user's purse balances, offers, and other smart wallet state
- Callbacks for making offers and signing transactions
- Access to a `chainStorageWatcher` for reading contract state

This makes it easy to handle all the platform-specific implementation and focus on the business logic and user experience when building your UIs.

### Dependencies

Install the following dependencies:

```
yarn add -D @agoric/react-components cosmos-kit@2.8.5 @interchain-ui/react@1.22.11
```

The `cosmos-kit` dependency is used to provide different wallets in the wallet connection modal.
The `@interchain-ui/react` dependency will be used to provide themes and styles for some of the underlying
components that `@agoric/react-components` uses. The Agoric components can be customized using the same
`ThemeProvider`.

### Adding the Provider

Put the provider in the root of your application by editing `App.tsx`. We can also remove some of default demo UI at the same time.
The end result should look something like this:

```typescript
import { AgoricProvider, ConnectWalletButton } from '@agoric/react-components';
import { wallets } from 'cosmos-kit';
import { ThemeProvider, useTheme } from '@interchain-ui/react';
import './App.css';
import '@agoric/react-components/dist/style.css';

function App() {
  const { themeClass } = useTheme();
  return (
    <ThemeProvider>
      <div className={themeClass}>
        <AgoricProvider
          wallets={wallets.extension}
          defaultNetworkConfig={{
            testChain: {
              chainId: 'agoriclocal',
              chainName: 'agoric-local',
            },
            apis: {
              rest: ['http://localhost:1317'],
              rpc: ['http://localhost:26657'],
            },
          }}
        >
          <h1>Agoric UI Tutorial</h1>
          <ConnectWalletButton />
        </AgoricProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

Note: If you see a type error on the `wallets` prop, this is likely because `@agoric/react-components` is using
an older version of `cosmos-kit` than what was installed in your app. To fix this, you can add `resolutions` to
your `package.json` like so:

```json
  "resolutions": {
    "@cosmos-kit/core": "2.8.9"
  }
```

## Testing it Out

Try `yarn dev` after making these changes to make sure your app builds again. If you're having trouble, check
out (FIXME: ADD LINK) `checkpoint-2` in the example repo. As you may notice, we already added a "Connect Wallet"
button to the UI. In the next section, you'll learn how to access the user's account and purses.


(FIXME: ADD LINK) => Connect Wallet
