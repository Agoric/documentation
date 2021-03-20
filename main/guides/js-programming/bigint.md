# `BigInt`

JavaScript's `Number` primitive only represents numbers up to 2<sup>53</sup> - 1. `BigInt` is 
a newer built-in JavaScript object that represents arbitrarily large integers. Agoric uses `BigInts` for 
amount `values` and time values.

You create a `BigInt` by appending `n` to an integer. For example, `10n` is a BigInt equal to
the `Number` `10`. You can also call the method `BigInt()`.
```js
const previouslyMaxSafeInteger = 9007199254740991n

const alsoHuge = BigInt(9007199254740991)
// alsoHuge has the value 9007199254740991n

const hugeString = BigInt("9007199254740991")
// hugeString has the value 9007199254740991n
```

`BigInt` cannot be used with the `Math` object's methods. It cannot be mixed with `Numbers` in operations; 
they must be coerced to the same type. Coercing a `BigInt` to a `Number` may lose precision.

`typeof` returns `'bigint'` for `BigInts`. When wrapped in an `Object`, a `BigInt` is a normal "object" type.

```js
typeof 1n === 'bigint'           // true
typeof BigInt('1') === 'bigint'  // true
typeof Object(1n) === 'object'  // true
```

Note that JSON does not serialize `BigInt` values by default. You must first implement your
own `toJSON()` method. Otherwise `JSON.stringify()` will raise a `TypeError`.
```js
BigInt.prototype.toJSON = function() { return this.toString()  }
// Instead of throwing, JSON.stringify now produces a string like this:

JSON.stringify(BigInt(1))
// '"1"'
```
For full reference information about `BigInt`, go [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
