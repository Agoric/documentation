# ZCFMint Object

An object used by the **[Zoe Contract Facet](./zoe-contract-facet)** to issue digital assets. It's
very similar to the **[Mint](/reference/ertp-api/mint)** object, but it has a more limited set of
methods.

**ZCFMints** are created and returned by **Zoe Contract Facet's** **[zcf.makeZCFMint()](./zoe-contract-facet#zcf-makezcfmint-keyword-assetkind-displayinfo)** method.

## aZCFMint.getIssuerRecord()

- Returns: **IssuerRecord**

Returns an **IssuerRecord** containing the **[Issuer](/reference/ertp-api/issuer)** and
**[Brand](/reference/ertp-api/brand)** associated with the **zcfMint**.

## aZCFMint.mintGains(gains, zcfSeat?)

- **gains**: **[AmountKeywordRecord](./zoe-data-types#keywordrecord)**
- **zcfSeat**: **[ZCFSeat](./zcfseat)** - Optional.
- Returns: **ZCFSeat**

All **amounts** in _gains_ must be of this **ZCFMint**'s **[Brand](/reference/ertp-api/brand)**
and the _gains_' **[Keywords](./zoe-data-types#keyword)** should be defined by the contract instance in which _zcfSeat_ is participating.
If _zcfSeat_ is not provided, a new **seat** is used.
Mints the _gains_ **Amount** of assets and adds them to _zcfSeat_'s **[Allocation](./zoe-data-types#allocation)**, then returns _zcfSeat_.

## aZCFMint.burnLosses(losses, zcfSeat)

- **losses**: **[AmountKeywordRecord](./zoe-data-types#keywordrecord)**
- **zcfSeat**: **[ZCFSeat](./zcfseat)**
- Returns: None

All **amounts** in _losses_ must be of this **ZCFMint**'s **[Brand](/reference/ertp-api/brand)**
and the _losses_' **[Keywords](./zoe-data-types#keyword)** must be defined by the contract instance in which _zcfSeat_ is participating.
Subtracts _losses_ from _zcfSeat_'s **[Allocation](./zoe-data-types#allocation)**, then
burns that **amount** from the assets escrowed by Zoe for this contract instance.
