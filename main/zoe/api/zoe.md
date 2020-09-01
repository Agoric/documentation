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
- Returns: `{Promise<BrandKeywordRecord>}`

Returns a `BrandKeywordRecord` containing all `brands` defined in the contract `instance`.
```js
const brandKeywordRecord = await E(zoe).getBrands(instance);
```
## E(zoe).getIssuers(instance)
- `instance` `{Instance}`
- Returns: `{Promise<IssuerKeywordRecord>}`

Returns a `IssuerKeywordRecord` containing all `issuers` defined in the `instance` argument.
```js
const issuerKeywordRecord = await E(zoe).getIssuers(instance);
```
## E(zoe).getTerms(instance)
- `instance` `{Instance}`
- Returns: `{Object}` 

Returns the terms of the `instance` argument, including its `issuers`, `brands` and any 
custom terms.
```js
const terms = await E(zoe).getTerms(instance);
```

## E(zoe).getPublicFacet(instance)
- `instance` `{Instance}`
- Returns: `{Promise<PublicFacet>}` 

A contract instance's `publicFacet` is an object available via Zoe to anyone knowing that `instance`. 
You use it for general queries and actions, such as getting a current price or creating public invitations.
Since a facet is defined just as any other object, the contract adds methods to the `publicFacet` just like you would
any object.

Returns a `publicFacet` containing the public facet defined for `instance`.
```js
const ticketSalesPublicFacet = await E(zoe).getPublicFacet(sellItemsInstance);
```
## E(zoe).getInvitationIssuer()
- Returns `{Issuer}`

Zoe has a single `invitationIssuer` for its entire
lifetime. By having a reference to Zoe, a user can get the `invitationIssuer`. This lets them claim any
invitation they receive from someone else by calling `E(invitationIssuer).claim()` with the
untrusted invitation as the argument. During the claiming process, the `invitationIssuer` validates
the invitation.

The `mint` associated with the `invitationIssuer`
creates `invitations` in the form of ERTP `payments` that represent the right to interact with
a smart contract in particular ways.

The `invitationIssuer` has two methods, both of which take an `invitation` as an argument.
Remember, an `invitation` is just a special case of an ERTP `payment`, so `claim()` and
`getAmountOf()` are the same as for other `issuers`.

A successful call of `invitationIssuer.claim(invitation)` means you are assured the `invitation`
is recognized as valid by the `invitationIssuer`. You are also assured the `invitation` is exclusively yours
and no one else has access to it.

```js
const invitationIssuer = await E(zoe).getInvitationIssuer();
// Here a user, Bob, has received an untrusted invitation from Alice.
// Bob uses the trusted `invitationIssuer` from Zoe to
// transform the untrusted invitation to a trusted one
const invitation = await invitationIssuer.claim(untrustedInvitation);
const { value: invitationValue } = await E(invitationIssuer).getAmountOf(
        invitation);
```

## E(zoe).getInvitationDetails(invitation)
- `invitation` `{Invitation}`
- Returns `{Promise<Object>}`

Takes an `invitation` as an argument and returns an object containing the following 
details about the `invitation`:
- `installation` `{Installation}`: The contract's installation in Zoe.
- `instance` `{Instance}`: The contract instance this invitation is for.
- `invitationHandle` `{Handle}`: A handle used to refer to this invitation.
- `description` `{String}`: describes the purpose of this `invitation`. Use it
   to match the invitation to the role it plays in the contract.
```js
const invitation = await invitationIssuer.claim(untrustedInvitation);
const invitationValue = await E(zoe).getInvitationDetails(invitation);
```

## E(zoe).install(bundle)
- `bundle` `{SourceBundle}`
- Returns: `{Promise<Installation>}`

Takes bundled source code for a Zoe contract as an argument and installs the code on Zoe.
Returns an `installation` object. 

```js
// bundleSource takes source code files and 
// bundles them together in the format install expects.
import bundleSource from '@agoric/bundle-source';
const bundle = await bundleSource(pathResolve(`./src/contract.js`));
const installationP = await E(zoe).install(bundle);
```

## E(zoe).getInstance(invitation)
- `invitation` `{Invitation}`
- Returns: `{Promise<Instance>}`

Returns a `Promise` for the contract `instance` the `invitation` is part of.
```js
const instance = await E(zoe).getInstance(invitation);
```
      
## E(zoe).getInstallation(invitation)
- `invitation` `{Invitation}`
- Returns: `{Promise<Installation>}`

Returns a `Promise` for the contract `installation` the `invitation`'s contract `instance` uses.
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
instance's `issuerKeywordRecord` (as key-value pairs). and `terms` 
for the contract.

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
- `creatorInvitation` `{Payment | undefined}`

A `publicFacet` is an object available via Zoe to anyone knowing 
the `instance` they are associated with. The `publicFacet` is used for general queries 
and actions, such as getting a current price or creating public invitations. Since a 
facet is defined just as any other object, 
the contract developer can add methods to them just like they would any object.

The `creatorFacet` is only available in this return value (i.e. only when starting
a contract instance). The contract designer 
should use it to encapsulate things that the contract runner might not want to share, 
or might want to control the distribution of. The party who starts the contract 
should carefully consider the impact before sharing access to the `creatorFacet`.

`creatorInvitation` is an invitation that the contract instance creator can use. 
It is usually used in contracts where the creator immediately sells 
something (auctions, swaps, etc.), so it's helpful for the creator to have 
an invitation to escrow and sell goods.

```js
const issuerKeywordRecord = { 
  'Asset' : moolaIssuer, 
  'Price' : quatlooIssuer 
};
const terms = { numBids: 3 };
const { invite, instanceRecord } = await E(zoe).startInstance(
  creatorFacet, publicFacet, creatorInvitation);
```
## E(Zoe).offer(invitation, proposal, paymentKeywordRecord)
- `invitation` `{Invitation|Promise<Invitation>}`
- `proposal` `{Proposal}`
- `paymentKeywordRecord` `{PaymentKeywordRecord}`
- Returns: `{Promise<UserSeat>}`

Used to redeem the `invitation` provided as the first argument.

To redeem an `invitation`, a user normally provides a `proposal` (the
rules under which they want to exercise the offer) as well as `payments` to be escrowed by Zoe.  If
either the `proposal `or `payments` are empty, indicate this by
omitting that argument or passing `undefined`, instead of passing an
empty record.

The `proposal` has three parts: 
- `want`: An object with keywords as keys and `amounts` as values.
- `give`: An object with keywords as keys and `amounts` as values.
- `exit`: Specifies the payout-liveness policy Zoe can guarantee for the offer.

`paymentKeywordRecord` is a record with keywords as keys, with
 values of the actual `payments` to be escrowed. A `payment` is
 expected for every entry under `give`.
 
 `offer()` returns a `promise` for a `userSeat`. 
 
