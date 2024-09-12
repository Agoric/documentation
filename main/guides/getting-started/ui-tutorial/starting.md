# Starting Out

There are a few libraries that make building Agoric UIs more convenient, all included in the [ui-kit](https://github.com/Agoric/ui-kit/tree/main) repo:

- [@agoric/rpc](https://github.com/Agoric/ui-kit/tree/main/packages/rpc): Used for querying blockchain and smart contract state, and subscribing to updates.
- [@agoric/web-components](https://github.com/Agoric/ui-kit/tree/main/packages/web-components): Used for accessing the smart wallet and making offers, as well as utilities for displaying asset balances and more.
- [@agoric/react-components](https://github.com/Agoric/ui-kit/tree/main/packages/react-components): React components for doing all of the above and more, with convenient hooks and context for ease of use.

This tutorial will make use of these libraries and provide pointers along the way for learning more about them.

## Scaffolding

This tutorial will make use of [@agoric/react-components](https://github.com/Agoric/ui-kit/tree/main/packages/react-components) for greatest convenience, and hence the first step will be to scaffold a new React app with [Vite](https://vitejs.dev/). Create a new workspace and use the following command to scaffold a new `react-ts` app:

```
yarn create vite my-agoric-ui --template react-ts
```

Follow the instructions outputted by the command and you should have a local dev server running with a bare-bones React app.

## Hardening

The next step is to install [Endo](https://github.com/endojs/endo), because the Agoric libraries depend on Hardened JavaScript. To get it set up, we'll add a few dependencies:

```
yarn add -D ses @endo/eventual-send
```

Also, we'll need to add `buffer` to use [cosmos-kit](https://github.com/cosmology-tech/cosmos-kit) later on, so let's do that now:

```
yarn add -D buffer
```

Now, create a new file `src/installSesLockdown.ts`:

```typescript
import 'ses' // adds lockdown, harden, and Compartment
import '@endo/eventual-send/shim.js' // adds support needed by E
import { Buffer } from 'buffer'

const consoleTaming = import.meta.env.DEV ? 'unsafe' : 'safe'

lockdown({
  errorTaming: 'unsafe',
  overrideTaming: 'severe',
  consoleTaming
})

Error.stackTraceLimit = Infinity

globalThis.Buffer = Buffer

// @ts-expect-error Add process to context for cosmos-kit
globalThis.process = { env: import.meta.env }
```

And at the top of `src/main.tsx` import the new file:

```typescript
import './installSesLockdown.ts'
```

Restart your app and it should load as before without errors. Now, the app is running with Hardened JS enabled and we're ready to continue.
