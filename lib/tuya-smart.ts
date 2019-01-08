import { Red } from "node-red";
import { TuyaSmartNode, TuyaSmartProperties, TuyaSmartNodeMessage, TuyaSmartNodeInputMessage, NodeRedInputMessage } from "./tuya-smart-properties";
import TuyaDevice = require("tuyapi");
import { isUndefined } from "util";


export = (RED: Red) => {
    function TuyaSmartConfigNode(this: TuyaSmartNode, properties: TuyaSmartProperties) {
        let node = this;
        RED.nodes.createNode(this, properties);

        this.deviceName = properties.deviceName;
        this.deviceId = properties.deviceId;
        this.deviceKey = properties.deviceKey;
        this.deviceIp = properties.deviceIp;
        this.pollingInterval = properties.pollingInterval;
        this.request = JSON.parse(properties.request);

        node.status({ fill:"yellow", shape:"ring", text: "connecting"});
        let indicateConnectionOk = () => node.status({ fill:"green", shape:"ring", text: "connected"});
        let indicateConnectionError = () => node.status({ fill:"red", shape:"ring", text: "disconnected"});
        let indicateFailedToSetState = () => node.status({ fill:"red", shape:"ring", text: "error changing state"});
        
        /**
         * Polls the state from device, then sends it through the output nodes.
         * Will set the ui-status as well accordingly.
         */
        let pollAndSendState = () => {
            smartDevice.get(this.request).then(data => {
                indicateConnectionOk();
                node.send({
                    payload: {
                        data: data,
                        deviceIp: node.deviceIp,
                        deviceId: node.deviceId,
                        deviceName: node.deviceName
                    } as TuyaSmartNodeMessage
                });
            }).catch(indicateConnectionError);
        };


        /**
         * Interval handling
         */
        var pollingTimer : NodeJS.Timer | undefined = undefined;;
        let startPolling = () => {            
            stopPolling();
            pollingTimer = setInterval(() => {
                pollAndSendState();
            }, node.pollingInterval * 1000);
        }
        let stopPolling = () => {
            if(pollingTimer === undefined) return;
            clearInterval(pollingTimer);
            pollingTimer = undefined;
        };

        /**
         * 
         * @param msg input message received
         */
        let onInput = (msg: NodeRedInputMessage) => {
            let inputNodeMsg : TuyaSmartNodeInputMessage = msg.payload;
            
            // convert input message to TuyAPI state
            let setMsg : TuyAPISetOptions = {
                set: inputNodeMsg.set,
                dps: isUndefined(inputNodeMsg.dpsIndex) ? 1 : inputNodeMsg.dpsIndex
            };

            // set state
            smartDevice.set(setMsg).then((result : Boolean)  => {
                result ? indicateConnectionOk() : indicateFailedToSetState();
                pollAndSendState();
            }).catch(e => {
                indicateConnectionError();
                console.error(e);
            });
        };

        // hook up handlers
        this.on('close', stopPolling);
        this.on('input', onInput);

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
