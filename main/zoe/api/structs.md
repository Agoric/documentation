# Structs

<Zoe-Version/>

## SeatAndPayout

This is returned by a call to `redeem` on Zoe. A seat is an arbitrary object whose methods allow the user to take certain actions. The payout is a promise that resolves to an array of promises for payments. Note that while the payout promise resolves when an offer is completed, the promise for each payment resolves after the remote issuer successfully withdraws the payment.

```js
someSeatAndPayout: {
  seat: someSeat,
  payout: someArrayOfPayments,
}
```

## OfferRules

```js
someOfferRules: {
  offer: { Asset: moolaAmountMath.make(4) },
  want: { Price: simoleansAmountMath.make(15) },
  exit: { afterDeadline: {
    timer,
    deadline: 100,
  }}
}
```
Each contract has its own specific `keywords`.
Keywords are unique identifiers per contract, that tie together
the offer rules, payments to be escrowed, and payouts to the user.
In the above example, "Asset" and "Price" are keywords.
And in an auction instance, the keywords might be "Asset" and "Bid".

Users should submit their payments using keywords:

```js
const payments = { Asset: moolaPayment };
```

And, users will receive their payouts with keywords as the keys of a
payout object:

```js
moolaPurse.deposit(payout.Asset);
```

## PayoutRule

`payoutRules` are an array of `PayoutRule`. The possible kinds are 'offerAtMost' and 'wantAtLeast'.

```js
somePayoutRules: {
  kind: 'offerAtMost',
  amount: someAmount,
}
```

## ExitRule

The possible kinds are 'waived', 'onDemand', and 'afterDeadline'. `timer` and `deadline` only are used for the `afterDeadline` kind.

```js
someExitRule: {
  kind: 'afterDeadline',
  timer: someTimer,
  deadline: 1893459600,
}
```

## OfferStatusesRecord

`active` and `inactive` lists of offerHandles.

```js
someOfferStatusesRecord: {
  active: someListOfOfferHandles,
  inactive: anotherListOfOfferHandles
}
```
