# Parity Stability Module
<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/50cd3e240fb33079948fa03b32bda86276879b4a/packages/inter-protocol/src/psm/psm.js#L27) (Last updated: Sept 8, 2022)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

The Parity Stability Module supports efficiently minting/burning the chain's
stable token at a fixed ratio to an externally supplied stable token. The ability
to trade into and out of the chain's stable token at parity with an external token
will add stability to its value. The fee percentage for trading into and out of the
stable token are specified separately.

The external token must be provided to enable trading. The contract doesn't
keep any of the chain's stable token on hand. It is minted on demand, and
 burned when received.
