# Distributed programming in JavaScript

Agoric's platform is built mainly in JavaScript and enables authors to write secure smart contracts in JavaScript.

For the biggest part, all JavaScript knowledge is directly applicable to the Agoric platform. However, there are a couple of Agoric-specific additions at various layers that are better to understand before programming on the Agoric platform.

Some specificities are **concepts**, other are at the **syntax level**, others are **Agoric library additions**.


## Vats

A vat is a *unit of synchrony*. This means that within a JavaScript vat, objects and functions can communicate with one another synchronously.

A vat runs a single *event loop*.

A physical machine can run one or several vats. A blockchain can run one or several communicating vats.

Different vats can communicate by sending asynchronous messages to other vats.

A vat is the moral equivalent of a Unix Process.

The internal state of a vat can be stored in a persistent memory so that the vat can be turned off and later turned back on (on the same or a different physical machine) by loading the stored state.

In cosmic-swingset, several vats are started. Each vat hosts a service (registrar, zoe, etc.). Currently (April 2020), all contracts run in the Zoe vat, but eventually, each contract will run in its own dedicated vat.


## Secure EcmaScript (SES)

SES is a variant of [EcmaScript](https://www.ecma-international.org/publications/standards/Ecma-262.htm) (the standard behind JavaScript - common to web browsers JavaScript and Node.js) that is secure in the sense of object capability security. This means that codes that runs in an immutable realm has no access to ambiant authority by default (no access to disk or network, etc.) and new authority can only be granted by the entity that loaded this code.

SES can be enabled via the [`ses` package](https://www.npmjs.com/package/@agoric/harden).

```js
import {lockdown} from "ses";
 
lockdown(); // turns the current realm into an immutable realm
// calling this function also adds a global Compartment constructor to create compartments
```


### Compartments and realms

JavaScript code runs in the context of a [`Realm`](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-code-realms). A realm is composed of the set of *primordials* (objects and functions of the standard library like `Array.prototype.push`) and of a global object. In a web browser, an iframe is a realm. In Node.js, a Node process is a realm.

For historical reasons, the ECMAScript specification requires the *primordials* to be mutable (`Array.prototype.push = yourFunction` is valid ECMAScript but not recommanded). SES provides to turn the current realm into an **immutable realm**, that is a realm within which, the primordials are deeply frozen. It also allows to create **Compartments**.

Compartments are "mini-realms". They have their own dedicated global object and environement, but they inherit the primordials from their parent realm.

Agoric "deploy scripts" and smart contract code run in an immutable realm with compartments providing just enough authority to create useful and secure contracts (but not enough authority to do anything unintended or harmful to the participants of the smart contract)




### harden

`harden` is a function provided by the [`@agoric/harden` package](https://www.npmjs.com/package/@agoric/harden).

In a nutshell, `harden` creates objects that can be trusted. In practice, `harden` performs the deep version of [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) (which only freezes the object's own properties).

Most methods of the Agoric platform require their arguments to be `harden`ed. This is the only way they can provide the security properties they claim to provide.

After you've [installed](https://docs.npmjs.com/cli/install) the [`@agoric/harden` package](https://www.npmjs.com/package/@agoric/harden), you can use it this way:

```js
import harden from '@agoric/harden';

const o = {a: 2};
o.a  = 12;
console.log(o.a); // 12 because o is still mutable

harden(o);

o.a  = 37; // throws a TypeError because o is now hardened
```

### Communicating with remote objects via `E`

Deploy scripts and smart contracts runs in specific vats and may try to access services that run in a different vat (maybe in a different physical machine or in a blockchain). For instance, a deploy script may want to install a contract in a Zoe instance running in a blockchain. For this to happen, the deploy script cannot call `zoe.install(code, moduleFormat)`, because it does not have access to the `zoe` object because it's in a different.

However, the deploy script is given access to a `zoe` *presence*. In order to call methods on the actual Zoe object, the deploy code can do:
```js
const installationHandle = await E(zoe).install(source, moduleFormat);
```

The `E` function is a local "bridge" that allows to talk to remote object and call their methods. The local version of a remote object is called a **presence**. `E` takes a presence as an argument all created an object with the corresponding methods. It performs the communication asynchronously under the hood. Method calls can take arguments that are objects in the current vat or presences to the zoe vat or presences of objects from other vats.



