# Agoric REPL

**Note**: This page describes the Agoric REPL. For information about the `Node.js` REPL, 
click [here](https://nodejs.org/api/repl.html).

## Introduction

When you run `agoric start --reset`, you start a local *ag-solo*. 

You use `agoric start` to start what we call an *ag-solo*, which is a 
single personal local Agoric node. You need an ag-solo running on your 
machine to interact with Agoric network services, whether a built-in 
simulated chain (also started by `agoric start`), or a fully-decentralized public Agoric 
blockchain. 

All deployment happens via the local running Agoric process. This is usually the 
ag-solo process, and frequently referred to as that or just as ag-solo. It is also 
sometimes described as/called an Agoric VM or a local server.

An ag-solo communicates with either a locally running or remote chain. This local process (the ag-solo)
has a home object, which contains references to services on-chain, including Zoe, the 
Board for sharing objects, and an application user's Wallet, among others. Developers can 
use these service references to call the service's associated API commands.

Contract code starts in a file on a user's computer, either written by them or 
imported from `agoric/zoe`. The code is *bundled*; turned into a particularly formatted
blob of code that exists in memory while a deploy script is running. When `E(zoe).install()` is
called, the blob is sent to and stored on-chain so that Zoe can access it. 

An ag-solo has an associated REPL (*Read-Eval-Print Loop*). From the REPL and the `home`
object, developers can use all the on-chain commands that deployment scripts use to 
deploy contracts and Dapps. In addition to the on-chain commands, they can also run
any other JavaScript commands from the REPL. 

## Accessing the REPL

Once an ag-solo is running and on-chain, you can access its associated REPL
in two ways. 
- In a browser tab, go to `localhost:8000`. Depending on the browser's width, you
  will see the Wallet UI and REPL either in separate columns or separate rows.

![Wallet and REPL](./assets/walletAndREPLColumns.png)

![Wallet and REPL](./assets/walletAndREPLRows.png)

- From a shell, run `agoric open --repl` This opens the user's Wallet UI and its
  associated REPL. To open only the REPL, run `agoric open --repl only`

![REPL](./assets/REPL.png)

## Using the REPL

You can run JavaScript commands from the REPL. You can also use the REPL's 
`home` object's predefined connections to other objects and services. To see what’s 
available, just type `home` into the REPL:

![home](./assets/home.png)

```js
Command[1] home
History[1] {"chainTimerService":[Presence o-50],"sharingService":[Presence o-51],"contractHost":[Presence o-52],"ibcport":[Presence o-53],"registrar":[Presence o-54],"registry":[Presence o-55],"zoe":[Presence o-56],"localTimerService":[Presence o-57],"uploads":[Presence o-58],"spawner":[Presence o-59],"wallet":[Presence o-60],"network":[Presence o-61],"http":[Presence o-62]}
```
The results of what is entered into the REPL is saved under `history[N]`

Here’s a better formatted list of the `home` objects with brief description of each. The
link on each object name takes you to a more detailed documentation page for that object.
Several `home` objects are either for internal Agoric use only or have been deprecated. These
are listed together at the end and external developers should ignore them and not try to use
them.

- [`wallet`](/guides/wallet/api.md): Holds on-chain digital assets and object capabilities on behalf of the user.
   The link takes you to the standard non-REPL specific `wallet` API documentation. When calling
   `wallet` API methods from the REPL, `wallet` must be prefaced by
   `home.` and use `E()`. For example, `E(home.wallet).getPurses()`   
- [`chainTimerService`](./timerServices.md): On-chain time authority used to schedule events.
- [`localTimerService`](./timerServices.md): Local off-chain time authority used to schedule events 
- [`board`](./board.md): Shared, on-chain location where users can post generally accessible values.
- [`sharingService`](./sharingService.md): Share on-chain objects with other users without making them
  available to the general public. In particular, you can share items between vats connected to the 
  same remote chain.
- [`ibcport`](./networking.md): IBC implementation that lets vats open and close listening ports, 
  connect and disconnect to/from remote ports, and send and receive data over those connections.
- [`zoe`](/zoe/api/zoe.md): Deploy and interact with smart contracts. Zoe protects smart contract users by escrowing
  digital assets and guaranteeing users get either what they want or get a refund of what they escrowed. Even if the
  contract is buggy or malicious. This link takes you to the standard, non-REPL specific, `zoe` API documentation. When calling
  any of the `zoe` API methods from the REPL, `zoe` must be prefaced by `home.` and use `E()`. For example, `E(home.zoe).getFoo()` 
- [`priceAuthority`](./priceAuthority.md): Get price quotes for pairs of digital assets.
- [`scratch`](./scratch.md): An off-chain, private, place to store key-value pairs on your ag-solo for later use.

Click on each object link above to go to its documentation.

The following `home` objects should be ignored.
- `contractHost`: Replaced by the `spawner` object.
- `faucet`: Internal for chain setup.
- `http`: `api/deploy.js` uses this to install new HTTP and WebSocket handlers in an
   ag-solo.  You should not need to use it. 
- `network`: Privileged object for internal use.
- `plugin`: Privileged object for internal use.
- `priceAuthorityAdmin`: Privileged object for internal use.
- `registrar`: Deprecated.
- `registry`: Deprecated.
- `spawner`: Privileged object for internal use.
- `uploads`: Deprecated name for `scratch`.
- `vattp`: Privileged object for internal use.

