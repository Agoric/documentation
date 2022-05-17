# Fees and Metering

Note: We recently started charging fees for using Zoe. The design is still
on-going and the following details may change.

Fees are charged in
RUN, our stable local currency. These are the Zoe methods that charge
fees:

* `install()`
* `startInstance()`
* `offer()`
* `getPublicFacet()`

The specific amount charged for each method can be queried with
`E(zoe).getConfiguration()`, which returns a promise for an object. On
that object, the `zoeFeesConfig` property gives the fee values in the
smallest unit of RUN. 
(The unit of RUN displayed in the wallet and in dapps is
10^`decimalPlaces`, usually 10^6).

An example of `zoeFeesConfig`:
```
zoeFeesConfig: {
  getPublicFacetFee: 50n,
  installFee: 65000n,
  startInstanceFee: 5000000n,
  offerFee: 65000n,
  timeAuthority: chainTimerServiceP,
  lowFee: 500000n,
  highFee: 5000000n,
  shortExp: 300000n,
  longExp: 86400000n,
},
```
Note: the `n` is appended to the end of the integer literal to make a
bigint. Bigints are used for arbitrarily large values and therefore
are much safer
than integers.

## Paying Fees and Fee Purses

In order to pay fees, you must create a fee purse. An empty fee purse can be
created by calling `E(zoe).makeFeePurse()`. For users on the
testnet/devnet/local development, a fee purse has been created for you
already, and is in your wallet.

A fee purse can be charged in two ways. It can be passed directly to
a Zoe method as the last argument, or it can be "bound" to Zoe such
that any call made using the returned Zoe will charge the fee purse,
without needing to pass it in.

To bind a fee purse to Zoe, call:

```js
const myZoe = E(zoe).bindDefaultFeePurse(feePurse);
```

Fees must be paid in RUN, so please make sure that your fee purse has
a balance of RUN that is sufficient for paying fees.

## Metering and Paying for Execution

Fees are used to pay for the ongoing execution of contract code.
Specifically, the fee purse that the contract owner uses when calling
`E(zoe).startInstance()` will be charged ongoing fees for chunks of execution.

Execution is measured in `computrons` at the JavaScript engine level
(we use [XS](https://github.com/Moddable-OpenSource/moddable#modern-software-development-for-microcontrollers)),
and Zoe charges a fee per computron. Zoe uses a kernel-level
concept called a `meter` to keep records of how many computrons have
been paid for, and how many have been used up. When execution uses up
the paid-for computrons, Zoe refills the
meter with computrons by charging a fee to the fee purse.

Contract owners must add RUN to their fee purse on a regular basis to pay for the ongoing
execution. The next section explains how contract owners can transfer
some of the costs to users.

## Charging Users of Your Contract

To recoup the costs of execution, you can use Zoe to charge your users
fees. To do so, when making an invitation in contract code, you can
specify a fee in relative terms. For example, in the AMM, the SwapIn
invitation specifies a low fee and a short expiry:

```js
  const makeSwapInInvitation = () =>
    zcf.makeInvitation(
      swapIn,
      'autoswap swapIn',
      undefined,
      LOW_FEE,
      SHORT_EXP,
    );
```

`LOW_FEE` is a constant understood by Zoe. It will be translated by
Zoe from a relative description into an amount of RUN, such that the
invitation that a user receives has the additional details where `fee`
is an amount of RUN and `expiry` is a timestamp:

```js
{ fee, expiry, zoeTimeAuthority }
```

The relative fee specified by contract code can be either LOW_FEE or
HIGH_FEE, and the expiry can be SHORT_EXP or LONG_EXP. 

The translation from relative fees and expiries to absolute fees and
expiries can be altered when Zoe is created by changing `lowFee`,
`highFee`, `shortExp`, and `longExp` in `zoeFeesConfig`.

When a user makes an offer, Zoe checks whether the `expiry` in the
invitation has passed and then charges the fee specified in the invitation. This fee,
unlike the other fees, is deposited directly into the feePurse for the
contract owner. This makes it easier for the contract owner to
guarantee that they can pay for the execution of their contract.

## Troubleshooting

If you are experiencing problems running
dapps, please make sure your fee purse has enough RUN to pay fees.
