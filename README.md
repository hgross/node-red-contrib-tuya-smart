# tuya-smart

[![Build Status](https://travis-ci.org/hgross/node-red-contrib-tuya-smart.svg?branch=master)](https://travis-ci.org/hgross/node-red-contrib-tuya-smart)

Input nodes to interface with smart plugs, bulbs, ... from tuya.
Makes use of the [tuyapi library](https://github.com/codetheweb/tuyapi "tuyapi project site").
Check out their great [guide on how to get your device id/device key out of the Tuya Smart/Smart Life app](https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md) to get started.
Once you got these device credentials, you will be able to configure and use this input node for NodeRED.
The tuya devices are sold under different names like Gosund, BlitzWolf, Teckin, Meross, Homecube, ...
Check out the [general discussion](https://github.com/codetheweb/tuyapi/issues/5) regarding the tuya api and compatibility.

![Connecting nodes](https://raw.githubusercontent.com/hgross/node-red-contrib-tuya-smart/master/images/connecting.png "Connecting tuya smart devices")
![Connected nodes and output format](https://raw.githubusercontent.com/hgross/node-red-contrib-tuya-smart/master/images/connected_with_format.png "Connected tuya smart devices and data format")
![Input node with input and output format](https://raw.githubusercontent.com/hgross/node-red-contrib-tuya-smart/master/images/input-node.png "Input node with input and output format")

## Installation
You can install the package from the public npm registry using npm or the tooling provided by the NodeRED-GUI.
Check out the [NodeRED guide on adding nodes](https://nodered.org/docs/getting-started/adding-nodes).

## Development - how to build
You should be able to build the nodes executing

```
 $ npm install
 $ npm run-script build
```

To test them I use docker and mount the dist directory to /data/nodes like this `docker run -it --name tuya-test-container -p 1880:1880 -v $(pwd)/dist/lib:/data/nodes nodered/node-red-docker`. Be aware that by using this shortcut you have to ensure the dependencies of the nodes inside the container have to be installed manually `docker exec -it tuya-test-container bash -c 'cd /data && npm i tuyapi'`.
