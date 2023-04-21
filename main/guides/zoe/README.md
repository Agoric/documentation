# Zoe Overview

## Offer Safety

*Offer safety* means that the user is guaranteed to either
get what they wanted or get back a full refund of what they offered.

when a user makes an offer
and it is escrowed with Zoe, Zoe guarantees that the user either
gets back what they said they wanted, or gets back (refunded) what they
originally offered and escrowed.

When a user escrows with Zoe, they get back
a JavaScript promise for a future payout. Let's
look a particular example to see how this works.


## Seats

## Price Authority

A **[Price Authority](/reference/zoe-api/price-authority.md)** can be used in contracts 
(usually specified in the terms of a contract) to provide a price feed, on-demand quotes, 
and wakeups for various time and price conditions.


## Receiving a Quote

A **[PriceAuthority](/reference/zoe-api/price-authority.md)**  has a number of different methods that will return
official **[PriceQuotes](/reference/zoe-api/zoe-data-types.md#pricequote))**. A **PriceQuote** is a
record with an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** and a **[Payment](/reference/ertp-api/payment.md)**,
where the **Amount** is also the current balance of the **Payment**:

```js
const { quoteAmount, quotePayment } = priceQuote;
```

Because these are ERTP **Amounts** and **Payments**, they have **[Issuers](/reference/ertp-api/issuer.md)**, and
the **Payments** are minted by an ERTP **[Mint](/reference/ertp-api/mint.md)**. A **QuoteIssuer** and 
**Mint** can be shared by several **PriceAuthorities**, and a single **PriceAuthority** may
use several **QuoteIssuers**.

Importantly, you can confirm the **[Brand](/reference/ertp-api/brand.md)** of a quote and that it was minted by the
**Mint** associated with the **QuoteIssuer** by using the **QuoteIssuer** to obtain the
**QuoteAmount** of the **QuotePayment**:

```js
const verifiedQuoteAmount = await E(quoteIssuer).getAmountOf(quotePayment);
```

Once you have a **QuoteAmount** (or a **VerifiedQuoteAmount**), you can extract the
quoted **Amounts**:

```js
const [{ value: { amountIn, amountOut, timestamp, timer }] = quoteAmount;
```

This means that the **PriceAuthority** asserts that when *timestamp* according to
*timer* happened, you could sell *amountIn* and receive *amountOut* for it.
*amountIn* and *amountOut* are ERTP **Amounts** for the *brandIn* and *brandOut* you
requested.

## Mutable Price Quotes

`MutableQuote`'s method `getPromise()` returns a `Promise` for a `PriceQuote`,
which is the same as what is returned by the `quoteWhenLTE()` API method and variants.
Effectively, the non-mutable price quote methods return a single `PriceQuote`, while
the mutable price quote methods return a reusable object which can be manipulated
by changing its trigger levels or by cancelling it.
