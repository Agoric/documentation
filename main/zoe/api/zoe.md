# Zoe

Zoe is a long-lived and well-trusted contract that enforces offer safety for the contracts that use it. Zoe has a single `inviteAssay` and a single `escrowReceiptAssay` for the entirety of its lifetime. By having a reference to Zoe, a user can get the `inviteAssay` or `escrowReceiptAssay` and thus validate any `invite` or `escrowReceipt` they receive from someone else.

### <span style="color:red">Zoe and ZoeContractFacet have some similar methods so those examples are the same. Those should be double-checked to make sure they are accurate in both locations. Methods: getInviteAssay, getEscrowReceiptAssay.</span>


## zoe.getInviteAssay()
- Returns: `{Assay}`

Get the long-lived `seatAssay`. The mint associated with the `seatAssay` creates the ERTP payments that represent the right to claim the payouts of involvement in a contract.

```js
// Bob claims all with the Zoe inviteAssay
const inviteAssay = zoe.getInviteAssay();
const bobExclInvitePayment = await inviteAssay.claimAll(bobInvitePayment);
```

## zoe.getEscrowReceiptAssay()
- Returns: `{Assay}`

Get the long-lived `escrowReceiptAssay`. The mint associated with the `escrowReceiptAssay` creates the ERTP payments that represent proof of escrow and may be passed into a smart contract method.

```js
const escrowReceiptAssay = zoe.getEscrowReceiptAssay();
```

## zoe.install(code)
- `code` `{String}`
- Returns: `{Object}`

Create an installation by safely evaluating the code and registering it with Zoe. Returns an `installationHandle`.

```js
import bundleSource from '@agoric/bundle-source';

// Pack the contract.
const { sourceCode, moduleFormat } = await bundleSource(someContract);

// create an `installationHandle` for someContract
const installationHandle = zoe.install(sourceCode, moduleFormat);
```

## zoe.getAssaysForInstance(installationHandle)
- `installationHandle` `{Object}`
- Returns: `{Array <Assay>}`

Returns the array of assays for the particular instance. This is helpful in the case that the user has forgotten the order.

```js
const contractAssays = await E(zoe).getAssaysForInstance(instanceHandle);
```

## zoe.makeInstance(installationHandle, terms)
- `installationHandle` `{Object}`
- `terms` `{Object}`
- Returns: `{InstanceInformation}`

Zoe is long-lived. We can use Zoe to create smart contract instances by specifying a particular contract installation to use, as well as the `terms` of the contract. The contract terms are the arguments to the contract, and must include the expected assays for the underlying rights. (Other than the `assays` property of `terms`, the `terms` properties are up to the discretion of the smart contract.) We get back an instance, a handle for that instance, the handle for the installation, and the terms.

```js
const {
  instance: automaticRefund,
  instanceHandle
} = await E(zoe).makeInstance(installId, { assays });
```

## zoe.getInstance(instanceHandle)
- Returns: `{InstanceInformation}`

Credibly get the instance from the `instanceHandle`.

```js
const {
  instance: swap,
  installationHandle, terms
} = await E(zoe).getInstance(instanceHandle);
```

## zoe.escrow(offerRules, payments)
- `offerRules` <router-link to="/zoe/api/structs.html#offerrules">`{OfferRules}`</router-link>
- `payments` `{Array <Payment>}`
- Returns: <router-link to="/zoe/api/structs.html#escrowreceiptandpayout">`{EscrowReceiptAndPayout}`</router-link>

To escrow, the user must provide a list of payments as well as their rules for the offer.

The rules for the offer are in two parts: `payoutRules` are used  by Zoe to enforce offer safety, and `exitRule` is used by Zoe  to enforce exit safety. `payoutRules` is a list of objects, each  with a `kind` property (such as 'offerExactly') and a units property. The objects in the `payoutRules` must be in the same order as the assays associated with a smart contract. That is, the units in index 0 of `payoutRules` should be a units for the assay in index 0 of the assays array.`payments` is an array of the actual payments to be escrowed, following the rules in the payoutRules. If the payoutRules kind is 'offerExactly' or 'offerAtMost', then a payment matching the units is expected. If the payoutRules kind is 'wantAtLeast' or 'wantExactly' then the payment will be ignored at escrow and should be `undefined`.

```js
const {
  escrowReceipt: aliceEscrowReceipt,
  payout: payoutP
} = await E(zoe).escrow(offerRules, offerPayments);
```