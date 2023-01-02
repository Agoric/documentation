# Zoe Data Types

## BrandKeywordRecord

```js
// Record example
const brandKeywordRecord = {
  Asset: quatloosBrand,
  Price: moolaBrand,
};
```

## IssuerKeywordRecord 

```js
// Record example
const issuerKeywordRecord = {
  Asset: quatloosIssuer,
  Price: moolaIssuer,
};
```

## PublicFacet

????

## Invitation

These are the details exposed by E(zoe).getInvitationDetails():


- **installation** **Installation**: The contract's installation in Zoe.
- **instance** **Instance**: The contract instance this invitation is for.
- **invitationHandle** **Handle**: A handle used to refer to this invitation.
- **description** **String**: Describes the purpose of this **invitation**. Use it
   to match the invitation to the role it plays in the contract.


## InvitationIssuer

## Installation

## Instance

## Proposal

## OfferArgs

## Allocation

## PriceQuote

## Ratio


These functions let you apply a ratio (a fraction) to an amount, multiplying or
dividing an amount by a ratio of two natural numbers. Ratios consist of a
*numerator* and a *denominator*. Both of these consist of a value and a brand,
just like **amounts**. A ratio cannot have a denominator value of 0.

The ratio functions have to be imported.

The most common kind of **Ratio** is applied to an **Amount** of a particular brand
and produces results of the same brand.

**Ratios** can also have two brands, essentially typing them such as miles per
hour or US dollars for Swiss francs (an exchange rate ratio) (i.e. the numerator
is one brand and the denominator is another). Keep in mind that a ratio function
should make sense when used with a dual-branded ratio.

For example, when multiplying an amount by a ratio, the result has the ratio
numerator's brand.  So the amount should have the same brand as the ratio's
denominator to cancel it out; e.g. 5 gallons * (10 miles / 1 gallon) = 50
miles. Similarly, dividing an amount by a ratio returns a result amount with the
denominator's brand, so the amount should be the same brand as the numerator to
cancel it out.