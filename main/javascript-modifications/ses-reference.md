# SES Reference

This document describes SES (Secure ECMAScript) affects writing Agoric JavaScript code. 
It is very much a "how to do something" document, with little explanation about why and
how something was implimented or other background information. For that, see the more
comprehensive [SES Guide](./ses-guide.md).

## Removed by SES summary

The following are missing or unusable under SES:
- Most [Node.js-specific global objects](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html) 
- All [Node.js built-in modules](https://nodejs.org/dist/latest-v14.x/docs/api/) such as `http` and 
  `crypto`. 
- [Features from browser environments](https://developer.mozilla.org/en-US/docs/Web/API) presented as names in the global scope including `atob`, `TextEncoder`, and `URL`.
- HTML comments
- Dynamic `import` expressions
- Direct evals

## Added/Changed by SES summary

SES adds the following to JavaScript or changes them significantly: 
- console
- `HandledPromise()` 	
- `Compartment`
- `lockdown()`
- `harden()`
- `globalThis` is frozen.
- JavaScript primordials are frozen.


## `lockdown()`

`lockdown()` tamper-proofs all of the JavaScript intrinsics, so no program can subvert their methods
(preventing some man in the middle attacks). Also, no program can use them to pass notes to parties
that haven't been expressly introduced (preventing some covert communication channels).

Lockdown *freezes* all JavaScript defined objects accessible to any program in the realm. The frozen 
accessible objects include but are not limited to: 
- `globalThis`
- `[].__proto__`
- `{}.__proto__`
- `(() => {}).__proto__ (async () => {}).__proto__`
- The properties of any accessible object

`lockdown()` also *tames* some objects, such as:
- Regular expressions
  - A tamed RexExp does not have the deprecated compile method.
- Locale methods
  - Lockdown replaces locale methods like `String.prototype.localeCompare()` with lexical 
    versions that do not reveal the user locale.
- Errors
  - A tamed error does not have a V8 stack, but the console can still see the stack.
  Lockdown replaces locale methods like 
```js
import 'ses';
import 'my-vetted-shim';

lockdown();

console.log(Object.isFrozen([].__proto__));
// true
```
Lockdown does not erase any powerful objects from the initial global scope. Instead, 
Compartments give complete control over what powerful objects exist for client code.

## `lockdown()` vs. `harden()`

`lockdown()` and `harden()` essentially do the same thing; freeze objects so their 
properties cannot be changed. You can only interact with frozen objects through 
their methods. Their differences are what objects you use them on, and when you use them.

`lockdown()` **must** be called first. It hardens JavaScript's built-in *primordials* 
(implicitly shared global objects) and enables `harden()`. Calling `harden()` 
before `lockdown()` excutes throws an error.

`lockdown()` works on objects created by the JavaScript language itself as part of 
its definition. Use `harden()` to freeze objects created after `lockdown()`was called;
i.e. objects created by your JavaScript code. 

## `lockdown` Options

### Default `safe` settings

All four of these safety-relevant options default to `safe` if omitted 
from a call to `lockdown()`. Their other possible value is `unsafe`.
- `regExpTaming`
- `localeTaming`
- `consoleTaming`
- `errorTaming`

The tradeoff is safety vs compatibility with existing code. However, much legacy
JavaScript code does run under SES, even if both not written to do so and with all
the options set to `safe`. Only consider an `'unsafe'` value if you both need it 
and can evaluate its risks. These are described in more detail below.

### Options quick reference

This section provides a quick usage reference for lockdown's options, their possible
values, and their usage. Each is described in more detail in their individual sections
below.

<table>
  <tbody>
  <tr>
    <td><center<b>Option</b></center></td>
    <td><center<b>Values</b></center></td>
    <td><center><b>Functionality</b></center></td>
  </tr>
  <tr>
    <td><code>regExpTaming</code></td>
    <td><code>'safe'</code> (default) or <code>'unsafe'</code></td>
    <td><code>'safe'</code> disables all <code>RegExp.*</code> methods,<br>
        <code>'unsafe'</code> disables all but <code>RegExp.prototype.compile()</td>
  </tr>
    <tr>
    <td><code>localeTaming</code></td>
    <td><code>'safe'</code> (default) or <code>'unsafe'</code></td>
    <td><code>'safe'</code> aliases <code>toLocaleString()</code> to <code>toString()</code>, etc.,<br>
        <code>'unsafe'</code> keeps JavaScript locale methods as is</td>
  </tr>
  <tr>
    <td><code>consoleTaming</code></td>
    <td><code>'safe'</code> (default) or <code>'unsafe'</code></td>
    <td><code>'safe'</code> wraps start console to show deep stacks,<br>
        <code>'unsafe'</code> uses the original start console.</td>
  </tr>
  <tr>
    <td><code>errorTaming</code></td>
    <td><code>'safe'</code> (default) or <code>'unsafe'</code></td>
    <td><code>'safe'</code> denies unprivileged stacks access,<br> 
        <code>'unsafe'</code> makes stacks also available by <code>errorInstance.stackkeeps()</code>.</td>
  </tr>
  <tr>
    <td><code>stackFiltering</code></td>
    <td><code>'concise'</code> (default) or <code>'verbose'</code></td>
    <td><code>'concise'</code> preserves important deep stack info,<br>
        <code>'verbose'</code> console shows full deep stacks</td>
  </tr>
  <tr>
    <td><code>overrideTaming</code></td>
    <td><code>'moderate'</code> (default) or <code>'min'</code></td>
    <td><code>'moderate'</code> moderates mitigations for legacy compatibility,<br> 
        <code>'min'</code> minimal mitigations for purely modern code</td>
  </tr>
  </tbody>
</table>
