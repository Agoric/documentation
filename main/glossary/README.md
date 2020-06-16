# Glossary

This page lists words, expressions, or concepts used by the Agoric technology stack.

## AllegedName
Human-readable name of a kind of rights. The alleged name should
not be trusted as an accurate depiction, since it is provided by
the maker of the mint and could be deceptive, but is useful for debugging and double-checking.

The AllegedName must be a string.
<a name="AmountMath"></a>
## AmountMath
AmountMath executes the logic of how amounts are changed when digital assets are merged, separated,
or otherwise manipulated. For example, a deposit of 2 bucks into a purse that already has 3 bucks 
gives a new balance of 5 bucks. An empty purse has 0 bucks. AmountMath relies heavily on polymorphic
[MathHelpers](#MathHelpers), which manipulate an `amount`'s [extent](#Extents) or unbranded portion.
See the [ERTP Guide's AmountMath section](https://agoric.com/documentation/ertp/guide/amount-math.html) for more information.

<a name="Amounts"></a>
## Amounts
Amounts are the canonical description of tradable goods. They are manipulated
by issuers and mints, and represent the goods and currency carried by purses and
payments. They can be used to represent things like currency, stock, and the
abstract right to participate in a particular exchange.

An amount is comprised of a [brand](#Brands) with an [extent](#Extents).

See the [ERTP Guide's Amounts section](https://agoric.com/documentation/ertp/guide/amounts.html) for more information.

## AssetHolder
Purses and Payments are AssetHolders.
<a name="Brands"></a>
## Brand
Identifies the kind of issuer, such as "quatloos", "moola", etc. Brands are also one of the two elements that 
make up an [amount](#Amounts).
See the [ERTP Guide's Brand section](https://agoric.com/documentation/ertp/guide/brand.html) for more information.

<a name="Comparable"></a>
## Comparable

A *passable* is something that can be marshalled. A *comparable* is a
passable whose leaves contain no promises. Two comparables can be
synchronously compared for structural equivalence.

A comparable is a JavaScript object containing no promises, and can
thus be locally compared for equality with another object. If either object
contains promises, equality is indeterminable. If both are fullfilled down
to Presences and local state, then either they're the same all the way
down, or they represent different objects.

## Contract and Contract Instance
In Agoric documentation, *contract* usually refers to a contract's source code that defines how the contract works, which is *installed* on Zoe. A contract is *instantiated* to create *contract instances*, which are run on Zoe and are the active execution of the contract code.  

For example, a realtor has a standard house selling agreement. The contract is the code defining how that agreement works. When the realtor has a new house to sell, they instantiate a new instance of their standard contract for that specific property. If they have ten houses for sale, they have ten different contract instances.

## ERTP
*Electronic Rights Transfer Protocol* is a uniform way of transferring tokens and other digital assets, both fungible and non-fungible, in JavaScript. All kinds of digital assets can easily be created and they can be all be transferred in exactly the same ways, with exactly the same security properties.

It uses [object capabilities](#OCAP) to enforce access control. Instead of having 
to prove ownership of a corresponding private key, if your program has a 
reference to an object, it can call methods on that object. If it doesn't 
have a reference, it can't. For more on object capabilities, see [Chip Morningstar's
post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

Key ERTP concepts include [Issuers](#Issuers), [Mints](#Mints), 
[Purses](#Purses), [Payments](#Payments), [Brands](#Brands), and [Amounts](#Amounts). Also 
see the [ERTP Introduction](https://agoric.com/documentation/getting-started/ertp-introduction.html)
and [ERTP Guide](https://agoric.com/documentation/ertp/guide/).

<a name="Extents"></a>
## Extent
Extents are the part of an [amount](#Amounts) that describe the extent of something
that can be owned or shared: How much, how many, or a description of a unique asset, such as
Pixel(3,2), $3 or ‘Right to occupy on Tuesdays’. [Fungible](#Fungible) extents are usually 
represented by natural numbers. Other extents may be represented as strings naming a particular
right, or an arbitrary object representing the rights at issue. The latter two examples 
are usually [non-fungible](#Non-fungible) assets. Extents must be [Comparable](#Comparable).

See the [ERTP Guide's Extent section](https://agoric.com/documentation/ertp/guide/extent.html) for more information.

<a name="Fungible"></a>
## Fungible
A fungible asset is one where all exemplars of the asset are interchangable. For example, if you 
have 100 one dollar bills and need to pay someone five dollars, it does not matter which
five one dollar bills you use. Also see [non-fungible](#Non-fungible).

## Handle
A handle is a unique identifier implemented as a JavaScript object. Only its identity is meaningful, so handles do not have properties. Unlike number or string identifiers, handles are unforgeable. This means the only way to know a handle identity is being given an object reference, and no identity can be guessed and no fake identity will succeed. 

For example, Zoe often uses `offerHandle` to refer to offers. Zoe contracts can use an offer's `offerHandle` as the key for requesting the current allocation of an offer or reallocating the offer's assets.
<a name="Issuers"></a>
## Issuer
Issuers are linked to a single [mint](#Mints) and vice versa, so each issuer works
with one and only one asset type, such as only working with quatloos or only working
with moola. They can create empty [purses](#Purses) and [payments](#Payments) for
their asset type, but cannot mint new [amounts](#Amounts). 

Issuers can also transform
payments of their asset type (splitting, combining, burning, and exclusively claiming
payments). An issuer from a trusted source can determine if an untrusted payment of
its asset type is valid. 

See the [ERTP Guide's Issuer section](https://agoric.com/documentation/ertp/guide/issuer.html) for more information.

<a name="MathHelpers"></a>
## MathHelpers
A set of methods for performing arithmetic operations on an [amount's](#Amounts) [extent](#Extents). 
[AmountMath](#AmountMath) uses MathHelpers to do extent arithmetic, after which it brands
the result to create a new [amount](#Amounts). For more information, see the 
[MathHelpers ERTP Guide entry](https://agoric.com/documentation/ertp/guide/math-helpers.html).
<a name="Mints"></a>
## Mint
In ERTP, mints create digital assets and are the only objects with the authority to do so. 
Access to a mint gives you the power to create more digital assets of its type at will. 
Mints are [issuer's](#Issuers) admin facets, and there is a one-to-one relationship between an issuer and
its mint.

See the [ERTP Guide's Mint section](https://agoric.com/documentation/ertp/guide/mint.html) for more information.

<a name="Non-fungible"></a>
## Non-fungible
A non-fungible asset is one where exemplars of the asset have unique individual properties and
are not interchangable. For example, if your asset is show tickets, it matters to the buyer 
what the date and time of the show is, which row the seat is in, and where in the row the 
seat is (likely with other factors as well). You can't just give them any ticket in your supply,
as they are not interchangable. See also [fungible](#Fungible).

## Notifier

You can track updates to contract state using a notifier. The notifier provides a
stream of updates describing changes to the state of an offer.

See more: [Notifier](/distributed-programming.md)
<a name="OCAP"></a>
## Object Capabilities

Objects have state, behavior, and references. Lets say Object A has references to Objects B and C, while B and C do not have references to each other. Thus, A can communicate with B and C, and B and C cannot commuicate with each other.
There is an effective zero-cost firewall between B and C.

An *object capability system* constrains how references are obtained. You can't get one just by knowing the name of a global variable or a public class. You can get a reference in only three ways. 
- Creation: Functions that create objects get a reference to them.
- Construction: Constuctors can endow their constructed objects with  references, including inherited references. 
- Introduction: 
  - A has references to B and C. 
  - B and C  do *not* have references to each other
  - A sends B a reference to C. 
    - B now has a reference to C and can communicate with C. 

If references can only be obtained by creation, construction, or introduction, you may have a safe system. If they can be obtained in any other way, your system is unsafe.

For more information, see [Douglas Crockford on Object Capabilities](https://frontendmasters.com/courses/good-parts-javascript-web/object-capabilities/).
<a name="Payments"></a>
## Payment
Payments hold [amounts](#Amounts) of certain rights **(tyg todo: I'd like to change "rights" to "assets". OK?)** 
issued by [Mints](#Mints). Specifically amounts that are *in transit* from one party to another. 
Amounts from payments can be deposited in [purses](#Purses), but otherwise, the entire amount is 
available when the payment is transferred. Payments can be converted to [Purses](#Purses). All contents 
of a purse must be of the same [brand](#Brands).

See the [ERTP Guide's Payments section](https://agoric.com/documentation/ertp/guide/issuer.html#payments)
for more information.

<a name="Presences"></a>
## Presence
A local version of a remote object that serves as a proxy for the remote object. 
If `obj` is a presence of a remote object, you can send messages to the remote object by using `E()` on `obj`. 
See the [JavaScript Distributed Programming Guide](https://agoric.com/documentation/distributed-programming.html) for more information. 
<a name="Purses"></a>
## Purse
Purses hold [amounts](#Amounts) of certain [mint](#Mints) issued rights **(tyg todo: Change "rights" to "assets"?)**. Specifically amounts that are _stationary_. Purses can transfer part of their held balance to a [payment](#Payments), which is usually used to transfer value. A purse's contents are all of the same [brand](#Brands).

See the [ERTP Guide's Purses section](https://agoric.com/documentation/ertp/guide/issuer.html#purses)
for more information.
<a name="Vats"></a>
## Vat

A vat is a *unit of synchrony*. This means that within a JavaScript vat, objects and functions can communicate with one another synchronously.

A vat runs a single *event loop*.

A physical machine can run one or several vats. A blockchain can run one or several communicating vats.

Different vats can communicate by sending asynchronous messages to other vats.

A vat is the moral equivalent of a Unix Process.


