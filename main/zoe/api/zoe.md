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

For more information about using `E`, see the section on it in [Agoric's JavaScript Distributed Programming Guide](/guides/js-programming/eventual-send.md).
:::

## `E(zoe).getBrands(instance)`
- `instance` `{Instance}`
- Returns: `{Promise<BrandKeywordRecord>}`

Returns a `BrandKeywordRecord` containing all `brands` defined in the contract `instance`.

A `BrandKeywordRecord` is a record where the keys are keywords,
and the values are the `brands` for particular `issuers`.
```js
// Call example
const brandKeywordRecord = await E(zoe).getBrands(instance);
```
```js
// Record example
const brandKeywordRecord = {
  Asset: quatloosBrand,
  Price: moolaBrand,
};
```
## `E(zoe).getIssuers(instance)`
- `instance` `{Instance}`
- Returns: `{Promise<IssuerKeywordRecord>}`

Returns a `IssuerKeywordRecord` containing all `issuers` defined in the `instance` argument.

An `IssuerKeywordRecord` is a record where the keys are keywords,
and the values are `issuers`.

```js
// Call example
const issuerKeywordRecord = await E(zoe).getIssuers(instance);
```
```js
// Record example
const issuerKeywordRecord = {
  Asset: quatloosIssuer,
  Price: moolaIssuer,
};
```
## `E(zoe).getTerms(instance)`
- `instance` `{Instance}`
- Returns: `{Object}`

Returns the terms of the `instance` argument, including its `issuers`, `brands`, and any
custom terms. The returned values look like:
```js
{ brands, issuers, customTermA, customTermB ... }
//where brands and issuers are keywordRecords, like:

{
    brands: { A: moolaKit.brand, B: simoleanKit.brand },
    issuers: { A: moolaKit.issuer, B: simoleanKit.issuer },
    customTermA: 'something',
    customTermB: 'something else',
 };
 ```
```js
const terms = await E(zoe).getTerms(instance);
```

## `E(zoe).getPublicFacet(instance)`
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
## `E(zoe).getInvitationIssuer()`
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
const { value: invitationValue } =
    await E(invitationIssuer).getAmountOf(invitation);
```

## `E(zoe).getInvitationDetails(invitation)`
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

## `E(zoe).install(bundle)`
- `bundle` `{SourceBundle}`
- Returns: `{Promise<Installation>}`

Takes bundled source code for a Zoe contract as an argument and installs the code on Zoe.
Returns an `installation` object.

An `installation` is an object with one property:
- `bundle`:  The contract source code, accessible via `bundle.source`, and other info.

```js
// bundleSource takes source code files and
// bundles them together in the format install expects.
import bundleSource from '@agoric/bundle-source';
const bundle = await bundleSource(pathResolve(`./src/contract.js`));
const installationP = await E(zoe).install(bundle);
```

## `E(zoe).getInstance(invitation)`
- `invitation` `{Invitation}`
- Returns: `{Promise<Instance>}`

Returns a `Promise` for the contract `instance` the `invitation` is part of.

While `instances` are opaque objects, you can get information about them via
these methods:
- `getBrands()`
- `getTerms()`
- `getIssuers()`
- `getPublicFacet()`

```js
const instance = await E(zoe).getInstance(invitation);
```

## `E(zoe).getInstallation(invitation)`
- `invitation` `{Invitation}`
- Returns: `{Promise<Installation>}`

Returns a `Promise` for the contract `installation` the `invitation`'s contract instance uses.

An `installation` is an object with one property:
- `bundle`:  The contract source code, accessible via `bundle.source`, and other info.

```js
const installation = await E(zoe).getInstallation(invitation);
```

## `E(zoe).startInstance(installation, issuerKeywordRecord, terms)`
- `installation` `{ERef<Installation>}`
- `issuerKeywordRecord` `{IssuerKeywordRecord}`
- `terms` `{Object}`
- Returns: `{Promise<StartInstanceResult>}`

Create an instance of the installed smart contract (specified by
the `installation` argument). You must also specify the
instance's `issuerKeywordRecord` (as key-value pairs) and `terms`
for the contract.

The `issuerKeywordRecord` is a record mapping string names (keywords)
to issuers, such as `{ Asset: quatlooIssuer}`. Keywords must begin
with a capital letter and must be ASCII. Parties to the contract will
use the keywords to index their proposal and their payments.

The `terms` are values used by this contract instance, such as the
number of bids an auction will wait for before closing. These values may
be different for different instances of the same contract, but the contract
defines what variables need their values passed in as `terms`.

It returns a promise for a `StartInstanceResult` object. The object consists of:
- `adminFacet` `{any}`
- `creatorFacet` `{any}`
- `publicFacet` `{any}`
- `instance` `{Instance}`
- `creatorInvitation` `{Payment | undefined}`

The `adminFacet` has two methods:
- `getVatShutdownPromise()`    
  - Returns a promise that resolves to reason (the value passed to `fail(reason)`) or 
    completion (the value passed to `exit(completion)`) when this newly started instance terminates. 
- `getVatStats()`
  - Returns statistics about vat activity. These are the number of different types
    of items in the vat's C-List, which tracks what this vat can reach on other vats
    and how many entries are in the vat's transcript. The last gives an idea of
    how many messages this vat has executed. A vat's transcript of messages it has 
    executed lets it replay those messages if restarted and restore its pre-shutdown
    state.
    - `objectCount`
    - `promiseCount`
    - `deviceCount`
    - `transcriptCount`

A `publicFacet` is an object available via Zoe to anyone knowing
the instance they are associated with. The `publicFacet` is used for general queries
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
an invitation to escrow and sell goods. Remember that Zoe invitations are
represented as a `Payment`.
```js
const issuerKeywordRecord = {
  'Asset': moolaIssuer,
  'Price': quatlooIssuer
};
const terms = { numBids: 3 };
const { creatorFacet, publicFacet, creatorInvitation } = await E(zoe).startInstance(
  installation, issuerKeywordRecord, terms);
```
## `E(Zoe).offer(invitation, proposal, paymentKeywordRecord)`
- `invitation` `{Invitation|Promise<Invitation>}`
- `proposal` `{Proposal}`
- `paymentKeywordRecord` `{PaymentKeywordRecord}`
- Returns: `{Promise<UserSeat>}`

Used to make an offer to the contract that created the `invitation` that is
provided as the first argument.

The invocation normally includes a `proposal` (the
rules under which they want to exercise the offer) and `payments` that correspond to the `give` property of the `proposal`. The payments will be escrowed by Zoe. If
either the `proposal `or `payments` are empty, indicate this by
omitting that argument or passing `undefined`, instead of passing an
empty record.

The optional `exit`'s value should be an `exitRule`, an object with three possible keys for
key:value pairs:
- `onDemand:null`:  (Default) The user can cancel on demand.
- `waived:null`: The user can't cancel and relies entirely on the smart contract to promptly finish their offer.
- `afterDeadline`: The offer is automatically cancelled after a deadline, as determined 
   by its `timer` and `deadline` properties. The timer is a timer, and the `deadline` is with respect to the 
   timer. Some example timers use Unix epoch time, while others count block height. Note that `deadline`'s
   value is a `BigInt`, not a `Number` (just append an "n" to the number you want to use to get its `BigInt`)

```js
const myProposal = harden({
  give: { Asset: quatloos(4n)},
  want: { Price: moola(15n) },
  exit: { afterDeadline: {
    timer,
    deadline: 100n,
  }}
})
```

`paymentKeywordRecord` is a record with keywords as keys, with
 values of the actual `payments` to be escrowed. A `payment` is
 expected for every entry under `give`.

 `offer()` returns a promise for a `UserSeat`.
```js
const paymentKeywordRecord = {
  'Asset' : quatloosPayment,
  'Price' : moolaPayment
};
```
## `UserSeat` Object

Zoe uses `seats` to access or manipulate offers. They let contracts and users interact
with them. Zoe has two kinds of seats. `ZCFSeats`
are used within contracts and with `zcf` methods. `UserSeats` represent offers external to
Zoe and the contract. The party who exercises an invitation and sends the `offer()` message
to Zoe gets a `UserSeat` that can check payouts' status or retrieve the result of
processing the offer in the contract. This varies, but examples
are a `string` and an `invitation` for another seat.

Also, a `UserSeat` can be handed to an agent outside Zoe and the contract, letting
them query or monitor the current state, access the payouts and result,
and, if it's allowed for this seat, call `tryExit()`.

Since anyone can attempt to exit the seat if they have a reference to it,
you should only share a `UserSeat` with trusted parties.

`UserSeat` includes queries for the associated offer's current state
and an operation to request that the offer exit, as follows:

- `getCurrentAllocation()`
  - Returns: `{ Promise<Allocation> }`
  - An `Allocation` is an `AmountKeywordRecord` of key-value pairs where
    the key is a keyword such as `Asset` or `Price` applicable to the
    contract. The value is an `amount`.

    `Allocations` represent the `amounts` to be paid out to each `seat` on exit. 
    (After `exit()` has been called, the final allocation balances, which were transferred to
    payouts, continue to be reported.) Normal
    reasons for exiting are the user requesting to exit or the contract explicitly choosing
    to close out the `seat`. The guarantees also hold if the contract encounters an error or
    misbehaves. There are several methods for finding out what `amount` a
    current `allocation` is.

    An `Allocation` example:
    - ```js
      {
        Asset: amountMath.make(quatloosBrand, 5n),
        Price: amountMath.make(moolaBrand, 9n)
      }
      ```
- `getProposal()`
  - Returns: `{ Promise<ProposalRecord> }`
  - A `Proposal` is represented by a `ProposalRecord`. It is the rules
    accompanying the escrow of `payments` dictating what the user expects
    to get back from Zoe. It has keys `give`, `want`, and
   `exit`. `give` and `want` are records with keywords as keys and
    `amounts` as values. If it is compatible with the contract, the
    contract tries to satisfy it. If not, the contract kicks the `seat` out.
    
    Offer safety is always enforced; if kicked out, the user gets back
    what they put in. If the contract attempts to satisfy it, they either
    get what they asked for or Zoe ensures they get back their deposit.
  - Example:
    ```js
    const { want, give, exit } = sellerSeat.getProposal();
    ```
- `getPayouts()`
  - Returns: `{ Promise<PaymentPKeywordRecord> }`
  - A `payout` is a `payment` that goes to a party in a successful transaction, redirecting
    escrowed assets in accordance with the result of the transaction. Returns a record
    containing all the `payout` `payments` associated with the `seat`'s offers.
- `getPayout(keyword)`
  - Returns: `{ Promise<Payment> }`
  - A `payout` is a `payment` that goes to a party in a successful transaction, redirecting
    escrowed assets in accordance with the result of the transaction. Returns the `payout`
    `payment` associated with the `keyword` argument.
- `getOfferResult()`
  - Returns: `{ Promise<OfferResult> }`
  - The returned `OfferResult` can be literally anything. For example, in tests
    for the Automated Refund Dapp, it's the string "The offer was accepted". In
    the Covered Call example, it's a call option, which is an assayable `invitation`
    to buy the underlying asset. Strings and invitations are the most common things returned.
    The value is set by the returned result of  the `offerHandlers` function passed
    as an argument to `zcf.makeInvitation()`.
- `getNotifier()`
  - Returns: `{ Promise<Notifier> }`
  - You use a `notifier` wherever some piece of code has changing state that other
    code wants updates on. The updates can be anything the contract wants to publish.
    For example, you could notify about price changes, new currency pools, etc. For
    more about `notifiers`, see our [JavaScript Programming Guide](/guides/js-programming/notifiers.md)
- `hasExited()`
  - Returns: `{ Promise<Boolean> }`
  - Returns `true` if the seat has exited, `false` if it is still active.
- `tryExit()`
  - Returns `{ Void }`
  - Note: Only works if the `seat`'s `proposal` has an `OnDemand` `exit` clause.
    Zoe's offer-safety guarantee applies no matter how a `seat`'s interaction with
    a contract ends. Under normal
    circumstances, the participant might be able to call `tryExit()`, or the
    contract might do something explicitly. On exiting, the seat holder
    gets its current `allocation` and the `seat` can no longer interact with the contract.


