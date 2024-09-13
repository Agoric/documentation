# Wallet API

You can interact with a Wallet via the JavaScript _REPL_ (_Read-Eval-Print Loop_),
which is visible at the bottom of the Wallet UI display.
In the REPL, you send messages to `home.wallet`, which is the Wallet running on that
page/process. Typing `E(home.wallet).foo()` in the REPL returns the names of all the Wallet
API methods by the clever method of asking it to evaluate a non-existent API method and
getting an error message listing all the valid methods.

Running `agoric open --repl only` opens a browser tab that shows only the REPL, and not
the combination of Wallet UI and REPL area. When issuing commands to the Wallet from the
REPL, they must be of the form `E(home.wallet).<Wallet API command and arguments>`. For more
information about `E()`, see the [`E()` section](/guides/js-programming/eventual-send) in
the Distributed JavaScript Programming Guide.

There are two objects on which the Wallet API commands work:

- `WalletUser`: The presence exposed as `local.wallet` (and `home.wallet` for backwards compatibility).  
  It provides a place for Wallet API commands.
- `WalletBridge`: Its methods can be used by an untrusted
  Dapp without breaching the wallet's integrity. These methods are also
  exposed via the iframe/WebSocket bridge that a Dapp UI can use to access the
  wallet.
