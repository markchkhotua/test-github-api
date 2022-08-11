export type IAppConfig = {
    port: string | number;
    accessToken: string;
    gitHubAPI: {
        baseUrl: string
    };
}

export * from './data';
export * from './utils';
export * from './services';
export * from './middlewares';

