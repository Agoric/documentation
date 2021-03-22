# `lockdown()` and its Options

**Note: This document is a companion to the [SES-Guide](./ses-guide.md), in that it explains and gives backgrounds
to `lockdown()` and its options. If you just want to use `lockdown()` with minimal explanation,
please see [SES-Reference](./ses-reference.md).**

Calling `lockdown()` turns a JavaScript system into a SES (Secure ECMAScript) system,
with enforced *OCap (object-capability) security*. This page documents `lockdown()` and its
configuration options.

`lockdown()` alters the surrounding execution environment, or *realm*, such that no two programs
running in the same realm can observe or interfere with each other until they have been introduced.

To do this, `lockdown()` tamper-proofs all of the JavaScript intrinsics to prevent prototype pollution.
After that, no program can subvert the methods of these objects (preventing some man in the middle
attacks). Also, no program can use these mutable objects to pass notes to parties that haven't been
expressly introduced (preventing some covert communication channels).

Lockdown freezes all JavaScript defined objects accessible to any program in the realm. The frozen 
accessible objects include but are not limited to: 
- `globalThis`
- `[].__proto__` the array prototype, equivalent to Array.prototype in a pristine JavaScript environment.
- `{}.__proto__` the Object.prototype
- `(() => {}).__proto__` the Function.prototype
- (async () => {}).__proto__` the prototype of all asynchronous functions, and has no alias in the global scope of a pristine JavaScript environment
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
properties cannot be changed. The only way to interact with frozen objects is through 
their methods. Their differences are what objects you use them on, and when you use them.

`lockdown()` **must** be called first. It hardens JavaScript's built-in *primordials* 
(implicitly shared global objects) and enables `harden()`. If you call `harden()` 
before `lockdown()` executes, it throws an error.

`lockdown()` works on objects created by the JavaScript language itself as part of 
its definition. Use `harden()` to freeze objects created after `lockdown()`was called;
i.e. objects created by programs written in JavaScript.

## `lockdown` Options

### Default `safe` settings

All four of these safety-relevant options default to `'safe'` if omitted 
from a call to `lockdown()`. Their other possible value is `'unsafe'`.
- `regExpTaming`
- `localeTaming`
- `consoleTaming`
- `errorTaming`

The tradeoff is safety vs compatibility with existing code. However, much legacy
JavaScript code does run under SES, even if both not written to do so and with all
the options set to `'safe'`. Only consider an `'unsafe'` value if you both need it 
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
      <code>'unsafe'</code> disables all but <code>RegExp.prototype.compile()</code></td>
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

## `regExpTaming` Options

```js
lockdown(); // regExpTaming defaults to 'safe'
// or
lockdown({ regExpTaming: 'safe' }); // Disables all RegExp.*() methods.
// vs
lockdown({ regExpTaming: 'unsafe' }); // Disables all RegExp.*() methods except RegExp.prototype.compile()
```
### Purpose

With its default `'safe'` value, `regExpTaming` prevents using `RegExp.*()` methods in
the locked down code.

With its `'unsafe'` value, `RegExp.prototype.compile()` can be used in locked down code.
However, all other `RegExp.*()` methods are disabled

### Background

There are two reasons for removing `RegExp.*` methods from usable JavaScript.
One is for `RegExp.prototype.compile()` and one for all other `RegExp.*()` methods.

- In standard JavaScript, `RegExp.prototype.compile()` may 
  violate the object invariants of frozen `RegExp` instances. This violates
  assumptions elsewhere, and so can corrupt other guarantees. For example, 
  the `Proxy` abstraction preserves the object invariants only if its target 
  does. If a non-conforming object is available, it can construct an also 
  non-conforming proxy object.

  The default `'safe'` setting deletes this dangerous method. The
  `'unsafe'` setting keeps it for compatibility purposes at the price of riskier code.

- In standard JavaScript, legacy `RegExp` static methods like `RegExp.lastMatch()` 
  are an unsafe global [overt communications channel](https://agoric.com/taxonomy-of-security-issues/).
  The `RegExp` constructor reveals information derived from the last match
  made by any `RegExp` instance in a form of non-local causality.

  Except for `RegExp.prototype.compile()` all `RegExp` static methods are currently 
  removed under **both** the `regExpTaming` `'safe`' and `'unsafe'` settings. This
  has not caused any compatibility problems; if it does, we may allow a subset 
  under the `'unsafe'` setting.

