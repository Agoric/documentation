# Zoe Data Types

Zoe introduces and uses several data types.

## Allocation

**Allocations** represent the **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)** to be paid
out to each seat upon exiting a **Proposal**.

For example, if a seat expected to be paid 5 *Quatloos* and 3 *Widgets* after successfully exiting a **Proposal**, the **Allocation** would look like:

```js
{
  Quatloos: 5n
  Widgets: 3n
}
```

## AmountKeywordRecord

**AmountKeywordRecords** are records in which the property names are **[Keywords](#keyword)**, and
the values are **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)**. **Keywords** are 
unique identifiers per contract
that tie together the **proposal**, **payments** to be escrowed, and **payouts**
to the user. In the below example, **Asset** and **Price** are **Keywords**.

Users should submit their **payments** using **Keywords**:
```js
const payments = { Asset: quatloosPayment };
```

Users will receive their **payouts** with **Keywords** as the keys of a **payout**:
```js
quatloosPurse.deposit(payout.Asset);
```

For example:
```js
const quatloos5 = AmountMath.make(quatloosBrand, 5n);
const quatloos9 = AmountMath.make(quatloosBrand, 9n);
const myAmountKeywordRecord =
{
  Asset: quatloos5,
  Price: quatloos9
}
```
## Handle

**Handles** within Zoe have a slightly different definition than in regular JavaScript. They are **Far**
objects without any methods whose only useful property are their unique identities. They're often
created in order to designate some other object, where the **Handles** can be passed around as reliable
designators without giving access to the designated objects.

## Instance

An **Instance** is a handle that represents an instance of a contract.
You can get information about the contract instance via these methods:

- **[E(Zoe).getBrands()](./zoe.md#e-zoe-getbrands-instance)**
- **[E(Zoe).getIssuers()](./zoe.md#e-zoe-getissuers-instance)**
- **[E(Zoe).getTerms()](./zoe.md#e-zoe-getterms-instance)**
- **[E(Zoe).getPublicFacet()](./zoe.md#e-zoe-getpublicfacet-instance)**

## Invitation

An **Invitation** is a kind of **[Payment](/reference/ertp-api/payment.md)**. It's a non-fungible eright
that can be held in **Payments** or **[Purses](/reference/ertp-api/purse.md)**, just like any other
eright. An **Invitation** **Payment** would be a **Payment** holding an **Invitation**. Because we
almost always just use a **Payment** holding a single **Invitation** in order to pass around
**Invitations**, the difference is normally elided.

## InvitationIssuer

**InvitationIssuers** are special types of **[Issuers](/reference/ertp-api/issuer.md)**. Every Zoe
instance has a single **InvitationIssuer** for the entirety of its lifetime. All **Invitations** come
from the **[Mint](/reference/ertp-api/mint.md)** associated with the Zoe instance's **InvitationIssuer**.

**InvitationIssuers** have all the methods of regular **Issuers**, but the two methods that qre most
often used are **[anIssuer.claim()](/reference/ertp-api/issuer.md#anissuer-claim-payment-optamount)**
and **[anIssuer.getAmountOf()](/reference/ertp-api/issuer.md#anissuer-getamountof-payment)**.

A successful call of **anInvitationIssuer.claim()** means you are assured the **Invitation** passed into
the method is recognized as valid by the **InvitationIssuer**. You are also assured the **Invitation**
is exclusively yours and no one else has access to it.

## Keyword

An ASCII identifier string that must begin with an upper case letter.

## MutableQuote

A **MutableQuote** represents a statement from a **[PriceAuthority](./price-authority.md)** as to the 
current price level at a particular time. The significant content (prices 
and time) is packaged in the **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**, and repeated
in the **[Payment](/reference/ertp-api/payment.md)** for veracity.

**MutableQuotes** should be used when you expect to make multiple calls, replacing the trigger
value. If you just need a single quote, and won't change the trigger level, you should use
**PriceQuotes**.

A **MutableQuote** is an **Amount**-**Payment** pair, where the **Amount** is also the current 
balance of the **Payment**.

## ParsableNumber

A **ParsableNumber** is defined as a **bigint**, **number**, or **string**.

## PriceQuote

A **PriceQuote** represents a statement from a **[PriceAuthority](./price-authority.md)** as to the 
current price level at a particular time. The significant content (prices 
and time) is packaged in the **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** and repeated
in the **[Payment](/reference/ertp-api/payment.md)** for veracity. 
A **PriceQuote** is an **Amount**-**Payment** pair, where the **Amount** is also the current 
balance of the **Payment**.
 
```js
const { quoteAmount, quotePayment } = priceQuote;
```

**PriceQuotes** are returned in two forms: 
- **PriceDescription**
  - Always includes **amountIn**, **amountOut**, the quote's **Timestamp**,
    and the **TimerService** the **Timestamp** is relative to.
- **PriceDescription** wrapped as a **QuoteAuthority** issued payment. 
  - This lets quotes be shared in a format letting others verify the time and values. 

## Ratio

**Ratios** are pass-by-value records that consist of a
*numerator* and a *denominator*. Both of these consist of a
**[Value](/reference/ertp-api/ertp-data-types.md#value)** and a **[Brand](/reference/ertp-api/brand.md)**,
just like **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)**.
A **Ratio** cannot have a denominator value of 0.

The most common kind of **Ratio** is applied to an **Amount** of a particular **Brand**
and produces results of the same **Brand**.

**Ratios** can also have two different **Brands**, essentially typing them such as miles per
hour or US dollars for Swiss francs (i.e., an exchange rate ratio).

## TransferPart

**TransferParts** are the individual elements of the *transfer* array passed into the 
**[atomicRearrange()](./zoe-helpers.md#atomicrearrange-zcf-transfers)** function. Each **TransferPart**
represents one or two **[Allocation](#allocation)** changes among existing 
**[ZCFSeats](./zcfseat.md)**. Each **TransferPart** consists of 4 fields, none of which are mandatory:

* **fromSeat**?: **ZCFSeat** - The seat from which an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** is being taken.
* **toSeat**?: **ZCFSeat** - The seat to which an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** is being given.
* **fromAmounts**?: **[AmountKeywordRecord](#amountkeywordrecord)** - The **AmountKeywordRecord** which will be taken from the *fromSeat*.
* **toAmounts**?: **AmountKeywordRecord** - The **AmountKeywordRecord** which will be given to the *toSeat*.

If a *fromSeat* is specified, then a *fromAmounts* is required. When you specify a *toSeat* without specifying a *toAmounts*, it means that the *fromAmount* will be taken from *fromSeat* and given to *toSeat*.

**TransferParts** that represent one side of a transfer
can be created using the helper functions
**[fromOnly()](./zoe-helpers.md#fromonly-fromseat-fromamounts)** or
**[toOnly()](./zoe-helpers.md#toonly-toseat-toamounts)**.
Of course, as with any JavaScript datatype, you can also manually create **TransferParts**.
Note that if you manually create a **TransferPart**, you'll need to set any fields that you
don't include to **undefined**.