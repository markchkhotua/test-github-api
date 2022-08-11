import { Repo, ReposList, ResultingRepo, RepoInput, BranchesInput } from './data';

export type UrlBuilder = {
    getReposUrl: (repoInput: RepoInput) => string
    getBranchesUrl: (branchesInput: BranchesInput) => string
}

export type GetBranchesPromiseFunction = (repo: Repo) => Promise<ResultingRepo>

export type GetBranchesPromisesFunction = (repos: ReposList) => Array<Promise<ResultingRepo>>
