# Agoric JavaScript Overview

## Introduction

This doc summarizes Agoric’s additions to and deletions from the current JavaScript standards. In other 
words, what you need to know to write JavaScript that runs in an Agoric vat. *Vats* are containers that 
run code in a confined and resource-limited environment, 
with [*orthogonal persistence*](https://en.wikipedia.org/wiki/Persistence_(computer_science)#Orthogonal_or_transparent_persistence) 
and [*eventual-send-based*](https://github.com/tc39/proposal-eventual-send) access to external 
resources. 

Most JS environments (Node.js, web browsers) provide a combination of the baseline 
JavaScript [*language globals*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) (e.g. 
`Object`, `Array`, etc.) and host objects, many of which provide 
IO. [Web browsers](https://developer.mozilla.org/en-US/docs/Web/API) offer things like `window`, `fetch`, `WebAssembly`, 
and `localStorage`, while [Node.js includes](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html) ones 
like `require`, `process`, and `Buffer`. In general, host objects provide all IO.

Vats are different. Their JS environment is a frozen [SES](https://medium.com/agoric/ses-securing-javascript-in-the-real-world-4f309e6b66a6) (*Secure 
ECMAScript*) `Compartment` (see below), with some additions. 

## SES 

SES is a safe deterministic subset of "strict mode" JavaScript. This means it does not include 
any IO objects that provide [*ambient authority*](https://en.wikipedia.org/wiki/Ambient_authority) 
(which is not “safe”). SES also removes non-determinism by modifying a few built-in objects. For a 
more detailed explanation of SES and its functionality, see the [SES Guide](./ses/ses-guide.md) 
and [SES Reference](./ses/ses-reference.md).

As of SES-0.8.0/Fall 2020, [the SES source code](https://github.com/endojs/endo/blob/SES-v0.8.0/packages/ses/src/whitelist.js) 
defines a subset of the globals defined by the baseline JavaScript language specification. SES **includes** the globals:

- `Object`
- `Array`
- `Number`
- `Map` / `Set`
- `WeakMap` / `WeakSet`
- `Number`
- `BigInt`
- `Intl`
- `Math`
  - `Math.random()` is disabled (calling it throws an error) as an obvious source of   
     non-determinism.  
- `Date`
  - `Date.now()` returns `NaN`
  - `new Date(nonNumber)` or `Date(anything)` return a `Date` that stringifies to `"Invalid Date"`

We retain the other, purely computational and deterministic, `Math` and `Date` features.

Much of the `Intl` package, and some locale-specific aspects of other objects 
(e.g. `Number.prototype.toLocaleString`) have results that depend upon which locale is configured. 
This varies from one process to another. Our handling of this is still in development. Either these 
functions will be disabled, or they will act as if run on a host with a single fixed locale as defined 
by the SES specification.

## Additions

As SES is on the JavaScript standards track, the below anticipates additional 
proposed standard-track features. If those features become standards, future 
JS environments will include them as global objects. So the current SES shim 
also makes those global objects available.

The vat environment has four significant objects not part of standard JavaScript:

- `console` helps with debugging. Since all JavaScript implementations add it, 
  you may be surprised it’s not in the official spec. So leaving it out would 
  cause too much confusion. Note that `console.log`’s exact behavior is up to 
  the host program; display to the operator is not guaranteed. Use the console 
  for debug information only. The console is not obliged to write to the POSIX 
  standard output.

- `harden` is a global that freezes an object’s API surface (enumerable data properties). 
  A hardened object’s properties cannot be changed, so the only way to interact 
  with a hardened object is through its methods. `harden()` is similar to `Object.freeze()` 
  but more powerful. For more details, 
  see [the details from the `ses` package](https://github.com/endojs/endo/blob/master/packages/ses/README.md#harden).

  `harden()` should be called on all objects that will be transferred
  across a trust boundary. The general rule is if you make a new object 
  and give it to someone else (and don't immediately forget it yourself), 
  you should give them `harden(obj)` instead of the raw object. Hardening
  a class instance also hardens the class.

- `HandledPromise` is also a global. 
  The [`E` wrapper (`E(target).method-name(args)`)](/guides/js-programming/eventual-send.md) 
  can be imported as `import { E } from '@agoric/eventual-send`. These two 
  are defined by the TC39 [Eventual-Send Proposal](https://github.com/tc39/proposal-eventual-send). 

- `Compartment` (a [part of SES](https://github.com/endojs/endo/tree/SES-v0.8.0/packages/ses#compartment)) 
  is a global. Vat code runs inside a `Compartment` and can create sub-compartments 
  to host other code (with different globals or transforms).

  Note that these child compartments get `harden()` and `Compartment`, but 
  you have to explicitly provide any other JS additions (including `console` 
  and `HandledPromise`) as “endowments” since they won’t be present otherwise. 
  If the parent compartment is metered, its child compartments are always 
  metered too. Child compartments will *not* be frozen by default: 
  see [Frozen globalThis](#frozen-globalthis) below for details.

## Removals

Almost all existing JS code was written to run under Node.js or inside a browser, 
so it's easy to conflate the environment features with JavaScript itself. For 
example, you may be surprised that `Buffer` and `require` are Node.js 
additions and not part of JavaScript. 

Most Node.js-specific [global objects](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html) 
are unavailable within a vat including:

* `queueMicrotask`: You can 
  replace `queueMicrotask(fn)` with `Promise.resolve().then(_ => fn())`.
* `Buffer` (consider using `TypedArray` instead, but see below)
* `setImmediate`/`clearImmediate`: Not available

There are two queues: the *IO queue* (accessed by `setImmediate`), and 
the *Promise queue* (accessed by Promise resolution). SES code can only 
add to the Promise queue. Note that the Promise queue is higher-priority 
than the IO queue, so the Promise queue must be empty for any IO or timers to be handled.
* `setInterval` and `setTimeout` (and `clearInterval`/`clearTimeout`): Any 
  notion of time must come from exchanging messages with external timer services
  (the SwingSet environment provides a `TimerService` object to the bootstrap vat, 
  which can share it with other vats)
* `global`: Is not defined. Use `globalThis` instead (and remember that it is frozen).
* `process`: Is not available, e.g. no `process.env` to access the process's environment 
  variables, or `process.argv` for the argument array.
* `URL` and `URLSearchParams`: Are not available.
* `WebAssembly`: Is not available.
* `TextEncoder` and `TextDecoder`: Are not available.

Some names look like globals, but are really part of the module-defining tools: imports, 
exports, and metadata. Modules start as files on disk, but then are bundled together 
into an archive before being loaded into a vat. The bundling tool uses several standard 
functions to locate other modules that must be included. These are not a part of SES, but 
are allowed in module source code, and are translated or removed before execution. 

- `import` and `export` syntax are allowed in ESM-style modules (preferred over CommonJS). 
  These are not globals as such, but top-level syntax that defines the module graph.
- `require`, `module`, `module.exports`, and `exports` are allowed in CommonJS-style modules, 
  and should work as expected. However, new code should be written as ESM modules. They 
  are either consumed by the bundling process, provided (in some form) by the execution 
  environment, or otherwise rewritten to work sensibly
- `__dirname` and `__filename` are not provided
- The dynamic import expression (`await import('name')`) is currently prohibited in vat 
  code, but a future SES implementation may allow it.

Node.js has a [large collection](https://nodejs.org/dist/latest-v14.x/docs/api/) of "built-in 
modules", such as `http` and `crypto`. Some are clearly platform-specific (e.g. `v8`), while 
others are not so obvious (`stream`). All are accessed by importing a 
module (`const v8 = require('v8')` in CommonJS modules, or `import v8 from 'v8'` in ESM modules). 
These modules are built out of native code (C++), not plain JS.

None of these built-in modules are available to vat code. `require` or `import` can be used 
on pure JS modules, but not on modules including native code. For a vat to exercise authority 
from a built-in module, you have to write a *device* with an endowment with the built-in 
module's functions, then have the vat send messages to the device.

Browser environments also have a huge list of [other features](https://developer.mozilla.org/en-US/docs/Web/API) 
presented as names in the global scope (some also added to Node.js). None are available in a 
SES environment. The most surprising removals include `atob`, `TextEncoder`, and `URL`.

`debugger` is a first-class JavaScript statement, and behaves as expected in vat code.

## Shim limitations

The [*shim*](https://github.com/endojs/endo/tree/master/packages/ses) providing our SES environment is not as 
fully-featured as a native implementation. As a result, you cannot use some forms of code 
yet. The following restrictions should be lifted once your JS engine can provide SES natively.

### HTML comments

JavaScript parsers may not recognize HTML comments within source code, potentially causing 
different behavior on different engines. For safety, the SES shim rejects any source 
code containing a comment open (`<!--`) or close (`-->`) sequence. However, its filter 
uses a regular expression, not a full parser. It unnecessarily rejects any source code 
containing either of the strings `<!--` or `-->`, even if neither marks a comment.

### Dynamic import expressions

The "dynamic import expression" (`import('path')`) enables code to load dependencies at
runtime. It returns a promise resolving to the module namespace object. While it takes
the form of a function call, it's actually not a function call, but is instead JavaScript
syntax. As such it would let vat code bypass the shim's `Compartment`'s module map.
For safety, the SES shim rejects code that looks like it uses a dynamic import expression.

The regular expression for this pattern is safe and should never allow any use of
dynamic import, however obfuscated the usage is. Because of this, it may be confused
into falsely rejecting legitimate code.

For example, the word “import” near a parenthesis or at the end of a line inside a
comment is identified as a disallowed use of `import()` and falsely rejected:
```js
//
// This function calculates the import
// duties paid on the merchandise..
//
```

But the following obfuscated dynamic import usage is rightly rejected:
```js
sneaky = import
// comment to hide invocation
(modulename);
```

### Direct vs. indirect eval expressions

A *direct eval*, invoked as `eval(code)`, behaves as if `code` were expanded in place. 
The evaluated code sees the same scope as the `eval` itself sees, so this `code` can 
reference `x`:

```js
function foo(code) {
  const x = 1;
  eval(code);
}
```

If you perform a direct eval, you cannot hide your internal authorities from the 
code being evaluated. 

In contrast, an *indirect eval* only gets the global scope, not the local scope. 
In a safe SES environment, indirect eval is a useful and common tool. The evaluated 
code can only access global objects, and those are all safe (and frozen). The only 
bad thing an indirect eval can do is consume unbounded CPU or memory. Once you've 
evaluated the code, you can invoke it with arguments to give it as many or as few 
authorities as you like.

The most common way to invoke an indirect eval is `(1,eval)(code)`.

The SES proposal does not change how direct and indirect eval work. However, the SES shim
cannot correctly emulate a direct eval. If it tried, it would perform an indirect eval.
This could be pretty confusing, because the evaluated code would not use objects from
the local scope as expected. Furthermore, in the future when SES is natively implemented
by JavaScript engines, the behavior would revert to direct eval, allowing access to
anything in scope.

To avoid this confusion and compatibility risk, the shim uses a regular expression to
reject code that looks like it is performing a direct eval. This regexp is not complete
(you can trick it into allowing a direct eval), but that’s safe because it really performs
an indirect eval. Our goal is just to guide people away from confusing and non-compliant
behaviors early in their development process.

This regexp falsely rejects occurrences inside static strings and comments.

## Other changes

### Frozen `globalThis`

Vats run in a `Compartment` with a frozen `globalThis` object. If mutable, 
it would provide an ambient communication channel. One side of this channel 
could set `globalThis.heyBuddyAreYouOutThere = 'exfiltrated message'`, and 
the other side could periodically read it. This would violate object-capability 
security; objects may only communicate through references. 

Vats can create a new `Compartment` object, and decide if it supports object-capability 
security. If it does, they should run `harden(compartment.globalThis)` on it 
and only then load any untrusted code into it.

### Frozen primordials

SES freezes *primordials*; built-in JavaScript objects such as `Object`, `Array`, 
and `RegExp`, and their prototype chains. This prevents malicious code from 
changing their behavior (imagine `Array.prototype.push` delivering a copy of 
its argument to an attacker, or ignoring certain values). It also prevents 
using, for example, `Object.heyBuddy` as an ambient communication channel.

Both frozen primordials and a frozen `globalThis` break a few JS libraries 
that add new features to built-in objects (shims/polyfills). For shims which 
just add properties to `globalThis`, it may be possible to load these in a new 
non-frozen `Compartment`. Shims that modify primordials only work if you build 
new (mutable) wrappers around the default primordials and let the shims modify 
those wrappers instead.

## Library compatibility

Vat code can use `import` or `require()` to import other libraries consisting 
only of JS code, which are compatible with the SES environment. This includes 
a significant portion of the NPM registry.

However, many NPM packages use built-in Node.js modules. If used at import 
time (in their top-level code), vat code cannot use the package and fails 
to load at all. If they use the built-in features at runtime, then the 
package can load. However, it might fail later when a function is invoked 
that accesses the missing functionality. So some NPM packages are partially 
compatible; you can use them if you don't invoke certain features.

The same is true for NPM packages that use missing globals, or attempt to 
modify frozen primordials.

The [SES wiki](https://github.com/endojs/endo/wiki) tracks compatibility 
reports for NPM packages, including potential workarounds.

## Summary

When writing JavaScript to run in Agoric’s vats, keep in mind the following 
differences from the JavaScript flavor you’re used to:

- Missing or unusable:
  - Most [Node.js-specific global objects](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html) 
  - All [Node.js built-in modules](https://nodejs.org/dist/latest-v14.x/docs/api/) such as `http` and 
   `crypto`. 
  - [Features from browser environments](https://developer.mozilla.org/en-US/docs/Web/API) presented 
    as names in the global scope including `atob`, `TextEncoder`, and `URL`.
  - HTML comments
  - Dynamic `import` expressions
  - Direct evals

- Added or modified
  - `console`
  - `harden()`
  - `HandledPromise()` 	
  - `Compartment`   
  - `globalThis` is frozen.
  - JavaScript primordials are frozen.
