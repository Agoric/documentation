# Contract installation and instance

Zoe has two methods to "create a contract": 
- `zoe.install(code, moduleFormat)` which returns an `installationHandle`
- `zoe.makeInstance(installationHandle, issuerKeywordRecord, terms)` which returns an `invite` to participate in the contract

This two-step process to create may feel unnecessarily convoluted at first.

The reason Zoe is designed this way is that it is assumed that the JavaScript source `code` of the contract may be large (several kilobytes, maybe several megabytes) and for the purpose of transparency, this source code will be stored in blockchains when Zoe runs on a blockchain.

```js
const mySuperContractSourceCode = ` ... 1 Megabyte string ... `;
const moduleFormat = 'getExport';

const superInstallHandle1 = zoe.install(mySuperContractSourceCode, moduleFormat); // stores 1Mb in the blockchain
const invite1 = zoe.makeInstance(superInstallHandle1, issuerKeywordRecord, terms); 

const superInstallHandle2 = zoe.install(mySuperContractSourceCode, moduleFormat); // stores another 1Mb in the blockchain 
// now 2Mb for the same contract
const invite2 = zoe.makeInstance(superInstallHandle2, issuerKeywordRecord, terms); 

const superInstallHandle3 = zoe.install(mySuperContractSourceCode, moduleFormat); // stores another 1Mb in the blockchain 
// now 3Mb for the same contract
const invite3 = zoe.makeInstance(superInstallHandle3, issuerKeywordRecord, terms); 

// etc...
```

`installationHandle`s are a solution to prevent a situation where people who want to use the same contract would store a copy of the code several times.

```js
const mySuperContractSourceCode = ` ... 1 Megabyte string ... `;
const moduleFormat = 'getExport';

const superInstallHandle = zoe.install(mySuperContractSourceCode, moduleFormat); // stores 1Mb in the blockchain
const invite1 = zoe.makeInstance(superInstallHandle, issuerKeywordRecord, terms); 

// second contract instance; relies on the source code already stored
const invite2 = zoe.makeInstance(superInstallHandle, issuerKeywordRecord, terms); 

// still 1Mb in the blochain, but third contract instance
const invite3 = zoe.makeInstance(superInstallHandle, issuerKeywordRecord, terms); 

// etc...
```


## Using installationHandles

### How can i make sure an installationHandle refers to the correct source code?

Zoe has a `zoe.getInstallation(installationHandle)` handle which returns the source code

```js
const mySuperContractSourceCode = ` ... 1 Megabyte string ... `;
const moduleFormat = 'getExport';

const superInstallHandle = zoe.install(mySuperContractSourceCode, moduleFormat); // stores 1Mb in the blockchain

const thisInstallSourceCode = zoe.getInstallation(superInstallHandle)

console.log(thisInstallSourceCode);
// ` ... 1 Megabyte string ... `

console.log(mySuperContractSourceCode === thisInstallSourceCode);
// true
```


### Sharing installationHandles with other people

If you write a smart contract and want people to know about it, you can store the installationHandle in a place where people can find it. In the current Agoric stack/testnet, the proper way would be to create a registrar entry

```js
const mySuperContractSourceCode = ` ... 1 Megabyte string ... `;
const moduleFormat = 'getExport';

const superInstallHandle = zoe.install(mySuperContractSourceCode, moduleFormat); // stores 1Mb in the blockchain

const key = registrar.register('the-super-contract', superInstallHandle);

console.log(key);
// the-super-contract-85809
```

From this point, share `the-super-contract-85809` with other people participating to this blockchain and with access to `zoe` and `registrar`. They can now use the contract you shared:

```js
const superDuperInstallationHandle = registrar.get('the-super-contract-85809');

// inspect source code to be sure it's the right one
console.log('source code', zoe.getInstallation(superDuperInstallationHandle))
// yup, expected source code

// create contract instance
const invite = zoe.makeInstance(superInstallHandle, issuerKeywordRecord, terms);
```

