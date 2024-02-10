# ERTP API

The ERTP API supports the following objects:

| Object | Description |
| --- | --- |
| [Issuer](./issuer) | The authority on what holds digital assets of its kind. |
| [Mint](./mint) | Can issue new digital assets. |
| [Brand](./brand) | Identifies the asset type of the associated **Issuer** and **Mint**. |
| [Purse](./purse) | Holds digital assets. |
| [Payment](./payment) | Holds digital assets that are in transit. |



The ETRP API uses the following library:

| Object | Description |
| --- | --- |
| [AmountMath](./amount-math) | The **AmountMath** object has several methods which can be used to manipulate and analyze **[Amounts](./ertp-data-types#amount)**. |


The ERTP API introduces and uses the following data types:

| Data Type | Description |
| --- | --- |
| [Amount](./ertp-data-types#amount) | Describes digital assets, specifying the number and **[Brand](./brand)** of assets. Note that **Amounts** can describe either fungible or non-fungible assets. |
| [AmountShape](./ertp-data-types#amountshape) | Describes digital assets, specifying the properties and **[Brand](./brand)** of assets. |
| [AmountValue](./ertp-data-types#amountvalue) | Describes how much of something there is. |
| [AssetKind](./ertp-data-types#assetkind) | Specifies whether an **Amount** is fungible or non-fungible. |
| [DisplayInfo](./ertp-data-types#displayinfo) | Specifies how to display a **Brand**'s **Amounts**. |

