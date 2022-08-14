import type { IAppConfig } from '../src/types';
const config: IAppConfig = {
    port: process.env.PORT || 3000,
    accessToken: process.env.ACCESS_TOKEN || '',
    gitHubAPI: {
        urls: {
            base: process.env.GITHUB_API || 'https://api.github.com',
            User: 'users',
            Organization: 'orgs'
        }
    },
};

export default config;