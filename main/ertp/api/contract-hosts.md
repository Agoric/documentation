# Contract Hosts

ContractHost provides a way to install and run verifiable contracts.

Install(source) creates Installations. Installations represent particular
contract forms, which can be spawn()'d to create Contract instances
initialized with specific terms. These Contracts manage invitations for
multiple seats, each of which repesents a "role" in an interaction.

Some seats provide the methods `getWinnings()` and `getRefunds()`, which return
promises for payments for the outputs of the interaction. We provide the
`collect()` method (described later) to simplify collection of winnings and
refunds into appropriate purses.

## contractHost.install(contractSrc)
- `contractSrc` `{String}` - contractSrc is the source code for a Contract. See Contract for details.
- Returns: `{Installation}`

Install the source code for a Contract.

```js
const someEscrowInstallation = E(someHost).install(someEscrowExchangeSrc);
```

## contractHost.getInstallationSourceCode(installation)
- `installation` `{Installation}`
- Returns: `{String}`

Get the actual source code of the Installation.

```js
const theSourceCode = E(someHost).getInstallationSourceCode(someInstallation);
```

## contractHost.redeem(invite)
- `invite` `{Payment}`
- Returns: `{Object}`

Seat invitations are packaged as payments from the Invite Assay. Redeeming an invite returns a seat object with an arbitrary interface (the interface is at the discretion of the contract) which supports interaction according to the terms.

```js
const someSeat = E(someHost).redeem(someInvite);
```

## contractHost.getInviteAssay()
- Returns: `{Assay}`

The assay allows holders of seat invitations to get exclusive access to a Seat.

```js
const assayWithExclusiveAccess = E(someHost).getInviteAssay();
```

## installation.spawn(terms)
- `terms` `{Terms}`
- Returns: `{Invites <Object>}`

Create a new `InviteMaker`, then call the Contract's `start()` method and return its results. The results are often a collection of seat invitations for the seats in the contract, but see [`coveredCall`](https://github.com/Agoric/ERTP/blob/master/core/coveredCall.js) for an exception.

```js
import harden from '@agoric/harden';

const terms = harden({ left: whatPartyAWants, right: whatPartyBWants });
const invitePayments = E(someInstallation).spawn(terms);
```

## installation.checkUnits(installation, inviteUnits, terms)
- `installation` `{Installation}`
- `inviteUnits` `{Units}`
- `terms` `{Terms}`

The writer of the contract can provide methods to help users of the contract verify that the terms of the contract match their expectation. These methods are defined with the installation as the first parameter, so the verifiers can validate that the caller's invitation was issued by the same one. The invocation by clients should omit this parameter, as they will be supplied with a copy of the function with that information already supplied.

Users usually want to validate their invitation, the terms of the deal they're attempting to participate in, and which seat they are taking. If the invitation is invalid `checkUnits()` will throw an error.

```js
// If `allegedInviteUnits` is valid and matches the terms of the
// contract, then the code will continue as expected.
// Otherwise, `checkUnits()` will throw an error.
E(escrowExchangeInstallationP)
  .checkUnits(allegedInviteUnits, { left, right }, 'left')
  .then(() => {
    return E(inviteAssayP).claimExactly(
      allegedInviteUnits,
      allegedInvitePaymentP,
      'verified invite',
    );
  });
  ```

## contract.start(terms, inviteMaker)
- `terms` `{Terms}`
- `inviteMaker` `{InviteMaker}`
- Returns: `{Object}`

Start execution of the contract. May return invites for seats.

### <span style="color:red">Need help writing/checking example.</span>
```js
import harden from '@agoric/harden';

const aNewContract = harden({
  start: (terms, inviteMaker) => {
    // add contract code
  }
})

export { aNewContract }

// Now, `aNewContract` can be imported into other parts of your code
// and used as an Installation using `contractHost.install(aNewContract)`
// Also, see `installation.spawn()` above.
```

## inviteMaker.make(seatDesc, seat, name)
- `seatDesc` `{String}` - Must be unique for each contract instantiation.
- `seat` `{Object}` - An arbitrary object defined by the contract.
- `name` `{String}` - Labels the invite payment for this seat. Optional.
- Returns: `{Payment}`

### <span style="color:red">No description in chainmail file. Please double check that this description makes sense.</span>
Creates a payment for an invite for a seat in a contract. The returned Payment can be passed to `contractHost.redeem()` to get a seat Object.

```js
import harden from '@agoric/harden';

const aNewContract = harden({
  start: (terms, inviteMaker) => {
    // other contract code
    const someSeat = harden({
      // code for this seat
    })
    return inviteMaker.make('writer', someSeat)
  }
})
```

## collector.collect(seatP, winPurseP, refundPurseP, name)
- `seatP` `{Object}`
- `winPurseP` `{Purse}`
- `refundPurseP` `{Purse}`
- `name` `{String}` - Default: 'collecting'
- Returns: `{winsAndRefunds <Object>}`

`collect()` calls `getWinnings()` and `getRefund()` on `seatP` and deposits the proceeds respectively into `winPurseP` and `refundPurseP`. `name` (which defaults to 'collecting') is converted to a String, and used for logging the results.

```js
const purseA = assayA.makeEmptyPurse();
const purseB = assayB.makeEmptyPurse();
const seatP = E(someHost).redeem(someInvite);

collect(seatP, purseA, purseB, 'a log message');
```