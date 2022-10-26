# Purse Class

`Purses` hold digital assets. They are created to hold assets of a single `brand`,
and their `brand` cannot be changed. For example, you might create a `purse` to
hold Quatloos. That `purse` can only hold Quatloos; it can't hold Moola or theater
tickets or anything else. And you can't change that `purse` so that it now holds
Moola instead. You would need to create a `purse` that holds only Moola.

Digital assets in `purses` can be any of:
- Currency-like, such as our imaginary Quatloos currency.
- Goods-like digital assets, such as magic weapons for use in a game or theater tickets.
- Other kinds of rights, such as the right to participate in a particular contract.

While each `purse` can only hold assets of one `brand`, any number of `purses` can be
created that hold that `brand`. So you could have, say, three Quatloos `purses`, your
friend Alice could have eight Quatloos `purses`, and so on. 

You change a `purse`'s balance by calling either `deposit()` (to add assets)
or `withdraw()` (to remove assets) on it. A `purse` can be empty, which if it holds 
a fungible currency means it has a value of 0. If it holds non-fungible theater tickets,
it means it just doesn't have any tickets.

Unlike `payments`, `purses` are not meant to be sent to others. 
To transfer digital assets, you should withdraw a `payment` from a `purse` and
send the `payment` to another party.

## `issuer.makeEmptyPurse()`
- Returns: `{Purse}`

While not a method called on a `purse`, clearly it's important to know how
to create a new `purse`. Call `makeEmptyPurse()` on the `issuer` associated
with the `brand` of assets you want the new `purse` to hold. It returns the
new `purse` with an empty balance. 
```js
const {issuer: quatloosIssuer} = makeIssuerKit('quatloos');
quatloosPurse1 = quatloosIssuer.makeEmptyPurse();
quatloosPurse2 = quatloosIssuer.makeEmptyPurse();
```

## `purse.getCurrentAmount()`

Gets the `purse`'s current balance.

```
purse.getCurrentAmount()
```

### Parameters

None.

### Returns

Amount object

Amount objects contain two members:

Describe the `purse`'s current balance as an Amount.
The returned Amount `value` might be empty, and might be different the next time you
call `getCurrentAmount()` on the same `purse` if assets have been deposited or
withdrawn in the interim.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
// quatloos5 is a payment with balance of 5 quatloos
const quatloosPurse.deposit(quatloos5);
// Returns an amount with value = 5 and brand = quatloos
const currentBalance = quatloosPurse.getCurrentAmount();
```

## `purse.getCurrentAmountNotifier()`
- Returns: `{Notifier<Amount>}`

Returns a lossy notifier for changes to this purse's balance. For more details,
see [Notifiers](/conceptual/js-programming/notifiers.md).

```js
const notifier = purse.getCurrentAmountNotifier();
let nextUpdate = notifier.getUpdateSince();

const checkNotifier = async () => {
  const { value: balance, updateCount } = await nextUpdate;
  nextUpdate = notifier.getUpdateSince(updateCount);
};
```

## `purse.deposit(payment, optAmount)`
- `payment` `{Payment}`
- `optAmount` `{Amount}` - Optional. 
- Returns: `{Amount}`

Deposit all the contents of `payment` into `purse`, returning an `amount` describing the
`payment`'s digital assets (i.e. the deposited amount). If the optional argument `optAmount` does not equal the balance of
`payment`, or if `payment` is a promise, it throws an error.

While the above applies to local and remote `purses`, for remote `purses` there may be effects on 
this operation due to use of `promises` and asynchronicity. You 
have to have a non-promise `payment` before calling `deposit()`. 
When you call `deposit()` you get a response back (after waiting only for the round trip) 
telling you if it succeeded. All later arriving calls see the value has been transferred 
into the `purse`, and the `payment` is are no longer valid.

If any withdrawals are waiting for `promises` to resolve, a deposit operation
may pass them by. This is safe, as even if all the assets are withdrawn, the
deposit still works on an empty `purse`.

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand } = 
      makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
const payment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 123n));
const quatloos123 = AmountMath.make(quatloosBrand, 123n);

// Deposit a payment for 123 Quatloos into the purse. 
const depositAmountA = quatloosPurse.deposit(payment, quatloos123);

const secondPayment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 100n));
// Throws error
const depositAmountB = quatloosPurse.deposit(secondPayment, quatloos123);

```

## `purse.getDepositFacet()`
- Returns: `{DepositFacet}`

Create and return a new deposit-only facet of the `purse` that allows arbitrary other parties to deposit `payments` into `purse` without the ability to check its balance or withdraw from it.
This makes it a safe way to let other people send you `payments`.

You can only deposit a `payment` into a deposit facet that's the same `brand` as the original `purse`
takes.
 
```js
const depositOnlyFacet = purse.getDepositFacet();

// Give depositOnlyFacet to someone else. Anyone with a deposit facet reference can tell it to receive
// a payment, thus depositing the payment assets in the purse associated with the deposit facet.
depositOnlyFacet.receive(payment);
```
Once you have created a `depositFacet`, there is one method you can call 
on it. `depositFacet.receive(payment)`. The `depositFacet` takes the `payment` 
and adds it to the balance of the facet's associated `purse`. The `payment` 
must be of the same `brand` as what the `purse` holds.

Note the difference in method names for adding assets between a `purse` and its `depositFacet`.
To add assets to a `purse` directly, you use `purse.deposit()`. To add assets
to a `purse` via its `depositFacet`, you use `depositFacet.receive()`.

## `depositFacet.receive(payment, optAmount?)`
- `payment` `{Payment}`
- `optAmount` `{Amount}` (optional)
- Returns `{Amount}`

The `depositFacet` takes the `payment` and adds it to the balance of the facet's associated `purse`. 

If the optional argument `optAmount` does not equal the balance of
`payment`, or if `payment` is an unresolved promise, it throws an error.

```js
const depositOnlyFacet = purse.getDepositFacet();

// Give depositOnlyFacet to someone else. Anyone with a deposit facet reference can tell it to receive
// a payment, thus depositing the payment assets in the purse associated with the deposit facet.
depositOnlyFacet.receive(payment);
```

## `purse.withdraw(amount)`


- `amount` `{Amount}`
- Returns: `{Payment}`

Withdraws the specified `amount` of digital assets from the `purse` into a new `payment` object.

If the call succeeds, it immediately extracts the value into a new `payment`. 
The caller won't get the new `payment` until a later turn, since the call is (nearly always) remote.
But as soon as the message is processed, the value is gone from the `purse`.

```js
// Create a purse and give it a balance of 10 Quatloos
const { issuer, mint, brand } = makeIssuerKit('quatloos');
const purse = issuer.makeEmptyPurse();
const payment = mint.mintPayment(AmountMath.make(brand, 10n));
const quatloos10 = AmountMath.make(brand, 10n);
purse.deposit(payment, quatloos10);

// Withdraw an amount of 3 from the purse
const quatloos3 = AmountMath.make(brand, 3n);
const withdrawalPayment = purse.withdraw(quatloos3);

// The balance of the withdrawal payment is 3 Quatloos
issuer.getAmountOf(withdrawalPayment);

// The new balance of the purse is 7 Quatloos
purse.getCurrentAmount();
```

## `purse.getAllegedBrand()`
- Returns: `{Brand}`

Returns an alleged brand (Note: a `Brand`, not a `string` as `allegedName()` methods do), 
indicating what kind of digital asset the purse purports to hold. This can identify the 
purse's brand if the purse was made by a trusted issuer using `issuer.makeEmptyPurse()`.

```js
const purseBrand = quatloosPurse.getAllegedBrand();
```
