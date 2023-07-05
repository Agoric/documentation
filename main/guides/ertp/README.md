# ERTP Overview

ERTP (*Electronic Rights Transfer Protocol*)
is Agoric's token standard for transferring tokens and other digital assets in
JavaScript.

## Object Capabilities

ERTP uses [OCaps (object capabilities)](../../glossary/#object-capabilities)
to enforce access control. In an Ocaps system, there aren't any
Access Control Lists (ACLs). Instead, your capabilities are defined by the object references you hold. 
Thus, if your program has a reference to an
object, it can call methods on that object. If it doesn't have a
reference, it can't. For more on object capabilities, see
[Chip Morningstar's post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

## ERTP Concepts Overview

ERTP has the following structure:

![ERTP object relationships](./assets/relationships1.svg)

### Digital Assets

There are three kinds of digital assets: fungible, non-fungible, and semi-fungible.

Fungible assets are interchangeable. For example, if you have 100
one-dollar bills and need to pay someone 5 dollars, it doesn't matter
which five of your one-dollar bills you give them.

Non-fungible assets have the same **[Brand](/reference/ertp-api/brand.md)**, but are not
interchangeable. For example, you might have 100 theater tickets. But someone wanting to buy 
even a General Admission
ticket from you will want one for a specific date and time. This might also affect the price;
you'll want to charge more for a Friday evening ticket than a Wednesday matinee ticket,
even if it's for the same show.

Semi-fungible assets have distinct forms which are not interchangeable
with each other, but in which instances of a single form may be interchangeable with
other instances of the same form.
For example, theater tickets for a single show might be partitioned into General Admission
and Balcony sections, where a holder may sit in any seat of the respective section.

### ERTP Components

At the center of ERTP, there are three basic components: **[Issuers](/reference/ertp-api/issuer.md)**, 
**[Mints](/reference/ertp-api/mint.md)**, and **[Brands](/reference/ertp-api/brand.md)**. 
Here's the relationship between these three components:

![ERTP object relationships 2](./assets/relationships2.svg) 

As you can see there's a one-to-one relationship between every **Issuer**, **Mint**, and **Brand**.
This one-to-one relationship is very important to keep the system secure. Hence, these objects are
immutable once they're created.

* **Issuer**: The source of truth for the digital asset. The **Issuer** is the authority everyone trusts when trading this currency.
* **Brand**: A unique object that is used to identify the digital asset we're working with.
* **Mint**: The only way to print digital assets of the **Brand** associated with this **Mint** object.

There are a couple additional ERTP components:

* **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**: A representation of the actual asset. **Amounts** are not assets; they're just an abstraction to make working with assets secure and easier. See the [Amounts](./amounts.md#amounts) documentation for additional information.
* **[Payment](/reference/ertp-api/payment.md)**: The form that digital assets take during a transfer. See the [Payment](./purses-and-payments.md#payments) documentation for additional information.
* **[Purse](/reference/ertp-api/purse.md)**: The form of digital assets in a non-transfer state. See the [Purse](./purses-and-payments.md#purses) documentation for additional information.

### AmountMath

ERTP uses the **[AmountMath](/reference/ertp-api/amount-math.md)** library for operations such as adding, subtracting,
and comparing **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** values (such as when
depositing to or withdrawing assets from a **[Purse](/reference/ertp-api/purse.md)**). See the [AmountMath](./amount-math.md) documentation for additional information.

## Creation and Storage of an Asset

![Asset creation](./assets/asset-creation.svg)

1. Pass a string into **[makeIssuerKit()](/reference/ertp-api/issuer.md#makeissuerkit-allegedname-assetkind-displayinfo-optshutdownwithfailure-elementshape)**
naming a new **[Brand](/reference/ertp-api/brand.md)**. (In this example, we're naming the new
**Brand** *quatloos*.) The function will return a new **[Issuer](/reference/ertp-api/issuer.md)**,
**[Mint](/reference/ertp-api/mint.md)**, and **Brand**. These 3 objects are all in unchangeable 
one-to-one relationships with each other.

	<<< @/snippets/ertp/guide/test-readme.js#makeIssuerKit

2. Use the **[make()](/reference/ertp-api/amount-math.md#amountmath-make-brand-allegedvalue)** method
in the **[AmountMath()](/reference/ertp-api/amount-math.md)** library to make a new
**[Amount](/reference/ertp-api/ertp-data-types.md#amount)** of the asset you want to create. You need
to specify what **Brand** the asset will be, as well as its
**[Value](/reference/ertp-api/ertp-data-types.md#value)** formatted as a **BigInt**.

	The returned **Amount** is stored in *quatloosSeven*.

	<<< @/snippets/ertp/guide/test-readme.js#seven

3. Mint new assets by using the **Amount** we created in Step 2 above. The assets are returned as a
**[Payment](./purses-and-payments.md#payments)**, which is stored in *quatloosPayment*.

	<<< @/snippets/ertp/guide/test-readme.js#mintPayment

4. **Payments** are generally only used as short term storage for assets while they're being
transferred; if we want to store assets for an extended period of time we should create and use a
**[Purse](/reference/ertp-api/purse.md)**. Each **Purse** can only hold one asset **Brand**. Thus, to
create a *Quatloos* **Purse**, we should call the 
**[makeEmptyPurse()](/reference/ertp-api/issuer.md#anissuer-makeemptypurse)** method on the **Issuer**
we created in Step 1 above.

	<<< @/snippets/ertp/guide/test-readme.js#purse

5. We now deposit our *Quatloos* into the **Purse** we just created. The *quatloosPayment*
**Payment** that contain the *Quatloos* will be automatically consumed, while the 7 *Quatloos* will be
contained in *quatloosPurse*.

	<<< @/snippets/ertp/guide/test-readme.js#deposit

## Transferring an Asset

![Asset transfer](./assets/asset-transfer.svg)

Start with your *quatloosPurse* that holds 7 *Quatloos*. Let's say you decide you want to send 5
*Quatloos* to another party named Alice.

1. Create a new *Quatloos*-branded **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** with a
**[Value](/reference/ertp-api/ertp-data-types.md#value)** of 5 to describe what you want to withdraw.

	<<< @/snippets/ertp/guide/test-readme.js#five

2. Tell your *Quatloos* **[Purse](/reference/ertp-api/purse.md)** that you want to withdraw
the *quatloosFive* **Amount** from it. The withdrawn 5 *Quatloos* go into the *myQuatloosPayment*
**[Payment](/reference/ertp-api/payment.md)**.

	<<< @/snippets/ertp/guide/test-readme.js#withdraw

3. Alice now needs to do some work so there's somewhere for her to put the 5 *Quatloos*
**Payment**. Let's assume Alice already has an empty *Quatloos* **Purse** of her own. 
To let other parties safely deposit *Quatloos* into it, Alice needs to create a
[deposit facet](../../glossary/#deposit-facet) for that **Purse**.

	Anyone who has access to a deposit facet can deposit assets to its **Purse** but can't make
a withdrawal from the **Purse** nor can they get its balance. It's like being able to send money to a 
friend via their email address; you can't then take money out of your friend's accounts or find out how
much is in them.

	<div class="language-js secondary">

	<<< @/snippets/ertp/guide/test-readme.js#depositFacet

	</div>

4. Alice puts her deposit facet on Agoric's [Board](/glossary/#board-agoric-board),
a key-value "bulletin board" that lets her make it available for general use.

	The Board is a basic bulletin board type system where users can post an ID for a value and
others can get the value just by knowing the ID. Alice can make her ID(s) known by any
communication method she likes; private email, an email blast to a mailing list or many individuals,
buying an ad on a website, tv program, or newspaper, listing it on her website, etc.

	<div class="language-js secondary">

	<<< @/snippets/ertp/guide/test-readme.js#getId

	</div>

5. Get a reference to Alice's deposit facet from the Board. Alice tells you the Board ID
associated with her *Quatloos* **Purse** deposit facet. You get the ID associated value, which
gives you the reference to that deposit facet. You then just tell the facet to receive your
**Payment** of 5 *Quatloos*.

	<<< @/snippets/ertp/guide/test-readme.js#getValue

6. After all this, your *Quatloos* **Purse** has 2 *Quatloos* (7 - 5), while Alice's *Quatloos*
**Purse** has 5 *Quatloos* in it. Your 5 *Quatloos* **Payment** was consumed when
the transfer happened.

The `E()` notation is a local "bridge" that lets you invoke methods on remote objects.
It takes a local representative (a [presence](../../glossary/#presence)) for a remote object
as an argument and sends messages to the remote object. See the 
[`E()` documentation](../js-programming/eventual-send.md) for additional information on how this works.

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

Several ERTP methods are asynchronous. Rather than immediately returning their expected object,
they instead return a **Promise** for that object.

JavaScript implements **Promise** objects and recently added the keywords `async` and `await` to
simplify working with them. For information about JavaScript's implementation of these features,
see [javascript.info](https://javascript.info/async) or
[MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).
