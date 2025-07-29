# Multichain Testing

Testing cross-chain applications presents unique challenges that traditional single-chain testing cannot address. Agoric's multichain testing framework provides a comprehensive solution for testing orchestration-based smart contracts that interact with multiple blockchain networks.

## What is Multichain Testing?

Multichain testing is the practice of testing decentralized applications (DApps) that operate across multiple blockchain networks. Unlike traditional smart contract testing that focuses on a single chain, multichain testing verifies:

- **Cross-chain communication** via IBC (Inter-Blockchain Communication)
- **Asset transfers** between different blockchain networks
- **Remote account management** and control
- **Orchestration workflows** that span multiple chains
- **Relayer functionality** and reliability
- **End-to-end user scenarios** involving multiple chains

In the context of Agoric, multichain testing is essential for applications built with the [Orchestration API](/guides/orchestration/) that coordinate actions across multiple Cosmos-based blockchains.

## Why Multichain Testing Matters

Multichain applications introduce several complexity layers that require specialized testing:

**Network Latency and Timing**: Cross-chain operations are asynchronous and may take multiple blocks or even minutes to complete.

**State Synchronization**: Applications must handle scenarios where different chains have different states or conflicting information.

**Failure Scenarios**: Networks may be partitioned, relayers may fail, or transactions may timeout, requiring robust error handling.

**Economic Considerations**: Cross-chain operations involve fees on multiple networks and potential slippage in asset transfers.

## Architecture Overview

Agoric's multichain testing framework is powered by [Starship](https://docs.cosmology.zone/starship), which provides:

- **Fully Simulated Chains**: Real blockchain networks (Agoric, Osmosis, Cosmos Hub) running in containers
- **IBC Relayers**: Both Hermes and Go relayers for cross-chain communication
- **Kubernetes Orchestration**: Scalable, reproducible test environments
- **Testing Utilities**: Helper functions for common multichain operations

The framework includes the following chains by default:
- **Agoric** - Smart contract platform with orchestration capabilities
- **Osmosis** - Decentralized exchange and liquidity provider
- **Cosmos Hub** - The hub of the Cosmos ecosystem
- **Noble** - USDC issuer chain (in Fast USDC configuration)

## Prerequisites

Before setting up multichain testing, ensure you have:

### System Requirements
- **CPU**: 6.5+ cores recommended
- **Memory**: 9.5+ GiB RAM
- **Storage**: 10+ GiB available disk space
- **Network**: Stable internet connection for downloading images

### Software Dependencies
- **Docker Desktop** or similar container runtime
- **Kubernetes** cluster (local or remote)
- **Node.js** (v18 or later)
- **Yarn** (v4.6.0 or later)

### Knowledge Prerequisites
- Basic understanding of blockchain and smart contracts
- Familiarity with IBC and cross-chain concepts
- Knowledge of Agoric's [Orchestration API](/guides/orchestration/)
- Experience with JavaScript/TypeScript testing frameworks

## Resource Requirements

The multichain testing environment requires significant computational resources:

| Component | CPU Cores | Memory | Purpose |
|-----------|-----------|---------|---------|
| Agoric Chain | 2.0 | 3.0 GiB | Smart contract execution |
| Osmosis Chain | 1.5 | 2.5 GiB | DEX operations |
| Cosmos Hub | 1.5 | 2.0 GiB | Hub functionality |
| Noble Chain | 0.5 | 1.0 GiB | USDC operations |
| Relayers | 1.0 | 1.0 GiB | IBC communication |
| **Total** | **6.5** | **9.5 GiB** | **Minimum required** |

::: warning Resource Allocation
Ensure your Docker Desktop or Kubernetes environment is configured with sufficient resources. Insufficient resources may cause pods to fail or tests to timeout.
:::

## Setup Instructions

### 1. Initial Setup

First, clone the agoric-sdk repository and navigate to the multichain-testing directory:

```bash
git clone https://github.com/Agoric/agoric-sdk.git
cd agoric-sdk/multichain-testing
```

Install dependencies:

```bash
yarn install
```

### 2. Install Required Tools

The framework provides automation to install necessary tools:

```bash
make clean setup
```

This command installs:
- `kubectl` - Kubernetes CLI
- `kind` - Kubernetes in Docker
- `helm` - Kubernetes package manager
- `yq` - YAML processor

### 3. Start the Multichain Environment

Start the complete testing environment:

```bash
# Default configuration (Agoric + Osmosis + Cosmos Hub)
make start

# Fast USDC configuration (includes Noble chain)
make start FILE=config.fusdc.yaml

# Maximum chains configuration
make start FILE=config.ymax.yaml
```

The startup process takes 7-12 minutes and includes:
1. Installing Helm charts
2. Starting Starship services
3. Waiting for all pods to be ready
4. Setting up port forwarding
5. Funding the provision pool
6. Registering bank assets

