# Zoe Overview

## What is Zoe?

Zoe is the heart of Agoric's smart contract framework. Use Zoe to:

- **Run your code on-chain**
- **Mint new digital assets**
- **Credibly trade assets**

## Why Use Zoe?

- **Zoe is Safer for Users:** A Zoe offer guarantees that you get either
  what you wanted or a full refund of the assets you put in,
  even if the contract is buggy or malicious.

- **Zoe is Safer for Developers** For a given offer, if you
  make a mistake with the amount of assets you take or give,
  Zoe guarantees that your users will either get what they say
  they wanted or get a refund.

## Bundling a Contract

In [deploying the basic dapp contract](../getting-started/#starting-the-dapp-smart-contract),
the first step was to _bundle_ all of its modules into a single artifact.
We used the [agoric run](../agoric-cli/#agoric-run) command in that case.
The core mechanism used in `agoric run` is a call to `bundleSource()`.

In the `contract` directory of the dapp,
run `test-bundle-source.js` following `ava` conventions:

```sh
cd contract
yarn ava test/test-bundle-source.js
```

The results look something like...

```console
  ✔ bundleSource() bundles the contract for use with zoe (2.7s)
    ℹ 1e1aeca9d3ebc0bd39130fe5ef6fbb077177753563db522d6623886da9b43515816df825f7ebcb009cbe86dcaf70f93b9b8595d1a87c2ab9951ee7a32ad8e572
    ℹ Object @Alleged: BundleInstallation {}
  ─

  1 test passed
```

::: details Test Setup

The test uses `createRequire` from the node `module` API to resolve the main module specifier:

<<< @/snippets/zoe/contracts/test-bundle-source.js#bundleSourceImports

<<< @/snippets/zoe/contracts/test-bundle-source.js#contractPath
:::

`bundleSource()` returns a bundle object with `moduleFormat`, a hash, and the contents:

<<< @/snippets/zoe/contracts/test-bundle-source.js#testBundleSource{1}

::: details Getting the zip file from inside a bundle

An endo bundle is a zip file inside JSON. To get it back out:

```sh
jq -r .endoZipBase64 bundle-xyz.json | base64 -d >xyz.zip
```

You can then, for example, look at its contents:

```sh
unzip -l xyz.zip
```

:::

## Contract Installation

To identify the code of contracts that parties consent to participate in, Zoe
uses _Installation_ objects.

Let's try it with the contract from our [basic dapp](../getting-started/):

```sh
yarn ava test/test-contract.js -m 'Install the contract'
```

```
  ✔ Install the contract
    ℹ Object @Alleged: BundleInstallation {}
```

::: details Test Setup

The test starts by using `makeZoeKitForTest` to set up zoe for testing:

<<< @/snippets/zoe/contracts/test-bundle-source.js#importZoeForTest

```js
const { zoeService: zoe } = makeZoeKitForTest();
```

:::

It gets an installation using a bundle as in the previous section:

```js{1}
const installation = await E(zoe).install(bundle);
t.log(installation);
t.is(typeof installation, 'object');
```

The `installation` identifies the basic contract that we'll
go over in detail in the sections below.

::: details gameAssetContract.js listing

<<< @/snippets/zoe/src/gameAssetContract.js#file

:::

## Starting a Contract Instance

Now we're ready to start an _instance_ of the [basic dapp](../getting-started/) contract:

```sh
yarn ava test/test-contract.js -m 'Start the contract'
```

```
  ✔ Start the contract (652ms)
    ℹ terms: {
        joinPrice: {
          brand: Object @Alleged: PlayMoney brand {},
          value: 5n,
        },
      }
    ℹ Object @Alleged: InstanceHandle {}
```

Contracts can be parameterized by _terms_.
The price of joining the game is not fixed in the source code of this contract,
but rather chosen when starting an instance of the contract.
Likewise, when starting an instance, we can choose which asset _issuers_
the contract should use for its business:

```js{8}
const money = makeIssuerKit('PlayMoney');
const issuers = { Price: money.issuer };
const terms = { joinPrice: AmountMath.make(money.brand, 5n) };
t.log('terms:', terms);

/** @type {ERef<Installation<GameContractFn>>} */
const installation = E(zoe).install(bundle);
const { instance } = await E(zoe).startInstance(installation, issuers, terms);
t.log(instance);
t.is(typeof instance, 'object');
```

_`makeIssuerKit` and `AmountMath.make` are covered in the [ERTP](../ertp/) section, along with `makeEmptyPurse`, `mintPayment`, and `getAmountOf` below._

Let's take a look at what happens in the contract when it starts. A _facet_ of Zoe, the _Zoe Contract Facet_, is passed to the contract `start` function.
The contract uses this `zcf` to get its terms. Likewise it uses `zcf` to
make a `gameSeat` where it can store assets that it receives in trade
as well as a `mint` for making assets consisting of collections (bags) of Places:

<<< @/snippets/zoe/src/gameAssetContract.js#start

It defines a `joinShape` and `joinHandler` but doesn't do anything with them yet. They will come into play later. It defines and returns its `publicFacet` and stands by.

<<< @/snippets/zoe/src/gameAssetContract.js#started

## Trading with Offer Safety

Our [basic dapp](../getting-started/) includes a test of trading:

```sh
yarn ava test/test-contract.js -m 'Alice trades*'
```

```
  ✔ Alice trades: give some play money, want some game places (674ms)
    ℹ Object @Alleged: InstanceHandle {}
    ℹ Alice gives {
        Price: {
          brand: Object @Alleged: PlayMoney brand {},
          value: 5n,
        },
      }
    ℹ Alice payout brand Object @Alleged: Place brand {}
    ℹ Alice payout value Object @copyBag {
        payload: [
          [
            'Park Place',
            1n,
          ],
          [
            'Boardwalk',
            1n,
          ],
        ],
      }
```

We start by putting some money in a purse for Alice:

```js{4}
const alicePurse = money.issuer.makeEmptyPurse();
const amountOfMoney = AmountMath.make(money.brand, 10n);
const moneyPayment = money.mint.mintPayment(amountOfMoney);
alicePurse.deposit(moneyPayment);
```

Then we pass the contract instance and the purse to our code for `alice`:

```js
await alice(t, zoe, instance, alicePurse);
```

Alice starts by using the `instance` to get the contract's `publicFacet` and `terms` from Zoe:

<img src="./assets/trade-offer-safety-1.svg"
  style="border: 2px solid" width="600" />

<<< @/snippets/zoe/contracts/alice-trade.js#queryInstance

Then she constructs a _proposal_ to give the `joinPrice` in exchange
for 1 Park Place and 1 Boardwalk, denominated in the game's `Place` brand; and she withdraws a payment from her purse:

<<< @/snippets/zoe/contracts/alice-trade.js#makeProposal

She then requests an _invitation_ to join the game; makes an _offer_ with
(a promise for) this invitation, her proposal, and her payment;
and awaits her **Places** payout:

<img src="./assets/trade-offer-safety-2.svg"
  style="border: 2px solid" width="600" />

<<< @/snippets/zoe/contracts/alice-trade.js#trade

::: details Troubleshooting missing brands in offers

If you see...

```
Error#1: key Object [Alleged: IST brand] {} not found in collection brandToIssuerRecord
```

then it may be that your offer uses brands that are not known to the contract.
Use [E(zoe).getTerms()](/reference/zoe-api/zoe.md#e-zoe-getterms-instance) to find out what issuers
are known to the contract.

If you're writing or instantiating the contract, you can tell the contract about issuers
when you are [creating an instance](#starting-a-contract-instance) or by using
[zcf.saveIssuer()](/reference/zoe-api/zoe-contract-facet.md#zcf-saveissuer-issuer-keyword).

:::

The contract gets Alice's `E(publicFacet).makeJoinInvitation()` call and uses `zcf` to make an invitation with an associated handler, description, and proposal shape. Zoe gets Alice's `E(zoe).offer(...)` call, checks the proposal against the proposal shape, escrows the payment, and invokes the handler.

<img src="./assets/trade-offer-safety-3.svg"
  style="border: 2px solid" width="600" />

<<< @/snippets/zoe/src/gameAssetContract.js#makeInvitation

The offer handler is invoked with a _seat_ representing the party making the offer.
It extracts the `give` and `want` from the party's offer and checks that
they are giving at least the `joinPrice` and not asking for too many
places in return.

With all these prerequisites met, the handler instructs `zcf` to mint the requested
**Place** assets, allocate what the player is giving into its own `gameSeat`,
and allocate the minted places to the player. Finally, it concludes its business with the player.

<img src="./assets/trade-offer-safety-4.svg"
  style="border: 2px solid" width="600" />

<<< @/snippets/zoe/src/gameAssetContract.js#handler

Zoe checks that the contract's instructions are consistent with
the offer and with conservation of assets. Then it allocates
the escrowed payment to the contract's gameSeat and pays out
the place NFTs to Alice in response to the earlier `getPayout(...)` call.

Alice asks the `Place` issuer what her payout is worth
and tests that it's what she wanted.

<img src="./assets/trade-offer-safety-5.svg"
  style="border: 2px solid" width="600" />

<<< @/snippets/zoe/contracts/alice-trade.js#payouts

## Example Contracts

Agoric has written [a number of example contracts that you can
use](/zoe/guide/contracts/), including:

- an [Automated Market Maker (AMM)
  implementation](/zoe/guide/contracts/constantProductAMM.md)
- a [covered call option contract](./contracts/covered-call.md)
- an [OTC Desk market maker contract](./contracts/otc-desk.md)
- contracts for [minting fungible](./contracts/mint-payments.md) and
  [non-fungible tokens](./contracts/mint-and-sell-nfts.md)

::: warning Beta Features

These contracts may depend on features from our Beta release
that are not available in mainnet.

:::
