## Setting Up the Agoric Provider

The `AgoricProvider` provides a few things in the context of your app, accessible through hooks and components:

- Wallet connection support for numerous wallets (using cosmos-kit).
- Access to the user's purse balances, offers, and other smart wallet state.
- Callbacks for making offers and signing transactions.
- Access to a `chainStorageWatcher` for reading on-chain state from vstorage.

This makes it easy to handle all the platform-specific implementation details, so you can focus on the business logic and user experience when building your UIs.

### Dependencies

Install the following dependencies:

```
yarn add -D @agoric/react-components@0.2.0 cosmos-kit@2.8.5 @interchain-ui/react@1.22.11
```

The `cosmos-kit` dependency is used to provide different wallets in the wallet connection modal.
The `@interchain-ui/react` dependency will be used to provide themes and styles for some of the underlying
components that `@agoric/react-components` uses. There are also many components provided there that may be handy when building your own app.
The Agoric components can be customized using the same `ThemeProvider`.

Note: If you see `yarn build` failing with memory errors, it might be due to an increased bundle size. To get around this, try
adding this flag to `build` in `package.json`:

```json
  "build": "tsc && NODE_OPTIONS=--max-old-space-size=4096 vite build",
```

### Adding the Provider

Put the provider in the root of your application by editing `App.tsx`. We can also remove some of default scaffolding UI at the same time.
The end result should look something like this:

```tsx
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
          agoricNetworkConfigs={[
            {
              testChain: {
                chainId: 'agoriclocal',
                chainName: 'agoric-local',
              },
              apis: {
                rest: ['http://localhost:1317'],
                rpc: ['http://localhost:26657'],
              },
            },
          ]}
          defaultChainName="agoric-local"
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

You may have noticed the `defaultChainName` prop points to a local chain. This assumes
that you are still running the local chain from [Getting Started](../../getting-started/index.md) in Docker. If you're not, make sure to follow those steps before proceeding.

Note: If you see a type error on the `wallets` prop, this is likely because `@agoric/react-components` is using an older version of `cosmos-kit` than what was installed in your app. To fix this, you can add `resolutions` to your `package.json` like so:

```json
  "resolutions": {
    "@cosmos-kit/core": "2.8.9"
  }
```

## Testing it Out

Try `yarn dev` after making these changes to make sure your app builds again. If you're having trouble, check
out the `checkpoint-2` branch in the example repo. As you may notice, we just added a "Connect Wallet"
button to the UI. In the next section, we'll test it out, and learn how to access the user's account and purses.
