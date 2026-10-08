# Durable Issuers

**[makeIssuerKit()](./issuer#makeissuerkit-allegedname-assetkind-displayinfo-optshutdownwithfailure-issueroptionsrecord)**
makes an issuer kit that does not survive an upgrade of the vat that holds
it. Contracts, which must keep working across upgrades, instead build their
issuer kit in **[Baggage](/glossary/#baggage)** with
`prepareIssuerKit()` or `makeDurableIssuerKit()`. Both take the same
arguments as `makeIssuerKit()`, except with a **Baggage** prepended.

## prepareIssuerKit(issuerBaggage, name, assetKind?, displayInfo?, optShutdownWithFailure?, issuerOptionsRecord?)

- **issuerBaggage**: **Baggage**
- **name**: **String**
- **assetKind**: **[AssetKind](./ertp-data-types#assetkind)** - Optional, defaults to **AssetKind.NAT**.
- **displayInfo**: **[DisplayInfo](./ertp-data-types#displayinfo)** - Optional, defaults to `{}`.
- **optShutdownWithFailure** - Optional, defaults to **undefined**.
- **issuerOptionsRecord** - Optional, defaults to `{}`. Same shape as for
  **[makeIssuerKit()](./issuer#makeissuerkit-allegedname-assetkind-displayinfo-optshutdownwithfailure-issueroptionsrecord)**.
- Returns **IssuerKit**

Revives a predecessor incarnation's issuer kit from _issuerBaggage_ if one
is already there, otherwise makes a new durable one and stores it in
_issuerBaggage_ for the next incarnation to revive. This is the method
most contracts should call; it makes the initial-versus-upgrade decision
for you.

```js
import { prepareIssuerKit } from '@agoric/ertp';

const { issuer, mint, brand } = prepareIssuerKit(
  issuerBaggage,
  'quatloos',
  AssetKind.NAT,
);
```

## makeDurableIssuerKit(issuerBaggage, name, assetKind?, displayInfo?, optShutdownWithFailure?, issuerOptionsRecord?)

- Same parameters and return value as `prepareIssuerKit()`.

Makes a _new_ durable issuer kit; the initial incarnation only. Throws if
_issuerBaggage_ already holds an issuer kit. Most callers should use
`prepareIssuerKit()` instead, since it also handles the upgrade case.

## upgradeIssuerKit(issuerBaggage, optShutdownWithFailure?, recoverySetsOption?)

- **issuerBaggage**: **Baggage**
- **optShutdownWithFailure** - Optional, defaults to **undefined**.
- **recoverySetsOption**: **[RecoverySetsOption](#recoverysetsoption)** - Optional. Defaults to the predecessor's state.
- Returns **IssuerKit**

Revives a predecessor incarnation's issuer kit from _issuerBaggage_.
Throws if _issuerBaggage_ doesn't already hold one. Most callers should use
`prepareIssuerKit()` instead.

## elementShape

The **issuerOptionsRecord**'s _elementShape_ property may only be set for
a non-fungible or semi-fungible **Issuer** (an **AssetKind** of
**COPY_SET** or **COPY_BAG**). When present, it is a **Pattern** that
every element of this **Issuer**'s amounts must satisfy. For example, the
Zoe **Invitation** issuer uses an _elementShape_ describing the shape of
an individual invitation's details, so that every element of an
invitation-amount's **[CopySet](/glossary/#copyset)** is guaranteed to
match that shape.

```js
const ticketShape = harden({
  seat: M.number(),
  show: M.string(),
  start: M.string(),
});

const { issuer, mint, brand } = prepareIssuerKit(
  issuerBaggage,
  'AgoricTheaterTickets',
  AssetKind.COPY_SET,
  undefined,
  undefined,
  { elementShape: ticketShape },
);
```

## RecoverySetsOption

- `'hasRecoverySets'` (the default) or `'noRecoverySets'`

Controls whether an issuer maintains a **[recovery set](./purse#apurse-getrecoveryset)**
per **Purse**: the set of **Payments** withdrawn from that purse that are
still live, kept so they can be recovered in an emergency (for example,
after a vat crash and upgrade) via **[recoverAll()](./purse#apurse-recoverall)**.

Issuers first became durable with recovery sets mandatory. They were later
made optional via this option, but there is currently no support for
converting an issuer from one state to the other on upgrade: absence of a
stored `RecoverySetsOption` is equivalent to `'hasRecoverySets'`, and
`upgradeIssuerKit()` defaults to the predecessor's state if
_recoverySetsOption_ isn't passed.
