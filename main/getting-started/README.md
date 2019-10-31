# Agoric's Cosmic SwingSet

Agoric's Cosmic SwingSet enables developers to test smart contracts build with [ERTP](https://github.com/Agoric/ERTP) in various blockchain setup environments

This document gives an overview of the process of setting up

1  a local environment that will allow you to build and debug
2  an environment that emulates a remote setup for testing
3  deploying to the TestNet
4  (not available yet) deploying to MainNet

In order to build a DeFi app in the SwingSet environment, your team will have to write code for three things:

* The UI that displays in interface and talks to the handler via WebSockets
* The Handler that receives commands from the user via WebSockets and sends
   transactions to the local solo SwingSet for relay to the Chain
* The Dapp code that runs in the Chain SwingSet and has access to objects on
      other chains


To develop and deploy new code, you'll have to clone our repo from GitHib

```
git clone https://github.com/Agoric/cosmic-swingset
```

There is more thorough documentation there. This is an overview.


## Different setups to run the Pixel Demo

Running the demo requires a local solo node to serve as your access point.
Whichever environment you want to develop in, you'll start by building a solo
node from the source code.


### Choose a scenario

#### Scenario 3 : no testnet (develop off-chain demo locally)

In this scenario, you run: 
- a **solo node** with the server-side Pixel Demo running and exposing an HTTP server in localhost
- a **web browser** connecting to the solo node and enabling user interaction with the Pixel Demo

No blockchain is involved.

| <img src="assets/LocalSolo.pdf" alt="Local Solo"> | 
|:--:| 
| *A Local Solo SwingSet. Notice that there's no chain.* |

Run:
```sh
make scenario3-setup
make scenario3-run-client
```

[`lib/ag-solo/vats/vat-demo.js`](lib/ag-solo/vats/vat-demo.js) contains the code running a vat with
the Pixel Gallery Demo.

Also, as part of `make scenario3-setup`, `bin/ag-solo init <directory>` gets called and all the
content of the [`vats`](lib/ag-solo/vats) directory gets copied to the `<directory>`

The objects added to `home` are created in
[`lib/ag-solo/vats/vat-demo.js`](lib/ag-solo/vats/vat-demo.js).

The [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop] handler is in
[`lib/ag-solo/vats/vat-http.js`](lib/ag-solo/vats/vat-http.js).

The HTML frontend code is pure JS/DOM (no additional libraries yet), in
`lib/ag-solo/html/index.html` and `lib/ag-solo/html/main.js`.


#### Scenario 2: a single local testnet node (develop on-chain demo)

In this scenario, you run: 
- one or several **solo node(s)** each exposing an HTTP server in localhost (each to a different port)
- a **single local blockchain testnet node** with the server-side Pixel Demo running
- a **web browser** connecting to each solo node via a different port and enabling user interaction with the Pixel Demo


| <img src="assets/LocalChain.pdf" alt="Local Chain"> | 
|:--:| 
| *A Local Chain SwingSet. Notice that the chain is private.* |

The solo nodes communicate with the testnet node

Before using this scenario, it is recommanded that you test your code with Scenario 3.

Prepare the chain and solo nodes:
```sh
make scenario2-setup BASE_PORT=8000 NUM_SOLOS=3
```

fThis prepares for creating 3 solo nodes. Each node exposes a web server to a different port. The
ports start at `8000` (`BASE_PORT`). So the solo node ports here will be `8000`, `8001` and `8002`

Start the chain:
```sh
make scenario2-run-chain
```

Wait about 5 seconds for the chain to produce its first block, then switch to another terminal:
```sh
make scenario2-run-client BASE_PORT=8000
```

You can communicate with the node by opening http://localhost:8000/

You can start other solo nodes with `make scenario2-run-client BASE_PORT=8001` and `make
scenario2-run-client BASE_PORT=8002` and communicate with them respectively with on
http://localhost:8001/ and http://localhost:8002/


  
#### Scenario 1: your own local testnet (develop testnet provisioner)

In this scenario, you run: 
- a **solo node** exposing an HTTP server in localhost
- a **several local blockchain testnet nodes** with the server-side Pixel Demo running on top. 
- a **web browser** connecting to the solo node and enabling user interaction with the Pixel Demo

This scenario is only useful for moving toward deploying the local source code as a new
testnet. Before using this scenario, you should test your on-chain code under Scenario 2.

| <img src="assets/SharedChain.pdf" alt="Shared Chain"> | 
|:--:| 
| *A Shared Chain setup. You can connect to the chain with multiple solo SwingSets.* |

```sh
make scenario1-setup
make scenario1-run-chain
```

Wait until the bootstrap produces a provisioning server URL and visit it.  Then run in another terminal:

```sh
make scenario1-run-client
```

See [Testnet Tutorial](https://github.com/Agoric/cosmic-swingset#testnet-tutorial) for more guidance.

#### Scenario 0: a public testnet (kick the tires)

In this scenario, you run: 
- a **solo node** exposing an HTTP server in localhost
- a **web browser** connecting to the solo node and enabling user interaction with the Pixel Demo

This scenario assumes your solo node can access a **blockchain running on the Internet**

To run the solo node using the current directory's source code against a public testnet, use:
```
$ make scenario0-setup
$ make scenario0-run-client
```

Alternatively, running the solo node from a Docker image and no local source code is described in the [top section](#agorics-cosmic-swingset).  

Now go to http://localhost:8000/ to interact with your new solo node.

