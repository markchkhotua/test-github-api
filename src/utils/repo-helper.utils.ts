import type { Branch, GetBranchesPromiseFunction, GetBranchesPromisesFunction } from '../types';
import GithubApiService from '../services/github-api-service';
import type { BranchesList } from '../types';

const getBranchesPromises: GetBranchesPromisesFunction = (repos) =>
    repos.map(repo => getBranchesPromise(repo));

const getBranchesPromise: GetBranchesPromiseFunction = async ({ 
    name, 
    owner: { login, type } 
}) => {
    const githubAPIService = GithubApiService.getInstance();
    try {
        const data: BranchesList = await githubAPIService.getBranchesData({ login, name });
        return {
            login,
            name,
            type,
            branches: data.map(({ name, commit: { sha } }: Branch) => ({ name, sha }))
        };
    } catch (err: any) {
        return {
            login,
            name,
            type,
            branches: []
        };
    }
};

export { getBranchesPromises };