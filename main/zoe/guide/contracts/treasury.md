# Treasury contract

The Treasury is the primary mechanism for making `RUN` (the Agoric stable-value
currency) available to participants in the economy. It does this by issuing
loans against supported types of collateral. The creator of the contract can
add new types of collateral. (This is expected to be under the control of
on-chain governance after the initial currencies are defined when the contract
starts up.)

## Borrowers

Borrowers open a **vault** by calling `makeLoanInvitation()`in the publicAPI to
get an invitation. Their proposal specifies that they're giving a recognized
collateral type, and how much `RUN` they want in return. The contract is
parameterized with a collateralization rate per currency and borrowers can
withdraw up to that ratio. Other parameters control the interest rate. (Interest
will be automatically added to the vault's debt.) The contract also has
access to a priceAuthority, which is an oracle monitoring the exchange value of
the collateral. If the value of a borrower's collateral ever falls below the
minimum ratio, the vault will be liquidated. The liquidation approach is
pluggable and will be modifiable under the control of governance.

When borrowers exercise an invitation and deposit collateral, they receive a
`Vault` object and some tools useful to the wallet from the offerResults. The
`Vault` has these methods: `{ makeAdjustBalancesInvitation, makeCloseInvitation,
getCollateralAmount, getDebtAmount, getLiquidationSeat, getLiquidationPromise
}`.

An `AdjustBalancesInvitation` allows the borrower to add or remove collateral
or increase or decrease the loan balance.  `CloseInvitation` allows the
borrower to close their loan and withdraw any remaining collateral.  The
`liquidationPromise` allows the borrower to find out if/when the loan gets
liquidated. The `liquidationSeat`'s `getPayoff()` or `getPayoffs()` allow the
borrower to retrieve any proceeds above what's needed to repay the debt.
`getCollateralAmount()` and `getDebtAmount()` reveal the named balances.

### adjustBalances

The borrower can adjust their collateral and debt levels by exercising an
`AdjustBalancesInvitation` with a proposal that specifies the amount of
`Collateral` and `RUN` that they will give and that they want (either keyword
can be in either position.) As long as the resulting balances would not violate
the required ratios and the withdrawals are within the loan's current balance,
the adjustments will be made. If the debt balance increases, `loanFee`
multiplied by the incremental debt will be added to the debt balance.

### closeInvitation

The borrower can close their loan by exercising a `closeInvitation`. The
borrower must give at least the current `debtAmount` in order to close out the
loan and retrieve their collateral. Since any excess will be returned, it is
safe to overpay to cover variations in pricing.

### Interest and liquidation

Parameters (subject to governance) specific to each collateral type set the
interest rate and required collateralization ratio.

The `liquidationMargin` is the `collateralizationRatio` required to open a vault
and keep it open. If the ratio of current value of collateral (according to the
`priceAuthority`, currently driven by the AMM) to the outstanding debt falls
below `liquidationMargin`, the collateral will be sold off, the debt repaid, and
any remainder returned to the borrower. So it's prudent for borrowers to
over-collateralize so that price volatility and interest charges don't quickly
drive their loans into default.

The `loanFee` (in basis points) is charged on the amount of `RUN` issued when
opening a loan or increasing the amount of a loan.  The `interestRate` is an
annual rate.

`ChargingPeriod` and `recordingPeriod` are parameters of the Treasury that apply
to all loans. They can be adjusted (by governance) to change how frequently
interest is accrued, and how frequently interest is compounded.

#### UI support

The following are returned in `offerResults` when calling `openLoan` for the
benefit of the user's [wallet](/guides/wallet/).

     uiNotifier,
     invitationMakers: { AdjustBalances, CloseVault }

## Adding Collateral types

The creatorFacet has a method `addVaultType()` that allows someone to add new
collateral types and specify the parameters for its loans.

## Implementation detail

### Vats

Currently the treasury runs all the `vaults` in a single vat. We intend to split
the `vaults` into separate vats for better isolation. In order to allow the
liquidation approach to be pluggable and to be visible to and changeable by
governance, liquidation takes place in a separate vat.

### Invitations

#### makeLoan

The treasury's public API includes `makeLoanInvitation()` and
`getCollaterals()`, as well as `getAMM()` and `getRunIssuer()`.
`getCollaterals()` returns a list of the collateral types that are accepted.
`getAmm()` returns the public facet of the AMM. `getRunIssuer()` provides access
to the issuer of `RUN` so anyone can hold, spend and recognize RUN.
`makeLoanInvitation()` is described above under [Borrowers](#borrowers)

### Roadmap

 * Finer control over liquidation: we think liquidation should be sensitive to
  market depth and trade volumes.
 * Vaults in individual Vats: for better isolation and security, we want to put
  each vault in a separate vat.
 * Limits on RUN issued per collateral type: limiting the amount of RUN that
   can be issued for each collateral might blunt some attacks
 * Adding new collateral types will be made subject to governance rather
   than being included in the creatorFacet.
