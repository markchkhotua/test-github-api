export type IAppConfig = {
    port: string | number;
    accessToken: string;
    gitHubAPI: {
        urls: {
            base: string,
            User: string,
            Organization: string
        }

    };
}

export * from './data.types';
export * from './utils.types';
export * from './services.types';
export * from './middlewares.types';
export * from './controllers.types';

