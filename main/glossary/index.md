---
sidebar: auto
---

# Glossary

This page lists words, expressions, or concepts used by the Agoric technology stack.

## Agoric CLI

A command line interface for initializing, deploying, and starting Agoric projects, as well as installing dependencies. See the [Agoric CLI documentation](/guides/agoric-cli/) for more information.

## AllegedName

Human-readable name of a type of assets. The alleged name should
not be trusted as an accurate depiction, since it is provided by
the maker of the mint and could be deceptive, but is useful for debugging and double-checking.

The AllegedName must be a string.

## Allocation

Allocations represent the [amounts](#amount) to be paid out to each [seat](#seat) on exit from a contract instance. Possible
exit causes are exercising an exit condition, the contract's explicit choice, or a crash or freeze. There are several methods
for getting the amounts currently allocated.

In more detail, Zoe's guarantee is each [seat](#seat) will either get what it asked for in its offer, or the return of what was [escrowed](#escrow).
The contract can reallocate fairly arbitrarily to achieve that. As contract code is visible to its clients, users can see
what the contract intends to do.

Zoe enforces those terms by keeping track of a current allocation for each seat. The initial allocation is the deposit.
The contract can modify a seat's allocation as long as it never violates offer safety or rights conservation. i.e. it can't
assign assets that weren't already in some allocation and it can't assign them to more than one seat. Also, goods can't
disappear from the total allocation.

## Amount

Amounts are the canonical descriptions of tradable goods. They are manipulated
by [issuers](#issuer) and [mints](#mint), and represent the goods and currency carried by
[purses](#purse) and [payments](#payment). They represent things like currency, stock, and the
abstract right to participate in a particular exchange.

An amount is comprised of a [brand](#brand) with a [value](#amountvalue). For example, "4 Quatloos"
is an amount with a value of "4" and a brand of the imaginary currency "Quatloos".

**Important**: Amounts are _descriptions_ of digital assets, not the actual assets. They have no
economic scarcity or intrinsic value.
For example, to make you an offer to buy a magic sword in a game,
a party sends you an amount describing the asset of 5 Quatloos they're willing to trade for your
sword. They don't send you the actual 5 Quatloos; that only happens when there is agreement on the
trade terms and they send you a payment, not an amount, of 5 Quatloos, the actual asset. Creating
a new `amount` does **not** create new assets.

For more information, see the [ERTP documentation's Amounts section](/guides/ertp/amounts)
and the [ERTP API's AmountMath section](/reference/ertp-api/amount-math).

## AmountMath

The AmountMath library executes the logic of how [amounts](#amount) are changed when digital assets are merged, separated,
or otherwise manipulated. For example, a deposit of 3 [Quatloos](#quatloos) into a purse that already has 7 Quatloos
updates its balance to 10 Quatloos. But a deposit of a non-fungible theater ticket into a purse that already holds
five tickets is performed by set union rather than by arithmetic.

`AmountMath` has a single set of polymorphic methods that deal with different asset kinds:

- `AssetKind.NAT`: Used with [fungible](#fungible) assets.
  Each amount value is a natural number (non-negative integer).
  This is the default `AssetKind`.
- `AssetKind.SET`: Used with [non-fungible](#non-fungible) assets;
  deprecated in favor of `AssetKind.COPY_SET` but still in wide use.
  Each amount value is an array of [Key](#key) values
  subject to the same constraints as those of `AssetKind.COPY_SET`.
- `AssetKind.COPY_SET`: Used with [non-fungible](#non-fungible) assets.
  Each amount value is a set of [Key](#key) values
  (strings, numbers, objects, etc.).
  Amount values cannot include promises (they aren't keys), and should not
  include privileged objects such as payments and purses.
- `AssetKind.COPY_BAG`: Used with [semi-fungible](#semi-fungible) assets.
  Each amount value is a [multiset](https://en.wikipedia.org/wiki/Multiset)
  of [Key](#key) values subject to the same constraints as
  those of `AssetKind.COPY_SET` but allowed to be present more than once.

For more information, see the [ERTP documentation's AmountMath section](/guides/ertp/amount-math)
and the [ERTP API's AmountMath section](/reference/ertp-api/amount-math).

<a id="value"></a>

## AmountValue

An AmountValue is the part of an [Amount](#amount) that describes the value of something
that can be owned or shared: how much, how many, or a description of a unique asset, such as
\$3, Pixel(3,2), or “Seat J12 for the show September 27th at 9:00pm”.
For a [fungible](#fungible) Amount, the AmountValue is usually a non-negative **BigInt** such as `10n` or `137n`.
For a [non-fungible](#non-fungible) Amount, the AmountValue might be a [CopySet](/guides/js-programming/far#pass-styles-and-harden) containing strings naming particular rights or objects representing the rights directly.

For more information, see the [ERTP documentation's AmountValue section](/guides/ertp/amounts#amountvalues).

## AssetHolder

[Purses](#purse) and [payments](#payment) are AssetHolders. These are objects that contain
digital assets in the quantity specified by an [amount](#amount).

## BigInt

In [ERTP AmountMath](/guides/ertp/amount-math), we use the JavaScript [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type for the `value` of fungible amounts in order to avoid overflow risks from using the usual JavaScript `Number` type.

[Timer Services](/reference/repl/timerServices) also use `BigInt` for absolute and relative times.

`BigInt`s are written with an `n` suffix: `0n`, `1n`, `2n`, ... or created with `BigInt("123")`
or `BigInt(123)`.

## Board (Agoric Board)

The Board is a shared, on-chain location where users can post a value and make it
accessible to others. When a user posts a value, they receive a unique ID for the value.
Others can get the value just by knowing the ID. You can make an ID known by any
communication method&mdash;a DM or email or other private message, a phone call/voicemail,
an email blast to a mailing list, publishing it on a website, etc.

**Note**: Publishing an object to the board makes it publicly accessible. If this is not
appropriate for an object, do not use the board to communicate access to it.

## Brand

Identifies the type of [issuer](#issuer), such as "[Quatloos](#quatloos)",
"[Moola](#moola)", etc. Brands are one of the two elements that
make up an [amount](#amount).
For more information, see the [ERTP documentation's Brand section](/guides/ertp/amounts#brands)
and the [ERTP API's Brand section](/reference/ertp-api/brand).

## Bundle

Before a contract can be installed on Zoe, its source code must be bundled. This is done by:

```js
import bundleSource from '@endo/bundle-source';
const atomicSwapBundle = await bundleSource(
  require.resolve('@agoric/zoe/src/contracts/atomicSwap'),
);
```

The installation operation returns an `installation`, which is an object with a single
`getBundle()` method for accessing an installed contract's source code.
In most cases, the bundle contains a base64-encoded zip file that you can
extract for review.

```js
const { endoZipBase64 } = await E(installation).getBundle();
```

```sh
echo "$endoZipBase64" | base64 -d > bundle.zip
unzip bundle.zip
```

## Burn

Destroy digital assets. Burning a [payment](#payment) additionally makes it
unavailable for later use. See
[anIssuer.burn()](/reference/ertp-api/issuer#anissuer-burn-payment-optamount).

## Comparable

Comparable is a deprecated synonym of [Key](#key).

## Continuing Invitation Pattern

A continuing invitation presumes a previous offer
whose result includes capabilities to make further
invitations. See [`source: 'continuing'`](/guides/getting-started/contract-rpc#source-continuing) in [Specifying Offers](/guides/getting-started/contract-rpc#specifying-offers) for details.

## Contract Installation and Contract Instance

In Agoric documentation, _contract_ usually refers to a contract's source code that
defines how the contract works. A contract's source code is _installed_ on Zoe. A
contract is _instantiated_ to create _contract instances_, which are the active
execution of a contract's code running on Zoe.

For example, a realtor has a standard house selling agreement. The contract is the
code defining how that agreement works. When the realtor has a new house to sell,
they instantiate a new instance of their standard contract for that specific property.
If they have ten houses for sale, they have ten different contract instances.

## CopyArray

A [hardened](#harden) acyclic array in which each element is [passable](#passable), such as
`harden(['foo', 'bar'])`.
For more information, see the
[Marshaling section in the JavaScript Distributed Programming Guide](/guides/js-programming/far#marshaling-by-copy-or-by-presence).

## CopyRecord

A [hardened](#harden) acyclic plain object [dictionary](https://en.wikipedia.org/wiki/Associative_array)
in which each key is a string and each value is [passable](#passable), such as
`harden({ keys: [0, 1], values: ['foo', 'bar'] })`.
For more information, see the
[Marshaling section in the JavaScript Distributed Programming Guide](/guides/js-programming/far#marshaling-by-copy-or-by-presence).

## Creator Invitation

An [invitation](#invitation) optionally returned by [`E(zoe).startInstance(...)`](/reference/zoe-api/zoe#e-zoe-startinstance-installation-issuerkeywordrecord-terms-privateargs) that the contract instance
creator can use. It is usually used in contracts where the creator immediately
sells something (auctions, swaps, etc.).

## Deposit Facet

A [facet](#facet) of a [purse](#purse). Anyone with a reference to its deposit facet object can add
appropriately branded assets to the purse, but cannot withdraw assets from the purse or find out its balance.

## dIBC

Dynamic version of the [Inter-Blockchain Communication](#ibc) protocol.
For more details, see the [agoric-sdk `network` package](https://github.com/Agoric/agoric-sdk/tree/master/packages/network).

## E()

(Also referred to as _eventual send_) `E()` is a local "bridge" function that
asynchronously invokes methods on local or remote objects, for example those
in another vat, machine, or blockchain. It takes as its argument either a local object
or a [presence](#presence) for a remote object or a promise for a local or remote object, and
sends messages to the object using normal message-sending syntax. The local proxy forwards all messages to the remote object to deal with.
All `E()` calls return a promise for the eventual result. For more detail, see
the [`E()` section in the Distributed JavaScript page](/guides/js-programming/eventual-send).

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
Guide](https://github.com/endojs/endo/blob/HEAD/packages/ses/docs/guide.md)

## ERTP

_Electronic Rights Transfer Protocol_ is a uniform way of transferring tokens and other digital assets,
both [fungible](#fungible) and [non-fungible](#non-fungible), in JavaScript. All kinds of digital assets
can easily be created and they can be all be transferred in exactly the same ways, with exactly the same security properties.

It uses [object capabilities](#object-capabilities) to enforce access control. Instead of having
to prove ownership of a corresponding private key, if your program has a
reference to an object, it can call methods on that object. If it doesn't
have a reference, it can't. For more on object capabilities, see [this post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

Key ERTP concepts include [Issuers](#issuer), [Mints](#mint),
[Purses](#purse), [Payments](#payment), [Brands](#brand), and [Amounts](#amount). Also
see the [ERTP documentation](/guides/ertp/) and [ERTP API documentation](/reference/ertp-api/).

## Escrow

To give assets for a possible transaction to an impartial third party, who keeps them until specified conditions are satisfied.
For example, Alice wants to sell Bob a ticket for $100. Alice escrows the ticket, and Bob escrows the $100, with Zoe. Zoe
does not give Alice the \$100 or Bob the ticket until it has both items. Since neither Alice nor Bob ever holds both items at
once, they don't have to trust each other to do the transaction. Zoe automatically escrows payments for transaction offers.

## Eventual Send

See [`E()`](#e) above.

## Exit Rule

An object specifying how an [offer](#offer) can be cancelled, such as on demand or by a deadline.
For details, see [`E(zoe).offer(...)`](/reference/zoe-api/zoe#proposals).

## Facet

A _facet_ is an object that exposes an API or particular view of some larger entity, which may be an object itself.
You can make any number of facets of an entity. In JavaScript, you often make a facet that forwards method calls:

```js
import { Far } from '@endo/far';
const facet = Far('FacetName', {
  myMethod: (...args) => oldObject.method(...args),
});
```

Two Agoric uses are:

- _Deposit Facet_: A facet of a [purse](#purse). Anyone with a reference to its deposit facet object can add
  appropriately branded assets to the purse, but cannot withdraw assets from the purse or find out its balance.
- _Public Facet_: A set of methods and properties for an object that a developer chooses to be publicly visible and usable.

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
its [section in the JavaScript Distributed Programming Guide](https://github.com/endojs/endo/blob/HEAD/packages/ses/docs/guide.md)

## Hardened JavaScript (SES)

Hardened JavaScript is a standards-track extension to the JavaScript standard.
Hardening JavaScript turns the sandbox into firm ground, where you can run code
you don't completely trust, without being vulnerable to their bugs or bad
intentions.
See the [Endo and Hardened JavaScript Programming
Guide](https://github.com/endojs/endo/blob/HEAD/packages/ses/docs/guide.md) for more details.

## IBC

The Inter-Blockchain Communication protocol, used by blockchains to communicate with each other.
For more details, see [What developers need to know about inter-blockchain communication](https://www.computerweekly.com/blog/Open-Source-Insider/What-developers-need-to-know-about-inter-blockchain-communication).

## Intercahin Account (ICA)

Interchain accounts on Agoric enable an Agoric smart contract to control an account on another blockchain within the Cosmos ecosystem facilitated by [Agoric Orchestration API](#orchestration). This feature leverages the [Inter-Blockchain Communication (IBC)](#ibc) protocol to facilitate interactions and transactions across different blockchains seamlessly.

## Invitation

A [payment](#payment) whose amount represents (and is required for) participation in a contract instance.
Contracts often return a creator invitation on their instantiation, in case the contract instantiator wants
to immediately participate. Otherwise, the contract instance must create any additional invitations.
Every [offer](#offer) to participate in a contract instance must include an invitation to that instance in the first argument to [`E(zoe).offer(...)`](/reference/zoe-api/zoe#e-zoe-offer-invitation-proposal-paymentpkeywordrecord-offerargs), and any wallet receiving one will validate it via the [InvitationIssuer](#invitationissuer).

An invitation's [amount](#amount) includes the following properties:

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
their asset type, but cannot mint new [amounts](#amount). Issuers can also transform
payments of their asset type (splitting, combining, burning, and exclusively claiming
payments). An issuer from a trusted source can determine if an untrusted payment of
its asset type is valid.

For more information, see the [ERTP documentation's Issuer section](/guides/ertp/issuers-and-mints)
and the [ERTP API's Issuer section](/reference/ertp-api/issuer).

## Key

A _Key_ is a [passable](#passable) containing no promises or errors, and can
thus be synchronously compared for structural equivalence with another piece of data.
If either side of the comparison contains promises and/or errors, equality is indeterminable.
If both are fulfilled down to [presences](#presence) and local state, then either they're the
same all the way down, or they represent different objects.

Keys can be used as elements of CopySets and CopyBags and as keys of CopyMaps (see [AmountMath](#amountmath)). [AmountValues](#amountvalue) must be Keys.

## Keyword

A _Keyword_ is a string that is an ASCII-only [identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier),
starts with an upper case letter, and is not equal to "NaN" or "Infinity".
See **[Zoe Data Types](/reference/zoe-api/zoe-data-types#keyword)**.

## Mint

[ERTP](#ertp) has a _mint_ object, which creates digital assets. [ZCF](#zcf) provides a different interface to an ERTP mint, called a
_ZCFMint_. Assets and AssetHolders created using ZCFMints can be used in all the same ways as assets created by other ERTP Mints.
They interact with Purses, Payments, Brands, and Issuers in the same ways.

- ERTP mints create digital assets and are the only ERTP objects with the authority to do so.
  Access to an ERTP mint gives you the power to create more digital assets of its type at will. Mints
  can only create one type of asset and cannot change to create a different type.

  There is a one-to-one relationship between an [issuer](#issuer) and its mint, and a mint is an administrative [facet](#facet) of its issuer.
  ERTP mints are also in a one-to-one relationship with that issuer's associated [brand](#brand).

- ZCFMints give contract code a simpler interface to interact with an ERTP mint from inside a contract.
  Because ZCFMints encapsulate an internal ERTP mint, they have the same one-to-one relationships
  with an issuer and its associated brand. A ZCFMint can mint assets and assign them to a seat without having to escrow
  payments, and burn seat-associated assets without corresponding payout.

ZCFMints and ERTP mints do **not** have the same methods. Do not try to use ERTP methods on a ZCFMint or vice versa.
However, issuers and brands associated with either an ERTP mint or a ZCFMint are the same concepts and have the same methods.

For more information on ERTP mints, see the [ERTP documentation's Mint section](/guides/ertp/issuers-and-mints)
and the [ERTP API's Mint section](/reference/ertp-api/mint). For more information about ZCFMints,
see the [ZCF API `zcf.makeZCFMint()`](/reference/zoe-api/zoe-contract-facet#zcf-makezcfmint-keyword-assetkind-displayinfo).

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
For more information, see [Notifiers and Subscriptions](/guides/js-programming/notifiers).

## Object Capabilities

Objects have state, behavior, and references. Let's say Object A has references to Objects B
and C, while B and C do not have references to each other. Thus, A can communicate with B and C,
and B and C cannot communicate with each other. There is an effective zero-cost firewall between B and C.

An _object capability system_ constrains how references are obtained. You can't get one just by
knowing the name of a global variable or a public class. You can only get a reference via:

- Creation: Functions that create objects get a reference to them.
- Construction: Constructors can endow their constructed objects with references, including inherited references.
- Introduction:
  - A has references to B and C.
  - B and C do _not_ have references to each other
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

See [Offers](/guides/zoe/proposal).

## Offer Safety

Zoe guarantees offer safety. When a user makes an [offer](#offer) and its payments are [escrowed](#escrow) with Zoe, Zoe guarantees that
the user either gets what they said they wanted, or gets back what they originally offered and
escrowed (a refund). One reason this is possible is if a [proposal](#proposal) doesn't match what the contract expects to do, it
can immediately cause the [seat](#seat) to exit, getting back the amount it offered.

## Orchestration 

Orchestration API is a tool to help developers build seamless applications out of disparate interoperable chains and services.
This composability allows for the development of user-centric applications
 that leverage the unique strengths of different blockchain ecosystems.
Orchestration integrates with existing Agoric components ([SwingSet](/guides/platform/#swingset), Cosmos modules) and introduces
 vat-orchestration. This [vat](/glossary/#vat) manages Inter-Chain Account (ICA) identities and connections to host
  chains, ensuring proper transaction authorization.

## Passable

A _passable_ is something that can be sent to and from remote objects.
Passables include pass-by-copy primitive values such as numbers and strings and
pass-by-reference values such as Remotables and Promises.
Passables also include [CopyArrays](#copyarray) and [CopyRecords](#copyrecord), which are
[hardened](#harden) acyclic pass-by-copy containers that
recursively terminate in non-container passables.

For more information, see the
[Marshaling section in the JavaScript Distributed Programming Guide](/guides/js-programming/far#marshaling-by-copy-or-by-presence).

## Payment

Payments hold assets created by [mints](#mint), specifically assets intended for transfer
from one party to another. All assets of a payment are of the same [brand](#brand).

For more information, see the [ERTP documentation's Payments section](/guides/ertp/purses-and-payments#payments)
and the [ERTP API's Payments section](/reference/ertp-api/payment).

## Payout

The assets paid out to a user when an [seat](#seat) exits, either successfully or not. The payout is always
what the seat's current [allocation](#allocation) is.

If there was a reallocation, the payout may be different than what the user escrowed
(but still constrained by [offer safety](#offer-safety)).
Otherwise, the payout is the same as what they escrowed.

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

Proposals are records with `give`, `want`, and/or `exit` properties respectively
expressing [offer](#offer) conditions regarding what assets will be given,
what is desired in exchange (protected by [offer safety](#offer-safety)), and
an [exit rule](#exit-rule) defining how/when the offer can be canceled.
For example:

```js
const myProposal = harden({
  give: { Asset: AmountMath.make(quatloosBrand, 4n) },
  want: { Price: AmountMath.make(moolaBrand, 15n) },
  exit: { onDemand: null },
});
```

`give` and `want` each associate [Keywords](#keyword) defined by the contract with corresponding [Amounts](#amount) describing respectively what will be given and what is being requested in exchange.

See [Offers](/guides/zoe/proposal).

## Purse

A purse holds [amounts](#amount) of assets issued by a particular [mint](#mint) that are all of the same [brand](#brand), often for arbitrarily long periods of time.
When transfer is desired, a purse can move part of its held balance to a [payment](#payment).

For more information, see the [ERTP documentation's Purses section](/guides/ertp/purses-and-payments#purses-and-payments) and the
[ERTP API's Purses section](/reference/ertp-api/purse).

## Quatloos

An imaginary currency Agoric documentation uses in examples. For its origins, see the Wikipedia entry for the Star Trek
episode [The Gamesters of Triskelion](https://en.wikipedia.org/wiki/The_Gamesters_of_Triskelion).

## Reallocation

A transfer of [amounts](#amount) between [seats](#seat) within Zoe; i.e. a change in their [allocations](#allocation). When a seat exits, it gets its
current allocation as a [payout](#payout).

## Seat

Zoe uses a seat to represent an [offer](#offer) in progress, and has two seat [facets](#facet) representing
two views of the same seat; a `ZCFSeat` and a `UserSeat`. The `UserSeat` is returned to the user who made an
offer, and can check [payout](#payout) status or retrieve their results. The `ZCFSeat` is the argument passed to
the `offerHandler` in the contract code. It is used within contracts and with [`zcf` methods](/reference/zoe-api/zoe-contract-facet).

The two seat facets have slightly different methods but represent the same seat and offer in progress.
The term comes from the expression "having a seat at the table" with regards to participating in a negotiation.

For more details, see the [ZCFSeat documentation](/reference/zoe-api/zcfseat) and
the [UserSeat documentation](/reference/zoe-api/user-seat).

## Semi-fungible

A semi-fungible asset is one that has distinct forms which are not interchangeable
with each other, but in which instances of a single form may interchangeable with
other instances of the same form.
As a variation on the [non-fungible](#non-fungible) theater ticket example, tickets
might specify only a section, where the holder may sit in any seat of that section.
For each section, the number of theater tickets minted should not exceed the number
of seats in that section.

## SES

Secure ECMAScript has been renamed to [Hardened JavaScript](#hardened-javascript-ses).

## Simoleons

An imaginary currency Agoric documentation uses in examples.

## Terms

Contract instances have associated terms, gotten via [`E(zoe).getTerms(instance)`](/reference/zoe-api/zoe#e-zoe-getterms-instance),
which include the instance's associated [issuers](#issuer), [brands](#brand), and any custom terms. For
example, you might have a general auction contract. When someone instantiates it,
they provide terms applicable only to that instance. For some instances of
the auction, they want the minimum bid set at $1000. At other instances, they'd like
it set at $10. They can specify the instance's minimum bid amount in its terms.

For example, see [starting the offer-up contract](/guides/zoe/contract-walkthru.html#starting-a-contract-instance).

## Vat

A vat is a unit of isolation.
Objects and functions in a JavaScript vat can communicate synchronously with one another. Vats and their contents can
communicate with other vats and their objects and functions, but can only communicate asynchronously.

For more information, see the [Vat section in the Distributed JS Programming documentation](/guides/js-programming/#vats-the-unit-of-synchrony).

## Wallet

The overall place a party keeps their assets of all brands. For example, your wallet might contain 5 Quatloos
[purses](#purse), 8 Moola purses, and 2 Simoleons purses. A wallet can distinguish between [issuers](#issuer).
Dapps can propose [offers](#offer) to a wallet. If a user accepts the offer proposal,
the wallet makes an offer on the user's behalf and deposits the [payout](#payout) in the user's [purses](#purse).
See the [Wallet Guide and API](/guides/wallet/).

## ZCF

_ZCF (Zoe Contract Facet)_ is the [facet](#facet) of Zoe exposed to contract code. The Zoe
Contract Facet methods can be called synchronously by contract code.

See the [ZCF API](/reference/zoe-api/zoe-contract-facet).

## ZCFMint

See [Mint](#mint).

## Zoe Helpers

A set of API helper methods for writing contracts. These methods extract common contract code and
patterns into reusable helpers. See the [Zoe Helpers API](/reference/zoe-api/zoe-helpers).

## Zoe Service

A set of API methods for deploying and working with smart contracts. See [Zoe Service API](/reference/zoe-api/zoe).
