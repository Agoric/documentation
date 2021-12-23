# Endo, Hardened JavaScript, and SES

The Agoric platform includes a *SES (Secure ECMAScript)* shim, (a library that
extends JavaScript to include Hardened JavaScript features) for writing secure
smart contracts in JavaScript.
SES is a JavaScript runtime library for safely running third-party code.
What Node.js does for JavaScript, Endo does for Hardened JavaScript.

Our documentation consists of two primary documents:
- [Guide](./ses-guide.md): Intended for
  initial reading when starting to use or learn
  about Agoric. It provides relatively detailed background information on
  how and why SES works so that you'll get a greater understanding of what's
  going on.
- [Reference](./ses-reference.md): Intended for those knowledgeable about or experienced with
  SES. Use this if you just want to see or remind yourself of what SES can do
  and how to use it without much explanation.

The SES Guide points to a third document, [Lockdown](./lockdown.md). It describes
the SES function `lockdown()` and its optional settings.
