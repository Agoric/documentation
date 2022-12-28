# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract,
and usually is referred to in code as **zcf**.

The contract instance is launched by **E(zoe).startInstance()**, and is given access to
the **zcf** object during that launch (see [Contract Requirements](/guides/zoe/contract-requirements.md)).
In the operations below, **instance** is the handle for the running contract instance.

## zcf.makeZCFMint(keyword, assetKind?, displayInfo?)
- **keyword** **String**
- **assetKind** **AssetKind** Optional, defaults to **AssetKind.NAT**.
- **displayInfo** **DisplayInfo** Optional.
- Returns: **Promise&lt;ZCFMint>**

Creates a synchronous Zoe mint, allowing users to mint and reallocate digital assets synchronously
instead of relying on an asynchronous ERTP **mint**. The optional **displayInfo** parameter takes values
like ** decimalPlaces: 16 ** that tell the UI how to display values associated with the created mint's 
brand. It defaults to undefined.

**Important**: **ZCFMints** do **not** have the same methods as an ERTP **mint**. Do not try to use
ERTP methods on a **ZCFMint** or vice versa.

**Important**: On the other hand, the **issuer** and **brand** associated with a **zcfMint**
do have the same methods as their ERTP-derived counterparts. Assets created by a **zcfMint** are treated
the same as ERTP **mint**-created assets by ERTP methods.

The following demonstrates **zcf.makeZCFMint**:

**Note**: The call to make the **ZCFMint** is asynchronous, but
calls to the resulting **ZCFMint** are synchronous.
```js
const mySynchronousMint = await zcf.makeZCFMint('MyToken', AssetKind.SET);
const { brand, issuer } = mySynchronousMint.getIssuerRecord();
mySynchronousMint.mintGains({ MyKeyword: amount }, seat);
```
**ZCFMints** have three methods, two of which use an **AmountKeywordRecord**
- **getIssuerRecord()**
- **mintGains(gains, zcfSeat)**
- **burnLosses(losses, zcfSeat)**

### AmountKeywordRecord

**AmountKeywordRecord** is a record in which the keys are keywords, and
the values are **amounts**. Keywords are unique identifiers per contract,
that tie together the **proposal**, **payments** to be escrowed, and **payouts**
to the user. In the below example, **Asset** and **Price** are keywords.

Users should submit their **payments** using keywords:
```js
const payments = { Asset: quatloosPayment };
```

And, users will receive their **payouts** with keywords as the keys of a **payout**:
```js
quatloosPurse.deposit(payout.Asset);
```

For example:
```js
const quatloos5 = AmountMath.make(quatloosBrand, 5n);
const quatloos9 = AmountMath.make(quatloosBrand, 9n);
const myAmountKeywordRecord =
{
  Asset: quatloos5,
  Price: quatloos9
}
```

### ZCFMint.getIssuerRecord()
  - Returns: **IssuerRecord**

Returns an **issuerRecord** containing the **issuer** and **brand** associated with the **zcfMint**.

### ZCFMint.mintGains(gains, zcfSeat?)
  - **gains** **AmountKeywordRecord**
  - **zcfSeat** **ZCFSeat** - Optional.
  - Returns: **ZCFSeat**

All **amounts** in **gains** must be of this **ZCFMint**'s **brand**.
The **gains**' keywords are in that **seat**'s namespace.
Mint the **gains** **amount** of assets and add them to
that **seat**'s **allocation**. If a **seat** is provided,
it is returned. Otherwise a new **seat** is returned.
  - **zcfMint.mintGains({ Token: amount }, seat);**

### ZCFMint.burnLosses(losses, zcfSeat)
  - **losses** **AmountKeywordRecord**
  - **zcfSeat** **ZCFSeat**
  - Returns: void

All **amounts** in **losses** must be of this **ZCFMint**'s **brand**.
The **losses**' keywords are in that **seat**'s namespace.
Subtract **losses** from that **seat**'s **allocation**, then
burn that **amount** of assets from the pooled **purse**.
  - **zcfMint.burnLosses({ Token: amount }, seat);**getIssuerRecord()**