### 4. Verify Setup

Check that all pods are running:

```bash
kubectl get pods
```

You should see output similar to:
```
NAME                    READY   STATUS    RESTARTS   AGE
agoriclocal-genesis-0   2/2     Running   0          5m
osmosislocal-genesis-0  2/2     Running   0          5m
cosmoshublocal-genesis-0 2/2    Running   0          5m
hermes-agoric-osmosis-0  1/1     Running   0          3m
```

## Configuration Options

The multichain testing framework supports several configuration files:

### Default Configuration (`config.yaml`)
- Agoric + Osmosis + Cosmos Hub
- Hermes relayers
- Standard testing scenarios

### Fast USDC Configuration (`config.fusdc.yaml`)
- Includes Noble chain for USDC operations
- Configured for Fast USDC testing
- Additional relayer connections

### Maximum Configuration (`config.ymax.yaml`)
- Maximum number of supported chains
- Comprehensive cross-chain scenarios
- Extended testing capabilities

### Go Relayer Configuration (`config.go-relayer.yaml`)
- Uses Go relayer instead of Hermes
- Alternative relayer implementation
- Useful for relayer comparison testing

## Test Suites

The framework organizes tests into specialized suites:

### Main Test Suite (`test:main`)
Core orchestration functionality tests:

```bash
yarn test:main
```

**Example test scenarios:**
- Basic cross-chain account creation
- Asset transfers between chains
- IBC channel management
- Orchestration workflow validation

### Fast USDC Tests (`test:fast-usdc`)
Tests for Fast USDC functionality:

```bash
# Start with Fast USDC configuration
make start FILE=config.fusdc.yaml

# Run Fast USDC tests
yarn test:fast-usdc
```

### Query Tests (`test:queries`)
Blockchain query functionality:

```bash
yarn test:queries
```

### Staking Tests (`test:staking`)
Cross-chain staking operations:

```bash
yarn test:staking
```

## Example Test Scenarios

### Basic Cross-Chain Transfer

```typescript
import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';
import { makeQueryClient } from '../tools/query.js';
import { makeIBCTransferMsg } from '../tools/ibc-transfer.js';

test('cross-chain transfer', async t => {
  const queryClient = makeQueryClient('http://localhost:1317');
  
  // Create IBC transfer from Agoric to Osmosis
  const transferMsg = makeIBCTransferMsg({
    sourceChain: 'agoriclocal',
    destChain: 'osmosislocal',
    amount: '1000000',
    denom: 'ubld'
  });
  
  // Execute transfer
  const result = await queryClient.tx.broadcast([transferMsg]);
  
  // Verify successful transfer
  t.is(result.code, 0);
  
  // Wait for packet acknowledgment
  await t.context.waitForAck(result.height);
  
  // Verify funds received on destination chain
  const balance = await queryClient.bank.balance(
    destAddress, 
    'ibc/...'
  );
  t.is(balance.amount, '1000000');
});
```

### Orchestration Workflow Test

```typescript
test('orchestration workflow', async t => {
  const { zoe, wallet } = t.context;
  
  // Deploy orchestration contract
  const { creatorFacet } = await deployContract(zoe, orchestrationContract);
  
  // Create offer for cross-chain operation
  const offer = await wallet.makeOffer({
    source: creatorFacet,
    invitationSpec: {
      invitationMakerName: 'makeTransferInvitation',
      args: ['osmosislocal', 'cosmoshublocal']
    },
    proposal: {
      give: { Payment: AmountMath.make(bldBrand, 1000000n) }
    }
  });
  
  // Wait for cross-chain operation to complete
  const result = await offer.result;
  t.is(result.status, 'success');
  
  // Verify state on both chains
  const agoricState = await queryAgoricState();
  const osmosisState = await queryOsmosisState();
  
  t.truthy(agoricState.accounts.find(a => a.chainId === 'osmosis'));
  t.truthy(osmosisState.balances.find(b => b.owner === agoricState.address));
});
```

## Testing Patterns

### Asynchronous Operations
Cross-chain operations are inherently asynchronous. Use proper waiting patterns:

```typescript
// Wait for IBC packet acknowledgment
await t.context.waitForAck(packetSequence);

// Wait for specific chain height
await t.context.waitForHeight('osmosislocal', height);

// Wait for balance changes
await t.context.waitForBalance(address, denom, expectedAmount);
```

### Error Handling
Test various failure scenarios:

```typescript
test('handle relayer failure', async t => {
  // Stop relayer
  await t.context.stopRelayer('hermes-agoric-osmosis');
  
  // Attempt cross-chain operation
  const result = await attemptTransfer();
  
  // Verify timeout handling
  t.is(result.status, 'timeout');
  
  // Restart relayer
  await t.context.startRelayer('hermes-agoric-osmosis');
  
  // Verify operation completes
  await t.context.waitForAck(result.sequence);
});
```

