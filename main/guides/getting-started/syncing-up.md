# Syncing Up on Mainnet

To run a node on the `agoric-3` network from scratch, please follow the 
steps below.

If you wish to restore from a recent community snapshot, please follow the instructions under [Current Community Snapshot](#current-community-snapshot) below.

| Current |     Upgrade Name     | Upgrade Height |                  Git Hash                |    Repo    |            Docker Tag          |
| ------- |--------------------- | -------------- | ---------------------------------------- | ---------- | ------------------------------ |
|         | agoric-3.1 (genesis) |     2,115,669  | a2ebcdb21418bb157f9c747a042b2a859b2a5986 |    ag0     | agoric/ag0:agoric-upgrade-3.1  |
|         | agoric-upgrade-5     |     3,565,000  | a2ebcdb21418bb157f9c747a042b2a859b2a5986 |    ag0     | agoric/ag0:agoric-upgrade-5    |
|         | agoric-upgrade-6     |     5,901,622  | 31c78ba3aa872b54c4de448763c5b8044b8f950c |    ag0     | agoric/ag0:agoric-upgrade-6    |
|         | agoric-upgrade-7-2   |     6,263,783  | f4759c9f15b869c453f847a63ba734cacb9a991a |    ag0     | agoric/ag0:agoric-upgrade-7-2  |
|         | agoric-upgrade-8     |     7,179,262  | 2c812d22161cd297587979b262eab6e2cc76e23d |    agd     |      agoric/agoric-sdk:29      |
|         | agoric-upgrade-8-1   |     7,179,262  | 08ca9d4fd8413da59b73d53e12851fe00583ddc1 |    agd     |      agoric/agoric-sdk:30      |
| Current | agoric-upgrade-9.    |     8,941,749  | 636c850161d29c0368b4dec03c90e2674e8d6479 |    agd     |      agoric/agoric-sdk:31      |

#### A note on syncing from genesis

Syncing from genesis requires a significant amount of time (upwards of a week).  If you desire to start up a node quicker than that, however without all transaction history, consider using a snapshot from the community.  e.g. from [dsrv](https://www.allthatnode.com/agoric.dsrv), [polkachu](https://www.polkachu.com/tendermint_snapshots/agoric), or others.

### agoric-3.1

1. `git clone https://github.com/Agoric/ag0.git && cd ag0`
1. `git checkout tags/agoric-3.1`
1. `make install`
1. `ag0 init follow --chain-id agoric-3`
1. `curl https://main.rpc.agoric.net/genesis | jq .result.genesis > $HOME/.agoric/config/genesis.json`
1. `ag0 start`

   chain will halt at 3,565,000

### agoric-upgrade-5

1. `git clone https://github.com/Agoric/ag0.git; cd ag0 && git checkout tags/agoric-upgrade-5`
1. `make install`
1. `ag0 start`

   chain will halt at 5,901,622

### agoric-upgrade-6

1. `git clone https://github.com/Agoric/ag0.git; cd ag0 && git checkout tags/agoric-upgrade-6`
1. `make install`
1. `ag0 start`

   chain will halt at 6,263,783

### agoric-upgrade-7-2

agoric-upgrade-7-2 is a agoric-upgrade-7 compatible soft-patch, and can be used in place of agoric-upgrade-7.  This soft-patch includes the dragonberry security updates.

1. `git clone https://github.com/Agoric/ag0.git; cd ag0 && git checkout tags/agoric-upgrade-7-2`
1. `make install`
1. `ag0 start`

   chain will halt at 7,179,262

### note about ag0 -> agd

The `agd` upgrade starts now, and you need to ensure you have
nodejs 16+ LTS installed, along with any dependencies mentioned 
in https://github.com/Agoric/agoric-sdk/blob/master/README.md

This guide assumes you've git cloned the agoric-sdk from 
https://github.com/Agoric/agoric-sdk/ to a folder 
named `agoric-sdk` and you've installed the required dependencies 
noted in the readme.

### agoric-upgrade-8

1. `git clone https://github.com/agoric/agoric-sdk.git; cd agoric-sdk && git checkout tags/agoric-upgrade-8`
1. `yarn install && yarn build`
1. `(cd packages/cosmic-swingset && make)`
1. `agd start`

After more than 10 blocks have successfully synced, stop the `agd` process 
and update to `agoric-upgrade-8-1`, a soft upgrade.  This soft upgrade includes 
logic to handle a memory condition that may lead to your node falling out of consensus. 
It is recommended to upgrade to `agoric-upgrade-8-1` as soon as you have successfully 
produced a handful of blocks with the `agoric-upgrade-8` upgrade.

### agoric-upgrade-8-1

1. `git clone https://github.com/agoric/agoric-sdk.git;  agoric-sdk && git checkout tags/agoric-upgrade-8-1`
1. `yarn install && yarn build`
1. `(cd packages/cosmic-swingset && make)`
1. `agd start`

### agoric-upgrade-9
#### Current Community Snapshot

The `agoric-upgrade-9` release requires Go version 1.18 or higher.

1. `git clone https://github.com/agoric/agoric-sdk.git;  agoric-sdk && git checkout tags/agoric-upgrade-9`
1. `yarn install && yarn build`
1. `(cd packages/cosmic-swingset && make)`
1. `agd start`
