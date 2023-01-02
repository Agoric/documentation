# MutableQuote Object

Use a **MutableQuote** when you expect to make multiple calls, replacing the trigger
value. If you just need a single quote, and won't change the trigger level, then use
a non-mutable quote.

There are four *mutable quote* methods, which return a **MutableQuote** object with the methods:

## MutableQuote.cancel(e)
- **e** **String**

Causes the **Promise** to reject with the message **e**. 
When the promise is used with a **E.when()** the message is part of the rejection notification. 

## MutableQuote.getPromise()
- Returns: **Promise&lt;[PriceQuote](./zoe-data-types.md#pricequote)>**

## MutableQuote.updateLevel(newAmountIn, newAmountOutLimit)
- **newAmountIn** **Amount**
- **newAmountOutLimit** **Amount**

Changes the **MutableQuote**'s trigger levels to the specified values without requiring a second **Promise**.

**newAmountIn** and **newAmountOutLimit**'s brands must match the original 
**amountIn** and **newAmountOutLimit** brands respectively. 

