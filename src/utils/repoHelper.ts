import { Branch, Repo, RepoInput, ReposList } from '../types';
import GithubAPIService from '../services/GithubAPIService';

const createBranchesPromise = async ({ name, owner: { login } }: Repo) => {
    const githubAPIService = GithubAPIService.getInstance();
    try {
        const data = await githubAPIService.getBranchesData(login, name);
        return {
            login,
            name,
            branches: data.map(({ name, commit: { sha } }: Branch) => ({ name, sha }))
        };
    } catch (err: any) {
        return {
            login,
            name,
            branches: [{ status: err.status, Message: err.message }]
        };
    }
};

const getBranchesPromises = (repos: ReposList) => 
    repos.map(repo => createBranchesPromise(repo));

const createReposPromise = async ({ userName, page }: RepoInput) => {
    const githubAPIService = GithubAPIService.getInstance();
    return await githubAPIService.getRepositoriesData(userName, page);
};

const getAllReposPages = async (userName: string, pages: string = '1') => {
    const data = [];
    for(let page = 1; page <= parseInt(pages); page++) {
        const repos = await createReposPromise({ userName, page });
        if(!repos.length) {
            break;
        }
        data.push(...repos.filter((repo: Repo) => !repo.fork));
    }
    return data;
};


export { getAllReposPages, getBranchesPromises };