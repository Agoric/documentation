# Name Services

The Agoric chain has a few name services:

- `agoricNames` for well-known names controlled by governance
- `namesByAddress` - a namespace for each provisioned account
- `board` - to map objects to arbitrary names and back

## agoricNames / agoricNamesAdmin - well known names

Well-known names are chosen by [BLD staker governance](https://community.agoric.com/t/about-the-governance-category/15).

To look up well-known objects, such as the BLD brand:

```js
const brandHub = E(agoricNames).lookup('brand');
const bldBrand = await E(brandHub).lookup('BLD');
```

or, equivalently:

```js
const bldBrand = await E(agoricNames).lookup('brand', 'BLD');
```

`agoricNames` is a _NameHub_. In general, `E(hub).lookup(key1, key2, ...rest)` is equivalent
to `E(E(hub).lookup(key1)).lookup(key2, ...rest)`. The NameHub interface also includes `Map`-like
methods `has`, `entries`, `keys`, and `values`.

The keys of `agoricNames` include:

- `brand` - IST, BLD, Invitation (Zoe invitation brand), timer (a TimerBrand, not an ERTP brand)
- `issuer` - IST, BLD, Invitation, ...
- `vbankAsset` - IST, BLD, USDC, ATOM, ... - including info about corresponding cosmos denom
- `oracleBrand` - USD, ATOM
- `installation` - psm, reserve, priceAuthority, ... (see [deployed contracts](../zoe/actual-contracts/))
- `instance` - reserve, one for each psm, one for each priceAuthority, ... (see [deployed contracts](../zoe/actual-contracts/))

Adding or updating an entry requires access to the corresponding _NameAdmin_ facet: `agoricNamesAdmin` or
one of its descendants - most likely as part of [permissioned contract deployment](../coreeval/). For example:

```js
const { instance } = await E(zoe).startInstance(lemonadeStand);
const {
  brands: { Lemonade: lemonadeBrand }
} = await E(zoe).getTerms(instance);
const brandAdmin = E(agoricNamesAdmin).lookupAdmin('brand');
await E(brandAdmin).update('Lemonade', lemonadeBrand);
```

### agoricNames in vstorage

The `NameAdmin` interface has an `onUpdate` method for registering a callback.
This is used to reflect the brand entries, that is: `E(E(agoricNames).lookup('brand')).entries()`
into vstorage at `published.agoricNames.brand` each time they change.
The entries for `instance` and the other keys of `agoricNames` are likewise reflected under `published.agoricNames`.
See [marshalling amounts and instance](../getting-started/contract-rpc#marshalling-amounts-and-instances)
for details on the format of the data stored in vstorage.

## namesByAddress / namesByAddressAdmin, and depositFacet - per account namespace

Each time a smart wallet is provisioned for address `a`, a NameHub / NameAdmin pair is
installed at `E(namesByAddress).lookup(a)` and `E(namesByAddressAdmin).lookupAdmin(a)`.
Also, a _deposit facet_ is installed at `E(namesByAddress).lookup(a, 'depositFacet')` so
that you can send a payment, such as an invitation, to such a smart wallet using
the `receive` method of the deposit facet:

```js
const bobAddress = 'agoric1...';
const anInvitationPayment = await zcf.makeInvitation(...);
const bobDepositFacet = E(namesByAddress).lookup(bobAddress, 'depositFacet');
const amtReceived = await E(bobDepositFacet).receive(anInvitationPayment);
```

Normally, calling `E(nameHub).lookup(k)` before calling `E(nameAdmin).update(k, v)` throws.
But the `NameAdmin` interface also includes a `E(nameAdmin).reserve(k)` method so that
`E(nameHub).lookup(k)` will then return promise that waits for a call to `E(nameAdmin).update(k, v)`
and then resolves to `v`. This lets those authorized to use `namesByAddressAdmin`
to send invitations even if a smart wallet has not yet been provisioned:

```js
const bobAddress = 'agoric1...';
const anInvitationPayment = await zcf.makeInvitation(...);
await E(namesByAddressAdmin).reserve(bobAddress);
await E(E(namesByAddressAdmin).lookupAdmin(bobAddress)).reserve('depositFacet');
const bobDepositFacet = E(namesByAddress).lookup(bobAddress, 'depositFacet');
const receievedP = E(bobDepositFacet).receive(anInvitationPayment);
// waits for bob to provision a smart wallet
const amtReceived = await receivedP;
```

## The Board - publishing under arbitrary names

If we have an object such as a brand or a contract instance, and we need a name / id for it,
but we don't much care what the name is, we can use the board:

```js
const { instance } = await E(zoe).startInstance(...);
const instanceId = await E(board).getId(instance);
```

We can then save the id in a file or send it in email to someone else, and they
can look up the object:

```js
const instance = await E(board).getValue('board023423');
```

See also: [marshalling amounts and instance](../getting-started/contract-rpc#marshalling-amounts-and-instances)
for details on using board ids to refer to objects from structures stored in vstorage,
