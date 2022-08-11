import config from '../../config';
import { IGithubAPIService } from '../types';
import AbstractVCSAPIService from './AbstractVCSAPIService';
import { githubUrlBuilder } from '../utils/urlBuilder';

class GithubAPIService extends AbstractVCSAPIService implements IGithubAPIService {
    private static _instance: GithubAPIService;

    constructor() {
        super(config.gitHubAPI.baseUrl);
    }

    public static getInstance () {
        if(!this._instance) {
            this._instance = new GithubAPIService();
        }
        return this._instance;
    }

    getRepositoriesData = async (entityName: string, entityType: string, page: number = 1) =>
        await this.getVCSData(
            { entityName, entityType, page },
            githubUrlBuilder.getReposUrl
        );

    getBranchesData = async(entityName: string, repoName: string) =>
        await this.getVCSData(
            { entityName, repoName },
            githubUrlBuilder.getBranchesUrl
        );
}

export default GithubAPIService;
