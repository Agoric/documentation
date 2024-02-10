# NOT CURRENTLY INCLUDED IN THE PUBLISHED DOCS; PLEASE IGNORE

# MutableQuote Object

Use a **MutableQuote** when you expect to make multiple calls, replacing the trigger
value. If you just need a single quote, and won't change the trigger level, then use
a non-mutable quote.

There are four *mutable quote* methods, which return a **MutableQuote** object with the methods:

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

*newAmountIn*'s and *newAmountOutLimit*'s **[Brands](/reference/ertp-api/brand)** must match the original 
*amountIn* and *amountOutLimit* **Brands**, respectively. 

