# Structs

## EscrowReceiptAndPayout

This is returned by a call to `escrow` on Zoe. An `escrowReceipt` is an ERTP payment which acts as proof of escrow and is normally passed in to a smart contract. The `payout` is a promise that resolves to an array of payments.

```js
someEscrowReceiptAndPayout: {
  escrowReceipt: somePayment,
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

## PayoutRules

`payoutRules` are an array of `PayoutRule`. The possible kinds are 'offerExactly', 'offerAtMost', 'wantExactly', and  'wantAtLeast'. `units` should be a labeled extent.

```js
somePayoutRules: {
  kind: 'offerExactly',
  units: someExtent,
}
```

## ExitRule

The possible kinds are 'noExit', 'onDemand', and 'afterDeadline'. `timer` and `deadline` only are used for the `afterDeadline` kind.

```js
someExitRule: {
  kind: 'afterDeadline',
  timer: someTimer,
  deadline: 1893459600,
}
```