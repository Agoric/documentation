# SES (*Secure ECMAScript*)

SES is a JavaScript runtime library for safely running third-party code inside a
featherweight compartment. It addresses JavaScript’s lack of security, which is 
particularly significant in that JavaScript applications use and rely on a lot
of third-party code (modules, packages, libraries, user-provided code for 
extensions and plug-ins, etc.). 

## The SES Story

JavaScript was created to let web surfers safely run programs from strangers. 
Web pages put JavaScript programs in a *sandbox* that restricts their abilities 
while maximizing utility.

This worked well until web applications started inviting multiple strangers
into the same sandbox. They continued to depend on a security model where 
every stranger got their own sandbox.

Meanwhile, server-side JavaScript applications imbue their sandbox with unbounded
abilities and run programs written by strangers. Such applications are vulnerable 
to their dependencies *and* also the rarely reviewed dependencies of their dependencies.

SES uses a finer grain security model, *Object Capabilities* or tersely, *OCap*. 
With OCap, many strangers can collaborate in a single sandbox, without risking them
frustrating, interfering, or conspiring with or against the user or each other.

To do this, SES *hardens* the entire surface of the JavaScript environment. 
*The only way a program can subvert or communicate with another program is to
have been expressly granted a reference to an object provided by that other program.*

Any programming environment fitting the OCap model satisfies three requirements:
- Any program can protect its invariants by hiding its own data and capabilities.
- Power can only be exercised over something by having a reference to the 
  object providing that power, for example, a file system object. A 
  reference to a powerful object is a *capability*.
- The only way to get a capability is by being given one. For example, by receiving
  one as an argument of a constructor or method.

JavaScript does not fully qualify as an OCap language due to the pervasive 
mutability of shared objects. You can construct a JavaScript subset with a 
transitively immutable environment without any unintended capabilities. Starting
in 2007 with ECMAScript 5, Agoric engineers and the OCap community have influenced
JavaScript’s evolution so a program can transform its own environment into 
this safe JavaScript environment.

## What SES does: An overview

SES removes, adds, and modifies various aspects of JavaScript. In particular:

