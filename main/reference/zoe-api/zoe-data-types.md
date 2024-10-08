# Zoe Data Types

Zoe introduces and uses several data types.

## Allocation

**Allocations** represent the **[Amounts](/reference/ertp-api/ertp-data-types#amount)** to be paid
out to each seat upon exiting a **Proposal**.

For example, if a seat expected to be paid 5 _Quatloos_ and 3 _Widgets_ after successfully exiting a **Proposal**, the **Allocation** would look like:

```js
{
  Quatloos: 5n;
  Widgets: 3n;
}
```

## Handle

**Handles** are **Far** objects without any methods whose only useful property are their
unique identities. They're often created in order to designate some other object, where the
**Handles** can be passed around as reliable designators without giving access to the
designated objects.

## Instance

An **Instance** is a handle that represents an instance of a contract.
You can get information about the contract instance via these methods:

- **[E(Zoe).getBrands()](./zoe#e-zoe-getbrands-instance)**
- **[E(Zoe).getIssuers()](./zoe#e-zoe-getissuers-instance)**
- **[E(Zoe).getTerms()](./zoe#e-zoe-getterms-instance)**
- **[E(Zoe).getPublicFacet()](./zoe#e-zoe-getpublicfacet-instance)**

## Invitation

An **Invitation** is a non-fungible asset created by the **[InvitationIssuer](#invitationissuer)**.
An **Invitation Payment** is a **[Payment](/reference/ertp-api/payment)** holding an **Invitation**.

## InvitationIssuer

The **InvitationIssuer** is an **[Issuer](/reference/ertp-api/issuer)** that plays a
special role throughout Zoe. Zoe has a single **InvitationIssuer** for its entire
lifetime. All **Invitations** come from the **[Mint](/reference/ertp-api/mint)**
associated with the Zoe instance's **InvitationIssuer**.

The issuer is publicly available (via [`E(Zoe).getInvitationIssuer()`](./zoe-contract-facet#zcf-getinvitationissuer)),
so the ability to validate invitations is widely available.

**InvitationIssuer** has all the methods of regular **Issuers**, but the two methods that are most
often used are **[anIssuer.claim()](/reference/ertp-api/issuer#anissuer-claim-payment-optamount)**
and **[anIssuer.getAmountOf()](/reference/ertp-api/issuer#anissuer-getamountof-payment)**.

A successful call of **anInvitationIssuer.claim()** means you are assured the **Invitation** passed into
the method is recognized as valid by the **InvitationIssuer**. You are also assured the **Invitation**
is exclusively yours and no one else has access to it.

## Keyword

A **Keyword** is a unique identifier string within a contract for tying together the
**issuers** in its **proposals**, **payments**, and **payouts**.
It must be an ASCII-only [identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier)
and start with an upper case letter in order to avoid collisions with JavaScript properties
such as `toString` when used as a property name in a record.
(For more detail, see [Why do Zoe keywords have to start with a capital letter? #8241](https://github.com/Agoric/agoric-sdk/discussions/8241).)
`NaN` and `Infinity` are also not allowed as keywords.

<a id="amountkeywordrecord"></a>

## KeywordRecord

A **KeywordRecord** is a [CopyRecord](/glossary/#copyrecord) in which every property name
is a **[Keyword](#keyword)**, such as `harden({ Asset: moolaIssuer, Bid: simoleanIssuer })`.
Subtypes further constrain property values (for example, an
**AmountKeywordRecord** is a **KeywordRecord** in which every value is an
**[Amount](/reference/ertp-api/ertp-data-types#amount)** and a
**PaymentPKeywordRecord** is a **KeywordRecord** in which every value is either a
**[Payment](/reference/ertp-api/payment)** or a Promise for a Payment).

Users submit their **payments** as **KeywordRecords**:

```js
const aFistfulOfQuatloos = AmountMath.make(quatloosBrand, 1000n);
const paymentKeywordRecord = {
  Asset: quatloosPurse.withdraw(aFistfulOfQuatloos)
};
```

## ParsableNumber

A **ParsableNumber** is defined as a **bigint**, **number**, or **string**.

## Ratio

**Ratios** are pass-by-value records that consist of a
_numerator_ and a _denominator_. Both of these consist of a
**[AmountValue](/reference/ertp-api/ertp-data-types#amountvalue)** and a **[Brand](/reference/ertp-api/brand)**,
just like **[Amounts](/reference/ertp-api/ertp-data-types#amount)**.
A **Ratio** cannot have a denominator value of 0.

The most common kind of **Ratio** is applied to an **Amount** of a particular **Brand**
and produces results of the same **Brand**.

**Ratios** can also have two different **Brands**, essentially typing them such as miles per
hour or US dollars for Swiss francs (i.e., an exchange rate ratio).

## TransferPart

**TransferParts** are the individual elements of the _transfer_ array passed into the
**[atomicRearrange()](./zoe-helpers#atomicrearrange-zcf-transfers)** function. Each **TransferPart**
represents one or two **[Allocation](#allocation)** changes among existing
**[ZCFSeats](./zcfseat)**. Each **TransferPart** consists of 4 elements, each of which can be elided
in some cases:

- **fromSeat**?: **ZCFSeat** - The seat from which **amounts** are being taken.
- **toSeat**?: **ZCFSeat** - The seat to which **amounts** are being given.
- **fromAmounts**?: **[AmountKeywordRecord](#keywordrecord)** - The **amounts** which will be taken from the _fromSeat_.
- **toAmounts**?: **AmountKeywordRecord** - The **amounts** which will be given to the _toSeat_.

If a _fromSeat_ is specified, then a _fromAmounts_ is required. When you specify a _toSeat_ without
specifying a _toAmounts_, it means that the _fromAmount_ will be taken from _fromSeat_ and given to
_toSeat_.

**TransferParts** that represent one side of a transfer
can be created using the helper functions
**[fromOnly()](./zoe-helpers#fromonly-fromseat-fromamounts)** or
**[toOnly()](./zoe-helpers#toonly-toseat-toamounts)**.
Of course, as with any JavaScript datatype, you can also manually create **TransferParts**.
If you manually create a **TransferPart** and don't include the _fromSeat_, _toSeat_, and/or
_fromAmounts_ fields, you'll need to set the missing fields to **undefined**. (Note that if you don't
include the _toAmounts_ field, there's no need to set it to **undefined**; you can simply omit it.)
