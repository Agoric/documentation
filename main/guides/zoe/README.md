# Zoe Overview

## What is Zoe?

Zoe is the heart of Agoric's smart contract framework. Use Zoe to:

- **Run your code on-chain**
- **Mint new digital assets**
- **Credibly trade assets**

## Why Use Zoe?

### For Users

**Zoe is safer.** Traditionally, putting digital assets in a smart
contract has carried the risk of losing them. But Zoe guarantees you get either
what you wanted or a full refund of the assets you put in. You will
never leave a smart contract empty-handed, even if it is buggy or malicious.

### For Developers

**Zoe is easier.** Traditionally, writing a smart contract meant
learning a new, untried language. And don't make any mistakes - if you
do, your users might lose millions.

However, you write Zoe contracts in a secure subset of JavaScript.
Moreover, Zoe automatically escrows all user digital assets and
handles their subsequent payout. **Even a buggy contract can't cause
users to lose their assets.**

::: warning TODO tone down the claims above

:::

## Bundling a Contract

Recall from [deploying the basic dapp contract](../getting-started/#deploy-the-contract)
that the first step was to _bundle_ all if its modules into a single artifact.
We used the [agoric run](../agoric-cli/#agoric-run) command in that case.
The core mechanism used in `agoric run` is a call to `bundleSource()`.

In the `contract` directory of the
[basic dapp project structure](../getting-started/#project-structure),
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

## Contract Installation

To identify the code of contracts that parties consent to participate in, Zoe
uses _Installation_ objects. Let's try it:

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

Using a bundle as in the previous section:

```js{1}
const installation = await E(zoe).install(bundle);
t.log(installation);
t.is(typeof installation, 'object');
```

## Starting a contract

Now we're ready for the to start an instance of the contract:

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
but rather chosen when starting an _instance_ of the contract.
Likewise, when starting an instance, we can choose which asset _issuers_
the contract should use for its business:

```js
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

<<< @/snippets/zoe/contracts/gameAssetContract.js#start

It defines a `joinShape`, `joinHandler` but doesn't do anything with them yet. They will come into play later. It defines and returns its `publicFacet` and stands by.

<<< @/snippets/zoe/contracts/gameAssetContract.js#started

## Trading with Offer Safety

Now let's try trading:

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

```js
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

<<< @/snippets/zoe/contracts/test-alice-trade.js#queryInstance

Then she constructs a _proposal_ to give the `joinPrice` in exchange
for 1 Park Place and 1 Boardwalk, denominated in the game's `Place` brand; and she withdraws a payment from her purse:

<<< @/snippets/zoe/contracts/test-alice-trade.js#makeProposal

She then requests an _invitation_ to join the game; makes an _offer_ with this invitation, her proposal, and her payment; and awaits her Place payout:

<<< @/snippets/zoe/contracts/test-alice-trade.js#trade

The contract gets Alice's `E(publicFacet).makeJoinInvitation()` call and uses `zcf` to make an invitation with an associated handler, description, and proposal shape. Zoe gets Alice's `E(zoe).offer(...)` call, checks the proposal against the proposal shape, escrows the payment, and invokes the handler.

<<< @/snippets/zoe/contracts/gameAssetContract.js#makeInvitation

The handler is invoked with a _seat_ representing the party making the offer.
It extracts the `give` and `want` from the party's offer and checks that
they are giving at least the `joinPrice` and not asking for too many
places in return.

With all these prerequisites met, it instructs `zcf` to mint the requested
place assets, allocate what the player is giving into its own seat,
and allocate the minted places to the player. Finally, it concludes its business with the player.

<<< @/snippets/zoe/contracts/gameAssetContract.js#handler

Zoe checks that the contract's instructions are consistent with
the offer and with conservation of assets. Then it allocates
the escrowed payment to the contract's gameSeat and pays out
the place NFTs to Alice.

Alice asks the `Place` issuer what her payout is worth
and tests that it's what she wanted.

<<< @/snippets/zoe/contracts/test-alice-trade.js#payouts

### Contracts on Zoe

Agoric has written [a number of example contracts that you can
use](/zoe/guide/contracts/), including:

- an [Automated Market Maker (AMM)
  implementation](/zoe/guide/contracts/constantProductAMM.md)
- a [covered call option contract](./contracts/covered-call.md)
- an [OTC Desk market maker contract](./contracts/otc-desk.md)
- contracts for [minting fungible](./contracts/mint-payments.md) and
  [non-fungible tokens](./contracts/mint-and-sell-nfts.md)

## Using an Example Zoe Smart Contract

You must have a Zoe invitation to a specific contract instance to join
and participate in it. Let's imagine your friend Alice has sent an
invitation for a contract instance to your [wallet](/guides/wallet/).

Compare this to a smart contract on Ethereum. On Ethereum, the smart
contract developer must guard against malicious calls and store an
internal access control list to check whether the message sender is
allowed to send such a message. Zoe, built on Agoric's [object
capability](/glossary/#object-capabilities) security model, is just
easier.

This particular invitation is for an [Atomic Swap
contract](/zoe/guide/contracts/atomic-swap.md).
In an Atomic Swap, one party puts up digital assets they want to
exchange and sends an invitation to a second party for them to
possibly complete the exchange. In this example, Alice has already
escrowed the assets she wants to swap and is asking you to pay a
specified price to receive her digital assets.

### Inspecting an Invitation

So you have an invitation, but how do you use it? First, you use Zoe
to inspect and validate the invitation.

<<< @/snippets/test-intro-zoe.js#details

::: warning Note

E() is part of the Agoric platform and is used to [call methods on
remote objects and receive a promise for the
result](/guides/js-programming/eventual-send.md).
Code on the Agoric platform is put in separate environments, called
[vats](/glossary/#vat), for security. Zoe is a remote object in its own vat,
so we must use E().
:::

Invitations include information about their contract's installation.
Essentially, this is the contract's source code as installed on Zoe.
From this overall contract installation, people use Zoe to create and
run specific instances of the contract. For example, if a real estate
company has a contract for selling a house, they would create an
instance of the contract for each individual house they have up for
sale.

You use object identity comparison to quickly check that you recognize
this contract installation, without having to compare source code
line-by-line. If the installation matches, you're
sure the invitation is for participating in an instance of the
expected contract rather than an unknown and possibly malicious one.

<<< @/snippets/test-intro-zoe.js#isCorrectCode

However, if you don't recognize the installation, you can inspect its
code directly by calling:

<<< @/snippets/test-intro-zoe.js#inspectCode

In most cases, the bundle contains a base64-encoded zip file that you can
extract for review:

```sh
@@@@@@
jq -r .endoZipBase64 bundle-game1aginst.json | base64 -d >game1aginst.zip

echo "$endoZipBase64" | base64 -d > bundle.zip
unzip bundle.zip
```

Contracts can add their own specific information to invitations. In
this case, the Atomic Swap contract adds information about what is
being traded: the `asset` [amount](/guides/ertp/amounts.md#amounts)
Alice has escrowed, and the `price` amount that you must pay to get it.
Note that both are _descriptions_ of digital assets with no intrinsic value of their own.

### Making an Offer

You've successfully checked out the invitation, so now you can make an
offer.

An offer has three required parts:

- a Zoe invitation
- a proposal
- a [payment](/guides/ertp/purses-and-payments.md#payments) containing
  the digital assets you're offering to swap

The `proposal` states what you want from the offer, and what you will
give in return. Zoe uses the proposal as an invariant to ensure you
don't lose your assets in the trade. This invariant is known as **offer
safety**.

You use the invitation's `asset` and `price` amounts to make your
proposal. Let's say `asset` is an amount of 3 Moola, and `price` is an amount
of 7 Simoleans (Moola and Simoleans are made-up currencies for this example).

<<< @/snippets/test-intro-zoe.js#ourProposal

Proposals must use Keywords, which are
[identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)
properties that start with an upper case letter and contain no non-ASCII characters.
Here, the specific keywords, `Asset` and `Price`, are [determined by the
contract code](/zoe/guide/contracts/atomic-swap.md).

You said you would give 7 Simoleans, so you must send 7 Simoleans as a payment.
You happen to have some Simoleans lying around in a Simolean
[purse](/guides/ertp/purses-and-payments.md) (used to hold digital
assets of a specific type). You withdraw a payment of 7 Simoleans from
the purse for your offer, and construct an object using the same
Keyword as your `proposal.give`:

<<< @/snippets/test-intro-zoe.js#getPayments

Now you need to [harden](https://github.com/endojs/endo/blob/HEAD/packages/ses/docs/guide.md) your
just created `proposal` and `payments` objects. Hardening is
transitively freezing an object. For security reasons, we must harden
any objects that will be passed to a remote object like Zoe.

<<< @/snippets/test-intro-zoe.js#harden

You've put the required pieces together, so now you can make an offer:

<<< @/snippets/test-intro-zoe.js#offer

At this point, Zoe confirms your invitation's validity and [burns](/glossary/#burn) it.
Zoe also escrows your payments, representing their value as
amounts in your **[Allocation](/reference/zoe-api/zoe-data-types.md#allocation)**
in the contract.

::: tip Troubleshooting missing brands in offers

If you see...

```
Error#1: key Object [Alleged: IST brand] {} not found in collection brandToIssuerRecord
```

then it may be that your offer uses brands that are not known to the contract.
Use [E(zoe).getTerms()](/reference/zoe-api/zoe.md#e-zoe-getterms-instance) to find out what issuers
are known to the contract.

If you're writing or instantiating the contract, you can tell the contract about issuers
when you are [creating an instance](#creating-an-instance) or by using
[zcf.saveIssuer()](/reference/zoe-api/zoe-contract-facet.md#zcf-saveissuer-issuer-keyword).

:::

### Using Your UserSeat

Making an offer as a user returns a [UserSeat](/reference/zoe-api/user-seat.md)
representing your position in the ongoing contract instance (your
"seat at the table"). You can use this seat to:

1. Exit the contract.
2. Get information about your position such as your current allocation.
3. Get your payouts from Zoe.

Check that your offer was successful:

<<< @/snippets/test-intro-zoe.js#offerResult

In response to your offer, the `atomicSwap` contract returns the
message: "The offer has been accepted. Once the contract has been
completed, please check your payout." Other contracts and offers may
return something different. The offer's result is entirely up to the
contract.

### Getting Payouts

The `atomicSwap` contract of this example is over once the second
party escrows the correct assets. You can get your payout of Moola
with the Keyword you used ('Asset'):

<<< @/snippets/test-intro-zoe.js#getPayout

Alice also receives her payouts:

<div class="language-js secondary">

<<< @/snippets/test-intro-zoe.js#alicePayout

</div>

## Writing and Installing a Contract

Now that you've seen how to participate in a contract instance, let's
look at how you'd create a contract and its instances.

Let's pretend Alice wrote that contract from scratch, even though
`atomicSwap` is one of Agoric's example contracts (see [Atomic Swap](./contracts/atomic-swap.md)).
Note: All Zoe contracts must have this format:

::: details Show contract format
<<< @/snippets/contract-format.js#contractFormat
:::

Alice fills in this code template with `atomicSwap`'s particulars.
To install this particular code, Alice first must bundle it off-chain,
meaning the code and its imports are flattened together:

<<< @/snippets/test-intro-zoe.js#importBundleSource

<<< @/snippets/test-intro-zoe.js#bundle

Then Alice must install it on Zoe:

<<< @/snippets/test-intro-zoe.js#install

The return value is an `installation`, which we saw
[earlier](#inspecting-an-invitation). It is an
object identifying a particular piece of code installed on Zoe. It can
be compared to other installations, and you can call
`E(atomicSwapInstallation).getBundle()` to see the code itself.

### Creating an Instance

Now Alice uses the installation to create a new instance. She must
also tell Zoe about the ERTP issuers she wants to use, by specifying
their role with Keywords. Alice was escrowing Moola, so she uses the
keyword `Asset` to label the `moolaIssuer`. She wanted Simoleans, so
she uses the keyword `Price` to label the `simoleanIssuer`.

<<< @/snippets/test-intro-zoe.js#startInstance

Even the creator of a contract instance needs an invitation to
participate in it. Alice uses the returned `creatorInvitation` to
make an offer, from which she gets an invitation that can be sent to
the counter-party.

<<< @/snippets/test-intro-zoe.js#aliceOffer

## Zoe's Two Sides: Zoe Service and Zoe Contract Facet (ZCF)

You may have noticed the contract code's `start` method has a `zcf`
parameter. This is the Zoe Contract Facet. Zoe has two sides: the Zoe
Service, which you've seen users interact with, and the Zoe Contract
Facet (ZCF), which is accessible to the contract code. Note that users
have access to the Zoe Service, but do not have access to ZCF.
Contract code has access to ZCF _and_ can get access to the Zoe
Service.

To learn more about the Zoe Service, Zoe Contract Facet, and Zoe
Helper APIs, [see our Zoe API documentation](/reference/zoe-api/).
