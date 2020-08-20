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

## E(zoe).getBrands(instance)
- `instance` `{Instance}`
- Returns: `{BrandKeywordRecord}`

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
Returns: A set of key:value pairs **tyg todo: Is there a better way to state this here?**

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
- `zoe` `{zoeReference}` **tyg todo: What type is this?**
- Returns `{Issuer}`

Zoe has a single `invitationIssuer` for the entirety of its
lifetime. By having a reference to Zoe, a user can get the `invitationIssuer` and 
thus validate any `invitation` they receive
from someone else. The `mint` associated with the `invitationIssuer`
creates the ERTP `payments` that represent the right to interact with
a smart contract in particular ways.
```js
const invitationIssuer = await E(zoe).getInvitationIssuer();
// Here a user, Bob, has received an untrusted invitation from Alice.
// Bob uses the trusted `invitationIssuer` from Zoe to
// transform the untrusted invitation to a trusted one
const invitation = await invitationIssuer.claim(untrustedInvitation);
const invitationValue = await E(zoe).getInvitationDetails(invitation);
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

## E(zoe).install(code)
`code` `{String}`
Returns: `{Object}`

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
Returns: `{InstanceP}`

Returns a `Promise` for the contract `instance` the `invitation` argument is part of.
```js
const instance = await E(zoe).getInstance(invitation);
```
      
## E(zoe).getInstallation(invitation)
- `invitation` `{Invitation}`
- Returns: `{InstallationP}`

Returns a `Promise` for the contract `installation` the `invitation` arguments is part of.
```js
const installation = await E(zoe).getInstallation(invitation);
```
## E(zoe).startInstance(installationHandle, issuerKeywordRecord, terms)
- `installationHandle` `{Handle}`
- `issuerKeywordRecord` `{IssuerKeywordRecord}`
- `terms` `{Object}`
Returns: `{Invite, instanceRecord}`
We can use Zoe to create smart contract instances by specifying a particular contract installation to use, as well as the issuerKeywordRecord and terms of the contract. The issuerKeywordRecord is a record mapping string names (keywords) to issuers, such as { Asset: simoleanIssuer}. (Note that the keywords must begin with a capital letter and must be ASCII.) Parties to the contract will use the keywords to index their proposal and their payments. The payout that users receive from Zoe will be in the form of an object with keywords as keys. Terms are the arguments to the contract, such as the number of bids an auction will wait for before closing. Terms are up to the discretion of the smart contract. We get back a record of an invite (an ERTP payment) to participate in the contract and an instanceRecord so you have direct access to information such as the relevant instanceHandle.
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



---------------------------
**tyg todo: As mentioned in the standup, I think we now need to cover
API objects in the doc. I'm undecided if they should be one page with methods,
on have their own pages. Thoughts? For the time being, I'm including them on the
same page with a h1 heading**

# Objects

The Zoe API defines and uses several object types. This **tyg todo section/page** 
shows their definitions and discusses their uses.

## Installation Object

## Invitation Object
- `installation` `{Installation}`: The contract's Zoe installation.
- `instance` `{Instance}`: The contract instance this invitation is in.
- `invitationHandle` `{Handle}: A reference used to refer to this invitation.
- `description` `{String}`: A description of the invitation, covering what a recipient needs to know about the contract and participating in it, as well as anything about the invitation, such as an expiration date after which the invitation is invalid.

Represents an invitation to participate in a Zoe contract







 *
 * 
 *
 * @property {Install} install
 * @property {StartInstance} startInstance
 * @property {Offer} offer
 * @property {(instance: Instance) => Object} getPublicFacet
 * @property {(instance: Instance) => IssuerKeywordRecord} getIssuers
 * @property {(instance: Instance) => BrandKeywordRecord} getBrands
 * @property {(instance: Instance) => Object} getTerms
 * @property {(invitation: Invitation) => Promise<Instance>} getInstance
 * @property {(invitation: Invitation) => Promise<Installation>} getInstallation
 * @property {(invitation: Invitation) => Promise<InvitationDetails>}
 * getInvitationDetails - return an object with the instance,
 * installation, description, invitation handle, and any custom properties
 * specific to the contract.








getInvitationIssuer: () => invitationKit.issuer,
    install,
    getPublicFacet: instance =>
      instanceToInstanceAdmin.get(instance).getPublicFacet(),
    getTerms: instance => instanceToInstanceAdmin.get(instance).getTerms(),
    getInstance: invitation =>
      E(invitationKit.issuer)
        .getAmountOf(invitation)
        .then(amount => amount.value[0].instance),
    getInstallation: invitation =>
      E(invitationKit.issuer)
        .getAmountOf(invitation)
        .then(amount => amount.value[0].installation),
    getInvitationDetails: invitation =>
      E(invitationKit.issuer)
        .getAmountOf(invitation)
        .then(amount => amount.value[0]),
    startInstance: async (
      installation,
      uncleanIssuerKeywordRecord = harden({}),
      customTerms = harden({}),
    ) => {
      /** @param {Issuer[]} issuers */
      const initIssuers = issuers =>
        Promise.all(issuers.map(issuerTable.initIssuer));
      assert(
        installations.has(installation),
        details`${installation} was not a valid installation`,
      );

      const zoeSeatAdmins = new Set();
      const instance = makeHandle('InstanceHandle');

      const keywords = cleanKeywords(uncleanIssuerKeywordRecord);

      const issuerPs = keywords.map(
        keyword => uncleanIssuerKeywordRecord[keyword],
      );

      // The issuers may not have been seen before, so we must wait for the
      // issuer records to be available synchronously
      const issuerRecords = await initIssuers(issuerPs);
      issuerRecords.forEach(record => {
        if (!brandToPurse.has(record.brand)) {
          brandToPurse.init(record.brand, E(record.issuer).makeEmptyPurse());
        }
      });

      const issuers = arrayToObj(
        issuerRecords.map(record => record.issuer),
        keywords,
      );
      const brands = arrayToObj(
        issuerRecords.map(record => record.brand),
        keywords,
      );
      const maths = arrayToObj(
        issuerRecords.map(record => record.amountMath),
        keywords,
      );

      let instanceRecord = {
        installation,
        terms: {
          ...customTerms,
          issuers,
          brands,
          maths,
        },
      };




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

## E(zoe).startInstance(installationHandle, issuerKeywordRecord, terms)
- `installationHandle` <router-link to="/glossary/#handle">`{Handle}`</router-link>
- `issuerKeywordRecord` <router-link to="/zoe/api/records.html#issuerkeywordrecord">`{IssuerKeywordRecord}`</router-link>
- `terms` `{Object}`
- Returns: `{Invite, instanceRecord}`

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
Terms are up to the discretion of the smart contract. We get back a record
of an invite (an ERTP payment) to participate in the contract and an
instanceRecord so you have direct access to information such as the 
relevant instanceHandle.

```js
const issuerKeywordRecord = { 
  'Asset' : moolaIssuer, 
  'Price' : simoleanIssuer 
};
const terms = { numBids: 3 };
const { invite, instanceRecord } = await E(zoe).startInstance(
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
  instanceHandle,
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

To make an offer to a contract, the user must provide an invite to the 
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
  offerHandle,
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
  instanceHandle,
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
