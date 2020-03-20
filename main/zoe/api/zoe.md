# Zoe

<Zoe-Version/>

Zoe is a long-lived and well-trusted contract that enforces offer safety for the contracts that use it. Zoe has a single `inviteIssuer` for the entirety of its lifetime. By having a reference to Zoe, a user can get the `inviteIssuer` and thus validate any `invite` they receive from someone else.

## zoe.getInviteIssuer()
- Returns: `{Issuer}`

Get the long-lived `inviteIssuer`. The mint associated with the `inviteIssuer` creates the ERTP payments that represent the right to claim the payouts of involvement in a contract.

```js
// Bob claims all with the Zoe inviteIssuer
const inviteIssuer = zoe.getInviteIssuer();
const bobExclInvitePayment = await inviteIssuer.claimAll(bobInvitePayment);
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

## zoe.makeInstance(installationHandle, issuerKeywordRecord, terms)
- `installationHandle` `{Object}`
- `issuerKeywordRecord` `{Object}`
- `terms` `{Object}`
- Returns: `{Payment}`

Zoe is long-lived. We can use Zoe to create smart contract instances by specifying a particular contract installation to use, its <router-link to="/zoe/api/structs.html#offerrules">keywords</router-link>, as well as the terms of the contract.

The `issuerKeywordRecord` should have strings as keys (called keywords), and issuers as values (called args).

`terms` should be used for any contract-specific parameters, such as the number of bids an
auction should wait for before closing. (These parameters are up to the discretion of the smart contract.)

We get back an invite (an ERTP payment) to participate in the contract.

```js
const keywords = { 'Asset' : moolaIssuer, 'Price' : simoleanIssuer }
const someInvite = await E(zoe).makeInstance(installationHandle, keywords, terms);
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
- `payments` `{Object <Payment>}`
- Returns: `{SeatAndPayout}`

To redeem an invite, the user must provide a list of payments as well as their rules for the offer.

Payments to be escrowed must be an object keyed by `keywords`.

```js
// A user redeems their invite and escrows with Zoe
const { seat: userSeat, payout: userPayoutP } = await zoe.redeem(
  userInvite,
  userOfferRules,
  userPayments,
);
```
