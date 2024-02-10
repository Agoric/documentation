# Zoe API

<Zoe-Version/>


The Zoe framework provides a way to write smart contracts without having to worry about [offer safety](/guides/zoe/offer-safety). 
To use Zoe, we put things in terms of "offers". An offer proposal is a statement about what you want and
what you're willing to offer. It turns out, many smart contracts (apart from gifts and one-way payments)
involve an exchange of digital assets that can be put in terms of offer proposals.

Start creating your own contract or build on any of our existing contracts.
Explore our [pre-built contracts](/guides/zoe/contracts/index).

The Zoe API supports the following objects:

| Object | Description |
| --- | --- |
| [Zoe Service](./zoe) | Deploys and works with smart contracts. |
| [UserSeat](./user-seat) | Used outside contracts to access or manipulate offers. |
| [Zoe Contract Facet](./zoe-contract-facet) | Accesses a running contract instance. |
| [ZCFSeat](./zcfseat) | Used within contracts to access or manipulate offers. |
| [ZCFMint](./zcfmint) | Used by a contract to issue digital assets. |
| [Price Authority](./price-authority) | Gives quotes for prices. |


The Zoe API provides the following libraries:

| Library | Description |
| --- | --- |
| [ZoeHelpers](./zoe-helpers) | Functions that extract common contract code and patterns into reusable helpers. |
| [Ratio Math](./ratio-math) | Functions that let you create and manipulate **[Ratios](./zoe-data-types#ratio)**. |


The Zoe API introduces and uses the following data types:

| Data Type | Description |
| --- | --- |
| [Allocation](./zoe-data-types#allocation) | The **[Amounts](/reference/ertp-api/ertp-data-types#amount)** to be paid out to each seat upon exiting an **Offer**. |
| [AmountKeywordRecord](./zoe-data-types#keywordrecord) | A record in which the property names are **Keywords** and the values are **[Amounts](/reference/ertp-api/ertp-data-types#amount)**. |
| [Handle](./zoe-data-types#handle) | A **Far** object without any methods whose only useful property is its unique identity. |
| [Instance](./zoe-data-types#instance) | A handle to an opaque object that represents a contract instance. |
| [Invitation](./zoe-data-types#invitation) | A non-fungible eright that can be held in **[Payments](/reference/ertp-api/payment)** or **[Purses](/reference/ertp-api/purse)**, just like any other eright. |
| [InvitationIssuer](./zoe-data-types#invitationissuer) | An **[Issuer](/reference/ertp-api/issuer)** for **[Invitations](./zoe-data-types#invitation)**, which grant the right to participate in a contract. |
| [Keyword](./zoe-data-types#keyword) | An ASCII identifier string that must begin with an upper case letter. |
| [MutableQuote](./zoe-data-types#mutablequote) | Statement from a **[PriceAuthority](./price-authority)** as to the current price level at a particular time when multiple calls, replacing the trigger value, are expected. |
| [ParsableNumber](./zoe-data-types#parsablenumber) | Defined as a **bigint**, **number**, or **string**. |
| [PriceQuote](./zoe-data-types#pricequote) | Statement from a **[PriceAuthority](./price-authority)** as to the current price level at a particular time when only a single calls is expected. |
| [Ratio](./zoe-data-types#ratio) | Pass-by-value record that consists of a *numerator* **[Amount](/reference/ertp-api/ertp-data-types#amount)** and a *denominator* **Amount**. |
| [TransferPart](./zoe-data-types#transferpart) |  **[Allocation](./zoe-data-types#allocation)** changes for one or two existing **[ZCFSeats](./zcfseat)**. **TransferParts** are the individual elements of the *transfer* array passed into the **[atomicRearrange()](./zoe-helpers#atomicrearrange-zcf-transfers)** function. |


