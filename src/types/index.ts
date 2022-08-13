export type IAppConfig = {
    port: string | number;
    accessToken: string;
    gitHubAPI: {
        baseUrl: string
    };
}

export * from './data.types';
export * from './utils.types';
export * from './services.types';
export * from './middlewares.types';
export * from './controllers.types';

