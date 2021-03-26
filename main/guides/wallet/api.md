# Wallet API

You can interact with a Wallet via the JavaScript *REPL* (*Read-Eval-Print Loop*),
which is visible at the bottom of the Wallet UI display. 
In the REPL, you send messages to `home.wallet`, which is the Wallet running on that
page/process. Typing `E(home.wallet).foo()` in the REPL returns the names of all the Wallet
API methods by the clever method of asking it to evaluate a non-existent API method and
getting an error message listing all the valid methods.

Running `agoric open --repl==only` opens a browser tab that shows only the REPL, and not
the combination of Wallet UI and REPL area. When issuing commands to the Wallet from the
REPL, they must be of the form `E(home.wallet).<Wallet API command and arguments>`. For more
information about `E()`, see the [`E()` section](/guides/js-programming/eventual-send.md) in 
the Distributed JavaScript Programming Guide.

There are two objects on which the Wallet API commands work:
- `WalletUser`: The presence exposed as `local.wallet` (and `home.wallet` for backwards compatibility).  
  It provides a place for Wallet API commands.
- `WalletBridge`: Its methods can be used by an untrusted
  Dapp without breaching the wallet's integrity.  These methods are also
  exposed via the iframe/WebSocket bridge that a Dapp UI can use to access the
  wallet.
  
## Wallet API commands

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
- `id` `{ERef<Payment>}`
- Returns: `void`

Adds a payment to the Wallet for deposit to the user-specified purse,
either via an autodeposit or manually approved.

### `getDepositFacet(brandBoardId)`
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
- `pursePetName`  `{String}`
- Returns `{Purse}`
- Errors: Throws an error if there is no purse with the given petname.

Returns the `purse` object with the given petname
    
## WalletBridge API commands    
    
These methods can be used by an untrusted Dapp without breaching the wallet's 
integrity.  They are also exposed via the iframe/WebSocket bridge that a 
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
