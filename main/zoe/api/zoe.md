# Zoe

Zoe is a long-lived and well-trusted contract that enforces offer safety for the contracts that use it. Zoe has a single `inviteAssay` for the entirety of its lifetime. By having a reference to Zoe, a user can get the `inviteAssay` and thus validate any `invite` they receive from someone else.

## zoe.getInviteAssay()
- Returns: `{Assay}`

Get the long-lived `inviteAssay`. The mint associated with the `inviteAssay` creates the ERTP payments that represent the right to claim the payouts of involvement in a contract.

```js
// Bob claims all with the Zoe inviteAssay
const inviteAssay = zoe.getInviteAssay();
const bobExclInvitePayment = await inviteAssay.claimAll(bobInvitePayment);
```

## zoe.install(code, moduleFormat)
- `code` `{String}`
- `moduleFormat` `{String}`
- Returns: `{Object}`

Create an installation by safely evaluating the code and registering it with Zoe. Returns an `installationHandle`.

```js
import bundleSource from '@agoric/bundle-source';

// Pack the contract.
const { sourceCode, moduleFormat } = await bundleSource(someContract);

// create an `installationHandle` for someContract
const installationHandle = zoe.install(sourceCode, moduleFormat);
```

## zoe.makeInstance(installationHandle, terms)
- `installationHandle` `{Object}`
- `terms` `{Object}`
- Returns: `{Payment}`

Zoe is long-lived. We can use Zoe to create smart contract instances by specifying a particular contract installation to use, as well as the `terms` of the contract. The contract terms are the arguments to the contract, and must include the expected assays for the underlying rights. (Other than the `assays` property of `terms`, the `terms` properties are up to the discretion of the smart contract.) We get back an invite (an ERTP payment) to participate in the contract.

```js
const someInvite = await E(zoe).makeInstance(isntallationHandle, { assays });
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

## zoe.redeem(invite, offerRules, payments)
- `invite` `{Payment}`
- `offerRules` <router-link to="/zoe/api/structs.html#offerrules">`{OfferRules}`</router-link>
- `payments` `{Array <Payment>}`
- Returns: `{SeatAndPayout}`

To redeem an invite, the user must provide a list of payments as well as their rules for the offer.

The rules for the offer are in two parts: `payoutRules` are used by Zoe to enforce offer safety, and `exitRule` is used by Zoe to enforce exit safety. `payoutRules` is a list of objects, each with a `kind` property (such as 'offerAtMost') and a units property. The objects in the `payoutRules` must be in the same order as the assays associated with a smart contract. That is, the units in index 0 of `payoutRules` should be a units for the assay in index 0 of the assays array.`payments` is an array of the actual payments to be escrowed, following the rules in the payoutRules. If the payoutRules kind is 'offerAtMost', then a payment matching the units is expected. If the payoutRules kind is 'wantAtLeast' then the payment will be ignored and should be `undefined`.

```js
// A user redeems their invite and escrows with Zoe
const { seat: userSeat, payout: userPayoutP } = await zoe.redeem(
  userInvite,
  userOfferRules,
  userPayments,
);
```
