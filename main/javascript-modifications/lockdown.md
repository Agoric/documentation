So you're an application author and an upstream developer sesified a library. What do you do?

Calling `lockdown()` turns a JavaScript system into a SES (Secure ECMAScript) system,
with enforced *ocap (object-capability) security*. This page documents `lockdown()` and its
configuration options.

`lockdown()` alters the surrounding execution environment, or *realm*, such that no two programs
running in the same realm can observe or interfere with each other until they have been introduced.

To do this, lockdown() tamper-proofs all of the JavaScript intrinsics, to prevent prototype pollution. After that, no program can subvert the methods of these objects (preventing some man in the middle attacks). Also, no program can use these mutable objects to pass notes to parties that haven't been expressly introduced (preventing some covert communication channels).

Lockdown freezes all objects accessible to any program in the realm. The set of accessible objects includes but is not limited to: globalThis, [].__proto__, {}.__proto__, (() => {}).__proto__ (async () => {}).__proto__, and the properties of any accessible object.

The lockdown() function also tames some objects including regular expressions, locale methods, and errors. A tamed RexExp does not have the deprecated compile method. A tamed error does not have a V8 stack, but the console can still see the stack. Lockdown replaces locale methods like String.prototype.localeCompare with lexical versions that do not reveal the user locale.

import 'ses';
import 'my-vetted-shim';

lockdown();

console.log(Object.isFrozen([].__proto__));
// true
Lockdown does not erase any powerful objects from the initial global scope. Instead, Compartments give complete control over what powerful objects exist for client code.

See lockdown options for configuration options to lockdown. However, all of these have sensible defaults that should work for most projects out of the box.

# `lockdown` Options

## Default `safe` settings

All four of these safety-relevant options default to `safe` if omitted 
from a call to `lockdown()`. Their other possible value is `unsafe`.
- `regExpTaming`
- `localeTaming`
- `consoleTaming`
- `errorTaming`

The tradeoff is safety vs compatibility with existing code. However, much
legacy JavaScript code does run under SES, even if both not written to do so
and with all the options set to `safe`. Only consider an `'unsafe'` value if
you both need it and can evaluate its risks.

## `regExpTaming` Options

```js
lockdown(); // regExpTaming defaults to 'safe'
// or
lockdown({ regExpTaming: 'safe' }); // Delete RegExp.prototype.compile
// vs
lockdown({ regExpTaming: 'unsafe' }); // Keep RegExp.prototype.compile
```
### Purpose

With its default `safe` value, `regExpTaming` prevents using `RegExp.*()` methods in
the locked down code.

With its `unsafe` value, `RegExp.prototype.compile()` can be used in code that is
otherwise under lockdown. However, all other `RegExp.*` methods are still disabled

### Background

`regExpTaming`, when set to `'safe'` removes all `RegExp.*` methods from usable JavaScript.
There are two reasons for doing so, one for `RegExp.prototype.complie()` and one for all
other `RegExp.*` methods.

- In standard JavaScript, `RegExp.prototype.compile()` may 
  violate the object invariants of frozen `RegExp` instances. This violates
  assumptions elsewhere, and so can corrupt other guarantees. For example, 
  the `Proxy` abstraction preserves the object invariants only if its target 
  does. If a non-conforming object is available, it can construct an also 
  non-conforming proxy object.

  The default `'safe'` setting deletes this dangerous method. The
  `'unsafe'` setting keeps it for compatibility purposes at the price of riskier code.

