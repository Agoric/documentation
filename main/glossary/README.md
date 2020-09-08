# Glossary

This page lists words, expressions, or concepts used by the Agoric technology stack.

## AllegedName
Human-readable name of a kind of rights. The alleged name should
not be trusted as an accurate depiction, since it is provided by
the maker of the mint and could be deceptive, but is useful for debugging and double-checking.

The AllegedName must be a string.

## Allocation

Allocations represent the amounts to be paid out to each [seat](#seat) on exit. Possible exits are exercising 
an exit condition, the contract's explicit choice, or a crash or freeze. There are several methods for finding
out what amount a current allocation is. 

In more detail, Zoe's guarantee is each seat will either get what it asked for in its offer, or the return of what was deposited.
The contract can reallocate fairly arbitrarily to achieve that. As contract code is visible to its clients, users can see
what the contract intends to do.

Zoe enforces those terms by keeping track of a current allocation for each seat. The initial allocation is the deposit. 
The contract can modify a seat's allocation as long as it never violates offer safety or rights conservation. i.e. it can't 
assign assets that weren't already in some allocation and it can't assign them to more than one seat. Also, goods can't 
disappear from the total allocation.

## AmountMath
AmountMath executes the logic of how amounts are changed when digital assets are merged, separated,
or otherwise manipulated. For example, a deposit of 2 bucks into a purse that already has 3 bucks 
gives a new balance of 5 bucks. An empty purse has 0 bucks. AmountMath relies heavily on polymorphic
[MathHelpers](#mathhelpers), which manipulate an `amount`'s [value](#value) or unbranded portion. 
Standard natural number operations cannot be used on values, since they can be an array or object. 
See the [ERTP Guide's AmountMath section](https://agoric.com/documentation/ertp/guide/amount-math.html) 
and the [ERTP API's AmountMath section](https://agoric.com/documentation/ertp/api/amount-math.html) for more information.

## Amounts
Amounts are the canonical description of tradable goods. They are manipulated
by [issuers](#issuer) and [mints](#mint), and represent the goods and currency carried by
[purses](#purse) and [payments](#payment). They represent things like currency, stock, and the
abstract right to participate in a particular exchange.

An amount is comprised of a [brand](#brand) with an [value](#value). For example, "4 quatloos"
is an amount with a value of "4" and a brand of the imaginary currency "quatloos".

See the [ERTP Guide's Amounts section](https://agoric.com/documentation/ertp/guide/amounts.html) 
and the [ERTP API's AmountMath section](https://agoric.com/documentation/ertp/api/amount-math.html) 
for more information.

## AssetHolder
[Purses](#purse) and [payments](#payment) are AssetHolders. These are objects that contain [amounts](#amount).

## Brand
Identifies the kind of [issuer](#issuer), such as "quatloos", "moola", etc. Brands are one of the two elements that 
make up an [amount](#amount).
See the [ERTP Guide's Brand section](https://agoric.com/documentation/ertp/guide/brand.html)
and the [ERTP API's Brand section](https://agoric.com/documentation/ertp/api/brand.html) for more information.

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
*Electronic Rights Transfer Protocol* is a uniform way of transferring tokens and other digital assets, both [fungible](#fungible) and [non-fungible](#non-fungable), in JavaScript. All kinds of digital assets can easily be created and they can be all be transferred in exactly the same ways, with exactly the same security properties.

It uses [object capabilities](#object-capabilities) to enforce access control. Instead of having 
to prove ownership of a corresponding private key, if your program has a 
reference to an object, it can call methods on that object. If it doesn't 
have a reference, it can't. For more on object capabilities, see [this post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

Key ERTP concepts include [Issuers](#issuer), [mints](#mint), 
[Purses](#purse), [Payments](#payment), [Brands](#brand), and [Amounts](#amount). Also 
see the [ERTP Introduction](https://agoric.com/documentation/getting-started/ertp-introduction.html),
[ERTP Guide](https://agoric.com/documentation/ertp/guide/), and [ERTP API](https://agoric.com/documentation/ertp/api/).

## Facet

A particular view or API of an object. An object can have many facets.

## Fungible
A fungible asset is one where all exemplars of the asset are interchangable. For example, if you 
have 100 one dollar bills and need to pay someone five dollars, it does not matter which
five one dollar bills you use. Also see [non-fungible](#non-fungible).

## Handle
A handle is a unique identifier implemented as a JavaScript object. Only its identity is meaningful, so handles do not have properties. Unlike number or string identifiers, handles are unforgeable. This means the only way to know a handle identity is being given an object reference, and no identity can be guessed and no fake identity will succeed. 

For example, Zoe often uses `offerHandle` to refer to offers. Zoe contracts can use an offer's `offerHandle` as the key for requesting the current allocation of an offer or reallocating the offer's assets.

## Issuer
Issuers are linked to a single [mint](#mint) and vice versa, so each issuer works
with one and only one asset type, such as only working with quatloos or only working
with moola. They can create empty [purses](#purse) and [payments](#payment) for
their asset type, but cannot mint new [amounts](#amount). 

Issuers can also transform
payments of their asset type (splitting, combining, burning, and exclusively claiming
payments). An issuer from a trusted source can determine if an untrusted payment of
its asset type is valid. 

See the [ERTP Guide's Issuer section](https://agoric.com/documentation/ertp/guide/issuer.html)
and the [ERTP API's Issuer section](https://agoric.com/documentation/ertp/api/issuer.html) for more information.

## MathHelpers
MathHelpers are methods for performing arithmetic operations on an [amount's](#amount) [value](#value). 
[AmountMath](#amountmath) uses MathHelpers to do value arithmetic, after which it [brands](#brand)
the result to create a new [amount](#amount). For more information, see the 
[MathHelpers ERTP Guide section](https://agoric.com/documentation/ertp/guide/math-helpers.html) and
the [MathHelpers ERTP API section](https://agoric.com/documentation/ertp/api/math-helpers.html).

## Mint
In ERTP, mints create digital assets and are the only objects with the authority to do so. 
Access to a mint gives you the power to create more digital assets of its type at will. Mints
can only create one type of asset. 

Mints are [issuer's](#issuer) admin facets, and there is a one-to-one relationship between an issuer and
its mint.

See the [ERTP Guide's Mint section](https://agoric.com/documentation/ertp/guide/mint.html) 
and the [ERTP API's Mint section](https://agoric.com/documentation/ertp/api/mint.html) for more information.

## Non-fungible
A non-fungible asset is one where each incidence of the asset has unique individual properties and
is not interchangable with another incidence. For example, if your asset is show tickets, it matters to the buyer 
what the date and time of the show is, which row the seat is in, and where in the row the 
seat is (and likely other factors as well). You can't just give them any ticket in your supply,
as they are not interchangable (and may even have different prices). See also [fungible](#fungible).

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
Payments hold [amounts](#amount) of certain assets 
issued by [Mints](#mint). Specifically amounts that are *in transit* from one party to another. 
Amounts from payments can be deposited in [purses](#purse), but otherwise, the entire amount is 
available when the payment is transferred. Payments can be converted to [Purses](#purse). All contents 
of a purse must be of the same [brand](#brand).

See the [ERTP Guide's Payments section](https://agoric.com/documentation/ertp/guide/issuer.html#payments)
and the [ERTP API's Payments section](https://agoric.com/documentation/ertp/api/payment.html#payment-getallegedbrand) 
for more information.

## Presence
A local version of a remote object that serves as a proxy for the remote object. 
If `obj` is a presence of a remote object, you can send messages to the remote object by using `E()` on `obj`. 
See the [JavaScript Distributed Programming Guide](https://agoric.com/documentation/distributed-programming.html) for more information. 

## Purse
Purses hold [amounts](#amount) of certain [mint](#mint) issued assets. Specifically amounts that are _stationary_. Purses can transfer part of their held balance to a [payment](#payment), which is usually used to transfer value. A purse's contents are all of the same [brand](#brand).

See the [ERTP Guide's Purses section](https://agoric.com/documentation/ertp/guide/issuer.html#purses) and the
[ERTP API's Purses section](https://agoric.com/documentation/ertp/api/purse.html)
for more information.

## Seat

Zoe uses seats to represent offers, and has two seat [facets](#facet)  a ZCFSeat and a UserSeat.

Seats represent active offers and let contracts and users interact with them. ZCFSeats are used 
within contracts and with `zcf.` methods. User seats represent offers external to Zoe and the 
contract. The party who exercises an invitation and sends the `offer()` message to Zoe 
gets a UserSeat that can check payouts' status or retrieve their results.

## Value

Values are the part of an [amount](#amount) that describe the value of something
that can be owned or shared: How much, how many, or a description of a unique asset, such as
Pixel(3,2), $3, or ‘Right to occupy on Tuesdays’. [Fungible](#fungible) values are usually 
represented by natural numbers. Other values may be represented as strings naming a particular
right, or an arbitrary object representing the rights at issue. The latter two examples 
are usually [non-fungible](#nonfungible) assets. Values must be [Comparable](#comparable).

See the [ERTP Guide's Value section](https://agoric.com/documentation/ertp/guide/value.html) for more information.

## Vat

A vat is a *unit of synchrony*. This means that within a JavaScript vat, objects and functions can communicate with one another synchronously.

A vat runs a single *event loop*.

A physical machine can run one or several vats. A blockchain can run one or several communicating vats.

Different vats can communicate by sending asynchronous messages to other vats.

A vat is the moral equivalent of a Unix Process.

