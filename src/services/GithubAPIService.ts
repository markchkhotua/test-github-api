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

    getRepositoriesData = async (userName: string, page: number = 1) =>
        await this.getVCSData(
            { userName, page },
            githubUrlBuilder.getReposUrl
        );

    getBranchesData = async(userName: string, repoName: string) =>
        await this.getVCSData(
            { userName, repoName },
            githubUrlBuilder.getBranchesUrl
        );
}

export default GithubAPIService;
