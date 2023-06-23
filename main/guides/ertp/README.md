# ERTP Overview

ERTP (*Electronic Rights Transfer Protocol*)
is Agoric's token standard for transferring tokens and other digital assets in
JavaScript. Using the [ERTP API](/reference/ertp-api/),
you can easily create and use digital assets, all of which are
transferred exactly the same way and with exactly the same security properties. 

ERTP uses [OCaps (object capabilities)](../../glossary/#object-capabilities)
to enforce access control. In an Ocaps system, there aren't any
Access Control Lists(ACLs). Instead, your capabilities are defined by the object references you hold. 
Thus, if your program has a reference to an
object, it can call methods on that object. If it doesn't have a
reference, it can't. For more on object capabilities, see
[Chip Morningstar's post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

## ERTP Concepts Overview

### Asset

There are three kinds of assets:
[fungible](../../glossary/#fungible),
[non-fungible](../../glossary/#non-fungible), and
[semi-fungible](../../glossary/#semi-fungible).

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

Assets are described by **[Amount](./amounts.md)** records consisting of a `brand` and a `value`.
- **[Brand](./amounts.md#brands)**: An asset's type.
  You can think of this as the answer to the question "What is it?" about an asset.
- **[Value](./amounts.md#values)**:  An asset's size.
  You can think of this as the answer to the questions "how many?" or "how much?" about an asset.

**Important**: Amounts are *descriptions* of digital assets, not the actual assets. They have no
economic scarcity or intrinsic value.

So, using the fictional currency Quatloos, you could have an asset described as being "400 Quatloos",
where `400n` is the `value` and `Quatloos` is the `brand`. For now, we'll just look at fungible assets
whose values have to be non-negative integers represented as BigInts (thus the appended "n" on that `value`). 

### AmountMath

ERTP uses the **[AmountMath](./amount-math.md)** library for operations such as adding, subtracting,
and comparing amount values (such as when depositing to or withdrawing assets from a purse).

### Brand

Most ERTP objects have a permanent constraint to working with or on one specific
**[Brand](./amounts.md#brands)** established at their creation. If one is
initially associated with Quatloos, it always associated with Quatloos and Quatloos only.
In particular, a `brand` and its `mint` and its `issuer` are all in unchangeable respective
one-to-one relationships with each other.
- **[Mint](./issuers-and-mints.md#mints)**:
  The unique creator of digital assets of a particular `brand`.
- **[Issuer](./issuers-and-mints.md#issuers)**:
  The source of truth of how many digital assets each `purse` and `payment` holds. An `issuer`
  is used to validate `payments` received from untrusted parties for the `brand` with which
  it is associated.

![ERTP object relationships](./assets/relationships1.svg) 

Let's look at an example. Suppose there is the "Quatloos" `brand`. That means there is also:
- A "Quatloos `mint`" that is the only ERTP `mint` that can ever create new Quatloos assets.
- A "Quatloos `issuer`" that is the only `issuer` that can create a new `purse` to contain Quatloos and 
  operate on a `payment` containing Quatloos.

![ERTP object relationships 2](./assets/relationships2.svg) 

### Purses and Payments

We've already mentioned our final two concepts:
- **[Purse](./purses-and-payments.md#purses)**: An
  object for holding digital assets of a specific `brand`.
- **[Payment](./purses-and-payments.md#payments)**:
  An object for transferring digital assets of a specific `brand` to another party.

Similar to other component instances, a `purse` and a `payment` only work with one
`brand`. So a `purse` or `payment` that holds Quatloos cannot hold an asset of `brand` Moola or vice versa. 
You cannot change the `brand` a `purse` or `payment` was originally associated with. Once you create a
Quatloos purse or Quatloos payment, it can never hold anything other than Quatloos.

However, these are not one-to-one relationships. There can be thousands or more
`purses` or `payments` that hold Quatloos or any other `brand`.

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

<<< @/snippets/ertp/guide/test-readme.js#makeIssuerKit

First, you pass a string naming a new `brand` to
`makeIssuerKit()`. As noted above, a `make<Foo>Kit()` method creates both a new Foo, in this case an `issuer`, and some other things.
Here it also creates a new `mint` and formal `brand` 
for the argument, and returns all three new objects. The `mint`, `issuer`, and `brand` 
are all in unchangeable one-to-one relationships with each other.

In this case, you used the string 'quatloos' to name the `brand`.

<<< @/snippets/ertp/guide/test-readme.js#seven

Here you use `AmountMath` to make a new `amount` description of the asset you want to create.
You need to specify what you want for the `value` of the new `amount`, in this case `7n`, as
well as what `brand` it will be.

This returns an `amount` description stored in `quatloosSeven`. Remember, an `amount` is only a description
of an asset, not an asset itself. `quatloosSeven` has no intrinsic value.

<<< @/snippets/ertp/guide/test-readme.js#mintPayment

This mints a new asset of 7 Quatloos. In this case, since it's a `mint` operation, you are creating
a new digital asset of 7 Quatloos. It's returned as a `payment`, so you want a place to store it for 
the longer term. 

<<< @/snippets/ertp/guide/test-readme.js#deposit

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

<<< @/snippets/ertp/guide/test-readme.js#five

First you create a new Quatloos branded `amount` with a `value` of 5 to describe what you want to withdraw.
Remember, an `amount` is just a description of assets, not the actual assets.

<<< @/snippets/ertp/guide/test-readme.js#withdraw

Now you tell your Quatloos containing `purse` that you want to withdraw the specified `amount` from 
it. The withdrawn 5 Quatloos goes into a `payment`

You've got your `payment` for 5 Quatloos, but how do you get it to Alice? She needs to
do some work first so there's somewhere for her to put it and a way of getting it to
her rather than someone else.

<div class="language-js secondary">

<<< @/snippets/ertp/guide/test-readme.js#depositFacet

</div>

Assume Alice already has a Quatloos `purse` of her own. To let other
parties safely deposit Quatloos into it, she creates
a [deposit facet](../../glossary/#deposit-facet) for that `purse`.
Anyone who has access to a deposit facet can deposit
assets to its `purse` but cannot either make a withdrawal from the `purse` or get its balance. It's like
being able to send money to a friend via their email address; you can't then take money out
of your friend's accounts or find out how much is in them.

<div class="language-js secondary">

<<< @/snippets/ertp/guide/test-readme.js#getId

</div>

Alice puts her deposit facet on Agoric's [Board](/glossary/#board-agoric-board),
a key-value "bulletin board" that lets her make it generally available for use.

The Board is a basic bulletin board type system where users can post an Id for a value and
others can get the value just by knowing the Id. Alice can make her Id(s) known by any
communication method she likes; private email, an email blast to a mailing list or many individuals,
buying an ad on a website, tv program, or newspaper, listing it on her website, etc.

<<< @/snippets/ertp/guide/test-readme.js#getValue

Remember, ERTP's use of OCaps requires that you have access to an object in order 
to run methods on it. So someone who wants to use Alice's deposit facet 
has to first get it off the Board.
 
Alice tells you the Board Id associated with her Quatloos `purse` deposit facet. You get the Id associated value,
which gives you the reference to that deposit facet. You then just tell the facet to receive your `payment`
of 5 Quatloos. 

Things end up with your Quatloos `purse` having 2 Quatloos (7 - 5), Alice's Quatloos `purse` having 5 more Quatloos
in it, and the 5 Quatloos `payment` consumed when the transfer happened.

The `E()` notation is a local "bridge" that lets you invoke methods on remote objects.
It takes a local representative (a [presence](../../glossary/#presence)) for a remote object
as an argument and sends messages to the remote object. This is explained in more detail at the
[`E()` section in the Distributed JavaScript page](../js-programming/eventual-send.md).

## Creating and Using Non-Fungible Assets

Say you own the Agoric Theatre and want to sell tickets to seats for a play. Tickets are non-fungible assets, 
as they refer to a specific seat for a specific show at a specific time and date. It matters to
buyers which ticket they get.

The Agoric Theatre has 1114 seats numbered `1` to `1114`.
An object representing a valid ticket has the properties:
- `seat`: A number.
- `show`: A string describing the show.
- `start`: A string representing a [time/date in ISO format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).

<<< @/snippets/ertp/guide/test-readme.js#ticketValues

To create tickets, you first create JavaScript objects that each represent a ticket.
Then, because you need to specify the amount of digital assets to be minted, 
you can use `AmountMath` to make an amount. In this case, you're making tickets
for one performance of *Hamilton*.

<<< @/snippets/ertp/guide/test-readme.js#makeTicketIssuer

As before, you use `makeIssuerKit()` to create a `mint` that can create Agoric Theatre ticket assets. 
The difference from when you created a fungible asset is that you have to use a second argument,
in this case `AssetKind.SET`.

There are two `AssetKinds`. Each one polymorphically implements the same set of methods. 
- `AssetKind.NAT`: Works with natural number `values` and fungible assets. Default value for `makeIssuerKit()`.
- `AssetKind.SET`: Used with non-fungible assets, operates on an array of records (objects) with keys and values.

<<< @/snippets/ertp/guide/test-readme.js#ticketPayments

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

In other words, I don't make you an offer that I'll sell you a ticket to *Hamilton* for $300 by sending you an actual ticket any more than you'd send me $300 before finding out what I'm willing to give you for it. Instead,
I make you an offer by sending a description
of what I'm willing to swap ("I will exchange a *Hamilton* ticket for $300").
If the offer is accepted, **then** I send you the actual asset (enjoy the show!) and you send me the actual $300 (I'll enjoy spending it!).
In the Agoric stack, assets of the exchange are escrowed with [Zoe](/guides/zoe/).

## Object Capabilities and ERTP

ERTP uses [object capabilities](../../glossary/#object-capabilities).
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

In addition, you can create a [deposit facet](../../glossary/#deposit-facet) for any `purse`. This is an object associated
with a specific `purse` that can be sent to another party instead of a reference to the `purse`.
The security advantage is that the other party can only use the deposit facet to make deposits to the associated `purse`. They cannot use it to make a withdrawal from or ask about the balance of a `purse`.

## Promises

Several ERTP methods are *asynchronous* and instead of immediately returning their expected value, return a *promise* for that value.

JavaScript implements `Promise` objects, and recently added the two keywords `async` and `await` to simplify working with them. For general, and extensive, information about JavaScript's implementation, see [javascript.info](https://javascript.info/async) or [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).


## Table of Content
* ### ERTP
  * What is an electronic right?
  * Electronic right vs eright
  * What is ERTP?
  * Implementing sample `eright`s
  * ERTP in Agoric

* ### Zoe
  * Context
  * Structure Of A Zoe Contract
  * Offers
  * Two Sides Of Zoe
  * Contract Development Experience

## ERTP

### What is an electronic right?
* #### Object Capabilities
  In order to understand what an `electronic right` is we first need to take a look at the concept called `Object Capabilities`.

  !Figure 1: Granovetter Diagram(../literatureWork/images/granovetterOperator.png)

  The diagram above demonstrates the social relationships between people and was designed by The sociologist Mark Granovetter. The Object Capabilities 
discipline refers to this diagram as `Granovetter Operator` and uses it to illustrate the relationships between objects.

  In its essence, an `ocaps` (Object Capabilities) system authorizes users according to the object references they have. In an `ocaps` system, there's no 
Access Control Lists(ACLs). Simply your capabilities are defined by the object references you hold. 

* #### A Word On 'Rights'

  "Rights help people coordinate plans and resolve conflicts over the use of resources.
Rights partition the space of actions to avoid interference between separately formulated
plans, thus enabling cooperative relationships despite mutual suspicion and competing
goals [15]. This rights-based perspective can shed light on the problem of securing distributed computational systems"[2]

* #### From Objects To Electronic Rights
  The object references represent a right to perform a set of operations on a specific, designated resource.
In this context, we can use electronic rights to address the real-world problems which are currently being 
resolved by the rights we know as `normal`. Using contracts, law, courts, etc.

### Electornical right vs eright
Let's imagine Alice, Bob, and Carol from the `Granovetter Operator` are some objects living in a `ocap` environment.
- Alice has the `right` to invoke a resource from Carol.
- Alice knows Bob so she can pass her right to invoke Carol to Bob. Bob has no way of invoking Carol if Alice refuses to
pass this right to him.
- Carol has no authority to invoke any resource neither from Alice or Bob.

The type of `right` we're inspecting above has these features;
* Shareable
* Exercisable
* Opaque
* Specific

Here's what Mark Miller has to say about the differences between electronic rights and erights in [erights.org](http://erights.org/smart-contracts/index.html#ERTP);

"_Capabilities are electronic rights of a sort, but by themselves lack 2 crucial features needed for tradable electronic rights:_

* _Exclusive rights transfer._
* _Assayability (so a 3rd party can determine if a trade is mutually acceptable)._

_The next layer above distributed capabilities, ERTP, does provide these properties. 
The ERTP protocol accommodates fungible & non-fungible rights, exclusive & non-exclusive rights, 
and blinded or non-blinded transfer. **Only electronic rights manipulable via ERTP are called erights.**_"

So If we compare the rights we inspected above to the definition of `eright` from Mark Miller, we can see that the right
transfer from `Granovetter Operator` lacks the two main features for an electronic right to be called `eright`. Why?

1. An object reference is shareable but an eright has to be exclusive. What do we mean? <br>
   If Alice drops the capability after passing it to Bob, Bob
   happens to have exclusive access to Carol, but this isn’t an __*exclusive*__ right since Bob
   is unable to know that he is the only one who has it.[1]
2. A capability is opaque, but an eright has to be assayable. Meaning; <br>
   Assayability is needed for trade, since you must be able to determine what you would
   be getting before deciding to purchase. However, exclusive rights can only be reliably
   assayed by actually obtaining exclusive access to them, since otherwise, after you’ve
   assayed them, someone else may gain the exclusive, cutting you out. Trade of
   exclusives may therefore require a trusted third party who can hold them in escrow.[1]

If we're going to trade electronic rights in a distributed environment securely, the common features for all those rights are;
* Exclusive
* Assayable

But there are other features for an `eright` can possess;
* Fungible vs Non-fungible: We can implement both `Money` and something like a `Ticket` as `erights` where money is fungible and a ticket is non-fungible.
* Exercisable vs Symbolic: Money is symbolic, you cannot do anything with it other than trading it for something else. But something like a `Covered Call Option` is 
exercisable where you can exercise your right to `Buy` the covered asset before a deadline. Both `Money` and `Covered Call Option` can be implemented as `eright`s.

### What is ERTP?
ERTP is the protocol that transforms an electronic right into an `eright` by making it `Exclusive` and `Assayable`.

Here are some sample `eright` implementations via ERTP;
* #### Money
  [Sample Money Implementation](http://erights.org/elib/capability/ode/ode-capabilities.html#simple-money)
* #### Covered Call Option
  [Sample Covered Call Implementation](http://erights.org/elib/capability/ode/ode-bearer.html#options-contract)

### ERTP In Agoric
> **Note**: This section uses materials(code samples, diagrams, etc.) from [Agoric Docs ERTP](https://docs.agoric.com/guides/ertp/#ertp-concepts-overview).
> Visit the site for more in-depth learning materials. 

Agoric uses ERTP to trade `eright`s like money, NFTs etc. The version of ERTP Agoric uses has the following structure;

<img src="https://docs.agoric.com/assets/img/relationships1.6963650c.svg" width='60%'>

At the center of the above structure, there are three basic components: `Issuer`, `Mint` and `Brand`. 
Here's the relationship between these three components;

<img src="https://docs.agoric.com/assets/img/relationships2.392c65c9.svg" width='60%'>

As you can see there's a `one-to-one` relationship between every `Issuer`, `Mint` and `Brand`. 

* **Issuer**: The source of truth for the digital asset. Issuer is the authority everyone trusts when trading
this currency. Below is a diagram showing how the issuer manages to be the source of truth.
  <img src="https://user-images.githubusercontent.com/109155000/211854454-65bff5c0-e945-40cb-a2bc-3ff4e177afa5.png" width='60%'>
* **Brand**: A unique object that is used to identify the digital asset we're working with. Brand information
can be shared publicly.
* **Mint**: The only way to print money of the `Brand` associated with this mint object.

This `one-to-one` relationship between `Issuer`, `Mint` and `Brand` is very important to keep the system secure.
Hence, they're immutable.

There are some other components that we must mention if we're going to talk about ERTP. They are,
* **Amount**: A representation of the actual asset. Amounts are not money. They're just an abstraction to make working with digital assets secure and easier.
* **Payment**: The form that an actual digital asset takes during a transfer. 
* **Purse**: The form of digital asset in a non-transfer state.

Let's take a look at how we can make use of the ERTP protocol to create fungible and non-fungible tokens;
* ##### How to create fungible tokens with ERTP?
  Initially;
  ```js
  const {
     issuer: quatloosIssuer,
     mint: quatloosMint,
     brand: quatloosBrand,
  } = makeIssuerKit('quatloos');  
  ```
  We call `makeIssuerKit` in order to get a fresh set of `Issuer`, `Mint` and `Brand` objects. Then we've to creat
the amount to be minted;
  ```js
  const quatloosSeven = AmountMath.make(quatloosBrand, 7n);  
  ```
  Once we have the amount, we can actually print the money using the `Mint` object,
  ```js
  const quatloosPayment = quatloosMint.mintPayment(quatloosSeven);
  ```
  A successful mint results in a `Payment` object. Payments are the money `on-the-go`, we should put it in a `Purse`
if we want to park our money. To put a payment inside a purse;
  ```js
  const quatloosPurse = quatloosIssuer.makeEmptyPurse();
  quatloosPurse.deposit(quatloosPayment);
  ```

* ##### How to create non-fungible tokens with ERTP?
  Our first step is very similar to the one we created a fungible asset but with only one difference;
  ```js
  const {
    mint: popMint,
    brand: popBrand,
    issuer: popIssuer,
   } = makeIssuerKit('POP', AssetKind.COPY_SET);
  ```
  The argument `AssetKind.COPY_SET` is specified when we want to create non-fungible tokens. The argument for fungible
tokens are `AssetKind.NAT` but we did not specify that because it's the default option. See the docs page for 
[other possible AssetKind options](https://docs.agoric.com/reference/ertp-api/ertp-data-types.html#assetkind). Once we have out issuerKit 
we can move on to the next step which is creating the amount to be minted;
  ```js
  const popAmount = AmountMath.make(popBrand, harden([{
        organization: 'Chainboard Academy',
        courseName: 'Agoric Bootcamp',
        studentId: '12',
      }]));
  ```
  The data of an NFT is wrapped around an array. This is particularly useful when we want to add/subtract non-fungible
amounts. Now we can move on to the minting phase;
  ```js
  const popPayment = popMint.mintPayment(popAmount);  
  ```
  We can store NFTs just like we store fungible tokens;
  ```js
  const popPurse = popIssuer.makeEmptyPurse();
  popPurse.deposit(popPayment);
  ```
