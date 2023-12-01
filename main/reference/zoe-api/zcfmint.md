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

All **amounts** in *gains* must be of this **ZCFMint**'s **[Brand](/reference/ertp-api/brand.md)**
and the *gains*' **[Keywords](./zoe-data-types.md#keyword)** should be defined by the contract instance in which *zcfSeat* is participating.
If *zcfSeat* is not provided, a new **seat** is used.
Mints the *gains* **Amount** of assets and adds them to *zcfSeat*'s **[Allocation](./zoe-data-types.md#allocation)**, then returns *zcfSeat*.

## aZCFMint.burnLosses(losses, zcfSeat)
  - **losses**: **[AmountKeywordRecord](./zoe-data-types.md#keywordrecord)**
  - **zcfSeat**: **[ZCFSeat](./zcfseat.md)**
  - Returns: None

All **amounts** in *losses* must be of this **ZCFMint**'s **[Brand](/reference/ertp-api/brand.md)**
and the *losses*' **[Keywords](./zoe-data-types.md#keyword)** must be defined by the contract instance in which *zcfSeat* is participating.
Subtracts *losses* from *zcfSeat*'s **[Allocation](./zoe-data-types.md#allocation)**, then
burns that **amount** of assets from the pooled **[Purse](/reference/ertp-api/purse.md)**.



