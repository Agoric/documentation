# Writing Contracts

Zoe acts as the Contract Host to secure users from malicious developers but it is also a rich framework for smart contract developers to show their skills and creativity.

In Agoric smart contracts are deployed and accessed through Zoe. smart contracts must have the following structure;

## Contract Requirements

Every Zoe contract must export a method called start. It's usually the last line of the contract.
export { start }; 
The start method should accept a zcf object as its first argument. zcf stands for Zoe Contract Facet which is an API the smart contract developers to interact with Zoe.
Use arrow function definitions instead of function keyword;
// Do
const start = (zcf) => {
 // Method body
}

// Do not do
function start(zcf) {
 // Method body
}
By convention, most Zoe contracts return two APIs: creatorFacet and publicFacet;
creatorFacet: The word creator means the user who deployed this contract. Therefore, only this API should contain methods that have administrative powers. creatorFacet is only available during the deployment of the contract. So the creator should hold on to this reference. Because once it's gone, it's gone.
publicFacet: This is the API contract exposes to the whole world. publicFacet is accessible via the Zoe interface.


## Structure of a Contract

All Zoe contracts must have the following format:

::: details Show contract format
```js
// @ts-check
// Checks the types as defined in JSDoc comments

// Add imports here

// Optional: you may wish to use the Zoe helpers in
// @agoric/zoe/src/contractSupport/index.js
import { swap as _ } from '@agoric/zoe/src/contractSupport/index.js';

// Import the Zoe types
import '@agoric/zoe/exported.js';

/**
* [Contract Description Here]
*
* @type {ContractStartFn}
  */
const start = (zcf, _privateArgs) => {
// ZCF: the Zoe Contract Facet

// privateArgs: any arguments to be made available to the contract
// code by the contract owner that should not be in the public
// terms.

// Add contract logic here, including the
// handling of offers and the making of invitations.

// Example: This is an example of an offerHandler
// which just gives a refund payout automatically.
const myOfferHandler = zcfSeat => {
zcfSeat.exit();
const offerResult = 'success';
return offerResult;
};

// Example: This is an invitation that, if used to make
// an offer will trigger `myOfferHandler`, giving a
// refund automatically.
const invitation = zcf.makeInvitation(myOfferHandler, 'myInvitation');

// Optional: Methods added to this object are available
// to the creator of the instance.
const creatorFacet = {};

// Optional: Methods added to this object are available
// to anyone who knows about the contract instance.
// Price queries and other information requests can go here.
const publicFacet = {};

return harden({
   creatorInvitation: invitation, // optional
   creatorFacet, // optional
   publicFacet, // optional
  });
};

harden(start);
export { start };
```
:::

1. Every Zoe contract must export a method called **start()**. It's usually the last line of the contract.
	```js
    export { start }; 
    ```
2. The **start()** method should accept a **zcf** object as its first argument. *zcf* stands for *[Zoe Contract Facet](/reference/zoe-api/zoe-contract-facet.md)* which is an API smart contract developers use to interact with Zoe.
3. By convention, most Zoe contracts return the following: (Note: Contracts aren't required to return any of these.)
	* **creatorInvitation**: A Zoe **[Invitation](/reference/zoe-api/zoe-data-types.md#invitation)**
    only given to the entity that calls **[E(zoe).startInstance()](/reference/zoe-api/zoe.md#e-zoe-startinstance-installation-issuerkeywordrecord-terms-privateargs)**;
    i.e., the party that was the creator of the current contract **[Instance](/reference/zoe-api/zoe-data-types.md#instance)**. 
    This is usually used when a party has to make an offer first, such as escrowing the underlying good for sale in an auction or covered call.
	* **creatorFacet**: An API with methods available only to the creator of the contract instance. (e.g., administrative powers) **creatorFacet** is usually only available during the deployment of the contract, so the creator should hold on to the reference to this API.
	* **publicFacet**: An API with methods available to anybody who has access to the contract instance.

A Zoe contract will be bundled up, so you should feel free to divide
your contract into multiple files (perhaps putting helper functions in a
separate file, for example) and import them.

A Zoe contract needs to be able to run under [Agoric's SES shim for Hardened JavaScript](https://github.com/endojs/endo/tree/master/packages/ses). Some legacy
JavaScript code is incompatible with Hardened JavaScript, because Lockdown freezes the
JavaScript objects you start out with (the primordials, such as **Object**), and some legacy code tries to
mutate these.

If you add this type annotation, TypeScript-aware tools
(e.g., IDEs like vsCode and WebStorm) will inform the developer about parameters
and return values for your contract and **[zcf](/reference/zoe-api/zoe-contract-facet.md)** methods and warn about mismatches.
Put it right before the start of your contract code.

```js
/**
 * @type {ContractStartFn}
 */
 ```
Your contract code must export a function `start` as a non-default export.
`zcf` is the [Zoe Contract Facet](/reference/zoe-api/zoe-contract-facet.md) and is
the first argument provided to the contract.
The second argument, `privateArgs`, is used by the caller of `startInstance`
to pass in any arguments that should not be part of the public terms.
`privateArgs` is an object with keys and values as decided by the caller of
`startInstance`. If no private arguments are passed, `privateArgs` is undefined.

```js
const start = (zcf, privateArgs) => {
  ...
  // your code here
  return harden({ creatorFacet, creatorInvitation, publicFacet });
}
harden(start);
export { start };
```


The contract can contain arbitrary JavaScript code, but there are a few things you'll want
to do in order to act as a contract, and interact with Zoe and zcf (the internal contract
facet).

For users to make offers, the contract has to include a handler with the
code for what to do when the `invitation` is used to make an offer. This handler is passed
to `zcf.makeInvitation()`, and the resulting `invitation` is made available (using the
`creatorFacet`, the `publicFacet`, or whatever makes sense for the particular contract.

For instance, AtomicSwap makes two `invitations`. The first is used to create the initial
offer, so it defines the terms that the counterparty responds to. The second party
needs to make a matching offer, so there are more constraints.

Use `zcf.makeInvitation()` to create the first party's `invitation`:

```js
const creatorInvitation = zcf.makeInvitation(
  makeMatchingInvitation,
  'firstOffer',
);
```

`makeMatchingInvitation()` creates the second `invitation`.

```js
const matchingSeatInvitation = zcf.makeInvitation(
  matchingSeatOfferHandler,
  'matchOffer',
  {
    asset: give.Asset,
    price: want.Price,
  },
);
```

The third argument (which is optional and wasn't needed for the first `invitation`) says
the counterparty has to offer an `amount` matching the first party's `want.Price`,
and should ask for the first party's `give.Asset`. The optional third argument to
`makeInvitation()` is included so the `invitation` will contain the `terms` so the `invitation`
recipient can rely on them.

The `matchingSeatOfferHandler` for this very simple contract calls `swap()`, a helper for
the simple case that each party wants what the other offered. If the terms match, Zoe
gives each the `payout` they asked for, and closes out the contract. If the terms don't
match, they each get back what they brought to the exchange, and it's still over.

```js
const matchingSeatOfferHandler = matchingSeat => {
  const swapResult = swap(zcf, firstSeat, matchingSeat);
  zcf.shutdown();
  return swapResult;
};
```

If you study other contracts, you'll see they all have this basic format. Depending
on their goals, they may do additional bookkeeping, or try to find compatible terms
between multiple offers, or create new assets to order.
