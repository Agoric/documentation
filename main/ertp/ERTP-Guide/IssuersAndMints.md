# Issuers and  Mints

## Issuers

<router-link to="./assets/issuer2.svg">Issuer methods</router-link>  

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

<router-link to="./assets/issuer1.svg">Issuer methods</router-link>  

An `issuer` has 13 methods. 4 return information about an
`issuer`, 1 creates a new `issuer`, 1 creates a new `purse`, and 7
which actually operate on their `payment` object argument.

- **Create issuer operation**
  - <router-link to="./api/issuer.html#makeissuerkit-allegedname-mathhelpername">`makeIssuerKit(allegedName, amountMathKind)`</router-link>
  - Makes an `issuer` and its related `mint`, `amountMath` and `brand`.
    Returns ` { mint, issuer, amountMath, brand }` The `mint` and
    `brand` are in unchangeable one-to-one relationships with the `issuer`
    and each other`. The `amountMath` is in a many-to-one relationship
    with the `issuer`, `brand`, and `mint`.
    
    The `allegedName` is available from the `brand` to describe assets, but should not
    be trusted. 
    
    `amountMathKind` specifies if the associated `amountMath` is of kind `MathKind.NAT` (`nat`) 
    (the default value), `MathKind.STR` (`str`), or `MathKind.STRING_SET` (`strSet`);
    see the [amountMath page](./amountMath.md) for details. 
    - ```js
      const { issuer: quatloosIssuer, mint: quatloosMint, amountMath: quatloosAmountMath, brand: quatloosBrand } = 
            makeIssuerKit('quatloos');
      // This is merely an amount, describing assets. It does not create new assets.
      const quatloos2 = quatloosAmountMath.make(2);
      // Non-fungible asset, which needs an amountMath of kind 'strSet'
      const { mint: titleMint, issuer: titleIssuer, amountMath: titleAmountMath } = 
            makeIssuerKit('alamedaCountyPropertyTitle', MathKind.STRING_SET);
	```
- **Get information about the issuer operations**
  - <router-link to="./api/issuer.html#issuer-getbrand">`issuer.getBrand()`</router-link>
    - Returns the `brand` the `issuer` is in a one-to-one relationship with. The `brand` is not closely
      held, so it can be used by fake digital assets and amounts. Do
      not trust this method alone to identify an `issuer`. **tyg todo: Should this last be "brand" instead of "issuer"?**
    - ```js
      const { quatloosIssuer, quatloosBrand } = makeIssuerKit('quatloos');
      // myQuatloosBrand == quatloosBrand
      const myQuatloosBrand = quatloosIssuer.getBrand();
      ```
  - <router-link to="./api/issuer.html#issuer-getallegedname">`issuer.getAllegedName()`</router-link>
    - Returns the `issuer`/`mint`'s
    [allegedName](https://agoric.com/documentation/glossary/#allegedname),
	the non-trusted human-readable name of the `issuer`'s associated `brand`.
    - ```js
      const { quatloosIssuer } = makeIssuerKit('quatloos');
      const quatloosIssuerAllegedName = quatloosIssuer.getAllegedName();
      // quatloosissuerAllegedName === 'quatloos'
       ```
  - <router-link to="./api/issuer.html#issuer-getamountmath">`issuer.getAmountMath()`</router-link>
    - Gets the `issuer`'s associated `AmountMath`. 
    - ```js
      const { quatloosIssuer, quatloosAmountMath } = makeIssuerKit('quatloos');
      const quatloosIssuerAmountMath = quatloosIssuer.getAmountMath();
      // quatloosAmountMath === quatloosIssuerAmountMath
      ```
  - <router-link to="./api/issuer.html#issuer-getamountmathind">`issuer.getAmountMathKind()`</router-link>
    - Get the kind of `amountMath` for this `issuer`, either `nat`,
      `str`, or `strSet`.
    - ```js
      const { quatloosIssuer } = makeIssuerKit('quatloos');
      quatloosIssuer.getAmountMathKind; // 'nat', the default value for makeIssuerKit()
      ```
- **Purse operation**
  - <router-link to="./api/issuer.html#issuer-makeemptypurse">`issuer.makeEmptyPurse()`</router-link>
    - Returns an empty `purse` for the `brand` associated with the `issuer`. The `purse` only accepts valid 
    deposits of its associated `brand`, so you can retroactively identify a valid `payment` of that `brand`
    by successfully depositing it.
    - ```js
      const { quatloosIssuer } = makeIssuerKit('quatloos');
      // The new empty purse contains 0 Quatloos
      const quatloosPurse = quatloosIssuer.makeEmptyPurse();
      ```
- **Payment operations**
  - [`issuer.getAmountOf(payment)`](htttps://agoric.com/documentation/ertp/api/issuer.html#issuer-getamountof-payment)
    -  Returns the `payment` balance, an `amount`. Using the `issuer` rather than the `payment` lets us trust
      the result even if someone else sent us the `payment`.
    - ```js
      const { quatloosIssuer, quatloosMint, quatloosAmountMath } = makeIssuerKit('quatloos');
      const quatloosPayment = quatloosMint.mintPayment(quatloosAmountMath.make(100));
      quatloosIssuer.getAmountOf(quatloosPayment); // returns 100 quatloos
      ```
  - [`issuer.burn(payment, optAmount)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-burn-payment-optamount)
    - Burns (deletes) all of the `payment` argument's digital assets and deletes all mention of the `payment` from the `issuer`.
       If optional argument `optAmount` is present, the `payment`
       balance must be equal to `optAmount`'s value.  If `payment` is a promise, the operation 
       happens after the promise resolves. Returns the value of the burned `payment`.
    - ```js
      const { quatloosIssuer, quatloosMint, quatloosAmountMath } = makeIssuerKit('quatloos');
      const amountToBurn = quatloosAmountMath.make(10);
      const paymentToBurn = quatloosMint.mintPayment(amountToBurn);

      // burntAmountValue should equal 10
      const burntAmountValue = quatloosIssuer.burn(paymentToBurn, amountToBurn);
      ```
  - [`issuer.claim(payment, optAmount)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-claim-payment-optamount)
    - Transfer all digital assets from the `payment` argument to a new `payment` and
	burn the original so no other references to this `payment` survive. Returns the new `payment`
    If optional argument `optAmount` is present, the `payment` balance
	must be equal to `optAmount`'s balance, otherwise it throws an error. If `payment`
    is a promise, the operation happens after the promise resolves.
    - ```js
      const { quatloosMint, quatloosIssuer, quatloosAmountMath } = makeIssuerKit('quatloos');
      const amountExpectedToTransfer = quatloosAmountMath.make(2);
      const originalPayment = quatloosMint.mintPayment(amountExpectedToTransfer);
      const newPayment = quatloosIssuer.claim(originalPayment, amountToTransfer);
      ```
  - [`issuer.combine(paymentsArray)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-combine-paymentsarray)
    - Combine multiple `payment`s into one `payment`. If any `payment`
      in `paymentsArray` is a promise, the operation happens after all
      `payment`s resolve. Every `payment` is burned except for the
      returned one. If you try to combine `payments` of different brands,
      it throws an exception and each `payment` is unaffected.
    - ```js
      const { quatloosMint, quatloosIssuer, quatloosAmountMath } = makeIssuerKit('quatloos');
      // create an array of 100 payments of 1 unit each
      const payments = [];
      for (let i = 0; i < 100; i += 1) {
        payments.push(quatloosMint.mintPayment(quatloosAmountMath.make(1)));
      }
      // combinedPayment equals 100
      const combinedPayment = quatloosIssuer.combine(payments);
      ```
  - [`issuer.split(payment, paymentAmountA)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-split-payment-paymentamounta) 
    - Split a single `payment` into two new `payments`, A and B, according
      to the `paymentAmountA` argument's value. In other words, the result
      has A equal to `paymentAmountA` and B equal to the original `payment`
      minus `paymentAmountA`. 
      The original `payment` argument is burned. If the original
      `payment` is a promise, the operation happens when the promise
      resolves. 
    - ```js
      const { quatloosMint, quatloosIssuer, quatloosAmountMath } = makeIssuerKit('quatloos');
      const oldPayment = quatloosMint.mintPayment(quatloosAmountMath.make(30));

      const [paymentA, paymentB] = quatloosIssuer.split(oldPayment, quatloosAmountMath.make(10));       
      // paymentA is 10 quatloos, payment B is 20 quatloos.
      ```
  - [`issuer.splitMany(payment, paymentAmountArray)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-splitmany-paymentamountarray) 
    - Returns multiple `payments` in an array from splitting its single
      `payment` argument. The resulting number of `payments` is
      specified as the length of the `paymentAmountArray` argument,
      with the newly split `payments` having `amounts` corresponding
      to those in `paymentAmountArray`. If the `paymentAmountArray`
      argument `amounts` don't add up to the `value` of the `payment`
      argument, the operation fails. If the operation is successful,
      the original `payment` is burned. If the operation fails, the
      original `payment` is *not* burned.
    - ```js
      const { quatloosMint, quatloosIssuer, quatloosAmountMath } = makeIssuerKit('quatloos');
      const oldQuatloosPayment = quatloosMint.mintPayment(quatloosAmountMath.make(100));
      const goodQuatloosAmounts = Array(10).fill(quatloosAmountMath.make(10));

      const arrayOfNewPayments = quatloosIssuer.splitMany(oldQuatloosPayment, goodQuatloosAmounts);
      //Note that the total amount in the amountArray must equal the
      //amount in the original payment, in the above case, 100 Quatloos in each.

      const { quatloosMint, quatloosIssuer, quatloosAmountMath } = makeIssuerKit('quatloos');
      const quatloosPayment = quatloosMint.mintPayment(quatloosAmountMath.make(1000));

      // total amounts in badQuatloosAmounts equal 20, when it should equal 1000
      const badQuatloosAmounts = Array(2).fill(quatloosAmountMath.make(10));

      // throws error
      issuer.splitMany(quatloosPayment, badQuatloosAmounts);
      ```
  - [`issuer.isLive(payment)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-islive-payment])
    - Returns `true` if the `payment` argument is still active
      (i.e. has not been used or burned and was issued by this `issuer`). If `payment` is a promise,
      the operation happens on its resolution.

**Related Methods:**

**Note**: None of these methods return a canonical result. If the `issuer` itself doesn't acknowledge that
the `mint`, `brand` or `purse` are associated with it, then they're invalid. These methods help you find 
the right `issuer`, but aren't authoritative.

- <router-link to="./api/mint.html#mint-getissuer">``mint.getIssuer()`</router-link> 
  - Return the associated `issuer` for the `mint`.
  - ```js
    const { issuer: quatloosIssuer, mint: quatloosMint } = makeIssuerKit('quatloos');
    const quatloosMintIssuer = quatloosMint.getIssuer();
    // returns true
    issuer === quatloosMintIssuer);
    ```
- <router-link to="./api/brand.html#brand-ismyissuer-issuer">``brand.isMyIssuer(issuer)`</router-link> 
  - Returns `true` if the `brand` comes from this `issuer`.
  - ```js
    const isIssuer = brand.isMyIssuer(quatloosIssuer);
    ```
- <router-link to="./api/purse.html#purse-getissuer">`purse.getIssuer()`</router-link>
  - Returns the `issuer` associated with the `purse`.
  - ```js
    const purseIssuer = purse.getIssuer();
    ```

## Mints

<router-link to="./assets/mint.svg">Mint methods</router-link> 

A `mint` issues new digital assets of its associated `brand` as a new 
`payment` object. These assets may be currency-like (our imaginary
Quatloos currency), goods-like valuables (magic swords for games), or
electronic rights (the right to participate in a contract). Only a`mint`object
holder can create new assets from it. 

In other words, let's say there
are 1000 Quatloos in circulation. Only holders of the Quatloos associated
`mint` can make any more Quatloos that'd boost the amount in circulation to, say, 2000.

Since these relationships are one-to-one and unchangeable:
- A `mint` created to make an asset `brand`, say Quatloos, can only create that `brand` asset.
For example, only Quatloos, not Moola or anything else.
- A `mint` that creates an asset `brand` is the only `mint` that can create that `brand`. Only
the one Quatloos `mint` can create new Quatloos.
- A `mint` that creates an asset `brand` can never be changed to create a different `brand.
So a Quatloos `mint` can never become a Moola `mint`, or any other non-Quatloos asset.

**tyg todo: We should have information on how one
creates/establishes a mint, and connects them to our `mint` objects both for our  currencies and for ones we've pegged from elsewhere. Who'd be good for getting info  on this from?"**  **Kate response: I think the concept of connecting a mint to "mint objects" is a wrong idea. Calling makeIssuerKit is what creates/establishes a mint, and that is it.**  **Tom response: Let me rephase the question. I'm about to write my first two contracts. One of them uses my personal digital currency, "tygs", over which I have control. How do I go about incorporating tygs into the contract/Agoric such that a contract transaction using tygs is the same as my doing a tygs using transaction outside of Agoric. In other words, I want to use "real" tygs, how do I get them into Agoric such that I can mint new ones, such that there's a valid issuer in the contract for them, etc.? For the other contract, I want to let people use an existing digital currency I don't control, say Bitcoin. Other than by the pegging method Pegasus did for the hackathon, how do I create/link Bitcoin within an Agoric contract? I just don't know of anywhere we explain how to set up "real currencies/digital rights" in our sandbox, as opposed to making up quatloos or similar that really don't have any value.**

There are two `mint` API commands:
- [`mint.getIssuer()`](https://agoric.com/documentation/ertp/api/mint.html#mint-getissuer)
  - Returns the `issuer` uniquely associated with the `mint`.
  - ```js
    import { makeIssuerKit, getIssuer } from @agoric/ertp
    const { issuer: quatloosIssuer, mint: quatloosMint } = makeIssuerKit('quatloos');
    const quatloosMintIssuer = quatloosMint.getIssuer();
    // returns true
    quatloosIssuer === quatloosMintIssuer;
    ```
- [`mint.mintPayment(newAmount)`](https://agoric.com/documentation/ertp/api/mint.html#mint-mintpayment-newamount)
  - Returns a new `payment` containing newly minted assets with a balance equal to `newAmount`. In other words,
    it mints `newAmount` of digital assets and creates a `payment` to hold those new assets. The assets are of
    the `mint`'s associated `brand`.
    
    **Important**: mint.mintPayment() is the only way to create new digital assets. There is no other way.
  - ```js
    import { MathKind, makeIssuerKit, makeLocalAmountMath, mintPayment } from '@agoric/ertp';    
    const { issuer: quatloosIssuer, mint: quatloosMint} = makeIssuerKit('quatloos');
    const quatloosLocalAmountMath = await makeLocalAmountMath(quatloosIssuer);
    const quatloos1000 = quatloosLocalAmountMath.make(1000);
    const newPayment = quatloosMint.mintPayment(quatloos1000);
    ```
