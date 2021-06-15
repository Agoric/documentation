// #region contractFormat
// @ts-check
// Checks the types as defined in JSDoc comments

// Add imports here

// Optional: you may wish to use the Zoe helpers in @agoric/zoe/src/contractSupport
import { swap as _ } from '@agoric/zoe/src/contractSupport';

// Import the Zoe types
import '@agoric/zoe/exported';

/**
 * [Contract Description Here]
 *
 * @type {ContractStartFn}
 */
const start = zcf => {
  // ZCF: the Zoe Contract Facet

  // Add contract logic here, including the
  // handling of offers and the making of invitations.

  // Example: This is an example of an offerHandler
  // which just gives a refund payout automatically.
  const myOfferHandler = zcfSeat => {
    zcfSeat.exit();
    const offerResult = 'success';
    return offerResult;
  };

  // Example: This is an invitation that, if used to make
  // an offer will trigger `myOfferHandler`, giving a
  // refund automatically.
  const invitation = zcf.makeInvitation(myOfferHandler, 'myInvitation');

  // Optional: Methods added to this object are available
  // to the creator of the instance.
  const creatorFacet = {};

  // Optional: Methods added to this object are available
  // to anyone who knows about the contract instance.
  // Price queries and other information requests can go here.
  const publicFacet = {};

  return harden({
    creatorInvitation: invitation, // optional
    creatorFacet, // optional
    publicFacet, // optional
  });
};

harden(start);
export { start };
// #endregion contractFormat
