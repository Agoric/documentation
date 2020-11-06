# Oracle API

## makeOracleKit()
- Returns: `{ OracleKit }`

Makes a new oracle and its associated objects; a `creatorFacet`, a `publicFacet`, 
an `instance`, and a `creatorInvitation`. The two facets are facets of the Oracle object.

## OracleCreatorFacet 

The `OracleCreatorFacet` consists of the private methods accessible from the contract instance.

- `getCurrentFees()`
  - Returns: `{ AmountKeywordRecord }`
  - Gets the current fee amounts.
- `makeWithdrawInvitation(total)`
  - `total`: `{ boolean }`
  - Returns: `{ ERef<Invitation> }`   **tyg todo: Not sure what the ERef designates**
  - Create an invitation to withdraw fees.
- `makeShutdownInvitation()`
  - Returns `{ Promise<Invitation> }`
  - Make an invitation to withdraw all fees and shutdown.

## OraclePublicFacet

The `OraclePublicFacet` consists of the public methods accessible from the contract instance.

- `makeQueryInvitation(query)`
  - `query`: `{ any }`
  - Returns: `{ ERef<Invitation> }`   **tyg todo: Not sure what the ERef designates**
  - Creates an invitation for an oracle query.
- `query(query)`
  - `query`: `{ any }`
  - Returns `{ ERef<any> }}`
  - Make an unpaid query. 

## OracleInitializationFacet

This facet has one method, that initializes an oracle.

- `initialize(privateParams)`
  - `privateParams`: `{ OraclePrivateParameters }`
  - Returns: `{ OracleCreatorFacet }`

Take a set of Oracle private parameters and returns an OracleCreatorFacet.
**tyg todo: When should you use this, and when should you use OracleKit?**
OraclePrivateParameters consist of an OracleHandler object. 

## OracleHandler
An `OracleHandler` has three methods that specify how an oracle reacts to events.
- `onQuery(query, fee)` 
  - `query`: `{ any }`
  - `fee`: `{ Amount }`
  - Returns:  `{ Promise<{ reply:  any, requireFee: Amount }> }`
  - Callback to reply to a query
- `onError(query, reason)`         
  - `query`: `{ any }`
  - `reason`: `{ any }`
  - Returns: `void`
  - Notice an error 
- `onReply(query, reply)`  
  - `query`: `{ any }`
  - `reason`: `{ any }`
  - `requiredFee`: `{ Amount }`
  - Returns: `void`
  - Notice a successful reply

## OracleAdmin
 An `OracleAdmin` has two associated methods.

- `delete()`
  - Returns: `{ Promise<void> }`
  - Remove the oracle from the aggregator.
- `pushResult(result)`
  - `result`: `{ any }`
  - Returns: `{ Promise<void> }`
  - Push a result directly from this oracle, rather than waiting for the polling query.

## PriceAggregator Object

A `PriceAggregator` has two facets.

- `PriceAggregatorCreatorFacet`
  - `initializeQuoteMint(quoteMint)`
    - `quoteMint`: `{ Mint }`
    - Returns: `{ Promise<void> }`
  - `initOracle(oracleInstance, query)`
    - `oracleInstance`: `{ Instance }`
    - `query`: `{ any }`
    - Returns: `{ Promise<OracleAdmin> }`
- `PriceAggregatorPublicFacet`
  - `getPriceAuthority()`
    - Returns: `{ PriceAuthority }`

## OracleStartFnResult. **tyg todo: Unclear where this gets used**

An `OracleStartFnResult` object has four properties:
- `creatorFacet`: `{ OracleInitializationFacet }`
- `publicFacet`: `{ OraclePublicFacet }`
- `instance`: `{ Instance }`
- `creatorInvitation`: `{ Invitation }`

## PriceAuthority

A `PriceAuthority` is an object that mints `PriceQuotes` and handles triggers and notifiers for changes in the price.

### getQuoteIssuer(brandIn, brandOut)
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ ERef<Issuer> }`
- Gets the ERTP Issuer of PriceQuotes for a given brandIn/brandOut pair. 
### getTimerService(brandIn, brandOut)
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ ERef<TimerService> }`
- Gets the timer used in PriceQuotes for a given brandIn/brandOut pair. 

### getPriceNotifier(brandIn, brandOut)
- `brandIn`: `{ Brand }`
- `brandOut`: `{ Brand }`
- Returns: `{ ERef<Notifier<PriceQuote>> }`
- Be notified of the latest PriceQuotes for a given brandIn/brandOut pair. 
  Note that these are raw quotes, and not for a standarized amountIn or amountOut. 
  Since they are not scaled, a PriceAuthority can implement quotes for both fungible 
  and non-fungible brands. 

### quoteAtTime(deadline, amountIn, brandOut)
- `deadline`: `{ Timestamp }`
- `amountIn`: `{ Amount }`
- `brandOut`: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Resolves after `deadline` passes on the `priceAuthority`’s `timerService` with the price quote of `amountIn` at that time. 

### quoteGiven(amountIn, brandOut)
- `amountIn: `{ Amount }`
- `brandOut: `{ Brand }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote corresponding to `amountIn`.

### quoteWanted(brandIn, amountOut)
- `brandIn`: `{ Brand }`
- `amountOut`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Get a quote corresponding to `amountOut`.

###  quoteWhenGT(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolver when a price quote of `amountIn` exceeds `amountOutLimit`.

### quoteWhenGTE(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolver when a price quote of `amountIn` reaches or exceeds `amountOutLimit`.

### quoteWhenLT(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolver when a price quote of `amountIn` drops below `amountOutLimit`.

### quoteWhenLTE(amountIn, amountOutLimit)
- `amountIn`: `{ Amount }`
- `amountOutLimit`: `{ Amount }`
- Returns: `{ Promise<PriceQuote> }`
- Resolver when a price quote of `amountIn` reaches or drops below `amountOutLimit`.



