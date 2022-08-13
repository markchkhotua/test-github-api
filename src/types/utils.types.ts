import type { Repo, ReposList, ResultingRepo, ReposInput, BranchesInput } from './data.types';

export type UrlBuilder = {
    getReposUrl: (repoInput: ReposInput) => string
    getBranchesUrl: (branchesInput: BranchesInput) => string
}

export type ResultingRepoPromises = Array<ResultingRepoPromise>;

export type GetBranchesPromiseFunction = (repo: Repo) => ResultingRepoPromise

export type GetBranchesPromisesFunction = (repos: ReposList) => Array<ResultingRepoPromise>

type ResultingRepoPromise = Promise<ResultingRepo>;
