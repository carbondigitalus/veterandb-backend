declare namespace NodeJS {
    export interface ProcessEnv {
        JWT_COOKIE_EXPIRES_IN: number;
        JWT_EXPIRES_IN: string;
        JWT_SECRET: string;
    }
}
