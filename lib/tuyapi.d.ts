declare class TuyaDevice {
    constructor(options: TuyaDeviceOptions);
    resolveId(options:any) : Promise<Boolean>;
    get(options?:any) : Promise<Boolean|any>;
    set(options: TuyAPISetOptions) : Promise<Boolean>;
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

declare interface TuyAPISetOptions {
    set: any;
    dps: number = 1;
};

declare class TuyAPIGetOptions {
    constructor(
        dps : number = 1,
        schema : Boolean = false,
        returnAsEvent : Boolean = false,
    );
};

declare module 'tuyapi' {
    export = TuyaDevice;    
};
