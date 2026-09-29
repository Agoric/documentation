# Async Flow: Durable Orchestration Across Upgrades

Orchestration operations are long-lived. A single cross-chain interaction can
`await` a reply that arrives many blocks, or even weeks, later (see
[What is Agoric Orchestration?](./index.md)). During that wait the contract that
started the operation may be **upgraded** to a new code version. A naive
`async` function cannot survive an upgrade: when the vat holding it is replaced,
the in-progress call stack, the closure variables, and the pending promises are
all gone.

**Async flow** is the mechanism that lets an ordinary-looking `async` function
outlive upgrades. You write a normal `async`/`await` function; the async-flow
machinery records everything it does and, in a later incarnation of the
contract, **replays** that record to reconstruct the function's state and let it
continue from where it left off. This is what makes it safe to write
multi-block, multi-chain orchestration logic as straight-line asynchronous code
instead of a hand-rolled durable state machine.

The mechanism lives in the [`@agoric/async-flow`](https://github.com/Agoric/agoric-sdk/tree/master/packages/async-flow)
package. This page explains the concept at the level a contract author needs.
The authoritative low-level model is the package's own
[async-flow-states writeup](https://github.com/Agoric/agoric-sdk/blob/master/packages/async-flow/docs/async-flow-states.md);
nothing here should contradict it, and if you are debugging a stuck or failed
flow, read that document for the exact state machine.

## The problem async flow solves

Agoric contracts are **durable**: their important state is kept in a
[zone](/guides/js-programming/zones.md) so that it survives an upgrade to new
contract code. Durable objects ([Exos](/guides/js-programming/exo.md)) and
durable promises ([Vows](https://github.com/Agoric/agoric-sdk/tree/master/packages/vow))
are the building blocks. But an `async` function's _execution state_ is not one
of those building blocks. The moment you write:

```js
const result = await someRemoteCall();
doSomethingWith(result);
```

the fact that you are "paused at this `await`, and will run `doSomethingWith`
next" lives only in the JavaScript engine's call stack. An upgrade discards it.

Async flow closes that gap. It wraps your function so that:

- Every effect the function has on the outside world (every host call it makes,
  and every result or rejection it receives back) is appended to a durable
  **log**.
- After an upgrade, the new incarnation re-invokes your function and drives it
  back through that log, handing it the same results in the same order, until it
  has caught up to where the previous incarnation was suspended. From there it
  runs live again.

Because the replay is **deterministic**, the reconstructed function reaches
exactly the state it had before the upgrade, without re-issuing any of the
side effects it already performed.

## Guest functions and the host/guest membrane

The function you write and hand to async flow is called a **guest function**.
The durable objects it talks to (accounts, tools, your contract's own kit)
live on the **host** side. Between them sits a **membrane**.

The membrane is the heart of the mechanism, and in practice you see it in the
types. A guest function does not receive the host's durable objects directly; it
receives membrane-wrapped views of them. In the portfolio contract, the guest
context type spells this out explicitly
([`portfolio.flows.ts`](https://github.com/Agoric/agoric-sdk/blob/master/packages/portfolio-contract/src/portfolio.flows.ts)):

```ts
import type { GuestInterface } from '@agoric/async-flow';

// ...

inertSubscriber: GuestInterface<ResolvedPublicTopic<never>['subscriber']>;
zoeTools: GuestInterface<ZoeTools>;
resolverClient: GuestInterface<ResolverKit['client']>;
```

`ZoeTools` is a host-side durable facet. Inside the flow it appears as
`GuestInterface<ZoeTools>`: same methods, but every call passes through the
membrane. The membrane does two jobs:

- **Recording.** When the guest calls a host method, the membrane logs the call
  and its eventual result, so the call can be reproduced on replay.
- **Translation.** A guest works with promises; the host works with durable
  [vows](https://github.com/Agoric/agoric-sdk/tree/master/packages/vow). The
  membrane translates between the two so that, inside your flow, a host vow can
  be `await`ed as if it were an ordinary promise. Only host-side objects are
  ever written to the log, because the log has to survive an upgrade after which
  no guest object exists.

On replay the membrane starts from an empty object mapping (its "bijection")
and rebuilds the correspondence between guest and host objects as it re-drives
the log. See the
[async-flow-states writeup](https://github.com/Agoric/agoric-sdk/blob/master/packages/async-flow/docs/async-flow-states.md)
for how an activation moves through the _Running_, _Sleeping_, _Replaying_,
_Failed_, and _Done_ states around an upgrade.

## What you may and may not do in a flow

Replay only works if the guest function is **deterministic** with respect to the
log. That imposes a small number of rules a flow author must respect. The
[package README](https://github.com/Agoric/agoric-sdk/blob/master/packages/async-flow/README.md)
states them precisely; the practical summary is:

- **Keep the function closed.** A guest function must not read or mutate
  variables captured from its surrounding scope other than powerless globals.
  Anything it needs must arrive through its arguments or its membrane-wrapped
  context, so that every effect flows through the replay machinery. Reading
  outside state, or causing effects outside the membrane, can make a later
  replay diverge from the log and put the flow into the _Failed_ state.
- **Do all outside work through host calls.** Account operations, transfers,
  and queries are host calls, so they are logged and replayed. Ordinary local
  computation on the values you already hold is fine and is not logged.
- **Treat host vows as awaitable promises.** Inside a flow you `await` the
  result of a host call directly; the membrane turns the returned vow into a
  promise for you. This is why the orchestration walkthroughs note that a value
  such as a `makeOnce` account, which is really a durable vow, is simply
  `await`ed inside a flow (see the
  [send-anywhere walkthrough](./contract-walkthroughs/send-anywhere.md)).
- **Avoid nested `await` in an expression position.** Portfolio flows open with
  `await null;` for exactly this reason, citing the SDK's
  [No-Nested-Await](https://github.com/Agoric/agoric-sdk/wiki/No-Nested-Await)
  guidance.
- **`console` is exempt.** Diagnostic logging is treated as write-only and is
  not part of the replayed behavior, so tracing inside a flow is allowed and is
  not required to reproduce on replay.

## How flows are wired to a contract

Contract authors rarely call `@agoric/async-flow` directly. The Orchestration
API's `orchestrateAll` (and its single-function sibling `orchestrate`) does it
for them. In
[`orchestration/src/facade.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/facade.js),
`orchestrate` is implemented on top of async flow:

```js
const { prepareEndowment, asyncFlow } = asyncFlowTools;

// ...

const subZone = zone.subZone(durableName);
const [wrappedCtx] = prepareEndowment(subZone, 'endowments', [hostCtx]);
const hostFn = asyncFlow(subZone, 'asyncFlow', guestFn);
```

`asyncFlowTools` comes from `prepareAsyncFlowTools` in
[`@agoric/async-flow`](https://github.com/Agoric/agoric-sdk/blob/master/packages/async-flow/src/async-flow.js),
prepared once per contract in
[`orchestration/src/utils/start-helper.js`](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/utils/start-helper.js).
So when you call `orchestrateAll({ myFlow }, hostCtx)` you get back a **host
wrapper** for `myFlow`. Calling that wrapper creates a durable _activation_ of
the flow whose eventual outcome is a vow, and `hostCtx` is passed through the
membrane so the guest sees `GuestInterface`-typed views of it.

## Worked example: the portfolio contract

The [portfolio contract](https://github.com/Agoric/agoric-sdk/tree/master/packages/portfolio-contract)
(the contract behind YMax) is a current, non-toy consumer of async flow. It
orchestrates long-lived, multi-chain yield positions, and every one of its
orchestration steps is a guest flow. Two of its flows show the pattern from the
simplest case to a realistic one.

### The minimal flow: `makeLCA`

The contract needs one Agoric local account of its own. The flow that makes it,
in [`portfolio.flows.ts`](https://github.com/Agoric/agoric-sdk/blob/master/packages/portfolio-contract/src/portfolio.flows.ts),
is three lines:

```ts
export const makeLCA = (async (orch: Orchestrator): Promise<LocalAccount> => {
  const agoricChain = await orch.getChain('agoric');
  return agoricChain.makeAccount();
}) satisfies OrchestrationFlow;
harden(makeLCA);
```

It is an ordinary `async` function. Its only parameter is the `Orchestrator`,
which async flow supplies. `orch.getChain('agoric')` and
`agoricChain.makeAccount()` are host calls, so they are logged. The
`satisfies OrchestrationFlow` annotation is how the flow declares itself to the
type system.

The contract wires and invokes it in
[`portfolio.contract.ts`](https://github.com/Agoric/agoric-sdk/blob/master/packages/portfolio-contract/src/portfolio.contract.ts):

```ts
const { makeLCA } = orchestrateAll({ makeLCA: flows.makeLCA }, {});
const contractAccountV = zone.makeOnce('contractAccountV', () => makeLCA());
void vowTools.when(contractAccountV, acct => {
  const addr = acct.getAddress();
  // ...publish the contract account address...
});
```

The important detail is durability. `orchestrateAll` turns `flows.makeLCA` into
a host wrapper; calling it returns the account as a **vow**, not a bare promise.
That vow is stored with `zone.makeOnce('contractAccountV', ...)`, so it is
created exactly once and survives upgrades. If the contract is upgraded while
account creation is still in flight, the `makeLCA` activation revives, replays
its logged host calls, and settles `contractAccountV` as if the upgrade had
never happened. Consumers such as the `vowTools.when(...)` above see the same
account either way.

### A realistic flow: `openPortfolio`

`openPortfolio` (also in `portfolio.flows.ts`) is the flow that opens a new
portfolio and optionally its first yield positions. It provisions accounts on
Agoric and Noble, may defer some provisioning for an EVM-wallet open, and runs a
sequence of transfer steps. Because it has been through contract upgrades, its
source carries direct evidence of the replay discipline:

```ts
export const openPortfolio = (async (
  orch: Orchestrator,
  ctx: PortfolioBootstrapContext,
  seat: ZCFSeat,
  offerArgs: OfferArgsFor['openPortfolio'],
  madeKit?: GuestInterface<PortfolioKit>,
  openConfig?: FlowConfig & { explicitStartFlow?: boolean },
  // ...
) => {
  // ...
  await null; // see https://github.com/Agoric/agoric-sdk/wiki/No-Nested-Await
```

The parameters are all either plain data or `GuestInterface`-wrapped host
objects (for example `madeKit?: GuestInterface<PortfolioKit>`): the guest never
touches a raw host object. The opening `await null;` follows the no-nested-await
rule described above.

Where the flow decides how to provision accounts, a comment states the replay
constraint outright:

```ts
// The contract wrapper omits openConfig when replaying activations created
// before flow configuration was introduced. Keep their eager provisioning
// sequence intact; only newly-created EVM opens defer Noble provisioning.
const needsNobleNow =
  evmDepositDetails === undefined || openConfig === undefined;
```

This is the practical face of deterministic replay. A flow activation started by
an older contract version logged a particular sequence of host calls. When a
newer version replays that activation, it must issue the **same** host calls in
the same order, even though the new code path for fresh opens is different. The
contract preserves the old sequence by omitting `openConfig` on replay, and a
companion helper keeps the legacy path intact rather than re-routing it:

```ts
/**
 * Preserve the host-call sequence recorded by openPortfolio activations that
 * predate flow configuration. Keep this implementation structurally aligned
 * with the former eager setup rather than routing it through new provisioning
 * helpers.
 */
const setupPortfolioAccountsLegacy = async (/* ... */) => {
  // ...eager provideCosmosAccount / registerNobleForwardingAccount sequence...
};
```

The lesson for a flow author: once activations of a flow exist in production,
changing the flow's code is an exercise in preserving the host-call sequence
those activations will replay. Add new behavior on new code paths; do not
disturb the order of host calls an in-flight activation already logged.

## Further reading

- [async-flow-states](https://github.com/Agoric/agoric-sdk/blob/master/packages/async-flow/docs/async-flow-states.md):
  the authoritative activation state machine (_Running_, _Sleeping_,
  _Replaying_, _Failed_, _Done_).
- [`@agoric/async-flow` README](https://github.com/Agoric/agoric-sdk/blob/master/packages/async-flow/README.md):
  the closed-function requirement and its exceptions, stated precisely.
- [Key Concepts and APIs](./key-concepts.md): the Orchestrator, Orchestration
  accounts, and ChainHub a flow calls into.
- [Send Anywhere walkthrough](./contract-walkthroughs/send-anywhere.md): a
  smaller end-to-end flow, with the durable-account and vow-as-promise pattern.
- [Vows](https://github.com/Agoric/agoric-sdk/tree/master/packages/vow): the
  durable promise type the membrane translates to and from.