- Removed from JavaScript or made unusable:
  - Most [Node.js-specific global objects](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html) 
  - All [Node.js built-in modules](https://nodejs.org/dist/latest-v14.x/docs/api/) such as `http` and 
   `crypto`. 
  - [Features from browser environments](https://developer.mozilla.org/en-US/docs/Web/API) presented as names in the global scope including `atob`, `TextEncoder`, and `URL`.
  - HTML comments
  - Dynamic `import` expressions
  - Direct evals

- Added to or modified from JavaScript
  - console
  - `lockdown()`
  - `harden()`
  - `HandledPromise()` 	
  - `Compartment`   
  - `globalThis` is frozen.
  - JavaScript primordials are frozen.

We'll look at each of these in more detail.



Some pieces of this are `freeze()`, `defineProperties()`, `WeakMap`, and `Proxy`. 
`freeze()` and `defineProperties()` let a JavaScript program make immutable the 
surface of every reachable object in their environment. The `WeakMap` and `Proxy` 
classes let programs create *revocable membranes*, objects that can temporarily 
grant a capability.

SES does the following:
- Uses `freeze()` and `defineProperties()` in its `lockdown()` function. Running 
  `lockdown()` freezes every object accessible in its environment, or precisely, 
  transforms its realm into a frozen realm. 
- Replaces functions that can’t be made immutable by freezing 
  (e.g. `Math.random()`, `Date.now()`) with powerless or tamed versions. 
- Removes anything unrecognized as part of the safe JavaScript 
  environment. 
- Provides the `harden()` function so programs can make the API surface of any 
  capability tamper-proof, freezing every object accessible by following properties 
  of that object.

SES also makes use of *compartments* as an environment for a stranger’s code. 
Each compartment has its own global object and, after lockdown, shares the same 
frozen realm with other compartments. A single compartment can run a JavaScript program
in the locked-down SES environment, but most interesting programs have multiple modules.
So, each compartment also gets its own module system. 

We can also link compartments, so one compartment can export a module that another 
imports. Each compartment can have its own rules for resolving import specifiers and 
how to locate and retrieve modules. 

We expect compartments to greatly simplify using SES for large applications. We are 
building tools that use compartments to load and bundle existing libraries and then 
execute them with a compartment for each package. This will provide a seamless experience 
as simple as `<script src=“app.js”>` or `node app.js`, but with the safety of SES.

The next SES release includes support for ECMAScript modules, a relatively new system 
supported by many browsers, and officially released in Node.js 14. As of February 2021, 
SES is making its way through JavaScript standards committees. It is expected to become 
an official part of JavaScript when the standards process is completed. Meanwhile, Agoric
provides its own SES *shim* for use in writing secure smart contracts in JavaScript (Several
Agoric engineers are on the relevant standards committees and are responsible for aspects of SES).

## Agoric SES

For the remainder of this page, and its direct decendant pages, we describe the 
version of SES currently implemented and used for and by the Agoric Platform and
the smart contracts written using it. The reference implementation, or *shim*, of the
proposed standards is [available on npm](https://www.npmjs.com/package/ses).





SES supports practicing of the Principle of Least 
Authority (or POLA), so that the risk from most third-party code can be 
substantially reduced.



Originally by Kris at https://medium.com/agoric/ses-support-for-ecmascript-modules-28fc1beb709c

```js
import 'ses';
lockdown();
let compartment = new Compartment();
compartment.evaluate(code);
```

```js
import 'ses';
lockdown();
let compartment = new Compartment();
compartment.evaluate(code);
```

```js
compartment
.import('./main.js')
.then(({ namespace: main }) => {
  // …
});
```



```js
const dependency = new Compartment({}, {}, {
  resolveHook: (moduleSpecifier, moduleReferrer) =>
    resolve(moduleSpecifier, moduleReferrer),
  importHook: async moduleSpecifier => {
    const moduleLocation = locate(moduleSpecifier);
    const moduleText = await retrieve(moduleLocation);
    return new ModuleStaticRecord(moduleText, moduleLocation);
  },
});
const application = new Compartment({}, {
  'dependency': dependency.module('./main.js'),
}, {
  resolveHook,
  importHook,
});
view raw
```
  
---------------------------  SES README

Secure EcmaScript (SES)
Secure EcmaScript (SES) is a frozen environment for running EcmaScript (Javascript) 'strict' mode programs with no ambient authority in their global scope, and with the addition of a safe two-argument evaluator (SES.confine(code, endowments)). By freezing everything accessible from the global scope, it removes programs abilities to interfere with each other, and thus enables isolated evaluation of arbitrary code.

It runs atop an ES6-compliant platform, enabling safe interaction of mutually-suspicious code, using object-capability -style programming.

See https://github.com/Agoric/Jessie to see how SES fits into the various flavors of confined EcmaScript execution. And visit https://rawgit.com/Agoric/ses-shim/master/demo/ for a demo.

Derived from the Caja project, https://github.com/google/caja/wiki/SES.

Still under development: do not use for production systems yet, there are known security holes that need to be closed.

Install
npm install ses
Usage
Lockdown
SES introduces the lockdown() function. Calling lockdown() alters the surrounding execution environment, or realm, such that no two programs running in the same realm can observe or interfere with each other until they have been introduced.

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

Harden
SES introduces the harden function. After calling lockdown, the harden function ensures that every object in the transitive closure over property and prototype access starting with that object has been frozen by Object.freeze. This means that the object can be passed among programs and none of those programs will be able to tamper with the surface of that object graph. They can only read the surface data and call the surface functions.

import 'ses';

lockdown();

let counter = 0;
const capability = harden({
  inc() {
    counter++;
  },
});

console.log(Object.isFrozen(capability));
// true
console.log(Object.isFrozen(capability.inc));
// true
Note that although the surface of the capability is frozen, the capability still closes over the mutable counter. Hardening an object graph makes the surface immutable, but does not make methods pure.

Compartment
SES introduces the Compartment constructor. A compartment is an evaluation and execution environment with its own globalThis and wholly independent system of modules, but otherwise shares the same batch of intrinsics like Array with the surrounding compartment. The concept of a compartment implies an initial compartment, the initial execution environment of a realm.

In the following example, we create a compartment endowed with a print() function on globalThis.

import 'ses';

const c = new Compartment({
  print: harden(console.log),
});

c.evaluate(`
  print('Hello! Hello?');
`);
The new compartment has a different global object than the start compartment. The global object is initially mutable. Locking down the realm hardened the objects in global scope. After lockdown, no compartment can tamper with these intrinsics and undeniable objects. Many of these are identical in the new compartment.

const c = new Compartment();
c.globalThis === globalThis; // false
c.globalThis.JSON === JSON; // true
Other pairs of compartments also share many identical intrinsics and undeniable objects of the realm. Each has a unique, initially mutable, global object.

const c1 = new Compartment();
const c2 = new Compartment();
c1.globalThis === c2.globalThis; // false
c1.globalThis.JSON === c2.globalThis.JSON; // true
The global scope of every compartment includes a shallow, specialized copy of the JavaScript intrinsics, omitting Date.now and Math.random. Comaprtments leave these out since they can be used as covert communication channels between programs. However, a compartment may be expressly given access to these objects through:

the first argument to the compartment constructor or
by assigning them to the compartment's globalThis after construction.
const powerfulCompartment = new Compartment({ Math });
powerfulCompartment.globalThis.Date = Date;
Compartment + Lockdown
Together, Compartment and lockdown isolate client code in an environment with limited powers and communication channels. A compartment has only the capabilities it is expressly given and cannot modify any of the shared intrinsics. Every compartment gets its own globals, including such objects as the Function constructor. Yet, compartment and lockdown do not break instanceof for any of these intrinsics types!

All of the evaluators in one compartment are captured by that compartment's global scope, including Function, indirect eval, dynamic import, and its own Compartment constructor for child compartments. For example, the Function constructor in one compartment creates functions that evaluate in the global scope of that compartment.

const f = new Function("return this");
f() === globalThis
// true
Lockdown prepares for compartments with separate globals by freezing their shared prototypes and replacing their prototype constructors with powerless dummies. So, Function is different in two compartments, Function.prototype is the same, and Function is not the same as Function.prototype.constructor. The Function.prototype.constructor can only throw exceptions. So, a function passed between compartments does not carry access to its compartment's globals along with it. Yet, f instanceof Function works, even when f and Function are from different compartments.

The globalThis in each compartment is mutable. This can and should be frozen before running any dynamic code in that compartment, yet is not strictly necessary if the compartment only runs code from a single party.

Modules
Any code executed within a compartment shares a set of module instances. For modules to work within a compartment, the creator must provide a resolveHook and an importHook. The resolveHook determines how the compartment will infer the full module specifier for another module from a referrer module and the import specifier. The importHook accepts a full specifier and asynchronously returns a StaticModuleRecord for that module.

import 'ses';

const c1 = new Compartment({}, {}, {
  name: "first compartment",
  resolveHook: (moduleSpecifier, moduleReferrer) => {
    return resolve(moduleSpecifier, moduleReferrer);
  },
  importHook: async moduleSpecifier => {
    const moduleLocation = locate(moduleSpecifier);
    const moduleText = await retrieve(moduleLocation);
    return new StaticModuleRecord(moduleText, moduleLocation);
  },
});
A compartment can also link a module in another compartment. Each compartment has a module function that accepts a module specifier and returns the module exports namespace for that module. The module exports namespace is not useful for inspecting the exports of the module until that module has been imported, but it can be passed into the module map of another Compartment, creating a link.

const c2 = new Compartment({}, {
  'c1': c1.module('./main.js'),
}, {
  name: "second compartment",
  resolveHook,
  importHook,
});
importHook aliases
If a compartment imports a module specified as "./utility" but actually implemented by an alias like "./utility/index.js", the importHook may follow redirects, symbolic links, or search for candidates using its own logic and return a module that has a different "response specifier" than the original "request specifier". The importHook may return an "alias" objeect with record, compartment, and module properties.

record must be a StaticModuleRecord,
compartment is optional, to be specified if the alias transits to a different compartment, and
specifier is the full module specifier of the module in its compartment. This defaults to the request specifier, which is only useful if the compartment is different.
In the following example, the importHook searches for a file and returns an alias.

const importHook = async specifier => {
  const candidates = [specifier, `${specifier}.js`, `${specifier}/index.js`];
  for (const candidate of candidates) {
    const record = await wrappedImportHook(candidate).catch(_ => undefined);
    if (record !== undefined) {
      return { record, specifier };
    }
  }
  throw new Error(`Cannot find module ${specifier}`);
};

const compartment = new Compartment({}, {}, {
  resolveHook,
  importHook,
});
moduleMapHook
The module map above allows modules to be introduced to a compartment up-front. Some modules cannot be known that early. For example, in Node.js, a package might have a dependency that brings in an entire subtree of modules. Also, a pair of compartments with cyclic dependencies between modules they each contain cannot use compartment.module to link the second compartment constructed to the first. For these cases, the Compartment constructor accepts a moduleMapHook option that is like the dynamic version of the static moduleMap argument. This is a function that accepts a module specifier and returns the module namespace for that module specifier, or undefined. If the moduleMapHook returns undefined, the compartment proceeds to the importHook to attempt to asynchronously obtain the module's source.

const moduleMapHook = moduleSpecifier => {
  if (moduleSpecifier === 'even') {
    return even.module('./index.js');
  } else if (moduleSpecifier === 'odd') {
    return odd.module('./index.js');
  }
};

const even = new Compartment({}, {}, {
  resolveHook: nodeResolveHook,
  importHook: makeImportHook('https://example.com/even'),
  moduleMapHook,
});

const odd = new Compartment({}, {}, {
  resolveHook: nodeResolveHook,
  importHook: makeImportHook('https://example.com/odd'),
  moduleMapHook,
});
Third-party modules
To incorporate modules not implemented as ECMAScript modules, third-parties may implement a StaticModuleRecord interface. The record must have an imports array and an execute method. The compartment will call execute with:

the proxied exports namespace object,
a resolvedImports object that maps import names (from imports) to their corresponding resolved specifiers (through the compartment's resolveHook), and
the compartment, such that importNow can obtain any of the module's specified imports.
⚠️ A future breaking version may allow the importNow and the execute method of third-party static module records to return promises, to support top-level await.

Transforms
The Compartment constructor accepts a transforms option. This is an array of JavaScript source to source translation functions, in the order they should be applied. Passing the source to the first function's input, then from each function's output to the next's input, the final function's output must be a valid JavaScript "Program" grammar construction, code that is valid in a <script>, not a module.

const transforms = [addCodeCoverageInstrumentation];
const globalLexicals = { coverage };
const c = new Compartment({ console }, null, { transforms, globalLexicals });
c.evaluate('console.log("Hello");');
The evaluate method of a compartment also accepts a transforms option. These apply before and in addition to the compartment-scoped transforms.

const transform = source => source.replace(/Farewell/g, 'Hello');
const transforms = [transform];
c.evaluate('console.log("Farewell, World!")', { transforms });
// Hello, World!
These transforms do not apply to modules. To transform the source of an ECMAScript module, the importHook must intercept the source and transform it before passing it to the StaticModuleRecord constructor. These are distinct because programs and modules have distinct grammar productions.

An internal implementation detail of the SES-shim is that it converts modules to programs and evaluates them as programs. So, only for this implementation of Compartment, it is possible for a program transform to be equally applicable for modules, but that transform will have a window into the internal translation, will be sensitive to changes to that translation between any pair of releases, even those that do not disclose any breaking changes, and will only work on SES-shim, not any other implementation of Compartment like the one provided by XS.

The SES-shim Compartment constructor accepts a __shimTransforms__ option for this purpose. For the Compartment to use the same transforms for both evaluated strings and modules converted to programs, pass them as __shimTransforms__ instead of transforms.

const __shimTransforms__ = [addMetering];
const globalLexicals = { meter };
const c = new Compartment({ console }, null, {
  __shimTransforms__,
  globalLexicals
});
c.evaluate('console.log("Hello");');
The __shimTransforms__ feature is designed to uphold the security properties of compartments, since an attacker may use all available features, whether they are standard or not.

Logging Errors
lockdown() adds new global assert and tames the global console. The error taming hides error stacks, accumulating them in side tables. The assert system generated other diagnostic information hidden in side tables. The tamed console uses these side tables to output more informative diagnostics. Logging Errors explains the design.

Bug Disclosure
Please help us practice coordinated security bug disclosure, by using the instructions in SECURITY.md to report security-sensitive bugs privately.

For non-security bugs, please use the regular Issues page.




----------------------- Lockdown doc
See the [README](./README.md) for a description of the global `lockdown` function
installed by the SES-shim.
Essentially, calling `lockdown` turns a JavaScript system into a SES system,
with enforced ocap (object-capability) security.
Here we explain the configuration options to the lockdown function.

# `lockdown` Options

For every safety-relevant options setting, if the option is omitted
it defaults to `'safe'`. For these options, the tradeoff is safety vs
compatibility, though note that a tremendous amount of legacy code, not
written to run under SES, does run compatibly under SES even with all of these
options set to `'safe'`. You should only consider an `'unsafe'` option if
you find you need it and are able to evaluate the risks.

The `stackFiltering` option trades off stronger filtering of stack traceback to
minimize distractions vs completeness for tracking down a bug hidden in
obscure places. The `overrideTaming` option trades off better code
compatibility vs better tool compatibility.

Each option is explained in its own section below.

| option           | default setting  | other settings | about |
|------------------|------------------|----------------|-------|
| `regExpTaming`   | `'safe'`    | `'unsafe'`     | `RegExp.prototype.compile` |
| `localeTaming`   | `'safe'`    | `'unsafe'`     | `toLocaleString`           |
| `consoleTaming`  | `'safe'`    | `'unsafe'`     | deep stacks                |
| `errorTaming`    | `'safe'`    | `'unsafe'`     | `errorInstance.stack`      |
| `stackFiltering` | `'concise'` | `'verbose'`    | deep stacks signal/noise   |
| `overrideTaming` | `'moderate'` | `'min'`       | override mistake antidote  |

## `regExpTaming` Options

**Background**: In standard plain JavaScript, the builtin
`RegExp.prototype.compile` method may violate the object invariants of frozen
`RegExp` instances. This violates assumptions elsewhere, and so can be
used to corrupt other guarantees. For example, the JavaScript `Proxy`
abstraction preserves the object invariants only if its target does. It was
designed under the assumption that these invariants are never broken. If a
non-conforming object is available, it can be used to construct a proxy
object that is also non-conforming.

```js
lockdown(); // regExpTaming defaults to 'safe'
// or
lockdown({ regExpTaming: 'safe' }); // Delete RegExp.prototype.compile
// vs
lockdown({ regExpTaming: 'unsafe' }); // Preserve RegExp.prototype.compile
```

The `regExpTaming` default `'safe'` setting deletes this dangerous method. The
`'unafe'` setting preserves it for maximal compatibility at the price of some
risk.

**Background**: In de facto plain JavaScript, the legacy `RegExp` static
methods like `RegExp.lastMatch` are an unsafe global
[overt communications channel](https://agoric.com/taxonomy-of-security-issues/).
They reveal on the `RegExp` constructor information derived from the last match
made by any `RegExp` instance&mdash;a bizarre form of non-local causality.
These static methods are currently part of de facto
JavaScript but not yet part of the standard. The
[Legacy RegExp static methods](https://github.com/tc39/proposal-regexp-legacy-features)
proposal would standardize them as *normative optional* and deletable, meaning
   * A conforming JavaScript engine may omit them
   * A shim may delete them and have the resulting state still conform
     to the specification of an initial JavaScript state.

All these legacy `RegExp` static methods are currently removed under all
settings of the `regExpTaming` option.
So far this has not caused any compatibility problems.
If it does, then we may decide to support them, but *only* under the
`'unsafe'` setting and *only* on the `RegExp`  constructor of the start
compartment. The `RegExp` constructor shared by other compartments will remain
safe and powerless.

## `localeTaming` Options

**Background**: In standard plain JavaScript, the builtin methods with
 "`Locale`" or "`locale`" in their name&mdash;`toLocaleString`,
`toLocaleDateString`, `toLocaleTimeString`, `toLocaleLowerCase`,
`toLocaleUpperCase`, and `localeCompare`&mdash;have a global behavior that is
not fully determined by the language spec, but rather varies with location and
culture, which is their point. However, by placing this information of shared
primordial prototypes, it cannot differ per comparment, and so one compartment
cannot virtualize the locale for code running in another compartment. Worse, on
some engines the behavior of these methods may change at runtime as the machine
is "moved" between different locales,
i.e., if the operating system's locale is reconfigured while JavaScript
code is running.

```js
lockdown(); // localeTaming defaults to 'safe'
// or
lockdown({ localeTaming: 'safe' }); // Alias toLocaleString to toString, etc
// vs
lockdown({ localeTaming: 'unsafe' }); // Allow locale-specific behavior
```

The `localeTaming` default `'safe'` option replaces each of these methods with
the corresponding non-locale-specific method. `Object.prototype.toLocaleString`
becomes just another name for `Object.prototype.toString`. The `'unsafe'`
setting preserves the original behavior for maximal compatibility at the price
of reproducibility and fingerprinting. Aside from fingerprinting, the risk that
this slow non-determinism opens a
[communications channel](https://agoric.com/taxonomy-of-security-issues/)
is negligible.

## `consoleTaming` Options

**Background**: Most JavaScript environments provide a `console` object on the
global object with interesting information hiding properties. JavaScript code
can use the `console` to send information to the console's logging output, but
cannot see that output. The `console` is a *write-only device*. The logging
output is normally placed where a human programmer, who is in a controlling
position over that computation, can see the output. This output is, accordingly,
formatted mostly for human consumption; typically for diagnosing problems.

Given these constraints, it is both safe and helpful for the `console` to reveal
to the human programmer information that it would not reveal to the objects it
interacts with. SES amplifies this special relationship to reveal
to the programmer much more information than would be revealed by the normal
`console`. To do so, by default during `lockdown` SES virtualizes the builtin
`console`, by replacing it with a wrapper. The wrapper is a virtual `console`
that implements the standard `console` API mostly by forwarding to the original
wrapped `console`.
In addition, the virtual `console` has a special relationship with
error objects and with the SES `assert` package, so that errors can report yet
more diagnostic information that should remain hidden from other objects. See
the [error README](./src/error/README.md) for an in depth explanation of this
relationship between errors, `assert` and the virtual `console`.

```js
lockdown(); // consoleTaming defaults to 'safe'
// or
lockdown({ consoleTaming: 'safe' }); // Wrap start console to show deep stacks
// vs
lockdown({ consoleTaming: 'unsafe' }); // Leave original start console in place
```

The `consoleTaming: 'unsafe'` setting leaves the original console in place.
The `assert` package and error objects will continue to work, but the `console`
logging output will not show any of this extra information.

The risk is that the original platform-provided `console` object often has
additional methods beyond the de facto `console` "standards". Under the
`'unsafe'` setting we do not remove them.
We do not know whether any of these additional
methods violate ocap security. Until we know otherwise, we should assume these
are unsafe. Such a raw `console` object should only be handled by very
trustworthy code.

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

**Background**: The error system of JavaScript has several safety problems.
In most JavaScript engines running normal JavaScript, if `err` is an
Error instance, the expression `err.stack` will produce a string
revealing the stack trace. This is an
[overt information leak, a confidentiality
violation](https://agoric.com/taxonomy-of-security-issues/).
This `stack` property reveals information about the call stack that violates
the encapsulation of the callers.

This `stack` is part of de facto JavaScript, is not yet part
of the official standard, and is proposed at
[Error Stacks proposal](https://github.com/tc39/proposal-error-stacks).
Because it is unsafe, we propose that the `stack` property be "normative
optional", meaning that a conforming implementation may omit it. Further,
if present, it should be present only as a deletable accessor property
inherited from `Error.prototype` so that it can be deleted. The actual
stack information would be available by other means, the `getStack` and
`getStackString` functions&mdash;special powers available only in the start
compartment&mdash;so the SES console can still `operate` as described above.

On v8&mdash;the JavaScript engine powering Chrome, Brave, and Node&mdash;the
default error behavior is much more dangerous. The v8 `Error` constructor
provides a set of
[static methods for accessing the raw stack
information](https://v8.dev/docs/stack-trace-api) that are used to create
error stack string. Some of this information is consistent with the level
of disclosure provided by the proposed `getStack` special power above.
Some go well beyond it.

The `errorTaming` option of `lockdown` do not affect the safety of the `Error`
constructor. In all cases, after calling `lockdown`, the tamed `Error`
constructor in the start compartment follows ocap rules.
Under v8 it emulates most of the
magic powers of the v8 `Error` constructor&mdash;those consistent with the
level of disclosure of the proposed `getStack`. In all cases, the `Error`
constructor shared by all other compartments is both safe and powerless.

See the [error README](./src/error/README.md) for an in depth explanation of the
relationship between errors, `assert` and the virtual `console`.

```js
lockdown(); // errorTaming defaults to 'safe'
// or
lockdown({ errorTaming: 'safe' }); // Deny unprivileged access to stacks, if possible
// vs
lockdown({ errorTaming: 'unsafe' }); // stacks also available by errorInstance.stack
```

The `errorTaming` default `'safe'` setting makes the stack trace inaccessible
from error instances alone, when possible. It currently does this only on
v8 (Chrome, Brave, Node). It will also do so on SpiderMonkey (Firefox).
Currently is it not possible for the SES-shim to hide it on other
engines, leaving this information leak available. Note that it is only an
information leak. It reveals the magic information only as a powerless
string. This leak threatens
[confidentiality but not integrity](https://agoric.com/taxonomy-of-security-issues/).

Since the current JavaScript de facto reality is that the stack is only
available by saying `err.stack`, a number of development tools assume they
can find it there. When the information leak is tolerable, the `'unsafe'`
setting will preserve the filtered stack information on the `err.stack`.

## `stackFiltering` Options

**Background**: The error stacks shown by many JavaScript engines are
voluminous.
They contain many stack frames of functions in the infrastructure, that is
usually irrelevant to the programmer trying to disagnose a bug. The SES-shim's
`console`, under the default `consoleTaming` option of `'safe'`, is even more
voluminous&mdash;displaying "deep stack" traces, tracing back through the
[eventually sent messages](https://github.com/tc39/proposal-eventual-send)
from other turns of the event loop. In Endo (TODO docs forthcoming) these deep
stacks even cross vat/process and machine boundaries, to help debug distributed
bugs.

```js
lockdown(); // stackFiltering defaults to 'concise'
// or
lockdown({ stackFiltering: 'concise' }); // Preserve important deep stack info
// vs
lockdown({ stackFiltering: 'verbose' }); // Console shows full deep stacks
```

When looking at deep distributed stacks, in order to debug distributed
computation, seeing the full stacks is overwhelmingly noisy. The error stack
proposal leaves it to the host what stack trace info to show. SES virtualizes
elements of the host. With this freedom in mind, when possible, the SES-shim
filters and transforms the stack trace information it shows to be more useful,
by removing information that is more an artifact of low level infrastructure.
The SES-shim currently does so only on v8.

However, sometimes your bug might be in that infrastrusture, in which case
that information is no longer an extraneous distraction. Sometimes the noise
you filter out actually contains the signal you're looking for. The
`'verbose'` setting shows, on the console, the full raw stack information
for each level of the deep stacks.
Either setting of `stackFiltering` setting is safe. Stack information will
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

**Background**: JavaScript suffers from the so-called
[override mistake](https://web.archive.org/web/20141230041441/http://wiki.ecmascript.org/doku.php?id=strawman:fixing_override_mistake),
which prevents lockdown from _simply_ hardening all the primordials. Rather,
for each of
[these data properties](src/enablements.js), we convert it to an accessor
property whose getter and setter emulate [a data property without the override
mistake](https://github.com/tc39/ecma262/pull/1320). For non-reflective code
the illusion is perfect. But reflective code sees that it is an accessor
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

```js
lockdown(); // overrideTaming defaults to 'moderate'
// or
lockdown({ overrideTaming: 'moderate' }); // Moderate mitigations for legacy compat
// vs
lockdown({ overrideTaming: 'min' }); // Minimal mitigations for purely modern code
```

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
  
  
  
  


----------------------------------------------------------------

Originally by Mark in https://medium.com/agoric/ses-securing-javascript-in-the-real-world-4f309e6b66a6

JavaScript applications use and rely on a lot of third-party code, including 
modules, packages, libraries, and in some cases even user-provided code for 
extensions and plug-ins. Too often, applications are fully vulnerable to these 
code dependencies, so not only do their current security vulnerabilities impact 
the applications, so do future vulnerabilities. Over night, any dependency could 
get “upgraded” into an exploit, resulting in a security breach like the 
event-stream incident.

This is where SES comes in. SES is a JavaScript runtime library for running such
third-party code safely inside a featherweight compartment. SES stands for Secure
ECMAScript, where ECMAScript is the standards name for JavaScript. SES addresses 
JavaScript’s lack of security. SES supports practicing of the Principle of Least 
Authority (or POLA), so that the risk from most third-party code can be 
substantially reduced.

Early JavaScript provided no such compartmentalization. Essentially any software
component could completely compromise any other component. However, starting in 
2009 with ES5 (ECMAScript version 5), we introduced enablers such as Object.freeze, 
strict-mode, Promise, and Proxy to start securing JavaScript, so we could use it 
as an object-capability (ocap) secure programming language. The decade of work 
since ES5 means you can load a small SES library into any conforming JavaScript 
system to create a safer programming environment. The library in turn enforces 
that further JavaScript code loaded into the system must stay within ocap rules.

## SES in Action

Here are examples of SES case studies, each addressing the need to reduce 
vulnerabilities to third-party libraries:
1. Salesforce: Salesforce uses a SES implementation derived from the SES code 
   they co-developed with Agoric. Salesforce currently supports a five-million 
   developer ecosystem on this implementation, using JavaScript as an ocap language.
2. MetaMask: With SES, MetaMask Snaps allows third parties to write plugins for 
   custom behavior in the MetaMask wallet. One example is the Starkware plugin 
   for their custom cryptography. MetaMask’s LavaMoat secures JavaScript 
   dependencies in the build process through their SES plugins for Webpack 
   and Browserify.
3. Moddable: Moddable’s XS JavaScript Engine (its ECMAScript 2018 engine for 
   embedded devices) is the first engine to directly implement SES. Moddable 
   employs SES both to improve the performance and to reduce the attack surface 
   of these devices.
4. The Internet of Things: TC53, another standards organization under ECMA, has 
   explicitly adopted SES as the base JavaScript for standardizing modules for 
   home appliances, traffic control, and other devices in the Internet of Things. 
   Name-brand manufacturers of household products in the IoT ecosystem are excited 
   about this. Current device security is a nightmare. Writing IoT devices software 
   in SES is a good starting point for building a safer world.
5. Node.js: Node, the leading JavaScript runtime environment for servers, has 
   adopted elements of SES into Node core (e.g., frozen primordials). Node 
   has over a billion downloads and tens of millions of active users.

## Status

The SES-proposal and related proposals to TC-39 are standards-track enhancements 
to JavaScript, while the SES-shim is a library that provides those features. With 
security reviews scheduled in January 2020 SES is headed toward production readiness.

## Further Reading

For further reading, I recommend Kate Sills’ essay “POLA Would Have Prevented the 
Event-Stream Incident.” An Agoric engineer, Sills looks at how malicious code in 
the event-stream npm package last year left some Bitcoin users’ private keys 
vulnerable. Sills explains how SES used to enforce the Principle of Least Authority 
(POLA), could have avoided this.



Originally by Kris at https://medium.com/agoric/ses-support-for-ecmascript-modules-28fc1beb709c

```js
import 'ses';
lockdown();
let compartment = new Compartment();
compartment.evaluate(code);
```

Up to this point, SES has supported evaluating scripts in the SES runtime. Since
every non-trivial application has many modules, running an application previously
required creating a script bundle with a tool like Browserify. We’re excited to
announce the first release of SES that directly supports loading ECMAScript 
modules. This is the first in a series of milestones toward delivering a seamless
experience for applications that use both ECMAScript and CommonJS modules.

Support for ECMAScript modules has been released in SES (Secure ECMAScript) 
version 0.8.0. Generally, SES refers to an effort to introduce security features
to JavaScript, and specifically to our reference implementation, or shim, of the
proposed standards, which is [available on npm](https://www.npmjs.com/package/ses).

JavaScript was created to enable web surfers and motorists of the information 
superhighway to safely run programs offered by strangers. A web page puts 
JavaScript programs in a sandbox that restricts their abilities while maximizing
utility.

This model worked well until web applications started inviting multiple strangers
into the same sandbox. Mashups and interactive advertisements showed the need 
for more flexible security models. Even so, web applications continue to depend 
on a security model where every stranger gets their own sandbox.

Meanwhile, server-side JavaScript applications imbue their sandbox with unbounded
abilities and run programs written by vast hosts of strangers. Such applications 
are vulnerable to not just their dependencies, but also the rarely reviewed 
dependencies of their dependencies.

SES proposes a finer grain security model, Object Capabilities or tersely, OCap. 
In this model, you can invite many strangers to collaborate in a single sandbox, 
without risk of them frustrating, interfering, or conspiring with or against the
user or each other.

To do this, SES hardens the entire surface of the JavaScript environment. Thereafter,
as shown below, no program can subvert another or even communicate with another 
program unless expressly granted a reference to an object provided by that program.

```js
import 'ses';
lockdown();
let compartment = new Compartment();
compartment.evaluate(code);
```

As a way for programs to interact safely, any programming environment that fits 
the OCap model satisfies three requirements:
- Any program can protect its invariants by hiding its own data and capabilities.
- The only way to exercise power over something is to have a reference to the 
  object that provides that power, like a file system object, or even a highly 
  limited, attenuated file system object. We call a reference to a powerful 
  object a capability.
- The only way to get a capability is to be given one, for example by receiving
  one as an argument of a constructor or method.

Toward satisfying the OCap requirements, JavaScript has a leg up on C, because
in JavaScript you can’t create a pointer from a number. However, JavaScript does 
not fully qualify as an OCap language due to the pervasive mutability of shared 
objects. It is possible to construct a JavaScript subset with a transitively 
immutable environment without any unintended capabilities. Beginning in 2007 
with the development of ECMAScript 5, members of the Agoric team and the OCap 
community have influenced JavaScript’s evolution so that a JavaScript program 
can transform its own environment into this safe JavaScript environment.

Some of the necessary pieces of this puzzle are freeze(), defineProperties(), 
WeakMap, and Proxy. The freeze() and defineProperties() functions allow a 
JavaScript program to make the surface of every reachable object in their 
environment immutable. The WeakMap and Proxy classes allow programs to create
revocable membranes, objects that can grant a capability temporarily.

SES uses freeze() and defineProperties() in its lockdown() function. Running 
lockdown() freezes every object accessible in its environment, or precisely, 
transforms its realm into a frozen realm. Functions that can’t be made immutable
by freezing, like Math.random() and Date.now(), are replaced with powerless 
versions, or tamed. Anything not recognized as part of the safe JavaScript 
environment gets removed. SES also provides the harden() function so programs 
can make the API surface of any capability tamper-proof, freezing every object 
accessible by following properties of that object.

A compartment is an environment for a stranger’s code. Each compartment has its
own global object and, after lockdown, shares the same frozen realm with other 
compartments. A single compartment can run a JavaScript program in the 
locked-down SES environment, but most interesting programs have multiple modules.
So, each compartment also gets its own module system. The next SES release includes
support for ECMAScript modules, a relatively new system supported by many browsers,
and officially released in Node.js 14.

```js
compartment
.import('./main.js')
.then(({ namespace: main }) => {
  // …
});
```

We can also link compartments, so one compartment can export a module that another 
compartment imports. Each compartment may have its own rules for how to resolve 
import specifiers and how to locate and retrieve modules. In this example, we 
use the compartment constructor to create two compartments: one for the application
and another for its dependency.

```js
const dependency = new Compartment({}, {}, {
  resolveHook: (moduleSpecifier, moduleReferrer) =>
    resolve(moduleSpecifier, moduleReferrer),
  importHook: async moduleSpecifier => {
    const moduleLocation = locate(moduleSpecifier);
    const moduleText = await retrieve(moduleLocation);
    return new ModuleStaticRecord(moduleText, moduleLocation);
  },
});
const application = new Compartment({}, {
  'dependency': dependency.module('./main.js'),
}, {
  resolveHook,
  importHook,
});
view raw
```

We expect the introduction of compartments to greatly simplify using SES for large
applications. In the coming weeks, we will be building tools that use compartments
to load and bundle existing libraries and then execute them with a compartment for
each package. This will provide a seamless experience as simple as <script src=“app.js”> or
node app.js, but with the safety of SES.

