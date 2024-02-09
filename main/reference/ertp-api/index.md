# ERTP API

The ERTP API supports the following objects:

| Object | Description |
| --- | --- |
| [Issuer](./issuer.md) | The authority on what holds digital assets of its kind. |
| [Mint](./mint.md) | Can issue new digital assets. |
| [Brand](./brand.md) | Identifies the asset type of the associated **Issuer** and **Mint**. |
| [Purse](./purse.md) | Holds digital assets. |
| [Payment](./payment.md) | Holds digital assets that are in transit. |



The ETRP API uses the following library:

| Object | Description |
| --- | --- |
| [AmountMath](./amount-math.md) | The **AmountMath** object has several methods which can be used to manipulate and analyze **[Amounts](./ertp-data-types.md#amount)**. |


The ERTP API introduces and uses the following data types:

| Data Type | Description |
| --- | --- |
| [Amount](./ertp-data-types.md#amount) | Describes digital assets, specifying the number and **[Brand](./brand.md)** of assets. Note that **Amounts** can describe either fungible or non-fungible assets. |
| [AmountShape](./ertp-data-types.md#amountshape) | Describes digital assets, specifying the properties and **[Brand](./brand.md)** of assets. |
| [AmountValue](./ertp-data-types.md#amountvalue) | Describes how much of something there is. |
| [AssetKind](./ertp-data-types.md#assetkind) | Specifies whether an **Amount** is fungible or non-fungible. |
| [DisplayInfo](./ertp-data-types.md#displayinfo) | Specifies how to display a **Brand**'s **Amounts**. |

