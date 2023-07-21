# Price Authority

A **[PriceAuthority](/reference/zoe-api/price-authority.md)** can be used in contracts (usually specified in the
terms of a contract) to provide a price feed, on-demand quotes, and wakeups for
various time and price conditions.

## Examples

To see a **[PriceAuthority](/reference/zoe-api/price-authority.md)** in use, see the [Loan
contract](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts/loan)
and the [Call Spread
contracts](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts/callSpread).

## Receiving a Quote

A **[PriceAuthority](/reference/zoe-api/price-authority.md)** has a number of different methods that will return
official **[PriceQuotes](/reference/zoe-api/zoe-data-types.md#pricequote)**. A **PriceQuote** is a record with an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** and a **[Payment](/reference/ertp-api/payment.md)**,
where the **Amount** is also the current balance of the **Payment**:

```js
const { quoteAmount, quotePayment } = priceQuote;
```

Because these are ERTP **Amounts** and **Payments**, they have **[Issuers](/reference/ertp-api/issuer.md)**, and
the **Payments** are minted by an ERTP **[Mint](/reference/ertp-api/mint.md)**. A quote **Issuer** and **Mint** may
be shared by several **PriceAuthorities**, and a **PriceAuthority** may
use several **QuoteIssuers**.

Importantly, you can confirm the **[Brand](/reference/ertp-api/brand.md)** of a **PriceQuote** and that it was minted by the
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

This means that the **PriceAuthority** asserts that when **Timestamp** according to
**Timer** happened, you could sell *amountIn* and receive *amountOut* for it.
*amountIn* and *amountOut* are ERTP **Amounts** for the *brandIn* and *brandOut* you
requested.

## Mutable Price Quotes

**[MutableQuote](/reference/zoe-api/zoe-data-types.md#mutablequote)**'s method **getPromise()** returns a **Promise** for a **[PriceQuote](/reference/zoe-api/zoe-data-types.md#pricequote)**,
which is the same as what is returned by the **[E(PriceAuthority).quoteWhenLTE()](/reference/zoe-api/price-authority.md#e-priceauthority-quotewhenlte-amountin-amountoutlimit)**method and variants.
Effectively, the non-mutable price quote methods return a single **PriceQuote**, while
the mutable price quote methods return a reusable object which can be manipulated
by changing its trigger levels or by cancelling it.


