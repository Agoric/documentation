# Loan

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts/loan)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

The basic loan contract has two parties, a *lender* and a *borrower*.
It lets the borrower add collateral of a particular brand and get a
loan of another brand. The collateral (also known as margin) must be a
certain percentage of the loan value (the default is 150%). The exact
percentage required is defined by the Maintenance Margin Requirement
(`mmr`) in the terms of the contract.

The loan does not have a distinct end time. Rather, if the
value of the collateral changes such that insufficient margin is
provided, the collateral is liquidated, and the loan is closed. At any
time, the borrower can add collateral or repay the loan with interest,
closing the loan. 

Note that all collateral must be of the same brand and all of the
loaned amount and interest must be of the same (separate) brand.

## Terms
* `mmr` (default = 150) - the Maintenance Margin Requirement, in
   percent. The default is 150, meaning that collateral should be
   worth at least 150% of the loan. If the value of the collateral
   drops below `mmr`, liquidation can occur.
* [`priceAuthority`](/zoe/guide/price-authority.md) - used for getting the current value of
   collateral and setting liquidation triggers.
* `autoswapInstance` - The running contract instance for an
   [Autoswap](./autoswap.md) or [Multipool
   Autoswap](./multipoolAutoswap.md) installation. The `publicFacet`
   of the instance is used to make an invitation to sell the
   collateral on liquidation.
* `periodNotifier` - the [notifier](/distributed-programming.md#notifiers) used for notifications
   that a period has passed, on which compound interest will be
   calculated using the `interestRate`.
* `interestRate` - the rate in [basis points](https://www.investopedia.com/terms/b/basispoint.asp) that will be multiplied
   with the debt on every period to compound interest.
* `interestPeriod` - the period at which interest will be compounded.

## IssuerKeywordRecord

All keyword records use the following, regardless of their role in
the contract:

* Keyword: `Collateral` - The issuer/payment for the digital assets to be
   escrowed as collateral.
* Keyword: `Loan` - The issuer/payment for the digital assets to be loaned
   out.

## The Lender

The lender puts up the amount to be loaned to the borrower, but has no
further actions. The loan is ongoing until it is paid back entirely or
liquidated, at which point the lender receives a payout. This means
the lender's payout will be in Loan-branded digital assets,
not Collateral-brand. (The only exception is if the scheduling
of liquidation triggers with the `priceAuthority` results in a error. In
that case, we must give the collateral to the lender.
The borrower has already exited with their loan.)

The lender will want the loan interest in addition to either their refund
or the liquidation results. If the collateral price drops
before liquidation, the total payout could be zero.
Therefore, the lender cannot `want` anything in their proposal.

The lender must be able to exit on demand until borrowing occurs. If
the exit rule was `waived`, a borrower could hold on to their
invitation and effectively lock up the lender's escrowed loan amount
forever.

<<< @/snippets/zoe/contracts/test-loan.js#lend

## The Borrower

The borrower receives an invitation to join, makes an offer with Zoe
escrowing their collateral, and receives their loan. The collateral is
moved to an internal seat called the `collateralSeat`, and the borrower seat
is exited at this point so the borrower gets the payout of their loan.
The borrower also gets an object (`borrowFacet`) as their `offerResult` that
lets them continue interacting with the contract.

<<< @/snippets/zoe/contracts/test-loan.js#borrow

Once the loan starts, the borrower can repay the loan in its
entirety at any time (at which point the lender receives the loan amount back plus
interest, and the contract closes), or add more collateral to prevent
liquidation.

<<< @/snippets/zoe/contracts/test-loan.js#closeLoanInvitation

<<< @/snippets/zoe/contracts/test-loan.js#addCollateralInvitation

## Contract Shutdown

The contract shuts down under any one of 3 conditions:
1. The loan (plus interest) is repaid.
   * The lender gets the repayment and the borrower gets
    their collateral back.
2. The value of the collateral drops and the collateral must be
   liquidated.
   * The lender gets the outcome of the collateral sale, and the borrower keeps their loan.
3. An error occurs when trying to use the priceAuthority.
   * The lender gets the collateral, and the borrower keeps their loan.

## Debt and Interest Calculation 

Interest is calculated and compounded when the
`periodNotifier` pushes a new value. The interest rate per period
is defined by the `interestRate` parameter.

The `borrowFacet` has methods to get the current amount owed
(`E(borrowFacet).getRecentCollateralAmount()`), or get a
[notifier](/distributed-programming.md#notifiers) that will be updated when the debt
is recalculated. The contract also reveals the last timestamp at which debt was
recalculated: (`E(borrowFacet).getLastCalculationTimestamp()`).

## Scheduling Liquidation

Liquidation is scheduled using the `priceAuthority` parameter.
Specifically, the contract gets a promise resolved when the value of the
collateral falls below a trigger value defined by the `mmr` parameter: 

<<< @/snippets/zoe/contracts/test-loan.js#liquidate

The borrower can self-forewarn about a potential liquidation by setting up their own margin calls.
They do this by getting the [`priceAuthority`](/zoe/guide/price-authority.md) from the terms and calling:

<<< @/snippets/zoe/contracts/test-loan.js#customMarginCall

where `myWarningLevel` is the value of the collateral in the Loan brand at which they
want a reminder to add collateral.

## Liquidating

Actual liquidation is done through an Autoswap or Multipool Autoswap
instance, regardless of the current price within the Autoswap
instance. Even if the price is worse or better than what our `priceAuthority`
quoted, we still liquidate.

## Future directions
* Add ability to liquidate partially
* Add ability to withdraw excess collateral
* Add ability to repay partially
