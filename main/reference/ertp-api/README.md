# ERTP API

The ERTP API supports the following objects:

| Object | Description |
| --- | --- |
| [Issuer](./issuer.md) | The authority on what holds digital assets of its kind. |
| [Mint](./mint.md) | Can issue new digital assets. |
| [Brand](./brand.md) | Identifies the asset type of the associated **Issuer** and **Mint**. |
| [Purse](./purse.md) | Holds digital assets. |
| [Payment](./payment.md) | Holds digital assets that are in transit. |
| [AmountMath](./amount-math.md) | Used to manipulate **[Amounts](./ertp-data-types.md#amount)**. |



The ERTP API introduces and uses the following data types:

| Data Type | Description |
| --- | --- |
| [Amount](./ertp-data-types.md#amount) | Describes digital assets, specifying the number and kind of assets. |
| [Value](./ertp-data-types.md#value) | Describes how much of something there is. |
| [AssetKind](./ertp-data-types.md#assetkind) | Specifies whether an **Amount** is fungible or non-fungible. |
| [DisplayInfo](./ertp-data-types.md#displayinfo) | Specifies how to display a **Brand**'s **Amounts**. |

