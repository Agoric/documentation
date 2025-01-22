# Zoe Contract Facet (ZCF)

<Zoe-Version/>

A Zoe Contract Facet is an API object for a running contract instance to access the Zoe state
for that instance. A Zoe Contract Facet is accessed synchronously from within the contract,
and usually is referred to in code as **zcf**.

The contract instance is launched by **E(Zoe).startInstance()**, and is given access to
the **zcf** object during that launch (see [Contract Requirements](/guides/zoe/contract-requirements)).
In the operations below, **instance** is the handle for the running contract instance.

## zcf.atomicRearrange(transfers)

- **transfers**: **Array&lt;[TransferPart](./zoe-data-types#transferpart)>**
- Returns: None.

Asks Zoe to rearrange the **[Allocations](./zoe-data-types#allocation)** among the seats mentioned in
_transfers_. _transfers_ are a set of changes to **Allocations** that must satisfy several
constraints. If these constraints are all met, then the reallocation happens atomically. Otherwise an
error is thrown and none of the proposed changes has any effect. The constraints are as follows.

- All the mentioned seats are still live.
- Overall conservation must be maintained. In other words, the reallocated
  **[Amounts](/reference/ertp-api/ertp-data-types#amount)** must balance out.
- Offer Safety is preserved for each seat. That means reallocations can only take assets from a seat
  as long as either it gets the assets described in the want section of its proposal, or it retains
  all of the assets specified in the give section of the proposal. This constraint applies to each
  seat across the entire atomicRearrangement, not to the individual **TransferParts**.

Note that you can construct the **TransferParts** that make up the _transfers_ array manually, or for
transfers that only include one seat, you can use the helper functions
**[fromOnly()](./zoe-helpers#fromonly-fromseat-fromamounts)** and
**[toOnly()](./zoe-helpers#toonly-toseat-toamounts)** to create
**TransferParts** that only use a subset of the fields.

## zcf.makeZCFMint(keyword, assetKind?, displayInfo?)

- **keyword**: **[Keyword](./zoe-data-types#keyword)**
- **assetKind**: **[AssetKind](/reference/ertp-api/ertp-data-types#assetkind)** - Optional, defaults to **AssetKind.NAT**.
- **displayInfo**: **[DisplayInfo](/reference/ertp-api/ertp-data-types#displayinfo)** - Optional, defaults to **undefined**.
- Returns: **Promise&lt;[ZCFMint](./zcfmint)>**

Creates a synchronous Zoe mint, allowing users to mint and reallocate digital assets synchronously
instead of relying on an asynchronous ERTP **[Mint](/reference/ertp-api/mint)**.
The optional _displayInfo_ parameter takes values
like **decimalPlaces: 16** that tell the UI how to display values associated with the created mint's
brand. It defaults to undefined.

**Important**: **ZCFMints** do **not** have the same methods as an ERTP **Mint**. Do not try to use
ERTP methods on a **ZCFMint** or vice versa.

**Important**: On the other hand, the **[Issuer](/reference/ertp-api/issuer)** and **[Brand](/reference/ertp-api/brand)** associated with a **zcfMint**
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

- Returns: **Promise&lt;[InvitationIssuer](./zoe-data-types#invitationissuer)>**

Returns the **InvitationIssuer** for the Zoe instance.

```js
const invitationIssuer = await zcf.getInvitationIssuer();
```

## zcf.saveIssuer(issuer, keyword)

- **issuer**: **[Issuer](/reference/ertp-api/issuer)**
- **keyword**: **[Keyword](./zoe-data-types#keyword)**
- Returns: **Promise&lt;IssuerRecord>**

Informs Zoe about an **Issuer** and returns a promise for acknowledging
when the **Issuer** is added and ready. The _keyword_ is the one associated
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

<a id="zcf-makeinvitation-offerhandler-description-customproperties-proposalshape"></a>

## zcf.makeInvitation(offerHandler, description, customDetails?, proposalShape?)

- **offerHandler**: **(seat: ZCFSeat, offerArgs?: CopyRecord) => any**
- **description**: **String**
- **customDetails**: **Object** - Optional.
- **proposalShape**: **[Pattern](https://github.com/endojs/endo/tree/master/packages/patterns#readme)** - Optional.
- Returns: **Promise&lt;[Invitation](./zoe-data-types#invitation)>**

Uses the Zoe **[InvitationIssuer](./zoe-data-types#invitationissuer)** to _mint_
a credible **Invitation** for a smart contract.
The returned **Invitation**'s **amount** specifies:

- The specific contract **instance**.
- The Zoe **installation**.
- A unique **[Handle](./zoe-data-types#handle)**.

**offerHandler** is a required function accepting a **ZCFSeat** and **offerArgs**
(which will be present if and only if provided to
[`E(Zoe).offer(...)`](/reference/zoe-api/zoe#e-zoe-offer-invitation-proposal-paymentpkeywordrecord-offerargs))
and returning arbitrary offer results.

**description** is a required string describing the **Invitation**,
and should include whatever information is needed for a potential recipient of the **Invitation**
to distinguish among this contract's invitations.
Each description should be a string literal that is unique within the source text of its contract
and used only as the argument to make invitations of a particular kind.

The optional **customDetails** argument is included in the **Invitation**'s
**amount** and not otherwise relied on by Zoe.

The optional **proposalShape** argument can be used to describe the required and allowed components of each proposal.

### Proposal Shapes

Proposals that don't match the pattern will be rejected by Zoe without even being sent to the contract.

Patterns are often constructed using the
**[M](https://endojs.github.io/endo/interfaces/_endo_patterns.PatternMatchers.html)** (for '**M**atcher') object.
**proposalShape**s are usually built from [`M.splitRecord(required, optional, rest)`](https://endojs.github.io/endo/interfaces/_endo_patterns.PatternMatchers.html#splitRecord).
For example, when making a covered call, to express that the offering party can't cancel:

```js
import { M } from '@endo/patterns';

const waivedExitProposalShape = M.splitRecord(
  // required properties
  { exit: { waived: null } },
  // optional properties
  { give: M.record(), want: M.record() },
  // unknown properties
  M.record()
);
const creatorInvitation = zcf.makeInvitation(
  makeCallOption,
  'makeCallOption',
  undefined,
  waivedExitProposalShape
);
```

Full details are in the [@endo/patterns](https://endojs.github.io/endo/modules/_endo_patterns.html) package. Here's a handy reference:

```js
interface PatternMatchers {
    and: ((...subPatts) => Matcher);
    any: (() => Matcher);
    array: ((limits?) => Matcher);
    arrayOf: ((subPatt?, limits?) => Matcher);
    bag: ((limits?) => Matcher);
    bagOf: ((keyPatt?, countPatt?, limits?) => Matcher);
    bigint: ((limits?) => Matcher);
    boolean: (() => Matcher);
    eq: ((key) => Matcher);
    eref: ((subPatt) => any);
    error: (() => Matcher);
    gt: ((rightOperand) => Matcher);
    gte: ((rightOperand) => Matcher);
    key: (() => Matcher);
    kind: ((kind) => Matcher);
    lt: ((rightOperand) => Matcher);
    lte: ((rightOperand) => Matcher);
    map: ((limits?) => Matcher);
    mapOf: ((keyPatt?, valuePatt?, limits?) => Matcher);
    nat: ((limits?) => Matcher);
    neq: ((key) => Matcher);
    not: ((subPatt) => Matcher);
    null: (() => null);
    number: (() => Matcher);
    opt: ((subPatt) => any);
    or: ((...subPatts) => Matcher);
    partial: ((basePatt, rest?) => Matcher);
    pattern: (() => Matcher);
    promise: (() => Matcher);
    record: ((limits?) => Matcher);
    recordOf: ((keyPatt?, valuePatt?, limits?) => Matcher);
    remotable: ((label?) => Matcher);
    scalar: (() => Matcher);
    set: ((limits?) => Matcher);
    setOf: ((keyPatt?, limits?) => Matcher);
    split: ((basePatt, rest?) => Matcher);
    splitArray: ((required, optional?, rest?) => Matcher);
    splitRecord: ((required, optional?, rest?) => Matcher);
    string: ((limits?) => Matcher);
    symbol: ((limits?) => Matcher);
    tagged: ((tagPatt?, payloadPatt?) => Matcher);
    undefined: (() => Matcher);
}
```

## zcf.makeEmptySeatKit()

- Returns: **[ZCFSeat](./zcfseat), Promise&lt;[UserSeat](./user-seat)>**

Returns an empty **ZCFSeat** and a **Promise** for a **UserSeat**

Zoe uses **seats** to represent offers, and has two seat facets (a
particular view or API of an object;
there may be multiple such facets per object) a **ZCFSeat** and a **UserSeat**.

```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
```

## zcf.getInstance()

- Returns: **[Instance](./zoe-data-types#instance)**

The contract code can request its own current instance, so it can be sent elsewhere.

## zcf.getBrandForIssuer(issuer)

- **issuer**: **[Issuer](/reference/ertp-api/issuer)**
- Returns: **[Brand](/reference/ertp-api/brand)**

Returns the **Brand** associated with the _issuer_.

## zcf.getIssuerForBrand(brand)

- **brand**: **[Brand](/reference/ertp-api/brand)**
- Returns: **[Issuer](/reference/ertp-api/issuer)**

Returns the **Issuer** of the _brand_ argument.

## zcf.getAssetKind(brand)

- **brand**: **[Brand](/reference/ertp-api/brand)**
- Returns: **[AssetKind](/reference/ertp-api/ertp-data-types#assetkind)**

Returns the **AssetKind** associated with the _brand_ argument.

```js
const quatloosAssetKind = zcf.getAssetKind(quatloosBrand);
```

## zcf.stopAcceptingOffers()

- Returns: None.

The contract requests Zoe to not accept offers for this contract instance.
It can't be called from outside the contract unless the contract explicitly makes it accessible.

## zcf.shutdown(completion)

- **completion**: **Usually (but not always) a String**
- Returns: None.

Shuts down the entire vat and contract instance and gives payouts.

All open **seats** associated with the current **instance** have **fail()**
called on them.

Call when:

- You want nothing more to happen in the contract, and
- You don't want to take any more offers

The _completion_ argument is usually a **String**, but this
is not required. It is used for the notification sent to the
contract instance's **done()** function. Any still open seats or
other outstanding promises are closed with a generic 'vat terminated'
message.

```js
zcf.shutdown();
```

## zcf.shutdownWithFailure(reason)

- **reason**: **Error**
- Returns: None.

Shuts down the entire vat and contract instance due to an error.

All open **seats** associated with the current **instance** have **fail()**
called on them.

The _reason_ argument is a JavaScript error object.
It is used for the notification sent to the
contract instance's **done()** function. Any still open seats or
other outstanding promises are closed with the relevant
error message.

```js
zcf.shutdownWithFailure();
```

## zcf.getTerms()

- Returns: **Object**

Returns the **[Issuers](/reference/ertp-api/issuer)**, **[Brands](/reference/ertp-api/brand)**, and custom **terms** the current contract **instance** was instantiated with.

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
const { brands, issuers, maths, terms } = zcf.getTerms();
```

## zcf.getZoeService()

- Returns: [ZoeService](./zoe)

This is the only way to get the user-facing [Zoe Service API](./zoe) to
the contract code as well.

```js
// Making an offer to another contract instance in the contract.
const zoeService = zcf.getZoeService();
E(zoeService).offer(creatorInvitation, proposal, paymentKeywordRecord);
```

## zcf.assertUniqueKeyword(keyword)

- **keyword**: **[Keyword](./zoe-data-types#keyword)**
- Returns: **Undefined**

Checks if a **Keyword** is valid and not already used as a **Brand** in this **Instance** (i.e., unique)
and could be used as a new **Brand** to make an **Issuer**. Throws an appropriate error if it's not
a valid **Keyword**, or is not unique.

```js
zcf.assertUniqueKeyword(keyword);
```

## zcf.setOfferFilter(strings)

- **strings**: **Array&lt;String>**
- Returns: None.

Prohibit invocation of invitatations whose description include any of the strings.
Any of the strings that end with a colon (`:`) will be treated as a prefix,
and invitations whose description string begins with the string (including the colon)
will not be processed if passed to **E(Zoe).offer()**. Instead, an exception will be thrown.

It is expected that most contracts will never invoke this function directly. It is
intended to be used by **governance** in a legible way, so that the contract's
governance process can take emergency action in order to stop processing when necessary.

Note that blocked strings can be re-enabled by calling this method again and simply not
including that string in the _strings_ argument.

## zcf.getOfferFilter()

- Returns: **Array&lt;String>**

Returns all the strings that have been disabled for use in invitations, if any.
A contract's invitations may be disabled using the
**[zcf.setOfferFilter()](#zcf-setofferfilter-strings)** method when governance determines
that they provide a vulnerability.
