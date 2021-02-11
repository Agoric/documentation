# SES (*Secure ECMAScript*) Guide

## What is this document?

This document is a guide to SES (Secure ECMAScript), going into some detail about
both what it is and why its various design decisions were made. Read this if you want
to understand what SES does and how it does it.

If you just want to know how SES affects developing in Agoric's JavaScript environment,
i.e. what you can do and how do you do it, what can't you do, see 
the [SES Reference](./ses-reference.md).

## SES Introduction

SES is a JavaScript runtime library for safely running third-party code inside a
featherweight compartment. It addresses JavaScript’s lack of security, which is 
particularly significant in that JavaScript applications use and rely on a lot
of third-party code (modules, packages, libraries, user-provided code for 
extensions and plug-ins, etc.). 

SES is a safe deterministic subset of "strict mode" JavaScript. This means 
it does not include any IO objects that provide 
[*ambient authority*](https://en.wikipedia.org/wiki/Ambient_authority). SES 
also removes non-determinism by modifying a few built-in objects.

The next SES release includes support for ECMAScript modules, a relatively new system 
supported by many browsers, and officially released in Node.js 14. As of February 2021, 
SES is making its way through JavaScript standards committees. It is expected to become 
an official part of JavaScript when the standards process is completed. Meanwhile, Agoric
provides its own SES *shim* for use in writing secure smart contracts in JavaScript (Several
Agoric engineers are on the relevant standards committees and are responsible for aspects of SES).

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

### SES Alterations

SES removes, adds, and modifies various aspects of JavaScript. In particular:

- Removed from JavaScript or made unusable:
  - Most [Node.js-specific global objects](https://nodejs.org/dist/latest-v14.x/docs/api/globals.html) 
  - All [Node.js built-in modules](https://nodejs.org/dist/latest-v14.x/docs/api/) such as `http` and 
   `crypto`. 
  - [Features from browser environments](https://developer.mozilla.org/en-US/docs/Web/API) presented 
    as names in the global scope including `atob`, `TextEncoder`, and `URL`.
  - HTML comments
  - Dynamic `import` expressions
  - Direct evals

- Added to or modified from JavaScript
  - console
  - `lockdown()`
  - `harden()`
  - `HandledPromise()` 	
  - `Compartment`   
  - Freezes `globalThis` and JavaScript primordials

We'll look at each of these in more detail.

SES does the following:
- Adds a `lockdown()` function. Running `lockdown()` freezes every 
  object accessible in its environment, or precisely, transforms its 
  realm into a frozen realm. `lockdown()` affects objects defined in 
  the JavaScript language.
- Adds a `harden()` function so programs can make the API surface of any 
  capability tamper-proof, freezing every object accessible by following properties 
  of that object. Call `harden()` on objects created by your program.
- Replaces functions that can’t be made immutable by freezing 
  (e.g. `Math.random()`, `Date.now()`) with powerless or tamed versions. 
- Removes anything unrecognized as part of the safe JavaScript 
  environment. 

### Compartments

SES also makes use of *Compartments* as an environment for a stranger’s code. 
Each Compartment has its own global object and, after lockdown, shares the same 
frozen realm with other compartments. A single compartment can run a JavaScript program
in the locked-down SES environment, but most interesting programs have multiple modules.
So, each Compartment also gets its own module system. 

You can also link Compartments, so one Compartment can export a module that another 
imports. Each Compartment can have its own rules for resolving import specifiers and 
how to locate and retrieve modules. 

We expect Compartments to greatly simplify using SES for large applications. We are 
building tools that use Compartments to load and bundle existing libraries and then 
execute them with a compartment for each package. This will provide a seamless experience 
as simple as `<script src=“app.js”>` or `node app.js`, but with the safety of SES.


## Agoric SES

For the remainder of this page, and its direct decendant pages, we describe the 
version of SES currently implemented and used for and by the Agoric Platform and
the smart contracts written using it. The reference implementation, or *shim*, of the
proposed standards is [available on npm](https://www.npmjs.com/package/ses).

As of SES-0.8.0/Fall 2020, 
[the SES source code](https://github.com/Agoric/SES-shim/blob/SES-v0.8.0/packages/ses/src/whitelist.js) 
defines a subset of the globals defined by the baseline JavaScript language specification. 
SES includes the globals:

- `Object`
- `Array`
- `Number`
- `Map`
- `WeakMap`
- `Number`
- `BigInt`
- `Intl`
- `Math`
  - `Math.random()` is disabled (calling it throws an error) as an obvious source of   
     non-determinism.  
- `Date`
  - `Date.now()` returns `NaN`
  - `new Date(nonNumber)` or `Date(anything)` return a `Date` that stringifies to `"Invalid Date"`

Agoric retains the other `Math` and `Date` features, which are purely computational and deterministic.

Much of the `Intl` package, and some locale-specific aspects of other objects 
(e.g. `Number.prototype.toLocaleString`) have results that depend upon which 
locale is configured. This varies from one process to another. Agoric's handling 
of this is still in development. Either these functions will be disabled, or 
they will act as if run on a host with a single fixed locale as defined by 
the SES specification.




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

