# Amount Math

![AmountMath methods](./assets/amount-math.svg) 

Depositing and withdrawing assets from a
`purse` and manipulating `payment` amounts 
all require adding and subtracting digital assets. ERTP
uses `amountMath` methods for all these operations. 

`amountMath` methods also check their arguments' `brand`, 
throwing an error if the wrong `brand` was used.

An `amountMath` is one of three different kinds, each of which
implements the same methods. Which kind is used for a particular `brand` depends
on what was specified when the `brand` and its `issuer` were 
created. The kinds are: 
- `MathKind.NAT` (`nat`): Used with fungible assets. `amount` `values` are natural numbers (non-negative integers).
- `MathKind.STRING_SET` (`strSet`): Used with non-fungible assets. `amount` `values` are strings.
- `MathKind.SET` (`set`): Used with non-fungible assets. `amount` `values` are objects or records with multiple properties.

`makeIssuerKit(allegedName, amountMathKind)` creates a new `issuer`,
`mint`, `brand`, and `amountMath`. 
The second, optional, argument specifies which kind
of `amountMath` is used for the `brand` in a one-to-one
association with the new `issuer`. It defaults to `MathKind.NAT`. 

For example: 
```js
makeIssuerKit('Quatloos'); // Defaults to MathKind.NAT
makeIssuerKit('Quatloos', MathKind.STRING_SET);
makeIssuerKit('Quatloos', MathKind.SET);
```
On the other hand, if you are not writing a Zoe contract and need to
use `amountMath`, you probably want to
make and use a local `amountMath` whose methods will work synchronously. 

