# The Chainlink Oracle Query Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/oracle.js) (Last updated: 5-NOV-2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

This contract allows other contracts or users to make queries to an
external oracle. The queries can be free, or require a fee. 

## Making a Free Query

To make a free query, obtain the `publicFacet` for the oracle contract
instance. 

<<< @/snippets/zoe/contracts/test-oracle.js#freeQuery

The `query` that is passed in could be in any format that the
oracle accepts. The response can be in any format, as the oracle determines.

## Making a Paid Query

To make a query that requires payment, obtain the `publicFacet` as
before, but this time, make a `queryInvitation`. Use the
`queryInvitation` to make an offer and escrow the required payments in
the `Fee` brand. The response will be the result of your offer.

<<< @/snippets/zoe/contracts/test-oracle.js#paidQuery

## Instantiating a New Oracle Contract

If you want to create your own oracle contract instance, first bundle
and install the code if it is not already installed.

<<< @/snippets/zoe/contracts/test-oracle.js#bundle

Then start the contract instance. You will receive a `publicFacet` and
a `creatorFacet`.

<<< @/snippets/zoe/contracts/test-oracle.js#startInstance

You will need to use the creatorFacet to initialize an
`oracleHandler`. The `oracleHandler` is what will actually be queried,
so we do not want to put it in the contract terms, which are publicly
accessible. 

<<< @/snippets/zoe/contracts/test-oracle.js#initialize

## The Oracle Handler API

The contract expects all `oracleHandlers` to offer the following API:

<<< @/snippets/zoe/contracts/test-oracle.js#API



