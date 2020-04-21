# Contract Requirements

<Zoe-Version/>

When writing a smart contract that will be run on Zoe, it's important
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

## Creating an invite

To create an invite in the contract, you can use the Zoe Contract
Facet method directly (<router-link
to="/zoe/api/zoe-contract-facet.html#zcf-makeinvitation-offerhook-customproperties">`zcf.makeInvitation`</router-link>) or you can use the
zoeHelpers function (<router-link to="/zoe/api/zoe-helpers.html#zoehelper-inviteanoffer-options">`inviteAnOffer`</router-link>) which has some additional
functionality, like being able to specify what kind of proposal the
offer should have. 