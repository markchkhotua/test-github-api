export type IAppConfig = {
    port: string | number;
    accessToken: string;
    gitHubAPI: {
        baseUrl: string
    };
}

export type Routes = {
    root: string,
    repositories: string,
}

export * from './data';
export * from './utils';
export * from './services';

