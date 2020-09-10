# Contract Requirements

<Zoe-Version/>

When writing a smart contract to run on Zoe, you need
to know the proper format and other expectations. 

A Zoe contract is a JavaScript file that can import other JavaScript
code, including:

* [@agoric/harden](https://www.npmjs.com/package/@agoric/harden): a package for recursively deep-freezing
* [@agoric/nat](https://www.npmjs.com/package/@agoric/nat): a package
  for testing whether something is a natural number (natural numbers
  are recommended for currency-related programming in order to avoid
  rounding issues) and throwing if not.
* @agoric/notifier: A package that provides updates through
  smartly resolving promises rather than polling
* [@agoric/zoe](https://www.npmjs.com/package/@agoric/zoe): Zoe has
  helpers that contracts can use by importing
  `@agoric/zoe/src/contractSupport/zoeHelpers`

A Zoe contract will be bundled up, so you should feel free to divide
your contract into multiple files (perhaps putting helper functions in a
separate file, for example) and import them.

A Zoe contract needs to be able to run under [Agoric's SES](https://github.com/Agoric/ses-shim#secure-ecmascript-shim-ses-shim). Some legacy
JavaScript code is incompatible with SES, because SES freezes the
JavaScript objects you start out with (the primordials, such as `Object`), and some legacy code tries to
mutate these. 

--------------------------

If you add this type annotation at the start of your contract code, TypeScript-aware tools
(IDEs like vsCode and WebStorm) will warn about mismatches in parameters and return values
in calls to zcf methods.  Put this right before the start of your contract code.

```js
/**
 * @type {ContractStartFn}
 */
 ```
Your contract code must export a function `start()` as a non-default export. `zcf `
is the Zoe Contract Facet and is the only argument provided to the contract.
```js
const start = zcf => {
  ...
  // your code here
  return harden({ creatorFacet, creatorInvitation, publicFacet });
}
harden(start);
export { start };
```

The contract must return a record with any (or none) of the following:
- `creatorFacet`: An object, usually with admin authority. It is only given to the entity
that calls `E(zoe).startInstance()`; i.e. the party that was the creator of the current
contract `instance`. It might create `invitations` for other parties, or take actions that
are unrelated to making offers.
- `creatorInvitation`: A Zoe `invitation` only given to the entity that 
calls `E(zoe).startInstance()`; i.e. the party that was the creator of the current 
contract `instance`. This is usually used when a party has to make an offer first, 
such as escrowing the underlying good for sale in an auction or covered call.
- `publicFacet`: An object available through Zoe to anyone who knows the contract `instance`. 
Use the `publicFacet` for general queries and actions, such as getting the current price 
or creating public `invitations`.

The contract can contain arbitrary JavaScript code, but there are a few things you'll want
to do in order to act as a contract, and interact with Zoe and zcf (the internal contract
facet).

In order to allow users to make offers, the contract has to include a handler that has the
code for what to do when the invitation is used to make an offer. This handler is passed
to zcf.makeInvitation(), and the resulting invitation is made available (using the
creatorFacet, the publicFacet, or whatever makes sense for the particular contract.

AtomicSwap, for instance, makes two invitations. The first is used to create the initial
offer, so it defines the terms that the counterparty will respond to. The second party
needs to make a matching offer, so there are more constraints.

The invitation for the first party is created with makeInvitation:

``` js
  const creatorInvitation = zcf.makeInvitation(
    makeMatchingInvitation,
    'firstOffer',
  );
```

The main thing makeMatchingInvitation does is create the second invitation.

``` js
    const matchingSeatInvitation = zcf.makeInvitation(
      matchingSeatOfferHandler,
      'matchOffer',
      {
        asset: give.Asset,
        price: want.Price,
      },
    );
```

The third argument (which is optional and wasn't needed for the first invitation) says
that the counterparty has to offer an amount that matches the first party's `want.Price`,
and should ask for the first party's `give.Asset`. The optional third argument to
`makeInvitation()` is included so the invitation will contain the terms so the recipient
of the invitation can rely on them.

The matchingSeatOfferHandler for this very simple contract calls `swap()`, a helper for
the simple case that each party wants what the other offered. If the terms match, Zoe
gives each the payout they asked for, and closes out the contract. If the terms don't
match, they each get back what they brought to the exchange, and it's still over.

``` js
    const matchingSeatOfferHandler = matchingSeat => {
      const swapResult = swap(zcf, firstSeat, matchingSeat);
      zcf.shutdown();
      return swapResult;
    };
```

If you study other contracts, you'll see that they all have this basic format. Depending
on their goals, they may do additional bookkeeping, or try to find compatible terms
between multiple offers, or create new assets to order.

## Making an Invitation

To create an invitation in the contract, use the Zoe Contract
Facet method (<router-link
to="/zoe/api/zoe-contract-facet.html#zcf-makeinvitation-offerhook-customproperties">`zcf.makeInvitation`</router-link>).