## zcf.getInvitationIssuer()
- Returns: [**Issuer**](../ertp-api/issuer.md)

Zoe has a single **invitationIssuer** for the entirety of its
lifetime. This method returns the Zoe **InvitationIssuer**, which
validates user-received **invitations** to participate
in contract instances. 

"All **invitations** come from this single **invitation** **issuer** and its **mint**, which 
mint **invitations** and validate their **amounts**."

```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

## zcf.saveIssuer(issuer, keyword)
- **issuer** **Issuer**
- **keyword** **String**
- Returns: **Promise&lt;IssuerRecord>**

Informs Zoe about an **issuer** and returns a promise for acknowledging
when the **issuer** is added and ready. The **keyword** is the one associated
with the new **issuer**. It returns a promise for **issuerRecord** of the new **issuer**

This saves an **issuer** in Zoe's records for this contract **instance**.
It also has saved the **issuer** information such that Zoe can handle offers involving
this **issuer** and ZCF can provide the **issuerRecord** synchronously on request.

An **IssuerRecord** has two fields, each of which holds the namesake object
associated with the **issuer** value of the record:
**issuerRecord.brand** and **issuerRecord.issuer**.

```js
await zcf.saveIssuer(secondaryIssuer, keyword);
```

//Has new parameter
## zcf.makeInvitation(offerHandler, description, customProperties, proposalShape?)
- **offerHandler** **ZCFSeat => Object**
- **description** **String**
- **customProperties** **Object**
- Returns: [**Promise&lt;Invitation>**](../ertp-api/payment.md)

Make a credible Zoe **invitation** for a smart contract. Note that **invitations** are a special case
of an ERTP **payment**. They are associated with the **invitationIssuer** and its **mint**, which 
validate and mint **invitations**. **zcf.makeInvitation()** serves as an interface to
the **invitation** **mint**.

The **invitation**'s
**value** specifies:
- The specific contract **instance**.
- The Zoe **installation**.
- A unique **handle**.

The second argument is a required **description** for the **invitation**,
and should include whatever information is needed for a potential recipient of the **invitation**
to know what they are getting in the optional **customProperties** argument, which is
put in the **invitation**'s **value**.

```js
const creatorInvitation = zcf.makeInvitation(makeCallOption, 'makeCallOption')
```

## zcf.makeEmptySeatKit()
- Returns: **ZCFSeat, Promise&lt;UserSeat>**

Returns an empty **ZCFSeat** and a promise for a **UserSeat**

Zoe uses **seats** to represent offers, and has two seat facets (a
particular view or API of an object;
there may be multiple such APIs per object) a **ZCFSeat** and a **UserSeat**.
```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
```

## zcf.getInstance()
- Returns: **Instance**

The contract code can request its own current instance, so it can be sent elsewhere.

## zcf.getBrandForIssuer(issuer)
- **issuer** **[Issuer](/reference/ertp-api/issuer.md)**
- Returns: **[Brand](/reference/ertp-api/brand.md)**

Returns the **Brand** associated with the *issuer*.

## zcf.getIssuerForBrand(brand)
- **brand** **[Brand](/reference/ertp-api/brand.md)**
- Returns: **[Issuer](/reference/ertp-api/issuer.md)**

Returns the **Issuer** of the *brand* argument.

## zcf.getAssetKind(brand)
- **brand** **[Brand](/reference/ertp-api/brand.md)**
- Returns: **[AssetKind](/reference/ertp-api/etrp-data-types.md#assetkind)**

Returns the **AssetKind** associated with the *brand* argument.
```js
const quatloosAssetKind = zcf.getAssetKind(quatloosBrand);
```

## zcf.stopAcceptingOffers()
- The contract requests Zoe to not accept offers for this contract instance. 
It can't be called from outside the contract unless the contract explicitly makes it accessible.

## zcf.shutdown(completion)

Shuts down the entire vat and contract instance and gives payouts.

All open **seats** associated with the current **instance** have **fail()**
called on them.

Call when:
- You want nothing more to happen in the contract, and
- You don't want to take any more offers

The **completion** argument is usually a string, but this 
is not required. It is used for the notification sent to the
contract instance's **done()** function. Any still open seats or
other outstanding promises are closed with a generic 'vat terminated' 
message.
```js
zcf.shutdown();
```

//New Method w/out signature
## zcf.shutdownWithFailure

## zcf.getTerms()
- Returns: **Object**

Returns the **issuers**, **brands**, and custom **terms** the current contract **instance** was instantiated with.

The returned values look like:
```js
{ brands, issuers, customTermA, customTermB ... }
// where brands and issuers are keywordRecords, like:

