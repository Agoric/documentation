# Simple Exchange

<Zoe-Version/>

##### [View all example contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

The "simple exchange" is a very basic, un-optimized exchange. The
simple exchange has an order book for one asset, priced in a second
asset. The order book is naively kept as an array that is iterated over
to look for matches every time a new order arrives.
An unlimited number of parties can create new orders or accept existing
orders. The notifier allows callers to find the current list of orders.

SimpleExchange uses `Asset` and `Price` as its keywords. The contract treats
them symmetrically. New offers can be created and existing offers can be 
accepted in either direction.
```js
{ give: { 'Asset', simoleans(5) }, want: { 'Price', quatloos(3) } }
{ give: { 'Price', quatloos(8) }, want: { 'Asset', simoleans(3) } }
```

The `Asset` is an exact amount to be exchanged, while the
`Price` is a limit that may be improved on. SimpleExchange does
not partially fill orders.

The invitation returned on contract installation is the same as what
is returned by calling `publicAPI.makeInvite()`.

## Setting things up

This code at the start creates the arrays to make up our offer book, one for buyer offers
and one for seller offers. It also creates a notifier to let users see the current
order book contents.

Next, we bring in the ZoeHelper methods we'll be using with this contract. 

Finally, we declare and harden our keywords, `Asset` and `Price` for our offers.

```js
  let sellOfferHandles = [];
  let buyOfferHandles = [];
  const { notifier, updater } = produceNotifier();

  const {
    rejectOffer,
    checkIfProposal,
    swap,
    satisfies,
    getActiveOffers,
    assertKeywords,
  } = makeZoeHelpers(zcf);

  assertKeywords(harden(['Asset', 'Price']));
```

Next, we define two utility functions so we can present offers to users in 
a more readable format showing only their `want`s and `give`s and only showing
the currently active offers.

```js
  function flattenOffer(o) {
    return {
      want: o.proposal.want,
      give: o.proposal.give,
    };
  }

  function flattenOrders(offerHandles) {
    const result = zcf
      .getOffers(zcf.getOfferStatuses(offerHandles).active)
      .map(offerRecord => flattenOffer(offerRecord));
    return result;
  }
```
And finally, some functions to show the whole order book contents and 
a particular order in the readable flattened format. Also, a function
that tells the notifier there's been a change to the order book.
```js
  function getBookOrders() {
    return {
      buys: flattenOrders(buyOfferHandles),
      sells: flattenOrders(sellOfferHandles),
    };
  }

  function getOffer(offerHandle) {
    for (const handle of [...sellOfferHandles, ...buyOfferHandles]) {
      if (offerHandle === handle) {
        return flattenOffer(getActiveOffers([offerHandle])[0]);
      }
    }
    return 'not an active offer';
  }
  
  function bookOrdersChanged() {
    updater.updateState(getBookOrders());
  }
```
## Adding and processing offers

Skipping down near the end of the file, we find the code that makes 
invitations for instances of this contract. When an offer is submitted 
via the invitation, `exchangeOfferHook` will be invoked in the contract 
with a handle for the offer. `exchangeOfferHook`'s result is returned as 
the "outcome" of making the offer via the invitation. `'exchange'` is just
a descriptive name for the invite.
```js
const makeExchangeInvite = () =>
    zcf.makeInvitation(exchangeOfferHook, 'exchange');
```
Now we're at the meat of the contract. `swapIfCanTrade()` goes through
the order book looking for an existing offer that matches the new one. 
If there's a match (as determined by the `satisfies()` method), make 
the trade using the `swap()` method. Then return the handle for the 
matched offer. If not, return undefined, so the caller can know to add 
the new offer to the book. **tyg todo: Not sure how the caller does that?**
  
```js  
  function swapIfCanTrade(offerHandles, offerHandle) {
    for (const iHandle of offerHandles) {
      const satisfiedBy = (xHandle, yHandle) =>
        satisfies(xHandle, zcf.getCurrentAllocation(yHandle));
      if (
        satisfiedBy(iHandle, offerHandle) &&
        satisfiedBy(offerHandle, iHandle)
      ) {
        swap(offerHandle, iHandle);
        // return handle to remove
        return iHandle;
      }
    }
    return undefined;
  }
```

## Adding/Removing offers from the book
  
`swapIfCanTradeAndUpdateBook()` goes through the order book, checking
if `offerHandle` can be swapped with a `counterOffer`. If a swap happens, 
the matched order is removed from the book since it's been completed and
the remaining counteroffers are returned. If there is no swap, the `offerHandle`
offer is added to the order book and the unmodified `counterOffer`s are 
returned.
```
  function swapIfCanTradeAndUpdateBook(counterOffers, coOffers, offerHandle) {
    const handle = swapIfCanTrade(counterOffers, offerHandle);
    if (handle) {
      // remove the matched offer.
      counterOffers = counterOffers.filter(value => value !== handle);
    } else {
      // Save the order in the book
      coOffers.push(offerHandle);
    }

    return counterOffers;
  }
```
## Processing a new offer

