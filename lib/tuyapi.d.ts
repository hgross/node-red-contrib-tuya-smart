declare class TuyaDevice {
    constructor(options: TuyaDeviceOptions);
    resolveId(options:any);
    get(options?:any) : Promise<any>;
    set(options:any) : Promise<Boolean>;
    connect():Promise<Boolean>;
    disconnect():Promise<Boolean>;
    isConnected():Boolean;
}

declare interface TuyaDeviceOptions {
    /**
     * ID of device
     */
    id: string;

    /**
     * encryption key of device
     */
    key: string;
    /**
     * IP of device
     */
    ip: string;
    
    /**
     * product key of device
     */
    productKey?: string = "";

    /**
     * port of device
     */
    port?: number = 6668;        
    /**
     * protocol version
     */
    version?: string = "3.1";

    persistentConnection?: boolean = false;
};

declare module 'tuyapi' {
    export = TuyaDevice;    
};
