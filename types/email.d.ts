declare namespace NodeJS {
    export interface ProcessEnv {
        EMAIL_HOST: string;
        EMAIL_PORT: number;
        EMAIL_USERNAME: string;
        EMAIL_PASSWORD: string;
        EMAIL_FROM: string;
        EMAIL_HOST_DEV: string;
        EMAIL_PORT_DEV: number;
        EMAIL_USERNAME_DEV: string;
        EMAIL_PASSWORD_DEV: string;
    }
}
