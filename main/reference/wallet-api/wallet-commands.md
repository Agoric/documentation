# Wallet API Commands

### `getBridge()`

- Returns: `{Promise<WalletBridge>}`

Returns the wallet bridge that bypasses Dapp-authorization. This should
only be used within the REPL or deployment scripts that want to use the
WalletBridge API without the effort of calling `getScopedBridge`.
Since your REPL and deployment scripts already run using the ag-solo's full authority,
it doesn't really make a difference to have them use a more restricted bridge.

### `getScopedBridge(suggestedDappPetname, dappOrigin)`

- `suggestedDappPetname` `{Petname}`
- `dappOrigin` `{String}`
- Returns: `{Promise<WalletBridge>}`

Returns a wallet bridge corresponding to an origin that must be approved in the wallet UI.
This is available for completeness to provide the underlying API that's available over the
standard wallet-bridge.html.

### `addPayment(payment)`

- `payment` `{ERef<Payment>}`
- Returns: `void`

Adds a payment to the Wallet for deposit to the user-specified purse,
either via an autodeposit or manually approved.

### `getDepositFacetId(brandBoardId)`

- `brandBoardId` `{String}`
- Returns: `{Promise<string>}`

Returns the board ID for the deposit facet of the user's Wallet that accepts payments
of the brand specified by the `brandBoardId` parameter.

### `getIssuers()`

- Returns: `{Array<[Petname, Issuer]>}`

Returns an array of all the Issuers and their petnames associated with this Wallet.

### `getIssuer(petname)`

- `petname` `{Petname}`
- Returns: `{Issuer}`

Returns the issuer with the specified petname associated with this Wallet.

### `getPurses()`

- Returns: `{Array<[Petname, Purse]>}`

Returns all the purses associated with this wallet.

### `getPurse(pursePetname)`

- `pursePetName` `{String}`
- Returns `{Purse}`
- Errors: Throws an error if there is no purse with the given petname.

Returns the `purse` object with the given petname
