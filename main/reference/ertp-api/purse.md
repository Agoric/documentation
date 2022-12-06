# Purse Object

**Purses** hold digital assets. They are created to hold assets of a single **[Brand](./brand.md)**,
and the **Brand** that the **Purse** holds cannot be changed. For example, if you were to create a **Purse** that holds *Quatloos*, that **Purse** wouldn't ever be able to hold *Moola*, theater
tickets, or any other non-*Quatloo* asset type.

Digital assets in **Purses** can be any of:
- Currency-like, such as our imaginary *Quatloos* currency.
- Goods-like digital assets, such as theater tickets or magic weapons used in a game.
- Other kinds of rights, such as the right to participate in a particular contract.

While each **Purse** can only hold assets of one **Brand**, any number of **Purses** can be
created that hold that **Brand**. So you could have, say, three *Quatloos* **Purses**, your
friend Alice could have eight *Quatloos* **Purses**, and so on. 

You change a **Purse**'s balance by calling either **[Purse.deposit()](#Purse-deposit-payment-optamount)** or **[Purse.withdraw()](#Purse-withdraw-amount)** on it. A **Purse** can be empty, which if it holds 
a fungible currency means it has a value of 0. If it holds a non-fungible asset (e.g., theater tickets),
then the **Purse** simply doesn't contain any assets if it's empty.

Unlike **[Payments](./payment.md)**, **Purses** are not meant to be sent to others. 
To transfer digital assets, you should withdraw a **Payment** from a **Purse** and
send the **Payment** to another party.

## issuer.makeEmptyPurse()
- Returns: **Purse**

While not a method called on a **Purse**, clearly it's important to know how
to create a new **Purse**. Call **makeEmptyPurse()** on the **issuer** associated
with the **brand** of assets you want the new **Purse** to hold. It returns the
new **Purse** with an empty balance. 
```js
const {issuer: quatloosIssuer} = makeIssuerKit('quatloos');
quatloosPurse1 = quatloosIssuer.makeEmptyPurse();
quatloosPurse2 = quatloosIssuer.makeEmptyPurse();
```

## Purse.getCurrentAmount()
- Returns: **Amount**

Returns the **Purse**'s current balance as an **Amount**.
The returned **Amount** **value** might be empty, and might be different the next time you
call **Purse.getCurrentAmount()** on the same **Purse** if assets have been deposited or
withdrawn in the interim.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
// quatloos5 is a payment with balance of 5 quatloos
const quatloosPurse.deposit(quatloos5);
// Returns an amount with value = 5 and brand = quatloos
const currentBalance = quatloosPurse.getCurrentAmount();
```

## Purse.getCurrentAmountNotifier()
- Returns: **Notifier&lt;Amount>**

Returns a lossy notifier for changes to this **Purse**'s balance. For more details,
see [Notifiers](/guides/js-programming/notifiers.md).

```js
const notifier = Purse.getCurrentAmountNotifier();
let nextUpdate = notifier.getUpdateSince();

const checkNotifier = async () => {
  const { value: balance, updateCount } = await nextUpdate;
  nextUpdate = notifier.getUpdateSince(updateCount);
};
```

## Purse.deposit(payment, optAmount?)
- **payment** **[payment](./payment.md)**
- **optAmount** **Amount** - Optional. 
- Returns: **Amount**

Deposit all the contents of **payment** into **Purse**, returning an **amount** describing the
**payment**'s digital assets (i.e. the deposited amount). If the optional argument *optAmount* does not equal the balance of
**payment**, or if **payment** is a promise, it throws an error.

While the above applies to local and remote **Purses**, for remote **Purses** there may be effects on 
this operation due to the use of promises and asynchronicity. You 
have to have a non-promise **payment** before calling **Purse.deposit()**. 
When you call **Purse.deposit()** you get a response back (after waiting for the round trip) 
telling you if it succeeded. All later arriving calls see the value has been transferred 
into the **Purse**, and the **payment** is no longer valid.

If any withdrawals are waiting for promises to resolve, a deposit operation
may pass them by. This is safe, as even if all the assets are withdrawn, the
deposit still works on an empty **Purse**.

```js
const { issuer: quatloosIssuer, mint: quatloosMint, brand: quatloosBrand } = 
      makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
