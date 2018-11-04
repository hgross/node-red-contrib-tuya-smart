import { Red } from "node-red";
import { TuyaSmartNode, TuyaSmartProperties, TuyaSmartNodeMessage } from "./tuya-smart-properties";
import TuyaDevice = require("tuyapi");

export = (RED: Red) => {
    function TuyaSmartConfigNode(this: TuyaSmartNode, properties: TuyaSmartProperties) {
        let node = this;
        RED.nodes.createNode(this, properties);

        this.deviceName = properties.deviceName;
        this.deviceId = properties.deviceId;
        this.deviceKey = properties.deviceKey;
        this.deviceIp = properties.deviceIp;
        this.pollingInterval = properties.pollingInterval;

        node.status({ fill:"yellow", shape:"ring", text: "connecting"});
        let indicateConnectionOk = () => node.status({ fill:"green", shape:"ring", text: "connected"});
        let indicateConnectionError = () => node.status({ fill:"red", shape:"ring", text: "disconnected"});

        /**
         * Interval handling
         */
        var pollingTimer : NodeJS.Timer | undefined = undefined;;
        let startPolling = () => {            
            stopPolling();
            pollingTimer = setInterval(() => {
                smartDevice.get().then(state => {
                    indicateConnectionOk();
                    node.send({
                        payload: {
                            state: state,
                            deviceIp: node.deviceIp,
                            deviceId: node.deviceId,
                            deviceName: node.deviceName
                        } as TuyaSmartNodeMessage
                    });
                }).catch(indicateConnectionError);
            }, node.pollingInterval * 1000);
        }

        let stopPolling = () => {
            if(pollingTimer === undefined) return;
            clearInterval(pollingTimer);
            pollingTimer = undefined;
        };

        // stop polling on close
        this.on('close', stopPolling);

        // device handling
        let deviceOptions = {
            id: node.deviceId,
            key: node.deviceKey,
            ip: node.deviceIp
        };
        let smartDevice = new TuyaDevice(deviceOptions);

        // initiate the node
        startPolling();
    }

    RED.nodes.registerType("tuya-smart", TuyaSmartConfigNode, {
        credentials: {
             deviceKey: { type: "text" }
        }
    });
};
