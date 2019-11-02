# Contract Hosts

## Contract Hosts

ContractHost provides a way to install and run verifiable contracts.

`install(source)` creates Installations. Installations represent particular
contract forms, which can be `spawn()`'d to create Contract instances
initialized with specific terms. These Contracts manage invitations for
multiple seats, each of which represents a "role" in an interaction.

Some seats provide the methods `getWinnings()` and `getRefunds()`, which return
promises for payments for the outputs of the interaction. We provide the
`collect()` method (described later) to simplify collection of winnings and
refunds into appropriate purses.

## Installations

An installation of a Contract can spawn multiple copies each with the same or different terms. Each spawned instance has distinct invites and distinct seats representing a specific group of agents interacting according to the same prescribed roles.

The Installation can also have functions with names starting with 'check'. These are helper functions that are specific to the particular contract (E.g. [Escrow](https://github.com/Agoric/ERTP/blob/master/core/escrow.js) has `checkUnits()` and `checkPartialUnits()`). They can be used to validate that the expected terms are actually the same as the terms of this spawned contract. The Installation is inserted by the ContactHost as the first parameter to these functions. The naming restriction is likely to be lifted.

## Contracts

Contracts are pass-by-text.

The ContractHost's `install()` method is called on the source code for a contract. The contract needs to have a `start()` method with arguments as described below. Creating the contract object by calling `evaluate()` on the source code enables the ContractHost to guarantee to its clients that the resulting object implements that specific algorithm, and doesn't have any hidden powers.

The form of the 'terms' argument to the contract's `start()` method is also completely up to the individual contract. It should represent all the information a participant needs in order to know they're participating in the contract they intended. As an example, the 'escrow' contract represents a simple exchange of one bundle of goods for another. Escrow's terms object has the units be traded as 'left' and 'right', which correspond to the units being offered and collected by the respective parties. The Object returned by escrow is an array containing two invitations, but this isn't required. The representation is flexible enough to support trading of money, non-fungible items, or partially-executed positions in other contracts among other possibilities. Other contracts take different paths.

Javascript gives access to the source from a function, but not from an object. We make the source accessible to the ContractHost by having contracts export a record containing the source. The contract can also define methods that can be called by participants in the contract to validate that the terms they expect the contract to have been installed with are in agreement with the contract.

```js
const escrowExchangeSrcs = {
  start: `${escrowExchange.start}`,
  checkUnits: `${escrowExchange.checkUnits}`,
};
```

## InviteMaker

An InviteMaker is provided to contracts as a parameter to `start()`. It allows the contract to issue invitations for seats, arbitrary objects whose interface defines the roles and interactions in the contract. The design of the InviteMaker allows recipients of invites to validate that the invite corresponds to the seat and contract that they expected.

`seatDesc` can be any truthy object, but Strings are convenient. They must be unique for each contract instantiation. `seat` is an arbitrary object defined by the contract. `name` is optional; it is used to label the invite payment corresponding to the seat.

The returned Payment is the invite that can be passed to `contractHost.redeem()` to get a seat object. The Payment's Units contains the installation, contract terms, a seatIdentity object, and a seat description formatted as `{installation, terms, seatIdentity, seatDesc}`. These are intended to be sufficient for the recipient to verify that the contract and terms are the ones they were expecting, and that the invite corresponds to the expected role in the contract. The installation can provide methods like `installation.checkUnits()` to simplify verification.

## Collector

`collect()` calls `getWinnings()` and `getRefund()` on `seatP` and deposits the proceeds respectively into `winPurseP` and `refundPurseP`. `name` (which defaults to 'collecting') is converted to a String, and used for logging the results.

`collect()` is a pure function that can be imported from
`contractHost.js`. ([Jessie](https://github.com/Agoric/Jessie) will eventually provide assurances, because of
the way that we import modules, that it is confined.) Since it is confined,
users can be sure that it has no ability to skim any of the value being
transferred.

`collect()` violates our usual rule of only transferring payments, and never
sharing purses. This rule helps us ensure that users don't share a purse
when they only intended to share a portion of the contents. We allow
`collect()` to violate the rule because it's such a common pattern.

This function is a convenient wrapper that makes it easier to work with our
Escrow contract, and has no privileged access.

## Terms

Arbitrary terms defined by each contract.

These are defined by the contract, passed to `installation.spawn()`, and available to be validated in the check methods (or manually) by contract participants to ensure they are connected to a contract with matching expectations about what will be traded, and which seat they will occupy.