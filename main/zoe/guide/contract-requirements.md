# Contract Requirements

<Zoe-Version/>

When writing a smart contract to run on Zoe, you need
to know the proper format and other expectations. 

A Zoe contract is a JavaScript file that can import other JavaScript
code, including:

* [@endo/harden](https://www.npmjs.com/package/@endo/harden): a package for recursively deep-freezing
* [@endo/nat](https://www.npmjs.com/package/@endo/nat): a package
  for testing whether something is a natural number (natural numbers
  are recommended for currency-related programming in order to avoid
  rounding issues) and throwing if not.
* [@agoric/notifier](https://www.npmjs.com/package/@agoric/zoe): A package that provides updates through
  smartly resolving promises rather than polling
* [@agoric/zoe](https://www.npmjs.com/package/@agoric/zoe): Zoe has
  helpers that contracts can use by importing
  `@agoric/zoe/src/contractSupport/zoeHelpers.js`

A Zoe contract will be bundled up, so you should feel free to divide
your contract into multiple files (perhaps putting helper functions in a
separate file, for example) and import them.

A Zoe contract needs to be able to run under [Agoric's SES shim for Hardened JavaScript](https://github.com/endojs/endo/tree/HEAD/packages/ses). Some legacy
JavaScript code is incompatible with Hardened JavaScript, because Lockdown freezes the
JavaScript objects you start out with (the primordials, such as `Object`), and some legacy code tries to
mutate these. 

If you add this type annotation, TypeScript-aware tools
(IDEs like vsCode and WebStorm) will inform the developer about parameters
and return values for your contract and `zcf` methods and warn about mismatches.
Put it right before the start of your contract code.

```js
/**
 * @type {ContractStartFn}
 */
 ```
Your contract code must export a function `start` as a non-default export.
`zcf` is the [Zoe Contract Facet](/zoe/api/zoe-contract-facet.md) and is
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

For users to make offers, the contract has to include a handler with the
code for what to do when the `invitation` is used to make an offer. This handler is passed
to `zcf.makeInvitation()`, and the resulting `invitation` is made available (using the
`creatorFacet`, the `publicFacet`, or whatever makes sense for the particular contract.

For instance, AtomicSwap makes two `invitations`. The first is used to create the initial
offer, so it defines the terms that the counterparty responds to. The second party
needs to make a matching offer, so there are more constraints.

Use `zcf.makeInvitation()` to create the first party's `invitation`:

``` js
  const creatorInvitation = zcf.makeInvitation(
    makeMatchingInvitation,
    'firstOffer',
  );
```

`makeMatchingInvitation()` creates the second `invitation`.

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

The third argument (which is optional and wasn't needed for the first `invitation`) says
the counterparty has to offer an `amount` matching the first party's `want.Price`,
and should ask for the first party's `give.Asset`. The optional third argument to
`makeInvitation()` is included so the `invitation` will contain the `terms` so the `invitation`
recipient can rely on them.

The `matchingSeatOfferHandler` for this very simple contract calls `swap()`, a helper for
the simple case that each party wants what the other offered. If the terms match, Zoe
gives each the `payout` they asked for, and closes out the contract. If the terms don't
match, they each get back what they brought to the exchange, and it's still over.

``` js
    const matchingSeatOfferHandler = matchingSeat => {
      const swapResult = swap(zcf, firstSeat, matchingSeat);
      zcf.shutdown();
      return swapResult;
    };
```

If you study other contracts, you'll see they all have this basic format. Depending
on their goals, they may do additional bookkeeping, or try to find compatible terms
between multiple offers, or create new assets to order.

## Making an Invitation

To create an invitation in the contract, use the Zoe Contract
Facet method [`zcf.makeInvitation`](/zoe/api/zoe-contract-facet.md#zcf-makeinvitation-offerhandler-description-customproperties).


## Using `bundleSource`

Modules start as files on disk, but then are bundled together
into an archive before being loaded into a vat. The bundling tool uses several standard
functions to locate other modules that must be included. These are not a part of Hardened JavaScript, but
are allowed in module source code, and are translated or removed before execution.

- `import` and `export` syntax are allowed in ESM-style modules (preferred over CommonJS).
  These are not globals as such, but top-level syntax that defines the module graph.
- `require`, `module`, `module.exports`, and `exports` are allowed in CommonJS-style modules,
  and should work as expected. However, new code should be written as ESM modules. They
  are either consumed by the bundling process, provided (in some form) by the execution
  environment, or otherwise rewritten to work sensibly
- `__dirname` and `__filename` are not provided
- The dynamic import expression (`await import('name')`) is currently prohibited in vat
  code, but a future SES implementation of Hardened JavaScript may allow it.

The [Node.js API](https://nodejs.org/dist/latest-v14.x/docs/api/) includes "built-in
modules", such as `http` and `crypto`. Some are clearly platform-specific (e.g. `v8`), while
others are not so obvious (`stream`). All are accessed by importing a
module (`const v8 = require('v8')` in CommonJS modules, or `import v8 from 'v8'` in ESM modules).
These modules are built out of native code (C++), not plain JS.

None of these built-in modules are available to vat code. `require` or `import` can be used
on pure JS modules, but not on modules including native code. For a vat to exercise authority
from a built-in module, you have to write a *device* with an endowment with the built-in
module's functions, then have the vat send messages to the device.

## Library compatibility

Vat code can use `import` or `require()` to import other libraries consisting
only of JS code, which are compatible with the Hardened JavaScript environment. This includes
a significant portion of the NPM registry.

However, many NPM packages use built-in Node.js modules. If used at import
time (in their top-level code), vat code cannot use the package and fails
to load at all. If they use the built-in features at runtime, then the
package can load. However, it might fail later when a function is invoked
that accesses the missing functionality. So some NPM packages are partially
compatible; you can use them if you don't invoke certain features.

The same is true for NPM packages that use missing globals, or attempt to
modify frozen primordials.
