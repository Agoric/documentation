# Zoe

<Zoe-Version/>

Zoe provides a framework for deploying and working with smart contracts. It is accessed 
as a long-lived and well-trusted service that enforces offer safety for the contracts that use it. Zoe has a single `inviteIssuer` for the entirety of its lifetime. By having a reference to Zoe, a user can get the `inviteIssuer` and thus validate any `invite` they receive from someone else.

::: tip Zoe is accessed asynchronously
The Zoe service is accessed asynchronously, using a standards-track library extension
to JavaScript that uses promises as remote references. In code, the Zoe service instance 
is referred to via `zoe`, which only supports asynchronous invocation. Operations are 
invoked asynchronously using the [`E` helper for async messaging](https://github.com/tc39/proposal-eventual-send#e-and-esendonly-convenience-proxies). 
All such operations immediately return a promise for their result. That may eventually fulfill to a local value, or to a `Presence` for another remote object (e.g. in another contract or service, running on another chain, etc.). Async messages can be sent using `E` with either promises or presences. See the note in `getInviteIssuer` below.
:::

## E(zoe).getInviteIssuer()
- Returns: <router-link to="/ertp/api/issuer.html">`{Issuer}`</router-link>

Get the long-lived `inviteIssuer`. The mint associated with the `inviteIssuer` creates the ERTP payments that represent the right to participate in a contract.

```js
// Bob claims all with the Zoe inviteIssuer
const inviteIssuerP = E(zoe).getInviteIssuer();
const bobExclInvitePayment = await E(inviteIssuerP).claim(bobInvitePayment);
```

Note: in the example above, the `inviteIssuerP` is necessarily a promise because it 
is the result of an async message (using `E`). In this case, there is no need to
`await` it; the `claim` operation is sent immediately, and will be delivered once
the `inviteIssuerP` is fulfilled. 

## E(zoe).install(code, moduleFormat)
- `code` `{String}`
- `moduleFormat` `{String}`
- Returns: `{Object}`

Create an installation by safely evaluating the code and registering
it with Zoe. Returns an `installationHandle`. A <router-link to="/glossary/#handle">handle</router-link> is an opaque unique
identifier for the contract code.

```js
import bundleSource from '@agoric/bundle-source';

// Pack the contract.
const { sourceCode, moduleFormat } = await bundleSource(someContract);

// install and get the `installationHandle` for someContract
const installationHandleP = E(zoe).install(sourceCode, moduleFormat);
```

## E(zoe).makeInstance(installationHandle, issuerKeywordRecord, terms)
- `installationHandle` <router-link to="/glossary/#handle">`{Handle}`</router-link>
- `issuerKeywordRecord` <router-link to="/zoe/api/records.html#issuerkeywordrecord">`{IssuerKeywordRecord}`</router-link>
- `terms` `{Object}`
- Returns: <router-link to="/ertp/api/payment.html#payment">`{Invite}`</router-link>

We can use Zoe to create smart contract instances by specifying a
particular contract installation to use, as well as the
`issuerKeywordRecord` and `terms` of the contract. The
`issuerKeywordRecord` is a record mapping string names (keywords) to
issuers, such as `{ Asset: simoleanIssuer}`. (Note that the keywords
must begin with a capital letter and must be ASCII.) Parties to the
contract will use the keywords to index their proposal and their
payments. The payout that users receive from Zoe will be in the form of an
object with keywords as keys. Terms are the arguments to the contract,
such as the number of bids an auction will wait for before closing.
Terms are up to the discretion of the smart contract. We get back an
invite (an ERTP payment) to participate in the contract.

```js
const issuerKeywordRecord = { 
  'Asset' : moolaIssuer, 
  'Price' : simoleanIssuer 
};
const terms = { numBids: 3 };
const someInvite = await E(zoe).makeInstance(
  secondPriceAuctionInstallationHandle, 
  issuerKeywordRecord, 
  terms
);
```

## E(zoe).getInstanceRecord(instanceHandle)
- Returns: <router-link
  to="/zoe/api/records.html#instance-record">`{InstanceRecord}`</router-link>

Credibly get the instance record using the <router-link to="/glossary/#handle">`instanceHandle`</router-link> ID.

```js
const {
  handle,
  installationHandle,
  publicAPI,
  terms,
  issuerKeywordRecord,
  keywords,
} = await E(zoe).getInstanceRecord(instanceHandle);
```

## E(zoe).offer(invite, proposal, payments)
- `invite` <router-link to="/ertp/api/payment.html#payment">`{Payment}`</router-link>
- `proposal` <router-link to="/zoe/api/records.html#proposal">`{Proposal}`</router-link>
- `paymentKeywordRecord` <router-link to="/zoe/api/records.html#paymentkeywordrecord">`{PaymentKeywordRecord}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offerresultrecord">`Promise<{OfferResultRecord}>`</router-link>

To make an offer to a contract, the user must provide an invite ot the 
contract, a proposal (their rules for the offer), and the payments to be 
escrowed by Zoe. 

The proposal has three parts: `want` and `give` are used
by Zoe to enforce offer safety; `exit` is used to specify
the particular payout-liveness policy that Zoe can guarantee.
`want` and `give` are objects with keywords as keys and amounts
as values. 

The `paymentKeywordRecord` is a record with keywords as keys,
and the values are the actual payments to be escrowed. A payment
is required for every rule under `give`.

The resulting `OfferResultRecord` contains a handle for querying 
Zoe about the offer, a promise for the payouts when the offer 
is complete, a promise for the result of invoking the contract-specific
hook associated with the invitation, and if appropriate for the specified 
`exit` policy, a function to complete the offer.

```js
// A user makes an offer and escrows with Zoe using an invite 
const { offerHandle, payout: userPayoutP, outcome: outcomeP, completeObj } = 
  await E(zoe).offer(
    userInvite,
    userProposal,
    userPayments,
  );
```

## E(zoe).isOfferActive(offerHandle)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: `{Boolean}`

Check if the offer is still active. This method does not throw if the offer is inactive.

```js
const isActive = E(zoe).isOfferActive(someOfferHandle);
```

## E(zoe).getOffers(offerHandles)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{Array <OfferRecord>}`</router-link>

Get a list of offer records. Throws error if offers are not found.

```js
const offers = await E(zoe).getOffers(listOfOfferHandles);
```

## E(zoe).getOffer(offerHandle)
- `offerHandle` <router-link to="/glossary/#handle">`{Handle}`</router-link>
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{<OfferRecord>}`</router-link>

Get the offer record. Throws error if the offer is not found.

```js
const { 
  handle,
  installationHandle,
  publicAPI,
  terms
} = await E(zoe).getOffer(offerHandle);
```

## E(zoe).getInstallation(installationHandle)
- `installationHandle` `{InstallationHandle}`
- Returns: {String} the source code

Get the source code for the installed contract. Throws an error if the installationHandle is not found.

```js
const {
  handle,
  installationHandle,
  publicAPI,
  terms
} = await E(zoe).getOffer(offerHandle);
```

## E(zoe).getCurrentAllocation(offerHandle, sparseKeywords)
- `offerHandle` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `sparseKeywords` sparseKeywords is an array of string keywords, which may be a subset of allKeywords.
- Returns: <router-link to="/zoe/api/records.html#offer-record">`{<AmountKeywordRecord>}`</router-link>

Get the amounts associated with the sparseKeywords for the offer.

```js
const { foo, bar } = E(zoe).getCurrentAllocation(offerHandle, ['foo', 'bar']);
```

## E(zoe).getCurrentAllocations(offerHandles, sparseKeywords)
- `offerHandles` <router-link to="/glossary/#handle">`{Array <Handle>}`</router-link>
- `sparseKeywords` sparseKeywords is an array of string keywords, which may be a subset of allKeywords.
- Returns: <router-link to="/zoe/api/records.html#amount-keyword-record">`{ Array AmountKeywordRecord>}`</router-link>

Get the amounts associated with the sparseKeywords for the offers.


## zoe.getOfferNotifier(offerHandle)
- `offerHandle` <router-link to="/glossary/#handle">`<Handle>`</router-link>
- Returns: a <router-link to="/glossary/#notifier">notifier</router-link> for the offer.

```js
  const offerNotifer = E(zoe).getOfferNotifier(offerHandle);
  const { value, updateHandle, done } = offerNotifier.getUpdateSince();
  if (done) {
   <drop offer from list>
  }
  newValue = value;
  waitForNextUpdate(offerNotifier, updateHandle);
```
