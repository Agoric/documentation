# agoric wallet CLI

The `agoric wallet` subcommand prepares, signs, and inspects smart wallet
traffic from a shell. It is the scripted counterpart to a signing UI like
Keplr: useful for provisioning wallets, for testing, and for any workflow
that needs to prepare a [`BridgeAction`](./wallet-bridge) offline before
sending it.

Source: [`packages/agoric-cli/src/commands/wallet.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/agoric-cli/src/commands/wallet.js).

Every subcommand accepts `--home <dir>` (the `agd` application home
directory) and `--keyring-backend <os|file|test>`.

## `agoric wallet provision`

```sh
agoric wallet provision --account <address> [--spend] [--nickname <string>]
```

Provisions a smart wallet for `--account` by submitting a
`provision-one <nickname> <address> SMART_WALLET` transaction, which the
chain routes to `walletFactory`'s `provideSmartWallet`. Provisioning has an
on-chain cost (a `power_flag_fee`); without `--spend` the command prints the
cost and does a dry run instead of broadcasting:

```sh
$ agoric wallet provision --account agoric1...
Provisioning a wallet costs 10000000 uist
To really provision, rerun with --spend or...
```

Rerun with `--spend` to actually submit the transaction.

## `agoric wallet send`

```sh
agoric wallet send --from <address> --offer <file> [--dry-run] \
  [--gas <auto|number>] [--gas-adjustment <factor>] [--verbose]
```

Signs and broadcasts a prepared `BridgeAction` as a
`wallet-action --allow-spend` Swingset transaction from `--from`, which
becomes a `MsgWalletSpendAction` (see [Spend authority](./wallet-bridge#spend-authority)).
`--offer` points at a file containing the marshalled `CapData` JSON for the
action (despite the flag name, this is any `BridgeAction`, not only
`executeOffer`). `--gas` defaults to `auto` with a `1.2` adjustment factor.
`--dry-run` prints the underlying `agd` command instead of running it.

## `agoric wallet print`

```sh
agoric wallet print --file <file>
```

Unmarshals a prepared `BridgeAction` file with the chain's board marshaller
and prints the plain object, so you can check what a prepared message
actually says before sending it.

## `agoric wallet extract-id`

```sh
agoric wallet extract-id --offer <file>
```

Unmarshals a prepared offer file and prints its `offer.id`. Handy for
scripting a `tryExitOffer` or a `continuing` invitation spec against an
offer you prepared earlier.

## `agoric wallet list`

```sh
agoric wallet list
```

Lists the addresses of every provisioned wallet, by querying the child
keys of `published.wallet` in vstorage.

## `agoric wallet show`

```sh
agoric wallet show --from <address>
```

Prints a human-readable summary of a wallet's current state (purses, live
offers) by coalescing its `published.wallet.<address>` update stream, plus
its Cosmos bank balances via `agd query bank balances`.

## `agoric wallet watch`

```sh
agoric wallet watch --from <address>
```

Follows `published.wallet.<address>` and prints each new `UpdateRecord` as
it is published. Useful for watching an offer resolve in real time.

## A typical offline-signing flow

Prepare an offer as `CapData` in a file (see
[Building Client Dapps](/guides/getting-started/contract-rpc#marshalling-amounts-and-instances)
for how to construct it), then:

```sh
agoric wallet print --file offer.json        # sanity-check its contents
agoric wallet extract-id --offer offer.json  # note its id, for later reference
agoric wallet send --from acct1 --offer offer.json --verbose
agoric wallet watch --from agoric1...        # observe it resolve
```

## See also

- [BridgeAction Reference](./wallet-bridge) for the message shapes these
  commands prepare and send.
- [Smart Wallet](/guides/wallet/) for the wallet architecture and
  provisioning model.
