# Zoe Service

<Zoe-Version/>

Zoe provides a framework for deploying and working with smart contracts. It is accessed
as a long-lived and well-trusted service that enforces offer safety for the contracts that use it. Zoe
has a single **[InvitationIssuer](./zoe-data-types.md#invitationissuer)** for the entirety of its lifetime. By having a reference to Zoe, a user
can get the **InvitationIssuer** and thus validate any **invitation** they receive from someone else.

::: tip Zoe is accessed asynchronously
The Zoe service is accessed asynchronously, using a standards-track library extension
to JavaScript that uses promises as remote references. In code, the Zoe service instance
is referred to via **Zoe**, which only supports asynchronous invocation. Operations are
invoked asynchronously using the [**E** helper for async messaging](https://github.com/tc39/proposal-eventual-send#e-and-esendonly-convenience-proxies).
All such operations immediately return a promise for their result. That may eventually fulfill to a
local value, or to a **Presence** for another remote object (e.g., in another contract or service,
running on another chain, etc.). Asynchronous messages can be sent using **E** with either promises or
presences.

For more information about using **E**, see the [Agoric's JavaScript Distributed Programming Guide](/guides/js-programming/eventual-send.md).
:::

## E(Zoe).getBrands(instance)
- **instance** **[Instance](./zoe-data-types.md#instance)**
- Returns: **Promise&lt;BrandKeywordRecord>**

Returns a **Promise** for a **BrandKeywordRecord** containing all **[Brands](/reference/ertp-api/brand.md)** defined in the *instance* argument.

A **BrandKeywordRecord** is an object where the keys are **[Keywords](./zoe-data-types.md#keyword)**,
and the values are the **Brands** for particular **[Issuers](/reference/ertp-api/issuer.md)**.

```js
// Record example
const brandKeywordRecord = {
  FirstCurrency: quatloosBrand,
  SecondCurrency: moolaBrand,
  //etc.
};
```

```js
// Call example
const brandKeywordRecord = await E(Zoe).getBrands(instance);
```

## E(Zoe).getIssuers(instance)
- **instance** **[Instance](./zoe-data-types.md#instance)**
- Returns: **Promise&lt;IssuerKeywordRecord>**

Returns a **Promise** for an **IssuerKeywordRecord** containing all **[Issuers](/reference/ertp-api/issuer.md)** defined in the *instance* argument.

An **IssuerKeywordRecord** is an object where the keys are **[Keywords](./zoe-data-types.md#keyword)**,
and the values are **Issuers**.

```js
// Record example
const issuerKeywordRecord = {
  FirstCurrency: quatloosIssuer,
  SecondCurrency: moolaIssuer,
};
```

```js
// Call example
const issuerKeywordRecord = await E(Zoe).getIssuers(instance);
```

## E(Zoe).getTerms(instance)
- **instance** **[Instance](./zoe-data-types.md#instance)**
- Returns: **Promise&lt;Object>**

Returns a **Promise** for the terms of the *instance* argument, including its **[Brands](/reference/ertp-api/brand.md)**, **[Issuers](/reference/ertp-api/issuer.md)**, and any
custom terms. The returned values look like:

```js
{
  //brands and issuers are keywordRecords
  brands: { A: moolaKit.brand, B: simoleanKit.brand },
  issuers: { A: moolaKit.issuer, B: simoleanKit.issuer },
  customTermA: 'something',
  customTermB: 'something else',
  //All other customTerms
};
```
 
```js
const terms = await E(Zoe).getTerms(instance);
```

## E(Zoe).getPublicFacet(instance)
- **instance** **[Instance](./zoe-data-types.md#instance)**
- Returns: **Promise&lt;PublicFacet>**

Returns a **Promise** for the **PublicFacet** defined for the *instance* argument.

A contract instance's **PublicFacet** is an object available via Zoe to anyone knowing that **Instance**.
You use it for general queries and actions, such as getting a current price or creating public invitations.
Since a facet is defined just as any other object, the contract adds methods to the **PublicFacet** just like you would
any object.

```js
const ticketSalesPublicFacet = await E(Zoe).getPublicFacet(sellItemsInstance);
```

## E(Zoe).getInvitationIssuer()
- Returns: **Promise&lt;[InvitationIssuer](./zoe-data-types.md#invitationissuer)>**

Returns a **Promise** for the **InvitationIssuer** for the Zoe instance.

```js
const invitationIssuer = await E(Zoe).getInvitationIssuer();
// Here a user, Bob, has received an untrusted invitation from Alice.
// Bob uses the trusted **InvitationIssuer** from Zoe to
// transform the untrusted invitation to a trusted one
const trustedInvitation = await invitationIssuer.claim(untrustedInvitation);
const { value: invitationValue } =
    await E(invitationIssuer).getAmountOf(trustedInvitation);
```

## E(Zoe).getInvitationDetails(invitation)
- **invitation** **Invitation**
- Returns **Promise&lt;Object>**

Takes an **Invitation** as an argument and returns a **Promise** for an object containing the following
details about the **Invitation**:

- **installation** **Installation**: The contract's Zoe installation.
- **instance** **[Instance](./zoe-data-types.md#instance)**: The contract instance this invitation is for.
- **invitationHandle** **Handle**: A handle used to refer to this **Invitation**.
- **description** **String**: Describes the purpose of this **Invitation**. Use it
   to match the invitation to the role it plays in the contract.

```js
const invitation = await invitationIssuer.claim(untrustedInvitation);
const invitationValue = await E(Zoe).getInvitationDetails(invitation);
```

## E(Zoe).install(bundle)
- **bundle** **SourceBundle**
- Returns: **Promise&lt;Installation>**

Takes bundled source code for a Zoe contract as an argument and installs the code on Zoe.
Returns a **Promise** for an **Installation** object.

```js
// bundleSource takes source code files and
// bundles them together in the format install expects.
import bundleSource from '@endto/bundle-source';
const bundle = await bundleSource(pathResolve(`./src/contract.js`));
const installationP = await E(Zoe).install(bundle);
```

## E(Zoe).getConfiguration()
- Returns: **Promise&lt;Object>**

Returns a **Promise** for the configuration settings for the Zoe contract.

## E(Zoe).getFeeIssuer()
- Returns: **Promise&lt;[Issuer](/reference/ertp-api/issuer.md)>**

Returns a **Promise** for an **Issuer** that can mint ISTs.

## E(Zoe).getOfferFilter(instance)
- **instance** **[Instance](./zoe-data-types.md#instance)**
- Returns: **Array&lt;String>**

Returns all the offer **[Keywords](./zoe-data-types.md#keyword)** that have been disabled, if any. Offer **Keywords** may be disabled if they prove problematic in some fashion, or to debug undesired behavior.

## E(Zoe).getInstance(invitation)
- **invitation** **Invitation**
- Returns: **Promise&lt;[Instance](./zoe-data-types.md#instance)>**

Returns a **Promise** for the contract **instance** the **invitation** is part of.

While **Instances** are opaque objects, you can get information about them via
these methods:

- **getBrands()**
- **getTerms()**
- **getIssuers()**
- **getPublicFacet()**

```js
const instance = await E(Zoe).getInstance(invitation);
```

## E(Zoe).getProposalShapeForInvitation(invitation) 
- **invitation** **Invitation**
- Returns: **Promise&lt;Pattern>**

Returns a **Promise** for the **Pattern** that the **Invitation's** **Proposal** adheres to.

## E(Zoe).getInstallation(invitation)
- **invitation** **Invitation**
- Returns: **Promise&lt;Installation>**

Returns a **Promise** for the contract **installation** the **invitation**'s contract instance uses.

```js
const installation = await E(Zoe).getInstallation(invitation);
```

## E(Zoe).getInstallationForInstance(instance)
- **instance** **[Instance](./zoe-data-types.md#instance)**
- Returns **Promise&lt;Installation>**

Returns a **Promise** for the contract **installation** used by the
**instance**. An **instance** is the unique identifier for the running,
executing contract. The **installation** is the unique identifier for
the underlying code. This method can be used as part of a process to
inspect the underlying code for a running contract **instance**.

```js
const installation = await E(Zoe).getInstallationForInstance(instance);
```

## E(Zoe).startInstance(installation, issuerKeywordRecord?, terms?, privateArgs?)
- **installation** **ERef&lt;Installation>**
- **issuerKeywordRecord** **IssuerKeywordRecord** - Optional.
- **terms** **Object** - Optional.
- **privateArgs** **Object** - Optional.
- Returns: **Promise&lt;StartInstanceResult>**

Creates an instance of the installed smart contract specified by
the *installation* argument. All contracts each run in a new vat with their own version of the
Zoe Contract Facet. There is one vat that contains the Zoe Service.

The *issuerKeywordRecord* is an optional object mapping **[Keywords](./zoe-data-types.md#keyword)**
to **[Issuers](/reference/ertp-api/issuer.md)**, such as **FirstCurrency: quatlooIssuer**.
Parties to the contract will use the **Keywords** to index their proposal and their payments.

The **terms** are values used by this contract instance, such as the
number of bids an auction w ill wait for before closing. These values may
be different for different instances of the same contract, but the contract
defines what variables need their values passed in as **terms**.

**privateArgs** are optional. Pass an object record here with any values
that need to be made available to the contract code, but which should
not be in the public terms. For example, to share minting authority
among multiple contracts, pass in the following as **privateArgs**:

```js
{ externalMint: myExternalMint }
```

It returns a **Promise** for a **StartInstanceResult** object. The object consists of:

- **adminFacet** **AdminFacet**
- **creatorFacet** **any**
- **publicFacet** **any**
- **instance** **Instance**
- **creatorInvitation** **Payment | undefined**

The **adminFacet** has one method:
- **getVatShutdownPromise()**    
  - Returns a promise that resolves to reason (the value passed to **fail(reason)**) or 
    completion (the value passed to **exit(completion)**) when this newly started instance terminates. 

A **publicFacet** is an object available via Zoe to anyone knowing
the instance they are associated with. The **publicFacet** is used for general queries
and actions, such as getting a current price or creating public invitations. Since a
facet is defined just as any other object,
the contract developer can add methods to them just like they would any object.

The **creatorFacet** is only available in this return value (i.e. only when starting
a contract instance). The contract designer
should use it to encapsulate things that the contract runner might not want to share,
or might want to control the distribution of. The party who starts the contract
should carefully consider the impact before sharing access to the **creatorFacet**.

**creatorInvitation** is an invitation that the contract instance creator can use.
It is usually used in contracts where the creator immediately sells
something (auctions, swaps, etc.), so it's helpful for the creator to have
an invitation to escrow and sell goods. Remember that Zoe invitations are
represented as a **Payment**.
```js
const issuerKeywordRecord = {
  Asset: moolaIssuer,
  Price: quatlooIssuer
};
const terms = { numBids: 3 };
const { creatorFacet, publicFacet, creatorInvitation } = await E(Zoe).startInstance(
  installation, issuerKeywordRecord, terms);
```


## E(Zoe).offer(invitation, proposal?, paymentKeywordRecord?, offerArgs)
- **invitation** **Invitation|Promise&lt;Invitation>**
- **proposal** **Proposal** - Optional.
- **paymentKeywordRecord** **PaymentKeywordRecord** - Optional.
- **offerArgs** **Object**
- Returns: **Promise&lt;[UserSeat](./user-seat.md)>**

Used to make an offer to the contract that created the **Invitation** that is
provided as the first argument.

### Proposals and Payments

The invocation normally includes a **proposal** (the
rules under which they want to exercise the offer) and **payments** that correspond 
to the **give** property of the **proposal**. The payments will be escrowed by Zoe. If
either the **proposal** or **payments** are empty, indicate this by
omitting that argument or passing **undefined**, instead of passing an
empty record.

The optional **exit**'s value should be an **exitRule**, an object with three possible keys for
key:value pairs:

- **onDemand: null**: (Default) The offering party can cancel on demand.
- **waived: null**: The offering party can't cancel and relies entirely on the smart contract to promptly finish their offer.
- **afterDeadline**: The offer is automatically cancelled after a deadline, as determined 
  by its **timer** and **deadline** properties.
  **timer** must be a timer, and **deadline** must be a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) value interpreted with respect to the timer.
  Some example timers use Unix epoch time, while others count block height.

```js
const myProposal = harden({
  give: { Asset: quatloos(4n)},
  want: { Price: moola(15n) },
  exit: { afterDeadline: {
    timer,
    deadline: 100n
  }}
})
```

**paymentKeywordRecord** is a record with **[Keywords](./zoe-data-types.md#keyword)** as keys and with
 values of the actual **payments** to be escrowed. A **payment** is
 expected for every entry under **give**.

 **offer()** returns a promise for a **UserSeat**.
 
```js
const paymentKeywordRecord = {
  Asset : quatloosPayment,
  Price : moolaPayment
};
```

### OfferArgs

*offerArgs* is an object that can be used to pass
additional arguments to the **offerHandler** contract code associated
with the invitation. Which arguments should be included within *offerArgs* is determined by the
contract in question; each contract can define whatever additional arguments it requires. If no
additional arguments are defined for a particular contract, then the *offerArgs* argument can be
omitted entirely. It is up to the contract code how it chooses to handle any unexpected or missing
arguments within *offerArgs*.


Contract code should be careful interacting with *offerArgs*. These values need input validation
before being used by the contract code since they are coming directly from the user and may
have malicious behavior.

## E(Zoe).installBundleID(bundleId)
- bundleId **BundleId**
- Returns: **Promise&lt;Installation>**

Reserved for future use.

## E(Zoe).getBundleIDFromInstallation(installation) 
- **installation** **Installation**
- Returns: **Promise&lt;BundleId>**

Reserved for future use.

