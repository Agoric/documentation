# provideOrchestration API Documentation

## Overview
The `provideOrchestration` function is a helper utility designed for setting up orchestration
tools and resources required by a contract within the Agoric ecosystem. This function
initializes various orchestration components and returns an object containing these tools,
which can then be used to facilitate complex interchain interactions and management.

## Function Signature

```javascript
export const provideOrchestration = (
  zcf,
  baggage,
  remotePowers,
  marshaller
) => {
  // Function body
};
```

## Parameters

- **zcf**: Zoe Contract Facet. Provides access to Zoe-specific contract functionality.
- **baggage**: Persistent storage for contract data, allowing state retention across contract invocations.
- **remotePowers**: An object containing various remote services and utilities required for orchestration. This includes:
  - `localchain`: Remote object for interacting with the local blockchain.
  - `orchestrationService`: Remote object for the interchain orchestration service.
  - `storageNode`: Remote object for persistent storage.
  - `timerService`: Remote object for scheduling and timers.
  - `agoricNames`: Remote object for accessing Agoric names.
- **marshaller**: Utility for data serialization and deserialization.

## Returns

An object containing the initialized orchestration tools and resources, including the zone, chain hub, and various orchestration utilities.

## Detailed Description

After setting up a test jig, allowing for testing and debugging with access to the `baggage`, the `provideOrchestration` function performs the following steps:

1. **Create Zones**:
   - Initializes a durable zone using the provided baggage for state management.
   - Creates several sub-zones for organizing different aspects of the orchestration process, such as asyncFlow, contract, orchestration, and vows.

2. **Initialize Chain Hub and Vow Tools**:
   - Initializes the chain hub using `agoricNames`.
   - Prepares vow tools within the vows sub-zone.

3. **Prepare Recorder Kit Makers**:
   - Prepares the recorder kit makers with the provided baggage and marshaller.

4. **Prepare Local Orchestration Account Kit**:
   - Sets up the local orchestration account kit with the required components, including the zone, recorder kit, ZCF, timer service, vow tools, and chain hub.
   - Prepares async flow tools using the asyncFlow sub-zone and vow tools.
   - Prepares the Cosmos orchestration account using the orchestration sub-zone, recorder kit, vow tools, and ZCF.
   - Sets up the remote chain facade using the orchestration sub-zone, Cosmos orchestration account, orchestration service, storage node, timer service, and vow tools.
   - Sets up the local chain facade using the orchestration sub-zone, local orchestration account kit, local chain, storage node, orchestration service, timer service, and vow tools.

5. **Return the Orchestration Tools**:
    - Constructs the orchestration facade with the provided components and additional remote powers.
   - Returns an object containing the facade, chain hub, vow tools, and zone.


## Usage with `withOrchestration`

The `provideOrchestration` function is often used in conjunction with the `withOrchestration` higher-order function to enhance contract functions with orchestration capabilities, ensuring that the necessary tools are available for managing interchain interactions effectively. Here is a typical usage:

```javascript

export const withOrchestration =
  contractFn => async (zcf, privateArgs, baggage) => {
    const { zone, ...tools } = provideOrchestration(
      zcf,
      baggage,
      privateArgs,
      privateArgs.marshaller,
    );
    return contractFn(zcf, privateArgs, zone, tools);
  };
harden(withOrchestration);
```
