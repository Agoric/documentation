# ERTP Introduction

::: tip Beta status
The Agoric platform is at the beta stage.
It has not yet been formally tested or hardened.
Do not use for production purposes.
:::

ERTP (*Electronic Rights Transfer Protocol*) is Agoric's token
standard for digital assets in
JavaScript. Using ERTP, you can easily create a wide variety of digital assets,
all of which are transferred exactly the same way and with exactly the
same security properties.

ERTP uses object capabilities to enforce access control. If your
program has a reference to an object, it can call methods on that
object. If it doesn't have a reference, it can't.

## Creating assets with ERTP

In ERTP, *mints* create *digital assets*. Access to an asset's
`mint` lets you create more digital assets of that kind. You can then
store new assets in a *payment* or a *purse*.
- `Payments`: Assets you intend to move between `purses` or to other destinations.
- `Purses`: Store assets until you withdraw them into a payment for use

To send assets in ERTP:
1. Withdraw them from a `purse`. This creates a `payment`.
2. Send this `payment` to a recipient object as a message.

To receive assets in ERTP:
1. Create a `purse` for the asset kind you'll receive. **Note:** You
do not need access to the kind's `mint` to do this.
2. Receive the message with the `payment` and deposit the `payment` in
your `purse`.

## Security properties

An ERTP `purse` has a `deposit` method which takes a `payment`
as its argument. It first checks that the `payment` is
genuine and the same asset kind as the `purse` (any individual
`purse` or `payment` can only hold one kind of asset, which is set on
their creation. So a `purse` might hold Quatloos, meaning it couldn't
hold Moola or any other non-Quatloo asset). Note: Quatloos and Moola are both
imaginary currencies.

If everything passes the checks, the assets move from the `payment` to
the `purse`. If there's a problem, it throws an error.

After a successful deposit, ERTP guarantees:
- The `payment` is burned (i.e. destroyed).
- The `purse` contains the total of what it held before plus the `payment`'s full content.
  - For example, deposit of a 3 Quatloos `payment` into a `purse` that already has 7 Quatloos
    updates its balance to 10 Quatloos.

When the `deposit()` call throws an error (something goes wrong),
ERTP guarantees:
- The alleged `payment` is in the same state as before the call.
- The `purse` is in the same state as before the call.

In other words, a failed attempt to deposit a 3 Quatloo `payment`
in a 7 Quatloo `purse` means the `payment` continues to exist and hold
3 Quatloos, and the `purse` continues to hold 7 Quatloos.

## Issuers and mints

Other key ERTP components are:
- **Mints**: Make new digital assets as a new `Payment`. `Mints` only
make one kind of asset (these can be currencies, objects for use in games, property rights, etc.
In these docs, we use an imaginary currency, Quatloos, for our examples).
We refer to
that kind as a `mint`'s *Brand*. So if a `mint` issues Quatloos, it's a
Quatloo `brand` `mint`.  Only `mints` can issue new digital assets. To mint
new assets of a particular kind, you must have a reference to that
kind's `mint`.

- **Issuers**: Create empty `purses` and manipulate and operate on
`payments`. `Issuers` verify and move digital assets and are
the authority on contents of `payments` and `purses` using their brand.

An `issuer`'s special admin facet is a `Mint`, and that `Mint` and `Issuer`
have a one-to-one relationship. With a reference to an `Issuer`, you can
check the validity of a `payment` in that `issuer`'s assets;
i.e. If you have a reference to the Quatloos `issuer`, you can validate
any `payment` made in Quatloos. You can also claim the `payment` either
as a new `payment` to yourself or a `purse` you control.

`Issuers` should be gotten from a trusted source
and then relied upon as the decider of whether an untrusted `payment` is
valid.

**Note**: There is a one-to-one correspondence between a `brand`, a
`mint`, and an `issuer`. In other words:
- A `mint` associated with a Quatloos `brand` can only create new Quatloos
  and is the only `mint` that can create new Quatloos.
- An `issuer` associated with a Quatloos `mint` can only operate on Quatloos
  asset holders. It is the only `issuer` that can operate on them.

## Amounts
*Amounts* describe digital assets without having any value of their own.
Anyone can make one, and they can be sent freely to anyone since they
convey no underlying value. They have two parts:
- **Brand**: An unforgeable object identity for the digital asset's kind,
  such as an object that represents Quatloos.
- **Value**: How much/many of the asset. Fungible `values` are natural
  numbers and represented as `BigInts`. Non-fungible `values` are strings or objects representing
  attributes of the asset (say, a theater ticket's row and seat positions).

Note: *fungible* means any item in a set can be used. For example, for
change for a dollar, any four quarters work. *Non-fungible* means
specific items in a set must be used. For example, theater tickets
are not all the same, and it matters if you get third row center or
second balcony far left  (and affects what you're willing to trade for
it).

## AmountMath

`Issuers` must be able to deposit and withdraw assets from a `purse`. This
requires being able to add and subtract digital assets. They use a set
of `AmountMath` functions.

In addition to math operations, `AmountMath` functions check on their
arguments' `brands`, throwing an error if the wrong `brand` was used.

An `AmountMath` only works on assets of their associated `brand` and `issuer`.
There can be many copies of the `AmountMath` for a particular `brand` and
its `issuer`.

## Next Steps

If you are Getting Started, you should go to the
[Introduction to Zoe](/getting-started/intro-zoe.md).

If you've finished the Getting Started material, you should go to the
[ERTP Guide](/ertp/guide/)
for a fuller explanation of ERTP
concepts, including ones not covered in this Introduction.
