# Issuers and  Mints

## Issuers
![Issuer structure](./assets/issuers-and-assets.svg)

**Note**: You should not create an Issuer in a deploy script. Deploy scripts are ephemeral, so any object 
created there dies as soon as the script stops.

Behind the scenes, an `issuer` maps minted digital assets to their location in a `purse`
or `payment`. An `issuer` verifies, moves, and manipulates digital assets. 
Its special admin facet is a `mint` which it has a one-to-one
relationship with. Only a `mint` can issue new digital assets; an `issuer` cannot.

An `issuer` also has a one-to-one relationship with a `brand`. So, if
our `brand` is the imaginary currency Quatloos, only
the `issuer` in the one-to-one relationship with the Quatloos `brand`
can:
- Create a new empty `purse` that can store Quatloos.
- Manipulate a `payment` in Quatloos to be claimed, split, combined,
burned, or have its amount received.

An `issuer` should be obtained from a trusted source and
then relied upon as the authority as to whether an untrusted `payment`
of the same `brand` is valid.
 
![Issuer methods](./assets/issuer1.svg)

`Issuer` methods:
- Return information about an `issuer`.
- Create a new `issuer`.
- Create a new `purse`. 
- Operate on `payment` arguments.

The following is
a brief description and example of each `Issuer` method. For
more detail, click the method's name to go to its entry in the [ERTP
API Reference](/reference/ertp-api/).

- **Create issuer operation**
  - [makeIssuerKit()](/reference/ertp-api/issuer.md#makeissuerkit-allegedname-assetkind-displayinfo-optshutdownwithfailure-elementshape)
    - Create and return a new `issuer` and its associated `mint` and `brand`.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#import
      <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#makeIssuerKit
- **Get information about the issuer operations**
  - [anIssuer.getAllegedName()](/reference/ertp-api/issuer.md#anissuer-getallegedname)
    - Return the `allegedName` for the `issuer` (the non-trusted human-readable name of its associated `brand`).
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#getAllegedName
  - [anIssuer.getAssetKind()](/reference/ertp-api/issuer.md#anissuer-getassetkind)
    - Return the kind of the `issuer`'s asset; either `AssetKind.NAT` ("nat") or `AssetKind.SET` ("set").
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#getAssetKind
  - [anIssuer.getBrand()](/reference/ertp-api/issuer.md#anissuer-getbrand)
    - Return the `brand` for the `issuer`.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#getBrand
- **Purse operation**
  - [anIssuer.makeEmptyPurse()](/reference/ertp-api/issuer.md#anissuer-makeemptypurse)
    - Make and return an empty `purse` for holding assets of the `brand` associated with the `issuer`.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#makeEmptyPurse
- **Payment operations**
  - [anIssuer.burn(payment, optAmount)](/reference/ertp-api/issuer.md#anissuer-burn-payment-optamount)
    - Destroy all of the digital assets in the `payment`.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#burn
  - [anIssuer.claim(payment, optAmount)](/reference/ertp-api/issuer.md#anissuer-claim-payment-optamount)
    - Transfer all digital assets from `payment` to a new Payment.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#claim
  - [anIssuer.combine(paymentsArray)](/reference/ertp-api/issuer.md#anissuer-combine-paymentsarray-opttotalamount)
    - Combine multiple Payments into one new Payment.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#combine
  - [anIssuer.getAmountOf(payment)](/reference/ertp-api/issuer.md#anissuer-getamountof-payment)
    - Describe the `payment`'s balance as an Amount.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#getAmountOf
  - [anIssuer.isLive(payment)](/reference/ertp-api/issuer.md#anissuer-islive-payment)
    - Return `true` if the `payment` was created by the issuer and is available for use (has not been consumed or burned).
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#isLive
  - [anIssuer.split(payment, paymentAmountA)](/reference/ertp-api/issuer.md#anissuer-split-payment-paymentamounta)
    - Split a single `payment` into two new Payments.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#split
  - [anIssuer.splitMany(payment, paymentAmountArray)](/reference/ertp-api/issuer.md#anissuer-splitmany-payment-amountarray)
    - Split a single `payment` into multiple Payments.
    - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#splitMany


**Related Methods:**

**Note**: These methods help you find the right `issuer`, but aren't authoritative.
A `mint`, `brand`, or `purse` is actually associated with an `issuer` only if
the `issuer` itself acknowledges the association.

- [aMint.getIssuer()](/reference/ertp-api/mint.md#amint-getissuer)
  - Return the `issuer` uniquely associated with the `mint`.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#mintGetIssuer
- [aBrand.isMyIssuer(issuer)](/reference/ertp-api/brand.md#abrand-ismyissuer-allegedissuer)
  - Return `true` if `issuer` is the brand's `issuer`, `false` if not.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#isMyIssuer

## Mints
![Mint methods](./assets/mint.svg)

A `mint` issues new digital assets of its associated `brand` as a new 
`payment` object. These assets may be currency-like (our imaginary
Quatloos currency), goods-like valuables (magic swords for games), or
electronic rights (the right to participate in a contract). Only a
holder of a `mint` object can create new assets from it. 

In other words, let's say there
are 1000 Quatloos in circulation. Only holders of the Quatloos associated
`mint` can make any more Quatloos that'd boost the amount in circulation to, say, 2000.

Since these relationships are one-to-one and unchangeable:
- A `mint` created to make an asset `brand`, say Quatloos, can only create that `brand` asset.
For example, only Quatloos, not Moola or anything else.
- A `mint` that creates an asset `brand` is the only `mint` that can create that `brand`. Only
the one Quatloos `mint` can create new Quatloos.
- A `mint` that creates an asset `brand` can never be changed to create a different `brand`.
So a Quatloos `mint` can never become a Moola `mint`, or any other non-Quatloos asset.

There are two `mint` methods, and the method that creates new mints. Click the method's name to go to its entry in the [ERTP
API Reference](/reference/ertp-api/index.md).
- [aMint.getIssuer()](/reference/ertp-api/mint.md#amint-getissuer)
  - Return the `issuer` uniquely associated with the `mint`.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#mintGetIssuer
- [aMint.mintPayment()](/reference/ertp-api/mint.md#amint-mintpayment-newamount)
  - Create new digital assets of the `mint`'s associated `brand`.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#mintMintPayment
- [makeIssuerKit()](/reference/ertp-api/issuer.md#makeissuerkit-allegedname-assetkind-displayinfo-optshutdownwithfailure-elementshape)
  - Create and return a new `issuer` and its associated `mint` and `brand`.
  - <<< @/../snippets/ertp/guide/test-issuers-and-mints.js#makeIssuerKitMint

