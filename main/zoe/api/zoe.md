# Zoe

Zoe is a long-lived and well-trusted contract that enforces offer safety for the contracts that use it. Zoe has a single `seatAssay` and a single `escrowReceiptAssay` for the entirety of its lifetime. By having a reference to Zoe, a user can get the `seatAssay` or `escrowReceiptAssay` and thus validate any `seat` or `escrowReceipt` they receive from someone else.

## zoe.getSeatAssay()
- Returns: `{Assay}`

Get the long-lived `seatAssay`. The mint associated with the `seatAssay` creates the ERTP payments that represent the right to claim the payouts of involvement in a contract.

```js
```

## zoe.getEscrowReceiptAssay()
- Returns: `{Assay}`

Get the long-lived `escrowReceiptAssay`. The mint associated with the `escrowReceiptAssay` creates the ERTP payments that represent proof of escrow and may be passed into a smart contract method.

```js
```

## zoe.getAssaysForInstance()
- Returns: `{Array <Assay>}`

Returns the array of assays for the particular instance. This is helpful in the case that the user has forgotten the order.

```js
```

## zoe.makeInstance(installationHandle, terms)
- `installationHandle` `{Object}`
- `terms` `{Object}`
- Returns: `{InstanceInformation}`

Zoe is long-lived. We can use Zoe to create smart contract instances by specifying a particular contract installation to use, as well as the `terms` of the contract. The contract terms are the arguments to the contract, and must includ the expected assays for the underlying rights. (Other than th `assays` property of `terms`, the `terms` properties are up to the discretion of the smart contract.) We get back an instance,  handle for that instance, the handle for the installation, and th terms.

```js
```

## zoe.getInstance(instanceHandle)
- Returns: `{InstanceInformation}`

Credibly get the instance from the `instanceHandle`.

```js
```

## zoe.escrow(offerRules, payments)
- `offerRules` <router-link to="/zoe/api/structs.html#offerrules">`{OfferRules}`</router-link>
- `payments` `{Array <Payment>}`
- Returns: <router-link to="/zoe/api/structs.html#escrowreceiptandpayout">`{EscrowReceiptAndPayout}`</router-link>

To escrow, the user must provide a list of payments as well as their rules for the offer.

The rules for the offer are in two parts: `payoutRules` are used  by Zoe to enforce offer safety, and `exitRule` is used by Zoe  to enforce exit safety. `payoutRules` is a list of objects, each  with a `kind` property (such as 'offerExactly') and a units property. The objects in the `payoutRules` must be in the same order as the assays associated with a smart contract. That is, the units in index 0 of `payoutRules` should be a units for the assay in index 0 of the assays array.`payments` is an array of the actual payments to be escrowed, following the rules in the payoutRules. If the payoutRules kind is 'offerExactly' or 'offerAtMost', then a payment matching the units is expected. If the payoutRules kind is 'wantAtLeast' or 'wantExactly' then the payment will be ignored at escrow and should be `undefined`.

```js
```