When a new offer is made, `exchangeOfferHook` processes it
to either immediate completion or adding it to the order book.

First, it puts the proposal together from the `offer` **tyg todo: Actually not sure about this...**
```js
  const exchangeOfferHook = offerHandle => {
    const buyAssetForPrice = harden({
      give: { Price: null },
      want: { Asset: null },
    });
    const sellAssetForPrice = harden({
      give: { Asset: null },
      want: { Price: null },
    });
```
Next, it tries to match the new offer against first the buy offers
in the offer book, and if there isn't a match, against the sell offers. 
It tells the notifier that the offer book has changed (either a 
matched and then completed offer was removed, or the new offer added),
and returns an acknowledgement message.
;;;js
    if (checkIfProposal(offerHandle, sellAssetForPrice)) {
      buyOfferHandles = swapIfCanTradeAndUpdateBook(
        buyOfferHandles,
        sellOfferHandles,
        offerHandle,
      );
  
    } else if (checkIfProposal(offerHandle, buyAssetForPrice)) {
      sellOfferHandles = swapIfCanTradeAndUpdateBook(
        sellOfferHandles,
        buyOfferHandles,
        offerHandle,
      );
    } else {
      // Eject because the offer must be invalid
      return rejectOffer(offerHandle);
    }
    bookOrdersChanged();
    return defaultAcceptanceMsg;
  };
```

## Usage

The rest of this document covers how to use an
instance of the Simple Exchange contract.

## Instantiating the simple exchange

```js
const simpleExchangeInvite = await zoe.makeInstance(installationHandle, {
   Asset: moolaIssuer,
   Price: simoleanIssuer,
  });
const { instanceHandle } = inviteIssuer.getAmountOf(simpleExchangeInvite).extent[0];
const { publicAPI } = zoe.getInstance(instanceHandle);
const aliceInvite = publicAPI.makeInvite()
```

## Adding an order

A user, Alice, can escrow with Zoe to create a sell order. She wants to sell 3 moola and receive at least 4 simoleans in return:

```js
const aliceSellOrderProposal = harden({
  give: { Asset: moola(3) },
  want: { Price: simoleans(4) },
  exit: { onDemand: null },
});

const alicePayments = { Asset: aliceMoolaPayment };

// Alice escrows with Zoe and adds her sell order to the exchange
const { outcome: aliceOfferResult, payout: alicePayoutP } = await E(zoe).offer(
  aliceInvite,
  aliceSellOrderProposal,
  alicePayments,
);

// Alice creates an invite for another party to participate in the exchange
const bobInvite = publicAPI.makeInvite();
```

## Buying an order

Let's say that Bob hears about Alice's invite and decides he wants to
join. He will check the `installationHandle` and see that the exchange
is trading what he expects:

```js
// Bob collects information
const inviteIssuer = zoe.getInviteIssuer();
const bobExclusiveInvite = await inviteIssuer.claim(bobInvite);
const { instanceHandle } = inviteIssuer.getAmountOf(bobExclusiveInvite).extent[0];
const {
  installationHandle: bobInstallationId,
  issuerKeywordRecord: bobIssuers,
} = zoe.getInstance(instanceHandle);

// Bob checks the information is what he expects
assert(bobInstallationId === installationHandle, details`wrong installation`);
assert(bobIssuers.Asset === moolaIssuer, details`wrong Asset issuer`);
assert(bobIssuers.Price === simoleanIssuer, details`wrong Price issuer`);
```

Now that Bob has checked to make sure everything is in order, he proceeds to fulfill the buy order:

```js
// Bob creates his proposal
const bobBuyOrderProposal = harden({
  give: { Price: simoleans(7) },
  want: { Asset: moola(3) },
  exit: { onDemand: null },
});

const bobPayments = { Price: bobSimoleanPayment };

// Bob escrows with zoe and adds an order to the exchange
const { outcome: bobOfferResult, payout: bobPayoutP } = await E(zoe).offer(
  bobExclusiveInvite,
  bobBuyOrderProposal,
  bobPayments,
);

```

## Payout

If a match is made, the payout promise that the user receives when
they escrow with Zoe is resolved to a record of promises for payments with keyword keys:

```js
const bobPayout = await bobPayoutP;
const alicePayout = await alicePayoutP;

const bobMoolaPayout = await bobPayout.Asset;
const bobSimoleanPayout = await bobPayout.Price;
const aliceMoolaPayout = await alicePayout.Asset;
const aliceSimoleanPayout = await alicePayout.Price;
```