{
    brands: { A: moolaKit.brand, B: simoleanKit.brand },
    issuers: { A: moolaKit.issuer, B: simoleanKit.issuer },
    customTermA: 'something',
    customTermB: 'something else',
 };
 ```

Note that there is also an **E(zoe).getTerms(instance)**. Often the choice of which to use is not which method
to use, but which of Zoe Service or ZCF you have access to. On the contract side, you more easily have access
to **zcf**, and **zcf** already knows what instance is running. So in contract code, you use **zcf.getTerms()**. From
a user side, with access to Zoe Service, you use **E(zoe).getTerms()**.
```js
const { brands, issuers, maths, terms } = zcf.getTerms()
```

## zcf.getZoeService()
- Returns: [ZoeService](./zoe.md)

This is the only way to get the user-facing [Zoe Service API](./zoe.md) to
the contract code as well.
```js
// Making an offer to another contract instance in the contract.
const zoeService = zcf.getZoeService();
E(zoeService).offer(creatorInvitation, proposal, paymentKeywordRecord);
```

## zcf.assertUniqueKeyword(keyword)
- **keyword** **String**
- Returns: Undefined

Checks if a keyword is valid and not already used as a **brand** in this **instance** (i.e. unique)
and could be used as a new **brand** to make an **issuer**. Throws an appropriate error if it's not
a valid keyword, or is not unique.
```js
zcf.assertUniqueKeyword(keyword);
```
## zcf.reallocate(seats)
- **seats** **ZCFSeats[]** (at least two)
- Returns: **void**

**zcf.reallocate()** commits the staged allocations for each of its seat arguments,
making their staged allocations their current allocations. **zcf.reallocate()** then
transfers the assets escrowed in Zoe from one seat to another. Importantly, the assets 
stay escrowed, with only the internal Zoe accounting of each seat's allocation changed.

There must be at least two **ZCFSeats** in the array argument. Every **ZCFSeat**
with a staged allocation must be included in the argument array or an error
is thrown. If any seat in the argument array does not have a staged allocation,
an error is thrown. 

On commit, the staged allocations become the seats' current allocations and 
the staged allocations are deleted.

Note: **reallocate()** is an *atomic operation*. To enforce offer safety, 
it will never abort part way through. It will completely succeed or it will 
fail before any seats have their current allocation changed.

The reallocation only succeeds if it:
1. Conserves rights (the specified **amounts** have the same total value as the
  current total amount)
2. Is 'offer-safe' for all parties involved. 

The reallocation is partial, only applying to the **seats** in the
argument array. By induction, if rights conservation and
offer safety hold before, they hold after a safe reallocation.

This is true even though we only re-validate for **seats** whose
allocations change. A reallocation can only effect offer safety for
those **seats**, and since rights are conserved for the change, overall
rights are unchanged.

**reallocate()** throws this error:
- **reallocating must be done over two or more seats**

```js
sellerSeat.incrementBy(buyerSeat.decrementBy({ Money: providedMoney }));
buyerSeat.incrementBy(sellerSeat.decrementBy({ Items: wantedItems }));
zcf.reallocate(buyerSeat, sellerSeat);
```
