# Amounts, Brands, and Values

## Amounts

An **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** describes digital assets. There are no **Amount** API methods,
but **[AmountMath](/reference/ertp-api/amount-math.md)** methods take **amounts** as arguments
to get information about and manipulate them.

**[AmountMath.make()](/reference/ertp-api/amount-math.md#amountmath-make-brand-allegedvalue)** is
generally how you make new **Amounts**.
However, you can also make an **Amount** as an object literal by making a record of
a **[Brand](/reference/ertp-api/brand.md)** and a **[Value](/reference/ertp-api/ertp-data-types.md#value)**. While **AmountMath.make()** is recommended for proper 
object-oriented programming, this produces the same result:

<<< @/snippets/ertp/guide/test-amounts.js#manualMake
Each **Amount** has two properties:
- **Brand**: The type of digital asset, such as our imaginary *Quatloos* currency or,
  in a game, a powerful magic sword with a brand of *Plus3Sword-ABCGames* or similar.
- **Value**: How much/many of the asset. Fungible values are natural
numbers represented as BigInts. Non-fungible values may be represented as strings naming a
particular right, or an arbitrary object representing the rights at
issue (e.g., a theater ticket's date, time, row, and seat positions).

**Amounts** and their **Values** and **Brands** can be manipulated by the
**AmountMath** library. It executes the logic of how **Amounts** change when
digital assets are merged, separated, or otherwise manipulated.

### Amounts Are Not Assets

Despite how it may seem, an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** is not an asset in and of itself.
It merely *describes* assets along the two axes of what they are
(their **[Brand](/reference/ertp-api/brand.md)**) and how much there are 
(their **[Value](/reference/ertp-api/ertp-data-types.md#value)**).
**Amounts** are used to negotiate without sending/sharing actual assets until a deal is made.

For example, if I want to make you an offer to buy an asset, (e.g., a magic sword in a game) I'll send you
an **Amount** describing the asset of 5 *Quatloos* I'm willing to trade for your sword. I don't send you the actual
5 *Quatloos*; that only happens when we agree on the trade terms and I send you a **[Payment](/reference/ertp-api/payment.md)**: of 5 *Quatloos*, the
actual asset.
If you reject my offer, I can change it so the **Amount** I offer is 10 *Quatloos*. I haven't added actual
assets to what I send you; I've only changed the description of the assets in the offer I'm making for the sword.

Making a new **Amount** doesn't create any new assets.
ERTP assets can only be created by their **[Mint](/reference/ertp-api/mint.md)** returning a new **Payment** containing the assets.
Since an **Amount** is just a description of an asset, it's like a drawing of a ten dollar bill, while
an asset is analogous to an actual ten dollar bill printed by an authorized facility with value
derived from its government backing.

In other words, I don't make you an offer that I'll sell you a ticket to Hamilton for $300 by sending
you an actual ticket any more than you'd send me $300 before finding out what I'm willing to give you
for it. Instead,
I make you an offer by sending a description
of what I'm willing to swap (e.g., "I will exchange a *Hamilton* ticket for $300").
If the offer is accepted, only then would I send you the actual asset and you would send me the actual $300.
In the Agoric stack, assets of the exchange are escrowed with [Zoe](/guides/zoe/).

## Brands

A **[Brand](/reference/ertp-api/brand.md)**  object is an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** object's type of digital asset, such as
our imaginary *Quatloos* currency or, in a game, a powerful magic
sword.

In ERTP, **[Mint](/reference/ertp-api/mint.md)**  objects create new asset **[Payment](/reference/ertp-api/payment.md)** 
objects. Each **Mint** has a one-to-one relationship with an **[Issuer](/reference/ertp-api/issuer.md)** 
object. And each **Issuer** object has a one-to-one
relationship with a **Brand** object. This means:
- A **Mint** can only create a **Payment** for one specific **Brand**, which
  must be the same **Brand** as their associated **Issuer**.
- An **Issuer** can only create a new empty **[Purse](/reference/ertp-api/purse.md)**
for one specific **Brand**.
- An **Amount** is either *fungible* or *non-fungible*, as determined by which
its **Issuer**, and thus its **Brand**, was created to be. 

A **Brand** has four associated methods.

- [aBrand.isMyIssuer()](/reference/ertp-api/brand.md#abrand-ismyissuer-allegedissuer)
  - Returns **true** if the **Issuer** argument matches the **Issuer** associated with the **Brand**.
    We have this method because the **Issuer** is authoritative whereas the **Brand** is not. You can
    create a **Payment**, **Purse**, or **Amount** with a **Brand** that claims a particular **Issuer**,
    without that **Issuer** having been involved. But if you use that **Payment** or **Purse**, it won't be 
    accepted by genuine ones. So to know, you have to verify with the **Issuer** to see if it agrees.
  - <<< @/snippets/ertp/guide/test-amounts.js#isMyIssuer
- [aBrand.getAllegedName()](/reference/ertp-api/brand.md#abrand-getallegedname)
  - Returns the **Brand**'s alleged name, but should not be trusted as accurate.
  - <<< @/snippets/ertp/guide/test-amounts.js#getAllegedName
- [aBrand.getDisplayInfo()](/reference/ertp-api/brand.md#abrand-getdisplayinfo)
  - Returns the **[DisplayInfo](/reference/ertp-api/ertp-data-types.md#displayinfo)** associated with the
    **Brand**. The **DisplayInfo**
    tells the UI how to correctly display **Values** associated with the **Brand**.
  - <<< @/snippets/ertp/guide/test-amounts.js#getDisplayInfo
- [aBrand.getAmountShape()](/reference/ertp-api/brand.md#abrand-getamountshape)
  - Returns the **[AmountShape](/reference/ertp-api/ertp-data-types.md#amountshape)** associated with the
    **Brand**. The **AmountShape** describes non-fungible assets in a similar manner to how **Amounts**
    describe fungible assets.

## Values

Values are the "how many" part of an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**. 

Note that number values (for fungible assets) are represented as **BigInt**s and
not **Number**s. For example, you would use *10n* rather than *10*.
