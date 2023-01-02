# ZCFMint Object


## ZCFMint.getIssuerRecord()
  - Returns: **IssuerRecord**

Returns an **issuerRecord** containing the **issuer** and **brand** associated with the **zcfMint**.

## ZCFMint.mintGains(gains, zcfSeat?)
  - **gains** **AmountKeywordRecord**
  - **zcfSeat** **[ZCFSeat](./zcfseat.md)** - Optional.
  - Returns: **ZCFSeat**

All **amounts** in **gains** must be of this **ZCFMint**'s **brand**.
The **gains**' keywords are in that **seat**'s namespace.
Mint the **gains** **amount** of assets and add them to
that **seat**'s **allocation**. If a **seat** is provided,
it is returned. Otherwise a new **seat** is returned.
  - **zcfMint.mintGains({ Token: amount }, seat);**

## ZCFMint.burnLosses(losses, zcfSeat)
  - **losses** **AmountKeywordRecord**
  - **zcfSeat** **[ZCFSeat](./zcfseat.md)**
  - Returns: **Void**

All **amounts** in **losses** must be of this **ZCFMint**'s **brand**.
The **losses**' keywords are in that **seat**'s namespace.
Subtract **losses** from that **seat**'s **allocation**, then
burn that **amount** of assets from the pooled **purse**.
  - **zcfMint.burnLosses({ Token: amount }, seat);**getIssuerRecord()**


