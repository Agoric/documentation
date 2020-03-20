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
- Returns: `{Invite}`

Zoe is long-lived. We can use Zoe to create smart contract
instances by specifying a particular contract installation to
use, as well as the `issuerKeywordRecord` and `terms` of the contract. The
`issuerKeywordRecord` is a record mapping string names (keywords) to issuers,
such as `{ Asset: simoleanIssuer}`. (Note that the keywords must
begin with a capital letter and must be ASCII.) Parties to the
contract will use the keywords to index their proposal and
their payments.
The payout users receive from Zoe will be in the form of an object
with keywords as keys. Terms are the arguments to the contract,
such as the number of bids an auction will wait for before closing.
Terms are up to the discretion of the smart contract. We get back
an invite (an ERTP payment) to participate in the contract.

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

## zoe.redeem(invite, proposal, payments)
- `invite` `{Payment}`
- `proposal` <router-link to="/zoe/api/structs.html#propsal">`{Proposal}`</router-link>
- `payments` `{PaymentKeywordRecord}`
- Returns: `{SeatAndPayout}`

To redeem an invite, the user must provide a proposal (their rules for the
offer) as well as payments to be escrowed by Zoe.

The proposal has three parts: `want` and `give` are used
by Zoe to enforce offer safety, and `exit` is used to specify
the extent of payout liveness that Zoe can guarantee.

`want` and `give` are objects with keywords as keys and amounts
as values. `payments` is a record with keywords as keys,
and the values are the actual payments to be escrowed. A payment
is expected for every rule under `give`.

```js
// A user redeems their invite and escrows with Zoe
const { seat: userSeat, payout: userPayoutP } = await zoe.redeem(
  userInvite,
  userPropsal,
  userPayments,
);
```

## zoe.getOffer(inviteHandle)
- `inviteHandle` `{Payment}`
- Returns: `{Object <Offer>}`

Return the offer for the contract. Throws error if the offer is not found.

```js
const {
  offerRules: { want, offer },
} = zoe.getOffer(firstInviteHandle)
```

## zoe.getOffers

## zoe.isOfferActive
