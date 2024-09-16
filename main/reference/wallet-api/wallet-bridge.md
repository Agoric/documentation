# WalletBridge API Commands

These methods can be used by an untrusted Dapp without breaching the wallet's
integrity. They are also exposed via the iframe/WebSocket bridge that a
Dapp UI can use to access a Wallet.

### `addOffer(offer)`

- `offer` `{OfferState}`
- Returns: `{Promise<string>}`

Adds an offer to the Wallet, returning the offer's unique private ID in the Wallet.
This ID is not stored in the Board.

### `addOfferInvitation(offer, invitation)`

- `offer` `{OfferState}`
- `invitation` `{ERef<Payment>}`
- Returns: `{Promise<string>}`

Add the specified invitation to the specified offer, returning the offer's private ID in the Wallet.  
This ID is not stored in the Board.

### `getDepositFacetId(brandBoardId`

- `brandBoardId` `{string}`
- Returns: `{Promise<string>}`

Returns the Board ID to use to receive payments of the specified by its Board ID brand.

### `getPursesNotifier()`

- Returns: `{Promise<Notifier<Array<PursesJSONState>>>}`

Returns a notifier that follows changes to the purses in the Wallet.

### `getOffersNotifier()`

- Returns: `{Promise<Notifier<array<OfferState>>>}`

Returns a notifier that follows changes to the offers received by the Wallet.

### `suggestIssuer(petname, issuerBoardId)`

- `petname` `{Petname}`
- `issuerBoardId` `{string}`
- Returns: `void`

Introduce an ERTP issuer with a suggested petname to the Wallet.

### `suggestInstallation(petname, installationBoardID)`

- `petname` `{Petname}`
- `installationBoardId` `{string}`
- Returns: `void`

Introduce a Zoe contract installation with a suggested petname to the Wallet.

### `suggestInstance(petname, instanceBoardId)`

- `petname` `{Petname}`
- `instanceBoardId` `{string}`
- Returns: `void`

Introduce a Zoe contract instance with a suggested petname to the Wallet.
