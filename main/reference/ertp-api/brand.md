# brand Object
A **brand** identifies the asset type of the **[issuer](./issuer.md)** and **[mint](./mint.md)** associated with the **brand**. A given **brand** has a one-to-one relationship
with an **issuer** and a **mint**, and a zero-to-many relationship with **[purses](./purse.md)** and **[payments](./payment.md)**.

For example, if you were to create a **brand** that uses *Quatloos*:
- There would be exactly one *Quatloos* **issuer**.
- There would be exactly one *Quatloos* **mint**.
- There could be any number of **purses** that could hold *Quatloos*.
- There could be any number of **payments** that could hold *Quatloos*.

Recipients of a 
purported **amount** cannot use the **brand** by itself to verify its authenticity,
since the **brand** can be reused by a misbehaving **issuer**.

All of these relationships are unchangeable. For example, if a **mint** is created that makes new *Quatloos*, it
can never create non-*Quatloo* assets. Similarly, the *Quatloos* **brand** will always be associated with  
the  *Quatloos* **mint** and *Quatloos* **issuer**.

## brand.isMyIssuer(issuer)
- **issuer** **[issuer](./issuer.md)**
- Returns: **Boolean**

Returns **true** if **issuer** is the **brand**'s **issuer**. Returns **false** if it's not.

Note that a **brand** from an untrusted source can misrepresent its association with
an **issuer**. The claim should be cross-checked using the **issuer's**
[**issuer.getBrand()**](./issuer.md#issuer-getbrand) method for mutual agreement.

```js
const isIssuer = brand.isMyIssuer(issuer);
```

## brand.getAllegedName()
- Returns: **String**

Returns the alleged name of the **brand**.

An alleged name is a human-readable string name of a type of digital asset.
It should not be trusted as accurate since there is no public registry or 
expectation of uniqueness. This means there can be multiple **[issuers](./issuer.md)**, **[mints](./mint.md)**, or **brands** 
with the same alleged name, and thus the name by itself does not uniquely 
identify an **issuer**. Rather, the **brand** object does that.

To put it another way, nothing stops different people from creating multiple 
**issuers** with the alleged name *Quatloos*...but that doesn't make any of them the 
*Quatloos* **issuer**. The alleged name is just a human readable string which is 
helpful for debugging.
```js
const name = brand.getAllegedName();
```

## brand.getDisplayInfo()
- Returns: **[DisplayInfo](./displayinfo.md)**

Returns the **DisplayInfo** associated with the **brand**. 

You use a **DisplayInfo** record at the dapp and UI levels to correctly 
display amounts. For fungible tokens, use the **decimalPlaces** property
to display their value in the commonly used denomination, rather than 
the smallest denomination used for financial accounting (e.g.,
displaying in dollars rather than cents).

```js
const quatloosDisplay = quatloosBrand.getDisplayInfo;
```

## Related Methods

The following methods on other ERTP components are also related to the **brand** object.
- [**issuer.getBrand()**](./issuer.md#issuer-getbrand): Returns
the **brand** for the **issuer**.  
- [**payment.getAllegedBrand()**](./payment.md#payment-getallegedbrand): Returns
the **payment**'s alleged **brand**.
