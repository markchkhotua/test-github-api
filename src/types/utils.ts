import { Repo, ReposList, ResultingRepo, ReposInput, BranchesInput } from './data';

export type UrlBuilder = {
    getReposUrl: (repoInput: ReposInput) => string
    getBranchesUrl: (branchesInput: BranchesInput) => string
}

export type GetBranchesPromiseFunction = (repo: Repo) => Promise<ResultingRepo>

export type GetBranchesPromisesFunction = (repos: ReposList) => Array<Promise<ResultingRepo>>
