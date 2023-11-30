# ZCFMint Object

An object used by the **[Zoe Contract Facet](./zoe-contract-facet.md)** to issue digital assets. It's
very similar to the **[Mint](/reference/ertp-api/mint.md)** object, but it has a more limited set of
methods.

**ZCFMints** are created and returned by **Zoe Contract Facet's** **[zcf.makeZCFMint()](./zoe-contract-facet.md#zcf-makezcfmint-keyword-assetkind-displayinfo)** method.

## aZCFMint.getIssuerRecord()
  - Returns: **IssuerRecord**

Returns an **IssuerRecord** containing the **[Issuer](/reference/ertp-api/issuer.md)** and
**[Brand](/reference/ertp-api/brand.md)** associated with the **zcfMint**.

## aZCFMint.mintGains(gains, zcfSeat?)
  - **gains**: **[AmountKeywordRecord](./zoe-data-types.md#keywordrecord)**
  - **zcfSeat**: **[ZCFSeat](./zcfseat.md)** - Optional.
  - Returns: **ZCFSeat**

All **amounts** in *gains* must be of this **ZCFMint**'s **[Brand](/reference/ertp-api/brand.md)**.
The *gains*' **[Keywords](./zoe-data-types.md#keyword)** are in that **seat**'s namespace.
Mint the *gains* **Amount** of assets and add them to
that **seat**'s **[Allocation](./zoe-data-types.md#allocation)**. If a **seat** is provided,
it is returned. Otherwise a new **seat** is returned.

## aZCFMint.burnLosses(losses, zcfSeat?)
  - **losses**: **[AmountKeywordRecord](./zoe-data-types.md#keywordrecord)**
  - **zcfSeat**: **[ZCFSeat](./zcfseat.md)**
  - Returns: None

All **amounts** in *losses* must be of this **ZCFMint**'s **[Brand](/reference/ertp-api/brand.md)**.
The *losses*' **[Keywords](./zoe-data-types.md#keyword)** are in that **seat**'s namespace.
Subtract *losses* from that **seat**'s **[Allocation](./zoe-data-types.md#allocation)**, then
burn that **amount** of assets from the pooled **[Purse](/reference/ertp-api/purse.md)**.



