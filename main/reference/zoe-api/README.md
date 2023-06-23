# Zoe API

<Zoe-Version/>


The Zoe framework provides a way to write smart contracts without having to worry about [offer safety](/guides/zoe/README.md#offer-safety). To use Zoe, we put things in terms of "offers". An offer proposal is a statement about what you want and what you're willing to offer. It turns out, many smart contracts (apart from gifts and one-way payments) involve an exchange of digital assets that can be put in terms of offer proposals.

Start creating your own contract or build on any of our existing contracts.
Explore our pre-built contracts [here](/guides/zoe/contracts/README.md).

The Zoe API supports the following objects:

| Object | Description |
| --- | --- |
| [Zoe Service](./zoe.md) | Deploy and work with smart contracts. |
| [UserSeat](./user-seat.md) | Used outside contracts to access or manipulate offers. |
| [Zoe Contract Facet](./zoe-contract-facet.md) | Accesses a running contract instance. |
| [ZCFSeat](./zcfseat.md) | Used within contracts to access or manipulate offers. |
| [ZCFMint](./zcfmint.md) | Used by a contract to issue digital assets. |
| [Price Authority](./price-authority.md) | Gives quotes for prices. |


The Zoe API provides the following libraries:

| Library | Description |
| --- | --- |
| [ZoeHelpers](./zoe-helpers.md) | Functions that extract common contract code and patterns into reusable helpers. |
| [Ratio Math](./ratio-math.md) | Functions that let you create and manipulate **[Ratios](./zoe-data-types.md#ratio)**. |


The Zoe API introduces and uses the following data types:

| Data Type | Description |
| --- | --- |
| [Allocation](./zoe-data-types.md#allocation) | The **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)** to be paid out to each seat upon exiting an **Offer**. |
| [AmountKeywordRecord](./zoe-data-types.md#amountkeywordrecord) | Records in which the property names are **Keywords** and the values are **[Amounts](/reference/ertp-api/ertp-data-types.md#amount)**. |
| [Handle](./zoe-data-types.md#handle) | TBD  |
| [Instance](./zoe-data-types.md#instance) | A handle to an opaque object that represents a contract instance. |
| [Invitation](./zoe-data-types.md#invitation) | TBD |
| [InvitationIssuer](./zoe-data-types.md#invitationissuer) | An **[Issuer](/reference/ertp-api/issuer.md)** for **[Invitations](./zoe-data-types.md#invitation)**, which grant the right to participate in a contract. |
| [Keyword](./zoe-data-types.md#keyword) | An ASCII identifier string that must begin with an upper case letter. |
| [MutableQuote](./zoe-data-types.md#mutablequote) | Statement from a **[PriceAuthority](./price-authority.md)** as to the current price level at a particular time when multiple calls, replacing the trigger value, are expected. |
| [ParsableNumber](./zoe-data-types.md#parsablenumber) | Defined as a **bigint**, **number**, or **string**. |
| [PriceQuote](./zoe-data-types.md#pricequote) | Statement from a **[PriceAuthority](./price-authority.md)** as to the current price level at a particular time when only a single calls is expected. |
| [Ratio](./zoe-data-types.md#ratio) | Pass-by-value record that consists of a *numerator* **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** and a *denominator* **Amount**. |





