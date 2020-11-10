# Loan

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts/loan)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

The basic loan contract allows a  borrower to add collateral of a
particular brand and get a loan of another brand. The collateral (also
known as margin) must be greater than the loan value, at an amount set
by the Maintenance Margin Requirement (mmr) in the terms of the
contract.

The loan does not have a distinct end time. Rather, if the
value of the collateral changes such that insufficient margin is
provided, the collateral is liquidated, and the loan is closed. At any
time, the borrower can add collateral or repay the loan with interest,
closing the loan. The borrower can set up their own margin calls by
getting the [`priceAuthority`](/zoe/guide/price-authority.md) from the terms and calling
`E(priceAuthority).quoteWhenLT(allCollateral, x)` where x is the value
of the collateral in the Loan brand at which they want a reminder to
addCollateral.

Note that all collateral must be of the same brand and all of the
loaned amount and interest must be of the same (separate) brand.

## Terms
* `mmr` (default = 150) - the Maintenance Margin Requirement, in
   percent. The default is 150, meaning that collateral should be
   worth at least 150% of the loan. If the value of the collateral
   drops below `mmr`, liquidation occurs.
* [`priceAuthority`](/zoe/guide/price-authority.md) - will be used for getting the current value of
   collateral and setting liquidation triggers.
* `autoswapInstance` - The running contract instance for an
   [Autoswap](./autoswap.md) or [Multipool
   Autoswap](./multipoolAutoswap.md) installation. The `publicFacet`
   of the instance is used for producing an invitation to sell the
   collateral on liquidation.
* `periodAsyncIterable` - the [asyncIterable](https://javascript.info/async-iterators-generators) used for notifications
   that a period has passed, on which compound interest will be
   calculated using the `interestRate`.
* `interestRate` - the rate in [basis points](https://www.investopedia.com/terms/b/basispoint.asp) that will be multiplied
   with the debt on every period to compound interest.

## IssuerKeywordRecord

The following is used for all keyword records, regardless of role in
the contract:

* Keyword: 'Collateral' - The issuer/payment for the digital assets to be
   escrowed as collateral.
* Keyword: 'Loan' - The issuer/payment for the digital assets to be loaned
   out.

## The Lender

The lender puts up the amount to be loaned to the borrower, but has no
further actions. The loan is ongoing until it is paid back entirely or
liquidated, at which point the lender receives a payout. This means
that the payout for the lender will be in Loan-branded digital assets,
not Collateral-brand. (The only exception to this is if the scheduling
of liquidation triggers with the `priceAuthority` results in a error. In
that case, we have no choice but to give the collateral to the lender.
The borrower has already exited with their loan.)

The lender will want the interest earned from the loan + their refund
or the results of the liquidation. If the price of collateral drops
before we get the chance to liquidate, the total payout could be zero.
Therefore, the lender cannot `want` anything in their proposal.

The lender must be able to exit on demand until borrowing occurs. If the exit rule was
`waived`, a borrower would be able to hold on to their invitation and
effectively lock up the lender's Loan forever.  When the borrowing
occurs, the collateral is moved to a special collateral seat to
prevent the lender from being able to exit with collateral before the
contract ends through repayment or liquidation.

## The Borrower

The borrower receives an invitation to join, makes an offer with Zoe
escrowing their collateral, and receives their loan. The borrower seat
is exited at this point so the borrower gets the payout of their loan,
but the borrower also gets an object (`borrowFacet`) as their `offerResult` that will
let them continue to interact with the contract.

Once the loan has started, the borrower can repay the loan in its
entirety (at which the lender receives the loan amount back plus
interest and the contract closes), or add more collateral to stave off
liquidation.

## Contract Shutdown

The contract will shutdown under 3 conditions:
1. The loan (plus interest) is repaid.
  * In this case the lender gets the repayment and the borrower gets
    their collateral back.
2. The value of the collateral drops and the collateral must be
   liquidated.
   * In this case the lender gets the outcome of the sale of the
     collateral, and the borrower still keeps their loan.
3. An error occurs when trying to use the priceAuthority.
   * In this case the lender gets the collateral, and the borrower
     keeps their loan.

## Debt and Interest Calculation 

Interest is calculated and compounded when the
`periodAsyncIterable` pushes a new value. The interest rate per period
is defined by the `interestRate` parameter.

## Scheduling Liquidation

Liquidation is scheduled using the `priceAuthority` parameter.
Specifically, the contract gets a promise resolved when the value of the
collateral falls below a particular trigger value defined by the `mmr`
parameter: 

```js
  const internalLiquidationPromise = E(priceAuthority).quoteWhenLT(
    allCollateral,
    liquidationTriggerValue,
  );
  internalLiquidationPromise.then(liquidate);
```

The borrower can set up their own margin calls to be forewarned of a
potential liquidation by
getting the [`priceAuthority`](/zoe/guide/price-authority.md) from the terms and calling
`E(priceAuthority).quoteWhenLT(allCollateral, x)` where x is the value
of the collateral in the Loan brand at which they want a reminder to
addCollateral.

## Liquidating

Actual liquidation is done through an Autoswap or Multipool Autoswap
instance, regardless of the current price within the Autoswap
instance. Even if the price is worse or better than what our `priceAuthority`
quoted, we still liquidate.

## Future directions
* Add ability to liquidate partially
* Add ability to withdraw excess collateral
* Add ability to repay partially