const payment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 123n));
const quatloos123 = AmountMath.make(quatloosBrand, 123n);

// Deposit a payment for 123 Quatloos into the Purse. 
const depositAmountA = quatloosPurse.deposit(payment, quatloos123);

const secondPayment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 100n));
// Throws error
const depositAmountB = quatloosPurse.deposit(secondPayment, quatloos123);

```

## Purse.getDepositFacet()
- Returns: **DepositFacet**

Creates and returns a new deposit-only facet of the **Purse** that allows arbitrary other parties to deposit **[payments](./payment.md)** into the **Purse** without the ability to check its balance or withdraw from it.
This makes it a safe way to let other people send you **payments**.

You can only deposit a **payment** into a deposit facet that's the same **brand** as the original **Purse**
takes.
 
```js
const depositOnlyFacet = Purse.getDepositFacet();

// Give depositOnlyFacet to someone else. Anyone with a deposit facet reference can tell it to receive
// a payment, thus depositing the payment assets in the Purse associated with the deposit facet.
depositOnlyFacet.receive(payment);
```
Once you have created a **depositFacet**, there is one method you can call 
on it. **depositFacet.receive(payment)**. The **depositFacet** takes the **payment** 
and adds it to the balance of the facet's associated **Purse**. The **payment** 
must be of the same **brand** as what the **Purse** holds.

Note the difference in method names for adding assets between a **Purse** and its **depositFacet**.
To add assets to a **Purse** directly, you use **Purse.deposit()**. To add assets
to a **Purse** via its **depositFacet**, you use **depositFacet.receive()**.

## depositFacet.receive(payment, optAmount?)
- **payment** **Payment**
- **optAmount** **Amount** (optional)
- Returns **Amount**

The **depositFacet** takes the **payment** and adds it to the balance of the facet's associated **Purse**. 

If the optional argument **optAmount** does not equal the balance of
**payment**, or if **payment** is an unresolved promise, it throws an error.

```js
const depositOnlyFacet = Purse.getDepositFacet();

// Give depositOnlyFacet to someone else. Anyone with a deposit facet reference can tell it to receive
// a payment, thus depositing the payment assets in the Purse associated with the deposit facet.
depositOnlyFacet.receive(payment);
```

## Purse.withdraw(amount)

- **amount** **Amount**
- Returns: **[payment](./payment.md)**

Withdraws the specified **amount** of digital assets from the **Purse** into a new **payment** object.

If the call succeeds, it immediately extracts the value into a new **payment**. 
The caller won't get the new **payment** until a later turn, since the call is (nearly always) remote.
But as soon as the message is processed, the value is gone from the **Purse**.

```js
// Create a Purse and give it a balance of 10 Quatloos
const { issuer, mint, brand } = makeIssuerKit('quatloos');
const Purse = issuer.makeEmptyPurse();
const payment = mint.mintPayment(AmountMath.make(brand, 10n));
const quatloos10 = AmountMath.make(brand, 10n);
Purse.deposit(payment, quatloos10);

// Withdraw an amount of 3 from the Purse
const quatloos3 = AmountMath.make(brand, 3n);
const withdrawalPayment = Purse.withdraw(quatloos3);

// The balance of the withdrawal payment is 3 Quatloos
issuer.getAmountOf(withdrawalPayment);

// The new balance of the Purse is 7 Quatloos
Purse.getCurrentAmount();
```

## Purse.getAllegedBrand()
- Returns: **[brand](./brand.md)**

Returns an alleged brand (Note: a **Brand**, not a **string** as **allegedName()** methods do), 
indicating what kind of digital asset the Purse purports to hold. This can identify the 
Purse's brand if the Purse was made by a trusted issuer using **issuer.makeEmptyPurse()**.

```js
const PurseBrand = quatloosPurse.getAllegedBrand();
```

## Purse.getRecoverySet()
- Returns:

return this.state.recoverySet.snapshot();

TBD

## Purse.recoverAll()
- Returns: **[Amount]**

TBD
