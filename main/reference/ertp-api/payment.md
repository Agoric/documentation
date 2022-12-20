# Payment Object
A **Payment** holds digital assets that are in transit or 
expected to soon be in transit. It can be deposited in **[Purses](./purse.md)**, 
split into or combined with multiple **Payments**, or claimed (i.e., getting
an exclusive **Payment** and revoking access from anyone else). 

Digital assets in **Payments** can be any of:
- Currency-like, such as our imaginary *Quatloos* currency.
- Goods-like digital assets, such as theater tickets or magic weapons used in a game.
- Other kinds of rights, such as the right to participate in a particular contract.

A **Payment** is linear, meaning either a **Payment** has its full
original balance, or it is used up entirely. You cannot partially use a
**Payment**. In other words, if a **Payment** is 10 *Quatloos*, you can't
take out, say, only 3 *Quatloos* from it.

However, you can split a **Payment** into multiple **Payments**. For example, you could split a 
10 *Quatloos* **Payment** into two new **Payments** of 3 *Quatloos* and 7 *Quatloos* by calling the
**[Issuer.split()](./issuer.md#issuer-split-payment-paymentamounta)** method which consumes the 
original 10 *Quatloos* **Payment** and creates two new smaller **Payments.

**Payments** are often received from other actors. Since they are not self-verifying,
you cannot trust **Payments**. To get the verified balance of a **Payment**, call the **[Issuer.getAmountOf()](./issuer.md#issuer-getamountof-payment)** method.

To convert a **Payment** into a new **Purse**: 
1. Get the **Payment**'s trusted **[Issuer](./issuer.md)**. 
2. Use the **Issuer** to create an empty **Purse**.
3. Deposit the **Payment** into the new **Purse**. 

**[Purse.deposit()](./purse.md#purse-deposit-payment-optamount)** consumes the **Payment**,
making it unavailable for later use.

## Payment.getAllegedBrand()
- Returns: **[Brand](./brand.md)**

Returns the **Brand** indicating the kind of digital asset this **Payment** purports to be. 
Because **Payments** are not trusted, any method calls on them
should be treated with suspicion and verified elsewhere.
Any successful operation by an **Issuer** on a **Payment** verifies it.

```js
const payment = quatloosMint.mintPayment(AmountMath.make(quatloosBrand, 10n));
//Should return 'quatloos'
const allegedBrand = payment.getAllegedBrand();
```

## Related Methods

The following methods on other ERTP components either operate
on or return a **Payment**.

- [**Issuer.burn()**](./issuer.md#issuer-burn-payment-optamount)
  - Destroys all of the digital assets in the **Payment**.
- [**Issuer.claim()**](./issuer.md#issuer-claim-payment-optamount)
  - Transfers all digital assets from *payment* to a new **Payment**.
- [**Issuer.combine()**](./issuer.md#issuer-combine-paymentsarray-opttotalamount)
  - Combines multiple **Payments** into one new **Payment**.
- [**issuer.getAmountOf()**](./issuer.md#issuer-getamountof-payment)
  - Describes the **Payment**'s balance as an **Amount**.
- [**issuer.isLive()**](./issuer.md#issuer-islive-payment)
  - Returns **true** if the **Payment** was created by the **Issuer** and is available for use (i.e., has not been consumed or burned).
- [**Issuer.split()**](./issuer.md#issuer-split-payment-paymentamounta)
  - Splits a single **Payment** into two new **Payments**.
- [**Issuer.splitMany()**](./issuer.md#issuer-splitmany-payment-amountarray)
  - Split a single **Payment** into multiple **Payments**.
- [**Mint.mintPayment()**](./mint.md#mint-mintpayment-newamount)
  - Create new digital assets of the **Mint**'s associated **Brand**.
- [**Purse.deposit()**](./purse.md#purse-deposit-payment-optamount)
  - Deposits all the contents of *payment* into the **Purse**.
- [**Purse.getDepositFacet()**](./purse.md#purse-getdepositfacet)
  - Creates and returns a new deposit-only facet of the **Purse** that allows arbitrary other parties to deposit **Payments** into the **Purse**.
- [**Purse.withdraw()**](./purse.md#purse-withdraw-amount)
  - Withdraws the *amount* of specified digital assets from **Purse** into a new **Payment**.
