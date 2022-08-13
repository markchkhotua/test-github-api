import config from '../../config';
import { BranchesInput, IGithubAPIService, ReposInput } from '../types';
import AbstractVcsApiService from './abstract-vcs-api-service';
import { githubUrlBuilder } from '../utils/url-builder.utils';

class GithubApiService extends AbstractVcsApiService implements IGithubAPIService {
    private static _instance: GithubApiService;

    constructor() {
        super(config.gitHubAPI.baseUrl);
    }

    public static getInstance () {
        if(!this._instance) {
            this._instance = new GithubApiService();
        }
        return this._instance;
    }

    getRepositoriesData = async ({ entityName, entityType, page }: ReposInput) => {
        const url = githubUrlBuilder.getReposUrl({ entityName, entityType, page });
        return this.getVCSData(url);
    };

    getBranchesData = async({ login, name }: BranchesInput) => {
        const url = githubUrlBuilder.getBranchesUrl({ login, name });
        return this.getVCSData(url);
    };
}

export default GithubApiService;
