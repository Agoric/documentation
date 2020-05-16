# Wallet API

This document lists and describes the API commands available to the wallet.

## Petnames

The Agoric wallet uses *petnames* for issuers and purses.

Petnames are your personal names for objects. No one else can see or
modify a petname without your permission. You can think of them as
your phone's contacts list. The actual phone number is what your phone
uses to call someone, but for you to more easily tell who a number is
associated with, you've assigned a petname to it, such as Mom,
Grandpa, Kate S., etc.

## Overview

Wallet API commands work with the following object types:
- `purse`: Stores assets until you withdraw them into a payment for use 
- `issuer`: Creates empty purses and payments and maps minted assets
  to them when assets are added or removed. Issuers verify and move
  digital assets.
- `offer`: Consists of what amount of what brand you're willing to
  give, and what amount of what brand you want, as well as the
  conditions under which the offer holder can cancel it.

## Purse API Methods

### `deposit()`
- **Function:**
  - Deposits a payment into the specified purse in the wallet. Returns the deposited amount.
- **Required Arguments:**
  - `pursePetname`
    - **String**. The petname of the purse in which to deposit the specified payment.
  - `payment`
    - **Object**. A payment object, which is deposited into the specified purse.
- **Optional Arguments:**
  - None.

### `getPurses()`
- **Function:**
  - Returns all purse objects and their petnames in the wallet. They are returned as an array of [petname, purseObject] arrays which can be turned into a `Map` (`new Map(getPurses())`)
- **Required Arguments:**
  - None.
- **Optional Arguments:**
  - None.

### `getPurse(pursePetname)`
- **Function:**
  - Returns the `purse` object with the given petname
- **Required Arguments:**
  - `pursePetName`  
    - **String**. A purse's petname.
- **Optional Arguments:**
  - None.
- **Errors**
  - Throws an error if there is no purse with the given petname.

### `getPurseIssuer(pursePetname)`
- **Function:**
  - Given a purse's petname, returns the `issuer` object associated
    with the purse.
- **Required Arguments:**
  - **String**. `petname`, a purse's petname
- **Optional Arguments:**
  - None.
- **Errors**
  - Throws and error if given an invalid purse petname. 

### `makeEmptyPurse(issuerPetname, pursePetname)`
- **Function:**
  - Creates and returns a new, empty, purse object with a petname specified by the command. 
- **Required Arguments:**
  - `issuerPetname`
    - **String**. The petname you've assigned to the `issuer` the new purse uses.
  - `pursePetname`
    - **String**. The petname assigned to the new purse.	
- **Optional Arguments:**
 - None.
- **Errors:**
  - There is already a purse in this wallet with the name of `pursePetname`'s value.   


## Issuer API Methods

### `addIssuer()`
- **Function:**
  -  Assigns the given petname to a given`issuer` object and adds the issuer to the wallet. 
- **Required Arguments:**
  - `issuerPetname`
    - **String**. The petname assigned to the `issuer` object.
  - `issuer`
    - **Object**. An `issuer` object.
- **Optional Arguments:**
  - `brandRegKey`
    - **String**. A key in the Registry, whose value is the `brand` object associated with the issuer.

### `getIssuers()`
- **Function:**
  - Returns all issuers associated with the wallet and their petnames as an array of arrays of the format `[[issuerPetname, issuer], ...]`. You can use it to make a new map of petnames to issuers by doing `new Map(getIssuer())` 
- **Required Arguments:**
  - None.
- **Optional Arguments:**
  - None.

### `getIssuerNames(issuer)`
- **Function:**
  - Returns the petname and brandRegKey of a particular issuer object
- **Required Arguments:**
  - `issuer`
    - An issuer object
- **Optional Arguments:**
  - None.

## Offer API Methods

### `acceptOffer()`
- **Function:**
  - Changes the specified offer's status to "accepted".
- **Required Arguments:**
  - `id`
    - **String**: An offer id.
- **Optional Arguments:**
  - None.
- **Errors:**
  - If the offer has already been resolved or rejected. 

### `addOffer()`  
- **Function:**
  - Adds a new offer to the wallet's inbox, returning the offer's id.
- **Required Arguments:**
  - `rawOffer` 
    - **Object**: The potential offer sent from the Dapp UI to be looked at by the user.
- **Optional Arguments:**
  - `hooks`
    - Instructs the wallet to do actions before or after the offer is made, such as getting an invite from the `publicAPI` in order to make an offer. 

`hooks` format is 

`hooks[targetName][hookName] = [hookMethod, ...hookArgs]`

It’s called within the wallet as
`E(target)[hookMethod](...hookArgs)`

`hooks: {
     publicAPI: {
        getInvite: ['makeInvite'], // E(publicAPI).makeInvite()
     },
}`
  
### `cancelOffer()`
- **Function:**
  - Changes the status of the specified offer in the wallet inbox to
    "cancel". Returns `true` if successful, `false` if not.
- **Required Arguments:**
  - `id`
    - **String**. An offer id.
- **Optional Arguments:**
  - None. 
- **Errors:**
  - Returns `false` if the offer was not made with the exit rule ‘onDemand’, throws if the offer was already completed.

### `declineOffer()`
- **Function:**
  - Changes the status of the specified offer in the wallet inbox to "decline".
- **Required Arguments:**
  - `id`
    - **String**. An offer id.
- **Optional Arguments:**
  - None. 

### `getOffers()`
- **Function:**
  Returns a list of the offers associated with the wallet, sorted by
  id. 
- **Required Arguments:**
  - None.  
- **Optional Arguments:**
  - None.

### `getOfferHandle: id => idToOfferHandle.get(id)()`
- **Function:**
  - Returns the `offerHandle` object associated with the given offer id. 
- **Required Arguments:**
  - `id`
    - **String:** An offer id. 
- **Optional Arguments:**
  - None. 

### `getOfferHandles: ids => ids.map(wallet.getOfferHandle)()`
- **Function:**
  - Returns a list of all the `offerHandle` objects for offers in the
    wallet's inbox 
- **Required Arguments:**
  - None.
- **Optional Arguments:**
  - None. 

## `hydrateHooks()`
- **Function:**
  - Use the `hooks` data from the offer to create a function call with arguments. For example, the Dapp UI might use the hooks data to instruct the wallet to get an invite from a contract's publicAPI. 
- **Required Arguments:**
  - `hooks`
    - **Object.** A hooks object.
- **Optional Arguments:**
  - None.
