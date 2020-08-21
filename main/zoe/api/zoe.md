# Zoe

<Zoe-Version/>

Zoe provides a framework for deploying and working with smart contracts. It is accessed 
as a long-lived and well-trusted service that enforces offer safety for the contracts that use it. Zoe has a single `invitationIssuer` for the entirety of its lifetime. By having a reference to Zoe, a user can get the `invitationIssuer` and thus validate any `invitation` they receive from someone else.

::: tip Zoe is accessed asynchronously
The Zoe service is accessed asynchronously, using a standards-track library extension
to JavaScript that uses promises as remote references. In code, the Zoe service instance 
is referred to via `zoe`, which only supports asynchronous invocation. Operations are 
invoked asynchronously using the [`E` helper for async messaging](https://github.com/tc39/proposal-eventual-send#e-and-esendonly-convenience-proxies). 
All such operations immediately return a promise for their result. That may eventually fulfill to a local value, or to a `Presence` for another remote object (e.g. in another contract or service, running on another chain, etc.). Async messages can be sent using `E` with either promises or presences. 

For more information about using `E`, see the section on it in [Agoric's JavaScript Distributed Programming Guide](https://agoric.com/documentation/distributed-programming.html). 
:::


**tyg todo: Does cleanProposal.js need to be documented?**
**tyg todo: Where should the "start" method(?) be documented? i.e.**
```js
const start = zcf => {
  ...
  // your code here
  return harden({ creatorFacet, creatorInvitation, publicFacet });
}
harden(start);
export { start };
```

## E(zoe).getBrands(instance)
- `instance` `{Instance}`
- Returns: `{BrandKeywordRecord}`

**tyg todo: Should all the "getFoo()" methods return** {Promise<Record>}? 
**tyg todo: And related, are they always called with "await"?**

Returns a `BrandKeywordRecord` containing all `brands` defined in the argument contract `instance`.
```js
const brandKeywordRecord = await E(zoe).getBrands(instance);
```
## E(zoe).getIssuers(instance)
- `instance` `{Instance}`
- Returns: `{IssuerKeywordRecord}`

Returns a `IssuerKeywordRecord` containing all `issuers` defined in the argument contract `instance`.
```js
const issuerKeywordRecord = await E(zoe).getIssuers(instance);
```
## E(zoe).getTerms(instance)
- `instance` `{Instance}`
- Returns: `{Object}` consisting of key:value pairs **tyg todo: Is there a better way to state this here?**
**tyg todo: Not sure if this is right, or if it should be the same as zcf.getTerms()**
Terms let a contract instance creator further customize the contract operations, 
as enabled by the contract code. Contract terms can be expressed without specific values. 
For example, an auction contract may define minimum bid and minimum raise variables and 
use them in its code, but the variables are not given values in the code. 
Instead, the terms given at contract instantiation provide the variables’ values.
```js
const terms = await E(zoe).getTerms(instance);
```

## E(zoe).getPublicFacet(instance)
- `instance` `{Instance}`
- Returns: `{PublicFacet}`  **tyg todo: Is this right?**

A contract instance's `publicFacet` is an object available via Zoe to anyone knowing that `instance`. 
You use it for general queries and actions, such as getting a current price or creating public invitations.
**tyg todo: I'd really like to beef this up a bit, including what needs and should be done for a contract
developer to create a publicFacet (or pointer to same) and details of how to use it. Is it just publicFacet.getCurrentPrice() or similar
depending on its definition?**

Returns a `IssuerKeywordRecord` containing the public facet defined in the argument contract `instance`.
```js
const ticketSalesPublicFacet = await E(zoe).getPublicFacet(sellItemsInstance);
```
## E(zoe).getInvitationIssuer()
- Returns `{Issuer}`

Zoe has a single `invitationIssuer` for its entire
lifetime. By having a reference to Zoe, a user can get the `invitationIssuer` and 
validate any `invitation` they receive
from someone else by calling `invitationIssuer.claim()` with the 
untrusted invitation as the argument.

The `mint` associated with the `invitationIssuer`
create `invitations` in the form of ERTP `payments` that represent the right to interact with
a smart contract in particular ways.

**tyg todo: Need more info on how to use this, including just making invitations and
what the .claim and .getAmountOf methods do/are for**
```js
const invitationIssuer = await E(zoe).getInvitationIssuer();
// Here a user, Bob, has received an untrusted invitation from Alice.
// Bob uses the trusted `invitationIssuer` from Zoe to
// transform the untrusted invitation to a trusted one
const invitation = await invitationIssuer.claim(untrustedInvitation);
const invitationValue = await E(zoe).getInvitationDetails(invitation);
const { value: invitationValue } = await E(invitationIssuer).getAmountOf(
        invitation);
```
## E(zoe).getInvitationDetails(invitation)
- `invitation` `{Invitation}`
- Returns `{Object}`

Takes an `invitation` as an argument and returns an object containing the following 
details about the argument:
- `installation` `{Installation}`: The contract's Zoe installation.
- `instance` `{Instance}`: The contract instance this invitation is in.
- `invitationHandle` `{Handle}`: A reference used to refer to this invitation.
- `description` `{String}`: A description of the invitation, covering what a recipient needs to know about the contract and participating in it, as well as anything about the invitation, such as an expiration date after which the invitation is invalid.
```js
const invitation = await invitationIssuer.claim(untrustedInvitation);
const invitationValue = await E(zoe).getInvitationDetails(invitation);
```

## E(zoe).install(bundle)
- `bundle` `{SourceBundle}`
- Returns: `{Promise<Installation>}`

Takes bundled source code for a Zoe contract as an argument and installs the code on Zoe.
Returns an `installation` object. **tyg todo: Cover how to get code bundled (or link to same)**

```js
import automaticRefundBundle from './bundle-automaticRefund';
import coveredCallBundle from './bundle-coveredCall';
import publicAuctionBundle from './bundle-publicAuction';
const zoe = await E(vats.zoe).buildZoe(vatAdminSvc);
const installations = {
  automaticRefund: await E(zoe).install(automaticRefundBundle.bundle),
  coveredCall: await E(zoe).install(coveredCallBundle.bundle),
  publicAuction: await E(zoe).install(publicAuctionBundle.bundle),
```

## E(zoe).getInstance(invitation)
- `invitation` `{Invitation}`
- Returns: `{Promise<Instance>}`

Returns a `Promise` for the contract `instance` the `invitation` argument is part of.
```js
const instance = await E(zoe).getInstance(invitation);
```
      
## E(zoe).getInstallation(invitation)
- `invitation` `{Invitation}`
- Returns: `{Promise<Installation>}`

Returns a `Promise` for the contract `installation` the `invitation` arguments is part of.
```js
const installation = await E(zoe).getInstallation(invitation);
```
## E(zoe).startInstance(installation, issuerKeywordRecord, terms)
- `installation` `{Installation}`
- `issuerKeywordRecord` `{IssuerKeywordRecord}`
- `terms` `{Object}`
- Returns: `{Promise<StartInstanceResult>}`

Create an `instance` of the installed smart contract (specified by 
the `installation` argument). You must also specify the 
instance's `issuerKeywordRecord` and `terms` for the contract 
(as key-value pairs). 

The `issuerKeywordRecord` is a record mapping string names (keywords) 
to `issuers`, such as `{ Asset: quatlooIssuer}`. Keywords must begin 
with a capital letter and must be ASCII. Parties to the contract will 
use the keywords to index their proposal and their payments. 

`terms` are values used by this contract instance, such as the 
number of bids an auction will wait for before closing. These values may
be different for different instances of the same contract, but the contract
defines what variables need their values passed in as `terms`. 

It returns a `promise` for a `StartInstanceResult` object. The object consists of:
- `creatorFacet` `{any}`
- `publicFacet` `{any}`
- `instance` `{Instance}`
- `creatorInvitation `{Payment | undefined}`

**tyg todo: How is the creatorInvitation used?**
```js
const issuerKeywordRecord = { 
  'Asset' : moolaIssuer, 
  'Price' : quatlooIssuer 
};
const terms = { numBids: 3 };
const { invite, instanceRecord } = await E(zoe).startInstance(
  auctionInstallationHandle, 
  issuerKeywordRecord, 
  terms
);
```
## E(Zoe).offer(invitation, proposal, paymentKeywordRecord)
- `invitation` `{Invitation|Promise<Invitation>}`
- `proposal` `{Proposal}`
- `paymentKeywordRecord` `{PaymentKeywordRecord}`
- Returns: `{Promise<UserSeat>}`

Used to exercise the `invitation` provided as the first argument.

To redeem (sometimes called "excercise") an `invitation`, a user normally provides a `proposal` (their
rules for the offer) as well as `payments` to be escrowed by Zoe.  If
either the `proposal `or `payments` are empty, indicate this by
omitting that argument or passing `undefined`, instead of passing an
empty record.

The `proposal` has three parts: 
- `want`: An object with keywords as keys and amounts as values.
- `give`: An object with keywords as keys and amounts as values.
- `exit`: Specifies the payout-liveness policy Zoe can guarantee for the offer.

`paymentKeywordRecord` is a record with keywords as keys, with
 values of the actual `payments` to be escrowed. A `payment` is
 expected for every rule under `give`.
 
 `offer()` returns a `promise` for a `userSeat`. See the Objects section for its
 description.
 ```js
 **tyg todo: Need good source code**
 ```


---------------------------
**tyg todo: As mentioned in the standup, I think we now need to cover
API objects in the doc. I'm undecided if they should be one page with methods,
on have their own pages. Thoughts? For the time being, I'm including them on the
same page with a h1 heading**

# Objects

The Zoe API defines and uses several object types. This **tyg todo section/page** 
shows their definitions and discusses their uses.

## Installation Object

`installation` objects represent stored in Zoe contract source code. 
They have one method and no properties.

- installation.getBundle()
  - Returns: `{SourceBundle}`
  - Gets and returns the bundled source code for its associated contract.

## StartInstanceResult Object
`startInstance()` returns a `promise` for a `StartInstanceResult` object. It has four properties: of:
- `creatorFacet` `{any}`
- `publicFacet` `{any}`
- `instance` `{Instance}`
- `creatorInvitation `{Payment | undefined}`
 

## InvitationDetails Object

`invitationDetails` objects have four properties:
- `installation` `{Installation}`: The contract's Zoe installation.
- `instance` `{Instance}`: The contract instance this `invitation` is in.
- `invitationHandle` `{Handle}: A reference that refers to this `invitation`.
- `description` `{String}`: A description of the `invitation`, covering what 
  a recipient needs to know about the contract and participating in it.
  Also anything else about the `invitation`, such as an expiration date after
  which the `invitation` is invalid.

## ProposalRecord Object

A `proposalRecord` has three properties:
- `give: AmountKeywordRecord`
- `want: AmountKeywordRecord`
- `exit: ExitRule
  - `exitRule` must be one of these three values: **tyg todo: Need info on what each does**
    - `'onDemand'`
    - `'afterDeadline'`
    - `'waived'`

## UserSeat Object
A `userSeat` object has eight methods and one property. The methods are:
- getCurrentAllocation() => 
  - Returns: `{Promise<Allocation>}` 
- getProposal()
  - Returns: `{Promise<ProposalRecord>}` 
- getPayouts()
  - Returns: `{Promise<PaymentPKeywordRecord>}`
- getPayout(keyword: Keyword)
  - Returns: `{Promise<Payment>}` 
- getOfferResult()
  - Returns: `{Promise<OfferResult>}`
- tryExit() 
  - Returns: `void` 
- hasExited()
  - Returns: `{Promise<boolean>}` 
- getNotifier()
  - Returns: `{Promise<Notifier>}`
 
 **tyg todo: Any more details we should go into on these?


# Deprecated Zoe Methods

These are the methods in 0.7 that look to be deprecated in Alpha. 
Just want to be sure I can delete from here to the end.


## E(zoe).getInstanceRecord(instanceHandle)
- Returns: <router-link
  to="/zoe/api/records.html#instance-record">`{InstanceRecord}`</router-link>

Credibly get the instance record using the <router-link to="/glossary/#handle">`instanceHandle`</router-link> ID.

```js
const {
  instanceHandle,
  installationHandle,
  publicAPI,
  terms,
  issuerKeywordRecord,
  keywords,
} = await E(zoe).getInstanceRecord(instanceHandle);
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
  offerHandle,
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


## E(zoe).getOfferNotifier(offerHandle)
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
