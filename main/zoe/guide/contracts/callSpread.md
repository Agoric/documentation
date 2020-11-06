# Call Spread

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/callSpread.js) (Last updated: 03-NOV-2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

This contract implements a fully collateralized call spread. A call spread can be used as a
financial building block to create futures, puts, calls, and event binaries that would form the
basis for a prediction market, insurance, and much more. A Call Spread is a combination of a call
option bought at one strike price and a second call option sold at a higher price. That means there
are two parties to the call spread, each holding an ERTP asset that pays out complementary amounts
depending on the value of some good at a known future time.

The Zoe invitations representing the options are produced in pairs that represent the matching
assets.  The purchaser deposits the entire amount that will be approtioned between the holders of
the two positions. The individual options are ERTP invitations that are suitable for resale.

This option is settled financially. There is no requirement that the original purchaser have
ownership of the underlying asset at the start, and the beneficiaries shouldn't expect to take
delivery at closing.

It is common for the strike price and collateral to use the same currency, though this contract
decouples them. This would be like a spread based on the price of APPL stock (`Underlying`),
where the stock price is measured in USD (`Strike`), but the contract pays out in JPY
(`Collateral`).

The issuerKeywordRecord specifies the issuers for four keywords: Underlying, Strike, Collateral,
and Quote. The original deposit and the payout are in Collateral. Strike amounts are used for the
price oracle's quote as to the value of the Underlying, as well as the strike prices in the
terms. The priceAuthority's quotes are ERTP assets issued by a QuoteAuthority, which must be
specified using the keyword Quote.

The terms include { timer, underlyingAmount, expiration, priceAuthority, strikePrice1,
strikePrice2, settlementAmount }. `timer` must be recognized by `priceAuthority`. `expiration` is a
time recognized by the `timer`. `underlyingAmount` is passed to `priceAuthority`, so it could be an
NFT or a fungible amount. `strikePrice2` must be greater than `strikePrice1`. `settlementAmount`
uses Collateral.

<<< @/snippets/zoe/contracts/test-callSpread.js#startInstance

The terms specify all the details of the options that will be created, but the options are not
handed out until the creator funds the collateral that will make them valuable.  The
creatorInvitation has customProperties that include the amounts of the two options as longAmount
and shortAmount.

<<< @/snippets/zoe/contracts/test-callSpread.js#invitationDetails

The funder can use these option amounts to create an offer that assures them they will get the two
options in exchange for the funds. The proposal describes the options they want and the collateral
they give. When the offer is made they get a payout that contains the two option positions, which
are themselves invitations which can be exercised for free, and provide the option payouts with the
keyword Collateral.

<<< @/snippets/zoe/contracts/test-callSpread.js#creatorInvitation

The options that are returned by the contract are Zoe invitations, so their values and terms can be
verified by asking Zoe for the contract terms.  This makes it possible to sell the options because
a prospetive purchaser can inspect their value. The prospective purchaser can verify the underlying
amount, and check to see that the priceAuthority is one they are willing to rely on. They can check
the expiration to see that it matches their expectations (here it's a small integer suitable for a
manual timer in a test; in actual use, it would represent block height or wall clock time.) The
strike prices and settlement amount are likewise visible.

<<< @/snippets/zoe/contracts/test-callSpread.js#verifyTerms

The contract doesn't rely on the options being exercised before the specified close. If either
option is exercised after the closing price is determined, the payouts will still be available. The
two options make their payment available as soon after exercise as the price is available, and
neither waits for the other to exercise.

<<< @/snippets/zoe/contracts/test-callSpread.js#bobExercise

There is a
[unit test](https://raw.githubusercontent.com/Agoric/agoric-sdk/master/packages/zoe/test/unitTests/contracts/test-callSpread.js)
(search for "sell options") that demonstrates how these options could be offered using the
SimpleExchange contract.
