# `withOrchestration` API

`withOrchestration` is a higher-order function that enhances a contract function `contractFn` 
(usually the `start` function of the contract) with orchestration capabilities. It returns a
 new asynchronous function that accepts `zcf` (Zoe Contract Facet), `privateArgs`, and 
 `baggage`. In its definition, `provideOrchestration` sets up orchestration tools and returns 
 an object containing `zone` and other tools. The original `contractFn` is then called with 
 the enhanced arguments: `zcf`, `privateArgs`, `zone`, and the extracted tools. This effectively wraps `contractFn` with additional orchestration capabilities provided by `provideOrchestration`.

