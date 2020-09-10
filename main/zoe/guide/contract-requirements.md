# Contract Requirements

<Zoe-Version/>

When writing a smart contract to run on Zoe, you need
to know the proper format and other expectations. 

A Zoe contract is a JavaScript file that can import other JavaScript
code, including:

* [@agoric/harden](https://www.npmjs.com/package/@agoric/harden): a package for recursively deep-freezing
* [@agoric/nat](https://www.npmjs.com/package/@agoric/nat): a package
  for testing whether something is a natural number (natural numbers
  are recommended for currency-related programming in order to better
  deal with rounding) and throwing if
  not.
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

**tyg todo: I think the text between the dashes is more up to date.
But there may be aspects of the text between the %%%%%%%%%%%%%%%%%%% that is still valid. Also,
pretty sure there should be something about what needs to be imported and/or exported; please provide.**

At the start of your contract code, you need the following.

To warn if the correct return values for your contract are not being returned, put this
right before the start of your contract code. It also lets TypeScript-aware tools (IDEs
like vsCode and WebStorm) inform the developer about required parameters and return
values and warn when methods are misused.
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
contract `instance`. It creates `invitations` for other parties, and takes actions that 
are unrelated to making offers.
- `creatorInvitation`: A Zoe `invitation` only given to the entity that 
calls `E(zoe).startInstance()`; i.e. the party that was the creator of the current 
contract `instance`. This is usually used when a party has to make an offer first, 
such as escrowing the underlying good for sale in an auction or covered call.
- `publicFacet`: An object available through Zoe to anyone who knows the contract `instance`. 
Use the `publicFacet` for general queries and actions, such as getting the current price 
or creating public `invitations`.

-----------------------

%%%%%%%%%%%%%%%%%%%%%%%

The "main" contract file that potentially imports other files and
packages needs to have the following structure:

```js
export const makeContract = harden(zcf => {
  return harden({
    invite, // required
    publicAPI, // optional
  });
});
```

* `zcf` is the <router-link
  to="/zoe/api/zoe-contract-facet.html">Zoe Contract
  Facet</router-link>.
* `invite` must be a Zoe
invite that will be provided to the user who instantiates the
contract. 
* `publicAPI` is an optional object whose methods will be
available to anyone who knows the `instanceHandle` of the contract
instance. `publicAPI` is a good place to put public queries (i.e.
`getCurrentPrice` of Autoswap) and other
requests that shouldn't require making an offer or having an invite.

%%%%%%%%%%%%%%%%%%%%%%

## Making an Invitation

To create an invitation in the contract, use the Zoe Contract
Facet method (<router-link
to="/zoe/api/zoe-contract-facet.html#zcf-makeinvitation-offerhook-customproperties">`zcf.makeInvitation`</router-link>).
