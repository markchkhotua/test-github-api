import type { Branch, GetBranchesPromiseFunction, GetBranchesPromisesFunction } from '../types';
import GithubApiService from '../services/github-api-service';

const getBranchesPromises: GetBranchesPromisesFunction = (repos) =>
    repos.map(repo => getBranchesPromise(repo));

const getBranchesPromise: GetBranchesPromiseFunction = async ({ name, owner: { login } }) => {
    const githubAPIService = GithubApiService.getInstance();
    try {
        const data = await githubAPIService.getBranchesData({ login, name });
        return {
            login,
            name,
            branches: data.map(({ name, commit: { sha } }: Branch) => ({ name, sha }))
        };
    } catch (err: any) {
        return {
            login,
            name,
            branches: []
        };
    }
};

export { getBranchesPromises, getBranchesPromise };