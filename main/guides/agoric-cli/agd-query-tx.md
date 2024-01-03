# Using `agd` to make queries and transactions

`agd` is the Agoric Cosmos App, analagous to `simd` in the [Cosmos SDK](https://docs.cosmos.network/) simapp or `gaiad` in
the Cosmos hub. Most of the `simd` [query commands](https://docs.cosmos.network/v0.46/core/cli.html#query-commands) and [transaction commands](https://docs.cosmos.network/v0.46/core/cli.html#transaction-commands) work similarly in `agd`.

::: tip agd for Building Dapps

This section focusses on commands relevant to developing and deploying smart contracts and dapps. See also:

- [Validators topics \- Agoric Community Forum](https://community.agoric.com/c/validators/9)
- [Governance topics \- Agoric Community Forum](https://community.agoric.com/c/governance/6)
- [Delegator Guide \(CLI\) \| Cosmos Hub](https://hub.cosmos.network/main/delegators/delegator-guide-cli.html)

:::

::: tip Installing agd

Options include:

- Use the [basic dapp local chain](../getting-started/#starting-a-local-agoric-blockchain) docker container: to run `agd status`, enter `yarn docker:bash` followed by `agd status`; or use `docker-compose exec agd agd status`.
- Install from an [agoric-sdk release](https://github.com/Agoric/agoric-sdk/releases).

:::

If we invoke `agd` without arguments, it prints a list of available commands including:

```
Available Commands:

  help                Help about any command
  keys                Manage your application's keys
  query               Querying subcommands
  status              Query remote node for status
  tx                  Transactions subcommands
  version             Print the application binary version information

Flags:
  -h, --help                help for agd
      --home string         directory for config and data (default $HOME)
```

## Query Commands

In most cases, `agd query ...` is followed by a module name such as `bank`. An exception is `agd status`:

### agd status

Query remote node for status

Example:

```console
$ agd status
{"NodeInfo":{"protocol_version":{"p2p":"8","block":"11" ... }}}
```

::: tip Formatting with jq

For pretty-printed JSON, or to select parts, pipe the output through [jq](https://jqlang.github.io/jq/).

```console
$ agd status | jq .ValidatorInfo
```

```json
{
  "Address": "B4167E20C19D9B30ACD93865B854555D3823B31C",
  "PubKey": {
    "type": "tendermint/PubKeyEd25519",
    "value": "F9rO2FZ5sliRSRUVYnwWYVS0Ptf8Ll1dIOb6SQkgmTA="
  },
  "VotingPower": "5000"
}
```

:::

The query goes to a local node at `tcp://localhost:26657` by default. To use another node:

```console
$ agd status --node https://devnet.rpc.agoric.net:443
{"NodeInfo":{"protocol_version":{"p2p":"8","block":"11" ... }}}
```

::: tip Port is required

Typically, `:443` can be left implicit in `https` URLs.
But not here. Without it, we get:

```
Error: post failed: Post "https://devnet.rpc.agoric.net": dial tcp: address devnet.rpc.agoric.net: missing port in address
```

:::

### agd query bank balances

Query for account balances by address

Example:

```
$ addr=agoric14pfrxg63jn6ha0cp6wxkm4nlvswtscrh2pymwm
$ agd query bank balances $addr
balances:
- amount: "331000000"
  denom: ubld
- amount: "4854000000"
  denom: uist
```

To get **JSON output** rather than YAML:

```console
$ agd query bank balances $addr -o json
{"balances":[{"denom":"ubld","amount":"331000000"},{"denom":"uist","amount":"4854000000"}],...}
```

### agd query gov proposals

Query for a all paginated proposals that match optional filters:

Example:

```
$ agd query gov proposals --output json | \
  jq -c '.proposals[] | [.proposal_id,.voting_end_time,.status]'
["1","2023-11-14T17:32:16.665791640Z","PROPOSAL_STATUS_PASSED"]
["2","2023-11-14T17:40:16.450879296Z","PROPOSAL_STATUS_PASSED"]
["3","2023-11-14T17:44:37.432643476Z","PROPOSAL_STATUS_PASSED"]
```

## Transaction Commands

Making transactions requires setting up an **account** with a private key for signing. The [basic dapp local chain](../getting-started/#starting-a-local-agoric-blockchain) container has a number of keys set up for use with `--keyring-backend=test`. Use `agd keys list --keyring-backend=test` to see them.

For accounts that control real negotiable assets, using
a consumer grade wallet such as Keplr is more straightforward.
_Consider a hardware wallet such as a Ledger as well._

### agd tx bank send

Send funds from one account to another.

```
$ src=agoric14pfrxg63jn6ha0cp6wxkm4nlvswtscrh2pymwm
$ dest=agoric1a3zu5aqw255q0tuxzy9aftvgheekw2wedz3xwq
$ amt=12000000ubld
$ agd tx bank send $src $dest $amt \
  --keyring-backend=test --chain-id=agoriclocal \
		--gas=auto --gas-adjustment=1.2 \
		--yes -b block
```

As usual, use `agd tx bank send --help` for documentation on
flags such as `--yes`, `-b`, etc.

### agd tx swingset install-bundle

```
agd tx swingset install-bundle --compress "@bundle1.json" \
  --from user1 --keyring-backend=test --gas=auto \
  --chain-id=agoriclocal -bblock --yes -o json
```

See also the [Agoric Gov Proposal Builder](https://cosgov.org/) web interface, especially for understanding storage fees.

### agd tx gov submit-proposal swingset-core-eval

Usage:

```sh
  agd tx gov submit-proposal swingset-core-eval [[permit.json] [code.js]]... [flags]
```

Example:

```
$ SCRIPT=start-game1.js
$ PERMIT=start-game1-permit.json
agd tx gov submit-proposal swingset-core-eval "$PERMIT" "$SCRIPT" \
  --title="Start Game Place Contract" --description="Evaluate $SCRIPT" \
  --deposit=10000000ubld --gas=auto --gas-adjustment=1.2 \
  --from user1 --chain-id agoriclocal --keyring-backend=test \
  --yes -b block
```

The [Agoric Gov Proposal Builder](https://cosgov.org/) web interface provides a nice interface for this as well.