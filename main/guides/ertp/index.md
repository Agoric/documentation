# ERTP Overview

ERTP (_Electronic Rights Transfer Protocol_) is Agoric's digital asset standard.

ERTP is a uniform way of transferring tokens and other digital assets in JavaScript. All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

For example, let's suppose Alice wants to buy a concert ticket from Bob for 10 bucks.

::: tip Watch: erights -- credibly transferable ownership (Oct 2024)
_25 minutes on ERTP at a conceptual level._
<br />

[<img src="./assets/alice-bob-ticket.png" alt="diagram of Alice, Bob, Ticket objects" />](https://www.youtube.com/watch?v=O8Bx_Abj9Qc&list=PLzDw4TTug5O1A-tkPJe4HVq0VBPcNOMHm)

:::

## Issuer, Brand, and Mint

We start by using `makeIssuerKit` to make a `Mint`, `Brand`, and `Issuer` for **Bucks**.

<<< @/../snippets/ertp/guide/test-readme.js#importErtp
<<< @/../snippets/ertp/guide/test-readme.js#declareShared
<<< @/../snippets/ertp/guide/test-readme.js#makeBucks

The `bucks.brand` and `bucks.issuer` don't let anyone mint new assets, so sharing
them widely is normal. We must be careful to guard the`bucksMint`, so we keep it separate.

::: tip see also ZCFMint (TODO)

...

:::

## Amount: Asset Descriptions

Next we combine the Bucks brand with a value to make an `Amount`:

<<< @/../snippets/ertp/guide/test-readme.js#bucksAmount

An Amount is a value labeled with a brand.
Amounts are descriptions of digital assets,
answering the questions "how much" and "of what kind".

Amounts have no economic scarcity or intrinsic value.

:::tip More on Asset Use versus Mention
_See also [The Settlers of Blockchain](https://agoric.com/blog/technology/the-settlers-of-blockchain) by Chris Hibbert, Jun 2021_
:::

## Minting Payments

Next we use the mint to make a `Payment` of 100 bucks for Alice:

<<< @/../snippets/ertp/guide/test-readme.js#bucksPayment100

Likewise, we make a **Tickets** issuer kit make payments of 10 **Tickets** and 100 **Bucks**
for Bob.

<<< @/../snippets/ertp/guide/test-readme.js#amountMathProps
<<< @/../snippets/ertp/guide/test-readme.js#bobPayments

Where Amounts only describe assets, Payments actually convey digital assets/rights.
Sending Payments must be done very carefully.

## Making Purses

Alice is acting as a buyer.
She can make her own empty purses using the shared issuers, which she relies on.
She depsits some **Bucks** that she is given into her Bucks purse.

<<< @/../snippets/ertp/guide/test-readme.js#aliceBuyer1

Purses also hold digital assets/rights.
**Purses are normally not sent betwen parties.**

## Credible Asset Transfer

To buy a ticket, she withdraws a payment of 10 bucks and make a `buy` request
to some vendor she was given.

<<< @/../snippets/ertp/guide/test-readme.js#aliceBuyer2

The seller has likewise created purses for **Bucks** and **Tickets** and made deposits.
When they get a `buy` request, the argument may be anything, so it's called `allegedPayment`.
But once they deposit it into their Bucks purse, they know it was
a valid Bucks payment, and they know the amount.
Provided the amount is sufficient, they withdraw a ticket (payment) and return it.

<<< @/../snippets/ertp/guide/test-readme.js#bobSeller

Now our buyer has an `allegedTicket`.
Once she deposits it in her **Tickets** purse, she knows it was
a valid payment and she knows its value. She can check that she
got at least 1 ticket.

<<< @/../snippets/ertp/guide/test-readme.js#aliceBuyer3

To put it all together:

<<< @/../snippets/ertp/guide/test-readme.js#aliceBuysFromBob

## Non-Fungible and Semi-Fungible Assets

::: tip: TODO: Non-Fungible and Semi-Fungible Assets

...

:::

## ERTP Concepts Overview

Each digital asset has Mint, Issuer, and Brand facets:

![ERTP Interfaces 1](./assets/ertp-interfaces-1.svg){ width=200 height=200 }

Use brands to make amounts.

Use a Mint to create Payments. Use an Issuer to make Purses.
Deposit payments into purses and withdraw them back out.

![ERTP makeIssuerKit API](./assets/ertp-interfaces-2.svg)

Fungible and non-fungible kinds of assets are handled uniformly.

![ERTP object relationships](./assets/ertp-interfaces-3.svg)

# Obsolete material

_aside from TODOs above_

token standard for transferring tokens and other digital assets in
JavaScript. Using the [ERTP API](/reference/ertp-api/),
you can easily create and use digital assets, all of which are
transferred exactly the same way and with exactly the same security properties.

ERTP uses [OCaps (object capabilities)](/glossary/#object-capabilities)
to enforce access control. If your program has a reference to an
object, it can call methods on that object. If it doesn't have a
reference, it can't. For more on object capabilities, see
[Chip Morningstar's post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

### Asset

There are three kinds of assets:
[fungible](/glossary/#fungible),
[non-fungible](/glossary/#non-fungible), and
[semi-fungible](/glossary/#semi-fungible).

Fungible assets are interchangeable. For example, if you have 100
one-dollar bills and need to pay someone 5 dollars, it doesn't matter
which five of your one-dollar bills you give them.

Non-fungible assets have the same brand, but are not interchangeable. For example, you might have 100
theater tickets. But someone wanting to buy even a General Admission ticket from you will want one
for a specific date and time. This might also affect the price; you'll want to charge more
for a Friday evening ticket than a Wednesday matinee ticket, even if it's for the same show.

Semi-fungible assets have distinct forms which are not interchangeable
with each other, but in which instances of a single form may interchangeable with
other instances of the same form.
For example, theater tickets for a single show might be partitioned into General Admission
and Balcony sections, where a holder may sit in any seat of the respective section.

### Amount

Assets are described by **[Amount](./amounts)** records consisting of a `brand` and a `value`.

- **[Brand](./amounts#brands)**: An asset's type.
  You can think of this as the answer to the question "What is it?" about an asset.
- **[AmountValue](./amounts#amountvalues)**: An asset's size.
  You can think of this as the answer to the questions "how many?" or "how much?" about an asset.

**Important**: Amounts are _descriptions_ of digital assets, not the actual assets. They have no
economic scarcity or intrinsic value.

So, using the fictional currency Quatloos, you could have an asset described as being "400 Quatloos",
where `400n` is the `value` and `Quatloos` is the `brand`. For now, we'll just look at fungible assets
whose values have to be non-negative integers represented as BigInts (thus the appended "n" on that `value`).

![ERTP object relationships](./assets/ertp-interfaces-3.svg)

### AmountMath

ERTP uses the **[AmountMath](./amount-math)** library for operations such as adding, subtracting,
and comparing amount values (such as when depositing to or withdrawing assets from a purse).

### Brand

Most ERTP objects have a permanent constraint to working with or on one specific
**[Brand](./amounts#brands)** established at their creation. If one is
initially associated with Quatloos, it always associated with Quatloos and Quatloos only.
In particular, a `brand` and its `mint` and its `issuer` are all in unchangeable respective
one-to-one relationships with each other.

- **[Mint](./issuers-and-mints#mints)**:
  The unique creator of digital assets of a particular `brand`.
- **[Issuer](./issuers-and-mints#issuers)**:
  The source of truth of how many digital assets each `purse` and `payment` holds. An `issuer`
  is used to validate `payments` received from untrusted parties for the `brand` with which
  it is associated.

<!-- ![ERTP object relationships](./assets/relationships1.svg)  -->

Let's look at an example. Suppose there is the "Quatloos" `brand`. That means there is also:

- A "Quatloos `mint`" that is the only ERTP `mint` that can ever create new Quatloos assets.
- A "Quatloos `issuer`" that is the only `issuer` that can create a new `purse` to contain Quatloos and
  operate on a `payment` containing Quatloos.

<!-- ![ERTP object relationships 2](./assets/relationships2.svg)  -->

![ERTP object relationships 2](./assets/ertp-interfaces-1.svg){ width=200 height=200 }

### Purses and Payments

We've already mentioned our final two concepts:

- **[Purse](./purses-and-payments#purses)**: An
  object for holding digital assets of a specific `brand`.
- **[Payment](./purses-and-payments#payments)**:
  An object for transferring digital assets of a specific `brand` to another party.

Similar to other component instances, a `purse` and a `payment` only work with one
`brand`. So a `purse` or `payment` that holds Quatloos cannot hold an asset of `brand` Moola or vice versa.
You cannot change the `brand` a `purse` or `payment` was originally associated with. Once you create a
Quatloos purse or Quatloos payment, it can never hold anything other than Quatloos.

However, these are not one-to-one relationships. There can be thousands or more
`purses` or `payments` that hold Quatloos or any other `brand`.

![ERTP object relationships](./assets/ertp-interfaces-2.svg)

## Method Naming Structure

ERTP methods use a template for their names. Knowing what a particular method name prefix represents
can help you when reading code. For consistency, you may want to also use this template for your Agoric
code.

- `make<Foo>()`: Creates a new Foo object and returns only that object.
- `make<Foo>Kit()`: Creates a new Foo object as well as other things. It returns some combination of useful things, usually including the new Foo object. But not always; sometimes Foo is conceptual, and, for example, instead of a single object, two facets are returned.
- `create<Foo>()`: Creates a new Foo, but doesn't return it.
- `get<Foo>()`: Returns a Foo that already exists.
- `provide<Foo>()`: If Foo already exists, returns it. If not, it creates a new Foo and returns that.

## Life of Assets

Let's look at some asset operation lifecycles. While it's very rare for an asset to be destroyed, as opposed to being
redistributed, these lifecycles show assets from their creation through common usage patterns. These are
deliberately stripped down to their basic, core, functionality. Optional parameters and non-core operations
are not shown, nor are some significant concepts which would make this introduction more confusing. Those
are covered on the component-specific pages.

### Asset Creation and Storage

![Asset creation](./assets/asset-creation.svg)

<<< @/../snippets/ertp/guide/test-readme.js#makeIssuerKit

First, you pass a string naming a new `brand` to
`makeIssuerKit()`. As noted above, a `make<Foo>Kit()` method creates both a new Foo, in this case an `issuer`, and some other things.
Here it also creates a new `mint` and formal `brand`
for the argument, and returns all three new objects. The `mint`, `issuer`, and `brand`
are all in unchangeable one-to-one relationships with each other.

In this case, you used the string 'quatloos' to name the `brand`.

<<< @/../snippets/ertp/guide/test-readme.js#seven

Here you use `AmountMath` to make a new `amount` description of the asset you want to create.
You need to specify what you want for the `value` of the new `amount`, in this case `7n`, as
well as what `brand` it will be.

This returns an `amount` description stored in `quatloosSeven`. Remember, an `amount` is only a description
of an asset, not an asset itself. `quatloosSeven` has no intrinsic value.

<<< @/../snippets/ertp/guide/test-readme.js#mintPayment

This mints a new asset of 7 Quatloos. In this case, since it's a `mint` operation, you are creating
a new digital asset of 7 Quatloos. It's returned as a `payment`, so you want a place to store it for
the longer term.

<<< @/../snippets/ertp/guide/test-readme.js#deposit

For long term storage, we prefer using a `purse`. `payments` are generally used to transfer assets rather than
hold them for extended periods. First you create a new empty `purse` for Quatloos using
the Quatloos associated `issuer`. Then you deposit the `payment` into the `purse`. When this happens,
the `payment` is automatically consumed and the 7 Quatloos are now resident
in the `purse`. If you'd used an existing `purse` that contained, say, 17 Quatloos, these 7 would have been
added to them so the `purse` balance would be 24 Quatloos.

### Transferring an Asset

![Asset transfer](./assets/asset-transfer.svg)
Start with your `quatloosPurse` that holds 7 Quatloos. You decide you want to send 5 Quatloos to
another party named Alice.

<<< @/../snippets/ertp/guide/test-readme.js#five

First you create a new Quatloos branded `amount` with a `value` of 5 to describe what you want to withdraw.
Remember, an `amount` is just a description of assets, not the actual assets.

<<< @/../snippets/ertp/guide/test-readme.js#withdraw

Now you tell your Quatloos containing `purse` that you want to withdraw the specified `amount` from
it. The withdrawn 5 Quatloos goes into a `payment`

You've got your `payment` for 5 Quatloos, but how do you get it to Alice? She needs to
do some work first so there's somewhere for her to put it and a way of getting it to
her rather than someone else.

<div class="language-js secondary">

<<< @/../snippets/ertp/guide/test-readme.js#depositFacet

</div>

Assume Alice already has a Quatloos `purse` of her own. To let other
parties safely deposit Quatloos into it, she creates
a [deposit facet](/glossary/#deposit-facet) for that `purse`.
Anyone who has access to a deposit facet can deposit
assets to its `purse` but cannot either make a withdrawal from the `purse` or get its balance. It's like
being able to send money to a friend via their email address; you can't then take money out
of your friend's accounts or find out how much is in them.

<div class="language-js secondary">

<<< @/../snippets/ertp/guide/test-readme.js#getId

</div>

Alice puts her deposit facet on Agoric's [Board](/glossary/#board-agoric-board),
a key-value "bulletin board" that lets her make it generally available for use.

The Board is a basic bulletin board type system where users can post an Id for a value and
others can get the value just by knowing the Id. Alice can make her Id(s) known by any
communication method she likes; private email, an email blast to a mailing list or many individuals,
buying an ad on a website, tv program, or newspaper, listing it on her website, etc.

<<< @/../snippets/ertp/guide/test-readme.js#getValue

Remember, ERTP's use of OCaps requires that you have access to an object in order
to run methods on it. So someone who wants to use Alice's deposit facet
has to first get it off the Board.

Alice tells you the Board Id associated with her Quatloos `purse` deposit facet. You get the Id associated value,
which gives you the reference to that deposit facet. You then just tell the facet to receive your `payment`
of 5 Quatloos.

Things end up with your Quatloos `purse` having 2 Quatloos (7 - 5), Alice's Quatloos `purse` having 5 more Quatloos
in it, and the 5 Quatloos `payment` consumed when the transfer happened.

The `E()` notation is a local "bridge" that lets you invoke methods on remote objects.
It takes a local representative (a [presence](/glossary/#presence)) for a remote object
as an argument and sends messages to the remote object. This is explained in more detail at the
[`E()` section in the Distributed JavaScript page](../js-programming/eventual-send).

## Creating and Using Non-Fungible Assets

Say you own the Agoric Theatre and want to sell tickets to seats for a play. Tickets are non-fungible assets,
as they refer to a specific seat for a specific show at a specific time and date. It matters to
buyers which ticket they get.

The Agoric Theatre has 1114 seats numbered `1` to `1114`.
An object representing a valid ticket has the properties:

- `seat`: A number.
- `show`: A string describing the show.
- `start`: A string representing a [time/date in ISO format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

<<< @/../snippets/ertp/guide/test-readme.js#ticketValues

To create tickets, you first create JavaScript objects that each represent a ticket.
Then, because you need to specify the amount of digital assets to be minted,
you can use `AmountMath` to make an amount. In this case, you're making tickets
for one performance of _Hamilton_.

<<< @/../snippets/ertp/guide/test-readme.js#makeTicketIssuer

As before, you use `makeIssuerKit()` to create a `mint` that can create Agoric Theatre ticket assets.
The difference from when you created a fungible asset is that you have to use a second argument,
in this case `AssetKind.SET`.

There are two `AssetKinds`. Each one polymorphically implements the same set of methods.

- `AssetKind.NAT`: Works with natural number `values` and fungible assets. Default value for `makeIssuerKit()`.
- `AssetKind.SET`: Used with non-fungible assets, operates on an array of records (objects) with keys and values.

<<< @/../snippets/ertp/guide/test-readme.js#ticketPayments

First you define an `amount` description for each ticket you want to issue.

Then you use your `mint` for the appropriate `brand` to create an asset for each ticket. Each ticket asset
is a separate `payment`. You can transfer and deposit a non-fungible asset `payment` just like a fungible one.

## Amounts Are Not Assets

**IMPORTANT**: Despite how it may seem, an `amount` is not an asset in and of itself.
It merely _describes_ assets along the two axes of what they are and how much there are (`brand` and `value`).
Amounts are used to negotiate without sending/sharing actual assets until a deal is made.

For example, if I want to make you an offer to buy an asset, let's say a magic sword in a game, I'll send you
an `amount` describing the asset of 5 Quatloos I'm willing to trade for your sword. I don't send you the actual
5 Quatloos; that only happens when we agree on the trade terms and I send you a `payment` of 5 Quatloos, the
actual asset.
If you reject my offer, I can change it so the `amount` I specify is for 10 Quatloos. I haven't added actual
assets of 5 Quatloos to what I send you, only the description of assets in the offer I'm making for the sword.

Making a new `amount` does not create any new assets. Nor does adding two `amounts`, since an `amount` is immutable, the
addition just creates a new `amount` while the original two still exist.
ERTP assets can only be created by their `mint` returning a new `payment` containing them.
Since an `amount` is just a description of an asset, it's like a drawing of a ten dollar bill, while
an `asset` is analogous to an actual ten dollar bill printed by an authorized facility with value
derived from its government backing.

In other words, I don't make you an offer that I'll sell you a ticket to _Hamilton_ for $300 by sending you an actual ticket any more than you'd send me $300 before finding out what I'm willing to give you for it. Instead,
I make you an offer by sending a description
of what I'm willing to swap ("I will exchange a _Hamilton_ ticket for $300").
If the offer is accepted, **then** I send you the actual asset (enjoy the show!) and you send me the actual $300 (I'll enjoy spending it!).
In the Agoric stack, assets of the exchange are escrowed with [Zoe](/guides/zoe/).

## Object Capabilities and ERTP

ERTP uses [object capabilities](/glossary/#object-capabilities).
You can only use an object and issue commands to it if you have access to that object, not
just its human-readable name or similar. For example, I might know (or make a good guess),
that the mint that makes Quatloos has the human-understandable alleged name of 'quatloos-mint'.
But unless I have the actual `mint` object associated with the `quatloos` `brand` object, I
can't use it to create a million Quatloos and bet them all on Captain Kirk to win his gladiatorial
match on [Triskelion](https://en.wikipedia.org/wiki/The_Gamesters_of_Triskelion).

## Security Properties

ERTP `purses` have a `deposit` method which takes a `payment`
as its argument. It first checks that the `payment` is
genuine and the same asset `brand` as the `purse`

If everything passes the checks, the asset moves from
the `payment` to the `purse`. If there's a problem, it throws an error.

After a successful deposit, ERTP guarantees:

- The `payment` is deleted from its `issuer`'s records and no longer has any assets associated with it.
- Its `issuer` no longer recognizes that `payment`.
- The `purse` contains all digital assets that were in the `payment`.

When the `deposit` call throws an error (i.e. something went wrong), ERTP guarantees
that neither the `purse` nor the alleged `payment` are affected by it.

In addition, you can create a [deposit facet](/glossary/#deposit-facet) for any `purse`. This is an object associated
with a specific `purse` that can be sent to another party instead of a reference to the `purse`.
The security advantage is that the other party can only use the deposit facet to make deposits to the associated `purse`. They cannot use it to make a withdrawal from or ask about the balance of a `purse`.

## Promises

Several ERTP methods are _asynchronous_ and instead of immediately returning their expected value, return a _promise_ for that value.

JavaScript implements `Promise` objects, and recently added the two keywords `async` and `await` to simplify working with them. For general, and extensive, information about JavaScript's implementation, see [javascript.info](https://javascript.info/async) or [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).
