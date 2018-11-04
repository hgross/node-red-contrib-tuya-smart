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

export interface TuyaSmartNodeMessage {
    state: Boolean;
    deviceName: string;
    deviceIp: string;
    deviceId: string;
}