# Glossary

This page lists words, expressions, or concepts used by the Agoric technology stack.

## AllegedName
Human-readable name of a kind of rights. The alleged name should
not be trusted as an accurate depiction, since it is provided by
the maker of the mint and could be deceptive, but is useful for debugging and double-checking.

The AllegedName must be a string.

## AmountMath
AmountMath executes the logic of how amounts are changed when digital assets are merged, separated, or otherwise manipulated. For example, a deposit of 2 bucks into a purse that already has 3 bucks gives a new balance of 5 bucks. An empty purse has 0 bucks. AmountMath relies heavily on polymorphic MathHelpers, which manipulate the unbranded portion.

## Amounts
Amounts are the canonical description of tradable goods. They are manipulated
by issuers and mints, and represent the goods and currency carried by purses and
payments. They can be used to represent things like currency, stock, and the
abstract right to participate in a particular exchange.

An amount is composed of a `Brand` with an `Extent`.

## AssetHolder
Purses and Payments are AssetHolders.

## Brand
Identifies the kind of issuer.

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
Electronic Rights Transfer Protocol - Agoric's fungible and
nonfungible token standard that uses object capabilities to enforce
access control. Instead of having to prove ownership of a
corresponding private key, in the world of object capabilities, if
your program has a reference to an object, it can call methods on that
object. If it doesn't have a reference, it can't. For more on object
capabilities, see [Chip Morningstar's
post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

## Extent
Extents describe the extent of something that can be owned or shared: How much, how many, or description of unique asset. (Pixel(3,2), $3 or ‘Right to occupy on Tuesdays’). Fungible extents are normally represented by natural numbers. Other extents may be represented as strings naming a particular right, or an arbitrary object that sensibly represents the rights at issue.

Extent must be Comparable.

## Handle
A handle is a unique identifier implemented as a JavaScript object. Only its identity is meaningful, so handles do not have properties. Unlike number or string identifiers, handles are unforgeable. This means the only way to know a handle identity is being given an object reference, and no identity can be guessed and no fake identity will succeed. 

For example, Zoe often uses `offerHandle` to refer to offers. Zoe contracts can use an offer's `offerHandle` as the key for requesting the current allocation of an offer or reallocating the offer's assets.

## Issuer
Can create empty purses and payments, but cannot mint new amounts. Issuers can also transform payments (splitting, combining, burning, and claiming payments exclusively). You should get an issuer from a trusted source and then rely on it to determine if an untrusted payment is valid. Issuers are linked to a single mint and vice versa, so each issuer only works with one type of thing, such as only working with quatloos or only working with moola.

## MathHelpers
Arithmetic on extents. MathHelpers are used by AmountMath to do their extent arithmetic, and then brand the result, making a new amount.

## Mint
The admin facet of the issuer, and the only object with the authority
to mint new digital assets.

## Notifier

You can track updates to contract state using a notifier. The notifier provides a
stream of updates describing changes to the state of an offer.

See more: [Notifier](/distributed-programming.md)

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

## Payment
An [AssetHolder](#assetholder). Payments hold amounts of certain rights issued by Mints, specifically amounts that are in _transit_. Amounts from payments can be deposited in purses, but otherwise, the entire amount is available when the payment is transferred. Payments can be converted to Purses.

See more: [Payment API](/ertp/api/payment.md)

## Presence
A local version of a remote object that serves as a proxy for the remote object. 

## Purse
An [AssetHolder](#assetholder). Purses hold amounts of certain rights issued by Mints, specifically amounts that are _stationary_. Purses can transfer part of the balance they hold in a payment, which has a narrower interface.

See more: [Purse API](/ertp/api/purse.md)

## Vat

A vat is a *unit of synchrony*. This means that within a JavaScript vat, objects and functions can communicate with one another synchronously.

A vat runs a single *event loop*.

A physical machine can run one or several vats. A blockchain can run one or several communicating vats.

Different vats can communicate by sending asynchronous messages to other vats.

A vat is the moral equivalent of a Unix Process.


