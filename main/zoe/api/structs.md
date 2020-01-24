# Structs

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
  payoutRules: [payoutRule1, payoutRule2, payoutRule3],
  exitRule: someExitRule,
}
```

## PayoutRule

`payoutRules` are an array of `PayoutRule`. The possible kinds are 'offerAtMost' and 'wantAtLeast'.

```js
somePayoutRules: {
  kind: 'offerAtMost',
  units: someUnit,
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