# Escrow To Vote Contract

This contract is a test fixture, not a deployed demo contract under `src/contracts`.

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/test/unitTests/contracts/escrowToVote.js)

##### [View other test-fixture contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/test/unitTests/contracts/)

This contract implements coin voting. There are two roles: the
Secretary, who can determine the question (a string), make voting
invitations, and close the election; and the Voters, who can vote YES or
NO on the question. The voters can only get the capability to vote
by using a voter invitation to make an offer and escrowing assets. The
brand of assets is determined on contract instantiation through an
issuerKeywordRecord. The creator gets the only Secretary
access through the creatorFacet.