- In standard JavaScript, legacy `RegExp` static methods like `RegExp.lastMatch` 
  are an unsafe global [overt communications channel](https://agoric.com/taxonomy-of-security-issues/).
  They reveal on the `RegExp` constructor information derived from the last match
  made by any `RegExp` instance in a form of non-local causality.
  
  These static methods are currently de facto JavaScript, but not yet part of 
  the standard. The [Legacy RegExp static methods](https://github.com/tc39/proposal-regexp-legacy-features)
  proposal would standardize them as *normative optional* and deletable, meaning
  - Conforming JavaScript engines may omit them
  - A shim may delete them and have the resulting state still conform to the 
    initial JavaScript state specification.

  All these legacy `RegExp` static methods are currently removed under **both**
  the `regExpTaming` `'safe`' and `'unsafe'` settings. This has not caused any 
  compatibility problems; if it does, we may allow a subset under the `'unsafe'`
  setting.

## `localeTaming` Options

```js
lockdown(); // localeTaming defaults to 'safe'
// or
lockdown({ localeTaming: 'safe' }); // Alias toLocaleString to toString, etc
// vs
lockdown({ localeTaming: 'unsafe' }); // Allow locale-specific behavior
```
### Purpose

The default `'safe'` setting replaces each of the methods listed below with their
corresponding non-locale-specific method. For example, `Object.prototype.toLocaleString`
becomes another name for `Object.prototype.toString`. 

The `'unsafe'` setting keeps the original behavior for maximal compatibility at the price
of reproducibility and fingerprinting. 

In standard JavaScript, thee builtin methods have `Locale` or `locale` in their name:
- `toLocaleString`
- `toLocaleDateString`
- `toLocaleTimeString`
- `toLocaleLowerCase`
- `toLocaleUpperCase`
- `localeCompare`

### Background

All of the "locale methods" have global behavior not fully determined by the
JavaScript spec, but which varies with location and culture. 

However, by placing this information of shared primordial prototypes, **(tyg todo: I'm not parsing the
previous phrase. What does "placing this information of shared prototypes" mean, or is there a typo
or missing text in there?)** 
it cannot differ per comparment. So one compartment cannot virtualize the locale for code
running in another compartment. Worse, on some engines the methods' behavior may change at runtime as 
the machine is "moved" between different locales, i.e., if the operating system's locale is
reconfigured while JavaScript code is running.

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
to humans information it would not reveal to the objects it interacts with. 
SES amplifies this and reveals much more information than the normal
`console` does. 

By default during `lockdown` SES virtualizes the builtin
`console`, by replacing it with a wrapper. This is a virtual `console`
implementing the standard `console` API mostly by forwarding to the original
wrapped `console`.

Also, the virtual `console` has a special relationship with
error objects and the SES `assert` package. Errors can report 
more diagnostic information that should be hidden from other objects. See
the [error README](./src/error/README.md) for an in depth explanation of this
relationship between errors, `assert` and the virtual `console`.

`console` often has additional methods beyond its de facto "standards". The
`'unsafe'` setting does not remove them. We do not know if these additional
methods violate ocap security, so should assume they are unsafe. A raw `console` 
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
from error instances alone. It does this on v8 (Chrome, Brave, Node). 
It will also do so on SpiderMonkey (Firefox). **tyg todo: Does this mean it does this now? If not, then what's the ETA?**
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
start compartment follows ocap rules. Under v8 it emulates most of the
magic powers of the v8 `Error` constructor&mdash;those consistent with the
discourse level of the proposed `getStack`. In all cases, the `Error`
constructor shared by all other compartments is both safe and powerless.

See the [error README](./src/error/README.md) for an in depth explanation of the
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
frames of infrastructure functions which are usually irrelevant for disagnosing
bugs. The SES-shim's`console`, with `consoleTaming` set to `'safe'`, is even more
voluminous. It displays "deep stack" traces, tracing back through the
[eventually sent messages](https://github.com/tc39/proposal-eventual-send)
from other turns of the event loop.

Full deep distributed stacks are overwhelmingly noisy for debuging distributed
computation. When possible, the SES-shim filters and transforms the shown stack
trace information, removing artifacts from low level infrastructure.
Currently, this only works on v8. 

However, sometimes bugs might be in that infrastrusture, so that information
is relevant. With the `'verbose'` setting, the console shows the full raw stack 
information for each level of the deep stacks.

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
lockdown({ overrideTaming: 'moderate' }); // Moderate mitigations for legacy compat
// vs
lockdown({ overrideTaming: 'min' }); // Minimal mitigations for purely modern code
```


### Purpose
The `overrideTaming` option trades off better code
compatibility vs better tool compatibility.


| option           | default setting  | other settings | about |
|------------------|------------------|----------------|-------|
| `overrideTaming` | `'moderate'` | `'min'`       | override mistake antidote  |

### Background
JavaScript suffers from the so-called
[override mistake](https://web.archive.org/web/20141230041441/http://wiki.ecmascript.org/doku.php?id=strawman:fixing_override_mistake),
preventing `lockdown()` from _simply_ hardening all primordials. Rather,
for each of
[these data properties](src/enablements.js), we convert it to an accessor
property whose getter and setter emulate [a data property without the override
mistake](https://github.com/tc39/ecma262/pull/1320). For non-reflective code
the illusion is perfect. But reflective code sees it is an accessor
rather than a data property. We add an `originalValue` property to the getter
of that accessor, letting reflective code know that a getter alleges that it
results from this transform, and what the original data value was. This enables
a form of cooperative emulation, where that code can decide whether to uphold
the illusion by pretending it sees the data property that would have been there.

The VSCode debugger's object inspector shows the own properties of an object,
which is a great aid to debugging. Unfortunately, it also shows the inherited
accessor properties, with one line for the getter and another line for the
setter. As we enable override on more properties of widely used prototypes,
we become compatible with more legacy code, but at the price of a significantly
worse debugging experience. Expand the "Expand for..." items at the end of this
section for screenshots showing the different experiences.

Enablements have a further debugging cost. When single stepping *into* code,
we now step into every access to an enabled property. Every read steps into
the enabling getter. This adds yet more noise to the debugging experience.

The file [src/enablements.js](src/enablements.js) exports two different
whitelists definining which data properties to convert to enable override by
assignment, `moderateEnablements` and `minEnablements`.


The `overrideTaming` default `'moderate'` option of `lockdown` is intended to
be fairly minimal, but we expand it as needed, when we
encounter code which should run under SES but is prevented from doing so
by the override mistake. As we encouter these we list them in the comments
next to each enablement. This process has rapidly converged. We rarely come
across any more such cases. ***If you find one, please file an issue.*** Thanks.

The `'min'` enablements setting serves two purposes: it enables a pleasant
debugging experience in VSCode, and it helps ensure that new code does not
depend on anything more than these being enabled, which is good practice.
All code authored by Agoric will be compatible with both settings, but
Agoric currently still pulls in some third party dependencies only compatible
with the `'moderate'` setting.

The following screenshots shows inspection of the `{ abc: 123 }` object, both
by hover and in the rightmost "VARIABLES" pane.
Only the `abc` property is normally useful. All other lines are noise introduced
by our override mitigation.

<details>
  <summary>Expand for { overrideTaming: 'moderate' } vscode inspector display</summary>

  ![overrideTaming: 'moderate' vscode inspector display](docs/images/override-taming-moderate-inspector.png)
</details>

<details>
  <summary>Expand for { overrideTaming: 'min' } vscode inspector display</summary>

![overrideTaming: 'min' vscode inspector display](docs/images/override-taming-min-inspector.png)
</details>

<details>
  <summary>Expand to see the vscode inspector display if enabling all of Object.prototype</summary>

![vscode inspector display if enabling all of Object.prototype](docs/images/override-taming-star-inspector.png)
</details>
  
