import type { IAppConfig } from '../src/types';
const config: IAppConfig = {
    port: process.env.PORT || 3000,
    accessToken: process.env.ACCESS_TOKEN || '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',
    gitHubAPI: {
        baseUrl: process.env.GITHUB_API || 'https://api.github.com',
    },
};

export default config;