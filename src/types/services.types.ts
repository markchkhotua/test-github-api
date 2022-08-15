import type { BranchesInput, BranchesList, ReposInput, ReposList, UserInput, GithubEntity } from './data.types';

export interface IGithubAPIService {
    getUserData: GetVCSDataFunction<GithubEntity, UserInput>,
    getRepositoriesData: GetVCSDataFunction<ReposList, ReposInput>,
    getBranchesData: GetVCSDataFunction<BranchesList, BranchesInput>
}

export type AbstractGetVCSDataFunction = (url: string) => Promise<any>;

export type GetVCSDataFunction<T, K> = (vcsInput: K) => Promise<T>

