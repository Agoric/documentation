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
or otherwise manipulated. For example, a deposit of 2 bucks into a purse that already has 3 bucks
gives a new balance of 5 bucks. But, a deposit of a non-fungible theater ticket into a purse that already holds
five tickets isn't done by numeric addition. Instead, you have to combine two arrays, containing either
strings or objects/records.

`AmountMath` has a single set of polymorphic
methods of two different asset kinds to deal with [fungible](#fungible) assets (values are natural numbers) and
[non-fungible](#non-fungible) assets (values are an array or object). The two `AssetKinds` are
- `AssetKind.NAT`: Used with fungible assets. Amount values are natural numbers (non-negative integers). Default value.
- `AssetKind.SET`: Used with non-fungible assets. Amount values are
  arrays of strings, numbers, objects, or other comparable values.
  Values should never include promises (they aren't comparable), or
  payments, purses, and anything else that can't be shared freely.

For more information, see the [ERTP Guide's AmountMath section](/ertp/guide/amount-math.md)
and the [ERTP API's AmountMath section](/ertp/api/amount-math.md).

## Amounts
Amounts are the canonical description of tradable goods. They are manipulated
by [issuers](#issuer) and [mints](#mint), and represent the goods and currency carried by
[purses](#purse) and [payments](#payment). They represent things like currency, stock, and the
abstract right to participate in a particular exchange.

An amount is comprised of a [brand](#brand) with an [value](#value). For example, "4 quatloos"
is an amount with a value of "4" and a brand of the imaginary currency "quatloos".

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
communication method; private email, a DM or other private message, a phone call/voicemail,
an email blast to a mailing list or many individuals, listing it on a website, etc.

## Brand
Identifies the kind of [issuer](#issuer), such as "quatloos", "moola", etc. Brands are one of the two elements that
make up an [amount](#amounts).
For more information, see the [ERTP Guide's Brand section](/ertp/guide/amounts.md)
and the [ERTP API's Brand section](/ertp/api/brand.md).

## Bundle

Before a contract can be installed on Zoe, its source code must be bundled. This is done by:
```
import bundleSource from '@agoric/bundle-source';
const atomicSwapBundle = await bundleSource(
    require.resolve('@agoric/zoe/src/contracts/atomicSwap'),
);
```
The installation operation returns
an `installation`, which is an object with one method; `getBundle()`. You can access an installed contract's source
code via `const { source } = await E(installation).getBundle();`.
In many cases, the bundled source is a single reviewable string.
In others, the bundle contains to base 64 encoded zip file that you can
extract for review.
```
jq -r .endoZipBase64 bundle.json | base64 -d > bundle.zip
unzip bundle.zip
```


## Burn

Destroy all digital assets in a payment. See [`issuer.burn(payment, optAmount)`](/ertp/api/issuer.md#issuer-burn-payment-optamount).

## Comparable

A *passable* is something that can be marshalled. A *comparable* is a
passable whose leaves contain no promises. Two comparables can be
synchronously compared for structural equivalence.

A comparable is a JavaScript object containing no promises, and can
thus be locally compared for equality with another object. If either object
contains Promises, equality is indeterminable. If both are fulfilled down
to Presences and local state, then either they're the same all the way
down, or they represent different objects.

## Contract and Contract Instance
In Agoric documentation, *contract* usually refers to a contract's source code that
defines how the contract works. A contract's source code is *installed* on Zoe. A
contract is *instantiated* to create *contract instances*, which are the active
execution of a contract's code running on Zoe.

For example, a realtor has a standard house selling agreement. The contract is the
code defining how that agreement works. When the realtor has a new house to sell,
they instantiate a new instance of their standard contract for that specific property.
If they have ten houses for sale, they have ten different contract instances.

## CreatorInvitation

An [invitation](#invitation) optionally returned by `startInstance()` that the contract instance
creator can use. It is usually used in contracts where the creator immediately
sells something (auctions, swaps, etc.).

## Deposit Facet

A [facet](#facet) of a [purse](#purse). Anyone with a reference to its deposit facet object can add
appropriately branded assets to the purse, but cannot withdraw assets from the purse or find out its balance.

## dIBC

Dynamic version of the [Inter-Blockchain Communication](#ibc) protocol.
See [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md) for more details.

## E()

(Also referred to as *eventual send*) `E()` is a local "bridge" function that invokes methods on remote objects, for example
in another vat, machine, or blockchain. It takes a local representative (a proxy) for a remote object as an argument and
sends messages to it using normal message-sending syntax. The local proxy forwards all messages to the remote object to deal with.
All `E()` calls return a promise for the eventual returned value. For more detail, see
the [`E()` section in the Distributed JavaScript page](/guides/js-programming/eventual-send.md).

## Endo

What Node.js does for JavaScript, Endo does for [Hardened
JavaScript](#hardened-javascript).
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
- `afterDeadline`: The offer is automatically cancelled after a deadline, as determined by its timer and deadline properties.

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
To participate in a contract instance, one must hold an invitation to do so. Contracts often
return a creator invitation on their instantiation, in case the contract instantiator wants
to immediately participate. Otherwise, the contract instance must create any additional invitations.
These, or any invitation held by a party, are distributed by sending it to someone's wallet. When you receive
an invitation, your wallet will validate it via the [InvitationIssuer](#invitationissuer). Note that
the invitation is a [`Payment`](#payment), and so is associated with a specific [`Issuer`](#issuer).

To participate in a contract instance by making an [offer](#offer), an invitation to that instance must accompany the offer.

An `invitation`'s amount includes the following properties:
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
with one and only one asset type, such as only working with quatloos or only working
with moola. This association cannot change to another type.

Issuers can create empty [purses](#purse) for
their asset type, but cannot mint new [amounts](#amounts). Issuers can also transform
payments of their asset type (splitting, combining, burning, and exclusively claiming
payments). An issuer from a trusted source can determine if an untrusted payment of
its asset type is valid.

For more information, see the [ERTP Guide's Issuer section](/ertp/guide/issuers-and-mints.md)
and the [ERTP API's Issuer section](/ertp/api/issuer.md).

## Keywords

Keywords are unique identifiers per contract. They tie together the [proposal](#proposal), [payments](#payment)
to be [escrowed](#escrow), and [payouts](#payout) to the user by serving as keys for key-value pairs in various
records with values of [amounts](#amounts), [issuers](#issuer), etc.

## Mint

[ERTP](#ertp) has a *mint* object, which creates digital assets. [ZCF](#zcf) provides a different interface to an ERTP mint, called a
*ZCFMint*. Assets and AssetHolders created using ZcfMints can be used in all the same ways as assets created by other ERTP Mints.
They interact with Purses, Payments, Brands, and Issuers in the same ways.

- ERTP mints create digital assets and are the only ERTP objects with the authority to do so.
  Access to an ERTP mint gives you the power to create more digital assets of its type at will. Mints
  can only create one type of asset and cannot change to create a different type.

  ERTP mints are [issuer's](#issuer) admin [facets](#facet), and there is a one-to-one relationship between an issuer and
  its mint. ERTP mints are also in a one-to-one relationship with that issuer's associated [brand](#brand).

- ZCFMints give contract code a simpler interface to interact with an ERTP mint. Because ZCFMints encapsulate
  an internal ERTP mint, they have the same one-to-one relationships
  with an issuer and its associated brand. A ZCFMint can mint assets and assign them to a seat without having to escrow
  payments, and burn assets that used to be associated with a seat without having to payout assets.

ZCFMints and ERTP mints do **not** have the same methods. Do not try to use ERTP methods on a ZCFMint or vice versa.
However, issuers and brands associated with either an ERTP mint or a ZCFMint are the same concepts and have the same methods.

For more information on ERTP mints, see the [ERTP Guide's Mint section](/ertp/guide/issuers-and-mints.md)
and the [ERTP API's Mint section](/ertp/api/mint.md). For more information about ZCFMints,
see the [zcfMakeZCFMint() API entry](/zoe/api/zoe-contract-facet.md) in the Zoe Contract Facet API.

## Moola
An imaginary currency Agoric documentation uses in examples.

## Non-fungible
A non-fungible asset is one where each incidence of the asset has unique individual properties and
is not interchangeable with another incidence. For example, if your asset is show tickets, it matters to the buyer
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
the user either gets what they said they wanted, or gets back (gets a refund) what they originally offered and
escrowed. One reason this is possible is if a [proposal](#proposal) doesn't match what the contract expects to do, it
can immediately cause the [seat](#seat) to exit, getting back the amount it offered.

## Payment

Payments hold assets created by [Mints](#mint). Specifically assets intended for transfer
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
```
const myProposal = harden({
  give: { Asset: AmountMath.make(quatloosBrand, 4)},
  want: { Price: AmountMath.make(moolaBrand, 15) },
  exit: { 'onDemand' }
})
```
`give` and `want` use [keywords](#keywords) defined by the contract. Each specifies via an [amount](#amounts), a description of what
asset they are willing to give/want to get, and how much of it.

## Purse
Purses hold [amounts](#amounts) of a certain [mint](#mint) issued assets. Specifically amounts that are _stationary_.
Purses can transfer part of their held balance to a [payment](#payment), which is usually used to transfer value.
A purse's contents are all of the same [brand](#brand).

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
offer, and can check payouts' status or retrieve their results. The `ZCFSeat` is the argument passed to
the `offerHandler` in the contract code. It is used within contracts and with `zcf.` methods.

The two seat facets have slightly different methods but represent the same seat and offer in progress.
The term comes from the expression "having a seat at the table" with regards to participating in a negotiation.

For more details, see the [ZCFSeat documentation](/zoe/api/zoe-contract-facet.md#zcfseat-object) and
the [UserSeat documentation](/zoe/api/zoe.md#userseat-object).

## SES

We have renamed SES to [Hardened JavaScript](#hardened-javascript-ses).

## Simoleons
An imaginary currency Agoric documentation uses in examples.

## Terms
Contract instances have associated terms, gotten via `E(zoe).getTerms(instance)`,
which include the instance's associated [issuers](#issuer), [brands](#brand), and any custom terms. For
example, you might have a general auction contract. When someone instantiates it,
they provide terms applicable only to that instance. For some instances of
the auction, they want the minimum bid set at $1000. At other instances, they'd like
it set at $10. They can specify the instance's minimum bid amount in its terms.

## Value

Values are the part of an [amount](#amounts) that describe the value of something
that can be owned or shared: How much, how many, or a description of a unique asset, such as
Pixel(3,2), $3, or 'Seat J12 for the show September 27th at 9:00pm'.
[Fungible](#fungible) values are usually
represented by natural numbers. Other values may be represented as strings naming a particular
rights, or an array of arbitrary objects representing the rights at issue. The latter two examples
are usually [non-fungible](#non-fungible) assets. Values must be [Comparable](#comparable).

For more information, see the [ERTP Guide's Value section](/ertp/guide/amounts.md#values).

## Vat
A vat is a unit of isolation.
Objects and functions in a JavaScript vat can communicate synchronously with one another. Vats and their contents can
communicate with other vats and their objects and functions, but can only communicate asynchronously.

For more information, see the [Vat section in the Distributed JS Programming Guide](/guides/js-programming/#vats-the-unit-of-synchrony)

## Wallet

The overall place a party keeps their assets of all brands. For example, your wallet might contain 5 Quatloos
[purses](#purse), 8 Moola purses, and 2 Simoleons purses. A wallet can distinguish between [Issuers](#issuer).
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
