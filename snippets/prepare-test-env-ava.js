/**
 * Like prepare-test-env but also sets up ses-ava and provides
 * the ses-ava `test` function to be used as if it is the ava
 * `test` function.
 */

// export { test } from '@agoric/swingset-vat/tools/prepare-test-env-ava.js';

// for VatData
import '@agoric/swingset-vat/tools/prepare-test-env.js';

import rawTest from 'ava';
import { wrapTest } from '@endo/ses-ava';

export const test = wrapTest(rawTest);
