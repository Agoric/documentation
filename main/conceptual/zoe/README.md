# Zoe Overview

## What is Zoe?

Zoe is Agoric's smart contract framework. Use Zoe to:

* **Run your code on-chain**
* **Mint new digital assets**
* **Credibly trade assets**

## Why Use Zoe?

### For Users ###

**Zoe is safer.** Traditionally, putting digital assets in a smart
contract has carried the risk of losing them. But Zoe guarantees you get either
what you wanted or a full refund of the assets you put in. You will
never leave a smart contract empty-handed, even if it is buggy or malicious.

### For Developers ###

**Zoe is easier.**  Traditionally, writing a smart contract meant
learning a new, untried language. And don't make any mistakes - if you
do, your users might lose millions.

However, you write Zoe contracts in a secure subset of JavaScript.
Moreover, Zoe automatically escrows all user digital assets and
handles their subsequent payout. **Even a buggy contract can't cause
users to lose their assets.**

### Contracts on Zoe

Agoric has written [a number of example contracts that you can
use](/zoe/guide/contracts/), including:
* an [Automated Market Maker (AMM)
  implementation](/zoe/guide/contracts/constantProductAMM.md)
* a [covered call option contract](./contracts/covered-call.md)
* an [OTC Desk market maker contract](./contracts/otc-desk.md)
* contracts for [minting fungible](./contracts/mint-payments.md) and
  [non-fungible tokens](./contracts/mint-and-sell-nfts.md)

## Using an Example Zoe Smart Contract

You must have a Zoe invitation to a specific contract instance to join
and participate in it. Let's imagine your friend Alice has sent an
invitation for a contract instance to your [wallet](/conceptual/wallet/).

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
echo "$endoZipBase64" | base64 -d > bundle.zip
unzip bundle.zip
```

Contracts can add their own specific information to invitations. In
this case, the Atomic Swap contract adds information about what is
being traded: the `asset` [amount](/conceptual/ertp/amounts.md#amounts)
Alice has escrowed, and the `price` amount that you must pay to get it.
Note that both are _descriptions_ of digital assets with no intrinsic value of their own.

### Making an Offer

You've successfully checked out the invitation, so now you can make an
offer.

An offer has three required parts:
* a Zoe invitation
* a proposal
* a [payment](/conceptual/ertp/purses-and-payments.md#payments) containing
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
[purse](/conceptual/ertp/purses-and-payments.md) (used to hold digital
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
amounts in your [current allocation](/reference/zoe-api/zoe.md#e-userseat-getcurrentallocation)
in the contract.

### Using Your UserSeat

Making an offer as a user returns a [UserSeat](/reference/zoe-api/zoe.md#userseat-object)
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
Contract code has access to ZCF *and* can get access to the Zoe
Service.

To learn more about the Zoe Service, Zoe Contract Facet, and Zoe
Helper APIs, [see our Zoe API documentation](/reference/zoe-api/).
