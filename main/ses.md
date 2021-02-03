Originally by Kris at https://medium.com/agoric/ses-support-for-ecmascript-modules-28fc1beb709c

12345678901234567890123456789012345678901234567890123456789012345678901234567890
Up to this point, SES has supported evaluating scripts in the SES runtime. Since
every non-trivial application has many modules, running an application previously
required creating a script bundle with a tool like Browserify. We’re excited to
announce the first release of SES that directly supports loading ECMAScript 
modules. This is the first in a series of milestones toward delivering a seamless
experience for applications that use both ECMAScript and CommonJS modules.

Support for ECMAScript modules has been released in SES (Secure ECMAScript) 
version 0.8.0. Generally, SES refers to an effort to introduce security features
to JavaScript, and specifically to our reference implementation, or shim, of the
proposed standards, which is available on npm.

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

We can also link compartments, so one compartment can export a module that another 
compartment imports. Each compartment may have its own rules for how to resolve 
import specifiers and how to locate and retrieve modules. In this example, we 
use the compartment constructor to create two compartments: one for the application
and another for its dependency.

We expect the introduction of compartments to greatly simplify using SES for large
applications. In the coming weeks, we will be building tools that use compartments
to load and bundle existing libraries and then execute them with a compartment for
each package. This will provide a seamless experience as simple as <script src=“app.js”> or
node app.js, but with the safety of SES.

