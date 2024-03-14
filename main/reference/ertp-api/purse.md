# Purse Object

**Purses** hold digital assets. They are created to hold assets of a single **[Brand](./brand)**,
and the **Brand** that the **Purse** holds cannot be changed. For example, if you were to create a **Purse** that holds *Quatloos*, that **Purse** wouldn't ever be able to hold *Moola*, theater
tickets, or any other non-*Quatloo* asset type.

Digital assets in **Purses** can be any of:
- Currency-like, such as our imaginary *Quatloos* currency.
- Goods-like digital assets, such as theater tickets or magic weapons used in a game.
- Other kinds of rights, such as the right to participate in a particular contract.

While each **Purse** can only hold assets of one **Brand**, any number of **Purses** can be
created that hold that **Brand**. So you could have, say, three *Quatloos* **Purses**, your
friend Alice could have eight *Quatloos* **Purses**, and so on. 

**Purses** are created by calling the **[anIssuer.makeEmptyPurse()](./issuer#anissuer-makeemptypurse)**
method on the **[Issuer](./issuer)** associated with the **Brand** of assets you want the
new **Purse** to hold.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
```

You change a **Purse**'s balance by calling either
**[aPurse.deposit()](#apurse-deposit-payment-optamount)** or 
**[aPurse.withdraw()](#apurse-withdraw-amount)** on it. A **Purse** can be empty, which if it holds 
a fungible currency means it has a value of 0. If it holds a non-fungible asset (e.g., theater tickets),
then the **Purse** simply doesn't contain any assets if it's empty.

Unlike **[Payments](./payment)**, **Purses** are not meant to be sent to others. 
To transfer digital assets, you should withdraw a **Payment** from a **Purse** and
send the **Payment** to another party.

## aPurse.getCurrentAmount()
- Returns: **[Amount](./ertp-data-types#amount)**

Returns the **Purse**'s current balance as an **Amount**.
The returned **Amount** **[AmountValue](./ertp-data-types#amountvalue)** might be empty, and might be different the next time you
call **aPurse.getCurrentAmount()** on the same **Purse** if assets have been deposited or
withdrawn in the interim.

```js
const { issuer: quatloosIssuer } = makeIssuerKit('quatloos');
const quatloosPurse = quatloosIssuer.makeEmptyPurse();
// quatloos5 is a payment with balance of 5 quatloos
const quatloosPurse.deposit(quatloos5);
// Returns an amount with value = 5 and brand = quatloos
const currentBalance = quatloosPurse.getCurrentAmount();
```

## aPurse.getCurrentAmountNotifier()
- Returns: **Notifier&lt;[Amount](./ertp-data-types#amount)>**

Returns a lossy notifier for changes to this **Purse**'s balance. For more details,
see [Notifiers](/guides/js-programming/notifiers).

```js
const notifier = purse.getCurrentAmountNotifier();
let nextUpdate = notifier.getUpdateSince();

const checkNotifier = async () => {
  const { value: balance, updateCount } = await nextUpdate;
  nextUpdate = notifier.getUpdateSince(updateCount);
};
```

## aPurse.deposit(payment, optAmount?)
- **payment**: **[Payment](./payment)**
- **optAmount**: **[Amount](./ertp-data-types#amount)** - Optional. 
- Returns: **Amount**

Deposit all the contents of *payment* into the **Purse**, returning an **Amount** describing the
**Payment**'s digital assets (i.e. the deposited amount). If the optional argument *optAmount* does not equal the balance of
*payment*, or if *payment* is a promise, this method throws an error.

While the above applies to local and remote **Purses**, for remote **Purses** there may be effects on 
this operation due to the use of promises and asynchronicity. You 
have to have a non-promise **Payment** before calling **aPurse.deposit()**. 
When you call **aPurse.deposit()** you get a response back (after waiting for the round trip) 
telling you if it succeeded. All later arriving calls see the value has been transferred 
into the **Purse**, and the **Payment** is no longer valid.

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

## aPurse.withdraw(amount)

- **amount**: **[Amount](./ertp-data-types#amount)**
- Returns: **[Payment](./payment)**

Withdraws the specified **Amount** of digital assets from the **Purse** into a new **Payment** object.

If the call succeeds, it immediately extracts the value into a new **Payment**. 
The caller won't get the new **Payment** until a later turn, since the call is (nearly always) remote.
But as soon as the message is processed, the value is gone from the **Purse**.

```js
// Create a Purse and give it a balance of 10 Quatloos
const { issuer, mint, brand } = makeIssuerKit('quatloos');
const purse = issuer.makeEmptyPurse();
const payment = mint.mintPayment(AmountMath.make(brand, 10n));
const quatloos10 = AmountMath.make(brand, 10n);
purse.deposit(payment, quatloos10);

// Withdraw an amount of 3 from the Purse
const quatloos3 = AmountMath.make(brand, 3n);
const withdrawalPayment = purse.withdraw(quatloos3);

// The balance of the withdrawal payment is 3 Quatloos
issuer.getAmountOf(withdrawalPayment);

// The new balance of the Purse is 7 Quatloos
purse.getCurrentAmount();
```

## aPurse.getAllegedBrand()
- Returns: **[Brand](./brand)**

Returns an alleged brand (Note: a **Brand**, not a **String** as **allegedName()** methods do), 
indicating what kind of digital asset the **Purse** purports to hold. This can identify the 
**Purse**'s **Brand** if the **Purse** was made by a trusted **[Issuer](./issuer)** using **[anIssuer.makeEmptyPurse()](./issuer#anissuer-makeemptypurse)**.

```js
const purseBrand = quatloosPurse.getAllegedBrand();
```

## aPurse.getDepositFacet()
- Returns: **DepositFacet**

Creates and returns a **DepositFacet**, a new deposit-only facet of the **Purse** that allows 
other parties to deposit **[Payments](./payment)** into the **Purse** without the ability
to check the **Purse's** balance or withdraw from it.
This makes it a safe way to let other people send you **Payments**.

You can only deposit a **Payment** into a **DepositFacet** that's the same **[Brand](./brand)** as the original **Purse**.
 
```js
const depositOnlyFacet = purse.getDepositFacet();

// Give depositOnlyFacet to someone else. Anyone with a deposit facet reference can tell it to receive
// a payment, thus depositing the payment assets in the Purse associated with the deposit facet.
depositOnlyFacet.receive(payment);
```

Once you have created a **DepositFacet**, there is one method you can call 
on it, **[aDepositFacet.receive()](#adepositfacet-receive-payment-optamount)**. The **DepositFacet** takes a **Payment** 
and adds it to the balance of the **DepositFacet**'s associated **Purse**. The **Payment** 
must be of the same **Brand** as what the **Purse** holds.

Note the difference in method names for adding assets between a **Purse** and its **DepositFacet**.
To add assets to a **Purse** directly, you use **aPurse.deposit()**. To add assets
to a **Purse** via its **DepositFacet**, you use **aDepositFacet.receive()**.

## aDepositFacet.receive(payment, optAmount?)
- **payment**: **[Payment](./payment)**
- **optAmount**: **[Amount](./ertp-data-types#amount)** - Optional.
- Returns **Amount**

The **DepositFacet** takes the **Payment** and adds it to the balance of the **DepositFacet**'s associated **Purse**. 

If the optional argument *optAmount* does not equal the balance of
*payment*, or if *payment* is an unresolved promise, this method throws an error.

```js
const depositOnlyFacet = purse.getDepositFacet();

// Give depositOnlyFacet to someone else. Anyone with a deposit facet reference can tell it to receive
// a payment, thus depositing the payment assets in the Purse associated with the deposit facet.
depositOnlyFacet.receive(payment);
```
