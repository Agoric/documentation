# MutableQuote Object

A **[MutableQuote](./zoe-data-types#mutablequote)** is what the
**[E(PriceAuthority).mutableQuoteWhen\*()](./price-authority#e-priceauthority-mutablequotewhengt-amountin-amountoutlimit)**
methods resolve to. It has the following methods:

## aMutableQuote.cancel(e)

- **e** **String**

Causes the **Promise** to reject with the message **e**.
When the promise is used with a **E.when()** the message is part of the rejection notification.

## aMutableQuote.getPromise()

- Returns: **Promise&lt;[PriceQuote](./zoe-data-types#pricequote)>**

## aMutableQuote.updateLevel(newAmountIn, newAmountOutLimit)

- **newAmountIn** **[Amount](/reference/ertp-api/ertp-data-types#amount)**
- **newAmountOutLimit** **Amount**

Changes the **MutableQuote**'s trigger levels to the specified values without requiring a second **Promise**.

_newAmountIn_'s and _newAmountOutLimit_'s **[Brands](/reference/ertp-api/brand)** must match the original
_amountIn_ and _amountOutLimit_ **Brands**, respectively.
