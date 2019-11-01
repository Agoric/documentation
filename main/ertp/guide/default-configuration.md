# Mint Configuration

## What is a configuration?

Configurations add custom methods to payments, purses, and mints, defines the functions to make the "mintKeeper" (the actual holder of the mappings from purses/payments to amounts), and makes the "assay" (the object that describes the strategy of how amounts are withdrawn or deposited, among other things).

## When is it used?

`makeMint` takes in a function to make a configuration. `makeMint` uses a basic fungible configuration if none is passed in. Fungible tokens (our default for mints) do not customize payments, purses, etc. They use the "basic" mintKeeper (the place where the amounts per purse and payment are recorded) and use the "Nat" assay, in which amounts are natural numbers and use subtraction and addition.

## Basic make configuration function

The function to make a configuration should return an object with the following properties:

- `makePaymentTrait()`
- `makePurseTrait()`
- `makeMintTrait()`
- `makeIssuerTrait()`
- `makeMintKeeper()`
- `strategy` - {Object}

```js
import harden from '@agoric/harden';

function makeConfig() {
  return harden({})
}
```

```js
import harden from '@agoric/harden';

function makeBasicFungibleConfig() {
  return harden({
    // no customization
    makePaymentTrait(_superPayment) {
      return harden({});
    },
    // no customization
    makePurseTrait(_superPurse) {
      return harden({});
    },
    // no customization
    makeMintTrait(_superMint) {
      return harden({});
    },
    // no customization
    makeIssuerTrait(_superIssuer) {
      return harden({});
    },
    makeMintKeeper: makeCoreMintKeeper,
    strategy: natStrategy,
  });
}
```

## Configuration Object defaults

- `makePaymentTrait(_superPayment)` - default {}
- `makePurseTrait(_superPurse)` - default {}
- `makeMintTrait(_superMint)` - default {}
- `makeIssuerTrait(_superIssuer)` - default {}
- `makeMintKeeper` - default `makeCoreMintKeeper`
- `strategy` - default `natStrategy`

### Core Mint Keeper

- `mintKeeper`
- `mintKeeper.purseKeeper` - asset
- `mintKeeper.paymentKeeper` - asset
- `mintKeeper.isPurse(asset)`
- `mintKeeper.isPayment(asset)`

`mintKeeper.purseKeeper` and `mintKeeper.paymentKeeper` are both asset keepers. An asset can either be a purse or payment. An asset keeper keeps track of either all of the purses (purseKeeper) or all of the payments (paymentKeeper) and their respective amounts. Asset keepers have the following properties:
- `updateAmount(asset, newAmount)`
- `recordeNew(asset, initialAmount)`
- `getAmount(asset)`
- `has(asset)`
- `remove(asset)`

### Strategies

ERTP comes with several strategies you can use in your project. The `natStrategy` is used in the default configuration.

The following methods are defined in each strategy:
- `insistKind`
- `empty`
- `isEmpty`
- `includes`
- `equals`
- `with`
- `without`


`listStrategy`

`natStrategy`
The default kind of amount is a labeled natural number describing a quantity of fungible erights. The label describes what kinds of rights these are. This is a form of labeled unit, as in unit typing.

Natural numbers are used for fungible erights such as money because rounding issues make floats problematic. All operations should be done with the smallest whole unit such that the NatAssay never deals with fractional parts.
