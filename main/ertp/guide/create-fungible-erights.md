# Creating a fungible eright with ERTP

## Definition of "fungible"

A **fungible** asset means that different elements of this asset are interchangeable
Currencies are interchangeable: if you have 10 one-dollar notes laying around and decide
to take 5 of them, you do not care which 5 you will take. They're all "the same" as far 
as counting value goes.

This would not be the case for 10 house ownership rights each designating a different house
House ownership right are not fungible, they are **specific**


## Creating a fungible asset with ERTP

### Creating and sending the asset

In ERTP, digital assets are created by a [`mint`](./mint.html). Having access to the mint
gives you the power to create more digital assets of the same type at
will. For instance, let's say we want to create a new community
currency called 'BaytownBucks'.
You would first install the [ertp JavaScript package](https://www.npmjs.com/package/@agoric/ertp)
(`npm install @agoric/ertp`) and then:

```js
import { makeMint } from '@agoric/ertp/core/mint';

const baytownBucksMint = makeMint('BaytownBucks');
```

Great! Now let's use our mint to create 1000 new BaytownBucks.

```js
const purse = baytownBucksMint.mint(1000, 'community treasury');
```

The act of minting created 1000 BaytownBucks and stored them together in a
`purse`. [Purses](./mint.html#purses) in ERTP only hold one type of digital asset, so this
purse can only ever hold BaytownBucks.

Let's distribute the BaytownBucks to members of the community. To send
money in ERTP, we withdraw [`payments`](./mint.html#payments) from purses.

```js
const paymentForAlice = purse.withdraw(10, `alice's community money`);
```

Like our purse, this payment contains BaytownBucks, but unlike purses,
payments are used to represent tokens in transit. A payment can be
sent to someone else, a purse never should be.

Now let's send the payment to Alice as message:

```js
alice.receivePayment(paymentForAlice);
```

Here `alice` is an object reference, and we can call her `receivePayment`
to ask her to receive this payment. Alice's methods are entirely up to her, 
and are not part of ERTP.


### Receiving the asset

On Alice side, there is probably already an existing BaytownBucks purse where
she will accumulate all the BaytownBucks she receives

```js
// assumed myBaytownBucksPurse variable which contains a genuine BaytownBucks purse

myBaytownBucksPurse.getBalance(); // 150
// Alice already has 150 BaytownBucks

const alice = {
    receivePayment(baytownBucksPayment){
        myBaytownBucksPurse.depositAll(baytownBucksPayment)
    }
}
```

And just like that, when `alice.receivePayment(paymentForAlice)` from above 
is called, Alice accumulates the 1000 payment in her purse which already contains
150 units for a total of 1150

When alice wants to exchange something for 300 BaytownBucks, she creates a payment:
```js
const payment = myBaytownBucksPurse.withdraw(300);
```

This came naturally without having to express "which" 300 she wanted to withdraw

And this is how fungible assets work in ERTP!