## `localeTaming` Options

```js
lockdown(); // localeTaming defaults to 'safe'
// or
lockdown({ localeTaming: 'safe' }); // Alias toLocaleString to toString, etc
// vs
lockdown({ localeTaming: 'unsafe' }); // Allow locale-specific behavior
```
### Purpose

The default `'safe'` setting replaces each method listed below with their
corresponding non-locale-specific method. For example, `Object.prototype.toLocaleString()`
becomes another name for `Object.prototype.toString()`. 

The `'unsafe'` setting keeps the original behavior for compatibility at the price
of reproducibility and fingerprinting. 

In standard JavaScript, these built-in methods have `Locale` or `locale` in their name
and are affected by `localeTaming`:
- `toLocaleString`
- `toLocaleDateString`
- `toLocaleTimeString`
- `toLocaleLowerCase`
- `toLocaleUpperCase`
- `localeCompare`

### Background
All "locale method" behavior varies depending on the user's locale and can change while 
a program is running. This breaks determinism since a program run in one compartment may have
a different result in another compartment or at another time. Also, revealing the user's locale  
helps unscrupulous programs to track and even identify the user.

This behavior might be acceptable if governed on a per-compartment basis ("virtualized"). 
But since these methods appear on the prototype of shared intrinsic objects like the `String`
prototype, there is no safe alternative design.

Instead, the hosting program can reveal the locale to all compartments by setting 
`localeTaming` to `'unsafe'`, or inject a `locale` object into selected compartments 
with the powers of these methods.

