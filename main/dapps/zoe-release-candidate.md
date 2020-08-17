# The dapp developer's guide to changes in the Zoe Release Candidate

We now have types for Zoe that can imported for use in your contract.
Import like so before using any of the Zoe types:

```js
import '@agoric/zoe/exported';
```

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
And example
[here](https://github.com/Agoric/agoric-sdk/blob/ee8f782578ff4f2ea9e0ec557e14d1f52c795ca9/packages/zoe/src/contracts/mintPayments.js#L34)
The issuers associated with the synchronous mints are already saved in
Zoe, so there is no need to `addNewIssuer` (renamed to `saveIssuer` in
this version) for synchronous mints.

There is no longer any `makeZoeHelpers` call. Instead, any helpers can
be imported directly from `@agoric/zoe/src/contractSupport/`. Note
that some require `zcf` to be passed as the first argument.

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
1. creatorFacet - an object usually with admin authority only given to the
   entity which calls `E(zoe).startInstance(...)`. The creatorFacet
   can be used to create invitations for other parties, and take actions
   that are unrelated to making offers.
2. creatorInvitation - a Zoe invitation that is only given to the entity
   with calls `E(zoe).startInstance(...)`. This invitation is usually
   used for cases in which a party has to make an offer first, such as
   escrowing the underlying good for sale in an auction or covered
   call.
3. publicFacet - an object that will be available through Zoe to anyone who knows
   the contract instance. The publicFacet is good for general queries,
   such as getting the current price.

To get information such as the issuers, brands, or custom terms that
a contract was instantiated with, do:

```js
const { brands, issuers, terms } = zcf.getTerms();
```
Note that `brands` and `issuers` are records with keyword keys,
formerly called `brandKeywordRecord` and `issuerKeywordRecord`,
respectively.

There are no more offerHandles! Instead, we took a more object-oriented
approach and created `seats` per `E(zoe).offer(...)` call. These seats
have methods such as `getProposal()`, `getCurrentAllocation()`. There
are two important "facets" for seats (a facet is a particular view or API of
an object; there may be multiple such APIs per object): the ZCFSeat
and the UserSeat. The ZCFSeat is what is passed to the
`offerHandlers`, like this one, called `mintPayment`

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

The UserSeat is what is returned to the caller of
`E(zoe).offer(invitation, proposal, payments)`. The UserSeat has
methods such as `getPayout` and `exit`. See the type definitions
[here](https://github.com/Agoric/agoric-sdk/blob/7058a852c46625e28aa9a290b2c99f2a39d0cba5/packages/zoe/src/types.js#L88)

## Reallocating

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


