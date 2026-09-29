// @jessie-check
/* eslint-disable import/newline-after-import --
   the excerpted region reproduces the page's two-line example exactly.
   See CONTRIBUTING.md "Provenance of inline code examples". */
/**
 * @file The plain PublishKit example excerpted by
 *   main/guides/js-programming/notifiers.md.
 */
// #region makePublishKitExample
import { makePublishKit } from '@agoric/notifier';
const { publisher, subscriber } = makePublishKit();
// #endregion makePublishKitExample

export { publisher, subscriber };