Aside from fingerprinting, the risk that this slow non-determinism opens a
[communications channel](https://agoric.com/taxonomy-of-security-issues/)
is negligible.

## `consoleTaming` Options

```js
lockdown(); // consoleTaming defaults to 'safe'
// or
lockdown({ consoleTaming: 'safe' }); // Wrap start console to show deep stacks
// vs
lockdown({ consoleTaming: 'unsafe' }); // Leave original start console in place
```
### Purpose

The `'unsafe'` setting leaves the original console in place. The `assert` package
and error objects continue to work, but the `console` logging output will not 
show this extra information.

### Background

Most JavaScript environments provide a write-only `console` object on the
global object. JavaScript code can write to the console's logging output, but
cannot see that output. The logging output is normally meant for humans, and 
is mostly formatted for human use for diagnosing problems.

Given these constraints, it is safe and helpful for `console` to reveal
to humans information it would not reveal to objects it interacts with. 
SES amplifies this and reveals much more information than the normal
`console` does. By default and during `lockdown` SES replaces the built-in
`console`with a wrapper, thus virtualizing it.  

Also, the enhanced virtual `console` has a special relationship with
error objects and the SES `assert` package. Errors can report 
more diagnostic information that should be hidden from other objects. See
the [error README](https://github.com/Agoric/SES-shim/blob/master/packages/ses/src/error/README.md) 
for an in depth explanation of this
relationship between errors, `assert` and the virtual `console`.

`console` often has additional methods beyond its de facto "standards". The
`'unsafe'` setting does not remove them. We do not know if these additional
methods violate OCap security, so should assume they are unsafe. A raw `console` 
object should only be handled by very trustworthy code.

Examples from
[test-deep-send.js](https://github.com/Agoric/agoric-sdk/blob/master/packages/eventual-send/test/test-deep-send.js)
of the eventual-send shim:

<details>
  <summary>Expand for { consoleTaming: 'safe' } log output</summary>

    expected failure (Error#1)
    Nested error
      Error#1: Wut?
        at Object.bar (packages/eventual-send/test/test-deep-send.js:13:21)

      Error#1 ERROR_NOTE: Thrown from: (Error#2) : 2 . 0
      Error#1 ERROR_NOTE: Rejection from: (Error#3) : 1 . 1
      Nested 2 errors under Error#1
        Error#2: Event: 1.1
          at Object.foo (packages/eventual-send/test/test-deep-send.js:17:28)

        Error#2 ERROR_NOTE: Caused by: (Error#3)
        Nested error under Error#2
          Error#3: Event: 0.1
            at Object.test (packages/eventual-send/test/test-deep-send.js:21:22)
            at packages/eventual-send/test/test-deep-send.js:25:19
            at async Promise.all (index 0)
</details>

<details>
  <summary>Expand for { consoleTaming: 'unsafe', overrideTaming: 'min' } log output</summary>

    expected failure [Error: Wut?
      at Object.bar (packages/eventual-send/test/test-deep-send.js:13:21)]
</details>

## `errorTaming` Options

```js
lockdown(); // errorTaming defaults to 'safe'
// or
lockdown({ errorTaming: 'safe' }); // Deny unprivileged access to stacks, if possible
// vs
lockdown({ errorTaming: 'unsafe' }); // Stacks also available by errorInstance.stack
```
## Purpose

The `errorTaming` default `'safe'` setting makes the stack trace inaccessible
from error instances alone. It does this on v8 (Chrome, Brave, Node) and SpiderMonkey (Firefox). 
Note that it is **not** hidden on other engines, leaving an information
leak available. It reveals information only as a powerless
string. It threatens [confidentiality but not integrity](https://agoric.com/taxonomy-of-security-issues/).

In JavaScript the stack is only available via `err.stack`, so some 
development tools assume it is there. When the information leak is tolerable, 
the `'unsafe'` setting preserves `err.stack`'s filtered stack information.

### Background

JavaScript's error system has several safety problems.
In most JavaScript engines running normal JavaScript, if `err` is an
Error instance, the expression `err.stack` produces a string that
reveals the stack trace. This is an [overt information leak, a confidentiality
violation](https://agoric.com/taxonomy-of-security-issues/).
This `stack` property reveals call stack information that violates
the callers' encapsulation.

This `stack` is part of de facto JavaScript, but not part
of the official standard. It is proposed at
[Error Stacks proposal](https://github.com/tc39/proposal-error-stacks).

On v8&mdash;the JavaScript engine powering Chrome, Brave, and Node&mdash;the
default error behavior is dangerous. The v8 `Error` constructor
provides a set of [static methods for accessing the raw stack
information](https://v8.dev/docs/stack-trace-api) that create
the error stack string.

`errorTaming` does not affect the `Error` constructor's safety. 
After calling `lockdown`, the tamed `Error` constructor in the
start compartment follows OCap rules. Under v8 it emulates most of the
magic powers of the v8 `Error` constructor&mdash;those consistent with the
discourse level of the proposed `getStack`. In all cases, the `Error`
constructor shared by all other compartments is both safe and powerless.

See the [error README](https://github.com/Agoric/SES-shim/blob/master/packages/ses/src/error/README.md) 
for an in depth explanation of the
relationship between errors, `assert` and the virtual `console`.

## `stackFiltering` Options

```js
lockdown(); // stackFiltering defaults to 'concise'
// or
lockdown({ stackFiltering: 'concise' }); // Preserve important deep stack info
// vs
lockdown({ stackFiltering: 'verbose' }); // Console shows full deep stacks
```

### Purpose

`stackFiltering` trades off stronger stack traceback filtering to
minimize distractions vs completeness for tracking down bugs in
obscure places. 

### Background

Many JavaScript engines show voluminous error stacks, containing many stack 
frames of infrastructure functions which are usually irrelevant for bug diagnosis.
The SES-shim's `console`, with `consoleTaming` set to `'safe'`, is even more
voluminous. It displays "deep stack" traces, tracing back through the
[eventually sent messages](https://github.com/tc39/proposal-eventual-send)
from other turns of the event loop.

Full deep distributed stacks are overwhelmingly noisy for debugging distributed
computation. When possible, the SES-shim filters and transforms the shown stack
trace information, removing artifacts from low level infrastructure.
Currently, this only works on v8. 

The 'concise' vs 'verbose' settings are about trying to reduce the noise appearing 
on the console's reported stack traces. 
The default `'concise'` setting reduces the noise. But it does so at the risk of 
throwing out the signal you were really looking for. Sometimes bugs might be in 
that infrastructure, so that information is relevant. With the `'verbose'` setting, 
the console shows the full raw stack information for each level of the deep stacks.

Either `stackFiltering` setting is safe. Stack information will
or will not be available from error objects according to the `errorTaming`
option and the platform error behavior.

Examples from
[test-deep-send.js](https://github.com/Agoric/agoric-sdk/blob/master/packages/eventual-send/test/test-deep-send.js)
of the eventual-send shim:
<details>
  <summary>Expand for { stackFiltering: 'concise' } log output</summary>

    expected failure (Error#1)
    Nested error
      Error#1: Wut?
        at Object.bar (packages/eventual-send/test/test-deep-send.js:13:21)

      Error#1 ERROR_NOTE: Thrown from: (Error#2) : 2 . 0
      Error#1 ERROR_NOTE: Rejection from: (Error#3) : 1 . 1
      Nested 2 errors under Error#1
        Error#2: Event: 1.1
          at Object.foo (packages/eventual-send/test/test-deep-send.js:17:28)

        Error#2 ERROR_NOTE: Caused by: (Error#3)
        Nested error under Error#2
          Error#3: Event: 0.1
            at Object.test (packages/eventual-send/test/test-deep-send.js:21:22)
            at packages/eventual-send/test/test-deep-send.js:25:19
            at async Promise.all (index 0)
</details>

<details>
  <summary>Expand for { stackFiltering: 'verbose' } log output</summary>

    expected failure (Error#1)
    Nested error
      Error#1: Wut?
        at makeError (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/install-ses/node_modules/ses/dist/ses.cjs:2976:17)
        at Function.fail (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/install-ses/node_modules/ses/dist/ses.cjs:3109:19)
        at Object.bar (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/test/test-deep-send.js:13:21)
        at /Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:388:23
        at Object.applyMethod (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:353:14)
        at doIt (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:395:67)
        at /Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/track-turns.js:64:22
        at win (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:408:19)
        at /Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:425:20
        at processTicksAndRejections (internal/process/task_queues.js:93:5)

      Error#1 ERROR_NOTE: Thrown from: (Error#2) : 2 . 0
      Error#1 ERROR_NOTE: Rejection from: (Error#3) : 1 . 1
      Nested 2 errors under Error#1
        Error#2: Event: 1.1
          at trackTurns (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/track-turns.js:47:24)
          at handle (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:396:27)
          at Function.applyMethod (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:312:14)
          at Proxy.&lt;anonymous&gt; (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/E.js:37:49)
          at Object.foo (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/test/test-deep-send.js:17:28)
          at /Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:388:23
          at Object.applyMethod (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:353:14)
          at doIt (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:395:67)
          at /Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/track-turns.js:64:22
          at win (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:408:19)
          at /Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:425:20
          at processTicksAndRejections (internal/process/task_queues.js:93:5)

        Error#2 ERROR_NOTE: Caused by: (Error#3)
        Nested error under Error#2
          Error#3: Event: 0.1
            at trackTurns (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/track-turns.js:47:24)
            at handle (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:396:27)
            at Function.applyMethod (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/index.js:312:14)
            at Proxy.<anonymous> (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/src/E.js:37:49)
            at Object.test (/Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/test/test-deep-send.js:21:22)
            at /Users/markmiller/src/ongithub/agoric/agoric-sdk/packages/eventual-send/test/test-deep-send.js:25:19
            at Test.callFn (/Users/markmiller/src/ongithub/agoric/agoric-sdk/node_modules/ava/lib/test.js:610:21)
            at Test.run (/Users/markmiller/src/ongithub/agoric/agoric-sdk/node_modules/ava/lib/test.js:623:23)
            at Runner.runSingle (/Users/markmiller/src/ongithub/agoric/agoric-sdk/node_modules/ava/lib/runner.js:280:33)
            at Runner.runTest (/Users/markmiller/src/ongithub/agoric/agoric-sdk/node_modules/ava/lib/runner.js:348:30)
            at processTicksAndRejections (internal/process/task_queues.js:93:5)
            at async Promise.all (index 0)
            at async /Users/markmiller/src/ongithub/agoric/agoric-sdk/node_modules/ava/lib/runner.js:493:21
            at async Runner.start (/Users/markmiller/src/ongithub/agoric/agoric-sdk/node_modules/ava/lib/runner.js:503:15)
</details>

## `overrideTaming` Options

```js
lockdown(); // overrideTaming defaults to 'moderate'
// or
lockdown({ overrideTaming: 'moderate' }); // Moderate mitigations for legacy compatability
// vs
lockdown({ overrideTaming: 'min' }); // Minimal mitigations for purely modern code
```

### Purpose
The `overrideTaming` option trades off better code
compatibility vs better tool compatibility.

### Background
JavaScript suffers from the so-called
[override mistake](https://web.archive.org/web/20141230041441/http://wiki.ecmascript.org/doku.php?id=strawman:fixing_override_mistake),
preventing `lockdown()` from _simply_ hardening all primordials. 

Rather, `lockdown()` converts each of
[these data properties](https://github.com/Agoric/SES-shim/blob/master/packages/ses/src/enablements.js) to an accessor
property whose getter and setter emulate [a data property without the override
mistake](https://github.com/tc39/ecma262/pull/1320). For non-reflective code
the illusion is perfect. But reflective code sees it is an accessor
rather than a data property. We add an `originalValue` property to that accessor's
getter, letting reflective code know that a getter alleges that it
results from this transform, and what the original data value was. This enables
a form of cooperative emulation, where that code can decide whether to uphold
the illusion by pretending it sees the data property that would have been there.

The VSCode debugger's object inspector shows the own properties of an object,
a great aid to debugging. Unfortunately, it also shows the inherited
accessor properties, with one line for the getter and another for the
setter. As you enable override on more properties of widely used prototypes,
you become compatible with more legacy code, but at the price of a significantly
worse debugging experience. Expand the "Expand for..." items at the end of this
section for screenshots showing the different experiences.

Enablements have a further debugging cost. When single stepping *into* code,
you step into every access to an enabled property. Every read steps into
the enabling getter. This adds yet more noise to the debugging experience.

[src/enablements.js](https://github.com/Agoric/SES-shim/blob/master/packages/ses/src/enablements.js) exports two different
whitelists defining which data properties to convert to enable override by
assignment, `moderateEnablements` and `minEnablements`.

The `overrideTaming` default `'moderate'` option of `lockdown` is intended to
be fairly minimal. We expand it when we
encounter code which should run under SES but can't due to
the override mistake. As we encountered these we listed them in the comments
next to each enablement. We rarely come
across any more cases. ***If you find one, please file an issue.***

The `'min'` enablements setting serves two purposes: it enables a pleasant
debugging experience in VSCode, and it helps ensure new code does not
depend on anything more than these being enabled.
All Agoric-authored is compatible with both settings, but
Agoric currently still pulls in some third party dependencies only compatible
with the `'moderate'` setting.

The following screenshots shows inspection of the `{ abc: 123 }` object, both
by hover and in the rightmost "VARIABLES" pane.
Only the `abc` property is normally useful. All other lines are noise introduced
by our override mitigation.

<details>
  <summary>Expand for { overrideTaming: 'moderate' } vscode inspector display</summary>

  ![overrideTaming: 'moderate' vscode inspector display](./assets/override-taming-moderate-inspector.png)
</details>

<details>
  <summary>Expand for { overrideTaming: 'min' } vscode inspector display</summary>

![overrideTaming: 'min' vscode inspector display](./assets/override-taming-min-inspector.png)
</details>

<details>
  <summary>Expand to see the vscode inspector display if enabling all of Object.prototype</summary>

![vscode inspector display if enabling all of Object.prototype](./assets/override-taming-star-inspector.png)
</details>
  