### Chain State Verification
Verify state consistency across chains:

```typescript
test('state consistency', async t => {
  const agoricBalance = await queryBalance('agoriclocal', address, denom);
  const osmosisBalance = await queryBalance('osmosislocal', address, ibcDenom);
  
  // Verify conservation of funds
  t.is(agoricBalance.amount + osmosisBalance.amount, initialAmount);
});
```

## Best Practices

### Test Organization
- **Separate test suites** for different functionality areas
- **Use descriptive test names** that explain the cross-chain scenario
- **Group related tests** using AVA's test contexts
- **Clean up resources** after each test to avoid state pollution

### Resource Management
- **Start with minimum required chains** for your specific tests
- **Stop environments** when not in use to conserve resources
- **Use test-specific configurations** when possible
- **Monitor resource usage** during long test runs

### Debugging
- **Use comprehensive logging** to track cross-chain operations
- **Capture chain states** before and after operations
- **Save test artifacts** for failed tests
- **Use port forwarding** to access chain APIs directly

### Performance
- **Run tests in parallel** when possible
- **Use test fixtures** for common setup operations
- **Cache chain states** for repeated scenarios
- **Optimize wait times** based on actual block times

## Troubleshooting

### Common Issues

**Pods not starting**: Check resource allocation in Docker Desktop
```bash
# Check pod status
kubectl get pods

# Check pod logs
kubectl logs <pod-name>

# Check resource usage
kubectl top pods
```

**Port forwarding failures**: Ensure ports are not in use
```bash
# Kill existing port forwards
pkill -f "kubectl port-forward"

# Restart port forwarding
make port-forward
```

**Test timeouts**: Increase timeout values for slow operations
```bash
# Check relayer status
kubectl logs hermes-agoric-osmosis-0 --follow

# Verify IBC connections
kubectl exec -i agoriclocal-genesis-0 -c validator -- \
  agd query ibc channel channels
```

**Out of memory errors**: Reduce concurrent tests or increase allocated memory
```bash
# Check memory usage
kubectl top pods

# Restart with more memory
make clean setup
```

### Debugging Tools

**Chain Registry**: Access chain information via HTTP
- http://localhost:8081/chains/agoriclocal
- http://localhost:8081/chains/osmosislocal
- http://localhost:8081/ibc

**Log Monitoring**: Track chain and relayer activity
```bash
# Agoric slog
make tail-slog

# Validator logs
kubectl logs agoriclocal-genesis-0 --container=validator --follow

# Relayer logs
kubectl logs hermes-agoric-osmosis-0 --container=relayer --follow
```

**Chain Queries**: Direct blockchain queries
```bash
# Query IBC channels
kubectl exec -i agoriclocal-genesis-0 -c validator -- \
  agd query ibc channel channels

# Query account balances  
kubectl exec -i osmosislocal-genesis-0 -c validator -- \
  osmosisd query bank balances <address>
```

## Cleanup

Always clean up resources after testing:

```bash
# Stop containers and port forwarding
make stop

# Delete clusters completely
make clean
```

## Advanced Topics

### Custom Chain Configurations
Create custom YAML configurations for specific testing scenarios:

```yaml
chains:
  - name: custom-agoric
    type: agoric
    numValidators: 1
    resources:
      cpu: 2
      memory: 4Gi
```

### Relayer Configuration
Switch between different relayer implementations:

```bash
# Use Go relayer
make start FILE=config.go-relayer.yaml
RELAYER_TYPE=go-relayer yarn test:main

# Use Hermes relayer (default)
make start
yarn test:main
```

### Integration with CI/CD
Configure multichain testing in continuous integration:

```yaml
# GitHub Actions example
- name: Setup multichain testing
  run: |
    make clean setup
    make start
    
- name: Run tests
  run: |
    yarn test:main
    yarn test:queries
    
- name: Cleanup
  run: make clean
```

## Related Resources

- [Orchestration Guide](/guides/orchestration/) - Learn about Agoric's orchestration capabilities
- [End-to-End Testing](/e2e-testing) - Browser-based testing with Keplr wallet
- [Agoric SDK](https://github.com/Agoric/agoric-sdk) - Main development repository
- [Starship Documentation](https://docs.cosmology.zone/starship) - Underlying testing framework
- [IBC Documentation](https://ibc.cosmos.network/) - Inter-Blockchain Communication protocol

## Contributing

The multichain testing framework is actively developed. Contributions are welcome:

1. **Report Issues**: [agoric-sdk/issues](https://github.com/Agoric/agoric-sdk/issues)
2. **Submit PRs**: [agoric-sdk/pulls](https://github.com/Agoric/agoric-sdk/pulls)
3. **Join Discussions**: [Agoric Discord](https://agoric.com/discord)

For questions about multichain testing, visit the [Agoric Discord](https://agoric.com/discord) #orchestration channel.