// @jessie-check
/**
 * @file A real Zoe service and a real contract bundle, so that the
 *   eventual-send examples on main/guides/js-programming/eventual-send.md
 *   run against the API a core-eval script would actually call.
 */
import { makeZoeKitForTest } from '@agoric/zoe/tools/setup-zoe.js';
import bundleSource from '@endo/bundle-source';
import { createRequire } from 'module';

const myRequire = createRequire(import.meta.url);

const { zoeService } = await makeZoeKitForTest();

/** The Zoe Service a core-eval script receives among its permitted powers. */
export const zoe = zoeService;

/** A real bundle of a real contract, produced by `bundleSource()`. */
export const bundle = await bundleSource(
  myRequire.resolve('../zoe/src/offer-up.contract.js'),
);

/** The bundle identifier that names `bundle` to `installBundleID()`. */
export const bundleId = `b1-${bundle.endoZipBase64Sha512}`;