`makeLocalAmountMath(issuer)` returns a promise for a local `AmountMath` 
that works on the same `brand` as the one associated with the `issuer` argument.
```js
const quatloosLocalAmountMath = await makeLocalAmountMath(quatloosIssuer);
````
## AmountMath Methods
The following is a brief description and example of each `amountMath` method. For
more detail, click the method's name to go to its entry in the [ERTP
API Reference](./api/#ertp-api).

- **Information Getting Methods**
  - [`amountMath.getBrand()`](../api/amount-math.md#amountmath-getbrand)
    - For this `amountMath`, return the `brand` it can operate on..
    - ```js
      const { issuer: quatloosIssuer, amountMath: quatloosAmountMath } = makeIssuerKit('Quatloos');
      const quatloosBrand = quatloosAmountMath.getBrand();
      ```
  - [`amountMath.getValue(amount)`](../api/amount-math.md#amountmath-getvalue-amount)
    - Returns the `value` of the `amount` argument. 
    - ```js 
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos'); 
      const quatloos123 = amountMath.make(123); 
      // returns 123 
      const value = quatloosAmountMath.getValue(quatloos123); 
      ```
  - [`amountMath.getAmountMathKind()`](../api/amount-math.md#amountmath-getamountmathkind)
    - Returns a string of either `'nat'`, `'str'`, or `'strSet'`,
       indicating the kind of values this
       `amountMath` operates on.
    - ```js
       // amountMath kind defaults to `nat`
       const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
       const kind = quatloosAmountMath.getAmountMathKind(); // returns 'nat'
       ```
  - [`amountMath.getEmpty()`](../api/amount-math.md#amountmath-getempty)
    - Returns an `amount` representing an empty `amount` (which is the identity
       element for the `amountMath` `add()` and `subtract()`
       operations. Note that this value varies depending on the
       `brand` and its `amountMath` kind (`MathKind.NAT`, `MathKind.STR`, or
       `MathKind.STRING_SET`).
    - ```js
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
      // Returns an empty amount for this issuer.
      // Since this is a fungible amount it returns 0
      const empty = quatloosAmountMath.getEmpty();
      ```
- **Comparison Methods**
  - [`amountMath.isEmpty(amount)`](../api/amount-math.md#amountmath-isempty-amount)
    - Returns `true` if its `amount` argument is empty, otherwise `false`.
    - ```js
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
      const empty = quatloosAmountMath.getEmpty();
      const quatloos1 = quatloosAmountMath.make(1);
      // returns true
      quatloosAmountMath.isEmpty(empty)
      // returns false
      quatloosAmountMath.isEmpty(quatloos1)
      ```
  - [`amountMath.isGTE(leftAmount, rightAmount)`](../api/amount-math.md#amountmath-isgte-leftamount-rightamount)
    - Returns `true` if the `leftAmount` argument is greater than or equal
       to the `rightAmount` argument, otherwise `false`.
    - ```js
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
      const empty = quatloosAmountMath.getEmpty();
      const quatloos1 = quatloosAmountMath.make(1);
      // Returns true
      quatloosAmountMath.isGTE(fungible1, empty);
      // Returns false
      quatloosAmountMath.isGTE(empty, quatloos1);
      ```
  - [`amountMath.isEqual(leftAmount, rightAmount)`](../api/amount-math.md#amountmath-isequal-leftamount-rightamount)
    - Returns `true` if the `leftAmount` argument equals the
	`rightAmount` argument
    - ```js
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
      const empty = quatloosAmountMath.getEmpty();
      const quatloos1 = quatloosAmountMath.make(1);
      const anotherQuatloos1 = quatloosAmountMath.make(1);

      // Returns true
      quatloosAmountMath.isEqual(fungible1, anotherQuatloos1);
      // Returns false
      quatloosAmountMath.isEqual(empty, quatloos1);
      ```
  - [`amountMath.coerce(allegedAmount)`](../api/amount-math.md#amountmath-coerce-allegedamount)
    - Takes an `amount` and returns it if it's a valid `amount`.
      If invalid, it throws an error.
    - ```js
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');  
      const quatloos50 = quatloosAmountMath.make(50);
      quatloosAmountMath.coerce(quatloos50); //equal to quatloos50
      ```
- **Manipulator Methods**

  - [`amountMath.add(leftAmount, rightAmount)`](../api/amount-math.md#amountmath-add-leftamount-rightamount)
    - Returns an `amount` that is the union of the `leftAmount` and `rightAmount`
       `amount` arguments. For a fungible `amount`, this means add their
       values.  For a non-fungible `amount`, it usually means
       including all elements from both `leftAmount` and `rightAmount`.
    - ```js
      const { amountMath: myItemsAmountMath } = makeIssuerKit('myItems', 'strSet');
      const listAmountA = myItemsAmountMath.make(harden['1','2','4']);
      const listAmountB = myItemsAmountMath.make(harden['3']);

      // Returns an amount containing all of ['1', '2', '4', '3']
      const combinedList = myItemsAmountMath.add(listAmountA, listAmountB);
      ```
  - [`amountMath.subtract(leftAmount, rightAmount)`](../api/amount-math.md#amountmath-subtract-leftamount-rightamount)
    - Returns a new `amount` that is the `leftAmount` argument minus
      the `rightAmount` argument  (i.e. for strings or objects
      everything in `leftAmount` not in `rightAmount`). If `leftAmount`
      doesn't include the contents of `rightAmount`, it throws an error. 
    - ```js
      const { amountMath: myItemsAmountMath } = makeIssuerKit('myItems', 'strSet');
      const listAmountA = myItemsAmountMath.make(harden['1','2','4']);
      const listAmountB = myItemsAmountMath.make(harden['3']);
      const listAmountC = myItemsAmountMath.make(harden['2']);
      // Returns ['1', '4']
      const subtractedList = myItemsAmountMath.subtract(listAmountA, listAmountC)
      // Throws error
      const badList = myItemsAmountMath.subtract(listAmountA, listAmountB)
      ```
- **Amount Creation Methods**
  - [`amountMath.make(allegedValue)`](../api/amount-math.md#amountmath-make-allegedvalue)	
    - Takes a `value` argument and returns an `amount` by making a record
      with the `value` and the `brand` associated with the `amountMath`.
    - ```js
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
      /// An `amount` with `value` = 837 and `brand` = Quatloos
      const quatloos837 = quatloosAmountMath.make(837);
      ```
  - [`amountMath.getEmpty()`](../api/amount-math.md#amountmath-getempty)
    - Returns an `amount` representing an empty `amount` (which is the identity
       element for the `amountMath` `add()` and `subtract()`
       operations. Note that this value varies depending on `amountMath`'s associated
       `brand` and whether `amountMath` is of kind `MathKind.NAT`, `MathKind.STR`, or `MathKind.STRING_SET`.
    - ```js
      const { amountMath: quatloosAmountMath } = makeIssuerKit('quatloos');
      // Returns an empty amount for this issuer.
      // Since this is a fungible amount it returns 0
      const empty = quatloosAmountMath.getEmpty();
      ```  
 
## Methods on other objects

These methods either use or return `amountMath` objects:
- [`makeIssuerKit(allegedName, amountMathKind)`](../api/issuer.md#makeissuerkit-allegedname-amountmathkind)
  - Creates a new `amountMath` that uses the `amountMath` kind
    designated by the `amountMathKind` argument (`MathKind.NAT`, `MathKind.STR`,
    `MathKind.STRING_SET`). Also creates a new `mint`, `issuer`, and `brand`.
  - ```js
    const (issuer, mint, brand, amountMath) = makeIssuerKit(quatloos);
    ```
- [`issuer.getAmountMathKind()`](../api/issuer.md#issuer-getamountmathkind)
  - Returns the kind of `amountMath` (`MathKind.NAT`, `MathKind.STR`, or `MathKind.STRING_SET`).
  - ```js
    const myAmountMathKind = quatloosIssuer.getAmountMathKind();
    ```
- [`zcf.getAmountMath(brand)`](../../zoe/api/zoe-contract-facet.html#zcf-getamountmath-brand)
  - Returns the `amountMath` object associated with the `brand` argument.
  - ```js
    const quatloosAmountMath = zcf.getAmountMath(quatloosBrand);
    ```
