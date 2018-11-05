import { Node, NodeProperties } from "node-red";

export interface TuyaSmartProperties extends NodeProperties {
    deviceIp: string;
    deviceKey: string;
    deviceId: string;
    deviceName: string;
    pollingInterval: number;
}

export interface TuyaSmartNode extends Node {
    deviceIp: string;
    deviceKey: string;
    deviceId: string;
    deviceName: string;
    pollingInterval: number;
}

/**
 * Output message format of the tuya node.
 */
export interface TuyaSmartNodeMessage {
    state: Boolean;
    deviceName: string;
    deviceIp: string;
    deviceId: string;
}

export interface NodeRedInputMessage {
    payload: TuyaSmartNodeInputMessage;
}

/**
 * Input message format that is interpreted by the tuya node.
 */
export interface TuyaSmartNodeInputMessage {
    /**
     * Desired state to be set
     */
    state: Boolean;

    /**
     * DPS index (default 1)
     */
    dpsIndex?: number;
}