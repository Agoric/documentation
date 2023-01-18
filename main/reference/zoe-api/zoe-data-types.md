# Zoe Data Types

## PublicFacet

????

## Invitation

These are the details exposed by E(zoe).getInvitationDetails():


- **installation** **Installation**: The contract's installation in Zoe.
- **instance** **Instance**: The contract instance this invitation is for.
- **invitationHandle** **Handle**: A handle used to refer to this invitation.
- **description** **String**: Describes the purpose of this **invitation**. Use it
   to match the invitation to the role it plays in the contract.


## InvitationIssuer

**InvitationIssuers** are special types of **[Issuers](/reference/ertp-api/issuer.md)**. Every Zoe
instance has a single **InvitationIssuer** for the entirety of its lifetime. All **Invitations** come from the Zoe instance's **InvitationIssuer** and its **[Mint](/reference/ertp-api/issuer.md)**, which 
mints **Invitations** and validates their **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)**.

The **Mint** associated with the **InvitationIssuer**
creates **invitations** in the form of ERTP **[Payments](/reference/ertp-api/payment.md)** that represent the right to interact with
a smart contract in particular ways.

The **invitationIssuer** has two methods, both of which take an **invitation** as an argument.
Remember, an **invitation** is just a special case of an ERTP **Payment**, so **claim()** and
**getAmountOf()** are the same as for other **Issuers**.

A successful call of **invitationIssuer.claim(invitation)** means you are assured the **invitation**
is recognized as valid by the **invitationIssuer**. You are also assured the **invitation** is exclusively yours
and no one else has access to it.

## Installation

## Instance

## Proposal

## OfferArgs



## Pattern



## Allocation

**Allocations** represent the **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)** to be paid out to each seat upon exiting a **Proposal**.

For example, if a seat expected to be paid 5 *Quatloos* and 3 *Widgets* after successfully exiting a **Proposal**, the **Allocation** would look like:

```js
{
  Quatloos: 5n
  Widgets: 3n
}
```

## PriceQuote


A **PriceQuote** represents a statement from a **[PriceAuthority](./price-authority.md)** as to the 
current price level at a particular time. The significant content (prices 
and time) is packaged in the **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**, and repeated
in the **[Payment](/reference/ertp-api/payment.md)** for veracity. 
A **PriceQuote** is an **Amount**-**Payment** pair, where the **Amount** is also the current 
balance of the **Payment**.
 
```js
const { quoteAmount, quotePayment } = priceQuote;
```

**PriceQuotes** are returned in two forms: 
- **PriceDescription**
  - Always includes **amountIn**, **amountOut**, the quote's **Timestamp**,
    and the **TimerService** the **TimeStamp** is relative to.
- **PriceDescription** wrapped as a **QuoteAuthority** issued payment. 
  - This lets quotes be shared in a format letting others verify the time and values. 

## Ratio


These functions let you apply a ratio (a fraction) to an amount, multiplying or
dividing an amount by a ratio of two natural numbers. Ratios consist of a
*numerator* and a *denominator*. Both of these consist of a value and a brand,
just like **amounts**. A ratio cannot have a denominator value of 0.

The ratio functions have to be imported.

The most common kind of **Ratio** is applied to an **Amount** of a particular brand
and produces results of the same brand.

**Ratios** can also have two brands, essentially typing them such as miles per
hour or US dollars for Swiss francs (an exchange rate ratio) (i.e. the numerator
is one brand and the denominator is another). Keep in mind that a ratio function
should make sense when used with a dual-branded ratio.

For example, when multiplying an amount by a ratio, the result has the ratio
numerator's brand.  So the amount should have the same brand as the ratio's
denominator to cancel it out; e.g. 5 gallons * (10 miles / 1 gallon) = 50
miles. Similarly, dividing an amount by a ratio returns a result amount with the
denominator's brand, so the amount should be the same brand as the numerator to
cancel it out.