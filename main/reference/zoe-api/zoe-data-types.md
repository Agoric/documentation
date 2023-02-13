# Zoe Data Types

Zoe introduces and uses several data types.

## Allocation

**Allocations** represent the **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)** to be paid out to each seat upon exiting a **Proposal**.

For example, if a seat expected to be paid 5 *Quatloos* and 3 *Widgets* after successfully exiting a **Proposal**, the **Allocation** would look like:

```js
{
  Quatloos: 5n
  Widgets: 3n
}
```

## AmountKeywordRecord

**AmountKeywordRecord** is a record in which the keys are keywords, and
the values are **amounts**. Keywords are unique identifiers per contract
that tie together the **proposal**, **payments** to be escrowed, and **payouts**
to the user. In the below example, **Asset** and **Price** are keywords.

Users should submit their **payments** using keywords:
```js
const payments = { Asset: quatloosPayment };
```

Users will receive their **payouts** with keywords as the keys of a **payout**:
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

## Instance

**Instances** are opaque objects that represent contract instances. You can get information about them via
these methods:

- **[E(Zoe).getBrands()](./zoe.md#e-zoe-getbrands-instance)**
- **[E(Zoe).getIssuers()](./zoe.md#e-zoe-getissuers-instance)**
- **[E(Zoe).getTerms()](./zoe.md#e-zoe-getterms-instance)**
- **[E(Zoe).getPublicFacet()](./zoe.md#e-zoe-getpublicfacet-instance)**

## Invitation

These are the details exposed by E(zoe).getInvitationDetails():


- **installation** **Installation**: The contract's installation in Zoe.
- **instance** **Instance**: The contract instance this invitation is for.
- **invitationHandle** **Handle**: A handle used to refer to this invitation.
- **description** **String**: Describes the purpose of this **invitation**. Use it
   to match the invitation to the role it plays in the contract.


## InvitationIssuer

**InvitationIssuers** are special types of **[Issuers](/reference/ertp-api/issuer.md)**. Every Zoe
instance has a single **InvitationIssuer** for the entirety of its lifetime. All **Invitations** come
from the **[Mint](/reference/ertp-api/mint.md)** associated with the Zoe instance's **InvitationIssuer**.

**InvitationIssuers** have all the methods of regular **Issuers**, but the two methods that qre most often used are **[anIssuer.claim()](/reference/ertp-api/issuer.md#anissuer-claim-payment-optamount)** and **[anIssuer.getAmountOf()](/reference/ertp-api/issuer.md#anissuer-getamountof-payment)**.

A successful call of **anInvitationIssuer.claim()** means you are assured the **Invitation** passed into
the method is recognized as valid by the **InvitationIssuer**. You are also assured the **Invitation**
is exclusively yours and no one else has access to it.

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
    and the **TimerService** the **TimeStamp** is relative to.
- **PriceDescription** wrapped as a **QuoteAuthority** issued payment. 
  - This lets quotes be shared in a format letting others verify the time and values. 

## Ratio

**Ratios** are pass-by-value records that consist of a
*numerator* and a *denominator*. Both of these consist of a
**[Value](/reference/ertp-api/ertp-data-types.md#value)** and a **[Brand](/reference/ertp-api/brand.md)**,
just like **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)**.
A **Ratio** cannot have a denominator value of 0.

The ratio functions have to be imported.

The most common kind of **Ratio** is applied to an **Amount** of a particular **Brand**
and produces results of the same **Brand**.

**Ratios** can also have two different **Brands**, essentially typing them such as miles per
hour or US dollars for Swiss francs (an exchange rate ratio).

