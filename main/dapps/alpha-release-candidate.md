# The Dapp developer's guide to changes in the Alpha Release Candidate

## Zoe Changes

### Types Are Available

We now have types for Zoe that can imported for use in your contract.
Import like so before using any of the Zoe types:

```js
import '@agoric/zoe/exported';
```

### Synchronous Minting and Escrowing

If you were previously creating a token within your contract, you will
want to switch to using our synchronous Zoe mints rather than
importing and using ERTP. This allows you to mint digital assets and
reallocate them synchronously. To do so, do:

```js
const mySynchronousMint = await zcf.makeZCFMint('MySyncMint', 'set');
const { amountMath, brand, issuer } = mySynchronousMint.getIssuerRecord();
mySynchronousMint.mintGains({ MyKeyword: amount }, seat);
```

For more information on how to use these specialized mints, please see
the type definitions
[here](https://github.com/Agoric/agoric-sdk/blob/7058a852c46625e28aa9a290b2c99f2a39d0cba5/packages/zoe/src/types.js#L221)
and example
[here](https://github.com/Agoric/agoric-sdk/blob/ee8f782578ff4f2ea9e0ec557e14d1f52c795ca9/packages/zoe/src/contracts/mintPayments.js#L34).
The issuers associated with the synchronous mints are already saved in
Zoe, so there is no need to `addNewIssuer` (renamed to `saveIssuer` in
this version) for synchronous mints. Note that the first call to *make*
the ZCFMint is asynchronous, but the following calls are synchronous. 

### ZoeHelpers

There is no longer any `makeZoeHelpers` call. Instead, any helpers can
be imported directly from `@agoric/zoe/src/contractSupport/`. Note
that some require `zcf` to be passed as the first argument.

### Contract Structure

Please add the following type right before the start of your contract
code to enforce the correct return values for your contract:

```js
/**
 * @type {ContractStartFn}
 */
 ```

Contract code must export a function `start` as a non-default export,
like so:

```js
const start = zcf => {
  ...
  // your code here
  return harden({ creatorFacet, creatorInvitation, publicFacet });
}
harden(start);
export { start };
```

`zcf` is the Zoe Contract Facet and is the only argument provided to
the contract.

The contract must return a record with any of the following:
1. `creatorFacet` - an object usually with admin authority only given to the
   entity which calls `E(zoe).startInstance(...)`. The creatorFacet
   can be used to create invitations for other parties, and take actions
   that are unrelated to making offers.
2. `creatorInvitation` - a Zoe invitation that is only given to the entity
   with calls `E(zoe).startInstance(...)`. This invitation is usually
   used for cases in which a party has to make an offer first, such as
   escrowing the underlying good for sale in an auction or covered
   call.
3. `publicFacet` - an object that will be available through Zoe to anyone who knows
   the contract instance. The publicFacet is good for general queries,
   such as getting the current price.

### Access contract terms

To get information such as the issuers, brands, or custom terms that
a contract was instantiated with, do:

```js
const { brands, issuers, terms } = zcf.getTerms();
```
Note that `brands` and `issuers` are records with keyword keys,
formerly called `brandKeywordRecord` and `issuerKeywordRecord`,
respectively.

### Seats (no more offerHandles!)

There are no more offerHandles! Instead, we took a more object-oriented
approach and created a new `seat` per `E(zoe).offer(...)` call. These seats
have methods such as `getProposal()`, `getCurrentAllocation()`, and `exit()`. There
are two important "facets" for seats (a facet is a particular view or API of
an object; there may be multiple such APIs per object): the ZCFSeat
and the UserSeat. 

### ZCFSeat Facet 

The ZCFSeat is what is passed to the
`offerHandlers`, like this one:

```js
const mintPayment = seat => {
  const amount = amountMath.make(1000);
  // Synchronously mint and allocate amount to seat.
  zcfMint.mintGains({ Token: amount }, seat);
  // Exit the seat so that the user gets a payout.
  seat.exit();
  // Since the user is getting the payout through Zoe, we can
  // return anything here. Let's return some helpful instructions.
  return 'Offer completed. You should receive a payment from Zoe';
};
```

To learn more about the API of the ZCFSeat, see the type definitions
[here](https://github.com/Agoric/agoric-sdk/blob/7058a852c46625e28aa9a290b2c99f2a39d0cba5/packages/zoe/src/types.js#L377)

### UserSeat Facet

The UserSeat is what is returned to the caller of
`E(zoe).offer(invitation, proposal, payments)`. The UserSeat has
methods such as `getPayout` and `exit`. See the type definitions
[here](https://github.com/Agoric/agoric-sdk/blob/7058a852c46625e28aa9a290b2c99f2a39d0cba5/packages/zoe/src/types.js#L88)

### Reallocating

To reallocate, first stage an allocation on a seat:

```js
const creatorStage = creatorSeat.stage({
    Tip: tipAmountMath.add(creatorTips, tipAmount),
    Assurance: assuranceMath.getEmpty(),
  });
```

Once you have a few seatStagings to reallocate over, you can call
reallocate like so, with any number of stagings passed in as separate arguments:

```js
zcf.reallocate(creatorStage, userStage);
```

## Wallet Changes

The wallet now prompts the user to accept the Dapp after your Dapp sends the first message over the wallet bridge, postponing your Dapp's wallet interactions until the user approves the connection.  If you aren't receiving responses from the wallet bridge, it is probably because your Dapp has not yet been approved.

There is a migration in progress for the wallet bridge protocol.  Anything that used to be a "petname" is now either still a "petname" (a plain string), or a "path" (an array of strings whose first element is a "petname").  You will have to adapt your Dapp to be able to use arrays-of-strings wherever you initially had just plain string petnames.

A simple way to do this is to `JSON.stringify(petnameOrPath)` before using them in a programmatic string-only context (such as a key in a Map or Set, or an attribute value of an HTML element, such as an ID).  If you display paths to users, you should join their elements with `'.'`, ideally coloring the first element differently than the dots and other elements.  This is because the first element is a trusted, user-assigned petname for the Dapp, and the other elements are automatically generated by the Dapp or wallet, and have no special relationship to the user.

Your Dapp should suggest names for any Installations, Instances, or Issuers that the wallet user will interact with.  Once accepted, these will be returned to your Dapp as paths (arrays of strings, above) beginning with the user's petname for the Dapp.  For  example, see [the messages that the Encouragement Dapp sends](https://github.com/Agoric/dapp-encouragement/blob/7f41c1bc09fc5f22707f6bdc2fb656fcb2cddbfa/ui/public/src/main.js#L97) over the wallet bridge.
