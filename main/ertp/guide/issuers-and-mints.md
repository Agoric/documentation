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
burned, or have its amount gotten.

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
API Reference](/ertp/api/#ertp-api).

- **Create issuer operation**
  - [`makeIssuerKit(allegedName, amountMathKind, displayInfo=)`](/ertp/api/issuer.md#makeissuerkit-allegedname-amountmathkind-displayinfo)
  - Makes an `issuer` and its related `mint` and `brand`.
    Returns ` { mint, issuer, brand }` The `mint` and
    `brand` are in unchangeable one-to-one relationships with the `issuer`
    and each other. 
    
    The `allegedName` is available from the `brand` to describe assets, but should not
    be trusted. 
    
    `amountMathKind` specifies if the associated `amountMath` is of kind `MathKind.NAT` (`nat`) 
    (the default value) or `MathKind.SET` (`set`);
    see the [`amountMath` page](./amount-math.md) for details. 
    
    `displayInfo` is the number of places to the right of the decimal point to display of any
    `values` associated with the created `brand`. It defaults to `undefined`
    
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#import
      <<< @/snippets/ertp/guide/test-issuers-and-mints.js#makeIssuerKit
- **Get information about the issuer operations**
  - [`issuer.getBrand()`](/ertp/api/issuer.md#issuer-getbrand)
    - Returns the `brand` the `issuer` is in a one-to-one relationship with. The `brand` is not closely
      held, so it can be used by fake digital assets and `amounts`. Do
      not trust this method alone to ensure the `issuer` has the right `brand`.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#getBrand
  - [`issuer.getAllegedName()`](/ertp/api/issuer.md#issuer-getallegedname)
    - Returns the `issuer`/`mint`'s
      [`allegedName`](/glossary/#allegedname),
	the non-trusted human-readable name of the `issuer`'s associated `brand`.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#getAllegedName
  - [`issuer.getAmountMathKind()`](/ertp/api/issuer.md#issuer-getamountmathkind)
    - Get the kind of `amountMath` for this `issuer`, either `MathKind.NAT` (`nat`),
      or `MathKind.SET` (`set`).
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#getAmountMathKind
- **Purse operation**
  - [`issuer.makeEmptyPurse()`](/ertp/api/issuer.md#issuer-makeemptypurse)
    - Returns a new empty `purse` for the `brand` associated with the `issuer`. The `purse` only accepts valid 
      deposits of its associated `brand`, so you can retroactively identify a valid `payment` of that `brand`
      by successfully depositing it into this `purse`.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#makeEmptyPurse
- **Payment operations**
  - [`issuer.getAmountOf(payment)`](/ertp/api/issuer.md#issuer-getamountof-payment)
    -  Returns the `payment` balance, an `amount`. Using the `issuer` rather than the `payment` lets us trust
      the result even if someone we do not trust sent us the `payment`.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#getAmountOf
  - [`issuer.burn(payment, optAmount)`](/ertp/api/issuer.md#issuer-burn-payment-optamount)
    - Burns (destroys) all of the `payment` argument's digital assets and deletes all mention of the `payment` from the `issuer`.
       If optional argument `optAmount` is present, the `payment`
       balance must be equal to `optAmount`'s value.  If `payment` is a promise, the operation 
       happens after the promise resolves. Returns the value of the burned `payment`.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#burn
  - [`issuer.claim(payment, optAmount)`](/ertp/api/issuer.md#issuer-claim-payment-optamount)
    - Transfer all digital assets from the `payment` argument to a new `payment` and
      burn the original so no other references to this `payment` survive. Returns the new `payment`
      If optional argument `optAmount` is present, the `payment` balance
      must be equal to `optAmount`'s balance, otherwise it throws an error. If `payment`
      is a promise for a payment, the operation happens after the promise resolves.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#claim
  - [`issuer.combine(paymentsArray)`](/ertp/api/issuer.md#issuer-combine-paymentsarray-opttotalamount)
    - Combine multiple `payments` into one `payment`. If any `payment`
      in `paymentsArray` is a promise for a payment, the operation happens after all
      promises resolve. Every `payment` is burned except for the
      returned one. If you try to combine `payments` of different `brands`,
      it throws an exception and each `payment` is unaffected.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#combine

  - [`issuer.split(payment, paymentAmountA`)](/ertp/api/issuer.md#issuer-split-payment-paymentamounta)
    - Split a single `payment` into two new `payments`, A and B, according
      to the `paymentAmountA` argument's value. In other words, the result
      has A equal to `paymentAmountA` and B equal to the original `payment`
      minus `paymentAmountA`. 
      The original `payment` argument is burned. If the original
      `payment` is a promise, the operation happens when the promise
      resolves. 
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#split
   - [`issuer.splitMany(payment, paymentAmountArray)`](/ertp/api/issuer.md#issuer-splitmany-payment-amountarray)
     - Returns multiple `payments` in an array from splitting its single
       `payment` argument. The resulting number of `payments` is
       specified as the length of the `paymentAmountArray` argument,
       with the newly split `payments` having `amounts` corresponding
       to those in `paymentAmountArray`. If the `paymentAmountArray`
       argument `amounts` don't add up to the `value` of the `payment`
       argument, the operation fails. If the operation is successful,
       the original `payment` is burned. If the operation fails, the
       original `payment` is *not* burned.
     - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#splitMany
  - [`issuer.isLive(payment)`](/ertp/api/issuer.md#issuer-islive-payment)
    - Returns `true` if the `payment` argument is still active
      (i.e. has not been used or burned and was issued by this `issuer`). If `payment` is a promise,
      the operation happens on its resolution.
    - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#isLive


**Related Methods:**

**Note**: None of these methods return a canonical result. If the `issuer` itself doesn't acknowledge that
the `mint`, `brand` or `purse` are associated with it, then they're invalid. These methods help you find 
the right `issuer`, but aren't authoritative.

- [`mint.getIssuer()`](/ertp/api/mint.md#mint-getissuer) 
  - Return the associated `issuer` for the `mint`.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#mintGetIssuer
- [`brand.isMyIssuer(issuer)`](/ertp/api/brand.md#brand-ismyissuer-issuer) 
  - Returns `true` if the `brand` comes from this `issuer`.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#isMyIssuer

## Mints
![Mint methods](./assets/mint.svg)

A `mint` issues new digital assets of its associated `brand` as a new 
`payment` object. These assets may be currency-like (our imaginary
Quatloos currency), goods-like valuables (magic swords for games), or
electronic rights (the right to participate in a contract). Only a
holder of a `mint`object can create new assets from it. 

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

There are two `mint` methods. Click the method's name to go to its entry in the [ERTP
API Reference](/ertp/api/#ertp-api).
- [`mint.getIssuer()`](/ertp/api/mint.md#mint-getissuer)
  - Returns the `issuer` uniquely associated with the `mint`.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#mintGetIssuer
- [`mint.mintPayment(newAmount)`](/ertp/api/mint.md#mint-mintpayment-newamount)
  - Returns a new `payment` containing newly minted assets with a balance equal to `newAmount`. In other words,
    it mints `newAmount` of digital assets and creates a `payment` to hold those new assets. The assets are of
    the `mint`'s associated `brand`.
    
    **Important**: `mint.mintPayment()` is the only way in ERTP to create new digital assets. There is no other way.
    The Zoe Contract Facet (`zcf`) can also create a mint in Zoe that can create new digital assets.
  - <<< @/snippets/ertp/guide/test-issuers-and-mints.js#mintMintPayment
