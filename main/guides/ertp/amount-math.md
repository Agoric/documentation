# AmountMath

Depositing and withdrawing assets from a
**[Purse](/reference/ertp-api/purse.md)** and manipulating **[Payment](/reference/ertp-api/payment.md)** amounts 
all require adding and subtracting digital assets.
ERTP uses the **[AmountMath](/reference/ertp-api/amount-math.md)** library for all these operations. 

The **AmountMath** methods work for all types of assets: fungible, non-fungible, and semi-fungible. 

The following is a brief description of the **AmountMath** methods.

## Information Getting Methods

- [AmountMath.getValue()](/reference/ertp-api/amount-math.md#amountmath-getvalue-brand-amount)
    - Returns the **Value** of the **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** argument. For fungible assets, this will be a **BigInt**.
    - <<< @/snippets/ertp/guide/test-amount-math.js#getValue

## Comparison Methods

- [AmountMath.isEmpty()](/reference/ertp-api/amount-math.md#amountmath-isempty-amount-brand)
    - Returns **true** if its **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** argument is empty, otherwise returns **false**. Throws an error if the optional **[Brand](/reference/ertp-api/brand.md)** argument isn't the same as the **Amount** argument's **Brand**.
    - <<< @/snippets/ertp/guide/test-amount-math.js#isEmpty
- [AmountMath.isGTE()](/reference/ertp-api/amount-math.md#amountmath-isgte-leftamount-rightamount-brand)
    - Returns **true** if the *leftAmount* argument is greater than or equal
      to the &rightAmount* argument, otherwise it returns **false**.
      The method throws an error if the optional **Brand** argument isn't the same as the **Brands** of the **Amount** arguments.
    - <<< @/snippets/ertp/guide/test-amount-math.js#isGTE
- [AmountMath.isEqual()](/reference/ertp-api/amount-math.md#amountmath-isequal-leftamount-rightamount-brand)
    - Returns **true** if the *leftAmount* argument equals the
      *rightAmount* argument. The method throws an error if the optional **Brand** argument isn't the same as the **Brands** of the **Amount** arguments.
    - <<< @/snippets/ertp/guide/test-amount-math.js#isEqual
- [AmountMath.coerce()](/reference/ertp-api/amount-math.md#amountmath-coerce-brand-allegedamount)
    - Takes an **Amount** and returns it if it's a valid **Amount**.
      If the **Amount** is invalid, the method throws an error.
    - <<< @/snippets/ertp/guide/test-amount-math.js#coerce


## Manipulator Methods

- [AmountMath.add()](/reference/ertp-api/amount-math.md#amountmath-add-leftamount-rightamount-brand)
    - Returns an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** that is the union of the *leftAmount* and *rightAmount*
      **Amount** arguments. For a fungible **Amount**, this means that their
      values will be added together. For a non-fungible **Amount**, this usually means
      including all elements from both *leftAmount* and *rightAmount*.
      Throws an error if the optional **[Brand](/reference/ertp-api/brand.md)** argument isn't the same as the **Brands** of the **Amount** arguments.
    - <<< @/snippets/ertp/guide/test-amount-math.js#add
- [AmountMath.subtract()](/reference/ertp-api/amount-math.md#amountmath-subtract-leftamount-rightamount-brand)
    - Returns a new **Amount** that is the *leftAmount* argument minus
      the *rightAmount* argument (i.e., for strings or objects
      everything in *leftAmount* not in *rightAmount*). If *leftAmount*
      doesn't include the contents of *rightAmount*, the method throws an error. 
      It also throws an error if the optional **Brand** argument isn't the 
      same as the **Brands** of the **Amount** arguments.
    - <<< @/snippets/ertp/guide/test-amount-math.js#subtract


## Amount Creation Methods

- [AmountMath.make()](/reference/ertp-api/amount-math.md#amountmath-make-brand-allegedvalue)	
    - Takes a **Value** argument and returns an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** by making a record
      with the **Value** and the **[Brand](/reference/ertp-api/brand.md)** passed into the method.
      The **Value**
      argument should be represented as a **BigInt** (e.g., *10n* rather than *10*).
    - <<< @/snippets/ertp/guide/test-amount-math.js#make
- [AmountMath.makeEmpty()](/reference/ertp-api/amount-math.md#amountmath-makeempty-brand-assetkind)
    - Returns an **Amount** representing an empty **Amount**. Note that this value varies depending on the
      **Brand** and its **[AssetKind](/reference/ertp-api/ertp-data-types.md#assetkind)**.
    - <<< @/snippets/ertp/guide/test-amount-math.js#makeEmpty
- [AmountMath.makeEmptyFromAmount()](/reference/ertp-api/amount-math.md#amountmath-makeemptyfromamount-amount)
    - Returns an **Amount** representing an empty **Amount**, using another **Amount**
      as the template for the new empty **Amount**'s **Brand** and **AssetKind**.
    - <<< @/snippets/ertp/guide/test-amount-math.js#makeEmptyFromAmount

