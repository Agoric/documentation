# ERTP Introduction

ERTP (*Electronic Rights Transfer Protocol*) is Agoric's token
standard for digital assets in
JavaScript. Using ERTP, you can easily create a wide variety of digital assets,
all of which are transferred exactly the same way and with exactly the
same security properties. 

ERTP uses object capabilities to enforce access control. If your
program has a reference to an object, it can call methods on that
object. If it doesn't have a reference, it can't. 

## Creating assets with ERTP

In ERTP, *mints* create digital *assets*. Access to an asset type's
mint lets you create more digital assets of that type. You can then
store new assets in a *payment* or a *purse*. 
- **Payments**: Assets you intend to send to someone else.
- **Purses**: Store assets until you withdraw them into a payment for use

To send assets in ERTP:
1. Withdraw them from a purse. This creates a payment.
2. Send this payment to a recipient object as a message.

To receive assets in ERTP:
1. Create a purse for the asset type you'll receive. **Note:** You
do not need access to the type's mint. The Issuer (which is widely shared) provides an empty purse for the asking.
2. Get access to the asset type you'll receive.
3. Receive the message with the payment and deposit the payment in
your purse.

## Security properties

ERTP purse objects have a `deposit` message which takes a payment
object as its argument. It first checks that the payment object is 
genuine and the same asset type as the purse (after all, quatloos 
are a very unstable asset, so we wouldn't want to let people deposit 
quatloos and get credit for simoleans. (Note: quatloos and simoleans are both
imaginary currencies.)

If everything passes the checks, the asset moves from the payment to
the purse. If there's a problem, it throws an error.

After a successful deposit, ERTP guarantees:
- The payment object is empty.
- The purse contains the payment's full content.

When the `deposit` call throws an error (i.e. something went wrong),
ERTP guarantees: 
- The alleged payment is in the same state as before the call.
- The purse is in the same state as before the call.

## Issuers and mints

Other key ERTP objects are:

- **Mints**: Issue new digital assets as a new Payment. Mints only
issue one type of asset (quatloos, simoleons, moola, etc. Note that these
are all imaginary currencies used as examples.). We refer to
that type as the mint's *Brand*. So if a mint issues quatloos, it's a
quatloo brand mint.  Only mints can issue new digital assets. To mint
new assets of a particular type, you must have a reference to that
type's mint 

- **Issuers**: Create empty purses and payments and map minted
 assets to them when assets are added or removed. 
 Issuers verify and move digital assets.

An issuer's special admin facet is a Mint, and that Mint and Issuer are
 associated with each other. With a reference to an issuer, you can
 check the validity of a payment in that issuer's mint's assets, as
 well as claim it either as a new payment to yourself or a purse you
 control. 

Issuers (i.e. their references) should be gotten from a trusted source
and then relied upon as the decider of whether an untrusted payment is
valid  

**Note**: There is a one-to-one correspondence between a brand and a
  mint, a mint and an issuer, and an issuer and a brand. In other
  words, each mint issues a unique kind of digital asset, say,
  quatloos, and only that kind of asset.

## Amounts

*Amounts* describe digital assets without having any value of their own.
Anyone can make one, and they can be sent to anyone. They have two parts:
- **Brand**: An unforgeable object identity for the digital asset's type,
  such as an object that represents quatloos.
- **Extent**: How much/many of the asset. Fungible extents are natural
  numbers. Non-fungible extents are strings or objects representing
  attributes of the asset (say, a theater ticket's row and seat positions).

Note: *fungible* means any item in a set can be used. For example, for 
change for a dollar, any four quarters work. *Non-fungible* means
specific items in a set must be used. For  example, theater tickets
are not all the same, and it matters if you get third row center or
second balcony far left  (and affects what you're willing to trade for
it). 

## Amount Math

Issuers must be able to deposit and withdraw assets from a purse. This
requires being able to add and subtract digital assets. They use a set
of `amountMath` functions, which are aided by `mathHelpers` functions.

In addition to math operations, `amountMath` functions check on their
arguments' brands, throwing an error if the wrong brand was used.

## Next Steps

If Getting Started, you should go to the [Introduction to Zoe](https://agoric.com/documentation/getting-started/zoe-introduction/).

If you've finished the Getting Started material, you should go to the
[ERTP Guide](https://agoric.com/documentation/ertp/guide/) for a fuller explanation of ERTP
concepts, including ones not covered in this Introduction. 
