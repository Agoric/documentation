# SES Guide

This document is a guide to understanding *SES (Secure ECMAScript)*. In addition
to showing what you can and cannot do with a program that implements SES, it gives
background on the reasons why functionality was added or removed from JavaScript to do so.
This is intended for initial reading when starting to use or learn about Agoric. For 
a more limited description of how to use SES without much explanation, see 
the [SES Reference](./ses-reference.md).

## What is SES

SES (*Secure ECMAScript*) is a JavaScript runtime library for safely running 
third-party code inside a featherweight compartment. It addresses JavaScript’s 
lack of security, which is particularly significant in that JavaScript applications
use and rely on a lot of third-party code (modules, packages, libraries, 
user-provided code for extensions and plug-ins, etc.). 

SES is a safe deterministic subset of "strict mode" JavaScript. This means 
it does not include any IO objects that provide 
[*ambient authority*](https://en.wikipedia.org/wiki/Ambient_authority). SES 
also removes non-determinism by modifying a few built-in objects. It also uses
added functionality to freeze both built-in JavaScript objects and program created
objects and make them immutable.

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

As of February 2021, SES is making its way through JavaScript standards committees. 
It is expected to become an official part of JavaScript when the standards process 
is completed. Meanwhile, Agoric provides its own SES *shim* for use in writing secure 
smart contracts in JavaScript (Several Agoric engineers are on the relevant standards 
committees and are responsible for aspects of SES).


## What does SES remove from standard JavaScript


## What does SES add to standard Javascript

## Compartments and realms

JavaScript code runs in the context of 
a [*Realm*](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-code-realms). A 
realm is the set of *primordials* (objects and functions of the standard library 
like `Array.prototype.push`) and a global object. In a web browser, an iframe is a realm. 
In Node.js, a Node process is a realm.

For historical reasons, the ECMAScript specification requires the *primordials*
to be mutable (`Array.prototype.push = yourFunction` is valid ECMAScript but not 
recommended). With SES you can turn the current realm into an *immutable realm*; 
a realm within which the primordials are deeply frozen. 

SES also lets programs create *Compartments*. These are "mini-realms".
A Compartment has its own dedicated global object and environment, but 
it inherits the primordials from their parent realm.

Agoric deploy scripts and smart contract code run in an immutable
realm with Compartments providing just enough authority to create
useful and secure contracts. But not enough authority to do anything
unintended or harmful to the participants of the smart contract. 

##`lockdown()`

`lockdown()` freezes all JavaScript defined objects accessible to any 
program in the execution environment. Calling `lockdown()` turns a JavaScript
system into a SES system, with enforced OCap (object-capability) security. It
alters the surrounding execution environment, or realm, such that no two 
programs running in the same realm can observe or interfere with each other 
until they have been introduced.

To do this, lockdown() tamper-proofs all of the JavaScript intrinsics to prevent 
prototype pollution. After that, no program can subvert the methods of these objects 
(preventing some man in the middle attacks). Also, no program can use these mutable
objects to pass notes to parties that haven't been expressly introduced (preventing 
some covert communication channels).

For a full explanation of `lockdown()` and its options, please see
[here](./lockdown.md).

## `harden()`

When you freeze an object via `harden()`, it ensures any external callers 
can only interact with it through functions in the object’s API. `harden()` 
is an enhanced transitive version of `Object.freeze`, which only locks up an 
object's own properties.

All objects that are transferred across a trust boundary must have their API
surface frozen, usually by calling `harden()`. This ensures other objects can 
only interact with them through their defined method interface. *CapTP*, our 
communications layer for passing references to distributed objects, enforces 
this at vat boundaries.

The general rule is that if you make a new object and give it to someone else 
(and don't immediately forget it yourself), you should give them harden(obj) 
instead of the raw object. This prevents someone from adding/deleting the properties
or prototypes of that object. Being hardened doesn't preclude an object from having 
access to mutable state (harden(new Map()) still behaves like a normal mutable Map), 
but it means their methods stay the same and can't be surprisingly changed by someone else

Defined objects (mint, issuer, zcf, etc.) shouldn't need hardening as their 
constructors should do that work. It's mainly records, callbacks, and ephemeral 
objects that need hardening.

You can send a message to a hardened object. If it's a record, you can access 
its properties and their values.

You have to harden a class before you harden any of its instances; i.e. it takes two 
separate steps to harden both a class and its instances. Harden a base class before 
hardening classes that inherit from it. harden() does transitive freezing by following 
the object’s own properties (as opposed to properties it inherited), and the objects 
whose own properties refer to them, and so forth.

`harden()` is automatically provided by SES. Any code that will run inside a vat or a 
contract can use harden as a global, without importing anything.

Tip: If your text editor/IDE complains about harden() not being defined or imported, 
try adding /* global harden */ to the top of the file.

You use harden() like this:

const o = {a: 2};
o.a  = 12;
console.log(o.a); // 12 because o is still mutable

harden(o);

o.a  = 37; // throws a TypeError because o is now hardened

## `lockdown()` and `harden()`

`lockdown()` and `harden()` essentially do the same thing; freeze objects so their 
properties cannot be changed. The only way to interact with frozen objects is through 
their methods. Their differences are what objects you use them on, and when you use them.

`lockdown()` **must** be called first. It hardens JavaScript's built-in *primordials* 
(implicitly shared global objects) and enables `harden()`. If you call `harden()` 
before `lockdown()` excutes, it throws an error.

`lockdown()` works on objects created by the JavaScript language itself as part of 
its definition. Use `harden()` to freeze objects created after `lockdown()`was called;
i.e. objects created by programs written in JavaScript.


