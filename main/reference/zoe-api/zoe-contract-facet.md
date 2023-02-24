# Zoe Contract Facet

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract,
and usually is referred to in code as **zcf**.

The contract instance is launched by **E(Zoe).startInstance()**, and is given access to
the **zcf** object during that launch (see [Contract Requirements](/guides/zoe/contract-requirements.md)).
In the operations below, **instance** is the handle for the running contract instance.

## zcf.makeZCFMint(keyword, assetKind?, displayInfo?)
- **keyword** **String**
- **assetKind** **[AssetKind](/reference/ertp-api/ertp-data-types.md#assetkind)** - Optional, defaults to **AssetKind.NAT**.
- **displayInfo** **[DisplayInfo](/reference/ertp-api/ertp-data-types.md#displayinfo)** - Optional, defaults to **undefined**.
- Returns: **Promise&lt;[ZCFMint](./zcfmint.md)>**

Creates a synchronous Zoe mint, allowing users to mint and reallocate digital assets synchronously
instead of relying on an asynchronous ERTP **[Mint](/reference/ertp-api/mint.md)**.
The optional *displayInfo* parameter takes values
like **decimalPlaces: 16** that tell the UI how to display values associated with the created mint's 
brand. It defaults to undefined.

**Important**: **ZCFMints** do **not** have the same methods as an ERTP **Mint**. Do not try to use
ERTP methods on a **ZCFMint** or vice versa.

**Important**: On the other hand, the **[Issuer](/reference/ertp-api/issuer.md)** and **[Brand](/reference/ertp-api/brand.md)** associated with a **zcfMint**
do have the same methods as their ERTP-derived counterparts. Assets created by a **zcfMint** are treated
the same as assets created by ERTP **Mint** methods.

The following demonstrates **zcf.makeZCFMint**:

**Note**: The call to make the **ZCFMint** is asynchronous, but
calls to the resulting **ZCFMint** are synchronous.

```js
const mySynchronousMint = await zcf.makeZCFMint('MyToken', AssetKind.COPY_SET);
const { brand, issuer } = mySynchronousMint.getIssuerRecord();
mySynchronousMint.mintGains({ myKeyword: amount }, seat);
```

## zcf.getInvitationIssuer()
- Returns: **[InvitationIssuer](./zoe-data-types.md#invitationissuer)**

Returns the **InvitationIssuer** for the Zoe instance.

```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

## zcf.saveIssuer(issuer, keyword)
- **issuer** **[Issuer](/reference/ertp-api/issuer.md)**
- **keyword** **String**
- Returns: **Promise&lt;IssuerRecord>**

Informs Zoe about an **Issuer** and returns a promise for acknowledging
when the **Issuer** is added and ready. The *keyword* is the one associated
with the new **Issuer**. This method returns a promise for an **IssuerRecord** of the new **Issuer**

This saves an **Issuer** in Zoe's records for this contract **instance**.
It also has saved the **Issuer** information such that Zoe can handle offers involving
this **Issuer** and ZCF can provide the **IssuerRecord** synchronously on request.

An **IssuerRecord** has two fields, each of which holds the namesake object
associated with the **Issuer** value of the record:
**IssuerRecord.brand** and **IssuerRecord.issuer**.

```js
await zcf.saveIssuer(secondaryIssuer, keyword);
```

## zcf.makeInvitation(offerHandler, description, customProperties?, proposalShape?)
- **offerHandler** **ZCFSeat => Object**
- **description** **String**
- **customProperties** **Object** - Optional.
- **proposalShape** **Pattern** - Optional.
- Returns: **Promise&lt;Invitation>**

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
- Returns: **[ZCFSeat](./zcfseat.md), Promise&lt;[UserSeat](./user-seat.md)>**

Returns an empty **ZCFSeat** and a **Promise** for a **UserSeat**

Zoe uses **seats** to represent offers, and has two seat facets (a
particular view or API of an object;
there may be multiple such facets per object) a **ZCFSeat** and a **UserSeat**.
```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
```

## zcf.getInstance()
- Returns: **[Instance](./zoe-data-types.md#instance)**

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
- Returns: **[AssetKind](/reference/ertp-api/ertp-data-types.md#assetkind)**

Returns the **AssetKind** associated with the *brand* argument.
```js
const quatloosAssetKind = zcf.getAssetKind(quatloosBrand);
```

## zcf.stopAcceptingOffers()
- Returns: None.

The contract requests Zoe to not accept offers for this contract instance. 
It can't be called from outside the contract unless the contract explicitly makes it accessible.

## zcf.shutdown(completion)
- **completion** **Usually (but not always) a String**
- Returns: None.

Shuts down the entire vat and contract instance and gives payouts.

All open **seats** associated with the current **instance** have **fail()**
called on them.

Call when:
- You want nothing more to happen in the contract, and
- You don't want to take any more offers

The *completion* argument is usually a **String**, but this 
is not required. It is used for the notification sent to the
contract instance's **done()** function. Any still open seats or
other outstanding promises are closed with a generic 'vat terminated' 
message.
```js
zcf.shutdown();
```

## zcf.shutdownWithFailure(reason)
- **reason** **Error**
- Returns: None.

Shuts down the entire vat and contract instance due to an error.

All open **seats** associated with the current **instance** have **fail()**
called on them.

The *reason* argument is a JavaScript error object. 
It is used for the notification sent to the
contract instance's **done()** function. Any still open seats or
other outstanding promises are closed with the relevant 
error message.

```js
zcf.shutdownWithFailure();
```

## zcf.getTerms()
- Returns: **Object**

Returns the **[Issuers](/reference/ertp-api/issuer.md)**, **[Brands](/reference/ertp-api/brand.md)**, and custom **terms** the current contract **instance** was instantiated with.

The returned values look like:
```js
{ brands, issuers, customTermA, customTermB ... }
// where brands and issuers are keywordRecords, like:

{
  brands: { A: moolaKit.brand, B: simoleanKit.brand },
  issuers: { A: moolaKit.issuer, B: simoleanKit.issuer },
  customTermA: 'something',
  customTermB: 'something else'
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
- Returns: **Undefined**

Checks if a keyword is valid and not already used as a **brand** in this **instance** (i.e. unique)
and could be used as a new **Brand** to make an **Issuer**. Throws an appropriate error if it's not
a valid keyword, or is not unique.
```js
zcf.assertUniqueKeyword(keyword);
```
## zcf.reallocate(seats)
- **seats** **[ZCFSeats](./zcfseat.md)[]** (at least two)
- Returns: None.

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
1. Conserves rights (the specified **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)** have the same total value as the
  current total amount)
2. Is 'offer-safe' for all parties involved. 

The reallocation is partial, only applying to the **seats** in the
argument array. By induction, if rights conservation and
offer safety hold before, they hold after a safe reallocation.

This is true even though we only re-validate for **seats** whose
allocations change. A reallocation can only effect offer safety for
those **seats**, and since rights are conserved for the change, overall
rights are unchanged.

**zcf.reallocate()** throws this error:
- **reallocating must be done over two or more seats**

```js
sellerSeat.incrementBy(buyerSeat.decrementBy({ Money: providedMoney }));
buyerSeat.incrementBy(sellerSeat.decrementBy({ Items: wantedItems }));
zcf.reallocate(buyerSeat, sellerSeat);
```

## zcf.setOfferFilter(strings)
- **strings** **Array&lt;String>**
- Returns: None.

Disables all the offer keywords contained in the *strings* argument, preventing any users from using or accessing the specified keywords. This might be done either to disable keywords that are proving problematic or to debug undesirable behavior.

Note that a keyword can be re-enabled by calling this method again and simply not including the keyword in the *strings* argument.

## zcf.getOfferFilter()
- Returns: **Array&lt;String>**

Returns all the offer keywords that have been disabled, if any. Offer keywords may be disabled using
the **[zcf.setOfferFilter()](#zcf-setofferfilter-strings)** method if they prove problematic in some fashion, or to debug undesired behavior.
