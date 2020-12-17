# Agoric REPL

**Note**: This page describes the Agoric REPL. For information about the `Node.js` REPL, 
click [here](https://nodejs.org/api/repl.html).

## Introduction

When you run `agoric start --reset`, you start a local *ag-solo*. 

All deployment happens via the local running Agoric process. This is usually the 
ag-solo process, and frequently referred to as that or just as ag-solo. It is also 
sometimes described as/called an Agoric VM or a local server.

An ag-solo communicates with either a locally running or remote chain. The local process 
has a `home` object, which contains references to services on-chain, including Zoe, the 
Board for sharing objects, and an application user's Wallet among others. Developers can 
use these service references to call the service's associated API commands.

Deploying a contract to the chain first uploads the bundled contract source code to the 
local Agoric ag-solo process. The deployment script then uses the `home` object to access 
Zoe which installs the code on chain.

The Wallet has an associated REPL (*Read-Eval-Print Loop*). From the REPL and the `home`
object, developers can use all the on-chain commands that deployment scripts use to 
deploy contracts and Dapps.

## Accessing the REPL

Once an Agoric process is running and on-chain, you can access its associated REPL
in two ways. 
- In a browser tab, go to `localhost:8000`. Depending on the browser's width, you
  will see either the Wallet and REPL in separate columns or separate rows.

![Wallet and REPL](/assets/walletAndREPLColumns.svg)

![Wallet and REPL](/assets/walletAndREPLRows.svg)

- From a shell, run `agoric open --repl` This opens the user's Wallet UI and its
  associated REPL. To open only the REPL, run `agoric open --repl only`

![REPL](/assets/REPL.svg)

## Using the REPL

From the REPL, you can run Agoric or JavaScript commands. Also, you can use the REPL's 
`home` object's predefined connections to other objects and services. To see what’s 
available, just type `home` into the REPL:

```js
Command[1] home
History[1] {"chainTimerService":[Presence o-50],"sharingService":[Presence o-51],"contractHost":[Presence o-52],"ibcport":[Presence o-53],"registrar":[Presence o-54],"registry":[Presence o-55],"zoe":[Presence o-56],"localTimerService":[Presence o-57],"uploads":[Presence o-58],"spawner":[Presence o-59],"wallet":[Presence o-60],"network":[Presence o-61],"http":[Presence o-62]}
```
The results of what is entered into the REPL is saved under `history[N]`

By entering `home` in your REPL you get back an effective "-help"
output of `home`-associated objects and services.

![Home](/assets/home.svg)

Here’s a better formatted list of the `home` objects with brief description of each. The
link on each object name takes you to a more detailed documentation page for that object.

- `wallet`
  - The link takes you to the standard `wallet` API documentation. When calling
any of the `wallet` API methods from the REPL, `wallet` must be prefaced by
`home.` and use `E()`. For example, `E(home.wallet).getPurses()` 
  
- `chainTimerService` 
  - Chain-based timing service used to schedule events.
- `localTimerService `
  - Local vat-based timing service used to schedule events 
- `sharingService` 
  - Lets you share items between vats connected to the same remote chain vat.
- `ibcport`
- `registry` 
  - For internal use only. 
- [`zoe`](https://agoric.com/documentation/zoe/api/zoe.html)
  - This link takes you to the standard `zoe` API documentation. When calling
any of the `zoe` API methods from the REPL, `zoe` must be prefaced by
`home.` and use `E()`. For example, `E(home.zoe).getInviteIssuer()` 
- `uploads` 
- `spawner` **tyg todo: Unclear what this is for/why and what commands
  would be used from the REPL?**
- `network` 
- `contractHost`
  - Replaced by the `spawner` object. Please update any code that uses 
    `conractHost` to use `spawner` instead. 
- `registrar`
  - Renamed to `registry` and deprecated. Please update any code that uses 
`registrar` to use `registry` instead. 
- `http`
  -`api/deploy.js` uses this object to install new HTTP and WebSocket handlers in an
 ag-solo.  You should not need to use it. 

Click on each object link above to go to its documentation.








