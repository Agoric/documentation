# Wallet API

This document lists and describes the API commands available to the
wallet. Additionally, see [below for the wallet changes in Alpha](#wallet-changes-in-alpha).

## Overview

Wallet API commands work with the following object types:
- `purse`: Stores assets until you withdraw them into a payment for use 
- `issuer`: Creates empty purses and payments and maps minted assets
  to them when assets are added or removed. Issuers verify and move
  digital assets.
- `offer`: Consists of what amount of what [brand](/ertp/guide/amounts.md#brands)
  you're willing to
  give, and what amount of what brand you want, as well as the
  conditions under which the offer holder can cancel it.## Petnames

## Petnames

The Agoric wallet uses *petnames* for issuers and purses.

Petnames are your personal names for objects. No one else can see or
modify a petname without your permission. You can think of them as
your phone's contacts list. The actual phone number is what your phone
uses to call someone, but for you to more easily tell who a number is
associated with, you've assigned a petname to it, such as Mom,
Grandpa, Kate S., etc.

## Purse API Methods

### `deposit(pursePetname, payment)`
- `pursePetname`  `{ String }`
- `payment`  `{ Payment }`
- Returns: The deposited amount.

Deposits the specified payment into the specified purse in the wallet. Returns the deposited amount.

### `getPurses()`
- Returns:  Promises for all `purse` objects and their petnames in the wallet via an array of [petname, promise] arrays.

The returned array of arrays can be turned into a `Map` (`new Map(getPurses())`).

### `getPurse(pursePetname)`
- `pursePetName`  `{String}`
- Returns: A promise for the `purse` object with the given petname
- Errors: Throws an error if there is no purse with the given petname.

### `getPurseIssuer(petname)`
-  `petname`  `{String}`
- Returns: The `issuer` object associated with the purse.
- Errors: Throws an error if given an invalid purse petname. 

Given a purse's petname, returns the `issuer` object associated with the purse. 

### `makeEmptyPurse(issuerPetname, pursePetname)`
- `issuerPetname` `{String}`
- `pursePetname` `{String}`
- Returns: A new, empty, `purse` object.
- Errors: There is already a purse in this wallet with the name of `pursePetname`'s value.   

Creates and returns a new, empty, purse object with specified petname, which uses the issuer with the specified petname.

## Issuer API Methods

### `addIssuer(issuerPetname, issuer, brandRegKey)`
- `issuerPetname` `{String}`
- `issuer` `{Issuer}`
- `brandRegKey` `{String}` Optional

Assigns the given petname to a given `issuer` object, and adds the issuer to the wallet. `brandRegKey` is a key in the Registry, whose value is the `brand` object associated with the issuer.

### `getIssuers()`
- Returns: All issuers associated with the wallet and their petnames as an array of arrays of the format `[[issuerPetname, issuer], ...]`. 

You can use `getIssuers()` to make a new map of petnames to issuers by doing `new Map(getIssuer())` 

### `getIssuerNames(issuer)`
- `issuer` `{issuer}`
- Returns: The petname and brandRegKey of the specified  `issuer` object.

## Offer API Methods

### `acceptOffer(id)`
- `id` `{String}`
- Errors: If the offer has already been resolved or rejected. 

Makes the id-specified offer to the target contract. It approves a proposal added by `addOffer()` and submits an offer to the contract instance on behalf of the  user. Changes the specified offer's status to "accepted" in the wallet inbox. 

### `addOffer(rawOffer, hooks)`  
- `rawOffer` `{Object}`
- `hooks` `{Hooks}` Optional
- Returns: The offer's id.

Adds a new proposal to the wallet's inbox that the user can approve to make an  offer to a contract invitation. The `rawOffer` is a potential offer sent from the Dapp UI to be looked at by the user. The `hooks` instruct the wallet to do actions before or after the offer is made, such as getting an invite from the `publicAPI` in order to make an offer. 

`hooks` format is: 
```js
hooks[targetName][hookName] = [hookMethod, ...hookArgs]
```

Within the wallet, hooks are called as:
```js
E(target)[hookMethod](...hookArgs)
```

For example:

```Js
`hooks: {
     publicAPI: {
        getInvite: ['makeInvite'], // E(publicAPI).makeInvite()
     },
}
``` 

### `cancelOffer(id)`
- `id` `{String}`
- Returns: `true` if successful, `false` if not.
- Errors: Returns `false` if the offer was not made with the exit rule `onDemand`, throws if the offer was already completed.

Cancels the id-specified offer in the contract instance and changes its status in the wallet inbox to "cancel". 

### `declineOffer(id)`
- `id` `{String}`

Changes the status of the id-specified offer in the wallet inbox to "decline". 

### `getOffers()`
- Returns: An array of the `offer` objects associated with the wallet, sorted by
id. 

### `getOfferHandle: id => idToOfferHandle.get(id)()`
- `id` `{String}`
- Returns: The `offerHandle` object associated with the specified offer id. 

### `getOfferHandles: ids => ids.map(wallet.getOfferHandle)()`
- Returns: An array of all the `offerHandle` objects for offers in the
    wallet's inbox 

## `hydrateHooks(hooks)`
- `hooks` `{hooks}`

Uses the `hooks` data from the offer to create a function call with arguments. For example, the Dapp UI might use the hooks data to instruct the wallet to get an invite from a contract's publicAPI. 

## Wallet Changes in Alpha

### Dapp approvals

The wallet now prompts the user to accept the Dapp after your Dapp sends the first message over the wallet bridge, postponing your Dapp's wallet interactions until the user approves the connection.  If you aren't receiving responses from the wallet bridge, it is probably because your Dapp has not yet been approved.

If you want to suggest a particular name for your Dapp, you will have to add `?suggestedDappPetname=XXX` to the `wallet-bridge.html` iframe src URL, as done in the [Encouragement Dapp](https://github.com/Agoric/dapp-encouragement/commit/489ea8c03eeb2b71b7b7c539e677bccd161ad4aa#diff-a150226f082dfb9f386abdcabff01350).


### Petname to path migration

There is a migration in progress for the wallet bridge protocol.  Anything that used to be a "petname" is now either still a petname (a plain string), or a "path" (an array of strings whose first element is the user's petname for your Dapp).  You will have to adapt your Dapp to be able to use arrays-of-strings wherever you initially had just plain string petnames.

A simple way to do this is to `JSON.stringify(petnameOrPath)` before using them in a programmatic string-only context (such as a key in a Map or Set, or an attribute value of an HTML element, such as an ID).  If you display paths to users, you should join their elements with `'.'`, ideally coloring the first element differently than the dots and other elements.  This is because the first element is a trusted, user-assigned petname for the Dapp, and the other elements are automatically generated by the Dapp or wallet, and have no special relationship to the user.

### Dapp-specific path suggestions

Your Dapp should suggest names for any Installations, Instances, or Issuers that the wallet user will interact with.  Once accepted, these will be returned to your Dapp as paths (arrays of strings, above) beginning with the user's petname for the Dapp.

For example, here are [the messages that the Encouragement Dapp sends](https://github.com/Agoric/dapp-encouragement/blob/7f41c1bc09fc5f22707f6bdc2fb656fcb2cddbfa/ui/public/src/main.js#L97) over the wallet bridge:

```js
    // Our issuer will default to something like `Encouragement.Installation`.
    walletSend({
      type: 'walletSuggestInstallation',
      petname: 'Installation',
      boardId: INSTALLATION_HANDLE_BOARD_ID,
    });
    // Our issuer will default to something like `Encouragement.Instance`.
    walletSend({
      type: 'walletSuggestInstance',
      petname: 'Instance',
      boardId: INSTANCE_HANDLE_BOARD_ID,
    });
    // Our issuer will default to something like `Encouragement.Assurance`.
    walletSend({
      type: 'walletSuggestIssuer',
      petname: 'Assurance',
      boardId: ASSURANCE_ISSUER_BOARD_ID,
    });
 ``
