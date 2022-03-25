---
sidebar: auto
---
# Glossary

This page lists words, expressions, or concepts used by the Agoric technology stack.

## Agoric CLI

A command line interface for installing dependencies and initializing, deploying, and starting Agoric projects.
See the [Agoric CLI Guide](/guides/agoric-cli/).

## AllegedName

Human-readable name of a kind of rights. The alleged name should
not be trusted as an accurate depiction, since it is provided by
the maker of the mint and could be deceptive, but is useful for debugging and double-checking.

The AllegedName must be a string.

## Allocation

Allocations represent the [amounts](#amounts) to be paid out to each [seat](#seat) on exit from a contract instance. Possible
exit causes are exercising an exit condition, the contract's explicit choice, or a crash or freeze. There are several methods
for getting the amounts currently allocated.

In more detail, Zoe's guarantee is each [seat](#seat) will either get what it asked for in its offer, or the return of what was [escrowed](#escrow).
The contract can reallocate fairly arbitrarily to achieve that. As contract code is visible to its clients, users can see
what the contract intends to do.

Zoe enforces those terms by keeping track of a current allocation for each seat. The initial allocation is the deposit.
The contract can modify a seat's allocation as long as it never violates offer safety or rights conservation. i.e. it can't
assign assets that weren't already in some allocation and it can't assign them to more than one seat. Also, goods can't
disappear from the total allocation.

## AmountMath

The AmountMath library executes the logic of how [amounts](#amounts) are changed when digital assets are merged, separated,
or otherwise manipulated. For example, a deposit of 2 [Quatloos](#quatloos) into a purse that already has 3 Quatloos
gives a new balance of 5 Quatloos. But a deposit of a non-fungible theater ticket into a purse that already holds
five tickets is performed by set union rather than by arithmetic.

`AmountMath` has a single set of polymorphic methods that deal with different asset kinds:
- `AssetKind.NAT`: Used with [fungible](#fungible) assets.
  Each amount value is a natural number (non-negative integer).
  This is the default `AssetKind`.
- `AssetKind.SET`: Used with [non-fungible](#non-fungible) assets;
  deprecated in favor of `AssetKind.COPY_SET` but still in wide use.
  Each amount value is an array of [key](#key) values
  subject to the same constraints as those of `AssetKind.COPY_SET`.
- `AssetKind.COPY_SET`: Used with [non-fungible](#non-fungible) assets.
  Each amount value is a set of [key](#key) values
  (strings, numbers, objects, etc.).
  Values cannot include promises (they aren't keys), and should not
  include privileged objects such as payments and purses.
- `AssetKind.COPY_BAG`: Used with semi-fungible assets.
  Each amount value is a [multiset](https://en.wikipedia.org/wiki/Multiset)
  of [key](#key) values subject to the same constraints as
  those of `AssetKind.COPY_SET` but allowed to be present more than once.

For more information, see the [ERTP Guide's AmountMath section](/ertp/guide/amount-math.md)
and the [ERTP API's AmountMath section](/ertp/api/amount-math.md).

## Amounts

Amounts are the canonical description of tradable goods. They are manipulated
by [issuers](#issuer) and [mints](#mint), and represent the goods and currency carried by
[purses](#purse) and [payments](#payment). They represent things like currency, stock, and the
abstract right to participate in a particular exchange.

An amount is comprised of a [brand](#brand) with a [value](#value). For example, "4 Quatloos"
is an amount with a value of "4" and a brand of the imaginary currency "Quatloos".

**Important**: Amounts are *descriptions* of digital assets, not the actual assets. They have no
intrinsic value. For example, to make you an offer to buy a magic sword in a game,
a party sends you an amount describing the asset of 5 Quatloos they're willing to trade for your
sword. They don't send you the actual 5 Quatloos; that only happens when there is agreement on the
trade terms and they send you a payment, not an amount, of 5 Quatloos, the actual asset. Creating
a new `amount` does **not** create new assets.

For more information, see the [ERTP Guide's Amounts section](/ertp/guide/amounts.md)
and the [ERTP API's AmountMath section](/ertp/api/amount-math.md).

## AssetHolder

[Purses](#purse) and [payments](#payment) are AssetHolders. These are objects that contain
digital assets in the quantity specified by an [amount](#amounts).

## BigInt

In [ERTP AmountMath](/ertp/guide/amount-math.md), we use the JavaScript [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type for the `value` of fungible amounts in order to avoid overflow risks from using the usual JavaScript `Number` type.

[Timer Services](/repl/timerServices.md) also use `BigInt` for absolute and relative times.

`BigInt`s are written with an `n` suffix: `0n`, `1n`, `2n`, ... or created with `BigInt("123")`
or `BigInt(123)`.

## Board (Agoric Board)

The Board is a shared, on-chain location where users can post a value and make it
accessible to others. When a user posts a value, they receive a unique ID for the value.
Others can get the value just by knowing the ID. You can make an ID known by any
communication method&mdash;a DM or email or other private message, a phone call/voicemail,
an email blast to a mailing list, publishing it on a website, etc.

## Brand

Identifies the kind of [issuer](#issuer), such as "[Quatloos](#quatloos)",
"[Moola](#moola)", etc. Brands are one of the two elements that
make up an [amount](#amounts).
For more information, see the [ERTP Guide's Brand section](/ertp/guide/amounts.md)
and the [ERTP API's Brand section](/ertp/api/brand.md).

## Bundle

Before a contract can be installed on Zoe, its source code must be bundled. This is done by:
```js
import bundleSource from '@endo/bundle-source';
const atomicSwapBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/atomicSwap'),
);
```
The installation operation returns
an `installation`, which is an object with one method; `getBundle()`. You can access an installed contract's source
code via `const { endoZipBase64 } = await E(installation).getBundle();`.
In most cases, the bundle contains a base64-encoded zip file that you can
extract for review:
```sh
echo "$endoZipBase64" | base64 -d > bundle.zip
unzip bundle.zip
```

## Burn

Destroy all digital assets in a payment, for example as part of consuming it in an exchange. See [`issuer.burn(payment, optAmount)`](/ertp/api/issuer.md#issuer-burn-payment-optamount).

## Comparable

Comparable is a deprecated synonym of [key](#key).

## Contract Installation and Contract Instance

In Agoric documentation, *contract* usually refers to a contract's source code that
defines how the contract works. A contract's source code is *installed* on Zoe. A
contract is *instantiated* to create *contract instances*, which are the active
execution of a contract's code running on Zoe.

For example, a realtor has a standard house selling agreement. The contract is the
code defining how that agreement works. When the realtor has a new house to sell,
they instantiate a new instance of their standard contract for that specific property.
If they have ten houses for sale, they have ten different contract instances.

## Creator Invitation

An [invitation](#invitation) optionally returned by [`startInstance()`](/zoe/api/zoe.md#e-zoe-startinstance-installation-issuerkeywordrecord-terms) that the contract instance
creator can use. It is usually used in contracts where the creator immediately
sells something (auctions, swaps, etc.).

## Deposit Facet

A [facet](#facet) of a [purse](#purse). Anyone with a reference to its deposit facet object can add
appropriately branded assets to the purse, but cannot withdraw assets from the purse or find out its balance.

## dIBC

Dynamic version of the [Inter-Blockchain Communication](#ibc) protocol.
See [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md) for more details.

## E()

(Also referred to as *eventual send*) `E()` is a local "bridge" function that
asynchronously invokes methods on local or remote objects, for example those
in another vat, machine, or blockchain. It takes a local object or a [presence](#presence)
for a remote object as its argument and
sends messages to the object using normal message-sending syntax. The local proxy forwards all messages to the remote object to deal with.
All `E()` calls return a promise for the eventual result. For more detail, see
the [`E()` section in the Distributed JavaScript page](/guides/js-programming/eventual-send.md).

## Endo

What Node.js does for JavaScript, Endo does for [Hardened
JavaScript](#hardened-javascript-ses).
Endo guest programs run in Hardened JavaScript and communicate with their host
and other guests through hardened interfaces and object-to-object
message-passing.
For example, an Agoric smart contract is an Endo program that runs in an Endo
host.
Endo is responsible for linking and isolating Node.js packages and modules in
Hardened JavaScript compartments and providing limited access to host
resources.
The scope of vision for the Endo project includes the creation of other Endo
host programs like an Endo browser, an Endo browser extension, and `endo`
command line tools, as well allowing programs to limit the powers they delegate
to dependencies, to limit exposure to supply-chain attacks.
For more information, see the [Endo and Hardened JavaScript Programming
Guide](https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md)

## ERTP

*Electronic Rights Transfer Protocol* is a uniform way of transferring tokens and other digital assets,
both [fungible](#fungible) and [non-fungible](#non-fungible), in JavaScript. All kinds of digital assets
can easily be created and they can be all be transferred in exactly the same ways, with exactly the same security properties.

It uses [object capabilities](#object-capabilities) to enforce access control. Instead of having
to prove ownership of a corresponding private key, if your program has a
reference to an object, it can call methods on that object. If it doesn't
have a reference, it can't. For more on object capabilities, see [this post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

Key ERTP concepts include [Issuers](#issuer), [Mints](#mint),
[Purses](#purse), [Payments](#payment), [Brands](#brand), and [Amounts](#amounts). Also
see the [ERTP Introduction](/getting-started/ertp-introduction.md),
[ERTP Guide](/ertp/guide/), and [ERTP API](/ertp/api/).

## Escrow

To give assets for a possible transaction to an impartial third party, who keeps them until specified conditions are satisfied.
For example, Alice wants to sell Bob a ticket for $100. Alice escrows the ticket, and Bob escrows the $100, with Zoe. Zoe
does not give Alice the $100 or Bob the ticket until it has both items. Since neither Alice nor Bob ever holds both items at
once, they don't have to trust each other to do the transaction. Zoe automatically escrows payments for transaction offers.

## Eventual Send

See [`E()`](#e) above.

## Exit Rule

Part of an [offer](#offer) specifying how the offer can be cancelled/exited. There are three values:
- `onDemand: null`: (Default) The offering party can cancel on demand.
- `waived: null`: The offering party can't cancel and relies entirely on the smart contract to promptly finish their offer.
- `afterDeadline: {…}`: The offer is automatically cancelled after a deadline, as determined by its `deadline` and `timer` properties.

## Facet

A *facet* is an object that exposes an API or particular view of some larger entity, which may be an object itself.
You can make any number of facets of an entity. In JavaScript, you often make a facet by selecting methods from the entity,
either directly or by destructuring:
```js
const facet = {
  myMethod: oldObject.method,
}
```
Two Agoric uses are:
- *Deposit Facet*: A facet of a [purse](#purse). Anyone with a reference to its deposit facet object can add
  appropriately branded assets to the purse, but cannot withdraw assets from the purse or find out its balance.
- *Public Facet*: A set of methods and properties for an object that a developer chooses to be publicly visible and usable.

## Fungible

A fungible asset is one where all exemplars of the asset are interchangeable. For example, if you
have 100 one dollar bills and need to pay someone five dollars, it does not matter which
five one dollar bills you use. Also see [non-fungible](#non-fungible).

## Handle

A handle is a unique identifier implemented as a JavaScript object. Only its identity
is meaningful, so handles do not have properties. Unlike number or string identifiers,
handles are unforgeable. This means the only way to know a handle identity is being given
an object reference, and no identity can be guessed and no fake identity will succeed.

## Harden

A hardened object’s properties cannot be changed, so the only way to interact with a hardened object is through its methods.
`harden()` is similar to `Object.freeze()` but more powerful. For more about `harden()`, see
its [section in the JavaScript Distributed Programming Guide](https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md)

## Hardened JavaScript (SES)

Hardened JavaScript is a standards-track extension to the JavaScript standard.
Hardening JavaScript turns the sandbox into firm ground, where you can code run
you don't completely trust, without being vulnerable to their bugs or bad
intentions.
See the [Endo and Hardened JavaScript Programming
Guide](https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md) for more details.

## IBC

The Inter-Blockchain Communication protocol, used by blockchains to communicate with each other. A short article about IBC
is available [here](https://www.computerweekly.com/blog/Open-Source-Insider/What-developers-need-to-know-about-inter-blockchain-communication).

## Invitation

A [payment](#payment) whose amount represents (and is required for) participation in a contract instance.
Contracts often return a creator invitation on their instantiation, in case the contract instantiator wants
to immediately participate. Otherwise, the contract instance must create any additional invitations.
Every [offer](#offer) to participate in a contract instance must include an invitation to that instance in its payment, and any wallet receiving one will validate it via the [InvitationIssuer](#invitationissuer).

An invitation's [amount](#amounts) includes the following properties:
- The contract's installation in Zoe, including access to its source code.
- The contract instance this invitation is for.
- A handle used to refer to this invitation.
- A description of this invitation's purpose.

## InvitationIssuer

Since [invitations](#invitation) are [payments](#payment), invitations
must have a dedicated [issuer](#issuer), which is the InvitationIssuer.

Zoe has a single `InvitationIssuer` for its entire lifetime. By having a reference to Zoe,
a user can get the `InvitationIssuer`. This lets them claim any invitation they
receive from someone else by calling `E(invitationIssuer).claim()` with the untrusted
invitation as the argument. During the claiming process, the invitationIssuer validates
the invitation. A successful claim also means that invitation is exclusively yours.

**Note**: Depositing into an invitation-branded purse also validates an invitation. This is
what the [wallet](#wallet) does.

## Issuer

Issuers are a one-to-one relationship with both a [mint](#mint) and a [brand](#brand), so each issuer works
with one and only one asset type, such as only working with [Quatloos](#quatloos)
or only working with [Moola](#moola). This association cannot change to another type.

Issuers can create empty [purses](#purse) for
their asset type, but cannot mint new [amounts](#amounts). Issuers can also transform
payments of their asset type (splitting, combining, burning, and exclusively claiming
payments). An issuer from a trusted source can determine if an untrusted payment of
its asset type is valid.

For more information, see the [ERTP Guide's Issuer section](/ertp/guide/issuers-and-mints.md)
and the [ERTP API's Issuer section](/ertp/api/issuer.md).

## Key

A *key* is a [passable](#passable) containing no promises or errors, and can
thus be synchronously compared for structural equivalence with another piece of data.
If either side of the comparison contains promises and/or errors, equality is indeterminable.
If both are fulfilled down to [presences](#presence) and local state, then either they're the
same all the way down, or they represent different objects.

## Keywords

Keywords are unique identifiers per contract. They tie together the [proposal](#proposal), [payments](#payment)
to be [escrowed](#escrow), and [payouts](#payout) to the user by serving as keys for key-value pairs in various
records with values of [amounts](#amounts), [issuers](#issuer), etc.

## Mint

[ERTP](#ertp) has a *mint* object, which creates digital assets. [ZCF](#zcf) provides a different interface to an ERTP mint, called a
*ZCFMint*. Assets and AssetHolders created using ZCFMints can be used in all the same ways as assets created by other ERTP Mints.
They interact with Purses, Payments, Brands, and Issuers in the same ways.

- ERTP mints create digital assets and are the only ERTP objects with the authority to do so.
  Access to an ERTP mint gives you the power to create more digital assets of its type at will. Mints
  can only create one type of asset and cannot change to create a different type.

  There is a one-to-one relationship between an [issuer](#issuer) and its mint, and a mint is an administrative [facet](#facet) of its issuer.
  ERTP mints are also in a one-to-one relationship with that issuer's associated [brand](#brand).

- ZCFMints give contract code a simpler interface to interact with an ERTP mint. Because ZCFMints encapsulate
  an internal ERTP mint, they have the same one-to-one relationships
  with an issuer and its associated brand. A ZCFMint can mint assets and assign them to a seat without having to escrow
  payments, and burn seat-associated assets without corresponding payout.

ZCFMints and ERTP mints do **not** have the same methods. Do not try to use ERTP methods on a ZCFMint or vice versa.
However, issuers and brands associated with either an ERTP mint or a ZCFMint are the same concepts and have the same methods.

For more information on ERTP mints, see the [ERTP Guide's Mint section](/ertp/guide/issuers-and-mints.md)
and the [ERTP API's Mint section](/ertp/api/mint.md). For more information about ZCFMints,
see the [ZCF API `zcf.makeZCFMint()`](/zoe/api/zoe-contract-facet.md#zcf-makezcfmint-keyword-assetkind-displayinfo).

## Moola

An imaginary currency Agoric documentation uses in examples.

## Non-fungible

A non-fungible asset is one where each incidence of the asset has unique individual properties and
is not interchangeable with another incidence. For example, if your asset is theater tickets, it matters to the buyer
what the date and time of the show is, which row the seat is in, and where in the row the
seat is (and likely other factors as well). You can't just give them any ticket in your supply,
as they are not interchangeable (and may have different prices). See also [fungible](#fungible).

## Notifier

A notifier provides a stream of updates describing changes to the state of an [offer](#offer) or other object.
For more information, see [Notifiers and Subscriptions](/guides/js-programming/notifiers.md).

## Object Capabilities

Objects have state, behavior, and references. Let's say Object A has references to Objects B
and C, while B and C do not have references to each other. Thus, A can communicate with B and C,
and B and C cannot communicate with each other. There is an effective zero-cost firewall between B and C.

An *object capability system* constrains how references are obtained. You can't get one just by
knowing the name of a global variable or a public class. You can only get a reference via:
- Creation: Functions that create objects get a reference to them.
- Construction: Constructors can endow their constructed objects with references, including inherited references.
- Introduction:
  - A has references to B and C.
  - B and C do *not* have references to each other
  - A sends B a reference to C.
    - B now has a reference to C and can communicate with C.

If references can only be obtained by creation, construction, or introduction, you may have a safe
system. If they can be obtained in any other way, your system is unsafe.

For more information, see [Douglas Crockford on Object Capabilities](https://frontendmasters.com/courses/good-parts-javascript-web/object-capabilities/).

## Offer

Users interact with contract instances by making offers. In Zoe, an offer consists of a [proposal](#proposal) (what
the offer making party is willing to give up and what they want in exchange) and [payments](#payment) corresponding
to the amount in the proposal they're willing to give. The payments are automatically [escrowed](#escrow) by Zoe, and reallocated
according to the contract code. An offer gets a [payout](#payout) of some combination of what the party originally contributed
and what others have contributed. The specific payout is determined by the contract code.

See [`E(Zoe).offer(invitation, proposal, paymentKeywordRecord, offerArgs)`](/zoe/api/zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord-offerargs).

## Offer Safety

Zoe guarantees offer safety. When a user makes an [offer](#offer) and its payments are [escrowed](#escrow) with Zoe, Zoe guarantees that
the user either gets what they said they wanted, or gets back what they originally offered and
escrowed (a refund). One reason this is possible is if a [proposal](#proposal) doesn't match what the contract expects to do, it
can immediately cause the [seat](#seat) to exit, getting back the amount it offered.

## Passable

A *passable* is something that can be marshalled (see the
[Marshaling section in the JavaScript Distributed Programming Guide](/guides/js-programming/far.md#marshaling-by-copy-or-by-presence)).

## Payment

Payments hold assets created by [mints](#mint), specifically assets intended for transfer
from one party to another. All assets of a payment are of the same [brand](#brand).

For more information, see the [ERTP Guide's Payments section](/ertp/guide/purses-and-payments.md#purses-and-payments)
and the [ERTP API's Payments section](/ertp/api/payment.md).

## Payout

The assets paid out to a user when an [seat](#seat) exits, either successfully or not. The payout is always
what the seat's current [allocation](#allocation) is.

If there was a previous reallocation, the payout is different than what the user escrowed. If there is no reallocation
before the seat exits, the payout is the same as what they escrowed.

## Petname

Petnames are your personal names for objects. No one else can see or modify a petname without your permission.
Think of them as similar to a phone's contacts list. The actual phone number is what a phone uses to call
someone, but to more easily tell who a number is associated with, it's assigned a petname, such
as Mom, Grandpa, Kate S., etc. In the Agoric platform, petnames are used in [wallets](#wallet).

## Presence

A local version of a remote object that serves as the remote object's proxy.
If `obj` is a presence of a remote object, you can send messages to the remote object by using `E()` on `obj`.
For more information, see the [JavaScript Distributed Programming Guide](/guides/js-programming/).

## Proposal

Proposals are records with `give`, `want`, and `exit` keys. [Offers](#offer) must include a proposal, which states
what asset you want, what asset you will give for it, and how/when the offer maker can cancel the offer
(see [Exit Rule](#exit-rule) for details on the last). For example:
```js
const myProposal = harden({
  give: { Asset: AmountMath.make(quatloosBrand, 4)},
  want: { Price: AmountMath.make(moolaBrand, 15) },
  exit: { onDemand: null }
})
```
`give` and `want` use [keywords](#keywords) defined by the contract. Each specifies via an [amount](#amounts) a description of what
they are willing to give or want to get.

## Purse

A purse holds [amounts](#amounts) of assets issued by a particular [mint](#mint) that are all of the same [brand](#brand) and generally _stationary_.
When transfer is desired, a purse can move part of its held balance to a [payment](#payment).

For more information, see the [ERTP Guide's Purses section](/ertp/guide/purses-and-payments.md#purses-and-payments) and the
[ERTP API's Purses section](/ertp/api/purse.md).

## Quatloos

An imaginary currency Agoric documentation uses in examples. For its origins, see the Wikipedia entry for the Star Trek
episode [The Gamesters of Triskelion](https://en.wikipedia.org/wiki/The_Gamesters_of_Triskelion).

## Reallocation

A transfer of [amounts](#amounts) between [seats](#seat) within Zoe; i.e. a change in their [allocations](#allocation). When a seat exits, it gets its
current allocation as a [payout](#payout).

## Seat

Zoe uses a seat to represent an [offer](#offer) in progress, and has two seat [facets](#facet) representing
two views of the same seat; a `ZCFSeat` and a `UserSeat`. The `UserSeat` is returned to the user who made an
offer, and can check [payout](#payout) status or retrieve their results. The `ZCFSeat` is the argument passed to
the `offerHandler` in the contract code. It is used within contracts and with [`zcf` methods](/zoe/api/zoe-contract-facet.md).

The two seat facets have slightly different methods but represent the same seat and offer in progress.
The term comes from the expression "having a seat at the table" with regards to participating in a negotiation.

For more details, see the [ZCFSeat documentation](/zoe/api/zoe-contract-facet.md#zcfseat-object) and
the [UserSeat documentation](/zoe/api/zoe.md#userseat-object).

## SES

Secure ECMAScript has been renamed to [Hardened JavaScript](#hardened-javascript-ses).

## Simoleons

An imaginary currency Agoric documentation uses in examples.

## Terms

Contract instances have associated terms, gotten via [`E(zoe).getTerms(instance)`](/zoe/api/zoe.md#e-zoe-getterms-instance),
which include the instance's associated [issuers](#issuer), [brands](#brand), and any custom terms. For
example, you might have a general auction contract. When someone instantiates it,
they provide terms applicable only to that instance. For some instances of
the auction, they want the minimum bid set at $1000. At other instances, they'd like
it set at $10. They can specify the instance's minimum bid amount in its terms.

## Value

Values are the part of an [amount](#amounts) that describe the value of something
that can be owned or shared: How much, how many, or a description of a unique asset, such as
Pixel(3,2), $3, or “Seat J12 for the show September 27th at 9:00pm”.
[Fungible](#fungible) values are usually
represented by natural numbers. Other values may be represented as strings naming a particular
rights, or an array of arbitrary objects representing the rights at issue. The latter two examples
are usually [non-fungible](#non-fungible) assets. Values must be [keys](#key).

For more information, see the [ERTP Guide's Value section](/ertp/guide/amounts.md#values).

## Vat

A vat is a unit of isolation.
Objects and functions in a JavaScript vat can communicate synchronously with one another. Vats and their contents can
communicate with other vats and their objects and functions, but can only communicate asynchronously.

For more information, see the [Vat section in the Distributed JS Programming Guide](/guides/js-programming/#vats-the-unit-of-synchrony)

## Wallet

The overall place a party keeps their assets of all brands. For example, your wallet might contain 5 Quatloos
[purses](#purse), 8 Moola purses, and 2 Simoleons purses. A wallet can distinguish between [issuers](#issuer).
Dapps can propose [offers](#offer) to a wallet. If a user accepts the offer proposal,
the wallet makes an offer on the user's behalf and deposits the [payout](#payout) in the user's [purses](#purse).
See the [Wallet Guide and API](/guides/wallet/).

## ZCF

*ZCF (Zoe Contract Facet)* is the [facet](#facet) of Zoe exposed to contract code. The Zoe
Contract Facet methods can be called synchronously by contract code.

See the [ZCF API](/zoe/api/zoe-contract-facet.md).

## ZCFMint

See [Mint](#mint).

## Zoe Helpers

A set of API helper methods for writing contracts. These methods extract common contract code and
patterns into reusable helpers. See the [Zoe Helpers API](/zoe/api/zoe-helpers.md).

## Zoe Service

A set of API methods for deploying and working with smart contracts. See [Zoe Service API](/zoe/api/zoe.md).
