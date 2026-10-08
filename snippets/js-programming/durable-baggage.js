// @jessie-check
/**
 * @file Stand-ins for the `baggage` MapStore a vat receives as the third
 *   argument to `buildRootObject`, so that the durable examples on the
 *   js-programming pages can run under AVA.
 *
 *   One baggage per example keeps the durable kinds each example defines from
 *   colliding with each other over a shared key space.
 */
import { makeScalarBigMapStore } from '@agoric/vat-data';

/** @param {string} label */
const makeBaggage = label =>
  makeScalarBigMapStore(label, { durable: true, keyShape: undefined });

export const exoBaggage = makeBaggage('exoBaggage');
export const zonesBaggage = makeBaggage('zonesBaggage');
export const notifiersBaggage = makeBaggage('notifiersBaggage');
export const vowsBaggage = makeBaggage('vowsBaggage');
