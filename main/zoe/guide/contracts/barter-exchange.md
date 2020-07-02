<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/barterExchange.js (Last updated: 6/30/2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

Barter Exchange takes offers for trading arbitrary goods for other things
It only accepts offers that look like:
- `{ give: { In: amount }, want: { Out: amount}` }

You don't have to register Issuers. If two offers satisfy each other, it exchanges the  specified amounts in each side's want clause. The want amount is matched, while the give amount is a maximum. Each successful trader gets their `want` and may trade with counter-parties who specify any amount up to their specified `give`. 

## `bookOrders`

`bookOrders` is our key data structure. A `Map` of `Map`s, it's the central storage of users' offers.  Each offer stores its `offerHandle` and the `amount` for both its `give` and `want`.  The first key is the `give`'s `brand`, and the second key is the `want`'s `brand`, and we can look up an order by specifying the two `brand` keys.

```js
  const bookOrders = makeStore('bookOrders');

   function lookupBookOrders(brandIn, brandOut) {
    if (!bookOrders.has(brandIn)) {
      bookOrders.init(brandIn, new Map());
    }
    const ordersMap = bookOrders.get(brandIn);
    let ordersArray = ordersMap.get(brandOut);
    if (!ordersArray) {
      ordersArray = [];
      ordersMap.set(brandOut, ordersArray);
    }
    return ordersArray;
}
```

## satisfies() and trade()

We use Zoe helper functions [`satisfies()`](https://agoric.com/documentation/zoe/api/zoe-helpers.html#zoehelpers-satisfies) 
and [`trade()`](https://agoric.com/documentation/zoe/api/zoe-helpers.html#zoehelpers-trade-leftitem-rightitem).
`satisfies()` checks if an allocation would satisfy a single offer's `want`s if that was the allocation passed
to `reallocate()`. `trade()`performs a trade between two offers given a declarative description of what each
side loses and gains. If the two `offerHandle` argument parts can trade, then swap their compatible assets, 
marking both offers as complete.

Any surplus remains with the original offer. For example if offer A gives 5 moola and offer B only wants
3 moola, offer A retains 2 moola.

```js
const { satisfies, trade } = makeZoeHelpers(zcf);

  function findMatchingTrade(newDetails, orders) {
    return orders.find(order => {
      return (
        satisfies(newDetails.offerHandle, { Out: order.amountIn }) &&
        satisfies(order.offerHandle, { Out: newDetails.amountIn })
      );
    });
  }

  function removeFromOrders(offerDetails) {
    const orders = lookupBookOrders(
      offerDetails.amountIn.brand,
      offerDetails.amountOut.brand,
    );
    orders.splice(orders.indexOf(offerDetails), 1);
  }
```

## trade()

One we find an offer that satisfies another offer, we use `trade()` to make the swap
and reallocate the assets. Then we remove the matching offer from the offer book, and
complete both offers. 

```js
function tradeWithMatchingOffer(offerDetails) {
    const orders = lookupBookOrders(
      offerDetails.amountOut.brand,
      offerDetails.amountIn.brand,
    );
    const matchingTrade = findMatchingTrade(offerDetails, orders);
    if (matchingTrade) {
      // reallocate by giving each side what it wants
      trade(
        {
          offerHandle: matchingTrade.offerHandle,
          gains: {
            Out: matchingTrade.amountOut,
          },
          losses: {
            In: offerDetails.amountOut,
          },
        },
        {
          offerHandle: offerDetails.offerHandle,
          gains: {
            Out: offerDetails.amountOut,
          },
          losses: {
            In: matchingTrade.amountOut,
          },
        },
      );
      removeFromOrders(matchingTrade);
      zcf.complete([offerDetails.offerHandle, matchingTrade.offerHandle]);

      return true;
    }
    return false;
  }
```

## Offer helpers

Of course, we need a way to add an offer to the offer book, and to get the details of an individual offer. 
```js
function addToBook(offerDetails) {
    const orders = lookupBookOrders(
      offerDetails.amountIn.brand,
      offerDetails.amountOut.brand,
    );
    orders.push(offerDetails);
  }

  function extractOfferDetails(offerHandle) {
    const {
      give: { In: amountIn },
      want: { Out: amountOut },
    } = zcf.getOffer(offerHandle).proposal;

    return {
      offerHandle,
      amountIn,
      amountOut,
    };
  }
  const exchangeOfferHook = offerHandle => {
    const offerDetails = extractOfferDetails(offerHandle);

    if (!tradeWithMatchingOffer(offerDetails)) {
      addToBook(offerDetails);
    }

    return defaultAcceptanceMsg;
  };
```

