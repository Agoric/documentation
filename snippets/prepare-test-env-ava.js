/**
 * Like prepare-test-env but also sets up ses-ava and provides
 * the ses-ava `test` function to be used as if it is the ava
 * `test` function.
 */

import '@agoric/zoe/tools/prepare-test-env.js';
// eslint-disable-next-line import/no-unresolved -- https://github.com/avajs/ava/issues/2951
import rawTest from 'ava';
// eslint-disable-next-line import/no-extraneous-dependencies
import { wrapTest } from '@endo/ses-ava';

export const test = wrapTest(rawTest);
