# Issuers and  Mints

## Issuers

![Issuer methods](./assets/issuer.svg)  

Behind the scenes, an `issuer` maps minted digital assets to their location in a `purse`
or `payment`. An `issuer` verifies, moves, and manipulates digital assets. 
Its special admin facet is a `mint` which it has a one-to-one
relationship with. Only a `mint` can issue new digital assets.

An `issuer` also has a one-to-one relationship with a `brand`. So, if
our `brand` is *quatloos*, only
the `issuer` in the one-to-one relationship with the quatloos `brand`
can:
- Create a new empty `purse` that can store quatloos.
- Manipulate a `payment` in quatloos to be claimed, split, combined,
burned, or have its amount gotten.

The issuer cannot mint new amounts, but it can create empty purses and
payments. The issuer should be obtained from a trusted source and
then relied upon as the authority as to whether an untrusted payment
is valid.

`issuer` objects have 13 methods. 4 return information about an
`issuer`, 1 creates a new `issuer`, 1 creates a new `purse`, and 7
which actually operate on their `payment` object argument.

- **Create issuer operation**
  - [`makeIssuerKit(allegedName, amountMathKind)`](https://agoric.com/documentation/ertp/api/issuer.html#makeissuerkit-allegedname-mathhelpername)
    - Makes an `issuer` and its related `amountMath` and `brand`
    objects that are in one-to-one relationships with each
    other. Returns ` { mint, issuer, amountMath, brand }`. The `allegedName`
    is available from the `brand` to describe assets, but should not
    be trusted. `amountMathKind` specifies if the associated
    `amountMath` is of kind `nat` (the default), `str`, or `strSet`;
    see the [amountMath section]() for details. 
    - ```js
      const { issuer, mint, amountMath } = makeIssuerKit('bucks');
      // This is merely an amount, describing assets.
      const bucks2 = amountMath.make(2);
      const { mint, issuer, amountMath } = makeIssuerKit('alamedaCountyPropertyTitle', 'strSet');
	```
- **Get information about the issuer operations**
  - [`issuer.getBrand()`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-getbrand) 
    - Returns the issuer's `brand` value. The brand is not closely
      held, so it can be used by fake digital assets and amounts. Do
      not trust this method alone to identify an issuer.
    - ```js
      const { issuer, brand } = makeIssuerKit('bucks');
      const bucksBrand = issuer.getBrand();
      // brand === bucksBrand
      ```
  - [`issuer.getAllegedName()`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-getallegedname)
    - Returns the issuer/mint's
    [allegedName](https://agoric.com/documentation/glossary/#allegedname),
	the non-trusted human-readable name of the issuer's associated brand.
    - ```js
      const { issuer } = makeIssuerKit('bucks');
      const issuerAllegedName = issuer.getAllegedName();
      // issuerAllegedName === 'bucks'
       ```
  - [`issuer.getAmountMath()`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-getamountmath) 
    - Gets the issuer's `AmountMath` object. 
    - ```js
      const { issuer, amountMath } = makeIssuerKit('bucks');
      const issuerAmountMath = issuer.getAmountMath();
      // amountMath === issuerAmountMath
      ```
  - [`issuer.getAmountMathKind()`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-getmathhelpersname) 
    - Get the kind of `amountMath` for this issuer, either `nat`,
      `str`, or `strSet`.
    - ```js
      const { issuer } = makeIssuerKit('bucks');
      issuer.getAmountMathKind; // 'nat'
      ```
- **Purse operations**
  - [`issuer.makeEmptyPurse()`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-makeemptypurse) 
    - Returns an empty purse for the `brand` associated with the issuer.
    - ```js
      const { issuer } = makeIssuerKit('bucks');
      const purse = exampleIssuer.makeEmptyPurse();
      ```
- **Payment operations**
  - [`issuer.getAmountOf(payment)`](htttps://agoric.com/documentation/ertp/api/issuer.html#issuer-getamountof-payment)
    -  Returns the `payment` balance, an `amount`. Using the `issuer` rather than the `payment` lets us trust
      the result even if someone else sent us the payment.
    - ```js
      const { issuer, mint, amountMath } = makeIssuerKit('bucks');
      const payment = mint.mintPayment(amountMath.make(100));
      issuer.getAmountOf(payment); // returns 100 bucks
      ```
  - [`issuer.burn(payment, optAmount)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-burn-payment-optamount)
    - Burns (deletes) all of the `payment` argument's digital assets and deletes all mention of the `payment` from the `issuer`.
       If optional argument `optAmount` is present, the `payment`
       balance must be equal to its value.  If `payment` is a promise, the operation 
       happens after the promise resolves.
    - ```js
      const { issuer, mint, amountMath } = makeIssuerKit('bucks');
      const amountToBurn = amountMath.make(10);
      const paymentToBurn = mint.mintPayment(amountToBurn);

      // burntAmount should equal 10
      const burntAmount = issuer.burn(paymentToBurn, amountToBurn);
      ```
  - [`issuer.claim(payment, optAmount)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-claim-payment-optamount)
    - Transfer all digital assets from `payment` to a new payment and
	burn the original so no other references to this `payment` survive.
    if optional argument `optAmount` is present, the `payment` balance
	must be equal to its balance, otherwise it throws an error. If `payment`
    is a promise, the operation happens after the promise resolves.
    - ```js
      const { mint, issuer, amountMath } = makeIssuerKit('bucks');
      const amountExpectedToTransfer = amountMath.make(2);
      const originalPayment = mint.mintPayment(amountExpectedToTransfer);
      const newPayment = issuer.claim(originalPayment, amountToTransfer);
      ```
  - [`issuer.combine(paymentsArray)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-combine-paymentsarray)
    - Combine multiple `payment`s into one `payment`. If any `payment`
      in `paymentsArray` is a promise, the operation happens after all
      `payment`s resolve. The `payment`s are all burned except for the
      returned one. You cannot combine `payment`s of different brands.
    - ```js
      const { mint, issuer, amountMath } = makeIssuerKit('bucks');
      // create an array of 100 payments of 1 unit each
      const payments = [];
      for (let i = 0; i < 100; i += 1) {
        payments.push(mint.mintPayment(amountMath.make(1)));
      }
      // combinedPayment equals 100
      const combinedPayment = issuer.combine(payments);
      ```

  - [`issuer.split(payment, paymentAmountA)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-split-payment-paymentamounta) 
    - Split a single payment into two new payments, A and B, according
      to the `paymentAmountA` argument's value. In other words, the result
      has A equal to `paymentAmountA` and B equal to the original `payment`
      minus `paymentAmountA'. 
      The original `payment` argument is burned. If the original
      `payment` is a promise, the operation happens when  the promise
      resolves. 
    - ```js
      const { mint, issuer, amountMath } = makeIssuerKit('bucks');
      const oldPayment = mint.mintPayment(amountMath.make(30));

      const [paymentA, paymentB] = issuer.split(oldPayment, amountMath.make(10));       
      // paymentA is 10 bucks, payment B is 20 bucks.
      ```
  - [`issuer.splitMany(payment, paymentAmountArray)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-splitmany-paymentamountarray) 
    - Returns multiple payments in an array from splitting its single
      `payment` argument. The resulting number of payments is
      specified as the length of the `paymentAmountArray` argument,
      with the newly split payments having `amount`s corresponding
      to those in `paymentAmountArray`. If the `paymentAmountArray`
      argument amounts don't add up to the value of the `payment`
      argument, the operation fails. If the operation is successful,
      the original `payment` is burned. If the operation fails, the
      original `payment` is *not* burned.
    - ```js
      const { mint, issuer, amountMath } = makeIssuerKit('fungible');
      const oldPayment = mint.mintPayment(amountMath.make(100));
      const goodAmounts = Array(10).fill(amountMath.make(10));

      const arrayOfNewPayments = issuer.splitMany(oldPayment, goodAmounts);
      //Note that the total amount in the amountArray must equal the
      //amount in the original payment: 

      const { mint, issuer, amountMath } = makeIssuerKit('fungible');
      const payment = mint.mintPayment(amountMath.make(1000));

      // total amounts in badAmounts equal 20, when it should equal 1000
      const badAmounts = Array(2).fill(amountMath.make(10));

      // throws error
      issuer.splitMany(payment, badAmounts);
      ```
  - [`issuer.isLive(payment)`](https://agoric.com/documentation/ertp/api/issuer.html#issuer-islive-payment])
    - Returns `true` if the `payment` argument is still active
      (i.e. has not been used or burned). If `payment` is a promise,
      the operation happens on its resolution.

**Other objects' `issuer`-related methods:**

- [`mint.getIssuer()`](https://agoric.com/documentation/ertp/api/mint.html#mint-getissuer)
  - Return the `issuer` for the `mint`.
  - ```js
    const { issuer, mint } = makeIssuerKit('bucks');
    const mintIssuer = mint.getIssuer();
    // returns true
    Object.is(issuer, mintIssuer);
    ```
- [`brand.isMyIssuer(issuer)`](https://agoric.com/documentation/ertp/api/brand.html#brand-ismyissuer-issuer)
  - Returns `true` if the `brand` comes from this `issuer`.
  - ```js
    const isIssuer = brand.isMyIssuer(issuer);
    ```
- [`purse.getIssuer()`](https://agoric.com/documentation/ertp/api/purse.html#purse-getissuer)
  - Returns the `issuer` associated with the `purse`.
  - ```js
    const purseIssuer = purse.getIssuer();
    ```

## Mints

![Mint methods](./assets/mint.svg)  

A `mint` issues new digital assets of its associated `brand` as a new 
`payment` object. These assets may be currency-like (our imaginary
quatloos currency), goods-like valuables (magic swords for games), or
electronic rights (the right to participate in a contract). Only a`mint`object
holder can create a new asset from it. In other words, let's say there
are 1000 quatloos in circulation. Only the holder of the quatloos associated
`mint` object can make any more quatloos that'd boost the amount in circulation to, say, 2000.

A `mint` has a one-to-one relationship with an `issuer`, which in turn has
a one-to-one relationship with a `brand`. Thus, a `mint` has a one-to-one
relationships with the `brand` of its `issuer`. So for quatloos (or any other brand):
- Only one `issuer` can create new quatloos brand `purse` objects.
- Only one `mint` can create a new `payment` that contains newly created quatloo digital assets.

**tyg todo: We should have information on how one
creates/establishes a mint, and connects them to our `mint` objects both for our  currencies and for ones we've pegged from elsewhere. Who'd be good for getting info  on this from?"**  **Kate response: I think the concept of connecting a mint to "mint objects" is a wrong idea. Calling makeIssuerKit is what creates/establishes a mint, and that is it.**  **Tom response: Let me rephase the question. I'm about to write my first two contracts. One of them uses my personal digital currency, "tygs", over which I have control. How do I go about incorporating tygs into the contract/Agoric such that a contract transaction using tygs is the same as my doing a tygs using transaction outside of Agoric. In other words, I want to use "real" tygs, how do I get them into Agoric such that I can mint new ones, such that there's a valid issuer in the contract for them, etc.? For the other contract, I want to let people use an existing digital currency I don't control, say Bitcoin. Other than by the pegging method Pegasus did for the hackathon, how do I create/link Bitcoin within an Agoric contract? I just don't know of anywhere we explain how to set up "real currencies/digital rights" in our sandbox, as opposed to making up quatloos or similar that really don't have any value.**

There are two `mint` API commands:
- [`mint.getIssuer()`](https://agoric.com/documentation/ertp/api/mint.html#mint-getissuer)
  - Returns the `issuer` uniquely associated with the `mint`.
  - ```js
    const { issuer, mint } = makeIssuerKit('bucks');
    const mintIssuer = mint.getIssuer();
    // returns true
    Object.is(issuer, mintIssuer);
    ```
- [`mint.mintPayment(newAmount)`](https://agoric.com/documentation/ertp/api/mint.html#mint-mintpayment-newamount)
  - Returns a new `payment` containing newly minted assets with a balance equal to `newAmount`. In other words,
  it mints `newAmount` of digital assets and creates a `payment` to hold those assets.  
  - ```js
    const { issuer, mint } = makeIssuerKit('fungible');
    const fungible1000 = amountMath.make(1000);
    const newPayment = mint.mintPayment(fungible1000);
    ```
