import type { IAppConfig } from '../src/types';
import routesConfig from './routes';
const config: IAppConfig = {
    port: process.env.PORT || 3000,
    accessToken: process.env.ACCESS_TOKEN || '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',
    gitHubAPI: {
        baseUrl: process.env.GITHUB_API || 'https://api.github.com',
    },
};

export default config;
export { routesConfig };