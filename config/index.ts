import type { IAppConfig } from '../src/types';
const config: IAppConfig = {
    port: process.env.PORT || 3000,
    accessToken: process.env.ACCESS_TOKEN || '',
    gitHubAPI: {
        baseUrl: process.env.GITHUB_API || 'https://api.github.com',
    },
};

export default config;