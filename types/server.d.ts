declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number | undefined;
        PORT_DEV: PORT;
        PORT_PROD: PORT;
        PORT_TEST: PORT;
        DOMAIN: string;
        IP_ADDRESS: string;
    }
}
